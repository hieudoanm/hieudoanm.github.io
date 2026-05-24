package ip

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/spf13/cobra"
)

func NewDnsCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "dns <domain>",
		Short: "Perform a DNS A-record lookup",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			domain := args[0]

			req, err := http.NewRequest("GET",
				fmt.Sprintf("https://cloudflare-dns.com/dns-query?name=%s&type=A", domain),
				nil,
			)
			if err != nil {
				return err
			}
			req.Header.Set("Accept", "application/dns-json")

			resp, err := http.DefaultClient.Do(req)
			if err != nil {
				return fmt.Errorf("DNS lookup failed: %w", err)
			}
			defer resp.Body.Close()

			body, err := io.ReadAll(resp.Body)
			if err != nil {
				return fmt.Errorf("failed to read DNS response: %w", err)
			}

			// Pretty-print JSON
			var pretty map[string]any
			if err := json.Unmarshal(body, &pretty); err != nil {
				fmt.Println(string(body))
				return nil
			}
			b, _ := json.MarshalIndent(pretty, "", "  ")
			fmt.Println(string(b))
			return nil
		},
	}
}
