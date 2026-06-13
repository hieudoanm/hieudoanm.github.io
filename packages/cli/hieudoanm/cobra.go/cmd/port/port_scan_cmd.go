package port

import (
	"github.com/spf13/cobra"
)

func newScanCmd() *cobra.Command {
	var host string
	var ports string
	var timeout int
	cmd := &cobra.Command{
		Use:   "scan [--host <host>]",
		Short: "Scan common ports on a host",
		Long:  `Scan a host for open ports. Defaults to the common ports list.`,
		Example: `  port scan --host localhost
  port scan --host google.com --ports 22,80,443
  port scan --host localhost --ports 8000-8100`,
		RunE: func(cmd *cobra.Command, args []string) error {
			portList := buildPortList(ports)
			openPorts := scanPorts(host, portList, timeout)
			outputScanResult(host, openPorts)
			return nil
		},
	}
	cmd.Flags().StringVarP(&host, "host", "H", "", "Host to scan")
	cmd.Flags().StringVar(&ports, "ports", "", "Port list (e.g. 22,80,443 or 8000-8100)")
	cmd.Flags().IntVarP(&timeout, "timeout", "t", 2, "Per-port timeout in seconds")
	return cmd
}
