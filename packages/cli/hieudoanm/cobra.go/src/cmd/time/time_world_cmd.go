package time

import (
	"fmt"
	"time"

	"github.com/spf13/cobra"
)

func newWorldCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "world [zone1 zone2 ...]",
		Short: "Display current time in multiple timezones",
		Long: `Show the current time in one or more timezones.

Common shorthand names: utc, ny, london, tokyo, hcmc, sf, paris, etc.
Accepts any valid IANA timezone name, or a UTC offset like "UTC+5:30", "UTC-8".`,
		Example: `  hieudoanm time world
  hieudoanm time world ny london tokyo hcmc
  hieudoanm time world UTC UTC+5:30`,
		Args: cobra.ArbitraryArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			zones := args
			if len(zones) == 0 {
				zones = []string{"ny", "london", "hcmc", "tokyo", "utc"}
			}

			now := time.Now()
			for i, z := range zones {
				loc, err := loadLocation(z)
				if err != nil {
					return fmt.Errorf("unknown timezone %q", z)
				}
				t := now.In(loc)
				if i > 0 {
					fmt.Println()
				}
				fmt.Printf("%-12s %s", z+":", t.Format("2006-01-02 15:04:05"))
			}
			fmt.Println()
			return nil
		},
	}
}
