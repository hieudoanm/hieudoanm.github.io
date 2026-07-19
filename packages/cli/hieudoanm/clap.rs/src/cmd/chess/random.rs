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

    let fen = fen_from_chess960_position(position);
    println!("FEN: {}", fen);

    let eval = service::cloud_eval_cp(&fen, "chess960")?;
    println!("Evaluation (centipawns): {}", eval);
    Ok(())
}

fn fen_from_chess960_position(position: &str) -> String {
    format!(
        "{}/pppppppp/8/8/8/8/PPPPPPPP/{} w KQkq - 0 1",
        position.to_lowercase(),
        position
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[test]
    fn test_fen_from_chess960_position_first() {
        let fen = fen_from_chess960_position("BBQNNRKR");
        assert_eq!(
            fen,
            "bbqnnrkr/pppppppp/8/8/8/8/PPPPPPPP/BBQNNRKR w KQkq - 0 1"
        );
    }

    #[test]
    fn test_fen_from_chess960_position_last() {
        let fen = fen_from_chess960_position("RKRNNQBB");
        assert_eq!(
            fen,
            "rkrnnqbb/pppppppp/8/8/8/8/PPPPPPPP/RKRNNQBB w KQkq - 0 1"
        );
    }

    #[test]
    fn test_fen_from_chess960_position_has_8_ranks() {
        let fen = fen_from_chess960_position("BBNNQRKR");
        assert_eq!(fen.matches('/').count(), 7);
    }

    #[test]
    fn test_fen_from_chess960_position_all_positions_valid_length() {
        for pos in service::POSITIONS {
            let fen = fen_from_chess960_position(pos);
            let ranks: Vec<&str> = fen.split_whitespace().next().unwrap().split('/').collect();
            assert_eq!(ranks.len(), 8);
            assert_eq!(ranks[1], "pppppppp");
            assert_eq!(ranks[6], "PPPPPPPP");
        }
    }
}

