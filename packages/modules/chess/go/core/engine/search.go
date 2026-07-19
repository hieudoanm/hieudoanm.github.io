package engine

import (
	"sort"
	"time"

	"github.com/hieudoanm/chess/core/attack"
	"github.com/hieudoanm/chess/core/board"
	"github.com/hieudoanm/chess/core/game"
	"github.com/hieudoanm/chess/core/moves"
	"github.com/hieudoanm/chess/core/types"
	"github.com/hieudoanm/chess/core/utils"
)

const (
	maxDepth          = 64
	nullMoveReduction = 3
	mateScore         = 100000
)

var (
	nodes     int64
	stop      bool
	startTime time.Time
	timeLimit time.Duration
	tt        = NewTranspositionTable()
)

func resetSearch(limit time.Duration) {
	nodes = 0
	stop = false
	startTime = time.Now()
	timeLimit = limit
}

func timeUp() bool {
	if stop {
		return true
	}
	if timeLimit > 0 && time.Since(startTime) >= timeLimit {
		stop = true
	}
	return stop
}

func moveValue(m types.Move) int32 {
	if m.Captured != nil {
		v := pieceVal(m.Captured.Type)
		a := int32(100)
		if m.Promotion != "" {
			a = 900
		}
		return v*10 - a
	}
	if m.Promotion != "" {
		return 900
	}
	return 0
}

func orderMoves(ml []types.Move, ttBest *types.Move) {
	sort.Slice(ml, func(i, j int) bool {
		if ttBest != nil && ml[i].From == ttBest.From && ml[i].To == ttBest.To && ml[i].Promotion == ttBest.Promotion {
			return true
		}
		if ttBest != nil && ml[j].From == ttBest.From && ml[j].To == ttBest.To && ml[j].Promotion == ttBest.Promotion {
			return false
		}
		return moveValue(ml[i]) > moveValue(ml[j])
	})
}

func hasNonPawn(b types.Board, color types.Color) bool {
	for sq := 0; sq < 64; sq++ {
		if p := b[sq]; p != nil && p.Color == color && p.Type != types.King && p.Type != types.Pawn {
			return true
		}
	}
	return false
}

func applyEngineMove(
	b types.Board,
	turn types.Color,
	cr types.CastlingRights,
	enPassant types.Square,
	m types.Move,
) (types.Board, types.Color, types.CastlingRights, types.Square) {
	nextB := board.CloneBoard(b)
	moves.ApplyMove(&nextB, m)
	nextCR := game.UpdateCastlingRights(cr, m, b)
	piece := b[m.From]
	var nextEP types.Square = -1
	if piece != nil && piece.Type == types.Pawn {
		dr := utils.RankOf(m.To) - utils.RankOf(m.From)
		if dr == 2 || dr == -2 {
			nextEP = utils.Square((utils.RankOf(m.From)+utils.RankOf(m.To))/2, utils.FileOf(m.From))
		}
	}
	nextTurn := turn.Opposite()
	return nextB, nextTurn, nextCR, nextEP
}

func quiescence(b types.Board, turn types.Color, cr types.CastlingRights, enPassant types.Square, alpha, beta int32, maxDepth, ply int) int32 {
	if timeUp() {
		return 0
	}

	nodes++

	allMoves := moves.LegalMoves(b, turn, cr, enPassant)
	if len(allMoves) == 0 {
		if attack.IsInCheck(b, turn) {
			return -(int32(mateScore) - int32(ply))
		}
		return EvaluateBoard(b, turn)
	}

	if maxDepth <= 0 {
		return EvaluateBoard(b, turn)
	}

	standPat := EvaluateBoard(b, turn)
	if standPat >= beta {
		return beta
	}
	if standPat > alpha {
		alpha = standPat
	}

	tactical := make([]types.Move, 0)
	for _, m := range allMoves {
		if m.Captured != nil || m.Promotion != "" || attack.IsInCheck(b, turn) {
			tactical = append(tactical, m)
		}
	}

	if len(tactical) == 0 {
		return alpha
	}

	orderMoves(tactical, nil)

	for _, m := range tactical {
		nextB, nextTurn, nextCR, nextEP := applyEngineMove(b, turn, cr, enPassant, m)
		score := -quiescence(nextB, nextTurn, nextCR, nextEP, -beta, -alpha, maxDepth-1, ply+1)
		if score >= beta {
			return beta
		}
		if score > alpha {
			alpha = score
		}
	}
	return alpha
}

