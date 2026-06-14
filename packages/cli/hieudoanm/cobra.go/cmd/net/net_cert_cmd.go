package net

import (
	"github.com/spf13/cobra"
)

var certJSONOut bool

func newCertCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "cert",
		Short: "SSL/TLS certificate inspection",
		Long:  `Inspect SSL/TLS certificates for domains: check expiry, issuer, SANs, and chain.`,
		Example: `  net cert info --host google.com:443
  net cert check --host google.com:443`,
	}
	cmd.AddCommand(newCertInfoCmd())
	cmd.AddCommand(newCertCheckCmd())
	cmd.PersistentFlags().BoolVar(&certJSONOut, "json", false, "Output in JSON format")
	return cmd
}
