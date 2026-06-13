package crypto

import (
	"fmt"
	"os"

	"github.com/mdp/qrterminal/v3"
	"github.com/spf13/cobra"
)

func newQrcodeCmd() *cobra.Command {
	var data string
	cmd := &cobra.Command{
		Use:   "qrcode [--data <text>]",
		Short: "Generate a QR code in the terminal",
		RunE: func(cmd *cobra.Command, args []string) error {
			text := data

			config := qrterminal.Config{
				Level:      qrterminal.M,
				Writer:     os.Stdout,
				HalfBlocks: true,
				BlackChar:  qrterminal.BLACK,
				WhiteChar:  qrterminal.WHITE,
				QuietZone:  1,
			}

			qrterminal.GenerateWithConfig(text, config)
			fmt.Println()
			return nil
		},
	}

	cmd.Flags().StringVarP(&data, "data", "d", "", "Text or data to encode")
	return cmd
}
