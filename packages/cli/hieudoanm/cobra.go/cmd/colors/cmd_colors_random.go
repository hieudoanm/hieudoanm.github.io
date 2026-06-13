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
		Short: "Run the random operation for the colors app",
		Long: `The random command is a specific utility to execute operations related to random within the colors application.

As a component of the design tools, this command empowers you to interact directly with colors's random features via the CLI.`,
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
