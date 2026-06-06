use crate::core::board::clone_board;
use crate::core::engine::evaluate::evaluate_board;
use crate::core::engine::transposition::{compute_hash, TranspositionTable, TTFlag};
use crate::core::moves::attack::is_in_check;
use crate::core::moves::{apply_move, legal_moves};
use crate::core::types::{Board, CastlingRights, Color, Move, PieceType, Square};
use crate::core::utils::{file_of, rank_of, square};

const INF: i32 = 1_000_000_000;
const MATE_SCORE: i32 = 100_000;
const NULL_MOVE_REDUCTION: i32 = 3;

#[derive(Debug, Clone)]
pub struct SearchResult {
    pub move_: Option<Move>,
    pub score: i32,
    pub depth: u32,
    pub nodes: u64,
}

thread_local! {
    static TT: std::cell::RefCell<TranspositionTable> = std::cell::RefCell::new(TranspositionTable::new());
}

fn with_tt<F, R>(f: F) -> R
where
    F: FnOnce(&mut TranspositionTable) -> R,
{
    TT.with(|tt| f(&mut tt.borrow_mut()))
}

fn apply_engine_move(
    board: &Board,
    turn: Color,
    castling_rights: CastlingRights,
    _en_passant: Option<Square>,
    mv: Move,
) -> (Board, Color, CastlingRights, Option<Square>) {
    let mut new_board = clone_board(board);
    let piece = board[mv.from as usize].unwrap();
    apply_move(&mut new_board, mv);

    let mut new_castling_rights = castling_rights;
    if mv.from == 4 || mv.to == 4 { new_castling_rights.K = false; new_castling_rights.Q = false; }
    if mv.from == 60 || mv.to == 60 { new_castling_rights.k = false; new_castling_rights.q = false; }
    if mv.from == 7 || mv.to == 7 { new_castling_rights.K = false; }
    if mv.from == 0 || mv.to == 0 { new_castling_rights.Q = false; }
    if mv.from == 63 || mv.to == 63 { new_castling_rights.k = false; }
    if mv.from == 56 || mv.to == 56 { new_castling_rights.q = false; }

    if piece.piece_type == PieceType::King {
        match piece.color {
            Color::White => { new_castling_rights.K = false; new_castling_rights.Q = false; }
            Color::Black => { new_castling_rights.k = false; new_castling_rights.q = false; }
        }
    }
    if piece.piece_type == PieceType::Rook {
        if mv.from == 7 { new_castling_rights.K = false; }
        if mv.from == 0 { new_castling_rights.Q = false; }
        if mv.from == 63 { new_castling_rights.k = false; }
        if mv.from == 56 { new_castling_rights.q = false; }
    }

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

fn move_value(mv: &Move) -> i32 {
    if let Some(captured) = mv.captured {
        let victim = match captured.piece_type {
            PieceType::Pawn => 100, PieceType::Knight => 320, PieceType::Bishop => 330,
            PieceType::Rook => 500, PieceType::Queen => 900, PieceType::King => 20_000,
        };
        let attacker = if mv.promotion.is_some() { 900 } else {
            match mv.promotion.unwrap_or(PieceType::Pawn) {
                PieceType::Pawn => 100, PieceType::Knight => 320, PieceType::Bishop => 330,
                PieceType::Rook => 500, PieceType::Queen => 900, PieceType::King => 20_000,
            }
        };
        victim * 10 - attacker
    } else if mv.promotion.is_some() {
        900
    } else {
        0
    }
}

fn order_moves(moves: &[Move]) -> Vec<Move> {
    let mut sorted = moves.to_vec();
    sorted.sort_by(|a, b| move_value(b).cmp(&move_value(a)));
    sorted
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
    let all_moves = legal_moves(board, turn, castling_rights, en_passant);
    if all_moves.is_empty() {
        return if is_in_check(board, turn) { -(MATE_SCORE - ply) } else { evaluate_board(board, turn) };
    }

    if max_depth <= 0 {
        return evaluate_board(board, turn);
    }

    let stand_pat = evaluate_board(board, turn);
    if stand_pat >= beta { return beta; }
    if stand_pat > alpha { alpha = stand_pat; }

    let in_check = is_in_check(board, turn);
    let tactical: Vec<Move> = all_moves.into_iter()
        .filter(|m| m.captured.is_some() || m.promotion.is_some() || in_check)
        .collect();

    if tactical.is_empty() { return alpha; }

    let ordered = order_moves(&tactical);
    for mv in ordered {
        let (next_board, next_turn, next_cr, next_ep) =
            apply_engine_move(board, turn, castling_rights, en_passant, mv);
        let score = -quiescence(&next_board, next_turn, next_cr, next_ep, -beta, -alpha, max_depth - 1, ply + 1);
        if score >= beta { return beta; }
        if score > alpha { alpha = score; }
    }
    alpha
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
    let hash = compute_hash(board, turn, castling_rights, en_passant);

    // Probe TT
    if depth > 0 && !in_null {
        if let Some((tt_score, tt_best)) = with_tt(|tt| tt.probe(hash, depth as u8, alpha, beta)) {
            if tt_best.is_some() {
                return tt_score;
            }
        }
    }

    let check = is_in_check(board, turn);

    // Null-move pruning
    if depth >= NULL_MOVE_REDUCTION + 1 && !check && !in_null && has_non_pawn(board, turn) {
        let (_, next_turn, next_cr, next_ep) =
            apply_engine_move(board, turn, castling_rights, en_passant, Move {
                from: 0, to: 0, promotion: None, captured: None,
            });
        let null_score = -alpha_beta(
            board, next_turn, next_cr, next_ep,
            depth - NULL_MOVE_REDUCTION, ply + 1, -beta, -beta + 1, true,
        );
        if null_score >= beta {
            return beta;
        }
    }

    let moves = order_moves(&legal_moves(board, turn, castling_rights, en_passant));
    if moves.is_empty() {
        let score = if check { -(MATE_SCORE - ply) } else { 0 };
        with_tt(|tt| tt.store(hash, depth as u8, score, TTFlag::Exact, None));
        return score;
    }

    if depth == 0 {
        let score = quiescence(board, turn, castling_rights, en_passant, alpha, beta, 3, ply);
        with_tt(|tt| tt.store(hash, depth as u8, score, TTFlag::Exact, None));
        return score;
    }

    if !check && ply == 0 && moves.len() == 1 {
        return alpha;
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
            with_tt(|tt| tt.store(hash, depth as u8, score, TTFlag::Beta, best_move));
            return beta;
        }
        if score > alpha {
            alpha = score;
            flag = TTFlag::Exact;
        }
    }

    with_tt(|tt| tt.store(hash, depth as u8, best_score, flag, best_move));
    best_score
}

