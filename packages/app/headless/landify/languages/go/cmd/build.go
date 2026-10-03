package cmd

import (
	"strings"

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
		result, err := landify.BuildFile(file, output, themeName)
		if err != nil {
			return err
		}
		cmd.Printf("Built %s from %s\n", result.Page, file)
		if result.Card != "" {
			png := strings.TrimSuffix(result.Card, ".svg") + ".png"
			cmd.Printf("Built %s\n", result.Card)
			cmd.Printf("Rasterize the card: rsvg-convert -o %s %s\n", png, result.Card)
		}
		return nil
	},
}

func init() {
	buildCmd.Flags().StringP("output", "o", "index.html", "path to write the generated page")
	buildCmd.Flags().StringP("theme", "t", "", "built-in theme preset overriding the YAML theme (see \"landify themes\" for all 64)")
}
