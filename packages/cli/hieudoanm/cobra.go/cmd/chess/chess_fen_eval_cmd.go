package chess

import (
	"encoding/json"
	"fmt"
	"net/url"

	"github.com/hieudoanm/hieudoanm/libs/number"
	"github.com/hieudoanm/hieudoanm/libs/requests"

	"github.com/spf13/cobra"
)

/* ----------------------------- Models ----------------------------- */

type CloudEvalPV struct {
	Moves string `json:"moves"`
	CP    int    `json:"cp"`
}

type CloudEvalResponse struct {
	FEN    string        `json:"fen"`
	Depth  int           `json:"depth"`
	KNodes int           `json:"knodes"`
	PVs    []CloudEvalPV `json:"pvs"`
}

/* ----------------------------- Command ----------------------------- */

func newFenEvalCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "eval",
		Short: "Evaluate a FEN position using Lichess cloud eval",
		Long:  `Fetch a cloud-based evaluation for a FEN position from Lichess, returning centipawn scores and principal variations.`,
		Example: `  chess fen eval --fen "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  chess fen eval --fen "..." --multipv 5`,
		RunE: func(cmd *cobra.Command, args []string) error {
			fen, _ := cmd.Flags().GetString("fen")
			multiPv, _ := cmd.Flags().GetInt("multipv")

			if fen == "" {
				return fmt.Errorf("--fen is required")
			}

			if multiPv <= 0 {
				multiPv = 1
			}

			apiURL := fmt.Sprintf(
				"https://lichess.org/api/cloud-eval?fen=%s&multiPv=%d&variant=standard",
				url.QueryEscape(fen),
				multiPv,
			)

			body, err := requests.Get(apiURL, requests.Options{})
			if err != nil {
				return fmt.Errorf("failed to fetch evaluation: %w", err)
			}

			var eval CloudEvalResponse
			if err := json.Unmarshal(body, &eval); err != nil {
				return fmt.Errorf("failed to parse evaluation: %w", err)
			}

			// ---- output ----
			fmt.Println()
			fmt.Println("♞ lichess.org Cloud Evaluation")
			fmt.Println("------------------------------------------------")
			fmt.Printf("Depth : %d\n", eval.Depth)
			fmt.Printf("Nodes : %s\n", number.Comma(eval.KNodes))
			fmt.Println()

			for i, pv := range eval.PVs {
				fmt.Printf(
					"#%d  %+0.2f  %s\n",
					i+1,
					float64(pv.CP)/100.0,
					pv.Moves,
				)
			}

			return nil
		},
	}

	cmd.Flags().String(
		"fen",
		"",
		"FEN string to evaluate (required)",
	)

	cmd.Flags().Int(
		"multipv",
		3,
		"Number of principal variations",
	)

	return cmd
}
