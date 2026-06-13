package version

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

var V = "dev"

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "version",
		Short: "Print the application version",
		Long:  `Print the version number of the application.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if jsonOutput {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"version": V,
				}, "", "  ")
				fmt.Println(string(out))
			} else {
				cmd.Printf("Version: %s\n", V)
			}
			return nil
		},
	}
	cmd.Flags().BoolVar(&jsonOutput, "json", false, "Output in JSON format")
	return cmd
}
