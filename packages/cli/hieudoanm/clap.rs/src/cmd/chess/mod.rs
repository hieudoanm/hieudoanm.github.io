pub fn command() -> clap::Command {
    clap::Command::new("chess")
        .about("Chess tools and utilities")
        .subcommand_required(true)
        .subcommand(clap::Command::new("play").about("Play chess against the engine"))
        .subcommand(
            clap::Command::new("fen")
                .about("FEN string utilities")
                .subcommand_required(true)
                .subcommand(clap::Command::new("eval").about("Evaluate a FEN position"))
                .subcommand(clap::Command::new("svg").about("Render FEN to SVG")),
        )
        .subcommand(
            clap::Command::new("pgn")
                .about("PGN file utilities")
                .subcommand_required(true)
                .subcommand(clap::Command::new("fen").about("Convert PGN to FEN"))
                .subcommand(clap::Command::new("uci").about("Convert PGN to UCI moves")),
        )
        .subcommand(clap::Command::new("elo").about("Calculate Elo ratings"))
        .subcommand(clap::Command::new("random").about("Generate random chess positions"))
        .subcommand(clap::Command::new("setup").about("Set up a chess position"))
        .subcommand(
            clap::Command::new("com")
                .about("Chess.com API tools")
                .subcommand_required(true)
                .subcommand(clap::Command::new("player").about("Look up a chess.com player"))
                .subcommand(clap::Command::new("leaderboards").about("Chess.com leaderboards"))
                .subcommand(clap::Command::new("titled").about("Chess.com titled players")),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("play", _m)) => println!("chess play (not yet implemented)"),
        Some(("fen", sub_m)) => match sub_m.subcommand() {
            Some(("eval", _m)) => println!("chess fen eval (not yet implemented)"),
            Some(("svg", _m)) => println!("chess fen svg (not yet implemented)"),
            _ => {}
        },
        Some(("pgn", sub_m)) => match sub_m.subcommand() {
            Some(("fen", _m)) => println!("chess pgn fen (not yet implemented)"),
            Some(("uci", _m)) => println!("chess pgn uci (not yet implemented)"),
            _ => {}
        },
        Some(("elo", _m)) => println!("chess elo (not yet implemented)"),
        Some(("random", _m)) => println!("chess random (not yet implemented)"),
        Some(("setup", _m)) => println!("chess setup (not yet implemented)"),
        Some(("com", sub_m)) => match sub_m.subcommand() {
            Some(("player", _m)) => println!("chess com player (not yet implemented)"),
            Some(("leaderboards", _m)) => println!("chess com leaderboards (not yet implemented)"),
            Some(("titled", _m)) => println!("chess com titled (not yet implemented)"),
            _ => {}
        },
        _ => {}
    }
    Ok(())
}
