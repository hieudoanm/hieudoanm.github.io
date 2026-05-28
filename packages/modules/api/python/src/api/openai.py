import httpx

from .openai_dto import Model

BASE_URL = "https://api.openai.com/v1"


class OpenAIClient:
    def __init__(self, api_key: str) -> None:
        self._api_key = api_key
        self._client = httpx.AsyncClient()

    async def get_chat_completions(
        self, content: str, model: Model = Model.GPT_4
    ) -> dict:
        url = f"{BASE_URL}/chat/completions"
        body = {
            "model": model.value,
            "messages": [{"role": "user", "content": content}],
        }
        headers = {
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json",
        }
        response = await self._client.post(url, json=body, headers=headers)
        return response.json()
