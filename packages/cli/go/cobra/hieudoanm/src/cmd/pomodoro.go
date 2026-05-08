package cmd

import (
	"fmt"

	"github.com/hieudoanm/hieudoanm/src/services/pomodoro"
	"github.com/spf13/cobra"
)

var tuiWork int
var tuiBreak int

var pomodoroCmd = &cobra.Command{
	Use:   "tui",
	Short: "Run the tui operation for the pomodoro app",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("🍅 Launching Pomodoro TUI...")
		pomodoro.RunTUI(tuiWork, tuiBreak)
	},
}

func init() {
	pomodoroCmd.Flags().IntVarP(&tuiWork, "work", "w", 25, "work session minutes")
	pomodoroCmd.Flags().IntVarP(&tuiBreak, "break", "b", 5, "break session minutes")
	rootCmd.AddCommand(pomodoroCmd)
}
