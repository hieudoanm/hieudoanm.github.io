import unittest
from unittest.mock import AsyncMock, patch

from api import CrossRefClient


class TestCrossRefClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data, is_success=True):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.is_success = is_success
        mock_resp.json = MagicMock(return_value=data)
        return mock_resp

    async def test_get_work_success(self):
        mock_resp = self._mock_resp(
            {
                "message": {
                    "author": [{"given": "John", "family": "Doe"}],
                    "title": ["Test Title"],
                    "container-title": ["Test Journal"],
                    "volume": "10",
                    "issue": "2",
                    "page": "100-110",
                    "published-print": {"date-parts": [[2024, 3, 15]]},
                }
            }
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = CrossRefClient("https://proxy.test")
            result = await client.get_work("10.1000/xyz")

        ref = result["reference"]
        self.assertIsNotNone(ref)
        self.assertEqual(ref["title"], "Test Title")
        self.assertEqual(ref["journal"], "Test Journal")
        self.assertEqual(ref["year"], 2024)
        self.assertEqual(ref["id"], "10.1000/xyz")
        mock_get.assert_called_once_with(
            "https://proxy.test",
            params={"url": "https://api.crossref.org/works/10.1000/xyz"},
        )

    async def test_get_work_fallback_to_online_date(self):
        mock_resp = self._mock_resp(
            {
                "message": {
                    "title": ["Online Only"],
                    "published-online": {"date-parts": [[2023, 6, 1]]},
                }
            }
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp):
            client = CrossRefClient()
            result = await client.get_work("10.1000/abc")

        self.assertEqual(result["reference"]["year"], 2023)

    async def test_get_work_returns_none_on_error_status(self):
        mock_resp = self._mock_resp({}, is_success=False)

        with patch("httpx.AsyncClient.get", return_value=mock_resp):
            client = CrossRefClient()
            result = await client.get_work("10.1000/bad")

        self.assertIsNone(result["reference"])

    async def test_get_work_returns_none_on_exception(self):
        with patch("httpx.AsyncClient.get", side_effect=Exception("Timeout")):
            client = CrossRefClient()
            result = await client.get_work("10.1000/timeout")

        self.assertIsNone(result["reference"])

    def test_get_id(self):
        self.assertEqual(
            CrossRefClient.get_id("https://doi.org/10.1000/xyz"),
            "10.1000/xyz",
        )
        self.assertEqual(
            CrossRefClient.get_id("https://dx.doi.org/10.1000/xyz"),
            "10.1000/xyz",
        )
        self.assertEqual(CrossRefClient.get_id("not-a-doi"), "not-a-doi")
