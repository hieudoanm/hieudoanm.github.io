//go:build darwin || linux

package wificmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "wifi",
		Short: "List nearby Wi-Fi networks",
		Long:  `Scan and list nearby Wi-Fi networks with signal strength and security information.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			out, err := ScanWifi()
			if err != nil {
				return err
			}
			fmt.Println(out)
			return nil
		},
	}
}
