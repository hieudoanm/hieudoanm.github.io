package web

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func newCsvCmd() *cobra.Command {
	var url string
	var out string

	cmd := &cobra.Command{
		Use:   "csv --url <url>",
		Short: "Extract HTML tables to CSV",
		Long: `Fetch a webpage, detect all <table> elements, and save each table as a CSV file.

If the page contains a single table it is saved as <domain>.csv.
Multiple tables produce individual <domain>-table-<N>.csv files.`,
		Example: `  web csv --url https://en.wikipedia.org/wiki/List_of_countries_by_population
  web csv --url https://example.com/data --out ./output`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if url == "" {
				return fmt.Errorf("url is required")
			}

			if out == "" {
				out = "."
			}

			if _, err := os.Stat(out); os.IsNotExist(err) {
				return fmt.Errorf("directory %s does not exist", out)
			}

			html, err := fetchPage(url)
			if err != nil {
				return err
			}

			tables, err := parseTables(html)
			if err != nil {
				return err
			}

			if len(tables) == 0 {
				fmt.Println("no tables found")
				return nil
			}

			paths, err := tablesToCSVFiles(tables, url, out)
			if err != nil {
				return err
			}

			for _, p := range paths {
				fmt.Println(p)
			}

			return nil
		},
	}

	cmd.Flags().StringVarP(&url, "url", "u", "", "URL to fetch")
	cmd.MarkFlagRequired("url")
	cmd.Flags().StringVarP(&out, "out", "o", "", "Output directory (default .)")
	return cmd
}
