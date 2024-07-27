from json import dumps
from pandas import read_csv, DataFrame


languages_data_frame : DataFrame = read_csv("./resources/csv/languages.csv")
languages_data_frame : DataFrame = languages_data_frame.fillna("")
languages_list : list[dict] = languages_data_frame.to_dict("records")
languages_list : list[dict] = list(filter(lambda language: language.get("cca3") != '', languages_list))
languages_dict : dict = {}


for language in languages_list:
    code = language.get("cca3") or ''
    name = language.get("name") or ''
    print('code', code)
    if code == '':
        continue
    languages_dict[code] = name


language_keys : list[str] = list(languages_dict.keys())
language_keys.sort()
sorted_languages : dict = {}
for key in language_keys:
    sorted_languages[key] = languages_dict[key]


languages_list_json : str = dumps(languages_list, indent=2)
languages_list_json_path : str = "./resources/json/list/languages.json"
languages_list_json_file = open(languages_list_json_path, "w")
languages_list_json_file.write(languages_list_json)
languages_list_json_file.close()


languages_dict_json : str = dumps(sorted_languages, indent=2)
languages_dict_json_path : str = "./resources/json/dict/languages.json"
languages_dict_json_file = open(languages_dict_json_path, "w")
languages_dict_json_file.write(languages_dict_json)
languages_dict_json_file.close()
