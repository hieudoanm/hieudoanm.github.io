import pandas
from requests import get, Response


going = True
username = "hieudoanm"
page = 1
per_page = 100
following: list[dict] = []


while going:
    url = f"https://api.github.com/users/{username}/following?per_page={per_page}&page={page}"
    response: Response = get(url)
    following_per_page: list[dict] = response.json()
    following = following + following_per_page
    if len(following_per_page) < 100:
        going = False
    else:
        page += 1


following_df = pandas.DataFrame(following)
following_df = following_df[["login", "id", "type"]]
following_df = following_df.rename(columns={"login": "username"})
following_df["type"] = following_df["type"].str.lower()
following_df["username"] = following_df["username"].str.lower()
following_df = following_df.sort_values(by=["type", "username"])
following_df.to_csv("./data/following.csv", index=False)
