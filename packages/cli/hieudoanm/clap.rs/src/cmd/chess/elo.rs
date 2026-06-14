use std::io::{self, BufRead, Write};

pub fn command() -> clap::Command {
    clap::Command::new("elo").about("Calculate new Elo rating after a game")
}

pub async fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let stdin = io::stdin();
    let mut reader = stdin.lock();

    print!("Enter your rating: ");
    io::stdout().flush()?;
    let mut input = String::new();
    reader.read_line(&mut input)?;
    let my_rating: i32 = input.trim().parse().context("invalid rating")?;

    print!("Enter opponent's rating: ");
    io::stdout().flush()?;
    input.clear();
    reader.read_line(&mut input)?;
    let opponent_rating: i32 = input.trim().parse().context("invalid opponent rating")?;

    print!("Enter game result (1=win, 0.5=draw, 0=loss): ");
    io::stdout().flush()?;
    input.clear();
    reader.read_line(&mut input)?;
    let score: f64 = input
        .trim()
        .parse()
        .context("invalid score, must be 0, 0.5, or 1")?;
    if !(0.0..=1.0).contains(&score) {
        anyhow::bail!("invalid score, must be 0, 0.5, or 1");
    }

    let mut k = 20;
    print!("Enter K-factor (default 20, press Enter to skip): ");
    io::stdout().flush()?;
    input.clear();
    reader.read_line(&mut input)?;
    let k_input = input.trim();
    if !k_input.is_empty() {
        k = k_input.parse().context("invalid K-factor")?;
    }

    let expected = 1.0 / (1.0 + 10.0_f64.powf((opponent_rating - my_rating) as f64 / 400.0));
    let new_rating = my_rating as f64 + k as f64 * (score - expected);

    println!();
    println!("Your new rating: {:.0}", new_rating);
    Ok(())
}

use anyhow::Context;
