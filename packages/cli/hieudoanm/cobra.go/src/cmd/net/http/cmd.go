package http

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

var (
	httpGet    = requests.Get
	httpPost   = requests.Post
	httpPut    = requests.Put
	httpDelete = requests.Delete
)

func NewCmd() *cobra.Command {
	var url, method, data, header string
	var httpJSON bool

	cmd := &cobra.Command{
		Use:   "http [--url <url>]",
		Short: "Make HTTP requests",
		Long:  `Make HTTP GET, POST, PUT, DELETE requests to URLs.`,
		Example: `  net http --url https://api.example.com/data
  net http --url https://api.example.com --method POST --data '{"key":"value"}'
  net http --url https://api.example.com/resource/1 --method DELETE
  net http --url https://api.example.com --header "Authorization: Bearer token"`,
		RunE: func(cmd *cobra.Command, args []string) error {
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
				body, err = httpGet(url, opts)
			case http.MethodPost:
				body, err = httpPost(url, opts)
			case http.MethodPut:
				body, err = httpPut(url, opts)
			case http.MethodDelete:
				body, err = httpDelete(url, opts)
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

	cmd.Flags().StringVarP(&url, "url", "u", "", "URL to request")
	cmd.Flags().StringVarP(&method, "method", "X", "GET", "HTTP method (GET, POST, PUT, DELETE)")
	cmd.Flags().StringVarP(&data, "data", "d", "", "Request body data")
	cmd.Flags().StringVarP(&header, "header", "H", "", "Request headers (key:val,key2:val2)")
	cmd.Flags().BoolVar(&httpJSON, "json", false, "Pretty-print JSON response")
	return cmd
}
