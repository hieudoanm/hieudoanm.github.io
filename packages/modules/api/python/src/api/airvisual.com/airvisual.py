import httpx

BASE_URL = "http://api.airvisual.com/v2"


class AirVisualClient:
    def __init__(self, key: str) -> None:
        self._key = key
        self._client = httpx.AsyncClient()

    async def get_countries(self) -> dict:
        params = {"key": self._key}
        response = await self._client.get(f"{BASE_URL}/countries", params=params)
        return response.json()

    async def get_states(self, country: str) -> dict:
        params = {"key": self._key, "country": country}
        response = await self._client.get(f"{BASE_URL}/states", params=params)
        return response.json()

    async def get_cities(self, country: str, state: str) -> dict:
        params = {"key": self._key, "country": country, "state": state}
        response = await self._client.get(f"{BASE_URL}/cities", params=params)
        return response.json()

    async def get_air_quality(self, country: str, state: str, city: str) -> dict:
        params = {"key": self._key, "country": country, "state": state, "city": city}
        response = await self._client.get(f"{BASE_URL}/city", params=params)
        return response.json()
