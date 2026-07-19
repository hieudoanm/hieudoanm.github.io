use crate::core::board::find_king;
use crate::core::types::{Board, Color, PieceType, Square};
use crate::core::utils::{file_of, rank_of, square};

const PAWN_VALUE: i32 = 100;
const KNIGHT_VALUE: i32 = 320;
const BISHOP_VALUE: i32 = 330;
const ROOK_VALUE: i32 = 500;
const QUEEN_VALUE: i32 = 900;

const PAWN_TABLE: [i32; 64] = [
  0, 0, 0, 0, 0, 0, 0, 0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
  5, 5, 10, 27, 27, 10, 5, 5,
  0, 0, 0, 25, 25, 0, 0, 0,
  5, -5, -10, 0, 0, -10, -5, 5,
  5, 10, 10, -25, -25, 10, 10, 5,
  0, 0, 0, 0, 0, 0, 0, 0,
];

const KNIGHT_TABLE: [i32; 64] = [
  -50, -40, -30, -30, -30, -30, -40, -50,
  -40, -20, 0, 0, 0, 0, -20, -40,
  -30, 0, 10, 15, 15, 10, 0, -30,
  -30, 5, 15, 20, 20, 15, 5, -30,
  -30, 0, 15, 20, 20, 15, 0, -30,
  -30, 5, 10, 15, 15, 10, 5, -30,
  -40, -20, 0, 5, 5, 0, -20, -40,
  -50, -40, -30, -30, -30, -30, -40, -50,
];

const BISHOP_TABLE: [i32; 64] = [
  -20, -10, -10, -10, -10, -10, -10, -20,
  -10, 0, 0, 0, 0, 0, 0, -10,
  -10, 0, 5, 10, 10, 5, 0, -10,
  -10, 5, 5, 10, 10, 5, 5, -10,
  -10, 0, 10, 10, 10, 10, 0, -10,
  -10, 10, 10, 10, 10, 10, 10, -10,
  -10, 5, 0, 0, 0, 0, 5, -10,
  -20, -10, -10, -10, -10, -10, -10, -20,
];

const ROOK_TABLE: [i32; 64] = [
  0, 0, 0, 0, 0, 0, 0, 0,
  5, 10, 10, 10, 10, 10, 10, 5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  0, 0, 0, 5, 5, 0, 0, 0,
];

const QUEEN_TABLE: [i32; 64] = [
  -20, -10, -10, -5, -5, -10, -10, -20,
  -10, 0, 0, 0, 0, 0, 0, -10,
  -10, 0, 5, 5, 5, 5, 0, -10,
  -5, 0, 5, 5, 5, 5, 0, -5,
  0, 0, 5, 5, 5, 5, 0, -5,
  -10, 5, 5, 5, 5, 5, 0, -10,
  -10, 0, 5, 0, 0, 0, 0, -10,
  -20, -10, -10, -5, -5, -10, -10, -20,
];

const KING_TABLE: [i32; 64] = [
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -20, -30, -30, -40, -40, -30, -30, -20,
  -10, -20, -20, -20, -20, -20, -20, -10,
  20, 20, 0, 0, 0, 0, 20, 20,
  20, 30, 10, 0, 0, 10, 30, 20,
];

fn pst_for(piece_type: PieceType) -> &'static [i32; 64] {
    match piece_type {
        PieceType::Pawn => &PAWN_TABLE,
        PieceType::Knight => &KNIGHT_TABLE,
        PieceType::Bishop => &BISHOP_TABLE,
        PieceType::Rook => &ROOK_TABLE,
        PieceType::Queen => &QUEEN_TABLE,
        PieceType::King => &KING_TABLE,
    }
}

fn piece_value(pt: PieceType) -> i32 {
    match pt {
        PieceType::Pawn => PAWN_VALUE,
        PieceType::Knight => KNIGHT_VALUE,
        PieceType::Bishop => BISHOP_VALUE,
        PieceType::Rook => ROOK_VALUE,
        PieceType::Queen => QUEEN_VALUE,
        PieceType::King => 0,
    }
}

