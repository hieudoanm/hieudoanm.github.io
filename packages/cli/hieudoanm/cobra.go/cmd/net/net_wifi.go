//go:build darwin || linux

package net

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"github.com/spf13/cobra"
)

var wifiJSON bool

func newWifiCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "wifi",
		Short: "List nearby Wi-Fi networks",
		Long:  `Scan and list nearby Wi-Fi networks with signal strength and security information.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			out, err := ScanWifi()
			if err != nil {
				return err
			}
			if wifiJSON {
				networks := parseWifiOutput(out)
				b, _ := json.MarshalIndent(networks, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Println(out)
			}
			return nil
		},
	}
	cmd.Flags().BoolVar(&wifiJSON, "json", false, "Output in JSON format")
	return cmd
}

func parseWifiOutput(out string) []map[string]interface{} {
	var networks []map[string]interface{}
	for _, line := range strings.Split(strings.TrimSpace(out), "\n") {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		parts := strings.SplitN(line, " | ", 3)
		if len(parts) < 3 {
			continue
		}
		ssid := parts[0]
		rssiStr := strings.TrimPrefix(parts[1], "RSSI: ")
		rssi, _ := strconv.Atoi(strings.TrimSpace(rssiStr))
		security := strings.TrimSpace(parts[2])
		networks = append(networks, map[string]interface{}{
			"ssid":     ssid,
			"rssi":     rssi,
			"security": security,
		})
	}
	return networks
}
