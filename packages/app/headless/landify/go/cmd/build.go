package cmd

import (
	"github.com/spf13/cobra"

	"landify/internal/landify"
)

var buildCmd = &cobra.Command{
	Use:   "build",
	Short: "Build index.html from landify.yaml",
	Long: `Reads the YAML file (default landify.yaml), validates its schema,
renders the landing page template, and writes the result to index.html in the
current directory by default.`,
	Args: cobra.NoArgs,
	RunE: func(cmd *cobra.Command, args []string) error {
		file, err := cmd.Flags().GetString("file")
		if err != nil {
			return err
		}
		output, err := cmd.Flags().GetString("output")
		if err != nil {
			return err
		}
		themeName, err := cmd.Flags().GetString("theme")
		if err != nil {
			return err
		}
		if err := landify.BuildFile(file, output, themeName); err != nil {
			return err
		}
		cmd.Printf("Built %s from %s\n", output, file)
		return nil
	},
}

func init() {
	buildCmd.Flags().StringP("output", "o", "index.html", "path to write the generated page")
	buildCmd.Flags().StringP("theme", "t", "", "built-in theme preset overriding the YAML theme (ocean, forest, sunset, royal, rose, slate, sand, midnight)")
}
