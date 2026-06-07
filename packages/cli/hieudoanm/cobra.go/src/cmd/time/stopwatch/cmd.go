package stopwatch

import (
	"context"
	"fmt"
	"time"

	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "stopwatch",
		Short: "Measure elapsed time like a stopwatch",
		Long:  `A simple stopwatch that measures elapsed time until Ctrl+C is pressed.`,
		Example: `  stopwatch
  stopwatch --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			start := time.Now()
			fmt.Println("Stopwatch started (Ctrl+C to stop)...")

			ctx := cmd.Context()
			if ctx == nil {
				ctx = context.Background()
			}
			<-ctx.Done()

			elapsed := time.Since(start)
			if jsonOutput {
				fmt.Printf(`{"elapsed":"%s"}`, formatDuration(elapsed))
				fmt.Println()
			} else {
				fmt.Printf("Elapsed: %s\n", formatDuration(elapsed))
			}
			return nil
		},
	}
	cmd.Flags().Bool("json", false, "Output in JSON format")
	return cmd
}

func formatDuration(d time.Duration) string {
	totalSeconds := int(d.Seconds())
	hours := totalSeconds / 3600
	minutes := (totalSeconds % 3600) / 60
	seconds := totalSeconds % 60
	return fmt.Sprintf("%02d:%02d:%02d", hours, minutes, seconds)
}
