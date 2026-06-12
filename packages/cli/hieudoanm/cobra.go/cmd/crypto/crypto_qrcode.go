package crypto

import (
	"fmt"
	"os"
	"strings"

	"github.com/mdp/qrterminal/v3"
	"github.com/spf13/cobra"
)

func newQrcodeCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "qrcode <text>",
		Short: "Generate a QR code in the terminal",
		Args:  cobra.MinimumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text := strings.Join(args, " ")

			config := qrterminal.Config{
				Level:     qrterminal.M,
				Writer:    os.Stdout,
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
}
