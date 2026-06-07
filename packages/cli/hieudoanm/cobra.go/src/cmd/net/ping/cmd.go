package ping

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
	"time"

	"github.com/spf13/cobra"
)

var (
	pingJSON       bool
	netDialTimeout = net.DialTimeout
)

func NewCmd() *cobra.Command {
	var host string
	var port int
	var count int
	var timeout time.Duration

	cmd := &cobra.Command{
		Use:   "ping [--host <host>]",
		Short: "TCP ping to check host reachability",
		Long:  `Test TCP connectivity to a host with timing statistics. Uses TCP dial (not ICMP).`,
		Example: `  net ping --host example.com
  net ping --host example.com --port 443
  net ping --host example.com --count 5
  net ping --host google.com --port 443 --count 3 --timeout 2s`,
		RunE: func(cmd *cobra.Command, args []string) error {
			var successes, failures int
			var total time.Duration

			if count < 1 {
				count = 4
			}

			type result struct {
				Seq     int    `json:"seq"`
				Success bool   `json:"success"`
				Latency string `json:"latency,omitempty"`
				Error   string `json:"error,omitempty"`
			}
			var results []result

			for i := 0; i < count; i++ {
				addr := net.JoinHostPort(host, strconv.Itoa(port))
				start := time.Now()
				conn, err := netDialTimeout("tcp", addr, timeout)
				elapsed := time.Since(start)

				if err != nil {
					failures++
					r := result{Seq: i + 1, Success: false, Error: err.Error()}
					if pingJSON {
						results = append(results, r)
					} else {
						fmt.Printf("PING %s (port %d) — seq=%d time=%s error=%s\n",
							host, port, i+1, elapsed.Round(time.Millisecond), err)
					}
				} else {
					conn.Close()
					successes++
					total += elapsed
					r := result{Seq: i + 1, Success: true, Latency: elapsed.Round(time.Millisecond).String()}
					if pingJSON {
						results = append(results, r)
					} else {
						fmt.Printf("PING %s (port %d) — seq=%d time=%s\n",
							host, port, i+1, elapsed.Round(time.Millisecond))
					}
				}
			}

			if pingJSON {
				avg := time.Duration(0)
				if successes > 0 {
					avg = total / time.Duration(successes)
				}
				out, err := json.MarshalIndent(map[string]interface{}{
					"host":      host,
					"port":      port,
					"sent":      count,
					"successes": successes,
					"failures":  failures,
					"avg_ms":    avg.Round(time.Millisecond).String(),
					"results":   results,
				}, "", "  ")
				if err != nil {
					return err
				}
				fmt.Println(string(out))
			} else {
				fmt.Printf("\n--- %s ping statistics ---\n", host)
				fmt.Printf("%d sent, %d received, %.0f%% loss\n",
					count, successes, float64(failures)/float64(count)*100)
				if successes > 0 {
					avg := total / time.Duration(successes)
					fmt.Printf("avg time: %s\n", avg.Round(time.Millisecond))
				}
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&host, "host", "H", "", "Host to ping")
	cmd.Flags().IntVarP(&port, "port", "p", 80, "TCP port")
	cmd.Flags().IntVarP(&count, "count", "c", 4, "Number of pings")
	cmd.Flags().DurationVarP(&timeout, "timeout", "t", 5*time.Second, "Per-ping timeout")
	cmd.Flags().BoolVar(&pingJSON, "json", false, "Output in JSON format")
	return cmd
}
