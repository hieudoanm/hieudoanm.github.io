package convert

import (
	"encoding/base64"
	"fmt"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

func stripDataURL(s string) string {
	if idx := strings.Index(s, "base64,"); idx != -1 {
		return s[idx+7:]
	}
	return s
}

func newBase64Cmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "base64",
		Short: "Base64 encode/decode",
		Long:  `Encode text/file to base64 or decode base64 back to text/file.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.AddCommand(newBase64EncodeCmd())
	cmd.AddCommand(newBase64DecodeCmd())
	return cmd
}

func newBase64EncodeCmd() *cobra.Command {
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
				text, err := resolveText(args)
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
				fmt.Println(encoded)
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&file, "file", "f", "", "File to encode (reads raw bytes → base64)")
	cmd.Flags().StringVarP(&output, "output", "o", "", "Write output to file instead of stdout")
	return cmd
}

func newBase64DecodeCmd() *cobra.Command {
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
				text, err := resolveText(args)
				if err != nil {
					return err
				}
				data = []byte(text)
			}
			raw := strings.TrimSpace(string(data))
			raw = strings.ReplaceAll(raw, "\n", "")
			raw = stripDataURL(raw)
			decoded, err := base64.StdEncoding.DecodeString(raw)
			if err != nil {
				return err
			}
			if output != "" {
				if err := os.WriteFile(output, decoded, 0644); err != nil {
					return err
				}
			} else {
				fmt.Println(string(decoded))
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&file, "file", "f", "", "File containing base64 to decode")
	cmd.Flags().StringVarP(&output, "output", "o", "", "Write decoded output to file instead of stdout")
	return cmd
}
