use super::eval_service;

#[derive(clap::Args)]
pub struct Args {
    #[arg(
        short = 'e',
        long = "expression",
        help = "Mathematical expression to evaluate"
    )]
    pub expression: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let expression = &matches.expression;
    let json = matches.json;

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
