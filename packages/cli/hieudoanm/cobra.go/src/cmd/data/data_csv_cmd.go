package data

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

var csvJSON bool

func newCsvCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "csv <file>",
		Short: "View and format CSV files",
		Long:  `Read a CSV file (or stdin) and display records as pipe-delimited text or JSON.`,
		Example: `  data csv data.csv
  data csv data.csv --json
  cat data.csv | data csv`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			var r *csv.Reader

			if len(args) > 0 {
				f, err := os.Open(args[0])
				if err != nil {
					return fmt.Errorf("open file: %w", err)
				}
				defer f.Close()
				r = csv.NewReader(f)
			} else {
				r = csv.NewReader(os.Stdin)
			}

			var records [][]string
			for {
				record, err := r.Read()
				if err == io.EOF {
					break
				}
				if err != nil {
					return fmt.Errorf("read csv: %w", err)
				}
				records = append(records, record)
			}

			if csvJSON {
				b, _ := json.MarshalIndent(records, "", "  ")
				fmt.Println(string(b))
			} else {
				for _, record := range records {
					fmt.Println(strings.Join(record, " | "))
				}
			}

			return nil
		},
	}

	cmd.Flags().BoolVar(&csvJSON, "json", false, "Output in JSON format")
	return cmd
}
