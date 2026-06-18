use clap::ArgMatches;
use rand::Rng;

pub fn command() -> clap::Command {
    clap::Command::new("coin").about("Flip a coin").arg(
        clap::Arg::new("count")
            .help("Number of coin flips")
            .short('n')
            .long("count")
            .default_value("1"),
    )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let count: usize = matches
        .get_one::<String>("count")
        .map(|s| s.parse().unwrap_or(1))
        .unwrap_or(1);

    let mut rng = rand::thread_rng();
    let mut results = Vec::with_capacity(count);
    let mut heads = 0usize;
    let mut tails = 0usize;

    for _ in 0..count {
        if rng.gen_bool(0.5) {
            results.push("Heads");
            heads += 1;
        } else {
            results.push("Tails");
            tails += 1;
        }
    }

    if count == 1 {
        println!("{}", results[0]);
    } else {
        for (i, r) in results.iter().enumerate() {
            println!("{:2}. {}", i + 1, r);
        }
        println!();
        println!(
            "Heads: {heads} ({}%), Tails: {tails} ({}%)",
            heads * 100 / count,
            tails * 100 / count
        );
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
