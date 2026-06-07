package message

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "message",
		Short: "Send Telegram messages",
		Long:  `Send, edit, delete, copy, forward messages and media via the Telegram Bot API.`,
		Example: `  telegram message send --chat-id @channel --text "Hello"
  telegram message edit --chat-id @channel --message-id 42 --text "Edited"
  telegram message delete --chat-id @channel --message-id 42
  telegram message copy --chat-id @channel --from-chat-id @other --message-id 7
  telegram message forward --chat-id @channel --from-chat-id @other --message-id 7
  telegram message photo --chat-id @channel --photo https://example.com/img.jpg`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newSendCmd())
	cmd.AddCommand(newEditCmd())
	cmd.AddCommand(newDeleteCmd())
	cmd.AddCommand(newCopyCmd())
	cmd.AddCommand(newForwardCmd())
	cmd.AddCommand(newPhotoCmd())
	cmd.AddCommand(newAudioCmd())
	cmd.AddCommand(newDocumentCmd())
	cmd.AddCommand(newVideoCmd())
	cmd.AddCommand(newAnimationCmd())
	cmd.AddCommand(newVoiceCmd())
	cmd.AddCommand(newVideoNoteCmd())
	cmd.AddCommand(newMediaGroupCmd())
	return cmd
}
