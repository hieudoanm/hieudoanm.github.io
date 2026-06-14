package file

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "file",
		Short: "File introspection and analysis tools",
		Long:  `Check file checksums, detect types, analyze sizes, find duplicates, search, read, write, and edit files.`,
		Example: `  file checksum --file document.pdf --algorithm sha256
  file type --file image.png
  file read -f main.go --lines 50
  file grep --pattern "TODO" --path .`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newChecksumCmd())
	cmd.AddCommand(newChmodCmd())
	cmd.AddCommand(newCountCmd())
	cmd.AddCommand(newDuplicatesCmd())
	cmd.AddCommand(newEditCmd())
	cmd.AddCommand(newGrepCmd())
	cmd.AddCommand(newHeadCmd())
	cmd.AddCommand(newReadCmd())
	cmd.AddCommand(newSizeCmd())
	cmd.AddCommand(newStatsCmd())
	cmd.AddCommand(newTailCmd())
	cmd.AddCommand(newTypeCmd())
	cmd.AddCommand(newWriteCmd())
	cmd.PersistentFlags().BoolVar(&jsonOutput, "json", false, "Output in JSON format")
	return cmd
}
