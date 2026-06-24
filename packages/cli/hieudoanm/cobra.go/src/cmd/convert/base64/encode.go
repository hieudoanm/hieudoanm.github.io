package base64

import (
	"encoding/base64"
	"fmt"
	"os"

	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type encodeResult struct {
	Output string `json:"output"`
}

func newEncodeCmd() *cobra.Command {
	var file string
	var output string

	cmd := &cobra.Command{
		Use:   "encode [text]",
		Short: "Encode text/file to base64",
		Example: `  convert base64 encode "hello world"
  convert base64 encode --file photo.png
  convert base64 encode --file photo.png --out encoded.txt`,
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
			encoded := base64.StdEncoding.EncodeToString(data)
			if output != "" {
				if err := os.WriteFile(output, []byte(encoded), 0644); err != nil {
					return err
				}
			} else {
				useJSON, _ := cmd.Flags().GetBool("json")
				if useJSON {
					return internal.WriteJSON(cmd, encodeResult{Output: encoded})
				}
				fmt.Fprintln(cmd.OutOrStdout(), encoded)
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&file, "file", "f", "", "File to encode (reads raw bytes to base64)")
	cmd.Flags().StringVarP(&output, "output", "o", "", "Write output to file instead of stdout")
	return cmd
}
