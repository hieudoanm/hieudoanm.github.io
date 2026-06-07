package pomodoro

import (
	"fmt"
	"os"
	"os/signal"
	"time"

	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "pomodoro",
		Short: "Start a Pomodoro timer TUI session",
		Long:  `Start a Pomodoro timer with configurable work and rest durations. Uses a simple terminal UI.`,
		Example: `  pomodoro
  pomodoro --work 30 --rest 5`,
		RunE: func(cmd *cobra.Command, args []string) error {
			work, _ := cmd.Flags().GetInt("work")
			rest, _ := cmd.Flags().GetInt("rest")

			fmt.Printf("Launching Pomodoro (%d min work, %d min rest)\n", work, rest)

			sig := make(chan os.Signal, 1)
			signal.Notify(sig, os.Interrupt)

			workDur := time.Duration(work) * time.Minute
			restDur := time.Duration(rest) * time.Minute

			for {
				fmt.Print("\rWork interval (Ctrl+C to quit)...")
				select {
				case <-sig:
					fmt.Println("\nPomodoro session ended.")
					return nil
				case <-time.After(workDur):
				}

				fmt.Print("\rRest interval...       ")
				select {
				case <-sig:
					fmt.Println("\nPomodoro session ended.")
					return nil
				case <-time.After(restDur):
				}
			}
		},
	}
	cmd.Flags().Int("work", 25, "Work duration in minutes")
	cmd.Flags().Int("rest", 5, "Rest duration in minutes")
	return cmd
}
