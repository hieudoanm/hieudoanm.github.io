use crate::cmd::chess::service;
use std::io::{self, BufRead, Write};

#[derive(clap::Args)]
pub struct Args;

pub fn command() -> clap::Command {
    clap::Command::new("setup").about("Set up a specific Chess960 starting position")
}

pub async fn run(_matches: &Args) -> anyhow::Result<()> {
    let stdin = io::stdin();
    let mut reader = stdin.lock();

    let mut position_index = 518usize;

    print!("Position (default 518): ");
    io::stdout().flush()?;
    let mut input = String::new();
    reader.read_line(&mut input)?;
    let input = input.trim();

    if !input.is_empty() {
        let val: usize = input.parse().context("invalid number")?;
        position_index = val;
    }

    validate_position_index(position_index)?;

    let position = service::POSITIONS[position_index - 1];
    println!("Position {}: {}", position_index, position);

    let fen = fen_from_position(position);
    println!("FEN: {}", fen);

    let eval = service::cloud_eval_cp(&fen, "chess960")?;
    println!("Evaluation (centipawns): {}", eval);
    Ok(())
}

fn fen_from_position(position: &str) -> String {
    format!(
        "{}/pppppppp/8/8/8/8/PPPPPPPP/{} w KQkq - 0 1",
        position.to_lowercase(),
        position
    )
}

fn validate_position_index(position_index: usize) -> anyhow::Result<()> {
    if position_index < 1 || position_index > service::POSITIONS.len() {
        anyhow::bail!(
            "position must be between 1 and {}",
            service::POSITIONS.len()
        );
    }
    Ok(())
}

use anyhow::Context;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[test]
    fn test_fen_from_position_produces_valid_format() {
        let fen = fen_from_position("BBQNNRKR");
        assert!(fen.starts_with("bbqnnrkr/pppppppp/8/8/8/8/PPPPPPPP/"));
        assert!(fen.ends_with("BBQNNRKR w KQkq - 0 1"));
        assert_eq!(fen.chars().filter(|&c| c == '/').count(), 7);
    }

    #[test]
    fn test_fen_from_position_lowercases_black_pieces() {
        let fen = fen_from_position("BBNNQRKR");
        let black_side = fen.split('/').next().unwrap();
        assert_eq!(black_side, "bbnnqrkr");
    }

    #[test]
    fn test_fen_from_position_uppercases_white_pieces() {
        let fen = fen_from_position("BBNNQRKR");
        let parts: Vec<&str> = fen.split('/').collect();
        let white_side = parts[parts.len() - 1].split(' ').next().unwrap();
        assert_eq!(white_side, "BBNNQRKR");
    }

    #[test]
    fn test_fen_from_position_rejects_empty() {
        let fen = fen_from_position("");
        assert_eq!(fen, format!("/pppppppp/8/8/8/8/PPPPPPPP/ w KQkq - 0 1"));
    }

    #[test]
    fn test_validate_position_index_valid_first() {
        assert!(validate_position_index(1).is_ok());
    }

    #[test]
    fn test_validate_position_index_valid_last() {
        assert!(validate_position_index(service::POSITIONS.len()).is_ok());
    }

    #[test]
    fn test_validate_position_index_valid_mid() {
        assert!(validate_position_index(518).is_ok());
    }

    #[test]
    fn test_validate_position_index_zero() {
        let err = validate_position_index(0).unwrap_err();
        assert!(err.to_string().contains("between 1 and"));
    }

    #[test]
    fn test_validate_position_index_too_large() {
        let err = validate_position_index(service::POSITIONS.len() + 1).unwrap_err();
        assert!(err.to_string().contains("between 1 and"));
    }

    #[test]
    fn test_validate_position_index_overflow() {
        let err = validate_position_index(usize::MAX).unwrap_err();
        assert!(err.to_string().contains("between 1 and"));
    }
}
