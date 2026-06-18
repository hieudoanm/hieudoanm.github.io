pub fn command() -> clap::Command {
    clap::Command::new("uuid").about("Generate a UUID")
}

pub async fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let id = uuid::Uuid::new_v4();
    println!("{id}");
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
