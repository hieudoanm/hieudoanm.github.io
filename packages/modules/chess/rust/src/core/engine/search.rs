use std::cell::RefCell;
use std::time::Instant;

use crate::core::board::clone_board;
use crate::core::engine::evaluate::evaluate_board;
use crate::core::engine::transposition::{compute_hash, TranspositionTable, TTFlag};
use crate::core::game::update_castling_rights;
use crate::core::moves::attack::is_in_check;
use crate::core::moves::{apply_move, legal_moves};
use crate::core::types::{Board, CastlingRights, Color, Move, PieceType, Square};
use crate::core::utils::{file_of, rank_of, square};

const INF: i32 = 1_000_000_000;
const MATE_SCORE: i32 = 100_000;
const MAX_DEPTH: i32 = 64;
const NULL_MOVE_REDUCTION: i32 = 3;

thread_local! {
    static NODE_COUNT: RefCell<i64> = RefCell::new(0);
    static START_TIME: RefCell<Option<Instant>> = RefCell::new(None);
    static TIME_LIMIT: RefCell<i64> = RefCell::new(0);
    static STOP: RefCell<bool> = RefCell::new(false);
    static TT: RefCell<TranspositionTable> = RefCell::new(TranspositionTable::new());
}

fn reset_search(limits: (Option<u32>, Option<u64>)) {
    NODE_COUNT.with(|n| *n.borrow_mut() = 0);
    STOP.with(|s| *s.borrow_mut() = false);
    START_TIME.with(|t| *t.borrow_mut() = Some(Instant::now()));
    let time_limit = limits.1.unwrap_or(0) as i64;
    TIME_LIMIT.with(|t| *t.borrow_mut() = time_limit);
}

fn time_up() -> bool {
    if STOP.with(|s| *s.borrow()) {
        return true;
    }
    let limit = TIME_LIMIT.with(|t| *t.borrow());
    if limit > 0 {
        let elapsed = START_TIME.with(|t| t.borrow().unwrap().elapsed().as_millis() as i64);
        if elapsed >= limit {
            STOP.with(|s| *s.borrow_mut() = true);
            return true;
        }
    }
    false
}

fn piece_val(pt: PieceType) -> i32 {
    match pt {
        PieceType::Pawn => 100,
        PieceType::Knight => 320,
        PieceType::Bishop => 330,
        PieceType::Rook => 500,
        PieceType::Queen => 900,
        PieceType::King => 20000,
    }
}

fn move_value(mv: Move) -> i32 {
    if let Some(captured) = mv.captured {
        let v = piece_val(captured.piece_type);
        let a = if mv.promotion.is_some() { 900 } else { 100 };
        v * 10 - a
    } else if mv.promotion.is_some() {
        900
    } else {
        0
    }
}

fn order_moves(moves: &[Move], tt_best: Option<Move>) -> Vec<Move> {
    let mut sorted = moves.to_vec();
    sorted.sort_by(|a, b| {
        if let Some(best) = tt_best {
            if a.from == best.from && a.to == best.to && a.promotion == best.promotion {
                return std::cmp::Ordering::Less;
            }
            if b.from == best.from && b.to == best.to && b.promotion == best.promotion {
                return std::cmp::Ordering::Greater;
            }
        }
        move_value(*b).cmp(&move_value(*a))
    });
    sorted
}

fn has_non_pawn(board: &Board, color: Color) -> bool {
    for sq in 0..64u8 {
        if let Some(piece) = board[sq as usize] {
            if piece.color == color && piece.piece_type != PieceType::King && piece.piece_type != PieceType::Pawn {
                return true;
            }
        }
    }
    false
}

fn apply_engine_move(
    board: &Board,
    turn: Color,
    castling_rights: CastlingRights,
    _en_passant: Option<Square>,
    mv: Move,
) -> (Board, Color, CastlingRights, Option<Square>) {
    let mut new_board = clone_board(board);
    apply_move(&mut new_board, mv);
    let new_castling_rights = update_castling_rights(castling_rights, mv, board);
    let piece = board[mv.from as usize].unwrap();
    let new_en_passant = if piece.piece_type == PieceType::Pawn
        && (rank_of(mv.to) as i32 - rank_of(mv.from) as i32).abs() == 2
    {
        Some(square((rank_of(mv.from) + rank_of(mv.to)) / 2, file_of(mv.from)))
    } else {
        None
    };
    let new_turn = turn.opposite();
    (new_board, new_turn, new_castling_rights, new_en_passant)
}

