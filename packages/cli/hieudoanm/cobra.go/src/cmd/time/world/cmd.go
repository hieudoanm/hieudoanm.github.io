package world

import (
	"fmt"
	"time"

	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "world [zone1 zone2 ...]",
		Short: "Display current time in multiple timezones",
		Long:  `Display the current time in common timezones around the world.`,
		Example: `  world
  world london tokyo
  world ny london hcmc`,
		RunE: func(cmd *cobra.Command, args []string) error {
			now := time.Now()

			if len(args) > 0 {
				for _, alias := range args {
					loc, err := loadLocation(alias)
					if err != nil {
						return fmt.Errorf("unknown timezone: %s", alias)
					}
					fmt.Printf("%s: %s\n", alias, now.In(loc).Format(time.RFC1123))
				}
				return nil
			}

			zones := []struct {
				alias string
				zone  string
			}{
				{"utc", "UTC"},
				{"ny", "America/New_York"},
				{"london", "Europe/London"},
				{"tokyo", "Asia/Tokyo"},
				{"hcmc", "Asia/Ho_Chi_Minh"},
			}
			for _, z := range zones {
				loc, err := time.LoadLocation(z.zone)
				if err != nil {
					return fmt.Errorf("unknown timezone: %s", z.zone)
				}
				fmt.Printf("%s: %s\n", z.alias, now.In(loc).Format(time.RFC1123))
			}
			return nil
		},
	}
	return cmd
}
