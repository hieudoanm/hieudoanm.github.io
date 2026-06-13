// Package colors ...
package colors

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"github.com/AlecAivazis/survey/v2"
	"github.com/spf13/cobra"
)

// colorsPaletteCmd represents the palette command
var colorsPaletteCmd = &cobra.Command{
	Use:   "palette",
	Short: "Run the palette operation for the colors app",
	Long: `The palette command is a specific utility to execute operations related to palette within the colors application.

As a component of the design tools, this command empowers you to interact directly with colors's palette features via the CLI.`,
	RunE: func(cmd *cobra.Command, args []string) error {

		reader := bufio.NewReader(os.Stdin)

		// ----------------------------
		// 1) Ask for base HEX input
		// ----------------------------
		fmt.Print("Enter base HEX (e.g. #ff6600): ")
		hexInput, _ := reader.ReadString('\n')
		hexInput = strings.TrimSpace(hexInput)

		if !IsValidHex(hexInput) {
			fmt.Println("❌ Invalid hex color.")
			return nil
		}

		hex := Hex(hexInput) // wrap input in Hex type

		// HEX → HSL
		h, s, l, err := hex.ToHSL()
		if err != nil {
			fmt.Println("Error converting to HSL:", err)
			return nil
		}
		baseHue := h
		baseS := s
		baseL := l

		// ----------------------------
		// 2) Ask for palette style
		// ----------------------------
		paletteOptions := []string{
			"Balanced professional (Triadic)",
			"High-contrast (Complementary)",
			"Soft aesthetic (Analogous)",
		}

		var selected string
		prompt := &survey.Select{
			Message: "Choose palette style:",
			Options: paletteOptions,
		}

		survey.AskOne(prompt, &selected)

		// ----------------------------
		// 3) Compute palette hues
		// ----------------------------
		var base, support, accent float64

		switch selected {
		case "Balanced professional (Triadic)":
			base = baseHue
			support = baseHue + 120
			accent = baseHue + 240

		case "High-contrast (Complementary)":
			base = baseHue
			support = baseHue + 30
			accent = baseHue + 180

		case "Soft aesthetic (Analogous)":
			base = baseHue
			support = baseHue - 30
			accent = baseHue + 30
		}

		// Normalize hues
		hues := []*float64{&base, &support, &accent}
		for _, h := range hues {
			for *h < 0 {
				*h += 360
			}
			for *h >= 360 {
				*h -= 360
			}
		}

		// ----------------------------
		// 4) Convert back to HEX
		// ----------------------------
		baseHex := HSLToHex(HSL{H: base, S: baseS, L: baseL})
		supportHex := HSLToHex(HSL{H: support, S: baseS, L: baseL})
		accentHex := HSLToHex(HSL{H: accent, S: baseS, L: baseL})

		// ----------------------------
		// 5) Output
		// ----------------------------
		fmt.Println("\n🎨 Generated Palette:")
		fmt.Printf("Base:    %s  (H=%.0f)\n", baseHex, base)
		fmt.Printf("Support: %s  (H=%.0f)\n", supportHex, support)
		fmt.Printf("Accent:  %s  (H=%.0f)\n", accentHex, accent)
		fmt.Println()

		return nil
	},
}
