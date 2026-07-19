use crate::cmd::convert::read_stdin;

fn text_arg() -> clap::Arg {
    clap::Arg::new("text").help("Text to convert")
}

pub fn commands() -> Vec<clap::Command> {
    vec![
        clap::Command::new("capitalise")
            .about("Capitalise a string")
            .arg(text_arg()),
        clap::Command::new("deburr")
            .about("Remove diacritics from a string")
            .arg(text_arg()),
        clap::Command::new("kebabcase")
            .about("Convert to kebab-case")
            .arg(text_arg()),
        clap::Command::new("camelcase")
            .about("Convert to camelCase")
            .arg(text_arg()),
        clap::Command::new("pascalcase")
            .about("Convert to PascalCase")
            .arg(text_arg()),
        clap::Command::new("slug")
            .about("Create URL-friendly slug")
            .arg(text_arg()),
        clap::Command::new("lowercase")
            .about("Convert to lowercase")
            .arg(text_arg()),
        clap::Command::new("snakecase")
            .about("Convert to snake_case")
            .arg(text_arg()),
        clap::Command::new("uppercase")
            .about("Convert to UPPERCASE")
            .arg(text_arg()),
        clap::Command::new("count")
            .about("Count characters, words, lines")
            .arg(text_arg()),
        clap::Command::new("url")
            .about("URL encode/decode")
            .arg(text_arg()),
    ]
}

pub fn capitalise_str(s: &str) -> String {
    let mut chars = s.chars();
    match chars.next() {
        None => String::new(),
        Some(c) => c.to_uppercase().to_string() + chars.as_str(),
    }
}

pub fn kebabcase_str(s: &str) -> String {
    s.to_lowercase().replace(' ', "-")
}

pub fn snakecase_str(s: &str) -> String {
    s.to_lowercase().replace(' ', "_")
}

pub fn deburr_str(s: &str) -> String {
    deunicode::deunicode(s)
}

pub async fn run(name: &str, sub_m: &clap::ArgMatches) -> anyhow::Result<()> {
    let text = match sub_m.get_one::<String>("text") {
        Some(t) => t.clone(),
        None => read_stdin()?,
    };

    match name {
        "capitalise" => {
            println!("{}", capitalise_str(&text));
        }
        "deburr" => {
            println!("{}", deburr_str(&text));
        }
        "kebabcase" => {
            println!("{}", kebabcase_str(&text));
        }
        "lowercase" => {
            println!("{}", text.to_lowercase());
        }
        "snakecase" => {
            println!("{}", snakecase_str(&text));
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_capitalise_str_normal() {
        assert_eq!(capitalise_str("hello"), "Hello");
    }

    #[test]
    fn test_capitalise_str_already_capitalised() {
        assert_eq!(capitalise_str("Hello"), "Hello");
    }

    #[test]
    fn test_capitalise_str_single_char() {
        assert_eq!(capitalise_str("a"), "A");
    }

    #[test]
    fn test_capitalise_str_multiple_words() {
        assert_eq!(capitalise_str("hello world"), "Hello world");
    }

    #[test]
    fn test_kebabcase_str() {
        assert_eq!(kebabcase_str("hello world"), "hello-world");
    }

    #[test]
    fn test_kebabcase_str_single_word() {
        assert_eq!(kebabcase_str("hello"), "hello");
    }

    #[test]
    fn test_kebabcase_str_empty() {
        assert_eq!(kebabcase_str(""), "");
    }

    #[test]
    fn test_snakecase_str() {
        assert_eq!(snakecase_str("hello world"), "hello_world");
    }

    #[test]
    fn test_snakecase_str_single_word() {
        assert_eq!(snakecase_str("hello"), "hello");
    }

    #[test]
    fn test_snakecase_str_empty() {
        assert_eq!(snakecase_str(""), "");
    }

    #[test]
    fn test_deburr_str() {
        assert_eq!(deburr_str("café"), "cafe");
        assert_eq!(deburr_str("résumé"), "resume");
    }

    #[test]
    fn test_deburr_str_ascii() {
        assert_eq!(deburr_str("hello"), "hello");
    }

    #[test]
    fn test_deburr_str_empty() {
        assert_eq!(deburr_str(""), "");
    }

    #[test]
    fn test_commands_definition() {
        let cmds = commands();
        assert!(!cmds.is_empty());
        for cmd in &cmds {
            assert!(!cmd.get_name().is_empty());
        }
    }

    #[tokio::test]
    async fn test_run_capitalise() {
        let mut cmds = commands();
        let cmd = cmds.remove(0);
        let m = cmd
            .try_get_matches_from(vec!["capitalise", "hello"])
            .unwrap();
        run("capitalise", &m).await.unwrap();
    }
}
