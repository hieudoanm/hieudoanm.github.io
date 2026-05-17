import unittest
from unittest.mock import AsyncMock, patch

from api import NewsAPIClient
from api.types import Category, Country, SortBy


class TestNewsAPIClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.json = MagicMock(return_value=data)
        return mock_resp

    async def test_get_sources(self):
        mock_resp = self._mock_resp(
            {
                "status": "ok",
                "sources": [{"id": "test", "name": "Test Source"}],
            }
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = NewsAPIClient("test-key")
            result = await client.get_sources()

        self.assertEqual(result["status"], "ok")
        self.assertEqual(len(result["sources"]), 1)
        mock_get.assert_called_once_with(
            "https://newsapi.org/v2/sources",
            params={"category": "general", "country": "us", "language": "en"},
            headers={"X-Api-Key": "test-key"},
        )

    async def test_get_top_headlines_defaults(self):
        mock_resp = self._mock_resp(
            {
                "status": "ok",
                "totalResults": 1,
                "articles": [{"title": "Test"}],
            }
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = NewsAPIClient("test-key")
            result = await client.get_top_headlines()

        self.assertEqual(result["status"], "ok")
        mock_get.assert_called_once_with(
            "https://newsapi.org/v2/top-headlines",
            params={
                "category": "general",
                "country": "us",
                "page": 1,
                "pageSize": 20,
            },
            headers={"X-Api-Key": "test-key"},
        )

    async def test_get_top_headlines_with_query_and_sources(self):
        mock_resp = self._mock_resp({"status": "ok", "totalResults": 0, "articles": []})

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = NewsAPIClient("test-key")
            result = await client.get_top_headlines(
                category=Category.TECHNOLOGY,
                country=Country.UNITED_KINGDOM,
                query="AI",
                sources=["cnn", "bbc"],
            )

        self.assertEqual(result["status"], "ok")
        args, kwargs = mock_get.call_args
        params = kwargs["params"]
        self.assertEqual(params["category"], "technology")
        self.assertEqual(params["country"], "gb")
        self.assertEqual(params["q"], "AI")
        self.assertEqual(params["sources"], "cnn,bbc")

    async def test_get_everything(self):
        mock_resp = self._mock_resp(
            {
                "status": "ok",
                "totalResults": 2,
                "articles": [{"title": "A"}, {"title": "B"}],
            }
        )

        with patch("httpx.AsyncClient.get", return_value=mock_resp) as mock_get:
            client = NewsAPIClient("test-key")
            result = await client.get_everything(q="test", sort_by=SortBy.RELEVANCY)

        self.assertEqual(len(result["articles"]), 2)
        args, kwargs = mock_get.call_args
        self.assertEqual(kwargs["params"]["q"], "test")
        self.assertEqual(kwargs["params"]["sortBy"], "relevancy")
