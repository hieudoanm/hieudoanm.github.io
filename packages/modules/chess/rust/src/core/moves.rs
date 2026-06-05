use crate::core::attack::is_square_attacked;
use crate::core::board::{clone_board, find_king, get_piece, put_piece, remove_piece};
use crate::core::types::{Board, CastlingRights, Color, Move, Piece, PieceType, Square};
use crate::core::utils::{file_of, rank_of, square};

const KNIGHT_OFFSETS: [i8; 8] = [-17, -15, -10, -6, 6, 10, 15, 17];
const BISHOP_DIRECTIONS: [i8; 4] = [-9, -7, 7, 9];
const ROOK_DIRECTIONS: [i8; 4] = [-8, -1, 1, 8];
const KING_OFFSETS: [i8; 8] = [-9, -8, -7, -1, 1, 7, 8, 9];

fn apply_move_to_board(board: &mut Board, mv: Move) {
    let piece = get_piece(board, mv.from);
    if piece.is_none() {
        return;
    }
    let piece = piece.unwrap();

    remove_piece(board, mv.from);

    if mv.captured.is_some() {
        if mv.to == mv.from {
            return;
        }
        remove_piece(board, mv.to);
    }

    if let Some(promo) = mv.promotion {
        put_piece(board, Piece::new(piece.color, promo), mv.to);
    } else {
        put_piece(board, piece, mv.to);
    }

    let file_diff = (file_of(mv.to) as i8 - file_of(mv.from) as i8).abs();

    // Castling: move rook
    if piece.piece_type == PieceType::King && file_diff == 2 {
        let rook_from = if file_of(mv.to) > file_of(mv.from) {
            mv.to + 1
        } else {
            mv.to - 2
        };
        let rook_to = if file_of(mv.to) > file_of(mv.from) {
            mv.to - 1
        } else {
            mv.to + 1
        };
        let rook = get_piece(board, rook_from);
        if let Some(r) = rook {
            remove_piece(board, rook_from);
            put_piece(board, r, rook_to);
        }
    }

    // En passant
    if piece.piece_type == PieceType::Pawn && file_diff != 0 && mv.captured.is_none() {
        let ep_sq = square(rank_of(mv.from), file_of(mv.to));
        let captured_pawn = get_piece(board, ep_sq);
        if captured_pawn.is_some() {
            remove_piece(board, ep_sq);
        }
    }
}

pub fn apply_move(board: &mut Board, mv: Move) {
    apply_move_to_board(board, mv);
}

pub fn generate_pawn_moves(
    board: &Board,
    sq: Square,
    color: Color,
    en_passant: Option<Square>,
) -> Vec<Move> {
    let mut moves = Vec::new();
    let r = rank_of(sq) as i8;
    let f = file_of(sq) as i8;
    let (dir, start_rank, promo_rank) = match color {
        Color::White => (1, 1, 7),
        Color::Black => (-1, 6, 0),
    };

    // Single advance
    let tr = r + dir;
    if (0..8).contains(&tr) {
        let target = square(tr as u8, f as u8);
        if get_piece(board, target).is_none() {
            if tr == promo_rank {
                for &pt in &[
                    PieceType::Queen,
                    PieceType::Rook,
                    PieceType::Bishop,
                    PieceType::Knight,
                ] {
                    moves.push(Move {
                        from: sq,
                        to: target,
                        promotion: Some(pt),
                        captured: None,
                    });
                }
            } else {
                moves.push(Move {
                    from: sq,
                    to: target,
                    promotion: None,
                    captured: None,
                });
            }

            // Double advance from starting rank
            if r == start_rank {
                let tr2 = tr + dir;
                let target2 = square(tr2 as u8, f as u8);
                if get_piece(board, target2).is_none() {
                    moves.push(Move {
                        from: sq,
                        to: target2,
                        promotion: None,
                        captured: None,
                    });
                }
            }
        }
    }

    // Captures
    for df in [-1, 1] {
        let tr = r + dir;
        let tf = f + df;
        if (0..8).contains(&tr) && (0..8).contains(&tf) {
            let target = square(tr as u8, tf as u8);
            // Normal capture
            if let Some(captured) = get_piece(board, target) {
                if captured.color != color {
                    if tr == promo_rank {
                        for &pt in &[
                            PieceType::Queen,
                            PieceType::Rook,
                            PieceType::Bishop,
                            PieceType::Knight,
                        ] {
                            moves.push(Move {
                                from: sq,
                                to: target,
                                promotion: Some(pt),
                                captured: Some(captured),
                            });
                        }
                    } else {
                        moves.push(Move {
                            from: sq,
                            to: target,
                            promotion: None,
                            captured: Some(captured),
                        });
                    }
                }
            }
            // En passant
            if let Some(ep) = en_passant {
                if target == ep && get_piece(board, target).is_none() {
                    let ep_captured = get_piece(board, square(rank_of(sq), tf as u8));
                    moves.push(Move {
                        from: sq,
                        to: target,
                        promotion: None,
                        captured: ep_captured,
                    });
                }
            }
        }
    }

    moves
}

