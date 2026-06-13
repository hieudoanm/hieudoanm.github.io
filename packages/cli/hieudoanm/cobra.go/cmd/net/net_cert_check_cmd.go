package net

import (
	"fmt"
	"time"

	"github.com/spf13/cobra"
)

func newCertCheckCmd() *cobra.Command {
	var warnDays int
	cmd := &cobra.Command{
		Use:   "check <host:port>",
		Short: "Quick certificate health check (expiry warning)",
		Example: `  cert check google.com:443
  cert check --warn 30 example.org`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			conn, err := dialTLS(args[0])
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
				printJSON(buildCertCheck(args[0], remaining, leaf.DNSNames))
				return nil
			}
			printCertCheck(buildCertCheck(args[0], remaining, leaf.DNSNames))
			return nil
		},
	}
	cmd.Flags().IntVarP(&warnDays, "warn", "w", 30, "Warning threshold in days")
	return cmd
}
