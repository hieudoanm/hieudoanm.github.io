import unittest
from unittest.mock import AsyncMock, patch

from api import CoinRankingClient
from api.types import Tag


class TestCoinRankingClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.json = MagicMock(return_value=data)
        return mock_resp

    async def test_get_coins_without_tag(self):
        mock_resp = self._mock_resp(
            {
                "status": "success",
                "data": {
                    "stats": {"total": 1, "totalCoins": 100},
                    "coins": [{"uuid": "1", "name": "Bitcoin", "symbol": "BTC"}],
                },
            }
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = CoinRankingClient()
            result = await client.get_coins()

        self.assertEqual(result["status"], "success")
        self.assertEqual(len(result["data"]["coins"]), 1)
        mock_get.assert_called_once_with(
            "https://api.coinranking.com/v2/coins", params={}
        )

    async def test_get_coins_with_tag(self):
        mock_resp = self._mock_resp(
            {"status": "success", "data": {"stats": {}, "coins": []}}
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = CoinRankingClient()
            result = await client.get_coins(Tag.DEFI)

        self.assertEqual(result["status"], "success")
        mock_get.assert_called_once_with(
            "https://api.coinranking.com/v2/coins", params={"tags": "defi"}
        )

    async def test_get_coins_returns_fallback_on_exception(self):
        with patch("httpx.AsyncClient.get", side_effect=Exception("Network error")):
            client = CoinRankingClient()
            result = await client.get_coins(Tag.DEFI)

        self.assertEqual(result["status"], "error")
        self.assertEqual(result["data"]["coins"], [])
