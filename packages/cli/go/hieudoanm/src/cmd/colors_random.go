// Package cmd ...
package cmd

import (
	"fmt"

	"github.com/hieudoanm/hieudoanm/src/services/colors"

	"github.com/spf13/cobra"
)

var maxHEX int

// randomCmd represents the colorsRandom command
var randomCmd = &cobra.Command{
	Use:   "random",
	Short: "Run the random operation for the colors app",
	Long: `The random command is a specific utility to execute operations related to random within the colors application.

As a component of the design tools, this command empowers you to interact directly with colors's random features via the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {

		for i := 0; i < maxHEX; i++ {
			newHEX := colors.GenerateRandomHexColor()
			hex := colors.Hex(newHEX) // wrap string in Hex type

			r, g, b, err := hex.ToRGB()
			if err != nil {
				fmt.Println("Error converting HEX to RGB:", err)
				continue
			}

			fmt.Printf("%s - rgb(%d, %d, %d)\n", newHEX, r, g, b)
		}
	},
}

func init() {
	colorsCmd.AddCommand(randomCmd)

	randomCmd.PersistentFlags().IntVarP(&maxHEX, "max", "m", 1, "Number of Colors")
}
