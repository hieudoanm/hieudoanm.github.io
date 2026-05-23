import unittest
from unittest.mock import AsyncMock, patch

from api import OpenWeatherMapClient


class TestOpenWeatherMapClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.json = MagicMock(return_value=data)
        return mock_resp

    async def test_get_weather(self):
        mock_resp = self._mock_resp(
            {
                "name": "London",
                "main": {"temp": 15.5, "humidity": 72},
                "weather": [{"id": 800, "main": "Clear", "description": "clear sky"}],
            }
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = OpenWeatherMapClient("test-key")
            result = await client.get_weather("London")

        self.assertEqual(result["name"], "London")
        self.assertEqual(result["main"]["temp"], 15.5)
        mock_get.assert_called_once_with(
            "https://api.openweathermap.org/data/2.5/weather",
            params={
                "q": "London",
                "lang": "vi",
                "units": "metric",
                "appid": "test-key",
            },
        )
