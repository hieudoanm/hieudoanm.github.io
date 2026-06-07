package cert

import (
	"github.com/spf13/cobra"
)

func newCertInfoCmd() *cobra.Command {
	var host string
	cmd := &cobra.Command{
		Use:   "info [--host <host:port>]",
		Short: "Show detailed certificate information",
		Long:  `Retrieve and display the full certificate chain for a TLS endpoint.`,
		Example: `  cert info --host google.com:443
  cert info --host example.org:8443`,
		RunE: func(cmd *cobra.Command, args []string) error {
			conn, err := certDialFn(host)
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

	cmd.Flags().StringVarP(&host, "host", "H", "", "Host:port to inspect")
	return cmd
}
