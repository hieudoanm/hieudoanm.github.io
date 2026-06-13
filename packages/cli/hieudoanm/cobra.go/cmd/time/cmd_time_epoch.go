package time

import (
	"fmt"
	"strconv"
	"time"

	"github.com/spf13/cobra"
)

func newEpochCmd() *cobra.Command {
	var from, format, relative string
	var iso, unix bool
	var json bool

	cmd := &cobra.Command{
		Use:   "epoch [timestamp]",
		Short: "Convert between epoch timestamps and human-readable dates",
		Long:  `Convert Unix epoch timestamps to human-readable dates and vice versa.`,
		Example: `  epoch 1718100000
  epoch --from "2024-06-11"
  epoch --from "2024-06-11T15:04:05Z"
  epoch --relative "2 hours ago"
  epoch --relative "+3 days"
  epoch --iso`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			if relative != "" {
				t, err := parseEpochRelative(relative)
				if err != nil {
					return err
				}
				if json {
					printEpochJSON(t.Unix(), t.Format(time.RFC3339))
				} else {
					fmt.Println(t.Unix())
				}
				return nil
			}

			if from != "" {
				t, err := parseEpochDateString(from)
				if err != nil {
					return err
				}
				if json {
					printEpochJSON(t.Unix(), t.Format(time.RFC3339))
				} else {
					fmt.Println(t.Unix())
				}
				return nil
			}

			if len(args) == 0 {
				now := time.Now()
				if json {
					printEpochJSON(now.Unix(), now.Format(time.RFC3339))
				} else {
					fmt.Println(now.Unix())
				}
				return nil
			}

			sec, err := strconv.ParseInt(args[0], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid epoch timestamp: %s", args[0])
			}

			t := time.Unix(sec, 0)

			if json {
				printEpochJSON(sec, t.Format(time.RFC3339))
				return nil
			}

			switch {
			case iso:
				fmt.Println(t.Format(time.RFC3339))
			case unix:
				fmt.Println(t.Unix())
			case format != "":
				fmt.Println(t.Format(format))
			default:
				fmt.Println(t.Format(time.RFC3339))
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&from, "from", "f", "", "Convert a date string to epoch")
	cmd.Flags().StringVar(&relative, "relative", "", "Calculate relative time (e.g. '2 hours ago', '+3 days')")
	cmd.Flags().StringVar(&format, "format", "", "Output format for date (Go time layout)")
	cmd.Flags().BoolVar(&iso, "iso", false, "Output in ISO 8601 format")
	cmd.Flags().BoolVar(&unix, "unix", false, "Output as Unix timestamp")
	cmd.Flags().BoolVar(&json, "json", false, "Output as JSON")
	return cmd
}
