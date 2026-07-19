import unittest
from unittest.mock import AsyncMock, patch

from api import ChessClient


class TestChessClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.json = MagicMock(return_value=data)
        mock_resp.raise_for_status = MagicMock()
        return mock_resp

    async def test_get_players(self):
        mock_resp = self._mock_resp({"players": ["player1", "player2"]})

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = ChessClient()
            result = await client.get_players("GM")

        self.assertEqual(result, ["player1", "player2"])
        mock_get.assert_called_once_with("https://api.chess.com/pub/titled/GM")

    async def test_get_player(self):
        mock_resp = self._mock_resp({"player_id": "magnus"})

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = ChessClient()
            result = await client.get_player("magnus")

        self.assertEqual(result["player_id"], "magnus")
        mock_get.assert_called_once_with("https://api.chess.com/pub/player/magnus")

    async def test_get_stats(self):
        mock_resp = self._mock_resp({"rated": True})

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = ChessClient()
            result = await client.get_stats("magnus")

        self.assertEqual(result["rated"], True)
        mock_get.assert_called_once_with(
            "https://api.chess.com/pub/player/magnus/stats"
        )

    async def test_get_players_empty(self):
        mock_resp = self._mock_resp({})

        with patch("httpx.AsyncClient.get", return_value=mock_resp):
            client = ChessClient()
            result = await client.get_players("GM")

        self.assertEqual(result, [])
