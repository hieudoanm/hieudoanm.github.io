import re
from asyncio import timeout as async_timeout

import httpx

DEFAULT_PROXY_URL = "https://hieudoanm-proxy.vercel.app/api"
DOI_PATTERN = re.compile(r"^https?://(dx\.)?doi\.org/")


class CrossRefClient:
    def __init__(self, proxy_url: str = DEFAULT_PROXY_URL) -> None:
        self._proxy_url = proxy_url
        self._client = httpx.AsyncClient()

    @staticmethod
    def get_id(url: str) -> str | None:
        try:
            return DOI_PATTERN.sub("", url)
        except Exception:
            return None

    async def get_work(
        self, id: str, timeout_ms: int = 60000
    ) -> dict:
        url = f"https://api.crossref.org/works/{id}"
        params = {"url": url}
        full_url = f"{self._proxy_url}"
        try:
            async with async_timeout(timeout_ms / 1000):
                response = await self._client.get(
                    full_url, params=params
                )
            if not response.is_success:
                return {"reference": None}
            data = response.json()
            message = data.get("message", {})
            published = (
                message.get("published-print")
                or message.get("published-online")
                or {"date-parts": [[]]}
            )
            date_parts = published.get("date-parts", [[]])
            year = date_parts[0][0] if date_parts and date_parts[0] else 0
            authors = [
                {"given": a.get("given", ""), "family": a.get("family", "")}
                for a in message.get("author", [])
            ]
            titles = message.get("title", [])
            container = message.get("container-title", [])
            reference = {
                "id": id,
                "authors": authors,
                "title": titles[0] if titles else "",
                "journal": container[0] if container else "",
                "volume": message.get("volume"),
                "issue": message.get("issue"),
                "pages": message.get("page"),
                "year": year,
                "url": f"https://doi.org/{id}",
            }
            return {"reference": reference}
        except Exception:
            return {"reference": None}
