package cmd

import (
	"fmt"
	"io"
	"log/slog"
	"os"

	"github.com/spf13/cobra"
)

var version = "dev"

func NewRootCommand(stdout, stderr io.Writer) *cobra.Command {
	root := &cobra.Command{
		Use:   "dbml",
		Short: "Convert DBML to SQL, Mermaid ERD, and SVG diagrams",
		Long: `dbml is a CLI tool to convert Database Markup Language (DBML) files
into various output formats including SQL schemas, Mermaid ER diagrams,
and SVG visualizations.

Examples:
  dbml sql schema.dbml -o schema.sql
  dbml mermaid schema.dbml -o diagram.mmd
  dbml svg schema.dbml -o diagram.svg
  dbml all schema.dbml --output-dir ./output
  dbml serve --port 8080`,
		SilenceUsage:  true,
		SilenceErrors: true,
		Version:       version,
	}
	root.SetOut(stdout)
	root.SetErr(stderr)
	root.SetVersionTemplate("dbml {{.Version}}\n")

	root.AddCommand(
		newSQLCommand(stdout),
		newMermaidCommand(stdout),
		newSVGCommand(stdout),
		newAllCommand(stdout),
		newServeCommand(stdout),
	)
	return root
}

func Execute() int {
	configureLogging(os.Stderr)
	root := NewRootCommand(os.Stdout, os.Stderr)
	if err := root.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, "dbml: %v\n", err)
		return 1
	}
	return 0
}

func configureLogging(stderr io.Writer) {
	handler := slog.NewTextHandler(stderr, &slog.HandlerOptions{Level: slog.LevelWarn})
	slog.SetDefault(slog.New(handler))
}

func getInputFile(args []string, defaultFile string) string {
	if len(args) > 0 {
		return args[0]
	}
	return defaultFile
}

func getOutputFile(outputFlag, defaultFile string) string {
	if outputFlag != "" {
		return outputFlag
	}
	return defaultFile
}
