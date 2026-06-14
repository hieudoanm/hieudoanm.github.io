package time

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/spf13/cobra"
)

var swJSON bool

func newStopwatchCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "stopwatch",
		Short: "Measure elapsed time like a stopwatch",
		Long: `Starts a stopwatch that runs until interrupted (Ctrl+C),
then displays the elapsed time.`,
		Example: `  time stopwatch
  time stopwatch --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			start := time.Now()
			fmt.Fprintln(cmd.ErrOrStderr(), "Stopwatch started. Press Ctrl+C to stop.")

			<-cmd.Context().Done()

			elapsed := time.Since(start).Round(time.Millisecond)

			if swJSON {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"elapsed": elapsed.String(),
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("\nElapsed: %s\n", elapsed)
			}
			return nil
		},
	}

	cmd.Flags().BoolVar(&swJSON, "json", false, "Output in JSON format")
	return cmd
}
