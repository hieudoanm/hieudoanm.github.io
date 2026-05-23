import httpx

from api.types import GeminiModel as Model
from api.types import GeminiContent

BASE_URL = "https://generativelanguage.googleapis.com"


class GeminiClient:
    def __init__(self, api_key: str) -> None:
        self._api_key = api_key
        self._client = httpx.AsyncClient()

    async def generate_content(
        self, contents: list[GeminiContent], model: Model = Model.GEMINI_2_0_FLASH, timeout_secs: int = 60
    ) -> dict:
        url = f"{BASE_URL}/v1beta/models/{model.value}:generateContent?key={self._api_key}"
        body = {"contents": [{"role": c.role.value, "parts": [{"text": p.text} for p in c.parts]} for c in contents]}
        response = await self._client.post(url, json=body, timeout=timeout_secs)
        return response.json()
