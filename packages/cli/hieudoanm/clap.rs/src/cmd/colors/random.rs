use clap::ArgMatches;

pub fn command() -> clap::Command {
    clap::Command::new("random").about("Generate random colors")
}

pub async fn run(_matches: &ArgMatches) -> anyhow::Result<()> {
    use crate::cmd::colors::service;

    let hex = service::generate_random_hex_color();
    let (r, g, b) = service::hex_to_rgb(&hex).unwrap();
    println!("Random color: #{hex}");
    println!("RGB: ({r}, {g}, {b})");
    let (h, s, l) = service::hex_to_hsl(&hex).unwrap();
    println!("HSL: ({h:.1}, {s:.1}%, {l:.1}%)");
    Ok(())
}
