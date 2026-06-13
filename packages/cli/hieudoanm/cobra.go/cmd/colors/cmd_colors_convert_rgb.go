// Package colors ...
package colors

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/spf13/cobra"
)

// colorsConvertRgbCmd represents the RGB-to-other-color-spaces command
var colorsConvertRgbCmd = &cobra.Command{
	Use:   "rgb",
	Short: "Run the rgb operation for the colors app",
	Long: `The rgb command is a specific utility to execute operations related to rgb within the colors application.

As a component of the design tools, this command empowers you to interact directly with colors's rgb features via the CLI.`,
	RunE: func(cmd *cobra.Command, args []string) error {

		reader := bufio.NewReader(os.Stdin)

		// Prompt for R
		fmt.Print("R (0-255): ")
		rStr, _ := reader.ReadString('\n')
		rStr = strings.TrimSpace(rStr)
		r, err := strconv.Atoi(rStr)
		if err != nil {
			fmt.Println("Error (R)    :", err)
			return nil
		}

		// Prompt for G
		fmt.Print("G (0-255): ")
		gStr, _ := reader.ReadString('\n')
		gStr = strings.TrimSpace(gStr)
		g, err := strconv.Atoi(gStr)
		if err != nil {
			fmt.Println("Error (G)    :", err)
			return nil
		}

		// Prompt for B
		fmt.Print("B (0-255): ")
		bStr, _ := reader.ReadString('\n')
		bStr = strings.TrimSpace(bStr)
		b, err := strconv.Atoi(bStr)
		if err != nil {
			fmt.Println("Error (B)    :", err)
			return nil
		}

		rgb := RGB{R: r, G: g, B: b}

		// RGB → HEX
		hexStr, err := rgb.ToHex()
		if err != nil {
			fmt.Println("Error (HEX)  :", err)
		} else {
			fmt.Printf("HEX    : %s\n", hexStr)
		}

		// RGB → HSL
		hHSL, sHSL, lHSL, err := rgb.ToHSL()
		if err != nil {
			fmt.Println("Error (HSL)  :", err)
		} else {
			fmt.Printf("HSL    : h=%.2f°, s=%.2f%%, l=%.2f%%\n", hHSL, sHSL, lHSL)
		}

		// RGB → HCL
		hHCL, cHCL, lHCL, err := rgb.ToHCL()
		if err != nil {
			fmt.Println("Error (HCL)  :", err)
		} else {
			fmt.Printf("HCL    : h=%.2f°, c=%.2f, l=%.2f\n", hHCL, cHCL, lHCL)
		}

		// RGB → OKLCH
		oklL, oklC, oklH, err := rgb.ToOKLCH()
		if err != nil {
			fmt.Println("Error (OKLCH):", err)
		} else {
			fmt.Printf("OKLCH  : L=%.3f, C=%.3f, H=%.2f°\n", oklL, oklC, oklH)
		}

		// RGB → CMYK
		C, M, Y, K, err := rgb.ToCMYK()
		if err != nil {
			fmt.Println("Error (CMYK) :", err)
		} else {
			fmt.Printf("CMYK   : C=%.3f, M=%.3f, Y=%.3f, K=%.3f\n", C, M, Y, K)
		}

		return nil
	},
}
