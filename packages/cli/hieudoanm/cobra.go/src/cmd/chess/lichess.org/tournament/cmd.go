package tournament

import "github.com/spf13/cobra"

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "tournament",
		Short: "Tournament information and results",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newInfoCmd())
	cmd.AddCommand(newResultsCmd())
	return cmd
}
