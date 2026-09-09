#!/usr/bin/env python3

import json
import sqlite3
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

CROSSREF_API = "https://api.crossref.org"
MAILTO = "developers@example.com"
DELAY = 0.5
DB_PATH = "doi.db"


def request(url):
    headers = {
        "User-Agent": f"doi-crawler/1.0 (mailto:{MAILTO})",
        "Accept": "application/json",
    }
    req = urllib.request.Request(url, headers=headers)
    time.sleep(DELAY)
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read())


def search(query):
    params = urllib.parse.urlencode({
        "query.title": query,
        "rows": 100,
        "select": "DOI",
    })
    data = request(f"{CROSSREF_API}/works?{params}")
    items = data.get("message", {}).get("items", [])
    return [item["DOI"] for item in items if item.get("DOI")]


def fetch(doi):
    url = f"{CROSSREF_API}/works/{urllib.parse.quote(doi, safe='')}"
    try:
        data = request(url)
    except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError):
        return None
    msg = data.get("message")
    if not msg:
        return None

    title_list = msg.get("title")
    if isinstance(title_list, list):
        title = " ".join(str(t) for t in title_list)
    else:
        title = str(title_list or "")

    authors = []
    for a in msg.get("author", []):
        name = a.get("name")
        if name:
            authors.append(name)
        else:
            parts = [a.get("given", ""), a.get("family", "")]
            authors.append(" ".join(p for p in parts if p))
    author = "; ".join(authors)

    year = ""
    for key in ("issued", "published-print", "published-online", "created"):
        d = msg.get(key)
        if isinstance(d, dict) and d.get("date-parts"):
            parts = d["date-parts"]
            if parts and parts[0] and parts[0][0]:
                year = str(parts[0][0])
                break

    abstract = str(msg.get("abstract", "") or "")
    work_type = str(msg.get("type", "") or "")

    refs = []
    for ref in msg.get("reference", []):
        if ref.get("DOI"):
            refs.append({
                "doi": ref["DOI"],
                "title": str(ref.get("article-title", "") or ""),
                "year": str(ref.get("year", "") or ""),
            })

    return {
        "doi": doi,
        "title": title,
        "author": author,
        "year": year,
        "abstract": abstract,
        "type": work_type,
        "references": refs,
    }


def init_db(path):
    conn = sqlite3.connect(path)
    conn.execute("PRAGMA foreign_keys = ON")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS works (
            doi TEXT PRIMARY KEY,
            title TEXT,
            author TEXT,
            year TEXT,
            abstract TEXT,
            type TEXT
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS "references" (
            workId TEXT NOT NULL,
            referencedId TEXT NOT NULL,
            PRIMARY KEY (workId, referencedId),
            FOREIGN KEY (workId) REFERENCES works(doi) ON DELETE CASCADE,
            FOREIGN KEY (referencedId) REFERENCES works(doi) ON DELETE RESTRICT
        )
    """)
    conn.commit()
    return conn


def upsert_work(conn, work):
    conn.execute("""
        INSERT INTO works (doi, title, author, year, abstract, type)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(doi) DO UPDATE SET
            title = excluded.title, author = excluded.author,
            year = excluded.year, abstract = excluded.abstract,
            type = excluded.type
    """, (
        work["doi"], work["title"], work["author"],
        work["year"], work["abstract"], work["type"],
    ))


def add_reference(conn, work_doi, ref_doi):
    conn.execute("""
        INSERT OR IGNORE INTO "references" (workId, referencedId)
        VALUES (?, ?)
    """, (work_doi, ref_doi))


def main():
    if len(sys.argv) < 2:
        print("Usage: python crawl.py <query>")
        sys.exit(1)
    query = sys.argv[1]
    conn = init_db(DB_PATH)

    dois = search(query)
    print(f"Found {len(dois)} DOIs for query: {query}")

    for i, doi in enumerate(dois):
        print(f"[{i + 1}/{len(dois)}] {doi}")
        if conn.execute("SELECT 1 FROM works WHERE doi = ?", (doi,)).fetchone():
            print("  Skipped (already in DB)")
            continue
        work = fetch(doi)
        if not work:
            print("  Skipped (fetch failed)")
            continue
        upsert_work(conn, work)
        refs = work["references"]
        print(f"  {work['title'][:80]} ({len(refs)} refs)")

        for j, ref in enumerate(refs):
            ref_doi = ref["doi"].strip().lower()
            in_works = conn.execute(
                "SELECT 1 FROM works WHERE doi = ?", (ref_doi,)
            ).fetchone()
            in_refs = conn.execute(
                'SELECT 1 FROM "references" WHERE workId = ? AND referencedId = ?',
                (work["doi"], ref_doi),
            ).fetchone()
            if in_works and in_refs:
                continue
            if not in_works:
                ref_work = fetch(ref_doi)
                if ref_work:
                    upsert_work(conn, ref_work)
                    print(f"    [{j + 1}/{len(refs)}] {ref_work['title'][:60]}")
                else:
                    conn.execute("""
                        INSERT INTO works (doi, title, author, year, abstract, type)
                        VALUES (?, ?, '', ?, '', '')
                        ON CONFLICT(doi) DO UPDATE SET
                            title = CASE WHEN works.title = '' THEN excluded.title
                                ELSE works.title END,
                            year = CASE WHEN works.year = '' THEN excluded.year
                                ELSE works.year END
                    """, (ref_doi, ref.get("title", ""), ref.get("year", "")))
            if not in_refs:
                add_reference(conn, work["doi"], ref_doi)
        conn.commit()
        time.sleep(DELAY)

    conn.close()
    print("Done.")


if __name__ == "__main__":
    main()
