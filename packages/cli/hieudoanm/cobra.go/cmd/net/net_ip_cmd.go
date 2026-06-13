package net

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var (
	ipRawFlag bool
	ipJSON    bool
)

func newIPCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "ip",
		Short: "Ip CLI application (utilities tools)",
		Long: `The ip CLI application is a comprehensive backend utility belonging to the utilities suite of tools.

Use this root executable to manage configuring, running, and interacting with all ip-related operations securely and efficiently from your terminal.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			ip, err := fetchPublicIP()
			if err != nil {
				return err
			}

			info, err := fetchFromIPInfo(ip)
			if err != nil {
				fmt.Fprintf(os.Stderr, "IPinfo failed (%v), falling back to ipapi...\n", err)
				info, err = fetchFromIpapi(ip)
				if err != nil {
					return fmt.Errorf("both providers failed: %w", err)
				}
				printIPInfo(info, "ipapi", ipRawFlag || ipJSON)
				return nil
			}

			printIPInfo(info, "IPinfo", ipRawFlag || ipJSON)
			return nil
		},
	}

	cmd.Flags().BoolVarP(&ipRawFlag, "raw", "r", false, "Output raw JSON")
	cmd.Flags().BoolVar(&ipJSON, "json", false, "Output in JSON format")
	cmd.AddCommand(newDNSSubCmd())
	return cmd
}
