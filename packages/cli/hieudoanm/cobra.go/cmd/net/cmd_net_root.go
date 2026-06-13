package net

import "github.com/spf13/cobra"

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "net",
		Short: "Network diagnostics and servers",
		Long:  `IP geolocation, WiFi scanning, TLS certificates, HTTP serving, and cloud status.`,
	}
	cmd.AddCommand(
		newCertCmd(),
		newDNSSubCmd(),
		newIPCmd(),
		newPingCmd(),
		newServeCmd(),
		newStatusCmd(),
		newWifiCmd(),
		newHTTPCmd(),
		newWhoisCmd(),
	)
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	return cmd
}
