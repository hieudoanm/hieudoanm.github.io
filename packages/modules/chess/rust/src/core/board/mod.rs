use crate::core::types::{Board, Color, Piece, PieceType, Square};
use crate::core::utils::square;

pub fn empty_board() -> Board {
    [None; 64]
}

pub fn clone_board(board: &Board) -> Board {
    *board
}

pub fn put_piece(board: &mut Board, piece: Piece, sq: Square) {
    board[sq as usize] = Some(piece);
}

pub fn get_piece(board: &Board, sq: Square) -> Option<Piece> {
    board[sq as usize]
}

pub fn remove_piece(board: &mut Board, sq: Square) {
    board[sq as usize] = None;
}

pub fn find_king(board: &Board, color: Color) -> Option<Square> {
    for sq in 0..64u8 {
        if let Some(piece) = board[sq as usize] {
            if piece.color == color && piece.piece_type == PieceType::King {
                return Some(sq);
            }
        }
    }
    None
}

fn piece_from_char(ch: char) -> Option<Piece> {
    let piece_type = PieceType::from_char(ch)?;
    let color = if ch.is_uppercase() {
        Color::White
    } else {
        Color::Black
    };
    Some(Piece::new(color, piece_type))
}

pub fn board_from_fen(board_part: &str) -> Board {
    let mut board = empty_board();
    let rows: Vec<&str> = board_part.split('/').collect();
    for (r, row) in rows.iter().enumerate() {
        let mut f: u8 = 0;
        for ch in row.chars() {
            if ch.is_ascii_digit() {
                f += ch.to_digit(10).unwrap() as u8;
            } else {
                if let Some(piece) = piece_from_char(ch) {
                    board[square(7 - r as u8, f) as usize] = Some(piece);
                }
                f += 1;
            }
        }
    }
    board
}

pub fn board_to_fen(board: &Board) -> String {
    let mut fen = String::new();
    for r in (0..8).rev() {
        let mut empty: u8 = 0;
        for f in 0..8 {
            let sq = square(r, f);
            if let Some(piece) = board[sq as usize] {
                if empty > 0 {
                    fen.push((b'0' + empty) as char);
                    empty = 0;
                }
                let ch = piece.piece_type.to_char();
                if piece.color == Color::White {
                    fen.push(ch.to_uppercase().next().unwrap());
                } else {
                    fen.push(ch);
                }
            } else {
                empty += 1;
            }
        }
        if empty > 0 {
            fen.push((b'0' + empty) as char);
        }
        if r > 0 {
            fen.push('/');
        }
    }
    fen
}

pub const PIECE_VALUES: [u32; 6] = [100, 320, 330, 500, 900, 20000];

pub fn piece_value(piece_type: PieceType) -> u32 {
    PIECE_VALUES[piece_type as usize]
}

pub const PIECE_UNICODE: &[&str; 12] =
    &["♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟"];

pub fn piece_unicode(piece: Piece) -> &'static str {
    let idx = match piece.color {
        Color::White => piece.piece_type as usize,
        Color::Black => piece.piece_type as usize + 6,
    };
    PIECE_UNICODE[idx]
}
