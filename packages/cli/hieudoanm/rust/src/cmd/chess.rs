pub fn command() -> clap::Command {
    clap::Command::new("chess")
        .about("Chess related tools")
        .subcommand_required(true)
        .subcommand(clap::Command::new("play").about("Play chess against the engine"))
        .subcommand(clap::Command::new("fen").about("FEN string utilities"))
        .subcommand(clap::Command::new("pgn").about("PGN file utilities"))
        .subcommand(clap::Command::new("elo").about("Calculate Elo ratings"))
        .subcommand(clap::Command::new("random").about("Generate random chess positions"))
        .subcommand(clap::Command::new("setup").about("Set up a chess position"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("play", _m)) => println!("chess play (not yet implemented)"),
        Some(("fen", _m)) => println!("chess fen (not yet implemented)"),
        Some(("pgn", _m)) => println!("chess pgn (not yet implemented)"),
        Some(("elo", _m)) => println!("chess elo (not yet implemented)"),
        Some(("random", _m)) => println!("chess random (not yet implemented)"),
        Some(("setup", _m)) => println!("chess setup (not yet implemented)"),
        _ => {}
    }
    Ok(())
}