fn index_for_color(sq: Square, color: Color) -> Square {
    match color {
        Color::White => sq,
        Color::Black => 63 - sq,
    }
}

fn material_score(board: &Board, color: Color) -> i32 {
    let mut score = 0;
    for sq in 0..64u8 {
        if let Some(piece) = board[sq as usize] {
            if piece.color == color {
                score += piece_value(piece.piece_type);
            }
        }
    }
    score
}

fn pst_score(board: &Board, color: Color) -> i32 {
    let mut score = 0;
    for sq in 0..64u8 {
        if let Some(piece) = board[sq as usize] {
            if piece.color == color {
                score += pst_for(piece.piece_type)[index_for_color(sq, color) as usize];
            }
        }
    }
    score
}

fn doubled_pawn_penalty(board: &Board, color: Color) -> i32 {
    let mut penalty = 0;
    for f in 0..8u8 {
        let mut count = 0;
        for r in 0..8u8 {
            let sq = match color {
                Color::White => r * 8 + f,
                Color::Black => (7 - r) * 8 + f,
            };
            if let Some(piece) = board[sq as usize] {
                if piece.color == color && piece.piece_type == PieceType::Pawn {
                    count += 1;
                }
            }
        }
        if count > 1 {
            penalty += (count - 1) * 20;
        }
    }
    penalty
}

fn isolated_pawn_penalty(board: &Board, color: Color) -> i32 {
    let mut penalty = 0;
    for sq in 0..64u8 {
        let piece = board[sq as usize];
        if piece.is_none() || piece.unwrap().color != color || piece.unwrap().piece_type != PieceType::Pawn {
            continue;
        }
        let f = file_of(sq);
        let left = if f > 0 { Some(f - 1) } else { None };
        let right = if f < 7 { Some(f + 1) } else { None };
        let mut has_neighbor = false;
        for r in 0..8u8 {
            for nf in [left, right].iter().flatten() {
                let nsq = match color {
                    Color::White => r * 8 + nf,
                    Color::Black => (7 - r) * 8 + nf,
                };
                if let Some(np) = board[nsq as usize] {
                    if np.color == color && np.piece_type == PieceType::Pawn {
                        has_neighbor = true;
                    }
                }
            }
        }
        if !has_neighbor {
            penalty += 20;
        }
    }
    penalty
}

fn bishop_pair_bonus(board: &Board, color: Color) -> i32 {
    let mut count = 0;
    for sq in 0..64u8 {
        if let Some(piece) = board[sq as usize] {
            if piece.color == color && piece.piece_type == PieceType::Bishop {
                count += 1;
            }
        }
    }
    if count >= 2 { 30 } else { 0 }
}

fn passed_pawn_bonus(board: &Board, color: Color) -> i32 {
    let mut bonus = 0;
    let (forward, _last) = match color {
        Color::White => (1, 7),
        Color::Black => (-1, 0),
    };
    for sq in 0..64u8 {
        let piece = board[sq as usize];
        if piece.is_none() || piece.unwrap().color != color || piece.unwrap().piece_type != PieceType::Pawn {
            continue;
        }
        let f = file_of(sq) as i8;
        let r = rank_of(sq) as i8;
        let mut passed = true;
        for df in [-1, 0, 1] {
            let nf = f + df;
            if !(0..8).contains(&nf) { continue; }
            for dr in 1..=7 {
                let nr = r + forward * dr;
                if !(0..8).contains(&nr) { break; }
                let nsq = square(nr as u8, nf as u8);
                if let Some(p) = board[nsq as usize] {
                    if p.piece_type == PieceType::Pawn && p.color != color {
                        passed = false;
                        break;
                    }
                }
            }
            if !passed { break; }
        }
        if passed {
            bonus += match color {
                Color::White => (r * 10) as i32,
                Color::Black => ((7 - r) * 10) as i32,
            };
        }
    }
    bonus
}

