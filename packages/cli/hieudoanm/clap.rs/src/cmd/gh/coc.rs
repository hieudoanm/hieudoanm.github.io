use anyhow::Context;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct CodeOfConduct {
    key: String,
    name: String,
    url: String,
    body: String,
}

fn fetch_cocs() -> anyhow::Result<Vec<CodeOfConduct>> {
    let client = reqwest::blocking::Client::new();
    let resp = client
        .get("https://api.github.com/codes_of_conduct")
        .header("Accept", "application/json")
        .header("User-Agent", "hieudoanm-cli")
        .send()
        .context("error fetching codes of conduct")?;
    let codes: Vec<CodeOfConduct> = resp.json().context("error parsing response")?;
    Ok(codes)
}

fn fetch_coc(key: &str) -> anyhow::Result<CodeOfConduct> {
    let url = format!("https://api.github.com/codes_of_conduct/{key}");
    let client = reqwest::blocking::Client::new();
    let resp = client
        .get(&url)
        .header("Accept", "application/json")
        .header("User-Agent", "hieudoanm-cli")
        .send()
        .context("error fetching code of conduct")?;
    let coc: CodeOfConduct = resp.json().context("error parsing response")?;
    Ok(coc)
}

#[derive(clap::Args)]
pub struct Args {
    #[arg(long = "key", help = "Code of Conduct key (skip prompt)")]
    pub key: Option<String>,
    #[arg(
        short = 'o',
        long = "output",
        default_value = "CODE_OF_CONDUCT",
        help = "Output file path"
    )]
    pub output: String,
}

pub fn command() -> clap::Command {
    clap::Command::new("coc")
        .about("Fetch a GitHub Code of Conduct")
        .arg(
            clap::Arg::new("key")
                .long("key")
                .help("Code of Conduct key (skip prompt)"),
        )
        .arg(
            clap::Arg::new("output")
                .short('o')
                .long("output")
                .help("Output file path")
                .default_value("CODE_OF_CONDUCT"),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let key = matches.key.as_ref();
    let output = &matches.output;

    let selected = if let Some(k) = key {
        k.clone()
    } else {
        let codes = fetch_cocs()?;
        let keys: Vec<&str> = codes.iter().map(|c| c.key.as_str()).collect();
        if keys.is_empty() {
            anyhow::bail!("no codes of conduct available");
        }
        println!("Available codes of conduct:");
        for (i, k) in keys.iter().enumerate() {
            println!("  {}. {k}", i + 1);
        }
        print!("Select by key: ");
        std::io::Write::flush(&mut std::io::stdout())?;
        let mut input = String::new();
        std::io::stdin().read_line(&mut input)?;
        input.trim().to_string()
    };

    let coc = fetch_coc(&selected)?;
    std::fs::write(output, &coc.body).context("error writing file")?;
    println!("Written {} ({}) to {output}", coc.name, coc.key);
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
