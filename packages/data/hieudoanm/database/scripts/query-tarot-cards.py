import json
import pandas
import requests


response = requests.get("https://tarotapi.dev/api/v1/cards")
data: dict = response.json()

with open("./data/cards.json", "w") as json_file:
    json.dump(data, json_file, indent=2)
cards = data.get("cards", [])
cards_df = pandas.DataFrame(cards)
columns: dict[str, str] = {"meaning_rev": "meaning_reverse", "desc": "description"}
cards_df = cards_df.rename(columns=columns)
cards_df.to_csv("./data/cards.csv", index=False)

print(cards_df)
