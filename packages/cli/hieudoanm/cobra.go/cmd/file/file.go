package file

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "file",
		Short: "File introspection and analysis tools",
		Long:  `Check file checksums, detect types, analyze sizes, and find duplicates.`,
	}
	cmd.AddCommand(newChecksumCmd())
	cmd.AddCommand(newTypeCmd())
	cmd.AddCommand(newSizeCmd())
	cmd.AddCommand(newDuplicatesCmd())
	cmd.AddCommand(newStatsCmd())
	cmd.AddCommand(newHeadCmd())
	cmd.AddCommand(newTailCmd())
	cmd.AddCommand(newCountCmd())
	cmd.AddCommand(newChmodCmd())
	cmd.PersistentFlags().BoolVar(&jsonOutput, "json", false, "Output in JSON format")
	return cmd
}
