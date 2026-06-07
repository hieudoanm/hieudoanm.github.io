package convert

import (
	"encoding/json"
	"fmt"
	"net/url"

	"github.com/spf13/cobra"
)

func newURLCmd() *cobra.Command {
	var decode bool

	cmd := &cobra.Command{
		Use:   "url [text]",
		Short: "Encode or decode a URL",
		Long:  `URL-encode a string or URL-decode an encoded string (use --decode for decoding).`,
		Example: `  convert url "hello world"
  convert url --decode "hello+world"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			jsonOutput, _ := cmd.Flags().GetBool("json")
			if decode {
				r, err := url.QueryUnescape(text)
				if err != nil {
					return err
				}
				if jsonOutput {
					b, _ := json.MarshalIndent(map[string]interface{}{"input": text, "output": r, "mode": "decode"}, "", "  ")
					fmt.Println(string(b))
				} else {
					fmt.Println(r)
				}
			} else {
				r := url.QueryEscape(text)
				if jsonOutput {
					b, _ := json.MarshalIndent(map[string]interface{}{"input": text, "output": r, "mode": "encode"}, "", "  ")
					fmt.Println(string(b))
				} else {
					fmt.Println(r)
				}
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(&decode, "decode", "d", false, "Decode URL")
	return cmd
}
