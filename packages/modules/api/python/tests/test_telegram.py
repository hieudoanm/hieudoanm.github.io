import unittest
from unittest.mock import AsyncMock, patch

from api import TelegramClient, ParseMode


class TestTelegramClient(unittest.IsolatedAsyncioTestCase):
    def _mock_resp(self, data):
        from unittest.mock import MagicMock

        mock_resp = AsyncMock()
        mock_resp.json = MagicMock(return_value=data)
        return mock_resp

    async def test_send_message(self):
        mock_resp = self._mock_resp({"ok": True})

        with patch("httpx.AsyncClient.post", return_value=mock_resp) as mock_post:
            client = TelegramClient("test-token")
            await client.send_message(12345, "Hello", ParseMode.HTML)

        mock_post.assert_called_once()
        args, kwargs = mock_post.call_args
        self.assertIn("test-token/sendMessage", args[0])
        self.assertEqual(kwargs["params"]["chat_id"], 12345)
        self.assertEqual(kwargs["params"]["text"], "Hello")
        self.assertEqual(kwargs["params"]["parse_mode"], "html")

    async def test_send_message_empty_token(self):
        with self.assertRaises(ValueError):
            client = TelegramClient("")
            await client.send_message(12345, "Hello")

    async def test_send_message_zero_chat_id(self):
        with self.assertRaises(ValueError):
            client = TelegramClient("token")
            await client.send_message(0, "Hello")

    async def test_send_message_empty_message(self):
        with self.assertRaises(ValueError):
            client = TelegramClient("token")
            await client.send_message(12345, "")

    async def test_set_webhook(self):
        mock_resp = self._mock_resp({"ok": True, "result": True})

        with patch("httpx.AsyncClient.post", return_value=mock_resp) as mock_post:
            client = TelegramClient("test-token")
            result = await client.set_webhook("https://example.com/webhook")

        self.assertTrue(result["ok"])
        mock_post.assert_called_once_with(
            "https://api.telegram.org/bottest-token/setWebhook",
            json={"url": "https://example.com/webhook"},
        )

    async def test_set_webhook_empty_token(self):
        with self.assertRaises(ValueError):
            client = TelegramClient("")
            await client.set_webhook("https://example.com/webhook")

    async def test_set_webhook_empty_url(self):
        with self.assertRaises(ValueError):
            client = TelegramClient("token")
            await client.set_webhook("")

    async def test_delete_webhook(self):
        mock_resp = self._mock_resp({"ok": True, "result": True})

        with patch("httpx.AsyncClient.post", return_value=mock_resp):
            client = TelegramClient("test-token")
            result = await client.delete_webhook("https://example.com/webhook")

        self.assertTrue(result["ok"])

    async def test_get_webhook_info(self):
        mock_resp = self._mock_resp(
            {
                "ok": True,
                "result": {
                    "url": "https://example.com/webhook",
                    "pending_update_count": 5,
                },
            }
        )

        with patch("httpx.AsyncClient.post", return_value=mock_resp):
            client = TelegramClient("test-token")
            result = await client.get_webhook_info()

        self.assertEqual(result["result"]["pending_update_count"], 5)

    async def test_get_webhook_info_empty_token(self):
        with self.assertRaises(ValueError):
            client = TelegramClient("")
            await client.get_webhook_info()
