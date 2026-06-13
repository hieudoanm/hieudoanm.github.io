// Package colors ...
package colors

import (
	"fmt"

	"github.com/spf13/cobra"
)

// colorsConvertHclCmd represents the colorsHCL command
var colorsConvertHclCmd = &cobra.Command{
	Use:   "hcl",
	Short: "Run the hcl operation for the colors app",
	Long: `The hcl command is a specific utility to execute operations related to hcl within the colors application.

As a component of the design tools, this command empowers you to interact directly with colors's hcl features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		// Prompt for HCL input
		var h, c, l float64
		fmt.Print("Hue (0–360)      : ")
		fmt.Scanln(&h)
		fmt.Print("Chroma (0–100)   : ")
		fmt.Scanln(&c)
		fmt.Print("Lightness (0–100): ")
		fmt.Scanln(&l)

		hcl := HCL{H: h, C: c, L: l}

		// HCL → RGB
		r, g, b, err := hcl.ToRGB()
		if err != nil {
			fmt.Println("Error (RGB)  :", err)
			return
		}
		rgb := RGB{R: r, G: g, B: b}

		// RGB → HEX
		hex, err := rgb.ToHex()
		if err != nil {
			fmt.Println("Error (HEX)  :", err)
		} else {
			fmt.Printf("HEX    : %s\n", hex)
		}

		// RGB → RGB
		if !rgb.IsValid() {
			fmt.Println("Error (RGB)  : invalid RGB values")
		} else {
			fmt.Printf("RGB    : rgb(%d, %d, %d)\n", r, g, b)
		}

		// RGB → HSL
		hHSL, sHSL, lHSL, err := rgb.ToHSL()
		if hHSL < 0 || sHSL < 0 || lHSL < 0 || err != nil {
			fmt.Println("Error (HSL)  : conversion failed")
		} else {
			fmt.Printf("HSL    : h=%.2f°, s=%.2f%%, l=%.2f%%\n", hHSL, sHSL, lHSL)
		}

		// RGB → OKLCH
		oklL, oklC, oklH, err := rgb.ToOKLCH()
		if oklL < 0 || oklC < 0 || oklH < 0 || err != nil {
			fmt.Println("Error (OKLCH): conversion failed")
		} else {
			fmt.Printf("OKLCH  : L=%.3f, C=%.3f, H=%.2f°\n", oklL, oklC, oklH)
		}

		// RGB → CMYK
		C, M, Y, K, err := rgb.ToCMYK()
		if C < 0 || M < 0 || Y < 0 || K < 0 || err != nil {
			fmt.Println("Error (CMYK) : conversion failed")
		} else {
			fmt.Printf("CMYK   : C=%.3f, M=%.3f, Y=%.3f, K=%.3f\n", C, M, Y, K)
		}
	},
}
