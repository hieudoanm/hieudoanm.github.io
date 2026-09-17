package cmd

import (
	"fmt"
	"io"
	"os"

	"github.com/spf13/cobra"

	"dbml/internal/dbml"
)

func newMermaidCommand(stdout io.Writer) *cobra.Command {
	var outputFile string

	command := &cobra.Command{
		Use:   "mermaid [input.dbml]",
		Short: "Generate Mermaid ER diagram from DBML",
		Long: `Generate a Mermaid ER diagram from a DBML file.

The input file defaults to schema.dbml if not specified.
Output defaults to database-erd.mmd if not specified with -o flag.`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(command *cobra.Command, args []string) error {
			inputFile := getInputFile(args, "schema.dbml")
			output := getOutputFile(outputFile, "database-erd.mmd")

			return runMermaid(stdout, inputFile, output)
		},
	}

	command.Flags().StringVarP(&outputFile, "output", "o", "", "Output Mermaid file (default: database-erd.mmd)")
	return command
}

func runMermaid(stdout io.Writer, inputFile, outputFile string) error {
	project, err := dbml.ParseFile(inputFile)
	if err != nil {
		return fmt.Errorf("parse DBML: %w", err)
	}

	mermaid := project.ToMermaid()

	if err := os.WriteFile(outputFile, []byte(mermaid), 0644); err != nil {
		return fmt.Errorf("write output: %w", err)
	}

	fmt.Fprintf(stdout, "Generated Mermaid ER diagram: %s\n", outputFile)
	return nil
}
