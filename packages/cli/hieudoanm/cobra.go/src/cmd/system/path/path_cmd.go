package path

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strings"

	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	var filter string
	var sortOutput bool
	var jsonOutput bool

	cmd := &cobra.Command{
		Use:   "path [command]",
		Short: "List or search PATH directories and commands",
		Long: `Show all directories in PATH, or find which path a command resolves to.

With no arguments, lists all PATH entries.
With a command name, shows which executable would be found first.`,
		Example: `  system path
  system path go
  system path --sort
  system path --json`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			path := os.Getenv("PATH")
			dirs := filepath.SplitList(path)

			if len(args) > 0 {
				full, err := exec.LookPath(args[0])
				if err != nil {
					return fmt.Errorf("command %q not found in PATH", args[0])
				}
				if jsonOutput {
					b, _ := json.MarshalIndent(map[string]string{
						"command": args[0],
						"path":    full,
					}, "", "  ")
					fmt.Println(string(b))
				} else {
					fmt.Println(full)
				}
				return nil
			}

			type entry struct {
				Index  int    `json:"index"`
				Dir    string `json:"dir"`
				Exists bool   `json:"exists"`
			}
			var entries []entry

			for i, d := range dirs {
				if filter != "" && !strings.Contains(strings.ToLower(d), strings.ToLower(filter)) {
					continue
				}
				_, err := os.Stat(d)
				entries = append(entries, entry{i, d, err == nil})
			}

			if sortOutput {
				sort.Slice(entries, func(i, j int) bool {
					return entries[i].Dir < entries[j].Dir
				})
			}

			if jsonOutput {
				b, _ := json.MarshalIndent(entries, "", "  ")
				fmt.Println(string(b))
			} else {
				for _, e := range entries {
					mark := " "
					if !e.Exists {
						mark = "✗"
					}
					fmt.Printf(" %s %s\n", mark, e.Dir)
				}
			}
			return nil
		},
	}

	cmd.Flags().BoolVar(&sortOutput, "sort", false, "Sort alphabetically by path")
	cmd.Flags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")

	return cmd
}
