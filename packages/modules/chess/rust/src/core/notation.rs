use crate::core::attack::is_in_check;
use crate::core::board::{board_from_fen, board_to_fen};
use crate::core::moves::{generate_pseudo_legal_moves, legal_moves};
use crate::core::types::{Board, CastlingRights, Color, GameState, Move, PieceType, Square};
use crate::core::utils::{file_of, parse_square, rank_of, square, square_name};

pub fn parse_fen(fen: &str) -> GameState {
    let parts: Vec<&str> = fen.split_whitespace().collect();
    let board = board_from_fen(parts[0]);
    let turn = if parts.get(1) == Some(&"b") {
        Color::Black
    } else {
        Color::White
    };
    let mut castling_rights = CastlingRights::none();
    if let Some(castling_str) = parts.get(2) {
        if *castling_str != "-" {
            for ch in castling_str.chars() {
                match ch {
                    'K' => castling_rights.K = true,
                    'Q' => castling_rights.Q = true,
                    'k' => castling_rights.k = true,
                    'q' => castling_rights.q = true,
                    _ => {}
                }
            }
        }
    }
    let en_passant = parts
        .get(3)
        .and_then(|s| if *s == "-" { None } else { parse_square(s) });
    let half_move_clock = parts
        .get(4)
        .and_then(|s| s.parse::<u32>().ok())
        .unwrap_or(0);
    let full_move_number = parts
        .get(5)
        .and_then(|s| s.parse::<u32>().ok())
        .unwrap_or(1);

    GameState {
        board,
        turn,
        castling_rights,
        en_passant,
        half_move_clock,
        full_move_number,
        history: Vec::new(),
        status: crate::types::GameStatus::Playing,
        result: crate::types::GameResult::Ongoing,
        in_check: is_in_check(&board, turn),
    }
}

pub fn stringify_fen(state: &GameState) -> String {
    let fen = board_to_fen(&state.board);
    let cr = &state.castling_rights;
    let mut castling = String::new();
    if cr.K {
        castling.push('K');
    }
    if cr.Q {
        castling.push('Q');
    }
    if cr.k {
        castling.push('k');
    }
    if cr.q {
        castling.push('q');
    }
    let ep = match state.en_passant {
        Some(sq) => square_name(sq),
        None => "-".to_string(),
    };
    format!(
        "{} {} {} {} {} {}",
        fen,
        state.turn.to_char(),
        if castling.is_empty() { "-" } else { &castling },
        ep,
        state.half_move_clock,
        state.full_move_number
    )
}

pub fn move_to_uci(mv: &Move) -> String {
    let mut result = square_name(mv.from) + &square_name(mv.to);
    if let Some(promo) = mv.promotion {
        result.push(promo.to_char());
    }
    result
}

pub fn parse_uci(uci: &str) -> Option<Move> {
    if uci.len() < 4 {
        return None;
    }
    let from = parse_square(&uci[0..2])?;
    let to = parse_square(&uci[2..4])?;
    let promotion = uci.chars().nth(4).and_then(|c| match c {
        'q' | 'r' | 'b' | 'n' => Some(PieceType::from_char(c).unwrap()),
        _ => None,
    });
    Some(Move {
        from,
        to,
        promotion,
        captured: None,
    })
}

fn piece_to_letter(pt: PieceType) -> char {
    match pt {
        PieceType::Pawn => ' ',
        PieceType::Knight => 'N',
        PieceType::Bishop => 'B',
        PieceType::Rook => 'R',
        PieceType::Queen => 'Q',
        PieceType::King => 'K',
    }
}

