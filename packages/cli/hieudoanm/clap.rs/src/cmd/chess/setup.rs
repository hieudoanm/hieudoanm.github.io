use crate::cmd::chess::service;
use std::io::{self, BufRead, Write};

pub fn command() -> clap::Command {
    clap::Command::new("setup").about("Set up a specific Chess960 starting position")
}

pub async fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
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

    if position_index < 1 || position_index > service::POSITIONS.len() {
        anyhow::bail!(
            "position must be between 1 and {}",
            service::POSITIONS.len()
        );
    }

    let position = service::POSITIONS[position_index - 1];
    println!("Position {}: {}", position_index, position);

    let fen = format!(
        "{}/pppppppp/8/8/8/8/PPPPPPPP/{} w KQkq - 0 1",
        position.to_lowercase(),
        position
    );
    println!("FEN: {}", fen);

    let eval = service::cloud_eval_cp(&fen, "chess960")?;
    println!("Evaluation (centipawns): {}", eval);
    Ok(())
}

use anyhow::Context;
