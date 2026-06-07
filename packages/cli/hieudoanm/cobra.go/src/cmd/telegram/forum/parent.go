package forum

import (
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "forum",
		Short: "Manage forum topics",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newCreateCmd())
	cmd.AddCommand(newCloseCmd())
	cmd.AddCommand(newReopenCmd())
	cmd.AddCommand(newDeleteCmd())
	return cmd
}
