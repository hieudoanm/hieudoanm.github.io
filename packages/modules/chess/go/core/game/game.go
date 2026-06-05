package game

import (
	"github.com/hieudoanm/chess/core/attack"
	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/moves"
	"github.com/hieudoanm/chess/core/notation"
	"github.com/hieudoanm/chess/core/types"
	"github.com/hieudoanm/chess/core/utils"
)

const StartingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

func CreateGame(fen string) types.GameState {
	if fen == "" {
		fen = StartingFEN
	}
	state := notation.ParseFEN(fen)
	state.Status = types.StatusPlaying
	state.Result = types.ResultOngoing
	return state
}

func hasInsufficientMaterial(b types.Board) bool {
	var pieces []*types.Piece
	var squares []types.Square
	for sq := 0; sq < 64; sq++ {
		p := b[sq]
		if p != nil {
			pieces = append(pieces, p)
			squares = append(squares, sq)
		}
	}

	if len(pieces) == 2 {
		return true
	}

	if len(pieces) == 3 {
		for _, p := range pieces {
			if p.Type != types.King {
				if p.Type == types.Bishop || p.Type == types.Knight {
					return true
				}
			}
		}
	}

	if len(pieces) == 4 {
		var bishops []*types.Piece
		var bishopIdx []int
		for i, p := range pieces {
			if p.Type == types.Bishop {
				bishops = append(bishops, p)
				bishopIdx = append(bishopIdx, i)
			}
		}
		if len(bishops) == 2 {
			sq0 := squares[bishopIdx[0]]
			sq1 := squares[bishopIdx[1]]
			color0 := (utils.RankOf(sq0) + utils.FileOf(sq0)) % 2
			color1 := (utils.RankOf(sq1) + utils.FileOf(sq1)) % 2
			if color0 == color1 {
				return true
			}
		}
	}

	return false
}

func updateCastlingRights(cr types.CastlingRights, move types.Move, b types.Board) types.CastlingRights {
	newRights := cr

	if move.From == 4 || move.To == 4 {
		newRights.WK = false
		newRights.WQ = false
	}
	if move.From == 60 || move.To == 60 {
		newRights.WK = false
		newRights.WQ = false
	}
	if move.From == 7 || move.To == 7 {
		newRights.WK = false
	}
	if move.From == 0 || move.To == 0 {
		newRights.WQ = false
	}
	if move.From == 63 || move.To == 63 {
		newRights.BK = false
	}
	if move.From == 56 || move.To == 56 {
		newRights.BQ = false
	}

	piece := b[move.From]
	if piece != nil {
		if piece.Type == types.King {
			if piece.Color == types.White {
				newRights.WK = false
				newRights.WQ = false
			} else {
				newRights.BK = false
				newRights.BQ = false
			}
		}
		if piece.Type == types.Rook {
			if move.From == 7 {
				newRights.WK = false
			}
			if move.From == 0 {
				newRights.WQ = false
			}
			if move.From == 63 {
				newRights.BK = false
			}
			if move.From == 56 {
				newRights.BQ = false
			}
		}
	}

	return newRights
}

func MakeMove(state types.GameState, move types.Move) types.GameState {
	newBoard := board.CloneBoard(state.Board)
	piece := state.Board[move.From]

	moves.ApplyMove(newBoard, move)

	var capturedPiece *types.Piece
	if move.Captured != nil {
		capturedPiece = move.Captured
	}

	newEnPassant := types.NoSquare
	if piece != nil && piece.Type == types.Pawn && abs(utils.RankOf(move.To)-utils.RankOf(move.From)) == 2 {
		newEnPassant = utils.Square((utils.RankOf(move.From)+utils.RankOf(move.To))/2, utils.FileOf(move.From))
	}

	newCastlingRights := updateCastlingRights(state.CastlingRights, move, state.Board)

	halfMoveClock := state.HalfMoveClock + 1
	if piece != nil && (piece.Type == types.Pawn || capturedPiece != nil) {
		halfMoveClock = 0
	}

	newTurn := state.Turn.Opposite()
	fullMoveNumber := state.FullMoveNumber
	if state.Turn == types.Black {
		fullMoveNumber++
	}

	stateBeforeFen := notation.StringifyFEN(state)

	newState := types.GameState{
		Board:          newBoard,
		Turn:           newTurn,
		CastlingRights: newCastlingRights,
		EnPassant:      newEnPassant,
		HalfMoveClock:  halfMoveClock,
		FullMoveNumber: fullMoveNumber,
		History:        append(state.History, types.HistoryEntry{Move: move, StateBefore: stateBeforeFen}),
		Status:         types.StatusPlaying,
		Result:         types.ResultOngoing,
		InCheck:        false,
	}

	newState.InCheck = attack.IsInCheck(newBoard, newTurn)

	movesList := moves.LegalMoves(newBoard, newTurn, newCastlingRights, newEnPassant)

	if len(movesList) == 0 {
		if newState.InCheck {
			newState.Status = types.StatusCheckmate
			if newTurn == types.White {
				newState.Result = types.ResultBlackWins
			} else {
				newState.Result = types.ResultWhiteWins
			}
		} else {
			newState.Status = types.StatusStalemate
			newState.Result = types.ResultDraw
		}
	} else if newState.HalfMoveClock >= 100 {
		newState.Status = types.StatusDraw
		newState.Result = types.ResultDraw
	} else if hasInsufficientMaterial(newBoard) {
		newState.Status = types.StatusDraw
		newState.Result = types.ResultDraw
	}

	return newState
}

func UndoMove(state types.GameState) types.GameState {
	if len(state.History) == 0 {
		return state
	}
	prev := state.History[len(state.History)-1]
	return notation.ParseFEN(prev.StateBefore)
}

func GetStatusMessage(state types.GameState) string {
	switch state.Status {
	case types.StatusCheckmate:
		if state.Turn == types.White {
			return "Checkmate! Black wins."
		}
		return "Checkmate! White wins."
	case types.StatusStalemate:
		return "Stalemate — draw."
	case types.StatusDraw:
		return "Draw."
	default:
		if state.InCheck {
			return "Check!"
		}
		return "Playing."
	}
}

func abs(n int) int {
	if n < 0 {
		return -n
	}
	return n
}
