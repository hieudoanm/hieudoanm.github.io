import httpx

BASE_URL = "https://api.openweathermap.org/data/2.5"


class OpenWeatherMapClient:
    def __init__(self, app_id: str) -> None:
        self._app_id = app_id
        self._client = httpx.AsyncClient()

    async def get_weather(self, query: str) -> dict:
        params = {
            "q": query,
            "lang": "vi",
            "units": "metric",
            "appid": self._app_id,
        }
        response = await self._client.get(
            f"{BASE_URL}/weather", params=params
        )
        return response.json()