func alphaBeta(
	b types.Board,
	turn types.Color,
	cr types.CastlingRights,
	enPassant types.Square,
	depth, ply int,
	alpha, beta int32,
	inNull bool,
) int32 {
	if ply > 0 && timeUp() {
		return 0
	}

	hash := ComputeHash(b, turn, cr, enPassant)

	if depth > 0 && !inNull {
		if score, _, ok := tt.GetCutoff(hash, uint8(depth), alpha, beta); ok {
			return score
		}
	}

	check := attack.IsInCheck(b, turn)
	nodes++

	ttEntry := tt.Probe(hash)
	var ttBest *types.Move
	if ttEntry != nil {
		ttBest = ttEntry.bestMove
	}

	if depth >= nullMoveReduction+1 && !check && !inNull && hasNonPawn(b, turn) {
		nextTurn := turn.Opposite()
		nullScore := -alphaBeta(b, nextTurn, cr, enPassant, depth-nullMoveReduction, ply+1, -beta, -beta+1, true)
		if nullScore >= beta {
			return beta
		}
	}

	ml := moves.LegalMoves(b, turn, cr, enPassant)
	orderMoves(ml, ttBest)

	if len(ml) == 0 {
		score := int32(0)
		if check {
			score = -(int32(mateScore) - int32(ply))
		}
		tt.Store(hash, uint8(depth), score, TTExact, nil)
		return score
	}

	if depth == 0 {
		score := quiescence(b, turn, cr, enPassant, alpha, beta, 3, ply)
		tt.Store(hash, uint8(depth), score, TTExact, nil)
		return score
	}

	var bestMove *types.Move
	bestScore := alpha
	flag := TTAlpha

	for _, m := range ml {
		nextB, nextTurn, nextCR, nextEP := applyEngineMove(b, turn, cr, enPassant, m)
		score := -alphaBeta(nextB, nextTurn, nextCR, nextEP, depth-1, ply+1, -beta, -alpha, false)

		if score > bestScore {
			bestScore = score
			bestMove = &m
		}
		if score >= beta {
			tt.Store(hash, uint8(depth), score, TTBeta, bestMove)
			return beta
		}
		if score > alpha {
			alpha = score
			flag = TTExact
		}
	}

	tt.Store(hash, uint8(depth), bestScore, flag, bestMove)
	return bestScore
}

type SearchResult struct {
	Move  *types.Move
	Score int32
	Depth int
	Nodes int64
}

func FindBestMove(b types.Board, turn types.Color, cr types.CastlingRights, enPassant types.Square, depthLimit int, timeLimit time.Duration) SearchResult {
	resetSearch(timeLimit)

	ml := moves.LegalMoves(b, turn, cr, enPassant)
	if len(ml) == 0 {
		return SearchResult{Move: nil, Score: 0, Depth: 0, Nodes: 0}
	}

	if depthLimit <= 0 {
		depthLimit = maxDepth
	}
	bestMove := ml[0]
	bestScore := int32(-1000000000)

	tt.Clear()

	for depth := 1; depth <= depthLimit; depth++ {
		if timeUp() {
			break
		}

		currentBest := ml[0]
		alpha := int32(-1000000000)
		beta := int32(1000000000)

		ttEntry := tt.Probe(ComputeHash(b, turn, cr, enPassant))
		var ttBest *types.Move
		if ttEntry != nil {
			ttBest = ttEntry.bestMove
		}
		orderMoves(ml, ttBest)

		for _, m := range ml {
			if timeUp() {
				break
			}
			nextB, nextTurn, nextCR, nextEP := applyEngineMove(b, turn, cr, enPassant, m)
			score := -alphaBeta(nextB, nextTurn, nextCR, nextEP, depth-1, 1, -beta, -alpha, false)
			if score > alpha {
				alpha = score
				currentBest = m
			}
		}

		if !timeUp() || depth == 1 {
			bestMove = currentBest
			bestScore = alpha
		}

		if alpha < 0 {
			if -alpha >= mateScore-maxDepth {
				break
			}
		} else {
			if alpha >= mateScore-maxDepth {
				break
			}
		}
	}

	return SearchResult{Move: &bestMove, Score: bestScore, Depth: depthLimit, Nodes: nodes}
}
