package fen

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/chess/lichess.org"
	"github.com/hieudoanm/jack/src/libs/number"
	"github.com/spf13/cobra"
)

func newEvalCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "eval",
		Short: "Evaluate a FEN position using Lichess cloud eval",
		Long:  `Fetch a cloud-based evaluation for a FEN position from Lichess, returning centipawn scores and principal variations.`,
		Example: `  chess fen eval --fen "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  chess fen eval --fen "..." --multipv 5`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")
			fen, _ := cmd.Flags().GetString("fen")
			multiPv, _ := cmd.Flags().GetInt("multipv")

			if fen == "" {
				return fmt.Errorf("--fen is required")
			}
			if multiPv <= 0 {
				multiPv = 1
			}

			eval, err := lichess.CloudEvalAPI(fen, multiPv, "standard")
			if err != nil {
				return fmt.Errorf("failed to fetch evaluation: %w", err)
			}

			if jsonOutput {
				type pvJSON struct {
					Moves string `json:"moves"`
					Cp    int    `json:"cp"`
				}
				var pvs []pvJSON
				for _, pv := range eval.PVs {
					cp := 0
					if pv.Cp != nil {
						cp = *pv.Cp
					}
					pvs = append(pvs, pvJSON{Moves: pv.Moves, Cp: cp})
				}
				b, _ := json.MarshalIndent(map[string]interface{}{
					"fen":   eval.FEN,
					"depth": eval.Depth,
					"nodes": eval.KNodes,
					"pvs":   pvs,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Println()
				fmt.Println("♞ lichess.org Cloud Evaluation")
				fmt.Println("------------------------------------------------")
				fmt.Printf("Depth : %d\n", eval.Depth)
				fmt.Printf("Nodes : %s\n", number.Comma(eval.KNodes))
				fmt.Println()

				for i, pv := range eval.PVs {
					cp := 0
					if pv.Cp != nil {
						cp = *pv.Cp
					}
					fmt.Printf(
						"#%d  %+0.2f  %s\n",
						i+1,
						float64(cp)/100.0,
						pv.Moves,
					)
				}
			}

			return nil
		},
	}

	cmd.Flags().String("fen", "", "FEN string to evaluate (required)")
	cmd.Flags().Int("multipv", 3, "Number of principal variations")

	return cmd
}
