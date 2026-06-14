pub async fn run(matches: &clap::ArgMatches) {
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
}
