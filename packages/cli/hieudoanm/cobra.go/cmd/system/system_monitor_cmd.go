package system

import (
	"encoding/json"
	"fmt"
	"time"

	tea "charm.land/bubbletea/v2"
	"github.com/spf13/cobra"
)

var monitorJSON bool

var sysMonitorCmd = &cobra.Command{
	Use:   "monitor",
	Short: "Monitor system resources in real-time",
	Long:  `Display real-time CPU, memory, and process information in a Bubble Tea TUI, or output a one-shot JSON snapshot with --json.`,
	Example: `  system monitor
  system monitor --json`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if monitorJSON {
			m, err := sysGatherMetrics()
			if err != nil {
				return err
			}
			type procInfo struct {
				PID   int32   `json:"pid"`
				Name  string  `json:"name"`
				CPU   float64 `json:"cpu_percent"`
				MemMB uint64  `json:"mem_mb"`
			}
			procs := make([]procInfo, len(m.TopProcs))
			for i, p := range m.TopProcs {
				procs[i] = procInfo{PID: p.PID, Name: p.Name, CPU: p.CPU, MemMB: p.MemMB}
			}
			uptime := time.Duration(m.Uptime) * time.Second
			out, _ := json.MarshalIndent(map[string]interface{}{
				"cpu_percent":   m.CPUTotal,
				"ram_percent":   m.RAMPct,
				"ram_used_gb":   m.RAMUsedGB,
				"ram_total_gb":  m.RAMTotalGB,
				"uptime":        uptime.String(),
				"top_processes": procs,
			}, "", "  ")
			fmt.Println(string(out))
			return nil
		}
		p := tea.NewProgram(sysModel{width: 100})
		_, err := p.Run()
		return err
	},
}

func newMonitorCmd() *cobra.Command {
	sysMonitorCmd.Flags().BoolVar(&monitorJSON, "json", false, "Output in JSON format")
	return sysMonitorCmd
}
