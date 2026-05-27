import httpx
from typing import List, Dict, Any

class ChessClient:
    def __init__(self):
        self.base_url = "https://api.chess.com/pub"
        self.client = httpx.AsyncClient()

    async def get_players(self, title: str) -> List[str]:
        url = f"{self.base_url}/titled/{title}"
        response = await self.client.get(url)
        response.raise_for_status()
        return response.json().get("players", [])

    async def get_player(self, player: str) -> Dict[str, Any]:
        url = f"{self.base_url}/player/{player}"
        response = await self.client.get(url)
        response.raise_for_status()
        return response.json()

    async def get_stats(self, player: str) -> Dict[str, Any]:
        url = f"{self.base_url}/player/{player}/stats"
        response = await self.client.get(url)
        response.raise_for_status()
        return response.json()
