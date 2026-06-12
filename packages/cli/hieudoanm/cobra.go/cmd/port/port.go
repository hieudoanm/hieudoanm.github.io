package port

import (
	"encoding/json"
	"fmt"
	"net"
	"sort"
	"strconv"
	"strings"
	"time"

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

			conn, err := net.DialTimeout("tcp", host, time.Duration(timeout)*time.Second)
			open := err == nil
			if conn != nil {
				conn.Close()
			}

			if jsonOutput {
				parts := strings.SplitN(host, ":", 2)
				portNum, _ := strconv.Atoi(parts[1])
				b, _ := json.MarshalIndent(map[string]interface{}{
					"host":    parts[0],
					"port":    portNum,
					"open":    open,
				}, "", "  ")
				fmt.Println(string(b))
			} else if open {
				fmt.Printf("Port %s is open\n", host)
			} else {
				fmt.Printf("Port %s is closed\n", host)
			}
			return nil
		},
	}
	cmd.Flags().IntVarP(&timeout, "timeout", "t", 3, "Connection timeout in seconds")
	return cmd
}

func newFindCmd() *cobra.Command {
	var start, end int
	cmd := &cobra.Command{
		Use:   "find",
		Short: "Find an available port in a range",
		Example: `  port find
  port find --start 3000 --end 3010`,
		RunE: func(cmd *cobra.Command, args []string) error {
			for port := start; port <= end; port++ {
				addr := fmt.Sprintf("localhost:%d", port)
				conn, err := net.DialTimeout("tcp", addr, 500*time.Millisecond)
				if err != nil {
					if jsonOutput {
						b, _ := json.MarshalIndent(map[string]interface{}{
							"port": port,
						}, "", "  ")
						fmt.Println(string(b))
					} else {
						fmt.Printf("Available port: %d\n", port)
					}
					return nil
				}
				conn.Close()
			}
			return fmt.Errorf("no available ports in range %d-%d", start, end)
		},
	}
	cmd.Flags().IntVarP(&start, "start", "s", 8000, "Start of port range")
	cmd.Flags().IntVarP(&end, "end", "e", 9000, "End of port range")
	return cmd
}

var commonPorts = map[int]string{
	21: "FTP", 22: "SSH", 23: "Telnet", 25: "SMTP",
	53: "DNS", 80: "HTTP", 110: "POP3", 143: "IMAP",
	443: "HTTPS", 465: "SMTPS", 587: "SMTP Submission",
	993: "IMAPS", 995: "POP3S", 1433: "MSSQL",
	3306: "MySQL", 3389: "RDP", 5432: "PostgreSQL",
	6379: "Redis", 8080: "HTTP-Alt", 8443: "HTTPS-Alt",
	27017: "MongoDB",
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
			host := args[0]
			var openPorts []int

			for _, p := range portList {
				addr := net.JoinHostPort(host, strconv.Itoa(p))
				conn, err := net.DialTimeout("tcp", addr, time.Duration(timeout)*time.Second)
				if err != nil {
					continue
				}
				conn.Close()
				openPorts = append(openPorts, p)
			}

			if jsonOutput {
				type portInfo struct {
					Port int    `json:"port"`
					Name string `json:"name"`
				}
				var result []portInfo
				for _, p := range openPorts {
					name := commonPorts[p]
					if name == "" {
						name = "Unknown"
					}
					result = append(result, portInfo{p, name})
				}
				b, _ := json.MarshalIndent(map[string]interface{}{
					"host":  host,
					"ports": result,
				}, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			if len(openPorts) == 0 {
				fmt.Printf("No open ports found on %s\n", host)
				return nil
			}

			fmt.Printf("Open ports on %s:\n", host)
			fmt.Println(strings.Repeat("─", 40))
			for _, p := range openPorts {
				name := commonPorts[p]
				if name == "" {
					name = "Unknown"
				}
				fmt.Printf("  %5d  %s\n", p, name)
			}
			return nil
		},
	}
	cmd.Flags().StringVar(&ports, "ports", "", "Port list (e.g. 22,80,443 or 8000-8100)")
	cmd.Flags().IntVarP(&timeout, "timeout", "t", 2, "Per-port timeout in seconds")
	return cmd
}

func buildPortList(s string) []int {
	if s == "" {
		keys := make([]int, 0, len(commonPorts))
		for k := range commonPorts {
			keys = append(keys, k)
		}
		sort.Ints(keys)
		return keys
	}

	var ports []int
	for _, part := range strings.Split(s, ",") {
		part = strings.TrimSpace(part)
		if strings.Contains(part, "-") {
			parts := strings.SplitN(part, "-", 2)
			start, err1 := strconv.Atoi(strings.TrimSpace(parts[0]))
			end, err2 := strconv.Atoi(strings.TrimSpace(parts[1]))
			if err1 == nil && err2 == nil && start <= end {
				for p := start; p <= end; p++ {
					ports = append(ports, p)
				}
			}
		} else {
			if p, err := strconv.Atoi(part); err == nil {
				ports = append(ports, p)
			}
		}
	}
	sort.Ints(ports)
	return ports
}
