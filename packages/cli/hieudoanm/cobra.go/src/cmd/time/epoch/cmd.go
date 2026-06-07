package epoch

import (
	"fmt"
	"strconv"
	"time"

	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	var fromDate string
	var relative string
	var format string
	var iso bool
	var unix bool
	var epochJSON bool

	cmd := &cobra.Command{
		Use:   "epoch [timestamp]",
		Short: "Convert between epoch timestamps and human-readable dates",
		Long:  `Convert Unix epoch timestamps to human-readable dates and vice versa.`,
		Example: `  epoch
  epoch 1718100000
  epoch --from 2024-06-11
  epoch --relative "2 hours ago"
  epoch 1718100000 --iso
  epoch 1718100000 --format "2006-01-02"`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if fromDate != "" {
				t, err := parseEpochDateString(fromDate)
				if err != nil {
					return fmt.Errorf("invalid date: %w", err)
				}
				if epochJSON {
					printEpochJSON(t.Unix(), t.Format(time.RFC3339))
					return nil
				}
				fmt.Println(t.Unix())
				return nil
			}
			if relative != "" {
				t, err := parseEpochRelative(relative)
				if err != nil {
					return fmt.Errorf("invalid relative time: %w", err)
				}
				if epochJSON {
					printEpochJSON(t.Unix(), t.Format(time.RFC3339))
					return nil
				}
				fmt.Println(t.Unix())
				return nil
			}
			if len(args) > 0 {
				ts, err := strconv.ParseInt(args[0], 10, 64)
				if err != nil {
					return fmt.Errorf("invalid timestamp: %s", args[0])
				}
				t := time.Unix(ts, 0)
				if epochJSON {
					printEpochJSON(ts, t.Format(time.RFC3339))
					return nil
				}
				if unix {
					fmt.Println(ts)
					return nil
				}
				if iso {
					fmt.Println(t.Format(time.RFC3339))
					return nil
				}
				if format != "" {
					fmt.Println(t.Format(format))
					return nil
				}
				fmt.Println(t.Format(time.RFC1123))
				return nil
			}
			now := time.Now()
			if epochJSON {
				printEpochJSON(now.Unix(), now.Format(time.RFC3339))
				return nil
			}
			fmt.Println(now.Unix())
			return nil
		},
	}

	cmd.Flags().StringVar(&fromDate, "from", "", "Convert a date string to epoch")
	cmd.Flags().StringVar(&relative, "relative", "", "Calculate epoch relative to now (e.g. '2 hours ago')")
	cmd.Flags().StringVar(&format, "format", "", "Output format string (Go time layout)")
	cmd.Flags().BoolVar(&iso, "iso", false, "Output in ISO 8601 format")
	cmd.Flags().BoolVar(&unix, "unix", false, "Output Unix timestamp (useful with --json)")
	cmd.Flags().BoolVar(&epochJSON, "json", false, "Output in JSON format")
	return cmd
}
