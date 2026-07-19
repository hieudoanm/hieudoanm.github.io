package moves

import (
	"github.com/hieudoanm/chess/core/attack"
	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/types"
	"github.com/hieudoanm/chess/core/utils"
)

func applyMoveToBoard(b *types.Board, move types.Move) {
	piece := board.GetPiece(*b, move.From)
	if piece == nil {
		return
	}

	board.RemovePiece(b, move.From)

	if move.Captured != nil {
		if move.To == move.From {
			return
		}
		board.RemovePiece(b, move.To)
	}

	if move.Promotion != "" {
		board.PutPiece(b, &types.Piece{Color: piece.Color, Type: move.Promotion}, move.To)
	} else {
		board.PutPiece(b, piece, move.To)
	}

	fileDiff := abs(utils.FileOf(move.To) - utils.FileOf(move.From))

	if piece.Type == types.King && fileDiff == 2 {
		var rookFrom, rookTo int
		if utils.FileOf(move.To) > utils.FileOf(move.From) {
			rookFrom = move.To + 1
			rookTo = move.To - 1
		} else {
			rookFrom = move.To - 2
			rookTo = move.To + 1
		}
		rook := board.GetPiece(*b, rookFrom)
		if rook != nil {
			board.RemovePiece(b, rookFrom)
			board.PutPiece(b, rook, rookTo)
		}
	}

	if piece.Type == types.Pawn && fileDiff != 0 && move.Captured == nil {
		epRank := utils.RankOf(move.From)
		epFile := utils.FileOf(move.To)
		board.RemovePiece(b, utils.Square(epRank, epFile))
	}
}

func ApplyMove(b *types.Board, move types.Move) {
	applyMoveToBoard(b, move)
}

func GeneratePawnMoves(b types.Board, sq types.Square, color types.Color, enPassant types.Square) []types.Move {
	var moves []types.Move
	dir := 1
	if color == types.Black {
		dir = -1
	}
	startRank := 1
	if color == types.Black {
		startRank = 6
	}
	promoRank := 7
	if color == types.Black {
		promoRank = 0
	}
	rank := utils.RankOf(sq)
	file := utils.FileOf(sq)

	f1 := utils.Square(rank+dir, file)
	if utils.IsValidSquare(f1) && b[f1] == nil {
		if rank+dir == promoRank {
			for _, p := range []types.PieceType{types.Queen, types.Rook, types.Bishop, types.Knight} {
				moves = append(moves, types.Move{From: sq, To: f1, Promotion: p, Captured: nil})
			}
		} else {
			moves = append(moves, types.Move{From: sq, To: f1, Promotion: "", Captured: nil})
		}

		if rank == startRank {
			f2 := utils.Square(rank+2*dir, file)
			if b[f2] == nil {
				moves = append(moves, types.Move{From: sq, To: f2, Promotion: "", Captured: nil})
			}
		}
	}

	for _, df := range [2]int{-1, 1} {
		f := file + df
		if f < 0 || f > 7 {
			continue
		}
		to := utils.Square(rank+dir, f)
		if !utils.IsValidSquare(to) {
			continue
		}

		target := b[to]
		if target != nil && target.Color != color {
			if rank+dir == promoRank {
				for _, p := range []types.PieceType{types.Queen, types.Rook, types.Bishop, types.Knight} {
					moves = append(moves, types.Move{From: sq, To: to, Promotion: p, Captured: target})
				}
			} else {
				moves = append(moves, types.Move{From: sq, To: to, Promotion: "", Captured: target})
			}
		}

		if to == enPassant {
			captured := b[utils.Square(rank, f)]
			moves = append(moves, types.Move{From: sq, To: to, Promotion: "", Captured: captured})
		}
	}

	return moves
}

func GenerateKnightMoves(b types.Board, sq types.Square, color types.Color) []types.Move {
	var moves []types.Move
	offsets := [8]int{-17, -15, -10, -6, 6, 10, 15, 17}
	rank := utils.RankOf(sq)
	file := utils.FileOf(sq)

	for _, offset := range offsets {
		to := sq + offset
		if !utils.IsValidSquare(to) {
			continue
		}
		rDiff := abs(utils.RankOf(to) - rank)
		fDiff := abs(utils.FileOf(to) - file)
		if (rDiff != 2 || fDiff != 1) && (rDiff != 1 || fDiff != 2) {
			continue
		}
		target := b[to]
		if target != nil && target.Color == color {
			continue
		}
		moves = append(moves, types.Move{From: sq, To: to, Promotion: "", Captured: target})
	}

	return moves
}

func GenerateSlidingMoves(b types.Board, sq types.Square, color types.Color, directions []int) []types.Move {
	var moves []types.Move
	rank := utils.RankOf(sq)
	file := utils.FileOf(sq)

	for _, dir := range directions {
		to := sq + dir
		for utils.IsValidSquare(to) {
			rDiff := abs(utils.RankOf(to) - rank)
			fDiff := abs(utils.FileOf(to) - file)
			if dir == -8 || dir == 8 {
				if fDiff != 0 {
					break
				}
			} else if dir == -1 || dir == 1 {
				if rDiff != 0 {
					break
				}
			} else {
				if rDiff != fDiff {
					break
				}
			}

			target := b[to]
			if target != nil {
				if target.Color != color {
					moves = append(moves, types.Move{From: sq, To: to, Promotion: "", Captured: target})
				}
				break
			}
			moves = append(moves, types.Move{From: sq, To: to, Promotion: "", Captured: nil})
			to += dir
		}
	}

	return moves
}

