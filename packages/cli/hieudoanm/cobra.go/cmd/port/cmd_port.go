package port

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "port",
		Short: "Network port checking tools",
		Long:  `Check if ports are open, find available ports, and scan common ports.`,
	}
	cmd.AddCommand(newCheckCmd())
	cmd.AddCommand(newFindCmd())
	cmd.AddCommand(newScanCmd())
	cmd.PersistentFlags().BoolVar(&jsonOutput, "json", false, "Output in JSON format")
	return cmd
}
