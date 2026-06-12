package system

import (
	"encoding/json"
	"fmt"
	"math"
	"sort"
	"strings"
	"time"

	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/disk"
	"github.com/shirou/gopsutil/v4/host"
	"github.com/shirou/gopsutil/v4/mem"
	"github.com/shirou/gopsutil/v4/net"
	"github.com/shirou/gopsutil/v4/process"

	tea "charm.land/bubbletea/v2"

	"github.com/hieudoanm/hieudoanm/libs/theme"
	"github.com/spf13/cobra"
)

var monitorJSON bool

const sysSparkChars = "▁▂▃▄▅▆▇█"

func sysSparkline(data []float64, width int) string {
	if len(data) == 0 {
		return strings.Repeat(" ", width)
	}
	if len(data) > width {
		data = data[len(data)-width:]
	}

	var sb strings.Builder
	for _, v := range data {
		idx := int(math.Round(v / 100 * float64(len(sysSparkChars)-1)))
		idx = sysMax(0, sysMin(len(sysSparkChars)-1, idx))
		sb.WriteRune(rune(sysSparkChars[idx]))
	}

	return strings.Repeat(" ", width-len(data)) + sb.String()
}

func sysMax(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func sysMin(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func sysBar(pct float64, width int) string {
	filled := int(math.Round(pct / 100 * float64(width)))
	filled = sysMax(0, sysMin(width, filled))
	return theme.StatusStyle(pct).Render(
		strings.Repeat("█", filled) + strings.Repeat("░", width-filled),
	)
}

type SysProcessInfo struct {
	PID   int32
	Name  string
	CPU   float64
	MemMB uint64
}

type SysMetrics struct {
	CPUTotal    float64
	CPUPerCore  []float64
	RAMUsedGB   float64
	RAMTotalGB  float64
	RAMPct      float64
	DiskReadKB  uint64
	DiskWriteKB uint64
	NetRxKB     uint64
	NetTxKB     uint64
	Uptime      uint64
	TopProcs    []SysProcessInfo
}

func sysGatherMetrics() (SysMetrics, error) {
	var m SysMetrics

	if p, _ := cpu.Percent(0, false); len(p) > 0 {
		m.CPUTotal = p[0]
	}
	m.CPUPerCore, _ = cpu.Percent(0, true)

	if vm, err := mem.VirtualMemory(); err == nil {
		m.RAMUsedGB = float64(vm.Used) / 1e9
		m.RAMTotalGB = float64(vm.Total) / 1e9
		m.RAMPct = vm.UsedPercent
	}

	if ioMap, err := disk.IOCounters(); err == nil {
		for _, d := range ioMap {
			m.DiskReadKB += d.ReadBytes / 1024
			m.DiskWriteKB += d.WriteBytes / 1024
		}
	}

	if netStats, _ := net.IOCounters(false); len(netStats) > 0 {
		m.NetRxKB = netStats[0].BytesRecv / 1024
		m.NetTxKB = netStats[0].BytesSent / 1024
	}

	m.Uptime, _ = host.Uptime()

	procs, _ := process.Processes()
	for _, p := range procs {
		name, _ := p.Name()
		cpuPct, _ := p.CPUPercent()
		memInfo, _ := p.MemoryInfo()

		var memMB uint64
		if memInfo != nil {
			memMB = memInfo.RSS / 1048576
		}

		m.TopProcs = append(m.TopProcs, SysProcessInfo{
			PID: p.Pid, Name: name, CPU: cpuPct, MemMB: memMB,
		})
	}

	sort.Slice(m.TopProcs, func(i, j int) bool {
		return m.TopProcs[i].CPU > m.TopProcs[j].CPU
	})
	if len(m.TopProcs) > 10 {
		m.TopProcs = m.TopProcs[:10]
	}

	return m, nil
}

type sysTickMsg time.Time
type sysMetricsMsg SysMetrics

type sysModel struct {
	metrics    SysMetrics
	cpuHistory []float64
	ramHistory []float64
	width      int
	err        error
}

func (m sysModel) Init() tea.Cmd {
	return tea.Batch(sysFetchMetrics(), sysTickEvery())
}

func sysFetchMetrics() tea.Cmd {
	return func() tea.Msg {
		m, err := sysGatherMetrics()
		if err != nil {
			return err
		}
		return sysMetricsMsg(m)
	}
}

func sysTickEvery() tea.Cmd {
	return tea.Tick(time.Second, func(t time.Time) tea.Msg {
		return sysTickMsg(t)
	})
}

func (m sysModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {

	case tea.KeyMsg:
		if msg.String() == "q" || msg.String() == "ctrl+c" {
			return m, tea.Quit
		}

	case tea.WindowSizeMsg:
		m.width = msg.Width

	case sysMetricsMsg:
		m.metrics = SysMetrics(msg)

		m.cpuHistory = append(m.cpuHistory, m.metrics.CPUTotal)
		m.ramHistory = append(m.ramHistory, m.metrics.RAMPct)

	case sysTickMsg:
		return m, tea.Batch(sysFetchMetrics(), sysTickEvery())

	case error:
		m.err = msg
	}

	return m, nil
}

func (m sysModel) View() tea.View {
	if m.err != nil {
		return tea.NewView(theme.Error.Render("error: " + m.err.Error()))
	}

	uptime := time.Duration(m.metrics.Uptime) * time.Second

	content := fmt.Sprintf(
		"%s\nCPU: %.1f%%\nRAM: %.1f%%\nUptime: %s\n\nPress q to quit",
		theme.Title.Render("SYSTEM MONITOR"),
		m.metrics.CPUTotal,
		m.metrics.RAMPct,
		uptime.Truncate(time.Second),
	)

	return tea.NewView(content)
}

var sysMonitorCmd = &cobra.Command{
	Use:   "monitor",
	Short: "Monitor system resources in real-time",
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
				"cpu_percent":  m.CPUTotal,
				"ram_percent":  m.RAMPct,
				"ram_used_gb":  m.RAMUsedGB,
				"ram_total_gb": m.RAMTotalGB,
				"uptime":       uptime.String(),
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
