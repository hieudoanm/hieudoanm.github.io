// Package colors ...
package colors

import (
	"fmt"

	"github.com/spf13/cobra"
)

// colorsConvertOklchCmd represents the colorsOKLCH command
var colorsConvertOklchCmd = &cobra.Command{
	Use:   "oklch",
	Short: "Run the oklch operation for the colors app",
	Long: `The oklch command is a specific utility to execute operations related to oklch within the colors application.

As a component of the design tools, this command empowers you to interact directly with colors's oklch features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		// Prompt for OKLCH input
		var L, C, H float64
		fmt.Print("Lightness (0–1) : ")
		fmt.Scanln(&L)
		fmt.Print("Chroma (0–1)    : ")
		fmt.Scanln(&C)
		fmt.Print("Hue (0–360)     : ")
		fmt.Scanln(&H)

		oklch := OKLCH{L: L, C: C, H: H}

		// OKLCH → RGB
		r, g, b, err := oklch.ToRGB()
		if err != nil {
			fmt.Println("Error (RGB)  :", err)
			return
		}
		rgb := RGB{R: r, G: g, B: b}

		// RGB → HEX
		hex, err := rgb.ToHex()
		if err != nil {
			fmt.Println("Error (HEX)  :", err)
			return
		}
		fmt.Printf("HEX    : %s\n", hex)

		// RGB → RGB
		if !rgb.IsValid() {
			fmt.Println("Error (RGB)  : invalid RGB values")
			return
		}
		fmt.Printf("RGB    : rgb(%d, %d, %d)\n", r, g, b)

		// RGB → HSL
		hHSL, sHSL, lHSL, err := rgb.ToHSL()
		if err != nil {
			fmt.Println("Error (HSL)  :", err)
			return
		}
		fmt.Printf("HSL    : h=%.2f°, s=%.2f%%, l=%.2f%%\n", hHSL, sHSL, lHSL)

		// RGB → HCL
		hHCL, cHCL, lHCL, err := rgb.ToHCL()
		if err != nil {
			fmt.Println("Error (HCL)  :", err)
			return
		}
		fmt.Printf("HCL    : h=%.2f°, c=%.2f, l=%.2f\n", hHCL, cHCL, lHCL)

		// RGB → OKLCH
		oklL, oklC, oklH, err := rgb.ToOKLCH()
		if oklL < 0 || oklC < 0 || oklH < 0 || err != nil {
			fmt.Println("Error (OKLCH): conversion failed")
		} else {
			fmt.Printf("OKLCH  : L=%.3f, C=%.3f, H=%.2f°\n", oklL, oklC, oklH)
		}

		// RGB → CMYK
		Cy, M, Y, K, err := rgb.ToCMYK()
		if C < 0 || M < 0 || Y < 0 || K < 0 || err != nil {
			fmt.Println("Error (CMYK) : conversion failed")
		} else {
			fmt.Printf("CMYK   : C=%.3f, M=%.3f, Y=%.3f, K=%.3f\n", Cy, M, Y, K)
		}
	},
}
