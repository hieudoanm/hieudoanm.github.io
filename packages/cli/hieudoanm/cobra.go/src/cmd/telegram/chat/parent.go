package chat

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "chat",
		Short: "Manage Telegram chats",
		Long:  `Manage Telegram chats: send actions, leave, or get chat info.`,
		Example: `  telegram chat action --chat-id @channel --action typing
  telegram chat leave --chat-id @channel
  telegram chat get --chat-id @channel
  telegram chat export-invite-link --chat-id @channel`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newActionCmd())
	cmd.AddCommand(newLeaveCmd())
	cmd.AddCommand(newGetCmd())
	cmd.AddCommand(newBanCmd())
	cmd.AddCommand(newUnbanCmd())
	cmd.AddCommand(newRestrictCmd())
	cmd.AddCommand(newPromoteCmd())
	cmd.AddCommand(newPinCmd())
	cmd.AddCommand(newExportInviteLinkCmd())
	cmd.AddCommand(newCreateInviteLinkCmd())
	cmd.AddCommand(newEditInviteLinkCmd())
	cmd.AddCommand(newRevokeInviteLinkCmd())
	return cmd
}
