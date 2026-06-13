package port

import (
	"github.com/spf13/cobra"
)

func newScanCmd() *cobra.Command {
	var ports string
	var timeout int
	cmd := &cobra.Command{
		Use:   "scan <host>",
		Short: "Scan common ports on a host",
		Long:  `Scan a host for open ports. Defaults to the common ports list.`,
		Example: `  port scan localhost
  port scan --ports 22,80,443 google.com
  port scan --ports 8000-8100 localhost`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			portList := buildPortList(ports)
			openPorts := scanPorts(args[0], portList, timeout)
			outputScanResult(args[0], openPorts)
			return nil
		},
	}
	cmd.Flags().StringVar(&ports, "ports", "", "Port list (e.g. 22,80,443 or 8000-8100)")
	cmd.Flags().IntVarP(&timeout, "timeout", "t", 2, "Per-port timeout in seconds")
	return cmd
}
