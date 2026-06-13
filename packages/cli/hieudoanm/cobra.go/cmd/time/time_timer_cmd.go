package time

import (
	"encoding/json"
	"fmt"
	"os"
	"os/signal"
	"time"

	"github.com/spf13/cobra"
)

var timerJSON bool

func newTimerCmd() *cobra.Command {
	var duration string
	cmd := &cobra.Command{
		Use:   "timer [--duration <duration>]",
		Short: "Simple countdown timer",
		Long: `Set a countdown timer. Supports seconds (30s) and minutes (5m).

Press Ctrl+C to cancel.`,
		Example: `  timer --duration 30s
  timer --duration 5m
  timer --duration 90`,
		RunE: func(cmd *cobra.Command, args []string) error {
			dur, err := parseTimerDuration(duration)
			if err != nil {
				return err
			}

			sig := make(chan os.Signal, 1)
			signal.Notify(sig, os.Interrupt)

			ticker := time.NewTicker(time.Second)
			defer ticker.Stop()

			remaining := dur
			fmt.Printf("Timer: %s\n", formatTimerDuration(remaining))

			for remaining > 0 {
				select {
				case <-sig:
					if timerJSON {
						out, _ := json.MarshalIndent(map[string]interface{}{
							"duration": dur.String(),
							"status":   "cancelled",
						}, "", "  ")
						fmt.Println(string(out))
					} else {
						fmt.Println("\nTimer cancelled")
					}
					return nil
				case <-ticker.C:
					remaining -= time.Second
					if remaining > 0 {
						fmt.Printf("\rTimer: %s ", formatTimerDuration(remaining))
					}
				}
			}

			if timerJSON {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"duration": dur.String(),
					"status":   "completed",
				}, "", "  ")
				fmt.Println(string(out))
			} else {
				fmt.Println("\nTime's up!")
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&duration, "duration", "d", "", "Duration (e.g. 30s, 5m)")
	cmd.Flags().BoolVar(&timerJSON, "json", false, "Output in JSON format")
	return cmd
}