fn quiescence(
    board: &Board,
    turn: Color,
    castling_rights: CastlingRights,
    en_passant: Option<Square>,
    mut alpha: i32,
    beta: i32,
    max_depth: i32,
    ply: i32,
) -> i32 {
    if time_up() {
        return 0;
    }

    NODE_COUNT.with(|n| *n.borrow_mut() += 1);

    let all_moves = legal_moves(board, turn, castling_rights, en_passant);
    if all_moves.is_empty() {
        return if is_in_check(board, turn) {
            -(MATE_SCORE - ply)
        } else {
            evaluate_board(board, turn)
        };
    }

    if max_depth <= 0 {
        return evaluate_board(board, turn);
    }

    let stand_pat = evaluate_board(board, turn);
    if stand_pat >= beta {
        return beta;
    }
    if stand_pat > alpha {
        alpha = stand_pat;
    }

    let tactical: Vec<Move> = all_moves
        .into_iter()
        .filter(|m| m.captured.is_some() || m.promotion.is_some() || is_in_check(board, turn))
        .collect();

    if tactical.is_empty() {
        return alpha;
    }

    let ordered = order_moves(&tactical, None);
    for mv in ordered {
        let (next_board, next_turn, next_cr, next_ep) =
            apply_engine_move(board, turn, castling_rights, en_passant, mv);
        let score = -quiescence(&next_board, next_turn, next_cr, next_ep, -beta, -alpha, max_depth - 1, ply + 1);
        if score >= beta {
            return beta;
        }
        if score > alpha {
            alpha = score;
        }
    }
    alpha
}

fn alpha_beta(
    board: &Board,
    turn: Color,
    castling_rights: CastlingRights,
    en_passant: Option<Square>,
    depth: i32,
    ply: i32,
    mut alpha: i32,
    beta: i32,
    in_null: bool,
) -> i32 {
    if ply > 0 && time_up() {
        return 0;
    }

    let hash = compute_hash(board, turn, castling_rights, en_passant);

    if depth > 0 && !in_null {
        let cutoff = TT.with(|tt| tt.borrow().get_cutoff(hash, depth as u8, alpha, beta));
        if let Some((score, _)) = cutoff {
            return score;
        }
    }

    let check = is_in_check(board, turn);
    NODE_COUNT.with(|n| *n.borrow_mut() += 1);

    let tt_entry = TT.with(|tt| tt.borrow().probe(hash));
    let tt_best = tt_entry.and_then(|e| e.best_move);

    // Null-move pruning
    if depth >= NULL_MOVE_REDUCTION + 1 && !check && !in_null && has_non_pawn(board, turn) {
        let next_turn = turn.opposite();
        let null_score = -alpha_beta(
            board, next_turn, castling_rights, en_passant,
            depth - NULL_MOVE_REDUCTION, ply + 1, -beta, -beta + 1, true,
        );
        if null_score >= beta {
            return beta;
        }
    }

    let moves = order_moves(&legal_moves(board, turn, castling_rights, en_passant), tt_best);

    if moves.is_empty() {
        let score = if check { -(MATE_SCORE - ply) } else { 0 };
        TT.with(|tt| tt.borrow_mut().store(hash, depth as u8, score, TTFlag::Exact, None));
        return score;
    }

    if depth == 0 {
        let score = quiescence(board, turn, castling_rights, en_passant, alpha, beta, 3, ply);
        TT.with(|tt| tt.borrow_mut().store(hash, depth as u8, score, TTFlag::Exact, None));
        return score;
    }

    let mut best_move: Option<Move> = None;
    let mut best_score = alpha;
    let mut flag = TTFlag::Alpha;

    for mv in moves {
        let (next_board, next_turn, next_cr, next_ep) =
            apply_engine_move(board, turn, castling_rights, en_passant, mv);
        let score = -alpha_beta(
            &next_board, next_turn, next_cr, next_ep,
            depth - 1, ply + 1, -beta, -alpha, false,
        );

        if score > best_score {
            best_score = score;
            best_move = Some(mv);
        }
        if score >= beta {
            TT.with(|tt| tt.borrow_mut().store(hash, depth as u8, score, TTFlag::Beta, best_move));
            return beta;
        }
        if score > alpha {
            alpha = score;
            flag = TTFlag::Exact;
        }
    }

    TT.with(|tt| tt.borrow_mut().store(hash, depth as u8, best_score, flag, best_move));
    best_score
}

