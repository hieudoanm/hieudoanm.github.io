use rand::Rng;

#[derive(clap::Args)]
pub struct Args {
    #[arg(
        short = 's',
        long = "sides",
        default_value = "6",
        help = "Number of sides per die"
    )]
    pub sides: String,
    #[arg(
        short = 'n',
        long = "count",
        default_value = "1",
        help = "Number of dice to roll"
    )]
    pub count: String,
}

pub fn command() -> clap::Command {
    clap::Command::new("dice")
        .about("Roll dice")
        .arg(
            clap::Arg::new("sides")
                .help("Number of sides per die")
                .short('s')
                .long("sides")
                .default_value("6"),
        )
        .arg(
            clap::Arg::new("count")
                .help("Number of dice to roll")
                .short('n')
                .long("count")
                .default_value("1"),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let sides: u32 = Some(&matches.sides)
        .map(|s| s.parse().unwrap_or(6))
        .unwrap_or(6);
    let count: usize = Some(&matches.count)
        .map(|s| s.parse().unwrap_or(1))
        .unwrap_or(1);

    let mut rng = rand::thread_rng();
    let mut results = Vec::with_capacity(count);
    let mut total = 0u32;

    for _ in 0..count {
        let r = rng.gen_range(1..=sides);
        total += r;
        results.push(r);
    }

    if count == 1 {
        println!("{}", results[0]);
    } else {
        println!("Rolling {count}d{sides}:");
        for (i, r) in results.iter().enumerate() {
            println!("  Die {}: {}", i + 1, r);
        }
        println!();
        println!("Total: {total}");
    }

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
