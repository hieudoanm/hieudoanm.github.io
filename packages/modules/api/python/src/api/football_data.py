import httpx

BASE_URL = "https://api.football-data.org/v4"


class FootballDataClient:
    def __init__(self, auth_token: str) -> None:
        self._auth_token = auth_token
        self._client = httpx.AsyncClient()
        self._headers = {"X-Auth-Token": auth_token}

    async def get_competitions(self) -> dict:
        response = await self._client.get(
            f"{BASE_URL}/competitions", headers=self._headers
        )
        return response.json()

    async def get_competition(self, id: int) -> dict:
        response = await self._client.get(
            f"{BASE_URL}/competitions/{id}", headers=self._headers
        )
        return response.json()

    async def get_teams(
        self, limit: int = 50, offset: int = 0
    ) -> dict:
        params = {"limit": limit, "offset": offset}
        response = await self._client.get(
            f"{BASE_URL}/teams", params=params, headers=self._headers
        )
        return response.json()

    async def get_teams_by_competition(self, id: int) -> dict:
        response = await self._client.get(
            f"{BASE_URL}/competitions/{id}/teams", headers=self._headers
        )
        return response.json()

    async def get_team(self, id: int) -> dict:
        response = await self._client.get(
            f"{BASE_URL}/teams/{id}", headers=self._headers
        )
        return response.json()

    async def get_matches_by_team(self, id: int) -> dict:
        response = await self._client.get(
            f"{BASE_URL}/teams/{id}/matches", headers=self._headers
        )
        return response.json()
