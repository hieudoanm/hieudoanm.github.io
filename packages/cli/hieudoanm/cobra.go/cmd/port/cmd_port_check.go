package port

import (
	"fmt"
	"net"

	"github.com/spf13/cobra"
)

func newCheckCmd() *cobra.Command {
	var timeout int
	cmd := &cobra.Command{
		Use:   "check <host:port>",
		Short: "Check if a port is open",
		Example: `  port check localhost:8080
  port check google.com:443
  port check --timeout 5 192.168.1.1:22`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			host := args[0]
			if _, _, err := net.SplitHostPort(host); err != nil {
				return fmt.Errorf("use host:port format (e.g. localhost:8080)")
			}

			open := checkPortOpen(host, timeout)
			outputCheckResult(host, open)
			return nil
		},
	}
	cmd.Flags().IntVarP(&timeout, "timeout", "t", 3, "Connection timeout in seconds")
	return cmd
}
