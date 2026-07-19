//go:build js && wasm

package main

import (
	"encoding/json"
	"syscall/js"

	"github.com/hieudoanm/chess/core/attack"
	"github.com/hieudoanm/chess/core/game"
	"github.com/hieudoanm/chess/core/moves"
	"github.com/hieudoanm/chess/core/notation"
	"github.com/hieudoanm/chess/core/perft"
	"github.com/hieudoanm/chess/core/types"
)

type stateJSON struct {
	Board          [64]*pieceJSON       `json:"board"`
	Turn           string               `json:"turn"`
	CastlingRights castlingRightsJSON   `json:"castlingRights"`
	EnPassant      int                  `json:"enPassant"`
	HalfMoveClock  int                  `json:"halfMoveClock"`
	FullMoveNumber int                  `json:"fullMoveNumber"`
	Status         string               `json:"status"`
	Result         string               `json:"result"`
	InCheck        bool                 `json:"inCheck"`
	FEN            string               `json:"fen"`
	LegalMoves     []string             `json:"legalMoves"`
	StatusMessage  string               `json:"statusMessage"`
	History        []historyEntryJSON   `json:"history"`
}

type pieceJSON struct {
	Color string `json:"color"`
	Type  string `json:"type"`
}

type castlingRightsJSON struct {
	WK bool `json:"WK"`
	WQ bool `json:"WQ"`
	BK bool `json:"BK"`
	BQ bool `json:"BQ"`
}

type historyEntryJSON struct {
	Move        moveJSON `json:"move"`
	StateBefore string   `json:"stateBefore"`
}

type moveJSON struct {
	From      int    `json:"from"`
	To        int    `json:"to"`
	Promotion string `json:"promotion"`
}

func toStateJSON(s types.GameState) stateJSON {
	var board [64]*pieceJSON
	for i, p := range s.Board {
		if p != nil {
			board[i] = &pieceJSON{Color: string(p.Color), Type: string(p.Type)}
		}
	}
	var legal []string
	for _, m := range moves.LegalMoves(s.Board, s.Turn, s.CastlingRights, s.EnPassant) {
		legal = append(legal, notation.MoveToUCI(m))
	}
	var history []historyEntryJSON
	for _, h := range s.History {
		history = append(history, historyEntryJSON{
			Move: moveJSON{
				From:      h.Move.From,
				To:        h.Move.To,
				Promotion: string(h.Move.Promotion),
			},
			StateBefore: h.StateBefore,
		})
	}
	return stateJSON{
		Board:          board,
		Turn:           string(s.Turn),
		CastlingRights: castlingRightsJSON(s.CastlingRights),
		EnPassant:      int(s.EnPassant),
		HalfMoveClock:  s.HalfMoveClock,
		FullMoveNumber: s.FullMoveNumber,
		Status:         string(s.Status),
		Result:         string(s.Result),
		InCheck:        s.InCheck,
		FEN:            notation.StringifyFEN(s),
		LegalMoves:     legal,
		StatusMessage:  game.GetStatusMessage(s),
		History:        history,
	}
}

func chessCreateGame(this js.Value, args []js.Value) interface{} {
	fen := ""
	if len(args) > 0 {
		fen = args[0].String()
	}
	state := game.CreateGame(fen)
	sj := toStateJSON(state)
	data, err := json.Marshal(sj)
	if err != nil {
		return err.Error()
	}
	return string(data)
}

func chessMakeMove(this js.Value, args []js.Value) interface{} {
	if len(args) < 3 {
		return "error: need stateJSON, from, to"
	}
	stateJSONStr := args[0].String()
	from := args[1].Int()
	to := args[2].Int()
	promotion := ""
	if len(args) > 3 {
		promotion = args[3].String()
	}

	var sj stateJSON
	if err := json.Unmarshal([]byte(stateJSONStr), &sj); err != nil {
		return "error: " + err.Error()
	}

	var board types.Board
	for i, pj := range sj.Board {
		if pj != nil {
			board[i] = &types.Piece{Color: types.Color(pj.Color), Type: types.PieceType(pj.Type)}
		}
	}

	m := types.Move{
		From:      types.Square(from),
		To:        types.Square(to),
		Promotion: types.PieceType(promotion),
	}

	captured := board[m.To]
	if captured != nil {
		m.Captured = &types.Piece{Color: captured.Color, Type: captured.Type}
	}

	state := types.GameState{
		Board:          board,
		Turn:           types.Color(sj.Turn),
		CastlingRights: types.CastlingRights(sj.CastlingRights),
		EnPassant:      types.Square(sj.EnPassant),
		HalfMoveClock:  sj.HalfMoveClock,
		FullMoveNumber: sj.FullMoveNumber,
		History:        nil,
		Status:         types.GameStatus(sj.Status),
		Result:         types.GameResult(sj.Result),
		InCheck:        sj.InCheck,
	}

	newState := game.MakeMove(state, m)
	nsj := toStateJSON(newState)
	data, err := json.Marshal(nsj)
	if err != nil {
		return "error: " + err.Error()
	}
	return string(data)
}

func chessLegalMoves(this js.Value, args []js.Value) interface{} {
	fen := ""
	if len(args) > 0 {
		fen = args[0].String()
	}
	state := game.CreateGame(fen)
	ml := moves.LegalMoves(state.Board, state.Turn, state.CastlingRights, state.EnPassant)
	var uci []string
	for _, m := range ml {
		uci = append(uci, notation.MoveToUCI(m))
	}
	data, _ := json.Marshal(uci)
	return string(data)
}

func chessIsCheck(this js.Value, args []js.Value) interface{} {
	fen := ""
	if len(args) > 0 {
		fen = args[0].String()
	}
	state := game.CreateGame(fen)
	return attack.IsInCheck(state.Board, state.Turn)
}

func chessPerft(this js.Value, args []js.Value) interface{} {
	fen := ""
	if len(args) > 0 {
		fen = args[0].String()
	}
	depth := 3
	if len(args) > 1 {
		depth = args[1].Int()
	}
	state := game.CreateGame(fen)
	return perft.Perft(state, depth)
}

func main() {
	js.Global().Set("chessCreateGame", js.FuncOf(chessCreateGame))
	js.Global().Set("chessMakeMove", js.FuncOf(chessMakeMove))
	js.Global().Set("chessLegalMoves", js.FuncOf(chessLegalMoves))
	js.Global().Set("chessIsCheck", js.FuncOf(chessIsCheck))
	js.Global().Set("chessPerft", js.FuncOf(chessPerft))
	select {}
}
