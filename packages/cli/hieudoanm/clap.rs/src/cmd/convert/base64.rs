use crate::cmd::convert::read_stdin;

pub fn command() -> clap::Command {
    clap::Command::new("base64")
        .about("Base64 encode/decode")
        .arg(clap::Arg::new("text").help("Text to encode").required(true))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let text = match matches.get_one::<String>("text") {
        Some(t) => t.clone(),
        None => read_stdin()?,
    };
    println!(
        "{}",
        ::base64::Engine::encode(
            &::base64::engine::general_purpose::STANDARD,
            text.as_bytes()
        )
    );
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
