import json
from pandas import read_csv, DataFrame
import requests

eco_groups : list[str] = ["a", "b", "c", "d", "e"]

openings : dict = {}

for eco_group in eco_groups:
    url = f"https://raw.githubusercontent.com/lichess-org/chess-openings/master/{eco_group}.tsv"
    response = requests.get(url)
    data : str = response.text
    tsv_file_path : str = f"./resources/openings/tsv/{eco_group}.tsv"
    openings_tsv_file = open(tsv_file_path, "w")
    openings_tsv_file.write(data)
    openings_tsv_file.close()
    openings_data_frame : DataFrame= read_csv(tsv_file_path, delimiter="\t")
    openings_list : list[dict] = openings_data_frame.to_dict('records')
    for opening in openings_list:
        pgn : str = opening.get("pgn")
        eco : str = opening.get("eco")
        name : str = opening.get("name")
        openings[pgn] = {
            "eco": eco,
            "name": name
        }
    print(len(openings_list))

openings_json : str = json.dumps(openings, indent=2)
json_file_path : str = "./resources/openings/json/openings.json"
openings_json_file = open(json_file_path, "w")
openings_json_file.write(openings_json)
openings_json_file.close()
