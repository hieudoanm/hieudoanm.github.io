package cmd

import (
	"fmt"
	"io"
	"os"

	"github.com/spf13/cobra"

	"dbml/internal/dbml"
)

func newSVGCommand(stdout io.Writer) *cobra.Command {
	var outputFile string

	command := &cobra.Command{
		Use:   "svg [input.dbml]",
		Short: "Generate SVG ER diagram from DBML",
		Long: `Generate an SVG ER diagram directly from a DBML file.

The input file defaults to schema.dbml if not specified.
Output defaults to schema.svg if not specified with -o flag.`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(command *cobra.Command, args []string) error {
			inputFile := getInputFile(args, "schema.dbml")
			output := getOutputFile(outputFile, "schema.svg")

			return runSVG(stdout, inputFile, output)
		},
	}

	command.Flags().StringVarP(&outputFile, "output", "o", "", "Output SVG file (default: schema.svg)")
	return command
}

func runSVG(stdout io.Writer, inputFile, outputFile string) error {
	project, err := dbml.ParseFile(inputFile)
	if err != nil {
		return fmt.Errorf("parse DBML: %w", err)
	}

	svg := project.ToSVG()

	if err := os.WriteFile(outputFile, []byte(svg), 0644); err != nil {
		return fmt.Errorf("write output: %w", err)
	}

	fmt.Fprintf(stdout, "Generated SVG diagram: %s\n", outputFile)
	return nil
}