fn king_safety_score(board: &Board, color: Color) -> i32 {
    let king_sq = match find_king(board, color) {
        Some(sq) => sq,
        None => return 0,
    };
    let kf = file_of(king_sq) as i8;
    let kr = rank_of(king_sq) as i8;
    if (color == Color::White && kr != 0) || (color == Color::Black && kr != 7) {
        return 0;
    }
    let (shield_rank, _) = match color {
        Color::White => (1, 0),
        Color::Black => (6, 7),
    };
    let mut shield = 0;
    for df in [-1, 0, 1] {
        let nf = kf + df;
        if !(0..8).contains(&nf) { continue; }
        let nsq = square(shield_rank as u8, nf as u8);
        if let Some(p) = board[nsq as usize] {
            if p.color == color && p.piece_type == PieceType::Pawn {
                shield += 15;
            }
        }
    }
    shield
}

fn rook_open_file_bonus(board: &Board, color: Color) -> i32 {
    let mut bonus = 0;
    for sq in 0..64u8 {
        let piece = board[sq as usize];
        if piece.is_none() || piece.unwrap().color != color || piece.unwrap().piece_type != PieceType::Rook {
            continue;
        }
        let f = file_of(sq);
        let mut my_pawn = false;
        let mut any_pawn = false;
        for r in 0..8u8 {
            if let Some(p) = board[square(r, f) as usize] {
                if p.piece_type == PieceType::Pawn {
                    any_pawn = true;
                    if p.color == color { my_pawn = true; }
                }
            }
        }
        if !any_pawn {
            bonus += 20;
        } else if !my_pawn {
            bonus += 10;
        }
    }
    bonus
}

fn evaluate(board: &Board, color: Color, opponent: Color) -> i32 {
    let my_material = material_score(board, color);
    let opp_material = material_score(board, opponent);
    let my_pst = pst_score(board, color);
    let opp_pst = pst_score(board, opponent);
    let my_doubled = doubled_pawn_penalty(board, color);
    let opp_doubled = doubled_pawn_penalty(board, opponent);
    let my_isolated = isolated_pawn_penalty(board, color);
    let opp_isolated = isolated_pawn_penalty(board, opponent);
    let my_bishop_pair = bishop_pair_bonus(board, color);
    let opp_bishop_pair = bishop_pair_bonus(board, opponent);
    let my_passed = passed_pawn_bonus(board, color);
    let opp_passed = passed_pawn_bonus(board, opponent);
    let my_king_safety = king_safety_score(board, color);
    let opp_king_safety = king_safety_score(board, opponent);
    let my_rook_open = rook_open_file_bonus(board, color);
    let opp_rook_open = rook_open_file_bonus(board, opponent);

    (my_material - opp_material)
        + (my_pst - opp_pst)
        - (my_doubled - opp_doubled)
        - (my_isolated - opp_isolated)
        + (my_bishop_pair - opp_bishop_pair)
        + (my_passed - opp_passed)
        + (my_king_safety - opp_king_safety)
        + (my_rook_open - opp_rook_open)
}

pub fn evaluate_board(board: &Board, turn: Color) -> i32 {
    let opponent = turn.opposite();
    evaluate(board, turn, opponent)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::core::board::board_from_fen;

    #[test]
    fn evaluates_starting_position_as_roughly_equal() {
        let board = board_from_fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
        let score = evaluate_board(&board, Color::White);
        assert!(score.abs() < 50);
    }

    #[test]
    fn prefers_white_up_a_rook() {
        let mut board = board_from_fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
        board[0] = None;
        let white_score = evaluate_board(&board, Color::White);
        let black_score = evaluate_board(&board, Color::Black);
        assert!(white_score < black_score);
    }

    #[test]
    fn evaluates_black_up_a_queen_favorably_for_black() {
        let mut board = board_from_fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
        board[3] = None;
        let score = evaluate_board(&board, Color::White);
        assert!(score < -700);
    }
}