pub fn generate_knight_moves(board: &Board, sq: Square, color: Color) -> Vec<Move> {
    let mut moves = Vec::new();
    let r = rank_of(sq) as i8;
    let f = file_of(sq) as i8;

    for &offset in &KNIGHT_OFFSETS {
        let target = sq as i8 + offset;
        if !(0..64).contains(&target) {
            continue;
        }
        let target = target as u8;
        let r_diff = (rank_of(target) as i8 - r).abs();
        let f_diff = (file_of(target) as i8 - f).abs();
        if (r_diff == 2 && f_diff == 1) || (r_diff == 1 && f_diff == 2) {
            if let Some(piece) = get_piece(board, target) {
                if piece.color != color {
                    moves.push(Move {
                        from: sq,
                        to: target,
                        promotion: None,
                        captured: Some(piece),
                    });
                }
            } else {
                moves.push(Move {
                    from: sq,
                    to: target,
                    promotion: None,
                    captured: None,
                });
            }
        }
    }

    moves
}

pub fn generate_sliding_moves(
    board: &Board,
    sq: Square,
    color: Color,
    directions: &[i8],
) -> Vec<Move> {
    let mut moves = Vec::new();
    let r = rank_of(sq) as i8;
    let f = file_of(sq) as i8;

    for &dir in directions {
        let mut target = sq as i16 + dir as i16;
        while (0..64).contains(&target) {
            let t = target as u8;
            let r_diff = (rank_of(t) as i8 - r).abs();
            let f_diff = (file_of(t) as i8 - f).abs();
            let dir_abs = dir.abs();
            let is_valid = match dir_abs {
                7 | 9 => r_diff == f_diff,
                1 => r_diff == 0 && f_diff > 0,
                8 => f_diff == 0 && r_diff > 0,
                _ => false,
            };
            if !is_valid {
                break;
            }
            if let Some(piece) = get_piece(board, t) {
                if piece.color != color {
                    moves.push(Move {
                        from: sq,
                        to: t,
                        promotion: None,
                        captured: Some(piece),
                    });
                }
                break;
            }
            moves.push(Move {
                from: sq,
                to: t,
                promotion: None,
                captured: None,
            });
            target += dir as i16;
        }
    }

    moves
}

