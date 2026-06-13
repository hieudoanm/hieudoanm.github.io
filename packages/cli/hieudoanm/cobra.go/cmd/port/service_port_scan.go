package port

import (
	"encoding/json"
	"fmt"
	"net"
	"strconv"
	"strings"
)

type portInfo struct {
	Port int    `json:"port"`
	Name string `json:"name"`
}

func scanPorts(host string, ports []int, timeout int) []portInfo {
	var openPorts []portInfo
	for _, p := range ports {
		addr := net.JoinHostPort(host, strconv.Itoa(p))
		if checkPortOpen(addr, timeout) {
			name := commonPorts[p]
			if name == "" {
				name = "Unknown"
			}
			openPorts = append(openPorts, portInfo{p, name})
		}
	}
	return openPorts
}

func outputScanResult(host string, openPorts []portInfo) {
	if jsonOutput {
		b, _ := json.MarshalIndent(map[string]interface{}{
			"host":  host,
			"ports": openPorts,
		}, "", "  ")
		fmt.Println(string(b))
		return
	}

	if len(openPorts) == 0 {
		fmt.Printf("No open ports found on %s\n", host)
		return
	}

	fmt.Printf("Open ports on %s:\n", host)
	fmt.Println(strings.Repeat("─", 40))
	for _, p := range openPorts {
		fmt.Printf("  %5d  %s\n", p.Port, p.Name)
	}
}
