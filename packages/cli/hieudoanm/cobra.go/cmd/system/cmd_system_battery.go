package system

import (
	"encoding/json"
	"fmt"
	"os/exec"
	"runtime"
	"strconv"
	"strings"

	"github.com/spf13/cobra"
)

var batteryJSON bool

func newBatteryCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "battery",
		Short: "Show battery status",
		Long:  `Display battery percentage, charging state, and time remaining.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			switch runtime.GOOS {
			case "darwin":
				return darwinBattery()
			case "linux":
				return linuxBattery()
			default:
				return fmt.Errorf("unsupported platform: %s", runtime.GOOS)
			}
		},
	}

	cmd.Flags().BoolVar(&batteryJSON, "json", false, "Output in JSON format")
	return cmd
}

type batteryInfo struct {
	Percent    int    `json:"percent"`
	Charging   bool   `json:"charging"`
	TimeRemain string `json:"time_remaining,omitempty"`
}

func printBattery(b batteryInfo) {
	if batteryJSON {
		out, _ := json.MarshalIndent(b, "", "  ")
		fmt.Println(string(out))
	} else {
		status := "discharging"
		if b.Charging {
			status = "charging"
		}
		fmt.Printf("Battery: %d%% (%s)\n", b.Percent, status)
		if b.TimeRemain != "" {
			fmt.Printf("Time remaining: %s\n", b.TimeRemain)
		}
	}
}

func darwinBattery() error {
	out, err := exec.Command("pmset", "-g", "batt").Output()
	if err != nil {
		return fmt.Errorf("pmset failed: %w", err)
	}

	info := batteryInfo{}

	lines := strings.Split(string(out), "\n")
	for _, line := range lines {
		if !strings.Contains(line, "InternalBattery") {
			continue
		}
		fields := strings.Fields(line)
		for _, f := range fields {
			if strings.HasSuffix(f, "%") {
				pct, err := strconv.Atoi(strings.TrimRight(f, "%"))
				if err == nil {
					info.Percent = pct
				}
			}
			if f == "charging" || f == "AC" || f == "charged" {
				info.Charging = true
			}
			if strings.HasSuffix(f, ";") && len(f) > 4 {
				f = strings.TrimRight(f, ";")
				if strings.Contains(f, ":") {
					info.TimeRemain = f
				}
			}
		}
	}

	printBattery(info)
	return nil
}

func linuxBattery() error {
	info := batteryInfo{
		TimeRemain: "",
	}

	capacity, err := readFileTrim("/sys/class/power_supply/BAT0/capacity")
	if err != nil {
		return fmt.Errorf("read battery capacity: %w", err)
	}
	if pct, err := strconv.Atoi(capacity); err == nil {
		info.Percent = pct
	}

	status, err := readFileTrim("/sys/class/power_supply/BAT0/status")
	if err == nil {
		info.Charging = status == "Charging"
	}

	printBattery(info)
	return nil
}

func readFileTrim(path string) (string, error) {
	data, err := exec.Command("cat", path).Output()
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(string(data)), nil
}
