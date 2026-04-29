import json
import requests
import logging

# -------------------------------------------------------------------
# Logging configuration
# -------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,  # Change to DEBUG for verbose output
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
        # logging.FileHandler("app.log", mode="w"),
    ],
)

# -------------------------------------------------------------------
# API configuration
# -------------------------------------------------------------------
encrypted = "8cfdb18fe722929be89607beed58bab8aeb32b0939ff96b8"
when = "2025-01-27T12:41:36.901Z"
limit = 1_000_000

url = f"https://www.wordsapi.com/mashape/words?when={when}&encrypted={encrypted}&limit={limit}"

logging.info(f"Sending request to URL: {url}")

# -------------------------------------------------------------------
# Fetch data
# -------------------------------------------------------------------
response = requests.get(url)

if response.status_code == 200:
    logging.info(f"Request successful (status code {response.status_code})")
else:
    logging.error(f"Request failed with status code {response.status_code}")
    response.raise_for_status()

# -------------------------------------------------------------------
# Parse response
# -------------------------------------------------------------------
try:
    data = response.json()
except json.JSONDecodeError:
    logging.error("Failed to decode JSON response")
    raise

results = data.get("results", {})
total = results.get("total", 0)
logging.info(f"Total words reported by API: {total}")

words = results.get("data", [])
logging.info(f"Retrieved {len(words)} words")


# -------------------------------------------------------------------
# Filtering helpers
# -------------------------------------------------------------------
def is_valid_word(word: str) -> bool:
    """
    Valid word must:
    - be exactly 5 characters long
    - contain only letters (no digits, spaces, or symbols)
    """
    return len(word) == 5 and word.isalpha()


# -------------------------------------------------------------------
# Filtering logic
# -------------------------------------------------------------------
filtered_words = [word for word in words if is_valid_word(word)]
logging.info(
    f"Filtered to {len(filtered_words)} words " f"(exactly 5 letters, alphabetic only)"
)

# Optional: sort for consistency
filtered_words.sort()

# -------------------------------------------------------------------
# Save to JSON file
# -------------------------------------------------------------------
output_file_path = "db/5_letters_words.json"

try:
    with open(output_file_path, "w", encoding="utf-8") as json_file:
        json.dump(filtered_words, json_file, indent=4, ensure_ascii=False)

    logging.info(f"Saved {len(filtered_words)} words to {output_file_path}")

except Exception as e:
    logging.error(f"Failed to save words to file: {e}")