pub fn find_best_move(
    board: &Board,
    turn: Color,
    castling_rights: CastlingRights,
    en_passant: Option<Square>,
    limits: (Option<u32>, Option<u64>),
) -> SearchResult {
    let moves = legal_moves(board, turn, castling_rights, en_passant);
    if moves.is_empty() {
        return SearchResult { move_: None, score: 0, depth: 0, nodes: 0 };
    }

    let max_depth = limits.0.unwrap_or(64);
    let mut best_move = moves[0];
    let mut best_score = -INF;

    with_tt(|tt| tt.clear());

    for depth in 1..=max_depth {
        let mut alpha = -INF;
        let beta = INF;
        let ordered = order_moves(&moves);

        for mv in &ordered {
            let (next_board, next_turn, next_cr, next_ep) =
                apply_engine_move(board, turn, castling_rights, en_passant, *mv);
            let score = -alpha_beta(
                &next_board, next_turn, next_cr, next_ep,
                depth as i32 - 1, 1, -beta, -alpha, false,
            );
            if score > alpha {
                alpha = score;
                best_move = *mv;
            }
        }
        best_score = alpha;

        if alpha.abs() >= MATE_SCORE - 64 { break; }
    }

    SearchResult { move_: Some(best_move), score: best_score, depth: max_depth, nodes: 0 }
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
