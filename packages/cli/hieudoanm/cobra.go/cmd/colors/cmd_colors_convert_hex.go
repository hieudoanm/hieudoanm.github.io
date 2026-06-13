// Package colors ...
package colors

import (
	"fmt"

	"github.com/spf13/cobra"
)

// colorsConvertHexCmd represents the colorsHexToRgb command
var colorsConvertHexCmd = &cobra.Command{
	Use:   "hex",
	Short: "Run the hex operation for the colors app",
	Long: `The hex command is a specific utility to execute operations related to hex within the colors application.

As a component of the design tools, this command empowers you to interact directly with colors's hex features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		// Prompt for HEX input
		fmt.Print("HEX: ")
		var hexInput string
		fmt.Scanln(&hexInput)

		hex := Hex(hexInput) // wrap input in Hex type

		// HEX → RGB
		r, g, b, err := hex.ToRGB()
		if err != nil {
			fmt.Println("Error (RGB)  :", err)
			return
		}
		fmt.Printf("RGB    : rgb(%d, %d, %d)\n", r, g, b)

		// HEX → HSL
		hHSL, sHSL, lHSL, err := hex.ToHSL()
		if err != nil {
			fmt.Println("Error (HSL)  :", err)
		} else {
			fmt.Printf("HSL    : h=%.2f°, s=%.2f%%, l=%.2f%%\n", hHSL, sHSL, lHSL)
		}

		// HEX → HCL
		hHCL, cHCL, lHCL, err := hex.ToHCL()
		if err != nil {
			fmt.Println("Error (HCL)  :", err)
		} else {
			fmt.Printf("HCL    : h=%.2f°, c=%.2f, l=%.2f\n", hHCL, cHCL, lHCL)
		}

		// HEX → OKLCH
		oklL, oklC, oklH, err := hex.ToOKLCH()
		if err != nil {
			fmt.Println("Error (OKLCH):", err)
		} else {
			fmt.Printf("OKLCH  : L=%.3f, C=%.3f, H=%.2f°\n", oklL, oklC, oklH)
		}

		// HEX → CMYK
		C, M, Y, K, err := hex.ToCMYK()
		if err != nil {
			fmt.Println("Error (CMYK) :", err)
		} else {
			fmt.Printf("CMYK   : C=%.3f, M=%.3f, Y=%.3f, K=%.3f\n", C, M, Y, K)
		}
	},
}
