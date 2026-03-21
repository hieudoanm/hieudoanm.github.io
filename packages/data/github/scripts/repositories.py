import pandas
from requests import get, Response


going = True
username = "hieudoanm"
page = 1
per_page = 100
repositories: list[dict] = []


while going:
    url = (
        f"https://api.github.com/users/{username}/repos?per_page={per_page}&page={page}"
    )
    response: Response = get(url)
    repositories_per_page: list[dict] = response.json()
    repositories = repositories + repositories_per_page
    if len(repositories_per_page) < 100:
        going = False
    else:
        page += 1


repositories_df = pandas.DataFrame(repositories)
repositories_df.to_csv("./data/repositories.csv", index=False)
