package docsify

import (
	"fmt"

	"github.com/spf13/cobra"
)

var docsifyTreeCmd = &cobra.Command{
	Use:   "tree",
	Short: "Generate Markdown tree view",
	Long:  `Generate Markdown tree view of the command hierarchy.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("docsify tree")
	},
}
