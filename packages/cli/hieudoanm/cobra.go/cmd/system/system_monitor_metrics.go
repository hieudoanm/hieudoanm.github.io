package system

import (
	"math"
	"sort"
	"strings"

	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/disk"
	"github.com/shirou/gopsutil/v4/host"
	"github.com/shirou/gopsutil/v4/mem"
	"github.com/shirou/gopsutil/v4/net"
	"github.com/shirou/gopsutil/v4/process"

	"github.com/hieudoanm/hieudoanm/libs/theme"
)

const sysSparkChars = "▁▂▃▄▅▆▇█"

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
		idx = max(0, min(len(sysSparkChars)-1, idx))
		sb.WriteRune(rune(sysSparkChars[idx]))
	}

	return strings.Repeat(" ", width-len(data)) + sb.String()
}

func sysBar(pct float64, width int) string {
	filled := int(math.Round(pct / 100 * float64(width)))
	filled = max(0, min(width, filled))
	return theme.StatusStyle(pct).Render(
		strings.Repeat("█", filled) + strings.Repeat("░", width-filled),
	)
}
