package cmd

import (
	"os"

	"github.com/spf13/cobra"
)

var version = "dev"

var rootCmd = &cobra.Command{
	Use:   "cv",
	Short: "CV CLI - Generate CV from YAML to PDF",
	Long: `CV CLI helps you create and convert CV/resume from YAML format to PDF using templates.

Commands:
  init    create cv.yaml with default structure
  pdf     convert cv.yaml to cv.pdf using a template
  mcp     run MCP server
  serve   start HTTP server to generate PDF from JSON`,
	SilenceUsage:  true,
	SilenceErrors: true,
	Version:       version,
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		os.Stderr.WriteString("cv: " + err.Error() + "\n")
		os.Exit(1)
	}
}

func init() {
	rootCmd.SetVersionTemplate("cv {{.Version}}\n")

	rootCmd.AddCommand(initCmd, pdfCmd, mcpCmd, serveCmd)
}
