package time

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/hieudoanm/hieudoanm/libs/number"
	"github.com/spf13/cobra"
)

var nowJSON bool

var timeNowCmd = &cobra.Command{
	Use:   "now",
	Short: "Display the current date and time",
	Long:  `Display the current date, time, and timezone in a formatted output.`,
	Run: func(cmd *cobra.Command, args []string) {
		t := time.Now()
		hours, minutes, seconds := t.Clock()
		date := t.Format("2006-01-02")
		zone, _ := t.Zone()
		if nowJSON {
			out, _ := json.MarshalIndent(map[string]interface{}{
				"date":     date,
				"time":     fmt.Sprintf("%s:%s:%s", number.AddZero(hours), number.AddZero(minutes), number.AddZero(seconds)),
				"timezone": zone,
				"iso":      t.Format(time.RFC3339),
				"unix":     t.Unix(),
			}, "", "  ")
			fmt.Println(string(out))
		} else {
			fmt.Printf("%s %s:%s:%s GMT%s\n", date, number.AddZero(hours), number.AddZero(minutes), number.AddZero(seconds), zone)
		}
	},
}

func init() {
	timeNowCmd.Flags().BoolVar(&nowJSON, "json", false, "Output in JSON format")
}
