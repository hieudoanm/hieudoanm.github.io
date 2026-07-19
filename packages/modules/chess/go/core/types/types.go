package types

type Color string

const (
	White Color = "w"
	Black Color = "b"
)

func (c Color) Opposite() Color {
	if c == White {
		return Black
	}
	return White
}

type PieceType string

const (
	Pawn   PieceType = "p"
	Knight PieceType = "n"
	Bishop PieceType = "b"
	Rook   PieceType = "r"
	Queen  PieceType = "q"
	King   PieceType = "k"
)

type Piece struct {
	Color Color
	Type  PieceType
}

type Square = int

const NoSquare Square = -1

type Board [64]*Piece

type Move struct {
	From      Square
	To        Square
	Promotion PieceType
	Captured  *Piece
}

type CastlingRights struct {
	WK bool // White king-side
	WQ bool // White queen-side
	BK bool // Black king-side
	BQ bool // Black queen-side
}

type GameStatus string

const (
	StatusPlaying   GameStatus = "playing"
	StatusCheckmate GameStatus = "checkmate"
	StatusStalemate GameStatus = "stalemate"
	StatusDraw      GameStatus = "draw"
)

type GameResult string

const (
	ResultWhiteWins GameResult = "1-0"
	ResultBlackWins GameResult = "0-1"
	ResultDraw      GameResult = "1/2-1/2"
	ResultOngoing   GameResult = "*"
)

type HistoryEntry struct {
	Move        Move
	StateBefore string
}

type GameState struct {
	Board          Board
	Turn           Color
	CastlingRights CastlingRights
	EnPassant      Square
	HalfMoveClock  int
	FullMoveNumber int
	History        []HistoryEntry
	Status         GameStatus
	Result         GameResult
	InCheck        bool
}
