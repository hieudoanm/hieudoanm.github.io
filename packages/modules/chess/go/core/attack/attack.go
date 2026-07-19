package attack

import (
	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/types"
	"github.com/hieudoanm/chess/core/utils"
)

func IsSquareAttacked(b types.Board, sq types.Square, byColor types.Color) bool {
	rank := utils.RankOf(sq)
	file := utils.FileOf(sq)

	knightOffsets := [8]int{-17, -15, -10, -6, 6, 10, 15, 17}
	for _, offset := range knightOffsets {
		target := sq + offset
		if !utils.IsValidSquare(target) {
			continue
		}
		rDiff := abs(utils.RankOf(target) - rank)
		fDiff := abs(utils.FileOf(target) - file)
		if (rDiff == 2 && fDiff == 1) || (rDiff == 1 && fDiff == 2) {
			p := b[target]
			if p != nil && p.Color == byColor && p.Type == types.Knight {
				return true
			}
		}
	}

	for _, df := range [2]int{-1, 1} {
		target := utils.Square(rank-1, file+df)
		if byColor == types.Black {
			target = utils.Square(rank+1, file+df)
		}
		if utils.IsValidSquare(target) {
			p := b[target]
			if p != nil && p.Color == byColor && p.Type == types.Pawn {
				return true
			}
		}
	}

	kingOffsets := [8]int{-9, -7, -8, -1, 1, 7, 8, 9}
	for _, offset := range kingOffsets {
		target := sq + offset
		if !utils.IsValidSquare(target) {
			continue
		}
		rDiff := abs(utils.RankOf(target) - rank)
		fDiff := abs(utils.FileOf(target) - file)
		if rDiff <= 1 && fDiff <= 1 {
			p := b[target]
			if p != nil && p.Color == byColor && p.Type == types.King {
				return true
			}
		}
	}

	diagonalDirs := [4]int{-9, -7, 7, 9}
	for _, dir := range diagonalDirs {
		target := sq + dir
		for utils.IsValidSquare(target) {
			rDiff := abs(utils.RankOf(target) - rank)
			fDiff := abs(utils.FileOf(target) - file)
			if rDiff != fDiff {
				break
			}
			p := b[target]
			if p != nil {
				if p.Color == byColor && (p.Type == types.Bishop || p.Type == types.Queen) {
					return true
				}
				break
			}
			target += dir
		}
	}

	orthogonalDirs := [4]int{-8, -1, 1, 8}
	for _, dir := range orthogonalDirs {
		target := sq + dir
		for utils.IsValidSquare(target) {
			rDiff := abs(utils.RankOf(target) - rank)
			fDiff := abs(utils.FileOf(target) - file)
			if fDiff > 0 && rDiff > 0 {
				break
			}
			p := b[target]
			if p != nil {
				if p.Color == byColor && (p.Type == types.Rook || p.Type == types.Queen) {
					return true
				}
				break
			}
			target += dir
		}
	}

	return false
}

func IsInCheck(b types.Board, color types.Color) bool {
	kingSq, found := board.FindKing(b, color)
	if !found {
		return false
	}
	opponent := color.Opposite()
	return IsSquareAttacked(b, kingSq, opponent)
}

func abs(n int) int {
	if n < 0 {
		return -n
	}
	return n
}
