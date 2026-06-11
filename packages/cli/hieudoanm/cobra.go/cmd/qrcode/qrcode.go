package qrcode

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/AlecAivazis/survey/v2"
	"github.com/spf13/cobra"

	qrcode "github.com/skip2/go-qrcode"
)

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "qrcode",
		Short: "Generate a QR code PNG from a URL",
		Long:  `Generate a QR code image file from a given URL string. The output is saved as qrcode.png in the current directory.`,
		RunE: func(cmd *cobra.Command, args []string) error {
			var url string
			prompt := &survey.Input{Message: "URL:"}
			if err := survey.AskOne(prompt, &url); err != nil {
				return err
			}
			err := qrcode.WriteFile(url, qrcode.Highest, 256, "qrcode.png")
			if err != nil {
				return err
			}
			ex, err := os.Executable()
			if err != nil {
				return err
			}
			exPath := filepath.Dir(ex)
			fmt.Println("QR code saved to:", exPath)
			return nil
		},
	}
}
