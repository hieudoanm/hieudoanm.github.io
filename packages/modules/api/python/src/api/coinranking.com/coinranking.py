import httpx

from api.types import Tag

BASE_URL = "https://api.coinranking.com"
FALLBACK_RESPONSE = {
    "status": "error",
    "data": {
        "stats": {
            "total": 0,
            "totalCoins": 0,
            "totalMarkets": 0,
            "totalExchanges": 0,
            "totalMarketCap": "0",
            "total24hVolume": "0",
        },
        "coins": [],
    },
}


class CoinRankingClient:
    def __init__(self) -> None:
        self._client = httpx.AsyncClient()

    async def get_coins(self, tag: Tag | None = None) -> dict:
        try:
            params: dict[str, str] = {}
            if tag is not None:
                params["tags"] = tag.value
            response = await self._client.get(f"{BASE_URL}/v2/coins", params=params)
            return response.json()
        except Exception:
            return FALLBACK_RESPONSE
