import unittest
from unittest.mock import AsyncMock, patch

from api import OpenAIClient
from api.types import OpenAIModel


class TestOpenAIClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.json = MagicMock(return_value=data)
        return mock_resp

    async def test_get_chat_completions(self):
        mock_resp = self._mock_resp(
            {
                "id": "chatcmpl-123",
                "choices": [{"message": {"role": "assistant", "content": "Hello!"}}],
            }
        )

        with patch("httpx.AsyncClient.post", return_value=mock_resp) as mock_post:
            client = OpenAIClient("test-key")
            result = await client.get_chat_completions("Hi")

        self.assertEqual(result["id"], "chatcmpl-123")
        args, kwargs = mock_post.call_args
        self.assertEqual(args[0], "https://api.openai.com/v1/chat/completions")
        self.assertEqual(kwargs["json"]["model"], "gpt-4")
        self.assertEqual(kwargs["headers"]["Authorization"], "Bearer test-key")

    async def test_get_chat_completions_with_turbo(self):
        mock_resp = self._mock_resp({"id": "cmpl-456"})

        with patch("httpx.AsyncClient.post", return_value=mock_resp):
            client = OpenAIClient("test-key")
            result = await client.get_chat_completions(
                "Hi", model=OpenAIModel.GPT_4_TURBO
            )

        self.assertEqual(result["id"], "cmpl-456")
