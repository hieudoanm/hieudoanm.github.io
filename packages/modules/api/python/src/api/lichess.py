import httpx

from .lichess_dto import Variant

BASE_URL = "https://lichess.org/api"


class LichessClient:
    def __init__(self) -> None:
        self._client = httpx.AsyncClient()

    async def get_cloud_evaluation(
        self,
        fen: str,
        multi_pv: int = 1,
        variant: Variant = Variant.STANDARD,
    ) -> dict:
        params: dict[str, str | int] = {
            "fen": fen,
            "multiPv": multi_pv,
            "variant": variant.value,
        }
        response = await self._client.get(
            f"{BASE_URL}/cloud-eval", params=params
        )
        return response.json()
