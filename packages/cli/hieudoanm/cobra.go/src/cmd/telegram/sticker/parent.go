package sticker

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "sticker",
		Short: "Send stickers",
		Long:  `Send stickers and custom emoji to Telegram chats.`,
		Example: `  telegram sticker send --chat-id @channel --sticker CAACAgIAAxkBAAIB
  telegram sticker set-title --name "my_set" --title "New Title"`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newSendCmd())
	cmd.AddCommand(newSetTitleCmd())
	cmd.AddCommand(newSetThumbnailCmd())
	cmd.AddCommand(newAddToSetCmd())
	cmd.AddCommand(newRemoveFromSetCmd())
	cmd.AddCommand(newSetPositionCmd())
	cmd.AddCommand(newSetEmojiListCmd())
	cmd.AddCommand(newSetKeywordsCmd())
	cmd.AddCommand(newReplaceInSetCmd())
	return cmd
}
