use crate::core::board::find_king;
use crate::core::types::{Board, Color, PieceType, Square};
use crate::core::utils::{file_of, rank_of};

const KNIGHT_OFFSETS: [i8; 8] = [-17, -15, -10, -6, 6, 10, 15, 17];

const BISHOP_DIRECTIONS: [i8; 4] = [-9, -7, 7, 9];
const ROOK_DIRECTIONS: [i8; 4] = [-8, -1, 1, 8];
const KING_OFFSETS: [i8; 8] = [-9, -8, -7, -1, 1, 7, 8, 9];

pub fn is_square_attacked(board: &Board, sq: Square, by_color: Color) -> bool {
    let r = rank_of(sq) as i8;
    let f = file_of(sq) as i8;

    // Knights
    for &offset in &KNIGHT_OFFSETS {
        let target = sq as i8 + offset;
        if !(0..64).contains(&target) {
            continue;
        }
        let target = target as u8;
        let r_diff = (rank_of(target) as i8 - r).abs();
        let f_diff = (file_of(target) as i8 - f).abs();
        if (r_diff == 2 && f_diff == 1) || (r_diff == 1 && f_diff == 2) {
            if let Some(piece) = board[target as usize] {
                if piece.color == by_color && piece.piece_type == PieceType::Knight {
                    return true;
                }
            }
        }
    }

    // Pawns
    let (pr, pf) = if by_color == Color::White {
        (-1, -1)
    } else {
        (1, 1)
    };
    for df in [-1, 1] {
        let tr = r + pr * pf;
        let tf = f + df;
        if (0..8).contains(&tr) && (0..8).contains(&tf) {
            let target = (tr * 8 + tf) as u8;
            if let Some(piece) = board[target as usize] {
                if piece.color == by_color && piece.piece_type == PieceType::Pawn {
                    return true;
                }
            }
        }
    }

    // King
    for &offset in &KING_OFFSETS {
        let target = sq as i8 + offset;
        if !(0..64).contains(&target) {
            continue;
        }
        let target = target as u8;
        let r_diff = (rank_of(target) as i8 - r).abs();
        let f_diff = (file_of(target) as i8 - f).abs();
        if r_diff <= 1 && f_diff <= 1 {
            if let Some(piece) = board[target as usize] {
                if piece.color == by_color && piece.piece_type == PieceType::King {
                    return true;
                }
            }
        }
    }

    // Bishops/Queens (diagonal)
    for &offset in &BISHOP_DIRECTIONS {
        let mut target = sq as i8 + offset;
        while (0..64).contains(&target) {
            let t = target as u8;
            let r_diff = (rank_of(t) as i8 - r).abs();
            let f_diff = (file_of(t) as i8 - f).abs();
            if r_diff != f_diff {
                break;
            }
            if let Some(piece) = board[t as usize] {
                if piece.color == by_color
                    && (piece.piece_type == PieceType::Bishop
                        || piece.piece_type == PieceType::Queen)
                {
                    return true;
                }
                break;
            }
            target += offset;
        }
    }

    // Rooks/Queens (orthogonal)
    for &offset in &ROOK_DIRECTIONS {
        let mut target = sq as i8 + offset;
        while (0..64).contains(&target) {
            let t = target as u8;
            let r_diff = (rank_of(t) as i8 - r).abs();
            let f_diff = (file_of(t) as i8 - f).abs();
            if r_diff > 0 && f_diff > 0 {
                break;
            }
            if let Some(piece) = board[t as usize] {
                if piece.color == by_color
                    && (piece.piece_type == PieceType::Rook || piece.piece_type == PieceType::Queen)
                {
                    return true;
                }
                break;
            }
            target += offset;
        }
    }

    false
}

pub fn is_in_check(board: &Board, color: Color) -> bool {
    if let Some(king_sq) = find_king(board, color) {
        is_square_attacked(board, king_sq, color.opposite())
    } else {
        false
    }
}
