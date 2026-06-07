package random

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/colors/internal"
	"github.com/spf13/cobra"
)

func newCmd() *cobra.Command {
	var maxHEX int
	cmd := &cobra.Command{
		Use:   "random",
		Short: "Generate random HEX colors with RGB preview",
		Long:  `Generate one or more random HEX colors and display them alongside their RGB values.`,
		Example: `  colors random
  colors random --max 5`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			if jsonOutput {
				var colors []map[string]interface{}
				for i := 0; i < maxHEX; i++ {
					newHEX := internal.GenerateRandomHexColor()
					hex := internal.Hex(newHEX)
					r, g, b, err := hex.ToRGB()
					if err != nil {
						continue
					}
					colors = append(colors, map[string]interface{}{
						"hex": newHEX,
						"rgb": map[string]interface{}{"r": r, "g": g, "b": b},
					})
				}
				out, _ := json.MarshalIndent(colors, "", "  ")
				fmt.Println(string(out))
				return nil
			}
			for i := 0; i < maxHEX; i++ {
				newHEX := internal.GenerateRandomHexColor()
				hex := internal.Hex(newHEX)
				r, g, b, err := hex.ToRGB()
				if err != nil {
					fmt.Println("Error converting HEX to RGB:", err)
					continue
				}
				fmt.Printf("%s - rgb(%d, %d, %d)\n", newHEX, r, g, b)
			}
			return nil
		},
	}
	cmd.Flags().IntVarP(&maxHEX, "max", "m", 1, "number of random colors")
	return cmd
}

func NewCmd() *cobra.Command {
	return newCmd()
}
