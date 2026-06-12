package version

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

var V = "dev"

var versionJSON bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "version",
		Short: "Print the application version",
		Long:  `Print the version number of the application.`,
		Run: func(cmd *cobra.Command, args []string) {
			if versionJSON {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"version": V,
				}, "", "  ")
				fmt.Println(string(out))
			} else {
				cmd.Printf("Version: %s\n", V)
			}
		},
	}
	cmd.Flags().BoolVar(&versionJSON, "json", false, "Output in JSON format")
	return cmd
}
