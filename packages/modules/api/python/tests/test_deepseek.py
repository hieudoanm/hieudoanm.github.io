import unittest
from unittest.mock import AsyncMock, patch

from api import DeepSeekClient
from api.types import DeepSeekModel


class TestDeepSeekClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.json = MagicMock(return_value=data)
        return mock_resp

    async def test_get_chat_completions(self):
        mock_resp = self._mock_resp(
            {
                "id": "123",
                "object": "chat.completion",
                "choices": [{"message": {"role": "assistant", "content": "Hello!"}}],
            }
        )

        with patch("httpx.AsyncClient.post", return_value=mock_resp) as mock_post:
            client = DeepSeekClient("test-key")
            result = await client.get_chat_completions("Hi")

        self.assertEqual(result["id"], "123")
        mock_post.assert_called_once()
        args, kwargs = mock_post.call_args
        self.assertEqual(args[0], "https://api.deepseek.com/chat/completions")
        self.assertEqual(kwargs["json"]["model"], "deepseek-chat")
        self.assertEqual(kwargs["headers"]["Authorization"], "Bearer test-key")

    async def test_get_chat_completions_with_reasoner(self):
        mock_resp = self._mock_resp({"id": "456"})

        with patch("httpx.AsyncClient.post", return_value=mock_resp):
            client = DeepSeekClient("test-key")
            result = await client.get_chat_completions(
                "Think", model=DeepSeekModel.DEEPSEEK_REASONER
            )

        self.assertEqual(result["id"], "456")
