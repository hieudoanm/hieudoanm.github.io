// Package cmd ...
package cmd

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"

	qrcode "github.com/skip2/go-qrcode"
)

// qrcodeCmd represents the qrcode command
var qrcodeCmd = &cobra.Command{
	Use:   "qrcode",
	Short: "Run the generate operation for the qrcode app",
	Long: `The qrcode command is a specific utility to execute operations related to generate within the qrcode application.

As a component of the utilities tools, this command empowers you to interact directly with qrcode's generate features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {

		// Get URL
		fmt.Print("URL: ")
		var url string
		fmt.Scanln(&url)
		err := qrcode.WriteFile(url, qrcode.Highest, 256, "qrcode.png")
		if err != nil {
			panic(err)
		}
		ex, err := os.Executable()
		if err != nil {
			panic(err)
		}
		exPath := filepath.Dir(ex)
		fmt.Println("QR code saved to:", exPath)
	},
}

func init() {
	rootCmd.AddCommand(qrcodeCmd)
}
