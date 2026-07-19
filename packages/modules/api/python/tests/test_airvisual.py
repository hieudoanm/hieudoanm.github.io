import unittest
from unittest.mock import AsyncMock, patch

from api import AirVisualClient


class TestAirVisualClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.json = MagicMock(return_value=data)
        return mock_resp

    async def test_get_countries(self):
        mock_resp = self._mock_resp(
            {"status": "success", "data": [{"country": "Vietnam"}]}
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = AirVisualClient("test-key")
            result = await client.get_countries()

        self.assertEqual(result["status"], "success")
        self.assertEqual(len(result["data"]), 1)
        mock_get.assert_called_once_with(
            "http://api.airvisual.com/v2/countries", params={"key": "test-key"}
        )

    async def test_get_states(self):
        mock_resp = self._mock_resp(
            {"status": "success", "data": [{"state": "California"}]}
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = AirVisualClient("test-key")
            result = await client.get_states("USA")

        self.assertEqual(result["status"], "success")
        mock_get.assert_called_once_with(
            "http://api.airvisual.com/v2/states",
            params={"key": "test-key", "country": "USA"},
        )

    async def test_get_cities(self):
        mock_resp = self._mock_resp(
            {"status": "success", "data": [{"city": "Los Angeles"}]}
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = AirVisualClient("test-key")
            result = await client.get_cities("USA", "California")

        self.assertEqual(result["status"], "success")
        mock_get.assert_called_once_with(
            "http://api.airvisual.com/v2/cities",
            params={"key": "test-key", "country": "USA", "state": "California"},
        )

    async def test_get_air_quality(self):
        mock_resp = self._mock_resp({"status": "success", "data": {"aqius": 50}})

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = AirVisualClient("test-key")
            result = await client.get_air_quality("USA", "California", "Los Angeles")

        self.assertEqual(result["status"], "success")
        mock_get.assert_called_once_with(
            "http://api.airvisual.com/v2/city",
            params={
                "key": "test-key",
                "country": "USA",
                "state": "California",
                "city": "Los Angeles",
            },
        )
