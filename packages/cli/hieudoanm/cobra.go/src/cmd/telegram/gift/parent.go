package gift

import (
	"github.com/spf13/cobra"
	"github.com/hieudoanm/jack/src/cmd/telegram/gift/send"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "gift",
		Short: "Send gifts",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
		cmd.AddCommand(send.NewCmd())
	return cmd
}
