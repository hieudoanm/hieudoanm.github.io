package url

import (
	"net/url"

	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type result struct {
	Input  string `json:"input"`
	Output string `json:"output"`
	Mode   string `json:"mode"`
}

func NewCommand() *cobra.Command {
	var decode bool

	cmd := &cobra.Command{
		Use:   "url [text]",
		Short: "Encode or decode a URL",
		Long:  `URL-encode a string or URL-decode an encoded string (use --decode for decoding).`,
		Example: `  convert url "hello world"
  convert url --decode "hello+world"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := internal.ResolveText(args)
			if err != nil {
				return err
			}
			useJSON, _ := cmd.Flags().GetBool("json")
			if decode {
				r, err := url.QueryUnescape(text)
				if err != nil {
					return err
				}
				if useJSON {
					return internal.WriteJSON(cmd, result{Input: text, Output: r, Mode: "decode"})
				}
				cmd.Println(r)
			} else {
				r := url.QueryEscape(text)
				if useJSON {
					return internal.WriteJSON(cmd, result{Input: text, Output: r, Mode: "encode"})
				}
				cmd.Println(r)
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(&decode, "decode", "d", false, "Decode URL")
	return cmd
}
