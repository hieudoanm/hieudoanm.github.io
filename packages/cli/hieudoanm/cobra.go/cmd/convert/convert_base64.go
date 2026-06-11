package convert

import (
	"encoding/base64"
	"fmt"

	"github.com/spf13/cobra"
)

func newBase64Cmd() *cobra.Command {
	var decode bool

	cmd := &cobra.Command{
		Use:   "base64 [text]",
		Short: "Encode or decode base64",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			if decode {
				decoded, err := base64.StdEncoding.DecodeString(text)
				if err != nil {
					return err
				}
				fmt.Println(string(decoded))
			} else {
				fmt.Println(base64.StdEncoding.EncodeToString([]byte(text)))
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(&decode, "decode", "d", false, "Decode base64")
	return cmd
}
