use crate::cmd::convert::read_stdin;

pub fn commands() -> Vec<clap::Command> {
    vec![
        clap::Command::new("capitalise").about("Capitalise a string"),
        clap::Command::new("deburr").about("Remove diacritics from a string"),
        clap::Command::new("kebabcase").about("Convert to kebab-case"),
        clap::Command::new("camelcase").about("Convert to camelCase"),
        clap::Command::new("pascalcase").about("Convert to PascalCase"),
        clap::Command::new("slug").about("Create URL-friendly slug"),
        clap::Command::new("lowercase").about("Convert to lowercase"),
        clap::Command::new("snakecase").about("Convert to snake_case"),
        clap::Command::new("uppercase").about("Convert to UPPERCASE"),
        clap::Command::new("count").about("Count characters, words, lines"),
        clap::Command::new("url").about("URL encode/decode"),
    ]
}

pub async fn run(name: &str, sub_m: &clap::ArgMatches) -> anyhow::Result<()> {
    let text = match sub_m.get_one::<String>("text") {
        Some(t) => t.clone(),
        None => read_stdin()?,
    };

    match name {
        "capitalise" => {
            let mut chars = text.chars();
            let result = match chars.next() {
                None => String::new(),
                Some(c) => c.to_uppercase().to_string() + chars.as_str(),
            };
            println!("{result}");
        }
        "deburr" => {
            println!("{}", deunicode::deunicode(&text));
        }
        "kebabcase" => {
            println!("{}", text.to_lowercase().replace(' ', "-"));
        }
        "lowercase" => {
            println!("{}", text.to_lowercase());
        }
        "snakecase" => {
            println!("{}", text.to_lowercase().replace(' ', "_"));
        }
        "uppercase" => {
            println!("{}", text.to_uppercase());
        }
        "camelcase" | "pascalcase" | "slug" | "url" | "count" => {
            println!("convert {name} (not yet implemented)");
        }
        _ => {}
    }
    Ok(())
}
