use clap::FromArgMatches;
mod base64;
mod braille;
mod morse;
mod string;

use std::io::{self, BufRead, Write};

pub fn command() -> clap::Command {
    let mut cmd = clap::Command::new("convert")
        .about("Text conversion utilities")
        .subcommand_required(true)
        .subcommand(braille::command())
        .subcommand(morse::command())
        .subcommand(base64::command());
    for sc in string::commands() {
        cmd = cmd.subcommand(sc);
    }
    cmd
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("braille", m)) => braille::run(&braille::Args::from_arg_matches(m)?).await,
        Some(("morse", m)) => morse::run(&morse::Args::from_arg_matches(m)?).await,
        Some(("base64", m)) => base64::run(m).await,
        Some((name, m)) => string::run(name, m).await,
        _ => Ok(()),
    }
}

pub(crate) fn read_stdin() -> anyhow::Result<String> {
    print!("Text: ");
    io::stdout().flush()?;
    let mut text = String::new();
    io::stdin().lock().read_line(&mut text)?;
    Ok(text.trim().to_string())
}
