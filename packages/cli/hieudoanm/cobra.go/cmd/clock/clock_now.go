// Package clock ...
package clock

import (
	"fmt"
	"time"

	"github.com/hieudoanm/hieudoanm/libs/number"
	"github.com/spf13/cobra"
)

// clockNowCmd represents the clock command
var clockNowCmd = &cobra.Command{
	Use:   "now",
	Short: "Display the current date and time",
	Long:  `Display the current date, time, and timezone in a formatted output.`,
	Run: func(cmd *cobra.Command, args []string) {

		t := time.Now()
		hours, minutes, seconds := t.Clock()
		date := t.Format("2006-01-02")
		zone, _ := t.Zone()
		var hoursString = number.AddZero(hours)
		var minutesString = number.AddZero(minutes)
		var secondsString = number.AddZero(seconds)
		fmt.Printf("%s %s:%s:%s GMT%s\n", date, hoursString, minutesString, secondsString, zone)
	},
}
