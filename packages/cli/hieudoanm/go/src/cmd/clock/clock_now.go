// Package clock ...
package clock

import (
	"fmt"
	"time"

	"github.com/hieudoanm/hieudoanm/src/libs/number"
	"github.com/spf13/cobra"
)

// clockNowCmd represents the clock command
var clockNowCmd = &cobra.Command{
	Use:   "now",
	Short: "Run the now operation for the countries app",
	Long: `The now command is a specific utility to execute operations related to now within the countries application.

As a component of the fun tools, this command empowers you to interact directly with countries's now features via the CLI.`,
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
