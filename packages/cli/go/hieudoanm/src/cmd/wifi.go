package cmd

import (
	"fmt"
	"runtime"

	"github.com/hieudoanm/hieudoanm/src/services/wifi"
	"github.com/spf13/cobra"
)

var wifiCmd = &cobra.Command{
	Use:   "wifi",
	Short: "List Wi-Fi networks",
	RunE: func(cmd *cobra.Command, args []string) error {
		switch runtime.GOOS {
		case "darwin":
			out, err := wifi.ScanWifiDarwin()
			if err != nil {
				return err
			}
			fmt.Println(out)
			return nil
		default:
			return fmt.Errorf("unsupported OS for cgo demo: %s", runtime.GOOS)
		}
	},
}

func init() {
	rootCmd.AddCommand(wifiCmd)
}
