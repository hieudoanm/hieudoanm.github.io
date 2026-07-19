package cmd

import (
	"fmt"
	"io"
	"os"

	"github.com/spf13/cobra"

	"dbml/internal/dbml"
)

func newSQLCommand(stdout io.Writer) *cobra.Command {
	var outputFile string

	command := &cobra.Command{
		Use:   "sql [input.dbml]",
		Short: "Generate SQL schema from DBML",
		Long: `Generate SQL schema from a DBML file.

The input file defaults to schema.dbml if not specified.
Output defaults to initial_schema.sql if not specified with -o flag.`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(command *cobra.Command, args []string) error {
			inputFile := getInputFile(args, "schema.dbml")
			output := getOutputFile(outputFile, "initial_schema.sql")

			return runSQL(stdout, inputFile, output)
		},
	}

	command.Flags().StringVarP(&outputFile, "output", "o", "", "Output SQL file (default: initial_schema.sql)")
	return command
}

func runSQL(stdout io.Writer, inputFile, outputFile string) error {
	project, err := dbml.ParseFile(inputFile)
	if err != nil {
		return fmt.Errorf("parse DBML: %w", err)
	}

	sql := project.ToSQL()

	if err := os.WriteFile(outputFile, []byte(sql), 0644); err != nil {
		return fmt.Errorf("write output: %w", err)
	}

	fmt.Fprintf(stdout, "Generated SQL schema: %s\n", outputFile)
	return nil
}
