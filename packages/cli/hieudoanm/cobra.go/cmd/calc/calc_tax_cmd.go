package calc

import (
	"github.com/spf13/cobra"
)

func newTaxCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "tax",
		Short: "Calculate Vietnam personal income tax",
		Long:  `Calculate Vietnam personal income tax (PIT) with a terminal UI. Supports gross-to-net and net-to-gross modes, dependent deductions, and insurance.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			return runTaxUI()
		},
	}
}
