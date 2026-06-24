package csv

import (
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/data/internal"
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	var jsonOut bool

	cmd := &cobra.Command{
		Use:   "csv <file>",
		Short: "View and format CSV files",
		Long:  `Read a CSV file (or stdin) and display records as pipe-delimited text or JSON.`,
		Example: `  data csv data.csv
  data csv data.csv --json
  cat data.csv | data csv`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			records, err := internal.ReadCSVInput(args)
			if err != nil {
				return err
			}

			if jsonOut {
				fmt.Println(internal.FormatCSVJSON(records))
			} else {
				fmt.Println(internal.FormatCSVText(records))
			}

			return nil
		},
	}

	cmd.Flags().BoolVar(&jsonOut, "json", false, "Output in JSON format")
	return cmd
}
