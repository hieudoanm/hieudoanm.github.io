use std::io::{self, BufRead, Write};

pub fn command() -> clap::Command {
    clap::Command::new("string")
        .about("String manipulation tools")
        .alias("str")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("capitalise")
                .about("Capitalise a string"),
        )
        .subcommand(
            clap::Command::new("deburr")
                .about("Remove diacritics from a string"),
        )
        .subcommand(
            clap::Command::new("kebabcase")
                .about("Convert to kebab-case"),
        )
        .subcommand(
            clap::Command::new("lowercase")
                .about("Convert to lowercase"),
        )
        .subcommand(
            clap::Command::new("snakecase")
                .about("Convert to snake_case"),
        )
        .subcommand(
            clap::Command::new("uppercase")
                .about("Convert to UPPERCASE"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let input = || -> anyhow::Result<String> {
        print!("Text: ");
        io::stdout().flush()?;
        let mut text = String::new();
        io::stdin().lock().read_line(&mut text)?;
        Ok(text.trim().to_string())
    };

    match matches.subcommand() {
        Some(("capitalise", _m)) => {
            let text = input()?;
            let mut chars = text.chars();
            let result = match chars.next() {
                None => String::new(),
                Some(c) => c.to_uppercase().to_string() + chars.as_str(),
            };
            println!("{result}");
        }
        Some(("deburr", _m)) => {
            let text = input()?;
            let result = deunicode::deunicode(&text);
            println!("{result}");
        }
        Some(("kebabcase", _m)) => {
            let text = input()?;
            let result = text.to_lowercase().replace(' ', "-");
            println!("{result}");
        }
        Some(("lowercase", _m)) => {
            let text = input()?;
            println!("{}", text.to_lowercase());
        }
        Some(("snakecase", _m)) => {
            let text = input()?;
            let result = text.to_lowercase().replace(' ', "_");
            println!("{result}");
        }
        Some(("uppercase", _m)) => {
            let text = input()?;
            println!("{}", text.to_uppercase());
        }
        _ => {}
    }
    Ok(())
}
