/*
Landify — build a flat landing page from a single YAML file.
*/
package cmd

import (
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "landify",
	Short: "Build a landing page from a YAML file",
	Long: `Landify generates a flat, dependency-free landing page from a
single YAML file. No build tooling is required to serve the result — just
HTML and CSS.

Commands:
  new       create a landify.yaml with placeholder content
  validate  check the schema of landify.yaml
  build     generate index.html from landify.yaml
  themes    list the sixty-four built-in theme presets
  serve     preview the result over HTTP`,
	SilenceUsage:  true,
	SilenceErrors: true,
}

// Execute runs the root command and exits non-zero on failure.
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		os.Stderr.WriteString("landify: " + err.Error() + "\n")
		os.Exit(1)
	}
}

func init() {
	rootCmd.PersistentFlags().StringP("file", "f", "landify.yaml", "path to the YAML content file")
	rootCmd.AddCommand(newCmd, validateCmd, buildCmd, themesCmd, serveCmd)
}
