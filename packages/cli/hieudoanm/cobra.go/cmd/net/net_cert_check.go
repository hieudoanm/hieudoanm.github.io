package net

import (
	"fmt"
	"time"

	"github.com/spf13/cobra"
)

type certCheck struct {
	Host      string   `json:"host"`
	Subject   string   `json:"subject"`
	Issuer    string   `json:"issuer"`
	NotAfter  string   `json:"notAfter"`
	Remaining string   `json:"remaining"`
	Status    string   `json:"status"`
	DNSNames  []string `json:"dnsNames"`
	DNSCount  int      `json:"dnsNamesCount"`
}

func buildCertCheck(host string, remaining time.Duration, dnsNames []string) certCheck {
	status := "valid"
	if remaining < 0 {
		status = "expired"
	} else if remaining < 30*24*time.Hour {
		status = "expiring_soon"
	}
	return certCheck{
		Host:      host,
		Remaining: remaining.String(),
		Status:    status,
		DNSNames:  dnsNames,
		DNSCount:  len(dnsNames),
	}
}

func printCertCheck(c certCheck) {
	fmt.Printf("Host      : %s\n", c.Host)
	fmt.Printf("Status    : ")
	if c.Status == "expired" {
		fmt.Printf("EXPIRED\n")
	} else if c.Status == "expiring_soon" {
		fmt.Printf("Expiring soon\n")
	} else {
		fmt.Printf("Valid\n")
	}
	fmt.Printf("SANs      : %d DNS names\n", c.DNSCount)
}

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
