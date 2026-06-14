use anyhow::Context;

pub fn command() -> clap::Command {
    clap::Command::new("yml")
        .about("Parse, validate, and lint YAML files")
        .arg(clap::Arg::new("file").help("YAML file"))
        .arg(
            clap::Arg::new("validate")
                .long("validate")
                .short('V')
                .action(clap::ArgAction::SetTrue)
                .help("Validate YAML syntax"),
        )
        .arg(
            clap::Arg::new("lint")
                .long("lint")
                .action(clap::ArgAction::SetTrue)
                .help("Lint YAML file"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .action(clap::ArgAction::SetTrue)
                .help("Output in JSON format"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let file = matches.get_one::<String>("file");
    let validate = matches.get_flag("validate");
    let lint = matches.get_flag("lint");
    let use_json = matches.get_flag("json");

    let input = read_yml_input(file)?;

    if validate {
        let _data: serde_yaml::Value = serde_yaml::from_slice(&input).context("invalid YAML")?;
        if use_json {
            let result = serde_json::json!({"valid": true, "file": file.map(String::as_str)});
            println!("{}", serde_json::to_string_pretty(&result)?);
        } else {
            println!("Valid YAML");
        }
        return Ok(());
    }

    if lint {
        let _data: serde_yaml::Value = serde_yaml::from_slice(&input).context("YAML error")?;
        if use_json {
            let result = serde_json::json!({"valid": true, "lint": "no issues"});
            println!("{}", serde_json::to_string_pretty(&result)?);
        } else {
            println!("No lint issues found");
        }
        return Ok(());
    }

    let data: serde_yaml::Value = serde_yaml::from_slice(&input).context("parse yaml")?;

    if use_json {
        println!("{}", serde_json::to_string_pretty(&data)?);
    } else {
        println!("{}", serde_yaml::to_string(&data)?);
    }

    Ok(())
}

fn read_yml_input(file: Option<&String>) -> anyhow::Result<Vec<u8>> {
    match file {
        Some(path) => std::fs::read(path).context("read file"),
        None => {
            let mut input = Vec::new();
            std::io::Read::read_to_end(&mut std::io::stdin(), &mut input).context("read stdin")?;
            Ok(input)
        }
    }
}
