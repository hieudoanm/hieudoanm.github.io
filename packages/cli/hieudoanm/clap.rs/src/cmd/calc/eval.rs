use clap::ArgMatches;

use super::eval_service;

pub fn command() -> clap::Command {
    clap::Command::new("eval")
        .about("Evaluate a mathematical expression")
        .arg(
            clap::Arg::new("expression")
                .long("expression")
                .short('e')
                .help("Mathematical expression to evaluate")
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
    let expression = matches.get_one::<String>("expression").unwrap();
    let json = matches.get_flag("json");

    match eval_service::eval_expression(expression) {
        Ok(v) => {
            if json {
                let output = serde_json::json!({
                    "expression": expression,
                    "result": v,
                });
                println!("{}", serde_json::to_string_pretty(&output)?);
            } else {
                println!("{}", v);
            }
        }
        Err(e) => anyhow::bail!("eval: {}", e),
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
