package net

import (
	"fmt"
	"time"

	"github.com/spf13/cobra"
)

func newCertCheckCmd() *cobra.Command {
	var host string
	var warnDays int
	cmd := &cobra.Command{
		Use:   "check [--host <host:port>]",
		Short: "Quick certificate health check (expiry warning)",
		Example: `  cert check --host google.com:443
  cert check --host example.org --warn 30`,
		RunE: func(cmd *cobra.Command, args []string) error {
			conn, err := dialTLS(host)
			if err != nil {
				return err
			}
			defer conn.Close()

			state := conn.ConnectionState()
			if len(state.PeerCertificates) == 0 {
				return fmt.Errorf("no certificates returned")
			}

			leaf := state.PeerCertificates[0]
			remaining := leaf.NotAfter.Sub(time.Now())

			if certJSONOut {
				printJSON(buildCertCheck(host, remaining, leaf.DNSNames))
				return nil
			}
			printCertCheck(buildCertCheck(host, remaining, leaf.DNSNames))
			return nil
		},
	}
	cmd.Flags().StringVarP(&host, "host", "H", "", "Host:port to check")
	cmd.Flags().IntVarP(&warnDays, "warn", "w", 30, "Warning threshold in days")
	return cmd
}
