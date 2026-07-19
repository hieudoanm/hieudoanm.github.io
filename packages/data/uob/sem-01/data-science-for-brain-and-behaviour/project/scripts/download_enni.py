"""Download ENNI CHAT transcripts from TalkBank, preserving their folder paths."""

from __future__ import annotations

import getpass
import json
import time
from http.cookiejar import CookieJar
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import HTTPCookieProcessor, Request, build_opener


API_URL = "https://sla2.talkbank.org/"
CORPUS_PATH = ["childes", "Clinical-Eng", "ENNI"]
RAW_DATA_DIR = Path(__file__).resolve().parents[1] / "data" / "raw" / "ENNI"


def post_json(opener: Any, endpoint: str, payload: dict[str, Any]) -> dict[str, Any]:
    """Send one JSON request while retaining TalkBank session cookies."""
    request = Request(
        API_URL + endpoint,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with opener.open(request, timeout=60) as response:
            return json.loads(response.read().decode("utf-8"))
    except HTTPError as error:
        raise RuntimeError(f"TalkBank endpoint {endpoint!r} returned HTTP {error.code}.") from error


def collect_files(node: dict[str, Any], path: list[str]) -> list[list[str]]:
    """Return transcript paths from the requested ENNI tree."""
    paths: list[list[str]] = []
    for name, child in node.items():
        child_path = [*path, name]
        if isinstance(child, dict) and child.get("file") is True:
            paths.append(child_path)
        elif isinstance(child, dict):
            paths.extend(collect_files(child, child_path))
    return paths


def login(opener: Any) -> None:
    """Log in to TalkBank without storing credentials."""
    user_id = getpass.getpass("TalkBank account email: ").strip()
    password = getpass.getpass("TalkBank ENNI password: ")
    login = post_json(opener, "logInUser", {"email": user_id, "pswd": password})
    if login.get("success") is not True:
        raise RuntimeError("TalkBank account login failed; check the account email and password.")


def download_file(opener: Any, path: list[str], destination: Path) -> None:
    """Fetch and save a single CHAT transcript."""
    result = post_json(opener, "getCHAT", {"pathToDoc": path})
    text = result.get("respMsg")
    if result.get("success") is not True or not isinstance(text, str):
        if result.get("authStatus", {}).get("loggedIn") is True:
            raise RuntimeError("TalkBank login succeeded, but access to this transcript was not authorized.")
        raise RuntimeError(f"TalkBank could not return transcript: {'/'.join(path)}")
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(text, encoding="utf-8")


def main() -> None:
    opener = build_opener(HTTPCookieProcessor(CookieJar()))
    tree_result = post_json(opener, "getAnnoPathTrees", {})
    try:
        enni_tree = tree_result["respMsg"]["childes"]["childes"]["Clinical-Eng"]["ENNI"]
    except (KeyError, TypeError) as error:
        raise RuntimeError("Could not locate ENNI in TalkBank's corpus tree.") from error

    transcript_paths = collect_files(enni_tree, CORPUS_PATH)
    if not transcript_paths:
        raise RuntimeError("No ENNI transcript files were listed by TalkBank.")

    login(opener)
    downloaded = 0
    skipped = 0
    for index, path in enumerate(transcript_paths, start=1):
        relative_path = Path(*path[len(CORPUS_PATH) :]).with_suffix(".cha")
        destination = RAW_DATA_DIR / relative_path
        if destination.exists():
            skipped += 1
            continue
        download_file(opener, path, destination)
        downloaded += 1
        if index % 10 == 0:
            print(f"Processed {index}/{len(transcript_paths)} transcripts")
        time.sleep(0.2)

    print(f"Done. Downloaded {downloaded}; already present {skipped}.")
    print(f"Files saved under: {RAW_DATA_DIR}")


if __name__ == "__main__":
    try:
        main()
    except (HTTPError, URLError, TimeoutError, RuntimeError, json.JSONDecodeError) as error:
        raise SystemExit(f"Download stopped: {error}") from error
