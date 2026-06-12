package net

import "github.com/spf13/cobra"

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "net",
		Short: "Network diagnostics and servers",
		Long:  `IP geolocation, WiFi scanning, TLS certificates, HTTP serving, and cloud status.`,
	}
	cmd.AddCommand(
		newCertCmd(),
		newIPCmd(),
		newServeCmd(),
		newStatusCmd(),
		newWifiCmd(),
	)
	return cmd
}
