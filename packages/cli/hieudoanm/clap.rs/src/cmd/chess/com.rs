use crate::cmd::chess::service;
use anyhow::Context;

pub fn command() -> clap::Command {
    clap::Command::new("com")
        .about("Chess.com API tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("player")
                .about("Look up a chess.com player")
                .arg(
                    clap::Arg::new("username")
                        .long("username")
                        .short('u')
                        .help("Chess.com username")
                        .required(true),
                ),
        )
        .subcommand(
            clap::Command::new("leaderboards")
                .about("Chess.com leaderboards")
                .arg(
                    clap::Arg::new("top")
                        .long("top")
                        .help("Number of top players to display")
                        .default_value("5"),
                )
                .arg(
                    clap::Arg::new("country")
                        .long("country")
                        .help("Filter players by country code"),
                ),
        )
        .subcommand(clap::Command::new("titled").about("Show Chess.com titled player counts"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("player", m)) => player(m).await,
        Some(("leaderboards", m)) => leaderboards(m).await,
        Some(("titled", _)) => titled().await,
        _ => Ok(()),
    }
}

async fn player(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let username = matches
        .get_one::<String>("username")
        .unwrap()
        .to_lowercase();

    let profile_url = format!("https://api.chess.com/pub/player/{}", username);
    let stats_url = format!("https://api.chess.com/pub/player/{}/stats", username);

    let resp = reqwest::blocking::get(&profile_url).context("failed to fetch player profile")?;
    let profile: service::PlayerProfile = resp.json().context("failed to parse player profile")?;

    let resp = reqwest::blocking::get(&stats_url).context("failed to fetch player stats")?;
    let stats: service::PlayerStats = resp.json().context("failed to parse player stats")?;

    println!();
    println!("Player: {}", profile.username.to_uppercase());
    println!("---------------------------------------------------------------");

    if !profile.name.is_empty() {
        println!("Name      : {}", profile.name);
    }
    if !profile.title.is_empty() {
        println!("Title     : {}", profile.title);
    }

    let country = service::country_code(&profile.country);
    println!("Country   : {}", country);

    if profile.fide > 0 {
        println!("FIDE      : {}", profile.fide);
    }

    println!("Followers : {}", profile.followers);

    println!();
    println!("Ratings");
    println!();

    print_ratings_header();
    if let Some(r) = &stats.chess_bullet {
        print_rating("Bullet", r);
    }
    if let Some(r) = &stats.chess_blitz {
        print_rating("Blitz", r);
    }
    if let Some(r) = &stats.chess_rapid {
        print_rating("Rapid", r);
    }

    Ok(())
}

fn ratings_header_line() -> String {
    format!(
        "| {:<8} | {:>8} | {:>8} | {:>8} | {:>8} | {:>8} |",
        "Mode", "Best", "Last", "Win", "Draw", "Loss"
    )
}

fn ratings_header_separator() -> String {
    format!(
        "| {:<8} | {:>8} | {:>8} | {:>8} | {:>8} | {:>8} |",
        "-".repeat(8),
        "-".repeat(8),
        "-".repeat(8),
        "-".repeat(8),
        "-".repeat(8),
        "-".repeat(8)
    )
}

fn print_ratings_header() {
    println!("{}", ratings_header_line());
    println!("{}", ratings_header_separator());
}

fn format_rating_line(label: &str, r: &service::ChessRating) -> String {
    format!(
        "| {:<8} | {:>8} | {:>8} | {:>8} | {:>8} | {:>8} |",
        label, r.best.rating, r.last.rating, r.record.win, r.record.draw, r.record.loss
    )
}

fn print_rating(label: &str, r: &service::ChessRating) {
    println!("{}", format_rating_line(label, r));
}

async fn leaderboards(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let top: usize = matches
        .get_one::<String>("top")
        .unwrap()
        .parse()
        .unwrap_or(5);
    let country_filter = matches
        .get_one::<String>("country")
        .map(|s| s.to_uppercase());

    let url = "https://api.chess.com/pub/leaderboards";
    let resp = reqwest::blocking::get(url).context("failed to fetch leaderboards")?;
    let data: service::LeaderboardsResponse =
        resp.json().context("failed to parse leaderboards")?;

    let filter = |players: &[service::Player]| -> Vec<service::Player> {
        match &country_filter {
            Some(filter) => players
                .iter()
                .filter(|p| service::country_code(&p.country) == *filter)
                .cloned()
                .collect(),
            None => players.to_vec(),
        }
    };

    print_top("Live Bullet", &filter(&data.live_bullet), top);
    print_top("Live Blitz", &filter(&data.live_blitz), top);
    print_top("Live Rapid", &filter(&data.live_rapid), top);
    print_top("Live Blitz 960", &filter(&data.live_blitz960), top);

    Ok(())
}

fn leaderboard_header_line() -> String {
    format!(
        "| {:<4} | {:<32} | {:<24} | {:<24} | {:>6} | {:<24} |",
        "Rank", "Name", "Username", "Country", "Score", "W / D / L"
    )
}

