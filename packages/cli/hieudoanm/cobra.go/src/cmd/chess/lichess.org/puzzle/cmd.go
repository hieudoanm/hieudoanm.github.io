package puzzle

import "github.com/spf13/cobra"

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "puzzle",
		Short: "Puzzle of the day and puzzle lookup",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newDailyCmd())
	cmd.AddCommand(newByIDCmd())
	return cmd
}
