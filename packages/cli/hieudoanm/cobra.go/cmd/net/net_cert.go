package net

import (
	"crypto/x509"
	"encoding/json"
	"fmt"
	"time"

	"github.com/spf13/cobra"
)

var certJSONOut bool

type certJSON struct {
	Subject       string   `json:"subject"`
	Issuer        string   `json:"issuer"`
	Serial        string   `json:"serial"`
	Version       int      `json:"version"`
	NotBefore     string   `json:"notBefore"`
	NotAfter      string   `json:"notAfter"`
	Expired       bool     `json:"expired"`
	Remaining     string   `json:"remaining"`
	DNSNames      []string `json:"dnsNames,omitempty"`
	IPAddresses   []string `json:"ipAddresses,omitempty"`
	SignatureAlgo string   `json:"signatureAlgorithm"`
	PublicKeyAlgo string   `json:"publicKeyAlgorithm"`
}

func printJSON(v interface{}) {
	b, _ := json.MarshalIndent(v, "", "  ")
	fmt.Println(string(b))
}

func formatCerts(certs []*x509.Certificate) []certJSON {
	now := time.Now()
	var result []certJSON
	for _, c := range certs {
		remaining := c.NotAfter.Sub(now)
		ips := make([]string, len(c.IPAddresses))
		for i, ip := range c.IPAddresses {
			ips[i] = ip.String()
		}
		result = append(result, certJSON{
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
	return result
}

func newCertCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "cert",
		Short: "SSL/TLS certificate inspection",
		Long:  `Inspect SSL/TLS certificates for domains: check expiry, issuer, SANs, and chain.`,
	}
	cmd.AddCommand(newCertInfoCmd())
	cmd.AddCommand(newCertCheckCmd())
	cmd.PersistentFlags().BoolVar(&certJSONOut, "json", false, "Output in JSON format")
	return cmd
}

func printCertInfo(certs []certJSON) {
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
}
