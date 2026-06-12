package time

import "github.com/spf13/cobra"

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "time",
		Short: "Time and scheduling tools",
		Long:  `Current time, pomodoro timer, countdown timer, epoch conversion, and cron expression utilities.`,
	}
	cmd.AddCommand(
		newClockCmd(),
		newCronCmd(),
		newEpochCmd(),
		newTimerCmd(),
		newUntilCmd(),
		newWorldCmd(),
		newAgeCmd(),
		newStopwatchCmd(),
	)
	return cmd
}
