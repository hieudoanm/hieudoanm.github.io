package time

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/hieudoanm/hieudoanm/src/libs/number"
	"github.com/spf13/cobra"
)

var nowJSON bool

var timeNowCmd = &cobra.Command{
	Use:   "now",
	Short: "Display the current date and time",
	Long:  `Display the current date, time, and timezone in a formatted output.`,
	Example: `  time clock now
  time clock now --json`,
	Args: cobra.NoArgs,
	RunE: func(cmd *cobra.Command, args []string) error {
		t := time.Now()
		hours, minutes, seconds := t.Clock()
		date := t.Format("2006-01-02")
		zone, _ := t.Zone()
		if nowJSON {
			out, err := json.MarshalIndent(map[string]interface{}{
				"date":     date,
				"time":     fmt.Sprintf("%s:%s:%s", number.AddZero(hours), number.AddZero(minutes), number.AddZero(seconds)),
				"timezone": zone,
				"iso":      t.Format(time.RFC3339),
				"unix":     t.Unix(),
			}, "", "  ")
			if err != nil {
				return err
			}
			fmt.Println(string(out))
		} else {
			fmt.Printf("%s %s:%s:%s GMT%s\n", date, number.AddZero(hours), number.AddZero(minutes), number.AddZero(seconds), zone)
		}
		return nil
	},
}

func init() {
	timeNowCmd.Flags().BoolVar(&nowJSON, "json", false, "Output in JSON format")
}
