package pdf

import (
	"github.com/hieudoanm/jack/src/cmd/pdf/combine"
	"github.com/hieudoanm/jack/src/cmd/pdf/edit"
	"github.com/hieudoanm/jack/src/cmd/pdf/extract"
	"github.com/hieudoanm/jack/src/cmd/pdf/inspect"
	"github.com/hieudoanm/jack/src/cmd/pdf/maintain"
	"github.com/hieudoanm/jack/src/cmd/pdf/security"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "pdf",
		Short: "PDF processing toolkit",
		Long:  "PDF processing toolkit with subcommands grouped by concern: combine, security, extract, edit, inspect, and maintain.",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.AddCommand(combine.NewCommand())
	cmd.AddCommand(security.NewCommand())
	cmd.AddCommand(extract.NewCommand())
	cmd.AddCommand(edit.NewCommand())
	cmd.AddCommand(inspect.NewCommand())
	cmd.AddCommand(maintain.NewCommand())
	cmd.PersistentFlags().BoolP("json", "j", false, "Output in JSON format")
	return cmd
}