#[derive(Debug, Clone)]
pub struct SearchResult {
    pub move_: Option<Move>,
    pub score: i32,
    pub depth: i32,
    pub nodes: i64,
}

pub fn find_best_move(
    board: &Board,
    turn: Color,
    castling_rights: CastlingRights,
    en_passant: Option<Square>,
    limits: (Option<u32>, Option<u64>),
) -> SearchResult {
    reset_search(limits);

    let moves = legal_moves(board, turn, castling_rights, en_passant);
    if moves.is_empty() {
        return SearchResult { move_: None, score: 0, depth: 0, nodes: 0 };
    }

    let max_depth = limits.0.map(|d| d as i32).unwrap_or(MAX_DEPTH);
    let mut best_move = moves[0];
    let mut best_score = -INF;

    TT.with(|tt| tt.borrow_mut().clear());

    for depth in 1..=max_depth {
        if time_up() {
            break;
        }

        let mut current_best = moves[0];
        let mut alpha = -INF;
        let beta = INF;

        let hash = compute_hash(board, turn, castling_rights, en_passant);
        let tt_entry = TT.with(|tt| tt.borrow().probe(hash));
        let tt_best = tt_entry.and_then(|e| e.best_move);
        let ordered = order_moves(&moves, tt_best);

        for mv in &ordered {
            if time_up() {
                break;
            }
            let (next_board, next_turn, next_cr, next_ep) =
                apply_engine_move(board, turn, castling_rights, en_passant, *mv);
            let score = -alpha_beta(
                &next_board, next_turn, next_cr, next_ep,
                depth - 1, 1, -beta, -alpha, false,
            );
            if score > alpha {
                alpha = score;
                current_best = *mv;
            }
        }

        if !time_up() || depth == 1 {
            best_move = current_best;
            best_score = alpha;
        }

        if alpha.abs() >= MATE_SCORE - MAX_DEPTH {
            break;
        }
    }

    let nodes = NODE_COUNT.with(|n| *n.borrow());
    SearchResult {
        move_: Some(best_move),
        score: best_score,
        depth: max_depth,
        nodes,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::core::board::find_king;
    use crate::core::moves::attack::is_square_attacked;
    use crate::core::notation::parse_fen;

    #[test]
    fn returns_a_move_when_legal_moves_exist() {
        let state = parse_fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
        let result = find_best_move(&state.board, state.turn, state.castling_rights, state.en_passant, (Some(1), None));
        assert!(result.move_.is_some());
    }

    #[test]
    fn finds_checkmate_with_two_rooks() {
        let state = parse_fen("kR6/R7/8/8/8/8/8/4K3 w - - 0 1");
        let result = find_best_move(&state.board, state.turn, state.castling_rights, state.en_passant, (Some(3), None));
        assert!(result.move_.is_some());
        assert!(result.score > 90000);
    }

    #[test]
    fn avoids_moving_into_check() {
        let state = parse_fen("rnb1kbnr/pppppppp/8/5q2/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1");
        let result = find_best_move(&state.board, state.turn, state.castling_rights, state.en_passant, (Some(2), None));
        assert!(result.move_.is_some());
        let mv = result.move_.unwrap();
        let mut new_board = clone_board(&state.board);
        apply_move(&mut new_board, mv);
        let king_sq = find_king(&new_board, Color::White).unwrap();
        assert!(!is_square_attacked(&new_board, king_sq, Color::Black));
    }

    #[test]
    fn returns_none_when_no_legal_moves() {
        let state = parse_fen("k7/8/8/8/8/8/8/4K3 w - - 0 1");
        let board = state.board;
        let moves = legal_moves(&board, state.turn, state.castling_rights, state.en_passant);
        if moves.is_empty() {
            let result = find_best_move(&board, state.turn, state.castling_rights, state.en_passant, (Some(1), None));
            assert!(result.move_.is_none());
        }
    }
}
