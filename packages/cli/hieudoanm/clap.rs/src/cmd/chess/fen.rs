pub fn command() -> clap::Command {
    clap::Command::new("fen")
        .about("FEN-based chess analysis tools")
        .subcommand_required(true)
        .subcommand(eval::command())
        .subcommand(svg::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("eval", m)) => eval::run(m).await,
        Some(("svg", m)) => svg::run(m).await,
        _ => Ok(()),
    }
}

mod eval {
    use crate::cmd::chess::service;

    pub fn command() -> clap::Command {
        clap::Command::new("eval")
            .about("Evaluate a FEN position using Lichess cloud eval")
            .arg(
                clap::Arg::new("fen")
                    .long("fen")
                    .help("FEN string to evaluate")
                    .required(true),
            )
            .arg(
                clap::Arg::new("multipv")
                    .long("multipv")
                    .help("Number of principal variations")
                    .default_value("3"),
            )
    }

    pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
        let fen = matches.get_one::<String>("fen").unwrap();
        let multi_pv: i32 = matches
            .get_one::<String>("multipv")
            .unwrap()
            .parse()
            .unwrap_or(3);

        let eval = service::cloud_eval(fen, multi_pv)?;

        println!();
        println!("lichess.org Cloud Evaluation");
        println!("------------------------------------------------");
        println!("Depth : {}", eval.depth);
        println!("Nodes : {}", eval.knodes);
        println!();

        for (i, pv) in eval.pvs.iter().enumerate() {
            println!("#{}  {:+.2}  {}", i + 1, pv.cp as f64 / 100.0, pv.moves);
        }

        Ok(())
    }
}

mod svg {
    pub fn command() -> clap::Command {
        clap::Command::new("svg")
            .about("Render a FEN position as an SVG board image")
            .arg(
                clap::Arg::new("fen")
                    .long("fen")
                    .help("FEN string to render")
                    .required(true),
            )
            .arg(
                clap::Arg::new("out")
                    .long("out")
                    .help("Output SVG file")
                    .default_value("board.svg"),
            )
    }

    pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
        let fen = matches.get_one::<String>("fen").unwrap();
        let output = matches.get_one::<String>("out").unwrap();

        let svg = render_board_svg(fen);
        std::fs::write(output, &svg)?;

        println!("SVG saved to {}", output);
        Ok(())
    }

    fn render_board_svg(_fen: &str) -> String {
        let square_size = 60;
        let board_size = square_size * 8;
        let mut svg = format!(
            r#"<svg xmlns="http://www.w3.org/2000/svg" width="{}" height="{}">"#,
            board_size, board_size
        );

        for rank in 0..8 {
            for file in 0..8 {
                let x = file * square_size;
                let y = (7 - rank) * square_size;
                let color = if (rank + file) % 2 == 1 {
                    "#f0d9b5"
                } else {
                    "#b58863"
                };
                svg += &format!(
                    r#"<rect x="{}" y="{}" width="{}" height="{}" fill="{}"/>"#,
                    x, y, square_size, square_size, color
                );
            }
        }

        svg += "</svg>";
        svg
    }
}
