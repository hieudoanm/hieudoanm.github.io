package time

import (
	"time"

	"github.com/spf13/cobra"
)

func newCronCmd() *cobra.Command {
	var next int
	var until string
	var cronJSON bool

	cmd := &cobra.Command{
		Use:   "cron <expression>",
		Short: "Describe a cron expression in plain English and compute next runs",
		Long:  `Parse a 5-field cron expression, describe when it runs, and compute upcoming occurrences.`,
		Example: `  cron "*/15 * * * *"
  cron "0 9 * * 1-5"
  cron "0 0 1 1 *"
  cron --next 5 "*/30 * * * *"
  cron --next 10 --until "2026-12-31" "0 0 * * *"`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			expr := args[0]
			untilTime, err := parseUntil(until)
			if err != nil {
				return err
			}

			var runs []*time.Time
			if next > 0 {
				runs = cronNextRuns(expr, next, untilTime)
			}

			if cronJSON {
				outputCronJSON(expr, runs)
			} else {
				outputCronText(expr, runs)
			}
			return nil
		},
	}

	cmd.Flags().IntVarP(&next, "next", "n", 0, "Show next N run times")
	cmd.Flags().StringVar(&until, "until", "", "Show runs until this date (YYYY-MM-DD)")
	cmd.Flags().BoolVar(&cronJSON, "json", false, "Output in JSON format")
	return cmd
}
