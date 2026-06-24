package stats

import (
	"fmt"
	"sort"

	"github.com/shirou/gopsutil/v4/disk"

	"github.com/hieudoanm/jack/src/libs/theme"
)

func diskLabel(bytes uint64) string {
	const unit = 1024
	if bytes < unit {
		return fmt.Sprintf("%d B", bytes)
	}
	div, exp := uint64(unit), 0
	for n := bytes / unit; n >= unit; n /= unit {
		div *= unit
		exp++
	}
	return fmt.Sprintf("%.1f %cB", float64(bytes)/float64(div), "KMGTPE"[exp])
}

func statsRun(showAll bool) error {
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
}
