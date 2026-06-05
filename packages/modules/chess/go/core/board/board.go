package board

import (
	"strings"

	"github.com/hieudoanm/chess/core/types"
	"github.com/hieudoanm/chess/core/utils"
)

func EmptyBoard() types.Board {
	return types.Board{}
}

func CloneBoard(b types.Board) types.Board {
	return b
}

func PutPiece(b types.Board, piece *types.Piece, sq types.Square) {
	b[sq] = piece
}

func GetPiece(b types.Board, sq types.Square) *types.Piece {
	return b[sq]
}

func RemovePiece(b types.Board, sq types.Square) {
	b[sq] = nil
}

func FindKing(b types.Board, color types.Color) (types.Square, bool) {
	for sq := 0; sq < 64; sq++ {
		p := b[sq]
		if p != nil && p.Color == color && p.Type == types.King {
			return sq, true
		}
	}
	return 0, false
}

func pieceFromChar(ch byte) *types.Piece {
	var pieceType types.PieceType
	switch {
	case ch == 'p' || ch == 'P':
		pieceType = types.Pawn
	case ch == 'n' || ch == 'N':
		pieceType = types.Knight
	case ch == 'b' || ch == 'B':
		pieceType = types.Bishop
	case ch == 'r' || ch == 'R':
		pieceType = types.Rook
	case ch == 'q' || ch == 'Q':
		pieceType = types.Queen
	case ch == 'k' || ch == 'K':
		pieceType = types.King
	default:
		return nil
	}
	color := types.Black
	if ch < 'a' {
		color = types.White
	}
	return &types.Piece{Color: color, Type: pieceType}
}

func BoardFromFen(boardPart string) types.Board {
	b := EmptyBoard()
	rows := strings.Split(boardPart, "/")
	for r := 0; r < 8; r++ {
		row := rows[r]
		f := 0
		for i := 0; i < len(row); i++ {
			ch := row[i]
			if ch >= '1' && ch <= '8' {
				f += int(ch - '0')
			} else {
				piece := pieceFromChar(ch)
				if piece != nil {
					b[utils.Square(7-r, f)] = piece
				}
				f++
			}
		}
	}
	return b
}

func BoardToFen(b types.Board) string {
	var sb strings.Builder
	for r := 7; r >= 0; r-- {
		empty := 0
		for f := 0; f < 8; f++ {
			piece := b[utils.Square(r, f)]
			if piece != nil {
				if empty > 0 {
					sb.WriteByte(byte('0' + empty))
					empty = 0
				}
				if piece.Color == types.White {
					sb.WriteByte(byte(piece.Type[0] - 32))
				} else {
					sb.WriteByte(byte(piece.Type[0]))
				}
			} else {
				empty++
			}
		}
		if empty > 0 {
			sb.WriteByte(byte('0' + empty))
		}
		if r > 0 {
			sb.WriteByte('/')
		}
	}
	return sb.String()
}

var PieceValues = map[types.PieceType]int{
	types.Pawn:   100,
	types.Knight: 320,
	types.Bishop: 330,
	types.Rook:   500,
	types.Queen:  900,
	types.King:   20000,
}

var PieceUnicode = map[string]string{
	"K": "\u2654",
	"Q": "\u2655",
	"R": "\u2656",
	"B": "\u2657",
	"N": "\u2658",
	"P": "\u2659",
	"k": "\u265A",
	"q": "\u265B",
	"r": "\u265C",
	"b": "\u265D",
	"n": "\u265E",
	"p": "\u265F",
}
