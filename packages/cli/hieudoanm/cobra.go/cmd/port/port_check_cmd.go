package port

import (
	"fmt"
	"net"

	"github.com/spf13/cobra"
)

func newCheckCmd() *cobra.Command {
	var target string
	var timeout int
	cmd := &cobra.Command{
		Use:   "check [--target <host:port>]",
		Short: "Check if a port is open",
		Long:  `Check whether a specific TCP port is open on a given host. Supports configurable connection timeout.`,
		Example: `  port check --target localhost:8080
  port check --target google.com:443
  port check --target 192.168.1.1:22 --timeout 5`,
		RunE: func(cmd *cobra.Command, args []string) error {
			host := target
			if _, _, err := net.SplitHostPort(host); err != nil {
				return fmt.Errorf("use host:port format (e.g. localhost:8080)")
			}

			open := checkPortOpen(host, timeout)
			outputCheckResult(host, open)
			return nil
		},
	}
	cmd.Flags().StringVarP(&target, "target", "T", "", "Host:port to check")
	cmd.Flags().IntVarP(&timeout, "timeout", "t", 3, "Connection timeout in seconds")
	return cmd
}
