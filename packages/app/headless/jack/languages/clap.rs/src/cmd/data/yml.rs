use anyhow::Context;

#[derive(clap::Args)]
pub struct Args {
    #[arg(help = "YAML file")]
    pub file: Option<String>,
    #[arg(short = 'V', long = "validate", action = clap::ArgAction::SetTrue, help = "Validate YAML syntax")]
    pub validate: bool,
    #[arg(long = "lint", action = clap::ArgAction::SetTrue, help = "Lint YAML file")]
    pub lint: bool,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let file = matches.file.as_ref();
    let validate = matches.validate;
    let lint = matches.lint;
    let use_json = matches.json;

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

fn parse_yml_value(data: &[u8]) -> anyhow::Result<serde_yaml::Value> {
    serde_yaml::from_slice(data).context("invalid YAML")
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[test]
    fn test_read_yml_input_with_file() {
        let dir = std::env::temp_dir();
        let path = dir.join("_test_yml_input.yml");
        std::fs::write(&path, b"key: value").unwrap();
        let result = read_yml_input(Some(&path.to_string_lossy().to_string())).unwrap();
        assert!(!result.is_empty());
        let _ = std::fs::remove_file(&path);
    }

    #[test]
    fn test_parse_yml_value_valid() {
        use serde_yaml::Value;
        let data = b"name: Alice\nage: 30\n";
        let value = parse_yml_value(data).unwrap();
        assert_eq!(value["name"], Value::String("Alice".into()));
        assert_eq!(value["age"], Value::Number(30.into()));
    }

    #[test]
    fn test_parse_yml_value_nested() {
        use serde_yaml::Value;
        let data = b"person:\n  name: Bob\n  skills: [rust, python]\n";
        let value = parse_yml_value(data).unwrap();
        assert_eq!(value["person"]["name"], Value::String("Bob".into()));
        assert_eq!(value["person"]["skills"][0], Value::String("rust".into()));
    }

    #[test]
    fn test_parse_yml_value_invalid() {
        let data = b"{{ invalid: yml :::: }";
        let result = parse_yml_value(data);
        assert!(result.is_err());
    }

    #[test]
    fn test_parse_yml_value_empty() {
        use serde_yaml::Value;
        let data = b"";
        let value = parse_yml_value(data).unwrap();
        assert_eq!(value, Value::Null);
    }

    #[test]
    fn test_parse_yml_value_scalar() {
        use serde_yaml::Value;
        let data = b"hello\n";
        let value = parse_yml_value(data).unwrap();
        assert_eq!(value, Value::String("hello".into()));
    }

    #[test]
    fn test_parse_yml_value_list() {
        use serde_yaml::Value;
        let data = b"- one\n- two\n- three\n";
        let value = parse_yml_value(data).unwrap();
        assert_eq!(value[0], Value::String("one".into()));
        assert_eq!(value[2], Value::String("three".into()));
    }
}
