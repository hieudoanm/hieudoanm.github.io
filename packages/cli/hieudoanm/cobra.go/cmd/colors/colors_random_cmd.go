// Package colors ...
package colors

import (
	"fmt"

	"github.com/spf13/cobra"
)

func newRandomCmd() *cobra.Command {
	var maxHEX int

	cmd := &cobra.Command{
		Use:   "random",
		Short: "Generate random HEX colors with RGB preview",
		Long:  `Generate one or more random HEX colors and display them alongside their RGB values.`,
		Example: `  colors random
  colors random --max 5`,
		RunE: func(cmd *cobra.Command, args []string) error {

			for i := 0; i < maxHEX; i++ {
				newHEX := GenerateRandomHexColor()
				hex := Hex(newHEX) // wrap string in Hex type

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

	cmd.Flags().IntVarP(
		&maxHEX,
		"max",
		"m",
		1,
		"number of random colors",
	)

	return cmd
}
