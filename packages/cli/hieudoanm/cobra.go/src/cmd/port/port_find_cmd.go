package port

import (
	"github.com/spf13/cobra"
)

func newFindCmd() *cobra.Command {
	var start, end int
	cmd := &cobra.Command{
		Use:   "find",
		Short: "Find an available port in a range",
		Long:  `Find the first available TCP port within a given range. Useful for finding a free port for local development servers.`,
		Example: `  port find
  port find --start 3000 --end 3010`,
		RunE: func(cmd *cobra.Command, args []string) error {
			port, err := findAvailablePort(start, end)
			if err != nil {
				return err
			}
			outputFindResult(port)
			return nil
		},
	}
	cmd.Flags().IntVarP(&start, "start", "s", 8000, "Start of port range")
	cmd.Flags().IntVarP(&end, "end", "e", 9000, "End of port range")
	return cmd
}
