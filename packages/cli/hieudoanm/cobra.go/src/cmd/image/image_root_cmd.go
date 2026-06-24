package image

import (
	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/cmd/image/convert"
	"github.com/hieudoanm/jack/src/cmd/image/dominant"
	"github.com/hieudoanm/jack/src/cmd/image/icons"
	"github.com/hieudoanm/jack/src/cmd/image/info"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "image",
		Short: "Image processing tools",
		Long:  "Image processing tools including format conversion, color analysis, and metadata extraction.",
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(convert.NewCmd())
	cmd.AddCommand(dominant.NewCmd())
	cmd.AddCommand(icons.NewCmd())
	cmd.AddCommand(info.NewCmd())
	cmd.PersistentFlags().BoolP("json", "j", false, "Output in JSON format")
	cmd.PersistentFlags().BoolP("verbose", "v", false, "Verbose output")
	return cmd
}
