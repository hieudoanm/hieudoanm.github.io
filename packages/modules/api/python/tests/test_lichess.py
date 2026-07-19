import unittest
from unittest.mock import AsyncMock, patch

from api import LichessClient
from api.types import Variant


class TestLichessClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.json = MagicMock(return_value=data)
        return mock_resp

    async def test_get_cloud_evaluation_defaults(self):
        mock_resp = self._mock_resp(
            {
                "depth": 20,
                "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                "pvs": [{"cp": 20, "moves": "e4"}],
            }
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = LichessClient()
            result = await client.get_cloud_evaluation(
                "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
            )

        self.assertEqual(result["depth"], 20)
        mock_get.assert_called_once_with(
            "https://lichess.org/api/cloud-eval",
            params={
                "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                "multiPv": 1,
                "variant": "standard",
            },
        )

    async def test_get_cloud_evaluation_custom(self):
        mock_resp = self._mock_resp({"depth": 30})

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = LichessClient()
            result = await client.get_cloud_evaluation(
                "test-fen", multi_pv=3, variant=Variant.CHESS_960
            )

        self.assertEqual(result["depth"], 30)
        mock_get.assert_called_once()
        params = mock_get.call_args[1]["params"]
        self.assertEqual(params["multiPv"], 3)
        self.assertEqual(params["variant"], "chess960")
