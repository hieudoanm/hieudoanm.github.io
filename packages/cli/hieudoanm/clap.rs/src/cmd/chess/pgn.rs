pub fn command() -> clap::Command {
    clap::Command::new("pgn")
        .about("PGN chess game analysis tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("fen")
                .about("Convert PGN to FEN per move with evaluation")
                .arg(
                    clap::Arg::new("pgn-file")
                        .long("pgn-file")
                        .help("Path to a PGN file"),
                )
                .arg(clap::Arg::new("pgn").long("pgn").help("Raw PGN string")),
        )
        .subcommand(
            clap::Command::new("uci")
                .about("Convert PGN moves to UCI notation")
                .arg(
                    clap::Arg::new("pgn-file")
                        .long("pgn-file")
                        .help("Path to a PGN file"),
                )
                .arg(clap::Arg::new("pgn").long("pgn").help("Raw PGN string")),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("fen", m)) => sub_fen(m).await,
        Some(("uci", m)) => sub_uci(m).await,
        _ => Ok(()),
    }
}

async fn sub_fen(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    println!("pgn fen (not yet implemented)");
    Ok(())
}

async fn sub_uci(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    println!("pgn uci (not yet implemented)");
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

    #[test]
    fn test_sub_fen() {
        let m = clap::ArgMatches::default();
        let rt = tokio::runtime::Runtime::new().unwrap();
        rt.block_on(sub_fen(&m)).unwrap();
    }

    #[test]
    fn test_sub_uci() {
        let m = clap::ArgMatches::default();
        let rt = tokio::runtime::Runtime::new().unwrap();
        rt.block_on(sub_uci(&m)).unwrap();
    }
}
