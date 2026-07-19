from enum import StrEnum

import httpx

BASE_URL = "https://api.telegram.org/bot"
INVALID_TOKEN = "Invalid token"


class ParseMode(StrEnum):
    HTML = "html"
    MARKDOWN = "markdown"


class TelegramClient:
    def __init__(self, token: str) -> None:
        self._token = token
        self._client = httpx.AsyncClient()

    async def _post(self, method: str, json_body: dict | None = None) -> dict:
        url = f"{BASE_URL}{self._token}/{method}"
        response = await self._client.post(url, json=json_body)
        return response.json()

    async def send_message(
        self,
        chat_id: int,
        message: str,
        parse_mode: ParseMode = ParseMode.MARKDOWN,
    ) -> None:
        if not self._token:
            raise ValueError(INVALID_TOKEN)
        if not chat_id:
            raise ValueError("Invalid chatId")
        if not message:
            raise ValueError("Invalid message")
        params = {
            "chat_id": chat_id,
            "text": message,
            "parse_mode": parse_mode.value,
        }
        url = f"{BASE_URL}{self._token}/sendMessage"
        await self._client.post(url, params=params)

    async def set_webhook(self, url: str) -> dict:
        if not self._token:
            raise ValueError(INVALID_TOKEN)
        if not url:
            raise ValueError("Invalid url")
        return await self._post("setWebhook", {"url": url})

    async def delete_webhook(self, url: str) -> dict:
        if not self._token:
            raise ValueError(INVALID_TOKEN)
        if not url:
            raise ValueError("Invalid url")
        return await self._post("deleteWebhook", {"url": url})

    async def get_webhook_info(self) -> dict:
        if not self._token:
            raise ValueError(INVALID_TOKEN)
        return await self._post("getWebhookInfo")
