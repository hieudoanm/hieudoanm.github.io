package port

import (
	"encoding/json"
	"fmt"
)

func outputFindResult(port int) {
	if jsonOutput {
		b, _ := json.MarshalIndent(map[string]interface{}{
			"port": port,
		}, "", "  ")
		fmt.Println(string(b))
	} else {
		fmt.Printf("Available port: %d\n", port)
	}
}

func findAvailablePort(start, end int) (int, error) {
	for port := start; port <= end; port++ {
		addr := fmt.Sprintf("localhost:%d", port)
		if !checkPortOpen(addr, 1) {
			return port, nil
		}
	}
	return 0, fmt.Errorf("no available ports in range %d-%d", start, end)
}