func GenerateKingMoves(b types.Board, sq types.Square, color types.Color, castlingRights types.CastlingRights) []types.Move {
	var moves []types.Move
	offsets := [8]int{-9, -7, -8, -1, 1, 7, 8, 9}
	rank := utils.RankOf(sq)
	file := utils.FileOf(sq)

	for _, offset := range offsets {
		to := sq + offset
		if !utils.IsValidSquare(to) {
			continue
		}
		rDiff := abs(utils.RankOf(to) - rank)
		fDiff := abs(utils.FileOf(to) - file)
		if rDiff > 1 || fDiff > 1 {
			continue
		}
		target := b[to]
		if target != nil && target.Color == color {
			continue
		}
		moves = append(moves, types.Move{From: sq, To: to, Promotion: "", Captured: target})
	}

	opponent := color.Opposite()
	var startRank int
	var castlingKey, castlingQueenKey bool
		if color == types.White {
		startRank = 0
		castlingKey = castlingRights.WK
		castlingQueenKey = castlingRights.WQ
	} else {
		startRank = 7
		castlingKey = castlingRights.BK
		castlingQueenKey = castlingRights.BQ
	}

	if castlingKey {
		kingDest := utils.Square(startRank, 6)
		rookSq := utils.Square(startRank, 7)
		rook := b[rookSq]
		if rook != nil && rook.Type == types.Rook && rook.Color == color &&
			b[utils.Square(startRank, 5)] == nil &&
			b[utils.Square(startRank, 6)] == nil &&
			!attack.IsSquareAttacked(b, sq, opponent) &&
			!attack.IsSquareAttacked(b, utils.Square(startRank, 5), opponent) &&
			!attack.IsSquareAttacked(b, utils.Square(startRank, 6), opponent) {
			moves = append(moves, types.Move{From: sq, To: kingDest, Promotion: "", Captured: nil})
		}
	}

	if castlingQueenKey {
		kingDest := utils.Square(startRank, 2)
		rookSq := utils.Square(startRank, 0)
		rook := b[rookSq]
		if rook != nil && rook.Type == types.Rook && rook.Color == color &&
			b[utils.Square(startRank, 1)] == nil &&
			b[utils.Square(startRank, 2)] == nil &&
			b[utils.Square(startRank, 3)] == nil &&
			!attack.IsSquareAttacked(b, sq, opponent) &&
			!attack.IsSquareAttacked(b, utils.Square(startRank, 3), opponent) &&
			!attack.IsSquareAttacked(b, utils.Square(startRank, 2), opponent) {
			moves = append(moves, types.Move{From: sq, To: kingDest, Promotion: "", Captured: nil})
		}
	}

	return moves
}

func GeneratePseudoLegalMoves(b types.Board, turn types.Color, castlingRights types.CastlingRights, enPassant types.Square) []types.Move {
	var moves []types.Move
	for sq := 0; sq < 64; sq++ {
		piece := b[sq]
		if piece == nil || piece.Color != turn {
			continue
		}

		switch piece.Type {
		case types.Pawn:
			moves = append(moves, GeneratePawnMoves(b, sq, turn, enPassant)...)
		case types.Knight:
			moves = append(moves, GenerateKnightMoves(b, sq, turn)...)
		case types.Bishop:
			moves = append(moves, GenerateSlidingMoves(b, sq, turn, []int{-9, -7, 7, 9})...)
		case types.Rook:
			moves = append(moves, GenerateSlidingMoves(b, sq, turn, []int{-8, -1, 1, 8})...)
		case types.Queen:
			moves = append(moves, GenerateSlidingMoves(b, sq, turn, []int{-9, -7, -8, -1, 1, 7, 8, 9})...)
		case types.King:
			moves = append(moves, GenerateKingMoves(b, sq, turn, castlingRights)...)
		}
	}
	return moves
}

func LegalMoves(b types.Board, turn types.Color, castlingRights types.CastlingRights, enPassant types.Square) []types.Move {
	pseudo := GeneratePseudoLegalMoves(b, turn, castlingRights, enPassant)
	opponent := turn.Opposite()

	var legal []types.Move
	for _, move := range pseudo {
		testBoard := board.CloneBoard(b)
		ApplyMove(&testBoard, move)
		kingSq, found := board.FindKing(testBoard, turn)
		if !found {
			continue
		}
		_, opponentKingFound := board.FindKing(testBoard, opponent)
		if !opponentKingFound {
			continue
		}
		if !attack.IsSquareAttacked(testBoard, kingSq, opponent) {
			legal = append(legal, move)
		}
	}
	return legal
}

func abs(n int) int {
	if n < 0 {
		return -n
	}
	return n
}
