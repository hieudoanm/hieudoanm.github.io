use std::path::Path;
use std::process::Command;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'f', long = "file", help = "File to encrypt")]
    pub file: String,
    #[arg(short = 'p', long = "password", help = "Encryption password")]
    pub password: String,
    #[arg(short = 'o', long = "output", help = "Output file")]
    pub output: Option<String>,
}

pub fn command() -> clap::Command {
    clap::Command::new("encrypt")
        .about("Encrypt data")
        .arg(
            clap::Arg::new("file")
                .long("file")
                .short('f')
                .help("File to encrypt")
                .required(true),
        )
        .arg(
            clap::Arg::new("password")
                .long("password")
                .short('p')
                .help("Encryption password")
                .required(true),
        )
        .arg(
            clap::Arg::new("output")
                .long("output")
                .short('o')
                .help("Output file"),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let file = &matches.file;
    let password = &matches.password;
    let output = matches.output.as_ref();

    let out_path = output.cloned().unwrap_or_else(|| format!("{file}.enc"));

    let status = Command::new("openssl")
        .args(["enc", "-aes-256-cbc", "-pbkdf2", "-salt"])
        .args(["-in", file])
        .args(["-out", &out_path])
        .args(["-pass", &format!("pass:{password}")])
        .status()?;

    if !status.success() {
        anyhow::bail!("openssl encryption failed");
    }

    if Path::new(&out_path).exists() {
        println!("{out_path}");
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
