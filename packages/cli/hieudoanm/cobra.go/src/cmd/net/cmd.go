package net

import (
	"github.com/hieudoanm/jack/src/cmd/net/cert"
	"github.com/hieudoanm/jack/src/cmd/net/http"
	"github.com/hieudoanm/jack/src/cmd/net/ip"
	"github.com/hieudoanm/jack/src/cmd/net/ping"
	"github.com/hieudoanm/jack/src/cmd/net/serve"
	"github.com/hieudoanm/jack/src/cmd/net/status"
	"github.com/hieudoanm/jack/src/cmd/net/whois"
	"github.com/hieudoanm/jack/src/cmd/net/wifi"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "net",
		Short: "Network diagnostics and servers",
		Long:  `IP geolocation, WiFi scanning, TLS certificates, HTTP serving, and cloud status.`,
		Example: `  net ip
  net ping --host google.com --port 443
  net whois --domain example.com
  net cert info --host google.com:443`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(
		cert.NewCmd(),
		ip.NewCmd(),
		ping.NewCmd(),
		serve.NewCmd(),
		status.NewCmd(),
		wifi.NewCmd(),
		http.NewCmd(),
		whois.NewCmd(),
	)
	return cmd
}
