package time

import (
	"fmt"
	"strconv"
	"strings"
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

func parseEpochDateString(s string) (time.Time, error) {
	layouts := []string{
		time.RFC3339,
		"2006-01-02T15:04:05",
		"2006-01-02 15:04:05",
		"2006-01-02",
		time.RFC1123,
		time.RFC1123Z,
	}
	var t time.Time
	var err error
	for _, layout := range layouts {
		t, err = time.Parse(layout, s)
		if err == nil {
			return t, nil
		}
	}
	return time.Time{}, fmt.Errorf("unable to parse date: %s", s)
}

func parseEpochRelative(s string) (time.Time, error) {
	s = strings.TrimSpace(s)
	now := time.Now()

	parts := strings.Fields(s)
	if len(parts) < 2 {
		return time.Time{}, fmt.Errorf("invalid relative time: %s (expected e.g. '2 hours ago')", s)
	}

	n, err := strconv.Atoi(parts[0])
	if err != nil {
		return time.Time{}, fmt.Errorf("invalid number: %s", parts[0])
	}

	unit := strings.TrimSuffix(strings.ToLower(parts[1]), "s")

	direction := time.Duration(1)
	if len(parts) >= 3 && parts[len(parts)-1] == "ago" {
		direction = -1
	}
	if s[0] == '+' {
		direction = 1
	} else if s[0] == '-' {
		direction = -1
	}

	var d time.Duration
	switch unit {
	case "second":
		d = time.Second
	case "minute":
		d = time.Minute
	case "hour":
		d = time.Hour
	case "day":
		d = 24 * time.Hour
	case "week":
		d = 7 * 24 * time.Hour
	case "month":
		d = 30 * 24 * time.Hour
	case "year":
		d = 365 * 24 * time.Hour
	default:
		return time.Time{}, fmt.Errorf("unknown unit: %s", unit)
	}

	return now.Add(d * time.Duration(n) * direction), nil
}

func printEpochJSON(epoch int64, rfc3339 string) {
	fmt.Printf(`{"epoch":%d,"rfc3339":"%s"}`, epoch, rfc3339)
	fmt.Println()
}
