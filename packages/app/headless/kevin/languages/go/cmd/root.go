package cmd

import (
	"github.com/spf13/cobra"
)

// NewRootCommand returns the kevin CLI root command.
func NewRootCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "kevin",
		Short: "Redis-style in-memory key/value store",
		Long: "kevin is a Redis-style in-memory key/value store shipped as a\n" +
			"single static Go binary, behaviour-identical to the C and C++\n" +
			"implementations.",
	}
	cmd.AddCommand(newServeCommand())
	return cmd
}
