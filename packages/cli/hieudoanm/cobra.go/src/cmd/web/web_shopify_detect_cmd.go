package web

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/hieudoanm/jack/src/libs/colors"
	"github.com/spf13/cobra"
)

var (
	shopifyVerbose bool
	shopifyJSON    bool
)

func newShopifyDetectCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "detect [url]",
		Short: "Detect if a website is using Shopify",
		Long:  `Check a website URL for Shopify indicators including CDN references, script patterns, storefront API, and Shopify Plus headers.`,
		Example: `  web shopify detect example.com
  web shopify detect https://shop.example.com --verbose`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			var url string

			if len(args) == 1 {
				url = args[0]
			} else {
				fmt.Print("Enter website URL: ")
				reader := bufio.NewReader(os.Stdin)
				input, err := reader.ReadString('\n')
				if err != nil {
					return fmt.Errorf("failed to read input")
				}
				url = strings.TrimSpace(input)
			}

			if url == "" {
				return fmt.Errorf("URL is required")
			}

			if !strings.HasPrefix(url, "http://") && !strings.HasPrefix(url, "https://") {
				url = "https://" + url
			}

			isShopify, isPlus, signals, err := CheckShopify(url)
			if err != nil {
				return fmt.Errorf("error checking shopify: %w", err)
			}

			if shopifyJSON {
				out, err := json.MarshalIndent(map[string]interface{}{
					"url":     url,
					"shopify": isShopify,
					"plus":    isPlus,
					"signals": signals,
				}, "", "  ")
				if err != nil {
					return err
				}
				fmt.Println(string(out))
				return nil
			}

			if !isShopify {
				return fmt.Errorf("shopify not detected")
			}

			fmt.Println(colors.Green("Shopify detected"))

			if isPlus {
				fmt.Println(colors.Green("Shopify Plus detected"))
			} else {
				fmt.Println(colors.Yellow("Shopify Plus not detected"))
			}

			if shopifyVerbose {
				fmt.Println(colors.Dim("\nSignals:"))
				for _, s := range signals {
					fmt.Println(colors.Dim(" - " + s))
				}
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(
		&shopifyVerbose,
		"verbose",
		"v",
		false,
		"Show detection signals",
	)
	cmd.Flags().BoolVar(&shopifyJSON, "json", false, "Output in JSON format")
	return cmd
}
