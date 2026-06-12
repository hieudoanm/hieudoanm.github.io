package net

import (
	"bufio"
	"fmt"
	"net"
	"strings"
	"time"

	"github.com/spf13/cobra"
)

func newWhoisCmd() *cobra.Command {
	var server string

	cmd := &cobra.Command{
		Use:   "whois <domain>",
		Short: "WHOIS lookup for a domain",
		Long:  `Query WHOIS servers for domain registration information.`,
		Example: `  net whois example.com
  net whois google.com
  net whois example.com --server whois.verisign-grs.com`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			domain := strings.TrimSpace(args[0])
			whoisServer := server
			if whoisServer == "" {
				whoisServer = whoisLookupServer(domain)
			}

			conn, err := net.DialTimeout("tcp", net.JoinHostPort(whoisServer, "43"), 10*time.Second)
			if err != nil {
				return fmt.Errorf("connect to %s: %w", whoisServer, err)
			}
			defer conn.Close()

			conn.SetDeadline(time.Now().Add(10 * time.Second))
			fmt.Fprintf(conn, "%s\r\n", domain)

			sc := bufio.NewScanner(conn)
			sc.Buffer(make([]byte, 64*1024), 512*1024)
			var lines []string
			for sc.Scan() {
				lines = append(lines, sc.Text())
			}
			if err := sc.Err(); err != nil {
				return fmt.Errorf("read: %w", err)
			}

			fmt.Println(strings.Join(lines, "\n"))
			return nil
		},
	}

	cmd.Flags().StringVarP(&server, "server", "s", "", "WHOIS server to query")
	return cmd
}

func whoisLookupServer(domain string) string {
	parts := strings.Split(domain, ".")
	if len(parts) < 2 {
		return "whois.iana.org"
	}
	tld := parts[len(parts)-1]

	switch tld {
	case "com", "net":
		return "whois.verisign-grs.com"
	case "org":
		return "whois.pir.org"
	case "io":
		return "whois.nic.io"
	case "dev":
		return "whois.nic.dev"
	case "app":
		return "whois.nic.google"
	case "ai":
		return "whois.nic.ai"
	case "me":
		return "whois.nic.me"
	case "co":
		return "whois.nic.co"
	case "uk":
		return "whois.nic.uk"
	case "de":
		return "whois.denic.de"
	case "jp":
		return "whois.jprs.jp"
	case "fr":
		return "whois.nic.fr"
	case "xyz":
		return "whois.nic.xyz"
	default:
		return fmt.Sprintf("whois.nic.%s", tld)
	}
}
