package engine

import (
	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/types"
	"github.com/hieudoanm/chess/core/utils"
)

const (
	pawnValue   = 100
	knightValue = 320
	bishopValue = 330
	rookValue   = 500
	queenValue  = 900
)

var pawnTable = [64]int32{
	0, 0, 0, 0, 0, 0, 0, 0,
	50, 50, 50, 50, 50, 50, 50, 50,
	10, 10, 20, 30, 30, 20, 10, 10,
	5, 5, 10, 27, 27, 10, 5, 5,
	0, 0, 0, 25, 25, 0, 0, 0,
	5, -5, -10, 0, 0, -10, -5, 5,
	5, 10, 10, -25, -25, 10, 10, 5,
	0, 0, 0, 0, 0, 0, 0, 0,
}

var knightTable = [64]int32{
	-50, -40, -30, -30, -30, -30, -40, -50,
	-40, -20, 0, 0, 0, 0, -20, -40,
	-30, 0, 10, 15, 15, 10, 0, -30,
	-30, 5, 15, 20, 20, 15, 5, -30,
	-30, 0, 15, 20, 20, 15, 0, -30,
	-30, 5, 10, 15, 15, 10, 5, -30,
	-40, -20, 0, 5, 5, 0, -20, -40,
	-50, -40, -30, -30, -30, -30, -40, -50,
}

var bishopTable = [64]int32{
	-20, -10, -10, -10, -10, -10, -10, -20,
	-10, 0, 0, 0, 0, 0, 0, -10,
	-10, 0, 5, 10, 10, 5, 0, -10,
	-10, 5, 5, 10, 10, 5, 5, -10,
	-10, 0, 10, 10, 10, 10, 0, -10,
	-10, 10, 10, 10, 10, 10, 10, -10,
	-10, 5, 0, 0, 0, 0, 5, -10,
	-20, -10, -10, -10, -10, -10, -10, -20,
}

var rookTable = [64]int32{
	0, 0, 0, 0, 0, 0, 0, 0,
	5, 10, 10, 10, 10, 10, 10, 5,
	-5, 0, 0, 0, 0, 0, 0, -5,
	-5, 0, 0, 0, 0, 0, 0, -5,
	-5, 0, 0, 0, 0, 0, 0, -5,
	-5, 0, 0, 0, 0, 0, 0, -5,
	-5, 0, 0, 0, 0, 0, 0, -5,
	0, 0, 0, 5, 5, 0, 0, 0,
}

var queenTable = [64]int32{
	-20, -10, -10, -5, -5, -10, -10, -20,
	-10, 0, 0, 0, 0, 0, 0, -10,
	-10, 0, 5, 5, 5, 5, 0, -10,
	-5, 0, 5, 5, 5, 5, 0, -5,
	0, 0, 5, 5, 5, 5, 0, -5,
	-10, 5, 5, 5, 5, 5, 0, -10,
	-10, 0, 5, 0, 0, 0, 0, -10,
	-20, -10, -10, -5, -5, -10, -10, -20,
}

var kingTable = [64]int32{
	-30, -40, -40, -50, -50, -40, -40, -30,
	-30, -40, -40, -50, -50, -40, -40, -30,
	-30, -40, -40, -50, -50, -40, -40, -30,
	-30, -40, -40, -50, -50, -40, -40, -30,
	-20, -30, -30, -40, -40, -30, -30, -20,
	-10, -20, -20, -20, -20, -20, -20, -10,
	20, 20, 0, 0, 0, 0, 20, 20,
	20, 30, 10, 0, 0, 10, 30, 20,
}

func pstFor(pt types.PieceType) *[64]int32 {
	switch pt {
	case types.Pawn:
		return &pawnTable
	case types.Knight:
		return &knightTable
	case types.Bishop:
		return &bishopTable
	case types.Rook:
		return &rookTable
	case types.Queen:
		return &queenTable
	case types.King:
		return &kingTable
	}
	return nil
}

func pieceVal(pt types.PieceType) int32 {
	switch pt {
	case types.Pawn:
		return pawnValue
	case types.Knight:
		return knightValue
	case types.Bishop:
		return bishopValue
	case types.Rook:
		return rookValue
	case types.Queen:
		return queenValue
	default:
		return 0
	}
}

func indexForColor(sq types.Square, color types.Color) types.Square {
	if color == types.White {
		return sq
	}
	return 63 - sq
}

func materialScore(b types.Board, color types.Color) int32 {
	var score int32
	for sq := 0; sq < 64; sq++ {
		if piece := b[sq]; piece != nil && piece.Color == color {
			score += pieceVal(piece.Type)
		}
	}
	return score
}

func pstScore(b types.Board, color types.Color) int32 {
	var score int32
	for sq := 0; sq < 64; sq++ {
		if piece := b[sq]; piece != nil && piece.Color == color {
			pst := pstFor(piece.Type)
			if pst != nil {
				score += pst[indexForColor(sq, color)]
			}
		}
	}
	return score
}

func doubledPawnPenalty(b types.Board, color types.Color) int32 {
	var penalty int32
	for f := 0; f < 8; f++ {
		var count int32
		for r := 0; r < 8; r++ {
			var sq types.Square
			if color == types.White {
				sq = utils.Square(r, f)
			} else {
				sq = utils.Square(7-r, f)
			}
			if piece := b[sq]; piece != nil && piece.Color == color && piece.Type == types.Pawn {
				count++
			}
		}
		if count > 1 {
			penalty += (count - 1) * 20
		}
	}
	return penalty
}