pub fn move_to_san(
    board: &Board,
    mv: &Move,
    turn: Color,
    castling_rights: CastlingRights,
    en_passant: Option<Square>,
) -> String {
    let piece = board[mv.from as usize].unwrap();
    let file_diff = (file_of(mv.to) as i8 - file_of(mv.from) as i8).abs();

    if piece.piece_type == PieceType::King && file_diff == 2 {
        return if file_of(mv.to) > file_of(mv.from) {
            "O-O".to_string()
        } else {
            "O-O-O".to_string()
        };
    }

    if piece.piece_type == PieceType::Pawn {
        let capture = file_diff != 0 || mv.captured.is_some();
        let promo = match mv.promotion {
            Some(pt) => format!("={}", pt.to_upper_char()),
            None => String::new(),
        };
        let file = if capture {
            square_name(mv.from).chars().next().unwrap().to_string()
        } else {
            String::new()
        };
        let cap_ind = if capture { "x" } else { "" };
        return format!("{}{}{}{}", file, cap_ind, square_name(mv.to), promo);
    }

    let letter = piece_to_letter(piece.piece_type);

    let pseudo = generate_pseudo_legal_moves(board, turn, castling_rights, en_passant);
    let legal = legal_moves(board, turn, castling_rights, en_passant);
    let others: Vec<&Move> = pseudo
        .iter()
        .filter(|m| {
            let p = board[m.from as usize];
            p.is_some_and(|p| {
                p.piece_type == piece.piece_type
                    && m.to == mv.to
                    && m.from != mv.from
                    && legal.iter().any(|lm| lm.from == m.from && lm.to == m.to)
            })
        })
        .collect();

    let file_letter = || square_name(mv.from).chars().next().unwrap().to_string();

    let disambig = if others.is_empty() {
        String::new()
    } else if others.iter().any(|m| file_of(m.from) == file_of(mv.from)) {
        square_name(mv.from)
    } else {
        file_letter()
    };

    let capture = if mv.captured.is_some() { "x" } else { "" };
    format!("{}{}{}{}", letter, disambig, capture, square_name(mv.to))
}

pub fn parse_san(
    san: &str,
    board: &Board,
    turn: Color,
    castling_rights: CastlingRights,
    en_passant: Option<Square>,
) -> Option<Move> {
    let moves = legal_moves(board, turn, castling_rights, en_passant);

    let cleaned = san.replace(['+', '#'], "");
    let has_capture = cleaned.contains('x');
    let has_promo = cleaned.contains('=');

    if cleaned == "O-O" || cleaned == "O-O-O" {
        let rank: u8 = if turn == Color::White { 0 } else { 7 };
        let king_file: u8 = if cleaned == "O-O" { 6 } else { 2 };
        return moves.into_iter().find(|m| {
            let p = board[m.from as usize];
            p.is_some_and(|p| p.piece_type == PieceType::King && m.to == square(rank, king_file))
        });
    }

    let (main_part, promotion_type) = if has_promo {
        let parts: Vec<&str> = cleaned.split('=').collect();
        (
            parts[0].to_string(),
            parts
                .get(1)
                .and_then(|s| PieceType::from_char(s.chars().next()?)),
        )
    } else {
        (cleaned, None)
    };

    let mut piece_type = PieceType::Pawn;
    let mut disambig_file: Option<u8> = None;
    let mut disambig_rank: Option<u8> = None;
    let mut target_sq: Option<Square> = None;

    let chars: Vec<char> = main_part.chars().collect();
    let first = chars.first()?;

    if first.is_uppercase() {
        piece_type = match first {
            'K' => PieceType::King,
            'Q' => PieceType::Queen,
            'R' => PieceType::Rook,
            'B' => PieceType::Bishop,
            'N' => PieceType::Knight,
            _ => PieceType::Pawn,
        };
    }

    let without_piece = if first.is_uppercase() {
        main_part.chars().skip(1).collect::<String>()
    } else {
        main_part
    };
    let move_str: String = without_piece.replace('x', "");

    if move_str.len() >= 2 {
        let dest_str = &move_str[move_str.len() - 2..];
        target_sq = parse_square(dest_str);

        if move_str.len() > 2 {
            let disambig_str = &move_str[..move_str.len() - 2];
            if disambig_str.len() == 1 {
                let d = disambig_str.chars().next().unwrap();
                if d.is_ascii_lowercase() {
                    if let Some(f) = "abcdefgh".find(d) {
                        disambig_file = Some(f as u8);
                    }
                } else {
                    disambig_rank = Some(d.to_digit(10).unwrap_or(0) as u8 - 1);
                }
            } else if disambig_str.len() >= 2 {
                if let Some(sq) = parse_square(disambig_str) {
                    disambig_file = Some(file_of(sq));
                    disambig_rank = Some(rank_of(sq));
                }
            }
        }
    }

    let target_sq = target_sq?;

    moves.into_iter().find(|m| {
        let p = board[m.from as usize];
        if p.is_none_or(|p| p.piece_type != piece_type) {
            return false;
        }
        if m.to != target_sq {
            return false;
        }
        if let Some(promo) = promotion_type {
            if m.promotion != Some(promo) {
                return false;
            }
        }
        if has_capture && m.captured.is_none() {
            return false;
        }
        if let Some(df) = disambig_file {
            if file_of(m.from) != df {
                return false;
            }
        }
        if let Some(dr) = disambig_rank {
            if rank_of(m.from) != dr {
                return false;
            }
        }
        true
    })
}
