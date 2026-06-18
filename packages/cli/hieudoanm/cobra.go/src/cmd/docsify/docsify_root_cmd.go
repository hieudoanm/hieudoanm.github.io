// Package docsify ...
package docsify

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "docsify",
		Short: "Codebase documentation and analysis tools",
		Long:  `Generate documentation from Cobra CLI projects, scan codebases for symbols and call graphs, build wiki-link graphs from markdown files, and produce directory trees.`,
		Example: `  docsify cobra --file /path/to/project
  docsify scan --dir . --out graph.graphml
  docsify tree --dir . --out TREE.md`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	cmd.AddCommand(newCobraCmd())
	cmd.AddCommand(newObsidianCmd())
	cmd.AddCommand(newScanCmd())
	cmd.AddCommand(newTreeCmd())

	return cmd
}
