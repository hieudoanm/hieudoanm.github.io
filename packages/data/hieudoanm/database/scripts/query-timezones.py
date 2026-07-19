import pandas as pd
import requests
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
DATA_DIR = ROOT / "data"
CSV_DIR = DATA_DIR / "csv"

# Source CSV from the timezones package
TIMEZONES_DIR = ROOT.parent / "timezones"
SRC_CSV = TIMEZONES_DIR / "time_zones.csv"


def main() -> None:
    if not SRC_CSV.exists():
        print(f"Source CSV not found: {SRC_CSV}")
        print("Download time_zones.csv from https://timezonedb.com/download and place it in:")
        print(f"  {TIMEZONES_DIR}")
        return

    response = requests.get("https://restcountries.com/v3.1/all")
    countries: list[dict] = response.json()
    countries_map: dict = {}
    for country in countries:
        code = country.get("cca2", "")
        name = country.get("name", {}).get("common", "")
        countries_map[code] = name

    time_zones_df = pd.read_csv(SRC_CSV)
    time_zones_df["country"] = time_zones_df["country_code"].map(countries_map)
    time_zones_df["gmt_offset_hours"] = round(time_zones_df["gmt_offset"] / 3600)

    columns = [
        "zone_name",
        "country_code",
        "abbreviation",
        "time_start",
        "gmt_offset",
        "dst",
        "country",
        "gmt_offset_hours",
    ]
    out_path = CSV_DIR / "time_zones.csv"
    time_zones_df.to_csv(out_path, index=False, columns=columns)
    print(f"Saved {len(time_zones_df)} rows to {out_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
