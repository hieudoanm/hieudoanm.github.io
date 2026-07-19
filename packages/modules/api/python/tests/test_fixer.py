import unittest
from unittest.mock import AsyncMock, patch

from api import FixerClient


class TestFixerClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.json = MagicMock(return_value=data)
        return mock_resp

    async def test_get_latest(self):
        mock_resp = self._mock_resp(
            {
                "success": True,
                "base": "EUR",
                "date": "2024-01-15",
                "rates": {"USD": 1.08, "GBP": 0.87},
            }
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = FixerClient("test-key")
            result = await client.get_latest()

        self.assertTrue(result["success"])
        self.assertEqual(result["rates"]["USD"], 1.08)
        mock_get.assert_called_once_with(
            "http://data.fixer.io/api/latest", params={"access_key": "test-key"}
        )

    async def test_get_symbols(self):
        mock_resp = self._mock_resp(
            {
                "success": True,
                "symbols": {"USD": "US Dollar", "EUR": "Euro"},
            }
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = FixerClient("test-key")
            result = await client.get_symbols()

        self.assertTrue(result["success"])
        self.assertEqual(result["symbols"]["USD"], "US Dollar")
        mock_get.assert_called_once_with(
            "http://data.fixer.io/api/symbols", params={"access_key": "test-key"}
        )
