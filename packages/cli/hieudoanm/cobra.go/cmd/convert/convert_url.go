package convert

import (
	"fmt"
	"net/url"

	"github.com/spf13/cobra"
)

func newURLCmd() *cobra.Command {
	var decode bool

	cmd := &cobra.Command{
		Use:   "url [text]",
		Short: "Encode or decode a URL",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			if decode {
				decoded, err := url.QueryUnescape(text)
				if err != nil {
					return err
				}
				fmt.Println(decoded)
			} else {
				fmt.Println(url.QueryEscape(text))
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(&decode, "decode", "d", false, "Decode URL")
	return cmd
}
