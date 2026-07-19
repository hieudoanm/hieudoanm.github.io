package cmd

import (
	"fmt"
	"io"
	"time"

	"github.com/spf13/cobra"

	"pagify/internal/build"
)

// defaultContentDir is where `pagify build` looks when given no path, so the
// common case needs no arguments at all.
const defaultContentDir = "docs"

// defaultOutputDir is the conventional static build output. GitHub Pages,
// Cloudflare Pages and Netlify all serve it without configuration.
const defaultOutputDir = "dist"

// newBuildCommand builds the build subcommand.
func newBuildCommand(stdout io.Writer) *cobra.Command {
	var outputDir string

	command := &cobra.Command{
		Use:   "build [content]",
		Short: "Convert Markdown into a static website",
		Long: `Build converts a directory of Markdown files into a static website.

The content directory defaults to ./docs and the output to ./dist:

  pagify build
  pagify build ./docs --output ./public`,
		Args:      cobra.MaximumNArgs(1),
		ValidArgs: []string{defaultContentDir},
		RunE: func(command *cobra.Command, args []string) error {
			contentDir := defaultContentDir
			if len(args) == 1 {
				contentDir = args[0]
			}
			return runBuild(stdout, contentDir, outputDir)
		},
	}
	command.Flags().StringVarP(&outputDir, "output", "o", defaultOutputDir, "directory to write the site to")
	return command
}

// runBuild performs the build and prints a one-line summary.
func runBuild(stdout io.Writer, contentDir, outputDir string) error {
	started := time.Now()
	result, err := build.Build(build.Options{ContentDir: contentDir, OutputDir: outputDir})
	if err != nil {
		return err
	}

	fmt.Fprintf(stdout, "Built %d pages and %d assets into %s in %s\n",
		result.Pages, result.Assets, outputDir, time.Since(started).Round(time.Millisecond))
	return nil
}
