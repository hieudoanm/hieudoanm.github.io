import httpx

BASE_URL = "https://api.frankfurter.app"


class FrankfurterClient:
    def __init__(self) -> None:
        self._client = httpx.AsyncClient()

    async def get_latest(
        self,
        amount: int = 1,
        base: str = "EUR",
        to: list[str] | None = None,
    ) -> dict:
        params: dict[str, str | int] = {"amount": amount, "from": base}
        if to:
            params["to"] = ",".join(to)
        response = await self._client.get(f"{BASE_URL}/latest", params=params)
        return response.json()

    async def get_currencies(self) -> dict:
        response = await self._client.get(f"{BASE_URL}/currencies")
        return response.json()
