use std::process::Command;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'f', long = "file", help = "File to decrypt")]
    pub file: String,
    #[arg(short = 'p', long = "password", help = "Decryption password")]
    pub password: String,
    #[arg(short = 'o', long = "output", help = "Output file")]
    pub output: Option<String>,
}

pub fn command() -> clap::Command {
    clap::Command::new("decrypt")
        .about("Decrypt data")
        .arg(
            clap::Arg::new("file")
                .long("file")
                .short('f')
                .help("File to decrypt")
                .required(true),
        )
        .arg(
            clap::Arg::new("password")
                .long("password")
                .short('p')
                .help("Decryption password")
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

    let out_path = output.cloned().unwrap_or_else(|| {
        let f = file.as_str();
        f.strip_suffix(".enc")
            .map(|s| s.to_string())
            .unwrap_or_else(|| format!("{f}.dec"))
    });

    let status = Command::new("openssl")
        .args(["enc", "-d", "-aes-256-cbc", "-pbkdf2", "-salt"])
        .args(["-in", file])
        .args(["-out", &out_path])
        .args(["-pass", &format!("pass:{password}")])
        .status()?;

    if !status.success() {
        anyhow::bail!("openssl decryption failed (wrong password or corrupted file)");
    }

    println!("{out_path}");
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
