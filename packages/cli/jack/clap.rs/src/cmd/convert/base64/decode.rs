use std::fs;
use std::io::{self, BufRead, Write};
use std::path::PathBuf;

fn strip_data_url(s: &str) -> &str {
    if let Some(pos) = s.find("base64,") {
        &s[pos + 7..]
    } else {
        s
    }
}

#[derive(clap::Args)]
pub struct Args {
    #[arg(help = "Base64 string to decode")]
    pub text: Option<String>,
    #[arg(short = 'f', long = "file", help = "File containing base64 to decode")]
    pub file: Option<String>,
    #[arg(
        short = 'o',
        long = "output",
        help = "Write decoded output to file instead of stdout"
    )]
    pub output: Option<String>,
}

pub fn command() -> clap::Command {
    clap::Command::new("decode")
        .about("Decode base64 to text/file")
        .arg(
            clap::Arg::new("text")
                .help("Base64 string to decode")
                .required(false),
        )
        .arg(
            clap::Arg::new("file")
                .short('f')
                .long("file")
                .help("File containing base64 to decode")
                .value_name("PATH")
                .conflicts_with("text"),
        )
        .arg(
            clap::Arg::new("output")
                .short('o')
                .long("output")
                .help("Write decoded output to file instead of stdout")
                .value_name("PATH"),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let output = matches.output.as_ref().map(PathBuf::from);

    let input = if let Some(path) = matches.file.as_ref() {
        fs::read(path)?
    } else {
        let text = match matches.text.as_ref() {
            Some(t) => t.clone(),
            None => {
                print!("Base64: ");
                io::stdout().flush()?;
                let mut buf = String::new();
                io::stdin().lock().read_line(&mut buf)?;
                buf.trim().to_string()
            }
        };
        strip_data_url(&text).to_string().into_bytes()
    };

    let raw = String::from_utf8_lossy(&input);
    let without_newlines = raw.trim().replace('\n', "");
    let cleaned = strip_data_url(&without_newlines);
    let decoded = ::base64::Engine::decode(&::base64::engine::general_purpose::STANDARD, cleaned)?;

    if let Some(path) = output {
        fs::write(&path, &decoded)?;
    } else {
        let printable = String::from_utf8_lossy(&decoded);
        println!("{}", printable);
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_strip_data_url() {
        assert_eq!(strip_data_url("data:image/png;base64,aGVsbG8="), "aGVsbG8=");
        assert_eq!(strip_data_url("aGVsbG8="), "aGVsbG8=");
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
