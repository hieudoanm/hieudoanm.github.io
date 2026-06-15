use clap::ArgMatches;

fn gcd(a: i64, b: i64) -> i64 {
    let mut a = a.abs();
    let mut b = b.abs();
    while b != 0 {
        let t = b;
        b = a % b;
        a = t;
    }
    a
}

pub fn command() -> clap::Command {
    clap::Command::new("lcm")
        .about("Least common multiple of two numbers")
        .arg(
            clap::Arg::new("a")
                .long("a")
                .help("First number")
                .required(true),
        )
        .arg(
            clap::Arg::new("b")
                .long("b")
                .help("Second number")
                .required(true),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let a: i64 = matches.get_one::<String>("a").unwrap().parse()?;
    let b: i64 = matches.get_one::<String>("b").unwrap().parse()?;
    let json = matches.get_flag("json");

    let result = a / gcd(a, b) * b;

    if json {
        let output = serde_json::json!({
            "a": a,
            "b": b,
            "lcm": result,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("{}", result);
    }

    Ok(())
}
