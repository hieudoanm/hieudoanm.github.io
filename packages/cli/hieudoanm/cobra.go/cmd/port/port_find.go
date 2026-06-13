package port

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
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

func newFindCmd() *cobra.Command {
	var start, end int
	cmd := &cobra.Command{
		Use:   "find",
		Short: "Find an available port in a range",
		Example: `  port find
  port find --start 3000 --end 3010`,
		RunE: func(cmd *cobra.Command, args []string) error {
			port, err := findAvailablePort(start, end)
			if err != nil {
				return err
			}
			outputFindResult(port)
			return nil
		},
	}
	cmd.Flags().IntVarP(&start, "start", "s", 8000, "Start of port range")
	cmd.Flags().IntVarP(&end, "end", "e", 9000, "End of port range")
	return cmd
}
