package time

import "github.com/spf13/cobra"

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "time",
		Short: "Time and scheduling tools",
		Long:  `Current time, pomodoro timer, countdown timer, epoch conversion, and cron expression utilities.`,
		Example: `  time clock now
  time age --date 1990-01-15
  time epoch 1718100000
  time cron --expression "*/15 * * * *"
  time timer --duration 30s
  time pomodoro
  time world ny london tokyo`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
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
	cmd.PersistentFlags().BoolP("json", "j", false, "Output in JSON format")
	return cmd
}
