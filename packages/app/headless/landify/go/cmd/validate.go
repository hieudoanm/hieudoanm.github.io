package cmd

import (
	"github.com/spf13/cobra"

	"landify/internal/landify"
)

var validateCmd = &cobra.Command{
	Use:   "validate",
	Short: "Validate the schema of landify.yaml",
	Long: `Reads the YAML file (default landify.yaml), parses it strictly —
unknown fields and typos are rejected — and reports every missing required
field. Exits non-zero when the file is invalid.`,
	Args: cobra.NoArgs,
	RunE: func(cmd *cobra.Command, args []string) error {
		file, err := cmd.Flags().GetString("file")
		if err != nil {
			return err
		}
		if err := landify.ValidateFile(file); err != nil {
			return err
		}
		cmd.Printf("%s is valid\n", file)
		return nil
	},
}
