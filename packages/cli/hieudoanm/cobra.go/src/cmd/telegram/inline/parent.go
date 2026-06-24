package inline

import (
	"github.com/spf13/cobra"
	"github.com/hieudoanm/jack/src/cmd/telegram/inline/answer"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "inline",
		Short: "Answer inline queries",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
		cmd.AddCommand(answer.NewCmd())
	return cmd
}
