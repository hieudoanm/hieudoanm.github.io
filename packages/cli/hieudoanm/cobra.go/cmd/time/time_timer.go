package time

import (
	"encoding/json"
	"fmt"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"time"

	"github.com/spf13/cobra"
)

var timerJSON bool

func newTimerCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "timer <duration>",
		Short: "Simple countdown timer",
		Long: `Set a countdown timer. Supports seconds (30s) and minutes (5m).

Press Ctrl+C to cancel.`,
		Example: `  timer 30s
  timer 5m
  timer 90`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			dur, err := parseTimerDuration(args[0])
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

	cmd.Flags().BoolVar(&timerJSON, "json", false, "Output in JSON format")
	return cmd
}

func parseTimerDuration(s string) (time.Duration, error) {
	if strings.HasSuffix(s, "s") {
		n, err := strconv.Atoi(strings.TrimSuffix(s, "s"))
		if err != nil {
			return 0, fmt.Errorf("invalid duration: %s", s)
		}
		return time.Duration(n) * time.Second, nil
	}
	if strings.HasSuffix(s, "m") {
		n, err := strconv.Atoi(strings.TrimSuffix(s, "m"))
		if err != nil {
			return 0, fmt.Errorf("invalid duration: %s", s)
		}
		return time.Duration(n) * time.Minute, nil
	}
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, fmt.Errorf("invalid duration: %s (use e.g. 30s, 5m)", s)
	}
	return time.Duration(n) * time.Second, nil
}

func formatTimerDuration(d time.Duration) string {
	d = d.Round(time.Second)
	m := int(d.Minutes())
	s := int(d.Seconds()) - m*60
	return fmt.Sprintf("%02d:%02d", m, s)
}
