package cert

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"net"
	"time"

	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "cert",
		Short: "SSL/TLS certificate inspection",
		Long:  `Inspect SSL/TLS certificates for domains: check expiry, issuer, SANs, and chain.`,
	}
	cmd.AddCommand(newInfoCmd())
	cmd.AddCommand(newCheckCmd())
	cmd.PersistentFlags().BoolVar(&jsonOutput, "json", false, "Output in JSON format")
	return cmd
}

func newInfoCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "info <host:port>",
		Short: "Show detailed certificate information",
		Long:  `Retrieve and display the full certificate chain for a TLS endpoint.`,
		Example: `  cert info google.com:443
  cert info example.org:8443`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			host := args[0]
			if _, _, err := net.SplitHostPort(host); err != nil {
				host = net.JoinHostPort(host, "443")
			}

			conn, err := tls.Dial("tcp", host, &tls.Config{
				InsecureSkipVerify: true,
			})
			if err != nil {
				return fmt.Errorf("connection failed: %w", err)
			}
			defer conn.Close()

			state := conn.ConnectionState()
			now := time.Now()

			type certJSON struct {
				Subject           string   `json:"subject"`
				Issuer            string   `json:"issuer"`
				Serial            string   `json:"serial"`
				Version           int      `json:"version"`
				NotBefore         string   `json:"notBefore"`
				NotAfter          string   `json:"notAfter"`
				Expired           bool     `json:"expired"`
				Remaining         string   `json:"remaining"`
				DNSNames          []string `json:"dnsNames,omitempty"`
				IPAddresses       []string `json:"ipAddresses,omitempty"`
				SignatureAlgo     string   `json:"signatureAlgorithm"`
				PublicKeyAlgo     string   `json:"publicKeyAlgorithm"`
			}

			var certs []certJSON
			for _, c := range state.PeerCertificates {
				remaining := c.NotAfter.Sub(now)
				ips := make([]string, len(c.IPAddresses))
				for i, ip := range c.IPAddresses {
					ips[i] = ip.String()
				}
				certs = append(certs, certJSON{
					Subject:       c.Subject.String(),
					Issuer:        c.Issuer.String(),
					Serial:        c.SerialNumber.String(),
					Version:       c.Version,
					NotBefore:     c.NotBefore.Format("2006-01-02 15:04:05"),
					NotAfter:      c.NotAfter.Format("2006-01-02 15:04:05"),
					Expired:       remaining < 0,
					Remaining:     remaining.Round(time.Second).String(),
					DNSNames:      c.DNSNames,
					IPAddresses:   ips,
					SignatureAlgo: c.SignatureAlgorithm.String(),
					PublicKeyAlgo: c.PublicKeyAlgorithm.String(),
				})
			}

			if jsonOutput {
				b, _ := json.MarshalIndent(certs, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			for i, c := range certs {
				fmt.Printf("── Certificate %d ──────────────────────\n", i+1)
				fmt.Printf("Subject   : %s\n", c.Subject)
				fmt.Printf("Issuer    : %s\n", c.Issuer)
				fmt.Printf("Serial    : %s\n", c.Serial)
				fmt.Printf("Version   : %d\n", c.Version)

				fmt.Printf("\nValidity:\n")
				fmt.Printf("  Not Before: %s\n", c.NotBefore)
				fmt.Printf("  Not After : %s\n", c.NotAfter)
				if c.Expired {
					fmt.Printf("  Status    : EXPIRED (%s ago)\n", c.Remaining)
				} else {
					fmt.Printf("  Status    : Valid (%s remaining)\n", c.Remaining)
				}

				if len(c.DNSNames) > 0 {
					fmt.Printf("\nDNS Names:\n")
					for _, n := range c.DNSNames {
						fmt.Printf("  - %s\n", n)
					}
				}
				if len(c.IPAddresses) > 0 {
					fmt.Printf("\nIP Addresses:\n")
					for _, ip := range c.IPAddresses {
						fmt.Printf("  - %s\n", ip)
					}
				}
				fmt.Printf("\nSignature Algorithm: %s\n", c.SignatureAlgo)
				fmt.Printf("Public Key Algorithm: %s\n", c.PublicKeyAlgo)
				fmt.Println()
			}

			return nil
		},
	}
}

func newCheckCmd() *cobra.Command {
	var warnDays int
	cmd := &cobra.Command{
		Use:   "check <host:port>",
		Short: "Quick certificate health check (expiry warning)",
		Example: `  cert check google.com:443
  cert check --warn 30 example.org`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			host := args[0]
			if _, _, err := net.SplitHostPort(host); err != nil {
				host = net.JoinHostPort(host, "443")
			}

			conn, err := tls.Dial("tcp", host, &tls.Config{
				InsecureSkipVerify: true,
			})
			if err != nil {
				return fmt.Errorf("connection failed: %w", err)
			}
			defer conn.Close()

			state := conn.ConnectionState()
			if len(state.PeerCertificates) == 0 {
				return fmt.Errorf("no certificates returned")
			}

			leaf := state.PeerCertificates[0]
			now := time.Now()
			warnDuration := time.Duration(warnDays) * 24 * time.Hour
			remaining := leaf.NotAfter.Sub(now)

			if jsonOutput {
				status := "valid"
				if remaining < 0 {
					status = "expired"
				} else if remaining < warnDuration {
					status = "expiring_soon"
				}
				b, _ := json.MarshalIndent(map[string]interface{}{
					"host":           host,
					"subject":        leaf.Subject.String(),
					"issuer":         leaf.Issuer.String(),
					"notAfter":       leaf.NotAfter.Format("2006-01-02T15:04:05Z"),
					"remaining":      remaining.String(),
					"status":         status,
					"dnsNames":       leaf.DNSNames,
					"dnsNamesCount":  len(leaf.DNSNames),
				}, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			fmt.Printf("Host      : %s\n", host)
			fmt.Printf("Subject   : %s\n", leaf.Subject)
			fmt.Printf("Issuer    : %s\n", leaf.Issuer)
			fmt.Printf("Expires   : %s\n", leaf.NotAfter.Format("2006-01-02 15:04:05"))

			if remaining < 0 {
				fmt.Printf("Status    : EXPIRED (%s ago)\n", (-remaining).Round(time.Second))
				return nil
			}

			if remaining < warnDuration {
				fmt.Printf("Status    : Expiring soon (%s remaining)\n", remaining.Round(time.Second))
			} else {
				fmt.Printf("Status    : Valid (%s remaining)\n", remaining.Round(time.Second))
			}

			fmt.Printf("SANs      : %d DNS names\n", len(leaf.DNSNames))
			return nil
		},
	}
	cmd.Flags().IntVarP(&warnDays, "warn", "w", 30, "Warning threshold in days")
	return cmd
}
