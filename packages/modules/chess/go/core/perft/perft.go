package perft

import (
	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/moves"
	"github.com/hieudoanm/chess/core/types"
	"github.com/hieudoanm/chess/core/utils"
)

func Perft(state types.GameState, depth int) int {
	if depth == 0 {
		return 1
	}

	movesList := moves.LegalMoves(state.Board, state.Turn, state.CastlingRights, state.EnPassant)

	if depth == 1 {
		return len(movesList)
	}

	count := 0

	for _, move := range movesList {
		newBoard := board.CloneBoard(state.Board)
		moves.ApplyMove(&newBoard, move)

		newTurn := state.Turn.Opposite()

		nextRights := state.CastlingRights
		if move.From == 4 || move.To == 4 {
			nextRights.WK = false
			nextRights.WQ = false
		}
		if move.From == 60 || move.To == 60 {
			nextRights.WK = false
			nextRights.WQ = false
		}
		if move.From == 7 || move.To == 7 {
			nextRights.WK = false
		}
		if move.From == 0 || move.To == 0 {
			nextRights.WQ = false
		}
		if move.From == 63 || move.To == 63 {
			nextRights.BK = false
		}
		if move.From == 56 || move.To == 56 {
			nextRights.BQ = false
		}

		piece := state.Board[move.From]
		if piece != nil {
			if piece.Type == types.King {
				if piece.Color == types.White {
					nextRights.WK = false
					nextRights.WQ = false
				} else {
					nextRights.BK = false
					nextRights.BQ = false
				}
			}
			if piece.Type == types.Rook {
				if move.From == 7 {
					nextRights.WK = false
				}
				if move.From == 0 {
					nextRights.WQ = false
				}
				if move.From == 63 {
					nextRights.BK = false
				}
				if move.From == 56 {
					nextRights.BQ = false
				}
			}
		}

		fromRank := utils.RankOf(move.From)
		toRank := utils.RankOf(move.To)
		toFile := utils.FileOf(move.To)

		nextEnPassant := types.NoSquare
		if piece != nil && piece.Type == types.Pawn && abs(toRank-fromRank) == 2 {
			nextEnPassant = utils.Square((fromRank+toRank)/2, toFile)
		}

		nextState := types.GameState{
			Board:          newBoard,
			Turn:           newTurn,
			CastlingRights: nextRights,
			EnPassant:      nextEnPassant,
			HalfMoveClock:  0,
			FullMoveNumber: 1,
			History:        nil,
			Status:         types.StatusPlaying,
			Result:         types.ResultOngoing,
			InCheck:        false,
		}

		count += Perft(nextState, depth-1)
	}

	return count
}

func Divide(state types.GameState, depth int) map[string]int {
	result := make(map[string]int)
	movesList := moves.LegalMoves(state.Board, state.Turn, state.CastlingRights, state.EnPassant)

	for _, move := range movesList {
		uci := notationMoveToUCI(move)

		newBoard := board.CloneBoard(state.Board)
		moves.ApplyMove(&newBoard, move)

		newTurn := state.Turn.Opposite()

		nextRights := state.CastlingRights
		if move.From == 4 || move.To == 4 {
			nextRights.WK = false
			nextRights.WQ = false
		}
		if move.From == 60 || move.To == 60 {
			nextRights.WK = false
			nextRights.WQ = false
		}
		if move.From == 7 || move.To == 7 {
			nextRights.WK = false
		}
		if move.From == 0 || move.To == 0 {
			nextRights.WQ = false
		}
		if move.From == 63 || move.To == 63 {
			nextRights.BK = false
		}
		if move.From == 56 || move.To == 56 {
			nextRights.BQ = false
		}

		piece := state.Board[move.From]
		if piece != nil {
			if piece.Type == types.King {
				if piece.Color == types.White {
					nextRights.WK = false
					nextRights.WQ = false
				} else {
					nextRights.BK = false
					nextRights.BQ = false
				}
			}
			if piece.Type == types.Rook {
				if move.From == 7 {
					nextRights.WK = false
				}
				if move.From == 0 {
					nextRights.WQ = false
				}
				if move.From == 63 {
					nextRights.BK = false
				}
				if move.From == 56 {
					nextRights.BQ = false
				}
			}
		}

		fromRank := utils.RankOf(move.From)
		toRank := utils.RankOf(move.To)
		toFile := utils.FileOf(move.To)

		nextEnPassant := types.NoSquare
		if piece != nil && piece.Type == types.Pawn && abs(toRank-fromRank) == 2 {
			nextEnPassant = utils.Square((fromRank+toRank)/2, toFile)
		}

		nextState := types.GameState{
			Board:          newBoard,
			Turn:           newTurn,
			CastlingRights: nextRights,
			EnPassant:      nextEnPassant,
			HalfMoveClock:  0,
			FullMoveNumber: 1,
			History:        nil,
			Status:         types.StatusPlaying,
			Result:         types.ResultOngoing,
			InCheck:        false,
		}

		if depth > 1 {
			result[uci] = Perft(nextState, depth-1)
		} else {
			result[uci] = 1
		}
	}

	return result
}

func notationMoveToUCI(move types.Move) string {
	return utils.SquareName(move.From) + utils.SquareName(move.To) + string(move.Promotion)
}

func abs(n int) int {
	if n < 0 {
		return -n
	}
	return n
}
