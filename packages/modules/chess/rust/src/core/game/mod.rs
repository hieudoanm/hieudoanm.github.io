pub mod perft;

use crate::core::moves::attack::is_in_check;
use crate::core::board::clone_board;
use crate::core::moves::{apply_move, legal_moves};
use crate::core::notation::{parse_fen, stringify_fen};
use crate::core::types::{
    CastlingRights, Color, GameResult, GameState, GameStatus, HistoryEntry, Move, PieceType, Square,
};
use crate::core::utils::{file_of, rank_of, square};

pub const STARTING_FEN: &str = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

pub fn create_game(fen: Option<&str>) -> GameState {
    let fen = fen.unwrap_or(STARTING_FEN);
    let mut state = parse_fen(fen);
    state.status = GameStatus::Playing;
    state.result = GameResult::Ongoing;
    state
}

fn has_insufficient_material(board: &[Option<crate::core::types::Piece>; 64]) -> bool {
    let pieces: Vec<crate::core::types::Piece> = board.iter().filter_map(|&p| p).collect();

    if pieces.len() == 2 {
        return true;
    }

    if pieces.len() == 3 {
        let non_king = pieces
            .iter()
            .find(|p| p.piece_type != PieceType::King)
            .unwrap();
        if non_king.piece_type == PieceType::Bishop || non_king.piece_type == PieceType::Knight {
            return true;
        }
    }

    if pieces.len() == 4 {
        let bishops: Vec<&crate::core::types::Piece> = pieces
            .iter()
            .filter(|p| p.piece_type == PieceType::Bishop)
            .collect();
        if bishops.len() == 2 {
            let sq0 = pieces
                .iter()
                .position(|p| p.piece_type == PieceType::Bishop)
                .unwrap();
            let sq1 = pieces
                .iter()
                .rposition(|p| p.piece_type == PieceType::Bishop)
                .unwrap();
            let color0 = (rank_of(sq0 as u8) + file_of(sq0 as u8)) % 2;
            let color1 = (rank_of(sq1 as u8) + file_of(sq1 as u8)) % 2;
            if color0 == color1 {
                return true;
            }
        }
    }

    false
}

pub fn update_castling_rights(
    castling_rights: CastlingRights,
    mv: Move,
    board: &[Option<crate::core::types::Piece>; 64],
) -> CastlingRights {
    let mut new_rights = castling_rights;

    if mv.from == 4 || mv.to == 4 {
        new_rights.K = false;
        new_rights.Q = false;
    }
    if mv.from == 60 || mv.to == 60 {
        new_rights.K = false;
        new_rights.Q = false;
    }
    if mv.from == 7 || mv.to == 7 {
        new_rights.K = false;
    }
    if mv.from == 0 || mv.to == 0 {
        new_rights.Q = false;
    }
    if mv.from == 63 || mv.to == 63 {
        new_rights.k = false;
    }
    if mv.from == 56 || mv.to == 56 {
        new_rights.q = false;
    }

    if let Some(piece) = board[mv.from as usize] {
        if piece.piece_type == PieceType::King {
            if piece.color == Color::White {
                new_rights.K = false;
                new_rights.Q = false;
            } else {
                new_rights.k = false;
                new_rights.q = false;
            }
        }
        if piece.piece_type == PieceType::Rook {
            if mv.from == 7 {
                new_rights.K = false;
            }
            if mv.from == 0 {
                new_rights.Q = false;
            }
            if mv.from == 63 {
                new_rights.k = false;
            }
            if mv.from == 56 {
                new_rights.q = false;
            }
        }
    }

    new_rights
}

pub fn make_move(state: &GameState, mv: Move) -> GameState {
    let mut new_board = clone_board(&state.board);
    let piece = state.board[mv.from as usize].unwrap();

    apply_move(&mut new_board, mv);

    let captured_piece = mv.captured;

    let new_en_passant: Option<Square> = if piece.piece_type == PieceType::Pawn
        && (rank_of(mv.to) as i8 - rank_of(mv.from) as i8).abs() == 2
    {
        Some(square(
            (rank_of(mv.from) + rank_of(mv.to)) / 2,
            file_of(mv.from),
        ))
    } else {
        None
    };

    let new_castling_rights = update_castling_rights(state.castling_rights, mv, &state.board);

    let half_move_clock = if piece.piece_type == PieceType::Pawn || captured_piece.is_some() {
        0
    } else {
        state.half_move_clock + 1
    };

    let new_turn = state.turn.opposite();
    let full_move_number = if state.turn == Color::Black {
        state.full_move_number + 1
    } else {
        state.full_move_number
    };

    let state_before_fen = stringify_fen(state);

    let mut new_state = GameState {
        board: new_board,
        turn: new_turn,
        castling_rights: new_castling_rights,
        en_passant: new_en_passant,
        half_move_clock,
        full_move_number,
        history: {
            let mut h = state.history.clone();
            h.push(HistoryEntry {
                move_: mv,
                state_before: state_before_fen,
            });
            h
        },
        status: GameStatus::Playing,
        result: GameResult::Ongoing,
        in_check: false,
    };

    new_state.in_check = is_in_check(&new_state.board, new_turn);

    let legal = legal_moves(
        &new_state.board,
        new_turn,
        new_castling_rights,
        new_en_passant,
    );

    if legal.is_empty() {
        if new_state.in_check {
            new_state.status = GameStatus::Checkmate;
            new_state.result = if new_turn == Color::White {
                GameResult::BlackWins
            } else {
                GameResult::WhiteWins
            };
        } else {
            new_state.status = GameStatus::Stalemate;
            new_state.result = GameResult::Draw;
        }
    } else if new_state.half_move_clock >= 100 || has_insufficient_material(&new_state.board) {
        new_state.status = GameStatus::Draw;
        new_state.result = GameResult::Draw;
    }

    new_state
}

pub fn undo_move(state: &GameState) -> GameState {
    if state.history.is_empty() {
        return state.clone();
    }
    let prev = &state.history[state.history.len() - 1];
    parse_fen(&prev.state_before)
}

pub fn get_status_message(state: &GameState) -> String {
    match state.status {
        GameStatus::Checkmate => {
            format!(
                "Checkmate! {} wins.",
                if state.turn == Color::White {
                    "Black"
                } else {
                    "White"
                }
            )
        }
        GameStatus::Stalemate => "Stalemate — draw.".to_string(),
        GameStatus::Draw => "Draw.".to_string(),
        _ => {
            if state.in_check {
                "Check!".to_string()
            } else {
                "Playing.".to_string()
            }
        }
    }
}
