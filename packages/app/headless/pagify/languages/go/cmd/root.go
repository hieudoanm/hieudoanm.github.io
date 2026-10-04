// Package cmd implements the pagify command-line interface.
package cmd

import (
	"fmt"
	"io"
	"log/slog"
	"os"

	"github.com/spf13/cobra"
)

// version is the released version, overridable at link time with
// -ldflags "-X pagify/cmd.version=v1.2.3".
var version = "dev"

// NewRootCommand builds the pagify command tree. Dependencies arrive as
// parameters so tests can drive it without touching the filesystem or stdout.
func NewRootCommand(stdout, stderr io.Writer) *cobra.Command {
	root := &cobra.Command{
		Use:   "pagify",
		Short: "Turn a directory of Markdown into a static website",
		Long: `pagify turns a directory of Markdown files into a complete, static website.

Point it at your docs and it discovers the pages, builds the navigation,
renders every page and writes a site you can deploy to any static host:

  pagify build ./docs
  pagify serve ./docs

No configuration, no theme wiring, no Node.js required.`,
		SilenceUsage:  true,
		SilenceErrors: true,
		Version:       version,
	}
	root.SetOut(stdout)
	root.SetErr(stderr)
	root.SetVersionTemplate("pagify {{.Version}}\n")

	root.AddCommand(
		newBuildCommand(stdout),
		newServeCommand(stdout),
		newInitCommand(stdout),
	)
	return root
}

// Execute runs the pagify command tree and returns the process exit code.
//
// Diagnostics from the build and preview packages travel through slog, so the
// handler is pointed at the error stream here: a command that succeeds prints
// only what it was asked to print.
func Execute() int {
	configureLogging(os.Stderr)
	root := NewRootCommand(os.Stdout, os.Stderr)
	if err := root.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, "pagify: %v\n", err)
		return 1
	}
	return 0
}

// configureLogging routes slog to stderr at warn level, so a normal build
// prints only the summary the user asked for.
func configureLogging(stderr io.Writer) {
	handler := slog.NewTextHandler(stderr, &slog.HandlerOptions{Level: slog.LevelWarn})
	slog.SetDefault(slog.New(handler))
}
