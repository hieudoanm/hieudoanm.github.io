use std::io::{self, BufRead, Write};

#[derive(clap::Args)]
pub struct Args {
    #[arg(long = "blind", action = clap::ArgAction::SetTrue, help = "Hide the board after each move")]
    pub blind: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("play")
        .about("Play chess interactively in the terminal")
        .arg(
            clap::Arg::new("blind")
                .long("blind")
                .help("Hide the board after each move")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let blind = matches.blind;
    let stdin = io::stdin();
    let mut reader = stdin.lock();

    println!("Chess CLI - Interactive Play");
    println!("Enter moves in algebraic notation (e.g., e4, Nf3). Type 'exit' to quit.");
    if blind {
        println!("Blind mode is ON. Type 'show' to view the board.");
    }
    println!();

    let mut moves: Vec<String> = Vec::new();

    loop {
        if !blind {
            println!("TODO: board display (not yet implemented)");
        }

        print!("Enter move: ");
        io::stdout().flush()?;

        let mut input = String::new();
        reader.read_line(&mut input)?;
        let input = input.trim().to_string();

        if input == "exit" {
            println!("Exiting game.");
            break;
        }

        if blind && input == "show" {
            println!("TODO: board display (not yet implemented)");
            continue;
        }

        moves.push(input);
        println!("Move recorded.");
    }

    if !moves.is_empty() {
        println!();
        println!("Game moves:");
        print!("{}", format_moves(&moves));
        println!();
    }

    Ok(())
}

pub fn format_moves(moves: &[String]) -> String {
    let mut out = String::new();
    for (i, m) in moves.iter().enumerate() {
        if i % 2 == 0 {
            out.push_str(&format!("{}.{} ", i / 2 + 1, m));
        } else {
            out.push_str(&format!("{} ", m));
        }
    }
    out.trim_end().to_string()
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
    fn test_format_moves_empty() {
        assert_eq!(format_moves(&[]), "");
    }

    #[test]
    fn test_format_moves_single() {
        let moves = vec!["e4".to_string()];
        assert_eq!(format_moves(&moves), "1.e4");
    }

    #[test]
    fn test_format_moves_two() {
        let moves = vec!["e4".to_string(), "e5".to_string()];
        assert_eq!(format_moves(&moves), "1.e4 e5");
    }

    #[test]
    fn test_format_moves_three() {
        let moves = vec!["e4".to_string(), "e5".to_string(), "Nf3".to_string()];
        assert_eq!(format_moves(&moves), "1.e4 e5 2.Nf3");
    }

    #[test]
    fn test_format_moves_four() {
        let moves = vec![
            "e4".to_string(),
            "e5".to_string(),
            "Nf3".to_string(),
            "Nc6".to_string(),
        ];
        assert_eq!(format_moves(&moves), "1.e4 e5 2.Nf3 Nc6");
    }

    #[test]
    fn test_format_moves_with_castling() {
        let moves = vec![
            "e4".to_string(),
            "e5".to_string(),
            "Nf3".to_string(),
            "Nc6".to_string(),
            "Bb5".to_string(),
            "a6".to_string(),
            "O-O".to_string(),
        ];
        assert_eq!(format_moves(&moves), "1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.O-O");
    }
}
