package ip

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/hieudoanm/hieudoanm/libs/requests"
	"github.com/spf13/cobra"
)

func NewDnsCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "dns <domain>",
		Short: "Perform a DNS A-record lookup",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			domain := args[0]
			url := fmt.Sprintf("https://cloudflare-dns.com/dns-query?name=%s&type=A", domain)

			headers := make(http.Header)
			headers.Set("Accept", "application/dns-json")

			body, err := requests.Get(url, requests.Options{Header: headers})
			if err != nil {
				return fmt.Errorf("DNS lookup failed: %w", err)
			}

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
