package net

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/hieudoanm/hieudoanm/libs/requests"
	"github.com/spf13/cobra"
)

func newHTTPCmd() *cobra.Command {
	var method, data, header string
	var httpJSON bool

	cmd := &cobra.Command{
		Use:   "http <url>",
		Short: "Make HTTP requests",
		Long:  `Make HTTP GET, POST, PUT, DELETE requests to URLs.`,
		Example: `  net http https://api.example.com/data
  net http --method POST --data '{"key":"value"}' https://api.example.com
  net http --method DELETE https://api.example.com/resource/1
  net http --header "Authorization: Bearer token" https://api.example.com`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			url := args[0]
			method = strings.ToUpper(method)
			if method == "" {
				method = http.MethodGet
			}

			opts := requests.Options{}
			if data != "" {
				opts.Body = []byte(data)
			}
			if header != "" {
				headers := make(http.Header)
				for _, h := range strings.Split(header, ",") {
					h = strings.TrimSpace(h)
					if parts := strings.SplitN(h, ":", 2); len(parts) == 2 {
						headers.Set(strings.TrimSpace(parts[0]), strings.TrimSpace(parts[1]))
					}
				}
				opts.Header = headers
			}

			var body []byte
			var err error

			switch method {
			case http.MethodGet:
				body, err = requests.Get(url, opts)
			case http.MethodPost:
				body, err = requests.Post(url, opts)
			case http.MethodPut:
				body, err = requests.Put(url, opts)
			case http.MethodDelete:
				body, err = requests.Delete(url, opts)
			default:
				return fmt.Errorf("unsupported method: %s (use GET, POST, PUT, DELETE)", method)
			}
			if err != nil {
				return fmt.Errorf("request failed: %w", err)
			}

			if httpJSON {
				var parsed interface{}
				if err := json.Unmarshal(body, &parsed); err == nil {
					b, _ := json.MarshalIndent(parsed, "", "  ")
					fmt.Println(string(b))
				} else {
					fmt.Println(string(body))
				}
			} else {
				fmt.Println(string(body))
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&method, "method", "X", "GET", "HTTP method (GET, POST, PUT, DELETE)")
	cmd.Flags().StringVarP(&data, "data", "d", "", "Request body data")
	cmd.Flags().StringVarP(&header, "header", "H", "", "Request headers (key:val,key2:val2)")
	cmd.Flags().BoolVar(&httpJSON, "json", false, "Pretty-print JSON response")
	return cmd
}
