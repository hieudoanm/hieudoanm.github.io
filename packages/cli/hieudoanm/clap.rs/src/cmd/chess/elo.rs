use std::io::{self, BufRead, Write};

pub fn command() -> clap::Command {
    clap::Command::new("elo").about("Calculate new Elo rating after a game")
}

pub fn calculate_elo(my_rating: i32, opponent_rating: i32, score: f64, k_factor: i32) -> f64 {
    let expected =
        1.0 / (1.0 + 10.0_f64.powf((opponent_rating - my_rating) as f64 / 400.0));
    my_rating as f64 + k_factor as f64 * (score - expected)
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

    let new_rating = calculate_elo(my_rating, opponent_rating, score, k);
    println!();
    println!("Your new rating: {:.0}", new_rating);
    Ok(())
}

use anyhow::Context;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_elo_win_against_higher_rated() {
        let new = calculate_elo(1500, 1700, 1.0, 32);
        assert!(new > 1500.0);
        assert!(new < 1600.0);
    }

    #[test]
    fn test_elo_loss_against_lower_rated() {
        let new = calculate_elo(1700, 1500, 0.0, 32);
        assert!(new < 1700.0);
        assert!(new > 1650.0);
    }

    #[test]
    fn test_elo_equal_ratings_win() {
        let new = calculate_elo(1500, 1500, 1.0, 32);
        assert!((new - 1516.0).abs() < 0.01);
    }

    #[test]
    fn test_elo_equal_ratings_loss() {
        let new = calculate_elo(1500, 1500, 0.0, 32);
        assert!((new - 1484.0).abs() < 0.01);
    }

    #[test]
    fn test_elo_equal_ratings_draw() {
        let new = calculate_elo(1500, 1500, 0.5, 32);
        assert!((new - 1500.0).abs() < 0.01);
    }

    #[test]
    fn test_elo_win_against_much_stronger() {
        let new = calculate_elo(1200, 2000, 1.0, 32);
        assert!((new - 1231.68).abs() < 0.01);
    }

    #[test]
    fn test_elo_k_factor_affects_result() {
        let new_20 = calculate_elo(1500, 1500, 1.0, 20);
        let new_40 = calculate_elo(1500, 1500, 1.0, 40);
        assert!((new_20 - 1510.0).abs() < 0.01);
        assert!((new_40 - 1520.0).abs() < 0.01);
    }
}
