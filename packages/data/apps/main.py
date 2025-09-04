import csv
import json
from pathlib import Path
from datetime import date
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

INPUT_CSV = "csv/apps.csv"
OUTPUT_JSON = "json/apps.json"
OUTPUT_SITEMAP = "public/sitemap.xml"

data = []
urls = set()

Path(OUTPUT_JSON).parent.mkdir(parents=True, exist_ok=True)
Path(OUTPUT_SITEMAP).parent.mkdir(parents=True, exist_ok=True)


def indent(elem, level=0):
    i = "\n" + level * "  "
    if len(elem):
        if not elem.text or not elem.text.strip():
            elem.text = i + "  "
        for child in elem:
            indent(child, level + 1)
        if not child.tail or not child.tail.strip():
            child.tail = i
    if level and (not elem.tail or not elem.tail.strip()):
        elem.tail = i


with open(INPUT_CSV, newline="", encoding="utf-8") as csv_file:
    reader = csv.DictReader(csv_file)

    for row in reader:
        # Convert "tags" from "a,b,c" → ["a", "b", "c"]
        row["tags"] = [tag.strip() for tag in row["tags"].split(",") if tag.strip()]
        data.append(row)

        # Collect valid hrefs for sitemap
        href = row.get("href", "").strip()
        if href:
            parsed = urlparse(href)
            if parsed.scheme in ("http", "https"):
                urls.add(href)

# Write JSON
with open(OUTPUT_JSON, "w", encoding="utf-8") as json_file:
    json.dump(data, json_file, indent=2, ensure_ascii=False)

# Build sitemap.xml
urlset = ET.Element(
    "urlset",
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9",
)

today = date.today().isoformat()

for url in sorted(urls):
    url_el = ET.SubElement(urlset, "url")
    ET.SubElement(url_el, "loc").text = url
    ET.SubElement(url_el, "lastmod").text = today
    ET.SubElement(url_el, "changefreq").text = "weekly"
    ET.SubElement(url_el, "priority").text = "0.8"

# Pretty-print XML
indent(urlset)

tree = ET.ElementTree(urlset)
tree.write(OUTPUT_SITEMAP, encoding="utf-8", xml_declaration=True)

print(f"Converted {len(data)} rows → {OUTPUT_JSON}")
print(f"Generated sitemap with {len(urls)} URLs → {OUTPUT_SITEMAP}")
