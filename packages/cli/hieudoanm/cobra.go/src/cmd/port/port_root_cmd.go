package port

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "port",
		Short: "Network port checking tools",
		Long:  `Check if ports are open, find available ports, and scan common ports.`,
		Example: `  port check --target localhost:8080
  port find --start 3000 --end 3010
  port scan --host localhost`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newCheckCmd())
	cmd.AddCommand(newFindCmd())
	cmd.AddCommand(newScanCmd())
	cmd.PersistentFlags().BoolP("json", "j", false, "Output in JSON format")
	return cmd
}
