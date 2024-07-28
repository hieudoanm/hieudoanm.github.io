from io import TextIOWrapper
from json import loads

file: TextIOWrapper = open("main.ipynb", "r")
data_string: str = file.read()
data_json: dict = loads(data_string)
cells: list[dict] = data_json.get("cells")

sections: list[str] = []

for cell in cells:
    cell_type: str = cell.get("cell_type")
    source: str = "".join(cell.get("source"))
    outputs: list[dict] = cell.get("outputs")
    if cell_type == "markdown":
        sections.append(source)
    if cell_type == "code":
        sections.append(f"```python\n{source}\n```")
        if len(outputs) > 0:
            first_output = outputs[0]
            text: str = "".join(first_output.get("text", []))
            plain: str = "".join(first_output.get("data", {}).get("text/plain", []))
            html: str = "".join(first_output.get("data", {}).get("text/html", []))
            output = ""
            if text != "":
                output = text
            elif html != "":
                output = html
            elif plain != "":
                output = f"```txt\n{plain}\n```"
            style_start = output.find("<style")
            style_end = output.find("</style>") + len("</style>")
            if style_start > -1 and style_end > -1:
                output_without_style = output[:style_start].strip() + output[style_end:].strip()
                sections.append(output_without_style)
            else:
                sections.append(output)

readme = open("README.md", "w")
readme_content: str = "\n\n".join(sections) + "\n"
readme.write(readme_content)
readme.close()
