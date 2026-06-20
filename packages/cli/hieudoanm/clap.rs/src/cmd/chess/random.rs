use crate::cmd::chess::service;
use rand::Rng;

#[derive(clap::Args)]
pub struct Args;

pub fn command() -> clap::Command {
    clap::Command::new("random").about("Pick a random Chess960 starting position")
}

pub async fn run(_matches: &Args) -> anyhow::Result<()> {
    let mut rng = rand::thread_rng();
    let n = service::POSITIONS.len();
    let idx = rng.gen_range(0..n);
    let position = service::POSITIONS[idx];
    println!("Position {}: {}", idx + 1, position);

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