pub fn generate_king_moves(
    board: &Board,
    sq: Square,
    color: Color,
    castling_rights: CastlingRights,
) -> Vec<Move> {
    let mut moves = Vec::new();
    let r = rank_of(sq) as i8;
    let f = file_of(sq) as i8;

    for &offset in &KING_OFFSETS {
        let target = sq as i8 + offset;
        if !(0..64).contains(&target) {
            continue;
        }
        let target = target as u8;
        let r_diff = (rank_of(target) as i8 - r).abs();
        let f_diff = (file_of(target) as i8 - f).abs();
        if r_diff <= 1 && f_diff <= 1 {
            if let Some(piece) = get_piece(board, target) {
                if piece.color != color {
                    moves.push(Move {
                        from: sq,
                        to: target,
                        promotion: None,
                        captured: Some(piece),
                    });
                }
            } else {
                moves.push(Move {
                    from: sq,
                    to: target,
                    promotion: None,
                    captured: None,
                });
            }
        }
    }

    // Castling
    if is_square_attacked(board, sq, color.opposite()) {
        return moves;
    }

    let back_rank: u8 = if color == Color::White { 0 } else { 7 };

    if sq == square(back_rank, 4) {
        // Kingside
        let (ks_rights, _) = match color {
            Color::White => (castling_rights.K, square(back_rank, 7)),
            Color::Black => (castling_rights.k, square(back_rank, 7)),
        };
        if ks_rights
            && get_piece(board, square(back_rank, 5)).is_none()
            && get_piece(board, square(back_rank, 6)).is_none()
            && !is_square_attacked(board, square(back_rank, 5), color.opposite())
            && !is_square_attacked(board, square(back_rank, 6), color.opposite())
        {
            moves.push(Move {
                from: sq,
                to: square(back_rank, 6),
                promotion: None,
                captured: None,
            });
        }

        // Queenside
        let (qs_rights, _) = match color {
            Color::White => (castling_rights.Q, square(back_rank, 0)),
            Color::Black => (castling_rights.q, square(back_rank, 0)),
        };
        if qs_rights
            && get_piece(board, square(back_rank, 3)).is_none()
            && get_piece(board, square(back_rank, 2)).is_none()
            && get_piece(board, square(back_rank, 1)).is_none()
            && !is_square_attacked(board, square(back_rank, 3), color.opposite())
            && !is_square_attacked(board, square(back_rank, 2), color.opposite())
        {
            moves.push(Move {
                from: sq,
                to: square(back_rank, 2),
                promotion: None,
                captured: None,
            });
        }
    }

    moves
}

pub fn generate_pseudo_legal_moves(
    board: &Board,
    turn: Color,
    castling_rights: CastlingRights,
    en_passant: Option<Square>,
) -> Vec<Move> {
    let mut moves = Vec::new();

    for sq in 0..64u8 {
        if let Some(piece) = get_piece(board, sq) {
            if piece.color != turn {
                continue;
            }
            match piece.piece_type {
                PieceType::Pawn => {
                    moves.extend(generate_pawn_moves(board, sq, turn, en_passant));
                }
                PieceType::Knight => {
                    moves.extend(generate_knight_moves(board, sq, turn));
                }
                PieceType::Bishop => {
                    moves.extend(generate_sliding_moves(board, sq, turn, &BISHOP_DIRECTIONS));
                }
                PieceType::Rook => {
                    moves.extend(generate_sliding_moves(board, sq, turn, &ROOK_DIRECTIONS));
                }
                PieceType::Queen => {
                    let mut queen_dirs = Vec::from(&BISHOP_DIRECTIONS[..]);
                    queen_dirs.extend_from_slice(&ROOK_DIRECTIONS);
                    moves.extend(generate_sliding_moves(board, sq, turn, &queen_dirs));
                }
                PieceType::King => {
                    moves.extend(generate_king_moves(board, sq, turn, castling_rights));
                }
            }
        }
    }

    moves
}

pub fn legal_moves(
    board: &Board,
    turn: Color,
    castling_rights: CastlingRights,
    en_passant: Option<Square>,
) -> Vec<Move> {
    let pseudo = generate_pseudo_legal_moves(board, turn, castling_rights, en_passant);
    let opponent = turn.opposite();

    pseudo
        .into_iter()
        .filter(|mv| {
            let mut test_board = clone_board(board);
            apply_move_to_board(&mut test_board, *mv);
            let in_check = find_king(&test_board, turn)
                .map(|ks| is_square_attacked(&test_board, ks, opponent))
                .unwrap_or(false);
            let king_exists = find_king(&test_board, opponent).is_some();
            !in_check && king_exists
        })
        .collect()
}
