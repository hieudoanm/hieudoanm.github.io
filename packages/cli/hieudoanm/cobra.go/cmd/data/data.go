package data

import "github.com/spf13/cobra"

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "data",
		Short: "Data serialization and transformation tools",
		Long:  `Format, convert, and validate JSON, YAML, and CSV.`,
	}
	cmd.AddCommand(
		newCsvCmd(),
		newJsonCmd(),
		newYmlCmd(),
	)
	return cmd
}
