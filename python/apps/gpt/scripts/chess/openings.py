import json
from pandas import read_csv, DataFrame
import requests

eco_groups: list[str] = ["a", "b", "c", "d", "e"]

openings_dict: dict = {}
openings_list: list[dict] = []

for eco_group in eco_groups:
    url = f"https://raw.githubusercontent.com/lichess-org/chess-openings/master/{eco_group}.tsv"
    response = requests.get(url)
    data: str = response.text
    tsv_file_path: str = f"./resources/chess/openings/tsv/{eco_group}.tsv"
    openings_tsv_file = open(tsv_file_path, "w")
    openings_tsv_file.write(data)
    openings_tsv_file.close()
    openings_data_frame: DataFrame = read_csv(tsv_file_path, delimiter="\t")
    openings_list_per_group: list[dict] = openings_data_frame.to_dict("records")
    openings_list: list[dict] = openings_list + openings_list_per_group
    for opening in openings_list_per_group:
        pgn: str = opening.get("pgn", "")
        eco: str = opening.get("eco", "")
        name: str = opening.get("name", "")
        openings_dict[pgn] = {"eco": eco, "name": name}
    print(len(openings_list))


file_path: str = "./resources/chess/openings/json"


openings_dict_json: str = json.dumps(openings_dict, indent=2)
openings_dict_json_path: str = f"{file_path}/dict/openings.json"
openings_dict_json_file = open(openings_dict_json_path, "w")
openings_dict_json_file.write(openings_dict_json)
openings_dict_json_file.close()

openings_list_json: str = json.dumps(openings_list, indent=2)
openings_list_json_path: str = f"{file_path}/list/openings.json"
openings_list_json_file = open(openings_list_json_path, "w")
openings_list_json_file.write(openings_list_json)
openings_list_json_file.close()
