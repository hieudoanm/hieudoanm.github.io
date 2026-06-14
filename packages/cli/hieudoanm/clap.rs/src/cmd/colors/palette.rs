use clap::ArgMatches;

pub fn command() -> clap::Command {
    clap::Command::new("palette").about("Show a color palette")
}

pub async fn run(_matches: &ArgMatches) -> anyhow::Result<()> {
    use crate::cmd::colors::service;

    println!("Generating color palette...");
    for _ in 0..8 {
        let hex = service::generate_random_hex_color();
        let (r, g, b) = service::hex_to_rgb(&hex).unwrap();
        println!("\x1b[48;2;{r};{g};{b}m      \x1b[0m  #{hex}  RGB({r},{g},{b})");
    }
    Ok(())
}
