use std::collections::HashMap;

use crate::core::board::clone_board;
use crate::core::moves::{apply_move, legal_moves};
use crate::core::types::{Color, GameState, Move, PieceType};
use crate::core::utils::{file_of, rank_of, square};

fn next_state(state: &GameState, mv: Move) -> GameState {
    let mut new_board = clone_board(&state.board);
    let piece = state.board[mv.from as usize].unwrap();

    apply_move(&mut new_board, mv);

    let new_en_passant = if piece.piece_type == PieceType::Pawn
        && (rank_of(mv.to) as i8 - rank_of(mv.from) as i8).abs() == 2
    {
        Some(square(
            (rank_of(mv.from) + rank_of(mv.to)) / 2,
            file_of(mv.from),
        ))
    } else {
        None
    };

    let mut new_castling_rights = state.castling_rights;
    if mv.from == 4 || mv.to == 4 {
        new_castling_rights.K = false;
        new_castling_rights.Q = false;
    }
    if mv.from == 60 || mv.to == 60 {
        new_castling_rights.K = false;
        new_castling_rights.Q = false;
    }
    if mv.from == 7 || mv.to == 7 {
        new_castling_rights.K = false;
    }
    if mv.from == 0 || mv.to == 0 {
        new_castling_rights.Q = false;
    }
    if mv.from == 63 || mv.to == 63 {
        new_castling_rights.k = false;
    }
    if mv.from == 56 || mv.to == 56 {
        new_castling_rights.q = false;
    }
    if let Some(p) = state.board[mv.from as usize] {
        if p.piece_type == PieceType::King {
            if p.color == Color::White {
                new_castling_rights.K = false;
                new_castling_rights.Q = false;
            } else {
                new_castling_rights.k = false;
                new_castling_rights.q = false;
            }
        }
        if p.piece_type == PieceType::Rook {
            if mv.from == 7 {
                new_castling_rights.K = false;
            }
            if mv.from == 0 {
                new_castling_rights.Q = false;
            }
            if mv.from == 63 {
                new_castling_rights.k = false;
            }
            if mv.from == 56 {
                new_castling_rights.q = false;
            }
        }
    }

    GameState {
        board: new_board,
        turn: state.turn.opposite(),
        castling_rights: new_castling_rights,
        en_passant: new_en_passant,
        half_move_clock: 0,
        full_move_number: 1,
        history: Vec::new(),
        status: crate::core::types::GameStatus::Playing,
        result: crate::core::types::GameResult::Ongoing,
        in_check: false,
    }
}

pub fn perft(state: &GameState, depth: u32) -> u64 {
    if depth == 0 {
        return 1;
    }

    let moves = legal_moves(
        &state.board,
        state.turn,
        state.castling_rights,
        state.en_passant,
    );

    if depth == 1 {
        return moves.len() as u64;
    }

    let mut total: u64 = 0;
    for mv in &moves {
        let new_state = next_state(state, *mv);
        total += perft(&new_state, depth - 1);
    }
    total
}

pub fn divide(state: &GameState, depth: u32) -> HashMap<String, u64> {
    let mut result = HashMap::new();
    let moves = legal_moves(
        &state.board,
        state.turn,
        state.castling_rights,
        state.en_passant,
    );
    for mv in &moves {
        let new_state = next_state(state, *mv);
        let count = perft(&new_state, depth - 1);
        let uci = crate::core::notation::move_to_uci(mv);
        result.insert(uci, count);
    }
    result
}
