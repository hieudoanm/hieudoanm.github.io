package fen

import (
	"fmt"
	"strconv"
	"strings"
)

type FENFields struct {
	PiecePlacement      string
	ActiveColor         string
	CastlingAvailability string
	EnPassantTarget     string
	HalfMoveClock       int
	FullMoveNumber      int
}

func ParseFENFields(fen string) (FENFields, error) {
	parts := strings.Fields(fen)

	if len(parts) != 6 {
		return FENFields{}, fmt.Errorf("invalid FEN: must have 6 fields")
	}

	piecePlacement := parts[0]
	activeColor := parts[1]
	castlingAvailability := parts[2]
	enPassantTarget := parts[3]
	halfmoveClock := parts[4]
	fullmoveNumber := parts[5]

	if piecePlacement == "" || activeColor == "" || castlingAvailability == "" ||
		enPassantTarget == "" || halfmoveClock == "" || fullmoveNumber == "" {
		return FENFields{}, fmt.Errorf("invalid FEN: missing fields")
	}

	if activeColor != "w" && activeColor != "b" {
		return FENFields{}, fmt.Errorf("invalid FEN: active color")
	}

	halfmove, err := strconv.Atoi(halfmoveClock)
	if err != nil {
		return FENFields{}, fmt.Errorf("invalid FEN: halfmove clock")
	}

	fullmove, err := strconv.Atoi(fullmoveNumber)
	if err != nil {
		return FENFields{}, fmt.Errorf("invalid FEN: fullmove number")
	}

	return FENFields{
		PiecePlacement:       piecePlacement,
		ActiveColor:          activeColor,
		CastlingAvailability: castlingAvailability,
		EnPassantTarget:      enPassantTarget,
		HalfMoveClock:        halfmove,
		FullMoveNumber:       fullmove,
	}, nil
}

func StringifyFENFields(fields FENFields) string {
	return fmt.Sprintf("%s %s %s %s %d %d",
		fields.PiecePlacement,
		fields.ActiveColor,
		fields.CastlingAvailability,
		fields.EnPassantTarget,
		fields.HalfMoveClock,
		fields.FullMoveNumber,
	)
}

var files = "abcdefgh"

func get960Castling(backRank string) (string, error) {
	r := strings.ToUpper(backRank)
	kingFile := strings.IndexByte(r, 'K')

	if kingFile == -1 {
		return "-", nil
	}

	var rookFiles []int
	for i, c := range r {
		if c == 'R' {
			rookFiles = append(rookFiles, i)
		}
	}

	if len(rookFiles) != 2 {
		return "", fmt.Errorf("chess960 back rank must contain exactly two rooks")
	}

	if rookFiles[0] > rookFiles[1] {
		rookFiles[0], rookFiles[1] = rookFiles[1], rookFiles[0]
	}

	white := ""
	for _, f := range rookFiles {
		white += string(files[f])
	}
	white = strings.ToUpper(white)
	black := strings.ToLower(white)

	return white + black, nil
}

func Chess960BackRankToInitialFEN(position string, variant string) (string, error) {
	if len(position) != 8 {
		return "", fmt.Errorf("back rank must be exactly 8 characters")
	}

	black := strings.ToLower(position)
	white := strings.ToUpper(position)

	castling := "KQkq"
	if variant == "chess960" {
		var err error
		castling, err = get960Castling(position)
		if err != nil {
			return "", err
		}
	}

	return fmt.Sprintf("%s/pppppppp/8/8/8/8/PPPPPPPP/%s w %s - 0 1", black, white, castling), nil
}
