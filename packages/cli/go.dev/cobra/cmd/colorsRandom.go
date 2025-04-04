// Package cmd ...
package cmd

import (
	"fmt"
	"nothing-cli/utils"

	"github.com/spf13/cobra"
)

var maxHEX int

// colorsRandomCmd represents the colorsRandom command
var colorsRandomCmd = &cobra.Command{
	Use:   "random",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		utils.LogProgramName()
		for i := 0; i < maxHEX; i++ {
			newHEX := utils.GenerateRandomHexColor()
			r, g, b, err := utils.HexToRgb(newHEX)
			if err != nil {
				fmt.Println("Error:", err)
			}
			fmt.Printf("%s - rgb(%d, %d, %d)\n", newHEX, r, g, b)
		}
	},
}

func init() {
	colorsCmd.AddCommand(colorsRandomCmd)

	colorsRandomCmd.PersistentFlags().IntVarP(&maxHEX, "max", "m", 1, "Number of Colors")
}
