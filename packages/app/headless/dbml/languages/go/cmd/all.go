package cmd

import (
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"

	"dbml/internal/dbml"
)

func newAllCommand(stdout io.Writer) *cobra.Command {
	var outputDir string

	command := &cobra.Command{
		Use:   "all [input.dbml]",
		Short: "Generate SQL, Mermaid, and SVG from DBML",
		Long: `Generate all output formats (SQL, Mermaid ERD, SVG) from a DBML file.

The input file defaults to schema.dbml if not specified.
Outputs are written to the specified directory (default: current directory).`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(command *cobra.Command, args []string) error {
			inputFile := getInputFile(args, "schema.dbml")
			return runAll(stdout, inputFile, outputDir)
		},
	}

	command.Flags().StringVarP(&outputDir, "output-dir", "d", ".", "Output directory (default: current directory)")
	return command
}

func runAll(stdout io.Writer, inputFile, outputDir string) error {
	project, err := dbml.ParseFile(inputFile)
	if err != nil {
		return fmt.Errorf("parse DBML: %w", err)
	}

	if err := os.MkdirAll(outputDir, 0755); err != nil {
		return fmt.Errorf("create output dir: %w", err)
	}

	sqlFile := filepath.Join(outputDir, "initial_schema.sql")
	sql := project.ToSQL()
	if err := os.WriteFile(sqlFile, []byte(sql), 0644); err != nil {
		return fmt.Errorf("write SQL: %w", err)
	}
	fmt.Fprintf(stdout, "Generated SQL schema: %s\n", sqlFile)

	mmdFile := filepath.Join(outputDir, "database-erd.mmd")
	mermaid := project.ToMermaid()
	if err := os.WriteFile(mmdFile, []byte(mermaid), 0644); err != nil {
		return fmt.Errorf("write Mermaid: %w", err)
	}
	fmt.Fprintf(stdout, "Generated Mermaid ER diagram: %s\n", mmdFile)

	svgFile := filepath.Join(outputDir, "schema.svg")
	if err := os.WriteFile(svgFile, []byte(project.ToSVG()), 0644); err != nil {
		return fmt.Errorf("write SVG: %w", err)
	}
	fmt.Fprintf(stdout, "Generated SVG diagram: %s\n", svgFile)

	return nil
}
