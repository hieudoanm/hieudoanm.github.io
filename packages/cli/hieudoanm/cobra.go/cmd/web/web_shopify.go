package web

import (
	"bufio"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/hieudoanm/hieudoanm/libs/colors"
	"github.com/spf13/cobra"
)

func CheckShopify(url string) (isShopify bool, isPlus bool, signals []string, err error) {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return
	}

	req.Header.Set("User-Agent", "shopify-check/1.0")

	resp, err := client.Do(req)
	if err != nil {
		return
	}
	defer resp.Body.Close()

	for key, values := range resp.Header {
		lk := strings.ToLower(key)

		if strings.HasPrefix(lk, "x-shopify") {
			isShopify = true
			signals = append(signals, "Header: "+key)

			if lk == "x-shopify-stage" || lk == "x-shopify-shop-api-call-limit" {
				isPlus = true
			}
		}

		for _, v := range values {
			lv := strings.ToLower(v)
			if strings.Contains(lv, "shopify") {
				isShopify = true
				signals = append(signals, "Header value: "+key)
			}
		}
	}

	buf := make([]byte, 16*1024)
	n, _ := resp.Body.Read(buf)
	html := strings.ToLower(string(buf[:n]))

	if strings.Contains(html, "cdn.shopify.com") {
		isShopify = true
		signals = append(signals, "HTML: cdn.shopify.com")
	}

	if strings.Contains(html, "shopify-section") {
		isShopify = true
		signals = append(signals, "HTML: shopify-section")
	}

	if strings.Contains(html, "shopify-plus") {
		isPlus = true
		signals = append(signals, "HTML: shopify-plus")
	}

	return
}

var (
	shopifyVerbose bool
	shopifyJSON    bool
)

func newShopifyCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "shopify",
		Short: "Shopify detection and analysis tools",
	}
	cmd.AddCommand(newShopifyDetectCmd())
	return cmd
}

func newShopifyDetectCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "detect [url]",
		Short: "Run the detect operation for the shopify app",
		Args:  cobra.MaximumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			var url string

			if len(args) == 1 {
				url = args[0]
			} else {
				fmt.Print("Enter website URL: ")
				reader := bufio.NewReader(os.Stdin)
				input, err := reader.ReadString('\n')
				if err != nil {
					fmt.Fprintln(os.Stderr, colors.Red("❌ Failed to read input"))
					os.Exit(2)
				}
				url = strings.TrimSpace(input)
			}

			if url == "" {
				fmt.Fprintln(os.Stderr, colors.Red("❌ URL is required"))
				os.Exit(2)
			}

			if !strings.HasPrefix(url, "http://") && !strings.HasPrefix(url, "https://") {
				url = "https://" + url
			}

			isShopify, isPlus, signals, err := CheckShopify(url)
			if err != nil {
				fmt.Fprintln(os.Stderr, colors.Red("❌ Error:"), err)
				os.Exit(2)
			}

			if shopifyJSON {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"url":     url,
					"shopify": isShopify,
					"plus":    isPlus,
					"signals": signals,
				}, "", "  ")
				fmt.Println(string(out))
				return
			}

			if !isShopify {
				fmt.Println(colors.Red("✖ Shopify not detected"))
				os.Exit(1)
			}

			fmt.Println(colors.Green("✔ Shopify detected"))

			if isPlus {
				fmt.Println(colors.Green("✔ Shopify Plus detected"))
			} else {
				fmt.Println(colors.Yellow("ℹ Shopify Plus not detected"))
			}

			if shopifyVerbose {
				fmt.Println(colors.Dim("\nSignals:"))
				for _, s := range signals {
					fmt.Println(colors.Dim(" - " + s))
				}
			}
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
