package epoch

import (
	"fmt"
	"strconv"
	"time"

	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var from string

	cmd := &cobra.Command{
		Use:   "epoch [timestamp]",
		Short: "Convert between epoch timestamps and human-readable dates",
		Long:  `Convert Unix epoch timestamps to human-readable dates and vice versa.`,
		Example: `  epoch 1718100000
  epoch --from "2024-06-11"
  epoch --from "2024-06-11T15:04:05Z"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			if from != "" {
				layouts := []string{
					time.RFC3339,
					"2006-01-02T15:04:05",
					"2006-01-02 15:04:05",
					"2006-01-02",
				}
				var t time.Time
				var err error
				for _, layout := range layouts {
					t, err = time.Parse(layout, from)
					if err == nil {
						break
					}
				}
				if err != nil {
					return fmt.Errorf("unable to parse date: %s", from)
				}
				fmt.Println(t.Unix())
				return nil
			}

			if len(args) == 0 {
				fmt.Println(time.Now().Unix())
				return nil
			}

			sec, err := strconv.ParseInt(args[0], 10, 64)
			if err != nil {
				return fmt.Errorf("invalid epoch timestamp: %s", args[0])
			}
			t := time.Unix(sec, 0)
			fmt.Println(t.Format(time.RFC3339))
			return nil
		},
	}

	cmd.Flags().StringVarP(&from, "from", "f", "", "Convert a date string to epoch")
	return cmd
}
