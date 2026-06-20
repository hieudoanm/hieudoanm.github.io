use super::unit_service;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'v', long = "value", help = "Value to convert")]
    pub value: String,
    #[arg(short = 'f', long = "from", help = "Source unit")]
    pub from: String,
    #[arg(short = 't', long = "to", help = "Target unit")]
    pub to: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("unit")
        .about("Convert between units (length, weight, temp, speed)")
        .arg(
            clap::Arg::new("value")
                .long("value")
                .short('v')
                .help("Value to convert")
                .required(true),
        )
        .arg(
            clap::Arg::new("from")
                .long("from")
                .short('f')
                .help("Source unit")
                .required(true),
        )
        .arg(
            clap::Arg::new("to")
                .long("to")
                .short('t')
                .help("Target unit")
                .required(true),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let value: f64 = matches.value.parse()?;
    let from = &matches.from;
    let to = &matches.to;
    let json = matches.json;

    match unit_service::convert(value, from, to) {
        Ok(r) => {
            if json {
                let output = serde_json::json!({
                    "value": r.value,
                    "from": r.from,
                    "to": r.to,
                    "result": r.result,
                    "category": r.category,
                });
                println!("{}", serde_json::to_string_pretty(&output)?);
            } else {
                println!("{} {} = {} {}", r.value, r.from, r.result, r.to);
            }
        }
        Err(e) => anyhow::bail!("{}", e),
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
