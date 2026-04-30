import csv
import json
from pathlib import Path
from datetime import date
from urllib.parse import urlparse
import xml.etree.ElementTree as ET
from collections import defaultdict

INPUT_CSV = "csv/apps.csv"
OUTPUT_JSON = "json/apps.json"
OUTPUT_SITEMAP = "public/sitemap.xml"
OUTPUT_README = "docs/README.md"

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


def format_category(category: str) -> str:
    return category.replace("-", " ").title()


def generate_readme(data, output_path):
    categories = defaultdict(list)

    # Group apps by category
    for row in data:
        categories[row["category"]].append(row)

    lines = []
    lines.append("# Hieu Doan\n")

    lines.append(f"## Table of Contents ({len(data)})\n")

    # Sort categories alphabetically
    for category in sorted(categories.keys()):
        apps = categories[category]
        lines.append(f"## {format_category(category)} ({len(apps)})\n")

        # App list
        for i, app in enumerate(apps, start=1):
            app_id = app["id"]
            lines.append(f"{i}. {app["emoji"]} [{app['name']}][{app_id}] - [GitHub][{app_id}-gh]")

        lines.append("")

        # Reference links
        for app in apps:
            app_id = app["id"]
            lines.append(f"[{app_id}]: {app['href']}")
            lines.append(f"[{app_id}-gh]: {app['github']}")

        lines.append("")

    # Write README
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines).strip() + "\n")

    print(f"Generated README → {output_path}")


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

# Generate README
generate_readme(data, OUTPUT_README)

print(f"Converted {len(data)} rows → {OUTPUT_JSON}")
print(f"Generated sitemap with {len(urls)} URLs → {OUTPUT_SITEMAP}")
