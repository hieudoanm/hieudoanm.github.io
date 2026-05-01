import pandas
import requests


url = "https://api.quotable.io/quotes?page=1&limit=150"
response = requests.get(url)
data: dict = response.json()
totalPages = data.get("totalPages", 0)
quotes = []
for page in range(1, totalPages + 1):
    page_url = f"https://api.quotable.io/quotes?page={str(page)}&limit=150"
    print("page", page, page_url)
    response = requests.get(page_url)
    data: dict = response.json()
    results = data.get("results", [])
    quotes = quotes + results


quotes_df = pandas.DataFrame(quotes)
quotes_df = quotes_df[["author", "content"]]
quotes_df = quotes_df.sort_values(by=["author", "content"])
quotes_df = quotes_df.drop_duplicates(subset=["author", "content"])
quotes_df.to_csv("./data/quotes.csv", index=False)


print("Total quotes:", len(quotes_df))
