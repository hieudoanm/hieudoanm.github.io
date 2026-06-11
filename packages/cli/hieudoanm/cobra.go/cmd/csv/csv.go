package csv

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var asJSON bool

	cmd := &cobra.Command{
		Use:   "csv [file]",
		Short: "Pretty-print CSV or convert to JSON",
		Long:  `Read CSV from a file or stdin. Pretty-print as aligned table or convert to JSON array.`,
		Example: `  csv data.csv
  csv --json data.csv
  cat data.csv | csv`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			var r io.Reader
			if len(args) > 0 {
				f, err := os.Open(args[0])
				if err != nil {
					return err
				}
				defer f.Close()
				r = f
			} else {
				stat, _ := os.Stdin.Stat()
				if stat.Mode()&os.ModeCharDevice != 0 {
					return fmt.Errorf("provide a file or pipe CSV to stdin")
				}
				r = os.Stdin
			}

			reader := csv.NewReader(r)
			rows, err := reader.ReadAll()
			if err != nil {
				return err
			}
			if len(rows) == 0 {
				return fmt.Errorf("empty CSV")
			}

			if asJSON {
				headers := rows[0]
				var records []map[string]string
				for _, row := range rows[1:] {
					rec := map[string]string{}
					for i, h := range headers {
						if i < len(row) {
							rec[h] = row[i]
						}
					}
					records = append(records, rec)
				}
				b, _ := json.MarshalIndent(records, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			cols := len(rows[0])
			widths := make([]int, cols)
			for _, row := range rows {
				for i, cell := range row {
					if len(cell) > widths[i] {
						widths[i] = len(cell)
					}
				}
			}

			sep := func() {
				for i, w := range widths {
					if i > 0 {
						fmt.Print("---+")
					}
					fmt.Print(strings.Repeat("-", w) + "")
				}
				fmt.Println()
			}

			for ri, row := range rows {
				for i, cell := range row {
					if i > 0 {
						fmt.Print(" | ")
					}
					fmt.Printf("%-*s", widths[i], cell)
				}
				fmt.Println()
				if ri == 0 {
					sep()
				}
			}
			fmt.Printf("\n%d rows\n", len(rows)-1)
			return nil
		},
	}

	cmd.Flags().BoolVarP(&asJSON, "json", "j", false, "Convert to JSON")
	return cmd
}
