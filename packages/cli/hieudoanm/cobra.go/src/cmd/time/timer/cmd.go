package timer

import (
	"fmt"
	"os"
	"os/signal"
	"time"

	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "timer [--duration <duration>]",
		Short: "Simple countdown timer",
		Long:  `A simple countdown timer with support for seconds, minutes, and hours.`,
		Example: `  timer --duration 30s
  timer --duration 5m
  timer --duration 2h
  timer --duration 90 --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			durationStr, _ := cmd.Flags().GetString("duration")
			jsonOutput, _ := cmd.Flags().GetBool("json")

			d, err := parseTimerDuration(durationStr)
			if err != nil {
				return err
			}

			sig := make(chan os.Signal, 1)
			signal.Notify(sig, os.Interrupt)

			timer := time.NewTimer(d)
			start := time.Now()

			select {
			case <-sig:
				timer.Stop()
				elapsed := time.Since(start)
				if jsonOutput {
					fmt.Printf(`{"status":"cancelled","elapsed":"%s"}`, formatTimerDuration(elapsed))
					fmt.Println()
				} else {
					fmt.Printf("\nTimer cancelled after %s\n", formatTimerDuration(elapsed))
				}
				return nil
			case <-timer.C:
				elapsed := time.Since(start)
				if jsonOutput {
					fmt.Printf(`{"status":"completed","duration":"%s","elapsed":"%s"}`, durationStr, formatTimerDuration(elapsed))
					fmt.Println()
				} else {
					fmt.Printf("Time's up! (elapsed: %s)\n", formatTimerDuration(elapsed))
				}
				return nil
			}
		},
	}
	cmd.Flags().StringP("duration", "d", "", "Duration (e.g., 30s, 5m, 2h, or bare number for seconds)")
	cmd.MarkFlagRequired("duration")
	cmd.Flags().Bool("json", false, "Output in JSON format")
	return cmd
}
