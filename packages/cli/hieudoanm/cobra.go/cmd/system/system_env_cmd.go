package system

import (
	"encoding/json"
	"fmt"
	"os"
	"sort"
	"strings"

	"github.com/spf13/cobra"
)

var envJSON bool

func newEnvCmd() *cobra.Command {
	var filter string
	var sortOutput bool

	cmd := &cobra.Command{
		Use:   "env [key]",
		Short: "List or search environment variables",
		Long:  `Display all environment variables, or filter by key prefix.`,
		Example: `  system env
  system env PATH
  system env HOME
  system env --sort
  system env --json`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			if len(args) > 0 {
				filter = args[0]
			}

			env := os.Environ()
			type entry struct {
				Key   string `json:"key"`
				Value string `json:"value"`
			}
			var entries []entry

			for _, e := range env {
				k, v, _ := strings.Cut(e, "=")
				if filter != "" && !strings.HasPrefix(k, filter) {
					continue
				}
				entries = append(entries, entry{k, v})
			}

			if sortOutput {
				sort.Slice(entries, func(i, j int) bool {
					return entries[i].Key < entries[j].Key
				})
			}

			if envJSON {
				b, _ := json.MarshalIndent(entries, "", "  ")
				fmt.Println(string(b))
			} else {
				for _, e := range entries {
					fmt.Printf("%s=%s\n", e.Key, e.Value)
				}
			}
			return nil
		},
	}

	cmd.Flags().BoolVar(&sortOutput, "sort", false, "Sort alphabetically by key")
	cmd.Flags().BoolVar(&envJSON, "json", false, "Output in JSON format")
	return cmd
}
