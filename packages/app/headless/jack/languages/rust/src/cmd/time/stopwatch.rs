use std::time::Instant;

#[derive(clap::Args)]
pub struct Args;

pub fn command() -> clap::Command {
    clap::Command::new("stopwatch").about("Measure elapsed time like a stopwatch")
}

pub async fn run(_matches: &Args) -> anyhow::Result<()> {
    println!("Stopwatch started. Press Ctrl+C to stop.");
    let start = Instant::now();
    tokio::signal::ctrl_c().await?;
    let elapsed = start.elapsed();
    println!(
        "\rElapsed: {}.{:03}s",
        elapsed.as_secs(),
        elapsed.subsec_millis()
    );
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
