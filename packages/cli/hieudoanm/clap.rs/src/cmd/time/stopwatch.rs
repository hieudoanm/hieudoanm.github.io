use std::time::Instant;

pub fn command() -> clap::Command {
    clap::Command::new("stopwatch").about("Measure elapsed time like a stopwatch")
}

pub async fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    println!("Stopwatch started. Press Ctrl+C to stop.");
    let start = Instant::now();
    tokio::signal::ctrl_c().await?;
    let elapsed = start.elapsed();
    println!("\rElapsed: {}.{:03}s", elapsed.as_secs(), elapsed.subsec_millis());
    Ok(())
}
