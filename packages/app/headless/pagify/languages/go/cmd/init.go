package cmd

import (
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

// starterFiles are the files `pagify init` writes, keyed by path relative to
// the new project. The set is deliberately small: one landing page, one section,
// and an optional config. Anything more would be scaffolding most projects
// delete immediately.
var starterFiles = []starter{
	{
		path:    "docs/index.md",
		content: "# Welcome\n\nThis site was created with `pagify init`.\n\nEdit the files in `docs/` and run `pagify serve` to see your changes.\n",
	},
	{
		path: "docs/guide/index.md",
		content: "---\ntitle: Guide\norder: 1\n---\n\n" +
			"# Guide\n\nSections become navigation groups automatically.\n",
	},
	{
		path:    "docs/guide/getting-started.md",
		content: "# Getting Started\n\nDescribe the first thing a reader should do.\n",
	},
	{
		path: "docs/guide/configuration.md",
		content: "---\ntitle: Configuration\n---\n\n" +
			"# Configuration\n\nFrontmatter sets the page title, description and sidebar position.\n",
	},
}

// starter is one generated file.
type starter struct {
	path    string
	content string
}

// newInitCommand builds the init subcommand.
func newInitCommand(stdout io.Writer) *cobra.Command {
	var force bool

	command := &cobra.Command{
		Use:   "init [directory]",
		Short: "Create a new pagify project",
		Long: `Init creates a minimal pagify project you can build immediately.

  pagify init
  pagify init ./my-docs`,
		Args:      cobra.MaximumNArgs(1),
		ValidArgs: []string{"."},
		RunE: func(command *cobra.Command, args []string) error {
			target := "."
			if len(args) == 1 {
				target = args[0]
			}
			return runInit(stdout, target, force)
		},
	}
	command.Flags().BoolVarP(&force, "force", "f", false, "overwrite existing files")
	return command
}

// runInit writes the starter project and prints next steps.
func runInit(stdout io.Writer, target string, force bool) error {
	for _, file := range starterFiles {
		if err := writeStarter(target, file, force); err != nil {
			return err
		}
	}

	fmt.Fprintf(stdout, "Created a pagify project in %s\n\n", filepath.Join(target, "docs"))
	fmt.Fprintln(stdout, "Next steps:")
	fmt.Fprintf(stdout, "  cd %s\n", target)
	fmt.Fprintln(stdout, "  pagify serve")
	fmt.Fprintln(stdout, "  pagify build")
	return nil
}

// writeStarter writes one starter file, refusing to clobber anything unless
// the user passed --force.
func writeStarter(target string, file starter, force bool) error {
	path := filepath.Join(target, filepath.FromSlash(file.path))
	if !force {
		if _, err := os.Stat(path); err == nil {
			return fmt.Errorf("%s already exists (use --force to overwrite)", file.path)
		}
	}
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return fmt.Errorf("create directory for %s: %w", file.path, err)
	}
	if err := os.WriteFile(path, []byte(file.content), 0o644); err != nil {
		return fmt.Errorf("write %s: %w", file.path, err)
	}
	return nil
}
