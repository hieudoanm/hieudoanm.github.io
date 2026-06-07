package clock

import (
	"fmt"
	"time"

	"github.com/spf13/cobra"
)

var timeNowCmd = &cobra.Command{
	Use:   "now",
	Short: "Display current date and time",
	Long: `Display the current date and time in the local time zone.
Supports JSON output and custom format strings.`,
	Example: `  time clock now
  time clock now --json
  time clock now --format "2006-01-02 15:04:05"`,
	RunE: func(cmd *cobra.Command, args []string) error {
		jsonOutput, _ := cmd.Flags().GetBool("json")
		format, _ := cmd.Flags().GetString("format")

		now := time.Now()
		if jsonOutput {
			fmt.Printf(`{"utc":"%s","local":"%s","unix":%d}`, now.UTC().Format(time.RFC3339), now.Format(time.RFC3339), now.Unix())
			fmt.Println()
			return nil
		}
		if format != "" {
			fmt.Println(now.Format(format))
			return nil
		}
		fmt.Printf("Local: %s\n", now.Format(time.RFC1123))
		fmt.Printf("UTC:   %s\n", now.UTC().Format(time.RFC1123))
		fmt.Printf("Unix:  %d\n", now.Unix())
		return nil
	},
}

func init() {
	timeNowCmd.Flags().Bool("json", false, "Output in JSON format")
	timeNowCmd.Flags().String("format", "", "Custom Go time format string")
}
