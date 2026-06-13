package time

import "github.com/spf13/cobra"

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "time",
		Short: "Time and scheduling tools",
		Long:  `Current time, pomodoro timer, countdown timer, epoch conversion, and cron expression utilities.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(
		newClockCmd(),
		newCronCmd(),
		newEpochCmd(),
		newPomodoroCmd(),
		newTimerCmd(),
		newUntilCmd(),
		newWorldCmd(),
		newAgeCmd(),
		newStopwatchCmd(),
	)
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	return cmd
}
