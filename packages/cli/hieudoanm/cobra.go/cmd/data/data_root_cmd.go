package data

import "github.com/spf13/cobra"

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "data",
		Short: "Data serialization and transformation tools",
		Long:  `Format, convert, and validate JSON, YAML, and CSV.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(
		newCsvCmd(),
		newJsonCmd(),
		newYmlCmd(),
	)
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	return cmd
}
