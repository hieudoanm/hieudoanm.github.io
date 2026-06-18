package history

import (
	"fmt"

	"github.com/hieudoanm/hieudoanm/src/libs/history"
	"github.com/spf13/cobra"
)

func newStatsCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "stats",
		Short: "Show history statistics",
		RunE: func(cmd *cobra.Command, args []string) error {
			stats, err := history.ComputeStats()
			if err != nil {
				return err
			}
			fmt.Printf("CLI commands:  %d\n", stats.TotalCLI)
			fmt.Printf("MCP tool calls: %d\n", stats.TotalMCP)
			fmt.Println()
			if len(stats.TopCommands) > 0 {
				fmt.Println("Top commands:")
				for _, cc := range stats.TopCommands {
					fmt.Printf("  %5d  %s\n", cc.Count, cc.Name)
				}
			}
			if len(stats.TopErrors) > 0 {
				fmt.Println()
				fmt.Println("Top errors:")
				for _, cc := range stats.TopErrors {
					fmt.Printf("  %5d  %s\n", cc.Count, cc.Name)
				}
			}
			return nil
		},
	}
}
