// Package colors ...
package colors

import (
	"fmt"

	"github.com/spf13/cobra"
)

func newConvertOklchCmd() *cobra.Command {
	return &cobra.Command{
		Use:     "oklch",
		Short:   "Convert OKLCH values to HEX, RGB, HSL, HCL, and CMYK",
		Long:    `Prompt for OKLCH (Lightness, Chroma, Hue) values and convert them to RGB, HEX, HSL, HCL, and CMYK color spaces.`,
		Example: `  colors oklch`,
		RunE: func(cmd *cobra.Command, args []string) error {
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
				return nil
			}
			rgb := RGB{R: r, G: g, B: b}

			// RGB → HEX
			hex, err := rgb.ToHex()
			if err != nil {
				fmt.Println("Error (HEX)  :", err)
				return nil
			}
			fmt.Printf("HEX    : %s\n", hex)

			// RGB → RGB
			if !rgb.IsValid() {
				fmt.Println("Error (RGB)  : invalid RGB values")
				return nil
			}
			fmt.Printf("RGB    : rgb(%d, %d, %d)\n", r, g, b)

			// RGB → HSL
			hHSL, sHSL, lHSL, err := rgb.ToHSL()
			if err != nil {
				fmt.Println("Error (HSL)  :", err)
				return nil
			}
			fmt.Printf("HSL    : h=%.2f°, s=%.2f%%, l=%.2f%%\n", hHSL, sHSL, lHSL)

			// RGB → HCL
			hHCL, cHCL, lHCL, err := rgb.ToHCL()
			if err != nil {
				fmt.Println("Error (HCL)  :", err)
				return nil
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

			return nil
		},
	}
}
