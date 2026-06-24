package disk

import (
	"encoding/json"
	"fmt"
	"sort"

	"github.com/spf13/cobra"
	"github.com/shirou/gopsutil/v4/disk"

	"github.com/hieudoanm/jack/src/libs/theme"
)

type diskType struct {
	Mount       string  `json:"mount"`
	Fstype      string  `json:"fstype"`
	Total       uint64  `json:"total"`
	Used        uint64  `json:"used"`
	Free        uint64  `json:"free"`
	UsedPercent float64 `json:"used_percent"`
}

func NewCmd() *cobra.Command {
	var showJSON bool
	var filter string
	var sortBySize bool

	cmd := &cobra.Command{
		Use:   "disk",
		Short: "Show disk usage for mounted filesystems",
		Long:  `Display filesystem disk space usage for all mounted partitions.`,
		Example: `  system disk
  system disk --sort
  system disk --json
  system disk --filter /dev`,
		Args: cobra.NoArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			partitions, err := disk.Partitions(false)
			if err != nil {
				return fmt.Errorf("disk: %w", err)
			}

			var disks []diskType
			for _, p := range partitions {
				if filter != "" && !containsFold(p.Mountpoint, filter) && !containsFold(p.Device, filter) {
					continue
				}

				usage, err := disk.Usage(p.Mountpoint)
				if err != nil {
					continue
				}

				disks = append(disks, diskType{
					Mount:       p.Mountpoint,
					Fstype:      p.Fstype,
					Total:       usage.Total,
					Used:        usage.Used,
					Free:        usage.Free,
					UsedPercent: usage.UsedPercent,
				})
			}

			if sortBySize {
				sort.Slice(disks, func(i, j int) bool {
					return disks[i].UsedPercent > disks[j].UsedPercent
				})
			}

			if showJSON {
				b, _ := json.MarshalIndent(disks, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("%-35s %-10s %12s %12s %12s %s\n", "Filesystem", "Type", "Total", "Used", "Free", "Use%")
				for _, d := range disks {
					fmt.Printf("%-35s %-10s %12s %12s %12s %s\n",
						d.Mount, d.Fstype,
						diskLabel(d.Total), diskLabel(d.Used), diskLabel(d.Free),
						theme.StatusStyle(d.UsedPercent).Render(fmt.Sprintf("%.1f%%", d.UsedPercent)),
					)
				}
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(&showJSON, "json", "j", false, "Output in JSON format")
	cmd.Flags().StringVarP(&filter, "filter", "f", "", "Filter by mount point or device")
	cmd.Flags().BoolVarP(&sortBySize, "sort", "s", false, "Sort by usage percent")
	return cmd
}

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

func containsFold(s, substr string) bool {
	return containsIgnoreCase(s, substr)
}

func containsIgnoreCase(s, substr string) bool {
	if len(substr) == 0 {
		return true
	}
	if len(substr) > len(s) {
		return false
	}
	for i := 0; i <= len(s)-len(substr); i++ {
		match := true
		for j := 0; j < len(substr); j++ {
			if toLower(s[i+j]) != toLower(substr[j]) {
				match = false
				break
			}
		}
		if match {
			return true
		}
	}
	return false
}

func toLower(b byte) byte {
	if b >= 'A' && b <= 'Z' {
		return b + 32
	}
	return b
}
