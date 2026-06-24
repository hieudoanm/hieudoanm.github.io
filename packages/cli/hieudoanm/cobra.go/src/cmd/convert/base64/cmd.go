package base64

import (
	"github.com/hieudoanm/jack/src/cmd/convert/base64/decode"
	"github.com/hieudoanm/jack/src/cmd/convert/base64/encode"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "base64",
		Short: "Base64 encode/decode",
		Long:  `Encode text/file to base64 or decode base64 back to text/file.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.AddCommand(encode.NewCmd())
	cmd.AddCommand(decode.NewCmd())
	return cmd
}
