import io
import json
from pathlib import Path

import pandas
import requests


HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
DATA_DIR = ROOT / "data"
CSV_DIR = DATA_DIR / "csv"
JSON_DIR = DATA_DIR / "json"

CSV_DIR.mkdir(parents=True, exist_ok=True)
JSON_DIR.mkdir(parents=True, exist_ok=True)


letters: list[str] = ["a", "b", "c", "d", "e"]
url = "https://raw.githubusercontent.com/lichess-org/chess-openings/master"

openings_data_frame = pandas.DataFrame()

for letter in letters:
    print("letter", letter)
    letter_url: str = f"{url}/{letter}.tsv"
    response: requests.Response = requests.get(letter_url)
    response.raise_for_status()
    tsv: str = response.text
    df: pandas.DataFrame = pandas.read_csv(io.StringIO(tsv), delimiter="\t")
    openings_data_frame = pandas.concat([openings_data_frame, df])

openings_data_frame["group"] = (
    openings_data_frame["name"].str.split(":").str[0].str.strip()
)
openings_data_frame["subgroup"] = (
    openings_data_frame["name"]
    .str.split(":")
    .str[1]
    .str.strip()
    .str.split(",")
    .str[0]
    .str.strip()
)
openings_data_frame = openings_data_frame.sort_values(
    by=["group", "name", "eco"]
)
openings_data_frame = openings_data_frame[["eco", "group", "subgroup", "name", "pgn"]]

openings_data_frame.to_csv(CSV_DIR / "chess-openings.csv", index=False)

openings: list[dict[str]] = json.loads(
    openings_data_frame.to_json(orient="records")
)
with open(
    JSON_DIR / "chess-openings.json", "w", encoding="utf-8"
) as f:
    json.dump(openings, f, ensure_ascii=False, indent=2)
