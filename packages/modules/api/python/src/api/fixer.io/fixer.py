import httpx

BASE_URL = "http://data.fixer.io/api"


class FixerClient:
    def __init__(self, key: str) -> None:
        self._key = key
        self._client = httpx.AsyncClient()

    async def get_latest(self) -> dict:
        params = {"access_key": self._key}
        response = await self._client.get(f"{BASE_URL}/latest", params=params)
        return response.json()

    async def get_symbols(self) -> dict:
        params = {"access_key": self._key}
        response = await self._client.get(f"{BASE_URL}/symbols", params=params)
        return response.json()
