//go:build darwin || linux

package net

import (
	"encoding/json"
	"fmt"

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
