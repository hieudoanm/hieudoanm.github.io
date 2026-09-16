use crate::libs::history;
use clap::{Arg, Command};

pub fn command() -> Command {
    Command::new("history")
        .about("Command execution history")
        .subcommand_required(true)
        .subcommand(
            Command::new("list")
                .about("List recent history entries")
                .arg(
                    Arg::new("limit")
                        .short('n')
                        .long("limit")
                        .default_value("20")
                        .help("Max entries to show"),
                ),
        )
        .subcommand(
            Command::new("search")
                .about("Search history entries")
                .arg(Arg::new("query").required(true).help("Search query"))
                .arg(
                    Arg::new("limit")
                        .short('n')
                        .long("limit")
                        .default_value("20")
                        .help("Max entries to show"),
                ),
        )
        .subcommand(Command::new("clear").about("Clear all history"))
        .subcommand(Command::new("stats").about("Show history statistics"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("list", m)) => run_list(m),
        Some(("search", m)) => run_search(m),
        Some(("clear", _)) => run_clear(),
        Some(("stats", _)) => run_stats(),
        _ => Ok(()),
    }
}

fn run_list(m: &clap::ArgMatches) -> anyhow::Result<()> {
    let limit: usize = m
        .get_one::<String>("limit")
        .and_then(|s| s.parse().ok())
        .unwrap_or(20);
    let entries = history::list(limit)?;
    if entries.is_empty() {
        eprintln!("no history entries");
        return Ok(());
    }
    for e in &entries {
        println!("{}", e);
    }
    Ok(())
}

fn run_search(m: &clap::ArgMatches) -> anyhow::Result<()> {
    let query = m
        .get_one::<String>("query")
        .map(|s| s.as_str())
        .unwrap_or("");
    let limit: usize = m
        .get_one::<String>("limit")
        .and_then(|s| s.parse().ok())
        .unwrap_or(20);
    let entries = history::search(query, limit)?;
    if entries.is_empty() {
        eprintln!("no matching entries");
        return Ok(());
    }
    for e in &entries {
        println!("{}", e);
    }
    Ok(())
}

fn run_clear() -> anyhow::Result<()> {
    history::clear()?;
    println!("history cleared");
    Ok(())
}

fn run_stats() -> anyhow::Result<()> {
    let stats = history::compute_stats()?;
    println!("CLI commands:   {}", stats.total_cli);
    println!("MCP tool calls: {}", stats.total_mcp);
    println!();
    if !stats.top_commands.is_empty() {
        println!("Top commands:");
        for cc in &stats.top_commands {
            println!("  {:5}  {}", cc.count, cc.name);
        }
    }
    if !stats.top_errors.is_empty() {
        println!();
        println!("Top errors:");
        for cc in &stats.top_errors {
            println!("  {:5}  {}", cc.count, cc.name);
        }
    }
    Ok(())
}
