import json
import os
import requests
import shutil

response = requests.get("https://api.github.com/codes_of_conduct")
docs = response.json()


# Writing JSON data to a file
with open("data/docs.json", "w") as json_file:
    json.dump(docs, json_file, indent=2)


shutil.rmtree("markdown", ignore_errors=True)


os.makedirs("./markdown", exist_ok=True)


for doc in docs:
    print(doc)
    response = requests.get(f"https://api.github.com/codes_of_conduct/{doc.get("key")}")
    if response.status_code == 200:
        data: dict[str] = response.json()
        key: str = data.get("key")
        body: str = data.get("body")
        with open(f"./markdown/{key.lower()}.md", "w+") as file:
            file.write(body)  # Write the image content to a file
