package notation

import (
	"strconv"
	"strings"

	"github.com/hieudoanm/chess/core/attack"
	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/moves"
	"github.com/hieudoanm/chess/core/types"
	"github.com/hieudoanm/chess/core/utils"
)

func ParseFEN(fen string) types.GameState {
	parts := strings.Split(fen, " ")

	b := board.BoardFromFen(parts[0])

	turn := types.White
	if parts[1] == "b" {
		turn = types.Black
	}

	castlingRights := types.CastlingRights{}
	if parts[2] != "-" {
		for _, ch := range parts[2] {
			switch ch {
			case 'K':
				castlingRights.WK = true
			case 'Q':
				castlingRights.WQ = true
			case 'k':
				castlingRights.BK = true
			case 'q':
				castlingRights.BQ = true
			}
		}
	}

	enPassant := types.NoSquare
	if parts[3] != "-" {
		if sq, ok := utils.ParseSquare(parts[3]); ok {
			enPassant = sq
		}
	}

	halfMoveClock, _ := strconv.Atoi(parts[4])
	fullMoveNumber, _ := strconv.Atoi(parts[5])
	if fullMoveNumber < 1 {
		fullMoveNumber = 1
	}

	inCheck := attack.IsInCheck(b, turn)

	return types.GameState{
		Board:          b,
		Turn:           turn,
		CastlingRights: castlingRights,
		EnPassant:      enPassant,
		HalfMoveClock:  halfMoveClock,
		FullMoveNumber: fullMoveNumber,
		History:        nil,
		Status:         types.StatusPlaying,
		Result:         types.ResultOngoing,
		InCheck:        inCheck,
	}
}

func StringifyFEN(state types.GameState) string {
	fen := board.BoardToFen(state.Board)

	castling := ""
	if state.CastlingRights.WK {
		castling += "K"
	}
	if state.CastlingRights.WQ {
		castling += "Q"
	}
	if state.CastlingRights.BK {
		castling += "k"
	}
	if state.CastlingRights.BQ {
		castling += "q"
	}
	if castling == "" {
		castling = "-"
	}

	ep := "-"
	if state.EnPassant != types.NoSquare {
		ep = utils.SquareName(state.EnPassant)
	}

	return fen + " " + string(state.Turn) + " " + castling + " " + ep + " " +
		strconv.Itoa(state.HalfMoveClock) + " " + strconv.Itoa(state.FullMoveNumber)
}

var pieceLetter = map[types.PieceType]string{
	types.Pawn:   "",
	types.Knight: "N",
	types.Bishop: "B",
	types.Rook:   "R",
	types.Queen:  "Q",
	types.King:   "K",
}

func MoveToUCI(move types.Move) string {
	return utils.SquareName(move.From) + utils.SquareName(move.To) + string(move.Promotion)
}

func ParseUCI(uci string) *types.Move {
	if len(uci) < 4 {
		return nil
	}
	from, ok := utils.ParseSquare(uci[:2])
	if !ok {
		return nil
	}
	to, ok := utils.ParseSquare(uci[2:4])
	if !ok {
		return nil
	}
	var promotion types.PieceType
	if len(uci) >= 5 {
		switch uci[4] {
		case 'q', 'r', 'b', 'n':
			promotion = types.PieceType([]byte{uci[4]})
		}
	}
	return &types.Move{From: from, To: to, Promotion: promotion, Captured: nil}
}

func MoveToSAN(b types.Board, move types.Move, turn types.Color, castlingRights types.CastlingRights, enPassant types.Square) string {
	piece := b[move.From]
	if piece == nil {
		return ""
	}

	fileDiff := abs(utils.FileOf(move.To) - utils.FileOf(move.From))

	if piece.Type == types.King && fileDiff == 2 {
		if utils.FileOf(move.To) > utils.FileOf(move.From) {
			return "O-O"
		}
		return "O-O-O"
	}

	if piece.Type == types.Pawn {
		capture := fileDiff != 0 || move.Captured != nil
		promo := ""
		if move.Promotion != "" {
			promo = "=" + strings.ToUpper(string(move.Promotion))
		}
		file := ""
		if capture {
			file = string(utils.SquareName(move.From)[0])
		}
		capInd := ""
		if capture {
			capInd = "x"
		}
		return file + capInd + utils.SquareName(move.To) + promo
	}

	letter := pieceLetter[piece.Type]

	others := filterOthers(b, move, turn, castlingRights, enPassant)

	disambig := ""
	if len(others) > 0 {
		sameFile := false
		sameRank := false
		for _, m := range others {
			if utils.FileOf(m.From) == utils.FileOf(move.From) {
				sameFile = true
			}
			if utils.RankOf(m.From) == utils.RankOf(move.From) {
				sameRank = true
			}
		}
		if sameFile {
			disambig = utils.SquareName(move.From)
		} else if sameRank {
			disambig = string(utils.SquareName(move.From)[0])
		} else {
			disambig = string(utils.SquareName(move.From)[0])
		}
	}

	capture := ""
	if move.Captured != nil {
		capture = "x"
	}
	return letter + disambig + capture + utils.SquareName(move.To)
}

