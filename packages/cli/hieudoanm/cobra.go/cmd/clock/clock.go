// Package clock ...
package clock

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "clock",
		Short: "Clock and timer utilities",
		Long:  `Clock and timer utilities including current time display and Pomodoro timer.`,
	}

	cmd.AddCommand(clockPomodoroCmd)
	cmd.AddCommand(clockNowCmd)

	return cmd
}
