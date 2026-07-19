import unittest
from unittest.mock import AsyncMock, patch

from api import FrankfurterClient


class TestFrankfurterClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.json = MagicMock(return_value=data)
        return mock_resp

    async def test_get_latest_defaults(self):
        mock_resp = self._mock_resp(
            {
                "amount": 1,
                "base": "EUR",
                "date": "2024-01-15",
                "rates": {"USD": 1.08},
            }
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = FrankfurterClient()
            result = await client.get_latest()

        self.assertEqual(result["base"], "EUR")
        mock_get.assert_called_once_with(
            "https://api.frankfurter.app/latest",
            params={"amount": 1, "from": "EUR"},
        )

    async def test_get_latest_with_to(self):
        mock_resp = self._mock_resp(
            {
                "amount": 1,
                "base": "EUR",
                "date": "2024-01-15",
                "rates": {"USD": 1.08, "GBP": 0.87},
            }
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = FrankfurterClient()
            result = await client.get_latest(amount=1, base="EUR", to=["USD", "GBP"])

        self.assertEqual(result["rates"]["USD"], 1.08)
        mock_get.assert_called_once_with(
            "https://api.frankfurter.app/latest",
            params={"amount": 1, "from": "EUR", "to": "USD,GBP"},
        )

    async def test_get_latest_without_to(self):
        mock_resp = self._mock_resp({"amount": 1, "base": "EUR"})

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = FrankfurterClient()
            result = await client.get_latest(to=None)

        self.assertEqual(result["base"], "EUR")
        params = mock_get.call_args[1]["params"]
        self.assertNotIn("to", params)

    async def test_get_currencies(self):
        mock_resp = self._mock_resp({"USD": "US Dollar", "EUR": "Euro"})

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = FrankfurterClient()
            result = await client.get_currencies()

        self.assertEqual(result["USD"], "US Dollar")
        mock_get.assert_called_once_with("https://api.frankfurter.app/currencies")
