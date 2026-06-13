package net

import (
	"crypto/tls"
	"fmt"
	"net"

	"github.com/spf13/cobra"
)

func dialTLS(host string) (*tls.Conn, error) {
	if _, _, err := net.SplitHostPort(host); err != nil {
		host = net.JoinHostPort(host, "443")
	}
	conn, err := tls.Dial("tcp", host, &tls.Config{InsecureSkipVerify: true})
	if err != nil {
		return nil, fmt.Errorf("connection failed: %w", err)
	}
	return conn, nil
}

func newCertInfoCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "info <host:port>",
		Short: "Show detailed certificate information",
		Long:  `Retrieve and display the full certificate chain for a TLS endpoint.`,
		Example: `  cert info google.com:443
  cert info example.org:8443`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			conn, err := dialTLS(args[0])
			if err != nil {
				return err
			}
			defer conn.Close()

			certs := formatCerts(conn.ConnectionState().PeerCertificates)
			if certJSONOut {
				printJSON(certs)
				return nil
			}
			printCertInfo(certs)
			return nil
		},
	}
}
