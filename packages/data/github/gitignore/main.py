import json
import requests

response = requests.get("https://api.github.com/gitignore/templates")
templates = response.json()


# Writing JSON data to a file
with open("data/templates.json", "w") as json_file:
    json.dump(templates, json_file, indent=2)


with open("data/templates.txt", "w") as file:
    file.write("\n".join(templates))


for template in templates:
    print(template)
    response = requests.get(f"https://api.github.com/gitignore/templates/{template}")
    if response.status_code == 200:
        data: dict[str] = response.json()
        source: str = data.get("source")
        with open(f"./files/{template.lower()}.gitignore", "wb") as file:
            file.write(source.encode())  # Write the image content to a file
