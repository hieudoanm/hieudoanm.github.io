package qrcode

import "github.com/spf13/cobra"

func NewCommand() *cobra.Command {
	var data string

	cmd := &cobra.Command{
		Use:   "qrcode [--data <text>]",
		Short: "Generate a QR code in the terminal",
		Long:  `Generate a QR code from text and display it in the terminal using Unicode block characters.`,
		Example: `  crypto qrcode --data "https://example.com"
  crypto qrcode --data "Hello, World!"`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			return runQRCode(data, jsonOutput)
		},
	}

	cmd.Flags().StringVarP(&data, "data", "d", "", "Text or data to encode")
	return cmd
}