fn leaderboard_header_separator() -> String {
    format!(
        "| {:<4} | {:<32} | {:<24} | {:<24} | {:>6} | {:<24} |",
        "-".repeat(4),
        "-".repeat(32),
        "-".repeat(24),
        "-".repeat(24),
        "-".repeat(6),
        "-".repeat(24)
    )
}

fn format_player_line(p: &service::Player) -> String {
    let name = if p.name.is_empty() { "-" } else { &p.name };
    let country = service::country_code(&p.country);
    let wdl = format!("{} / {} / {}", p.win_count, p.draw_count, p.loss_count);
    format!(
        "| {:<4} | {:<32} | {:<24} | {:<24} | {:>6} | {:<24} |",
        p.rank,
        name,
        p.username.to_lowercase(),
        country,
        p.score,
        wdl
    )
}

fn print_top(title: &str, players: &[service::Player], limit: usize) {
    if players.is_empty() {
        return;
    }

    println!();
    println!("{}", title);
    println!();
    println!("{}", leaderboard_header_line());
    println!("{}", leaderboard_header_separator());

    let limit = limit.min(players.len());
    for p in &players[..limit] {
        println!("{}", format_player_line(p));
    }
}

async fn titled() -> anyhow::Result<()> {
    println!();
    println!("| {:<6} | {:>7} |", "Titled", "Players");
    println!("| {:<6} | {:>7} |", "-".repeat(6), "-".repeat(7));


    for title in service::TITLES {
        let url = format!("https://api.chess.com/pub/titled/{}", title);
        match reqwest::blocking::get(&url) {
            Ok(resp) => match resp.json::<service::TitledResponse>() {
                Ok(data) => {
                    println!("| {:<6} | {:>7} |", title, data.players.len());
                }
                Err(e) => {
                    eprintln!("Failed to parse {}: {}", title, e);
                }
            },
            Err(e) => {
                eprintln!("Failed to fetch {}: {}", title, e);
            }
        }
    }
    println!();

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn sample_rating() -> service::ChessRating {
        service::ChessRating {
            last: service::ChessRatingLast { rating: 1500, date: 20240101, rd: 50 },
            best: service::ChessRatingBest { rating: 1600, date: 20240101, game: None },
            record: service::ChessRatingRecord { win: 100, draw: 20, loss: 80 },
        }
    }

    fn sample_player(rank: i32, username: &str, country: &str) -> service::Player {
        service::Player {
            rank,
            username: username.to_string(),
            name: String::new(),
            country: country.to_string(),
            title: String::new(),
            score: 2000 - rank * 10,
            win_count: 50 - rank,
            draw_count: 10,
            loss_count: 30 + rank,
        }
    }

    #[test]
    fn test_ratings_header_line() {
        let line = ratings_header_line();
        assert!(line.starts_with('|'));
        assert!(line.contains("Mode"));
        assert!(line.contains("Best"));
        assert!(line.contains("Last"));
        assert!(line.contains("Win"));
        assert!(line.contains("Draw"));
        assert!(line.contains("Loss"));
    }

    #[test]
    fn test_ratings_header_separator() {
        let sep = ratings_header_separator();
        assert!(sep.starts_with('|'));
        assert!(sep.contains("--------"));
    }

    #[test]
    fn test_format_rating_line() {
        let r = sample_rating();
        let line = format_rating_line("Blitz", &r);
        assert!(line.starts_with('|'));
        assert!(line.contains("Blitz"));
        assert!(line.contains("1600"));
        assert!(line.contains("1500"));
        assert!(line.contains("100"));
        assert!(line.contains("20"));
        assert!(line.contains("80"));
    }

    #[test]
    fn test_leaderboard_header_line() {
        let line = leaderboard_header_line();
        assert!(line.starts_with('|'));
        assert!(line.contains("Rank"));
        assert!(line.contains("Username"));
        assert!(line.contains("Score"));
    }

    #[test]
    fn test_leaderboard_header_separator() {
        let sep = leaderboard_header_separator();
        assert!(sep.starts_with('|'));
        assert!(sep.contains("----"));
    }

    #[test]
    fn test_format_player_line_with_name() {
        let p = service::Player {
            rank: 1,
            username: "hikaru".to_string(),
            name: "Hikaru Nakamura".to_string(),
            country: "/country/US".to_string(),
            title: "GM".to_string(),
            score: 2800,
            win_count: 100,
            draw_count: 20,
            loss_count: 10,
        };
        let line = format_player_line(&p);
        assert!(line.contains("hikaru"));
        assert!(line.contains("Hikaru Nakamura"));
        assert!(line.contains("2800"));
    }

    #[test]
    fn test_format_player_line_without_name() {
        let p = sample_player(5, "testplayer", "/country/VN");
        let line = format_player_line(&p);
        assert!(line.contains("testplayer"));
        assert!(line.contains("-"));
        assert!(line.contains("1950"));
    }

    #[test]
    fn test_print_top_empty_does_not_panic() {
        print_top("Empty", &[], 5);
    }
}
