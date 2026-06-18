package telegram

import "os"

func TelegramBotToken() string {
	return os.Getenv("TELEGRAM_BOT_TOKEN")
}
