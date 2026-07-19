import unittest
from unittest.mock import AsyncMock, patch

from api import GeminiClient
from api.types import GeminiContent, GeminiModel, GeminiRole, GeminiPart


class TestGeminiClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.json = MagicMock(return_value=data)
        return mock_resp

    async def test_generate_content(self):
        mock_resp = self._mock_resp(
            {
                "candidates": [
                    {
                        "content": {"role": "model", "parts": [{"text": "Hello!"}]},
                        "finishReason": "STOP",
                        "avgLogprobs": -0.5,
                    }
                ],
                "usageMetadata": {
                    "promptTokenCount": 10,
                    "candidatesTokenCount": 5,
                    "totalTokenCount": 15,
                    "promptTokensDetails": [],
                    "candidatesTokensDetails": [],
                },
                "modelVersion": "gemini-2.0-flash",
                "responseId": "test-id",
            }
        )

        with patch("httpx.AsyncClient.post", return_value=mock_resp) as mock_post:
            client = GeminiClient("test-key")
            contents = [GeminiContent(role=GeminiRole.USER, parts=[GeminiPart(text="Hi")])]
            result = await client.generate_content(contents)

        self.assertEqual(result["candidates"][0]["content"]["parts"][0]["text"], "Hello!")
        mock_post.assert_called_once()
        args, kwargs = mock_post.call_args
        self.assertIn("v1beta/models/gemini-2.0-flash:generateContent?key=test-key", args[0])

    async def test_generate_content_with_custom_model(self):
        mock_resp = self._mock_resp({"modelVersion": "gemini-2.5-flash"})

        with patch("httpx.AsyncClient.post", return_value=mock_resp):
            client = GeminiClient("test-key")
            contents = [GeminiContent(role=GeminiRole.USER, parts=[GeminiPart(text="Hi")])]
            result = await client.generate_content(contents, model=GeminiModel.GEMINI_2_5_FLASH)

        self.assertEqual(result["modelVersion"], "gemini-2.5-flash")

    async def test_generate_content_with_timeout(self):
        mock_resp = self._mock_resp({"responseId": "timeout-test"})

        with patch("httpx.AsyncClient.post", return_value=mock_resp) as mock_post:
            client = GeminiClient("test-key")
            contents = [GeminiContent(role=GeminiRole.USER, parts=[GeminiPart(text="Hi")])]
            result = await client.generate_content(contents, timeout_secs=30)

        self.assertEqual(result["responseId"], "timeout-test")
        _, kwargs = mock_post.call_args
        self.assertEqual(kwargs["timeout"], 30)
