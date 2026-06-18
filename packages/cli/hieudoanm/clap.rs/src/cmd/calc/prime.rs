use clap::ArgMatches;

use super::prime_service;

pub fn command() -> clap::Command {
    clap::Command::new("prime")
        .about("Check if a number is prime, or generate primes up to N")
        .arg(
            clap::Arg::new("number")
                .long("number")
                .short('n')
                .help("Number to check or limit")
                .required(true),
        )
        .arg(
            clap::Arg::new("list")
                .long("list")
                .short('l')
                .help("List all primes up to N")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let number: i64 = matches.get_one::<String>("number").unwrap().parse()?;
    let list = matches.get_flag("list");
    let json = matches.get_flag("json");

    if number < 2 {
        anyhow::bail!("number must be >= 2");
    }

    if list {
        let primes = prime_service::sieve(number);
        if json {
            let output = serde_json::json!({
                "limit": number,
                "count": primes.len(),
                "primes": primes,
            });
            println!("{}", serde_json::to_string_pretty(&output)?);
        } else {
            for p in primes {
                println!("{}", p);
            }
        }
        return Ok(());
    }

    let is_prime = prime_service::is_prime(number);
    if json {
        let output = serde_json::json!({
            "number": number,
            "is_prime": is_prime,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else if is_prime {
        println!("{} is prime", number);
    } else {
        println!("{} is not prime", number);
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