func isolatedPawnPenalty(b types.Board, color types.Color) int32 {
	var penalty int32
	for sq := 0; sq < 64; sq++ {
		piece := b[sq]
		if piece == nil || piece.Color != color || piece.Type != types.Pawn {
			continue
		}
		f := utils.FileOf(sq)
		hasNeighbor := false
		for r := 0; r < 8; r++ {
			for _, nf := range []int{f - 1, f + 1} {
				if nf < 0 || nf > 7 {
					continue
				}
				var nsq int
				if color == types.White {
					nsq = utils.Square(r, nf)
				} else {
					nsq = utils.Square(7-r, nf)
				}
				if np := b[nsq]; np != nil && np.Color == color && np.Type == types.Pawn {
					hasNeighbor = true
				}
			}
		}
		if !hasNeighbor {
			penalty += 20
		}
	}
	return penalty
}

func bishopPairBonus(b types.Board, color types.Color) int32 {
	var count int32
	for sq := 0; sq < 64; sq++ {
		if piece := b[sq]; piece != nil && piece.Color == color && piece.Type == types.Bishop {
			count++
		}
	}
	if count >= 2 {
		return 30
	}
	return 0
}

func passedPawnBonus(b types.Board, color types.Color) int32 {
	var bonus int32
	forward := int32(1)
	if color == types.Black {
		forward = -1
	}
	for sq := 0; sq < 64; sq++ {
		piece := b[sq]
		if piece == nil || piece.Color != color || piece.Type != types.Pawn {
			continue
		}
		f := int32(utils.FileOf(sq))
		r := int32(utils.RankOf(sq))
		passed := true
		for df := int32(-1); df <= 1; df++ {
			nf := f + df
			if nf < 0 || nf > 7 {
				continue
			}
			for dr := int32(1); dr <= 7; dr++ {
				nr := r + forward*dr
				if nr < 0 || nr > 7 {
					break
				}
				if p := b[utils.Square(int(nr), int(nf))]; p != nil && p.Type == types.Pawn && p.Color != color {
					passed = false
					break
				}
			}
			if !passed {
				break
			}
		}
		if passed {
			if color == types.White {
				bonus += r * 10
			} else {
				bonus += (7 - r) * 10
			}
		}
	}
	return bonus
}

func kingSafetyScore(b types.Board, color types.Color) int32 {
	kingSq, found := board.FindKing(b, color)
	if !found {
		return 0
	}
	kf := utils.FileOf(kingSq)
	kr := utils.RankOf(kingSq)
	if (color == types.White && kr != 0) || (color == types.Black && kr != 7) {
		return 0
	}
	var shieldRank int
	if color == types.White {
		shieldRank = 1
	} else {
		shieldRank = 6
	}
	var shield int32
	for df := -1; df <= 1; df++ {
		nf := kf + df
		if nf < 0 || nf > 7 {
			continue
		}
		if p := b[utils.Square(shieldRank, nf)]; p != nil && p.Color == color && p.Type == types.Pawn {
			shield += 15
		}
	}
	return shield
}

func rookOpenFileBonus(b types.Board, color types.Color) int32 {
	var bonus int32
	for sq := 0; sq < 64; sq++ {
		piece := b[sq]
		if piece == nil || piece.Color != color || piece.Type != types.Rook {
			continue
		}
		f := utils.FileOf(sq)
		var myPawn, anyPawn bool
		for r := 0; r < 8; r++ {
			if p := b[utils.Square(r, f)]; p != nil && p.Type == types.Pawn {
				anyPawn = true
				if p.Color == color {
					myPawn = true
				}
			}
		}
		if !anyPawn {
			bonus += 20
		} else if !myPawn {
			bonus += 10
		}
	}
	return bonus
}

func evaluate(b types.Board, color, opponent types.Color) int32 {
	myMaterial := materialScore(b, color)
	oppMaterial := materialScore(b, opponent)
	myPst := pstScore(b, color)
	oppPst := pstScore(b, opponent)
	myDoubled := doubledPawnPenalty(b, color)
	oppDoubled := doubledPawnPenalty(b, opponent)
	myIsolated := isolatedPawnPenalty(b, color)
	oppIsolated := isolatedPawnPenalty(b, opponent)
	myBishopPair := bishopPairBonus(b, color)
	oppBishopPair := bishopPairBonus(b, opponent)
	myPassed := passedPawnBonus(b, color)
	oppPassed := passedPawnBonus(b, opponent)
	myKingSafety := kingSafetyScore(b, color)
	oppKingSafety := kingSafetyScore(b, opponent)
	myRookOpen := rookOpenFileBonus(b, color)
	oppRookOpen := rookOpenFileBonus(b, opponent)

	return (myMaterial - oppMaterial) +
		(myPst - oppPst) -
		(myDoubled - oppDoubled) -
		(myIsolated - oppIsolated) +
		(myBishopPair - oppBishopPair) +
		(myPassed - oppPassed) +
		(myKingSafety - oppKingSafety) +
		(myRookOpen - oppRookOpen)
}

func EvaluateBoard(b types.Board, turn types.Color) int32 {
	opponent := turn.Opposite()
	return evaluate(b, turn, opponent)
}
