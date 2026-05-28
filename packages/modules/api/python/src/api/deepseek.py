import httpx

from .deepseek_dto import Model

BASE_URL = "https://api.deepseek.com"


class DeepSeekClient:
    def __init__(self, api_key: str) -> None:
        self._api_key = api_key
        self._client = httpx.AsyncClient()

    async def get_chat_completions(
        self, content: str, model: Model = Model.DEEPSEEK_CHAT
    ) -> dict:
        url = f"{BASE_URL}/chat/completions"
        body = {
            "model": model.value,
            "messages": [{"role": "user", "content": content}],
            "stream": False,
        }
        headers = {
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json",
        }
        response = await self._client.post(url, json=body, headers=headers)
        return response.json()
