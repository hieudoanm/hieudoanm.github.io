use anyhow::Context;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct GitignoreTemplate {
    name: String,
    source: String,
}

fn fetch_templates() -> anyhow::Result<Vec<String>> {
    let client = reqwest::blocking::Client::new();
    let resp = client
        .get("https://api.github.com/gitignore/templates")
        .header("Accept", "application/json")
        .header("User-Agent", "hieudoanm-cli")
        .send()
        .context("error fetching templates")?;
    let templates: Vec<String> = resp.json().context("error parsing response")?;
    Ok(templates)
}

fn fetch_template(name: &str) -> anyhow::Result<GitignoreTemplate> {
    let url = format!("https://api.github.com/gitignore/templates/{name}");
    let client = reqwest::blocking::Client::new();
    let resp = client
        .get(&url)
        .header("Accept", "application/json")
        .header("User-Agent", "hieudoanm-cli")
        .send()
        .context("error fetching template")?;
    let tmpl: GitignoreTemplate = resp.json().context("error parsing response")?;
    Ok(tmpl)
}

pub fn command() -> clap::Command {
    clap::Command::new("ignore")
        .about("Fetch a .gitignore template from GitHub")
        .arg(
            clap::Arg::new("name")
                .long("name")
                .help("Gitignore template name (skip prompt)"),
        )
        .arg(
            clap::Arg::new("output")
                .short('o')
                .long("output")
                .help("Output file path")
                .default_value(".gitignore"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let name = matches.get_one::<String>("name");
    let output = matches.get_one::<String>("output").unwrap();

    let selected = if let Some(n) = name {
        n.clone()
    } else {
        let templates = fetch_templates()?;
        if templates.is_empty() {
            anyhow::bail!("no gitignore templates available");
        }
        println!("Available .gitignore templates:");
        for (i, t) in templates.iter().enumerate() {
            println!("  {}. {t}", i + 1);
        }
        print!("Select by name: ");
        std::io::Write::flush(&mut std::io::stdout())?;
        let mut input = String::new();
        std::io::stdin().read_line(&mut input)?;
        input.trim().to_string()
    };

    let tmpl = fetch_template(&selected)?;
    std::fs::write(output, &tmpl.source).context("error writing file")?;
    println!("Written {selected} .gitignore template to {output}");
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
