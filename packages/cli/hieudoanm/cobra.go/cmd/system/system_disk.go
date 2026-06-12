package system

import (
	"encoding/json"
	"fmt"
	"os/exec"
	"strconv"
	"strings"

	"github.com/spf13/cobra"
)

var diskJSON bool

func newDiskCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "disk",
		Short: "Show disk usage for mounted filesystems",
		Long:  `Display disk capacity, used space, available space, and mount points (like df -h).`,
		Example: `  system disk
  system disk --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			out, err := exec.Command("df", "-h").Output()
			if err != nil {
				return fmt.Errorf("df failed: %w", err)
			}

			type mount struct {
				Filesystem string `json:"filesystem"`
				Size       string `json:"size"`
				Used       string `json:"used"`
				Avail      string `json:"avail"`
				UsePercent string `json:"use_percent"`
				Mounted    string `json:"mounted"`
			}
			var mounts []mount

			lines := strings.Split(string(out), "\n")
			for i, line := range lines {
				if i == 0 || strings.TrimSpace(line) == "" {
					continue
				}
				fields := strings.Fields(line)
				if len(fields) < 6 {
					continue
				}

				// Last field is mount point. The percentage field (e.g. "9%") is
				// always present; on macOS there are extra iused/ifree/%iused
				// columns between capacity and mount point.
				mounted := fields[len(fields)-1]

				var usePct string
				pctIdx := -1
				for i, f := range fields {
					if strings.HasSuffix(f, "%") {
						usePct = strings.TrimRight(f, "%")
						pctIdx = i
						break
					}
				}
				if pctIdx < 1 || pctIdx > len(fields)-3 {
					continue
				}

				// Fields before usePct: filesystem, size, used, avail
				idx := pctIdx
				avail := fields[idx-1]
				used := fields[idx-2]
				size := fields[idx-3]
				fs := strings.Join(fields[:idx-3], " ")

				if p, err := strconv.Atoi(usePct); err == nil && p >= 90 {
					fs = "⚠ " + fs
				}

				mounts = append(mounts, mount{fs, size, used, avail, usePct + "%", mounted})
			}

			if diskJSON {
				b, _ := json.MarshalIndent(mounts, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("%-24s %8s %8s %8s %6s  %s\n", "Filesystem", "Size", "Used", "Avail", "Use%", "Mounted")
				for _, m := range mounts {
					fmt.Printf("%-24s %8s %8s %8s %6s  %s\n", m.Filesystem, m.Size, m.Used, m.Avail, m.UsePercent, m.Mounted)
				}
			}
			return nil
		},
	}

	cmd.Flags().BoolVar(&diskJSON, "json", false, "Output in JSON format")
	return cmd
}
