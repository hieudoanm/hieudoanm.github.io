package disk

import (
	"fmt"
	"sort"

	"github.com/spf13/cobra"
	"github.com/shirou/gopsutil/v4/disk"

	"github.com/hieudoanm/jack/src/libs/theme"
)

func NewStatsCmd() *cobra.Command {
	var showAll bool

	cmd := &cobra.Command{
		Use:   "stats",
		Short: "Show disk partition statistics",
		Long:  `Display file system disk space statistics including total, used, and available space for each partition.`,
		Example: `  system disk stats
  system disk stats --all`,
		Args: cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			partitions, err := disk.Partitions(!showAll)
			if err != nil {
				return fmt.Errorf("disk stats: %w", err)
			}

			sort.Slice(partitions, func(i, j int) bool {
				return partitions[i].Mountpoint < partitions[j].Mountpoint
			})

			for _, p := range partitions {
				usage, err := disk.Usage(p.Mountpoint)
				if err != nil {
					fmt.Printf("  %-30s  %s\n", p.Mountpoint, theme.Error.Render("error"))
					continue
				}

				used := diskLabel(usage.Used)
				total := diskLabel(usage.Total)
				free := diskLabel(usage.Free)
				pct := usage.UsedPercent

				bar := theme.StatusStyle(pct).Render(
					fmt.Sprintf("%.1f%%", pct),
				)

				fmt.Printf("  %-30s  %s used / %s free / %s total  %s\n",
					p.Mountpoint, used, free, total, bar)
			}

			return nil
		},
	}

	cmd.Flags().BoolVarP(&showAll, "all", "a", false, "Show all partitions including virtual/dev")

	return cmd
}
