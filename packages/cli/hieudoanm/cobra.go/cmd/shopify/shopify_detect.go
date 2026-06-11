package shopify

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"github.com/hieudoanm/hieudoanm/libs/colors"

	"github.com/spf13/cobra"
)

var verbose bool

func NewDetectCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "detect [url]",
		Short: "Run the detect operation for the shopify app",
		Args:  cobra.MaximumNArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			var url string

			if len(args) == 1 {
				url = args[0]
			} else {
				// Prompt user for input
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

			if verbose {
				fmt.Println(colors.Dim("\nSignals:"))
				for _, s := range signals {
					fmt.Println(colors.Dim(" - " + s))
				}
			}
		},
	}

	cmd.Flags().BoolVarP(
		&verbose,
		"verbose",
		"v",
		false,
		"Show detection signals",
	)
	return cmd
}
