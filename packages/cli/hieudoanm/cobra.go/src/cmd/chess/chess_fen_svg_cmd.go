/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package chess

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/notnil/chess"
	"github.com/spf13/cobra"
)

func newFen2svgCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "svg",
		Short: "Render a FEN position as an SVG board image",
		Long:  `Generate an SVG image of a chess board from a FEN string, with standard light/dark square colors.`,
		Example: `  chess fen svg --fen "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  chess fen svg --fen "..." --out board.svg`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			fenStr, _ := cmd.Flags().GetString("fen")
			outputFile, _ := cmd.Flags().GetString("out")

			if fenStr == "" {
				return fmt.Errorf("❌ you must provide a FEN string using --fen")
			}
			if outputFile == "" {
				outputFile = "board.svg"
			}

			game := chess.NewGame()
			opt, err := chess.FEN(fenStr)
			if err != nil {
				return fmt.Errorf("❌ failed to parse PGN: %w", err)
			}
			opt(game)

			board := game.Position().Board()
			svg := renderBoardSVG(board)

			if err := os.WriteFile(outputFile, []byte(svg), 0644); err != nil {
				return fmt.Errorf("❌ failed to write SVG: %w", err)
			}

			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"output": outputFile,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Println("✅ SVG saved to", outputFile)
			}
			return nil
		},
	}

	cmd.Flags().String("fen", "", "FEN string to render")
	cmd.Flags().String("out", "", "Output SVG file (default: board.svg)")

	return cmd
}

func renderBoardSVG(board *chess.Board) string {
	const squareSize = 60
	const boardSize = squareSize * 8
	svg := fmt.Sprintf(`<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d">`, boardSize, boardSize)

	// Draw squares
	for rank := 0; rank < 8; rank++ {
		for file := 0; file < 8; file++ {
			x := file * squareSize
			y := (7 - rank) * squareSize
			color := "#b58863" // dark
			if (rank+file)%2 == 1 {
				color = "#f0d9b5" // light
			}
			svg += fmt.Sprintf(`<rect x="%d" y="%d" width="%d" height="%d" fill="%s"/>`, x, y, squareSize, squareSize, color)
		}
	}

	svg += `</svg>`
	return svg
}
