//go:build darwin || linux

package cmd

import (
	"fmt"

	"github.com/hieudoanm/hieudoanm/src/services/wifi"
	"github.com/spf13/cobra"
)

var wifiCmd = &cobra.Command{
	Use:   "wifi",
	Short: "List Wi-Fi networks",
	RunE: func(cmd *cobra.Command, args []string) error {
		out, err := wifi.ScanWifi()
		if err != nil {
			return err
		}
		fmt.Println(out)
		return nil
	},
}

func init() {
	rootCmd.AddCommand(wifiCmd)
}
