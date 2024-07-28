from json import dumps
from requests import get


response = get("https://restcountries.com/v3.1/all")
countries: list[dict] = response.json()


languages: dict = {}


for country in countries:
    cca3: str = country.get("cca3")
    country_languages: dict = country.get("languages", {})
    print("cca3", cca3)
    languages = {**country_languages, **languages}


language_keys: list[str] = list(languages.keys())
language_keys.sort()
sorted_languages: dict = {}
for key in language_keys:
    sorted_languages[key] = languages[key]


languages_dict_json: str = dumps(sorted_languages, indent=2)
languages_dict_json_path: str = "./resources/json/dict/full-languages.json"
languages_dict_json_file = open(languages_dict_json_path, "w")
languages_dict_json_file.write(languages_dict_json)
languages_dict_json_file.close()
