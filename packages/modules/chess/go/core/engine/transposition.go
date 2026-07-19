package engine

import (
	"github.com/hieudoanm/chess/core/types"
	"github.com/hieudoanm/chess/core/utils"
)

// ── Zobrist Keys ──

type zobristKeys struct {
	pieceKeys    [6][2][64]uint64
	sideKey      uint64
	castlingKeys [4]uint64
	epKeys       [8]uint64
}

var zobristCache *zobristKeys

func splitmix64(seed *uint64) uint64 {
	*seed = *seed + 0x9E3779B97F4A7C15
	z := *seed
	z = (z ^ (z >> 30)) * 0xBF58476D1CE4E5B9
	z = (z ^ (z >> 27)) * 0x94D049BB133111EB
	return z ^ (z >> 31)
}

func initZobrist() *zobristKeys {
	var seed uint64 = 123456789
	next := func() uint64 { return splitmix64(&seed) }

	var keys zobristKeys
	for pt := 0; pt < 6; pt++ {
		for c := 0; c < 2; c++ {
			for sq := 0; sq < 64; sq++ {
				keys.pieceKeys[pt][c][sq] = next()
			}
		}
	}
	keys.sideKey = next()
	for i := 0; i < 4; i++ {
		keys.castlingKeys[i] = next()
	}
	for i := 0; i < 8; i++ {
		keys.epKeys[i] = next()
	}
	return &keys
}

func zobrist() *zobristKeys {
	if zobristCache == nil {
		zobristCache = initZobrist()
	}
	return zobristCache
}

const ttSize = 1 << 20

type TTFlag uint8

const (
	TTExact TTFlag = iota
	TTAlpha
	TTBeta
)

type TTEntry struct {
	key      uint64
	depth    uint8
	score    int32
	flag     TTFlag
	bestMove *types.Move
}

type TranspositionTable struct {
	entries []TTEntry
}

func NewTranspositionTable() *TranspositionTable {
	tt := &TranspositionTable{entries: make([]TTEntry, ttSize)}
	for i := range tt.entries {
		tt.entries[i] = TTEntry{bestMove: nil}
	}
	return tt
}

func (tt *TranspositionTable) index(hash uint64) int {
	return int(hash & (ttSize - 1))
}

func (tt *TranspositionTable) Probe(hash uint64) *TTEntry {
	entry := &tt.entries[tt.index(hash)]
	if entry.key == hash {
		return entry
	}
	return nil
}

func (tt *TranspositionTable) GetCutoff(hash uint64, depth uint8, alpha, beta int32) (int32, *types.Move, bool) {
	entry := tt.Probe(hash)
	if entry == nil || entry.depth < depth {
		return 0, nil, false
	}
	switch entry.flag {
	case TTExact:
		return entry.score, entry.bestMove, true
	case TTAlpha:
		if entry.score <= alpha {
			return entry.score, entry.bestMove, true
		}
	case TTBeta:
		if entry.score >= beta {
			return entry.score, entry.bestMove, true
		}
	}
	return 0, nil, false
}

func (tt *TranspositionTable) Store(hash uint64, depth uint8, score int32, flag TTFlag, bestMove *types.Move) {
	idx := tt.index(hash)
	tt.entries[idx] = TTEntry{key: hash, depth: depth, score: score, flag: flag, bestMove: bestMove}
}

func (tt *TranspositionTable) Clear() {
	for i := range tt.entries {
		tt.entries[i].key = 0
	}
}

func ComputeHash(board types.Board, turn types.Color, cr types.CastlingRights, enPassant types.Square) uint64 {
	keys := zobrist()
	var hash uint64

	ptIdx := map[types.PieceType]int{
		types.Pawn: 0, types.Knight: 1, types.Bishop: 2,
		types.Rook: 3, types.Queen: 4, types.King: 5,
	}

	for sq := 0; sq < 64; sq++ {
		if piece := board[sq]; piece != nil {
			hash ^= keys.pieceKeys[ptIdx[piece.Type]][colorIndex(piece.Color)][sq]
		}
	}

	if turn == types.Black {
		hash ^= keys.sideKey
	}
	if cr.WK {
		hash ^= keys.castlingKeys[0]
	}
	if cr.WQ {
		hash ^= keys.castlingKeys[1]
	}
	if cr.BK {
		hash ^= keys.castlingKeys[2]
	}
	if cr.BQ {
		hash ^= keys.castlingKeys[3]
	}
	if enPassant != types.NoSquare {
		hash ^= keys.epKeys[utils.FileOf(enPassant)]
	}
	return hash
}

func colorIndex(c types.Color) int {
	if c == types.White {
		return 0
	}
	return 1
}
