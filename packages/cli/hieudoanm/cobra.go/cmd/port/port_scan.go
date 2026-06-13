package port

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
	"strings"

	"github.com/spf13/cobra"
)

type portInfo struct {
	Port int    `json:"port"`
	Name string `json:"name"`
}

func scanPorts(host string, ports []int, timeout int) []portInfo {
	var openPorts []portInfo
	for _, p := range ports {
		addr := net.JoinHostPort(host, strconv.Itoa(p))
		if checkPortOpen(addr, timeout) {
			name := commonPorts[p]
			if name == "" {
				name = "Unknown"
			}
			openPorts = append(openPorts, portInfo{p, name})
		}
	}
	return openPorts
}

func outputScanResult(host string, openPorts []portInfo) {
	if jsonOutput {
		b, _ := json.MarshalIndent(map[string]interface{}{
			"host":  host,
			"ports": openPorts,
		}, "", "  ")
		fmt.Println(string(b))
		return
	}

	if len(openPorts) == 0 {
		fmt.Printf("No open ports found on %s\n", host)
		return
	}

	fmt.Printf("Open ports on %s:\n", host)
	fmt.Println(strings.Repeat("─", 40))
	for _, p := range openPorts {
		fmt.Printf("  %5d  %s\n", p.Port, p.Name)
	}
}

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
