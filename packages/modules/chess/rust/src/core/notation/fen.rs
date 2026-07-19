use crate::core::types::{Color, FenFields};
use std::num::ParseIntError;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Variant {
    Standard,
    Chess960,
}

pub fn parse_fen_fields(fen: &str) -> Result<FenFields, String> {
    let parts: Vec<&str> = fen.split_whitespace().collect();
    if parts.len() != 6 {
        return Err(format!(
            "Invalid FEN: expected 6 fields, got {}",
            parts.len()
        ));
    }

    let active_color = match parts[1] {
        "w" => Color::White,
        "b" => Color::Black,
        _ => return Err(format!("Invalid active color: {}", parts[1])),
    };

    let half_move_clock = parts[4]
        .parse::<u32>()
        .map_err(|e: ParseIntError| format!("Invalid half-move clock: {}", e))?;
    let full_move_number = parts[5]
        .parse::<u32>()
        .map_err(|e: ParseIntError| format!("Invalid full-move number: {}", e))?;

    Ok(FenFields {
        piece_placement: parts[0].to_string(),
        active_color,
        castling_availability: parts[2].to_string(),
        en_passant_target: parts[3].to_string(),
        half_move_clock,
        full_move_number,
    })
}

pub fn stringify_fen_fields(fen: &FenFields) -> String {
    format!(
        "{} {} {} {} {} {}",
        fen.piece_placement,
        fen.active_color.to_char(),
        fen.castling_availability,
        fen.en_passant_target,
        fen.half_move_clock,
        fen.full_move_number,
    )
}

fn get_960_castling(position: &str, color: Color) -> String {
    let king_file = position.chars().position(|c| c == 'K').unwrap_or(4) as u8;
    let rook_files: Vec<u8> = position
        .chars()
        .enumerate()
        .filter(|(_, c)| *c == 'R')
        .map(|(i, _)| i as u8)
        .collect();

    let mut result = String::new();
    if color == Color::White {
        for &rf in &rook_files {
            if rf > king_file {
                result.push((b'A' + rf) as char);
            }
        }
        for &rf in rook_files.iter().rev() {
            if rf < king_file {
                result.push((b'A' + rf) as char);
            }
        }
    } else {
        for &rf in &rook_files {
            if rf > king_file {
                result.push((b'a' + rf) as char);
            }
        }
        for rf in rook_files.iter().rev() {
            if *rf < king_file {
                result.push((b'a' + rf) as char);
            }
        }
    }
    result
}

pub fn chess960_back_rank_to_initial_fen(
    position: &str,
    variant: Option<Variant>,
) -> Result<String, String> {
    if position.len() != 8 {
        return Err("Back rank must be exactly 8 characters".to_string());
    }

    let variant = variant.unwrap_or(Variant::Standard);

    let fen_board = format!(
        "{}/pppppppp/8/8/8/8/PPPPPPPP/{}",
        position.to_lowercase(),
        position
    );
    let castling = match variant {
        Variant::Chess960 => {
            let w = get_960_castling(position, Color::White);
            let b = get_960_castling(position, Color::Black);
            format!("{}{}", w, b)
        }
        Variant::Standard => "KQkq".to_string(),
    };

    Ok(format!(
        "{} w {} - 0 1",
        fen_board,
        if castling.is_empty() {
            "-".to_string()
        } else {
            castling
        }
    ))
}