func filterOthers(b types.Board, move types.Move, turn types.Color, castlingRights types.CastlingRights, enPassant types.Square) []types.Move {
	pieceType := b[move.From].Type
	pseudo := moves.GeneratePseudoLegalMoves(b, turn, castlingRights, enPassant)
	var others []types.Move
	for _, m := range pseudo {
		p := b[m.From]
		if p != nil && p.Type == pieceType && m.To == move.To && m.From != move.From {
			legal := moves.LegalMoves(b, turn, castlingRights, enPassant)
			for _, lm := range legal {
				if lm.From == m.From && lm.To == m.To {
					others = append(others, m)
					break
				}
			}
		}
	}
	return others
}

func ParseSAN(san string, b types.Board, turn types.Color, castlingRights types.CastlingRights, enPassant types.Square) *types.Move {
	movesList := moves.LegalMoves(b, turn, castlingRights, enPassant)

	if san == "O-O" || san == "O-O-O" {
		rank := 0
		if turn == types.Black {
			rank = 7
		}
		kingFile := 6
		if san == "O-O-O" {
			kingFile = 2
		}
		for _, m := range movesList {
			p := b[m.From]
			if p != nil && p.Type == types.King && m.To == utils.Square(rank, kingFile) {
				return &m
			}
		}
		return nil
	}

	cleaned := strings.ReplaceAll(strings.ReplaceAll(san, "+", ""), "#", "")
	hasCapture := strings.Contains(cleaned, "x")
	hasPromo := strings.Contains(cleaned, "=")

	pieceType := types.Pawn
	targetSq := types.NoSquare
	disambigFile := -1
	disambigRank := -1
	var promotionType types.PieceType

	parts := []string{cleaned}
	if hasPromo {
		parts = strings.Split(cleaned, "=")
	}
	mainPart := parts[0]

	if hasPromo && len(parts) > 1 && len(parts[1]) > 0 {
		promotionType = types.PieceType([]byte{strings.ToLower(string(parts[1][0]))[0]})
	}

	if len(mainPart) > 0 && mainPart[0] >= 'A' && mainPart[0] <= 'Z' {
		pieceMap := map[byte]types.PieceType{
			'K': types.King,
			'Q': types.Queen,
			'R': types.Rook,
			'B': types.Bishop,
			'N': types.Knight,
		}
		if pt, ok := pieceMap[mainPart[0]]; ok {
			pieceType = pt
		}
	}

	withoutPiece := mainPart
	if pieceType != types.Pawn {
		withoutPiece = mainPart[1:]
	}
	moveStr := strings.ReplaceAll(withoutPiece, "x", "")

	if len(moveStr) >= 2 {
		destStr := moveStr[len(moveStr)-2:]
		if sq, ok := utils.ParseSquare(destStr); ok {
			targetSq = sq
		}

		if len(moveStr) > 2 {
			disambigStr := moveStr[:len(moveStr)-2]
			if len(disambigStr) == 1 {
				f := strings.IndexByte("abcdefgh", disambigStr[0])
				if f >= 0 {
					disambigFile = f
				} else {
					disambigRank = int(disambigStr[0]-'0') - 1
				}
			} else if len(disambigStr) >= 2 {
				if sq, ok := utils.ParseSquare(disambigStr); ok {
					disambigFile = utils.FileOf(sq)
					disambigRank = utils.RankOf(sq)
				}
			}
		}
	}

	if targetSq == types.NoSquare {
		return nil
	}

	for _, m := range movesList {
		p := b[m.From]
		if p == nil || p.Type != pieceType || m.To != targetSq {
			continue
		}
		if promotionType != "" && m.Promotion != promotionType {
			continue
		}
		if hasCapture && m.Captured == nil {
			continue
		}
		if disambigFile != -1 && utils.FileOf(m.From) != disambigFile {
			continue
		}
		if disambigRank != -1 && utils.RankOf(m.From) != disambigRank {
			continue
		}
		return &m
	}

	return nil
}

func abs(n int) int {
	if n < 0 {
		return -n
	}
	return n
}
