package time

import (
	"github.com/spf13/cobra"
)

func newClockCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "clock",
		Short:   "Clock and timer utilities",
		Long:    `Clock and timer utilities including current time display.`,
		Example: `  time clock now`,
	}

	cmd.AddCommand(timeNowCmd)

	return cmd
}
