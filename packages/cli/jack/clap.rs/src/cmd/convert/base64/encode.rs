use std::fs;
use std::io::{self, BufRead, Write};
use std::path::PathBuf;

#[derive(clap::Args)]
pub struct Args {
    #[arg(help = "Text to encode")]
    pub text: Option<String>,
    #[arg(
        short = 'f',
        long = "file",
        help = "File to encode (reads raw bytes → base64)"
    )]
    pub file: Option<String>,
    #[arg(
        short = 'o',
        long = "output",
        help = "Write output to file instead of stdout"
    )]
    pub output: Option<String>,
}

pub fn command() -> clap::Command {
    clap::Command::new("encode")
        .about("Encode text/file to base64")
        .arg(
            clap::Arg::new("text")
                .help("Text to encode")
                .required(false),
        )
        .arg(
            clap::Arg::new("file")
                .short('f')
                .long("file")
                .help("File to encode (reads raw bytes → base64)")
                .value_name("PATH")
                .conflicts_with("text"),
        )
        .arg(
            clap::Arg::new("output")
                .short('o')
                .long("output")
                .help("Write output to file instead of stdout")
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
                print!("Text: ");
                io::stdout().flush()?;
                let mut buf = String::new();
                io::stdin().lock().read_line(&mut buf)?;
                buf.trim().to_string()
            }
        };
        text.into_bytes()
    };

    let encoded = ::base64::Engine::encode(&::base64::engine::general_purpose::STANDARD, &input);
    if let Some(path) = output {
        fs::write(&path, encoded)?;
    } else {
        println!("{}", encoded);
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
