package utils

import "github.com/hieudoanm/chess/core/types"

const Files = "abcdefgh"

func RankOf(sq types.Square) int {
	return sq / 8
}

func FileOf(sq types.Square) int {
	return sq % 8
}

func Square(rank, file int) types.Square {
	return rank*8 + file
}

func IsValidSquare(sq int) bool {
	return sq >= 0 && sq < 64
}

func SquareName(sq types.Square) string {
	return string(Files[FileOf(sq)]) + string(rune('0'+RankOf(sq)+1))
}

func ParseSquare(name string) (types.Square, bool) {
	if len(name) < 2 {
		return 0, false
	}
	file := -1
	for i, c := range Files {
		if c == rune(name[0]) || c == rune(name[0])-32 {
			file = i
			break
		}
	}
	if name[1] < '1' || name[1] > '8' {
		return 0, false
	}
	rank := int(name[1]-'0') - 1
	if file == -1 || rank < 0 || rank > 7 {
		return 0, false
	}
	return Square(rank, file), true
}

func SquareColor(sq types.Square) string {
	if (RankOf(sq)+FileOf(sq))%2 == 0 {
		return "dark"
	}
	return "light"
}
