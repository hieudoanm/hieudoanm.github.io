use anyhow::Context;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'i', long = "input", help = "OpenAPI file (json/yaml)")]
    pub input: String,
    #[arg(short = 'o', long = "output", help = "Output Postman file")]
    pub output: Option<String>,
}

pub fn command() -> clap::Command {
    clap::Command::new("openapi2postman")
        .about("Convert OpenAPI to Postman collection")
        .arg(
            clap::Arg::new("input")
                .short('i')
                .long("input")
                .help("OpenAPI file (json/yaml)")
                .required(true),
        )
        .arg(
            clap::Arg::new("output")
                .short('o')
                .long("output")
                .help("Output Postman file"),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let input = &matches.input;
    let output = matches.output.as_ref();

    let data = std::fs::read(input).with_context(|| format!("failed to read {input}"))?;
    let spec = super::service::parse_openapi(&data)?;
    let postman = super::service::convert_to_postman(&spec)?;
    let out =
        serde_json::to_string_pretty(&postman).context("failed to serialize postman collection")?;

    if let Some(out_path) = output {
        std::fs::write(out_path, &out).with_context(|| format!("failed to write {out_path}"))?;
    } else {
        println!("{out}");
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
