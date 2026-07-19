from bs4 import BeautifulSoup
import pandas as pd
import requests
from pathlib import Path
from tqdm import tqdm

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
DATA_DIR = ROOT / "data"
CSV_DIR = DATA_DIR / "csv"


def main() -> None:
    response = requests.get("https://restcountries.com/v3/all")
    countries = response.json()

    visas: list[dict] = []

    for country in tqdm(countries):
        independent = country.get("independent", False)
        if not independent:
            continue
        country_common_name: str = country.get("name", {}).get("common", "")
        country_path: str = "-".join(country_common_name.split(" ")).lower()
        try:
            URL = f"https://www.passportindex.org/passport/{country_path}"
            response = requests.get(URL)
            html = response.text
            soup = BeautifulSoup(html, "html.parser")
            rows = soup.find_all("table")[0].find("tbody").find_all("tr")
            for row in rows:
                cells = row.find_all("td")
                country_text = cells[0].getText().strip()
                requirement_text = cells[1].getText().strip()
                visa: dict = {
                    "to_country": country_common_name,
                    "from_country": country_text,
                    "requirement": requirement_text,
                }
                visas.append(visa)
        except Exception as exception:
            print(f"  {country_path}: {exception}")

    visas_df = pd.DataFrame(visas)
    visas_df = visas_df.sort_values(by=["to_country", "from_country", "requirement"])
    out_path = CSV_DIR / "visas.csv"
    visas_df.to_csv(out_path, index=False, header=True)
    print(f"Saved {len(visas_df)} rows to {out_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
