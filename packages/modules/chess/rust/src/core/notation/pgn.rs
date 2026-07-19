use std::collections::HashMap;

use crate::core::game::create_game;
use crate::core::notation::move_to_san;
use crate::core::types::{Color, GameState, PGNGame, PGNMove};

pub fn parse_pgn(input: &str) -> Vec<PGNGame> {
    let games_str: Vec<&str> = input.split("\n\n(?=\\[Event)").collect();
    let mut games = Vec::new();
    for game_str in &games_str {
        if let Some(game) = parse_single_pgn(game_str) {
            games.push(game);
        }
    }
    games
}

fn parse_single_pgn(input: &str) -> Option<PGNGame> {
    let parts: Vec<&str> = input.splitn(2, "\n\n").collect();
    if parts.len() < 2 {
        return None;
    }
    let headers_str = parts[0];
    let moves_str = parts[1];

    let mut headers = HashMap::new();
    for line in headers_str.lines() {
        if line.starts_with('[') && line.ends_with(']') {
            let inner = &line[1..line.len() - 1];
            if let Some(eq_pos) = inner.find('"') {
                let key = inner[..eq_pos].trim().to_string();
                let value_end = inner[eq_pos + 1..]
                    .find('"')
                    .map(|p| eq_pos + 1 + p)
                    .unwrap_or(inner.len());
                let value = inner[eq_pos + 1..value_end].to_string();
                headers.insert(key, value);
            }
        }
    }

    let moves = parse_moves(moves_str);
    let result = moves_str
        .split_whitespace()
        .last()
        .and_then(|s| {
            if ["1-0", "0-1", "1/2-1/2", "*"].contains(&s) {
                Some(s.to_string())
            } else {
                None
            }
        })
        .unwrap_or_default();

    Some(PGNGame {
        headers,
        moves,
        result,
    })
}

fn parse_moves(moves_str: &str) -> Vec<PGNMove> {
    let cleaned = strip_comments(moves_str);
    let tokens: Vec<&str> = cleaned.split_whitespace().collect();
    let mut moves = Vec::new();
    let mut move_number: u32 = 1;
    let mut color = Color::White;

    for token in tokens {
        if token == "1-0" || token == "0-1" || token == "1/2-1/2" || token == "*" {
            break;
        }
        if let Some(stripped) = token.strip_suffix('.') {
            if let Ok(num) = stripped.parse::<u32>() {
                move_number = num;
                color = Color::White;
            }
            continue;
        }
        moves.push(PGNMove {
            move_number,
            color,
            san: token.to_string(),
            nag: None,
            comment: None,
            variations: None,
        });
        color = if color == Color::White {
            Color::Black
        } else {
            Color::White
        };
        if color == Color::White {
            move_number += 1;
        }
    }
    moves
}

fn strip_comments(s: &str) -> String {
    let mut result = String::new();
    let mut depth = 0;
    for ch in s.chars() {
        match ch {
            '{' => depth += 1,
            '}' if depth > 0 => depth -= 1,
            _ if depth == 0 => result.push(ch),
            _ => {}
        }
    }
    result
}

pub fn stringify_pgn(games: &[PGNGame]) -> String {
    let mut result = String::new();
    for (i, game) in games.iter().enumerate() {
        if i > 0 {
            result.push('\n');
        }
        for (key, value) in &game.headers {
            result.push_str(&format!("[{} \"{}\"]\n", key, value));
        }
        result.push('\n');
        let _move_num: u32 = 1;
        for (j, mv) in game.moves.iter().enumerate() {
            if mv.color == Color::White {
                result.push_str(&format!("{}.", mv.move_number));
            }
            result.push_str(&mv.san);
            if j < game.moves.len() - 1 {
                result.push(' ');
            }
        }
        if !game.result.is_empty() {
            if !game.moves.is_empty() {
                result.push(' ');
            }
            result.push_str(&game.result);
        }
    }
    result
}

pub fn get_moves(pgn: &str) -> Vec<String> {
    let games = parse_pgn(pgn);
    games
        .first()
        .map(|g| g.moves.iter().map(|m| m.san.clone()).collect())
        .unwrap_or_default()
}

pub fn get_headers(pgn: &str) -> HashMap<String, String> {
    let games = parse_pgn(pgn);
    games.first().map(|g| g.headers.clone()).unwrap_or_default()
}

pub fn state_to_pgn(state: &GameState) -> String {
    let mut result = String::new();
    let mut move_num: u32 = 1;
    for (i, entry) in state.history.iter().enumerate() {
        let prev_state = create_game(Some(&entry.state_before));
        let san = move_to_san(
            &prev_state.board,
            &entry.move_,
            prev_state.turn,
            prev_state.castling_rights,
            prev_state.en_passant,
        );
        if prev_state.turn == Color::White {
            if i > 0 {
                result.push(' ');
            }
            result.push_str(&format!("{}.", move_num));
        } else {
            result.push_str(&format!("{}.", move_num));
        }
        result.push_str(&san);
        if prev_state.turn == Color::Black || move_num == 1 && prev_state.turn == Color::White {
            // no-op
        }
        if prev_state.turn == Color::Black {
            move_num += 1;
        } else if prev_state.turn == Color::White && i > 0 {
            // no-op
        }
    }
    if !result.is_empty() {
        result.push(' ');
    }
    result.push_str(&state.result.to_string());
    result
}
