package base64

import (
	"encoding/base64"
	"os"
	"strings"

	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type decodeResult struct {
	Output string `json:"output"`
}

func stripDataURL(s string) string {
	if idx := strings.Index(s, "base64,"); idx != -1 {
		return s[idx+7:]
	}
	return s
}

func decodeBase64(input []byte) ([]byte, error) {
	raw := strings.TrimSpace(string(input))
	raw = strings.ReplaceAll(raw, "\n", "")
	raw = stripDataURL(raw)
	return base64.StdEncoding.DecodeString(raw)
}

func newDecodeCmd() *cobra.Command {
	var file string
	var output string

	cmd := &cobra.Command{
		Use:   "decode [text]",
		Short: "Decode base64 to text/file",
		Example: `  convert base64 decode "aGVsbG8gd29ybGQ="
  convert base64 decode --file encoded.txt
  convert base64 decode --file encoded.txt --output decoded.jpg`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			var data []byte
			if file != "" {
				var err error
				data, err = os.ReadFile(file)
				if err != nil {
					return err
				}
			} else {
				text, err := internal.ResolveText(args)
				if err != nil {
					return err
				}
				data = []byte(text)
			}
			decoded, err := decodeBase64(data)
			if err != nil {
				return err
			}
			if output != "" {
				if err := os.WriteFile(output, decoded, 0644); err != nil {
					return err
				}
			} else {
				useJSON, _ := cmd.Flags().GetBool("json")
				if useJSON {
					return internal.WriteJSON(cmd, decodeResult{Output: string(decoded)})
				}
				cmd.Println(string(decoded))
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&file, "file", "f", "", "File containing base64 to decode")
	cmd.Flags().StringVarP(&output, "output", "o", "", "Write decoded output to file instead of stdout")
	return cmd
}
