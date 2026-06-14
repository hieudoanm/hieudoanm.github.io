use std::collections::HashMap;
use std::io::{self, BufRead, Write};

pub fn command() -> clap::Command {
    clap::Command::new("convert")
        .about("Text conversion utilities")
        .subcommand_required(true)
        .subcommand(clap::Command::new("braille").about("Convert text to braille"))
        .subcommand(clap::Command::new("morse").about("Convert text to Morse code"))
        .subcommand(
            clap::Command::new("base64")
                .about("Base64 encode/decode")
                .arg(clap::Arg::new("text").help("Text to encode").required(true)),
        )
        .subcommand(clap::Command::new("url").about("URL encode/decode"))
        .subcommand(clap::Command::new("capitalise").about("Capitalise a string"))
        .subcommand(clap::Command::new("deburr").about("Remove diacritics from a string"))
        .subcommand(clap::Command::new("kebabcase").about("Convert to kebab-case"))
        .subcommand(clap::Command::new("camelcase").about("Convert to camelCase"))
        .subcommand(clap::Command::new("pascalcase").about("Convert to PascalCase"))
        .subcommand(clap::Command::new("slug").about("Create URL-friendly slug"))
        .subcommand(clap::Command::new("lowercase").about("Convert to lowercase"))
        .subcommand(clap::Command::new("snakecase").about("Convert to snake_case"))
        .subcommand(clap::Command::new("uppercase").about("Convert to UPPERCASE"))
        .subcommand(clap::Command::new("count").about("Count characters, words, lines"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("braille", _m)) => {
            run_braille()?;
        }
        Some(("morse", _m)) => {
            run_morse()?;
        }
        Some((name, sub_m)) => {
            run_string(name, sub_m).await?;
        }
        _ => {}
    }
    Ok(())
}

fn read_stdin() -> anyhow::Result<String> {
    print!("Text: ");
    io::stdout().flush()?;
    let mut text = String::new();
    io::stdin().lock().read_line(&mut text)?;
    Ok(text.trim().to_string())
}

fn braille_map() -> HashMap<char, &'static str> {
    let mut m = HashMap::new();
    m.insert('a', "⠁");
    m.insert('b', "⠃");
    m.insert('c', "⠉");
    m.insert('d', "⠙");
    m.insert('e', "⠑");
    m.insert('f', "⠋");
    m.insert('g', "⠛");
    m.insert('h', "⠓");
    m.insert('i', "⠊");
    m.insert('j', "⠚");
    m.insert('k', "⠅");
    m.insert('l', "⠇");
    m.insert('m', "⠍");
    m.insert('n', "⠝");
    m.insert('o', "⠕");
    m.insert('p', "⠏");
    m.insert('q', "⠟");
    m.insert('r', "⠗");
    m.insert('s', "⠎");
    m.insert('t', "⠞");
    m.insert('u', "⠥");
    m.insert('v', "⠧");
    m.insert('w', "⠺");
    m.insert('x', "⠭");
    m.insert('y', "⠽");
    m.insert('z', "⠵");
    m.insert('.', "⠲");
    m.insert(',', "⠂");
    m.insert(';', "⠆");
    m.insert(':', "⠒");
    m.insert('!', "⠖");
    m.insert('?', "⠦");
    m.insert('\'', "⠄");
    m.insert('-', "⠤");
    m.insert('(', "⠣");
    m.insert(')', "⠜");
    m.insert('"', "⠘");
    m
}

fn run_braille() -> anyhow::Result<()> {
    let text = read_stdin()?;
    let map = braille_map();
    let mut result = String::new();
    for ch in text.chars() {
        let lower = ch.to_ascii_lowercase();
        if let Some(code) = map.get(&lower) {
            result.push_str(code);
        } else {
            result.push(ch);
        }
    }
    println!("Braille: {result}");
    Ok(())
}

fn morse_map() -> HashMap<char, &'static str> {
    let mut m = HashMap::new();
    m.insert('a', ".-");
    m.insert('b', "-...");
    m.insert('c', "-.-.");
    m.insert('d', "-..");
    m.insert('e', ".");
    m.insert('f', "..-.");
    m.insert('g', "--.");
    m.insert('h', "....");
    m.insert('i', "..");
    m.insert('j', ".---");
    m.insert('k', "-.-");
    m.insert('l', ".-..");
    m.insert('m', "--");
    m.insert('n', "-.");
    m.insert('o', "---");
    m.insert('p', ".--.");
    m.insert('q', "--.-");
    m.insert('r', ".-.");
    m.insert('s', "...");
    m.insert('t', "-");
    m.insert('u', "..-");
    m.insert('v', "...-");
    m.insert('w', ".--");
    m.insert('x', "-..-");
    m.insert('y', "-.--");
    m.insert('z', "--..");
    m.insert('1', ".----");
    m.insert('2', "..---");
    m.insert('3', "...--");
    m.insert('4', "....-");
    m.insert('5', ".....");
    m.insert('6', "-....");
    m.insert('7', "--...");
    m.insert('8', "---..");
    m.insert('9', "----.");
    m.insert('0', "-----");
    m.insert('.', ".-.-.-");
    m.insert(',', "--..--");
    m.insert(';', "-.-.-.");
    m.insert(':', "---...");
    m.insert('!', "-.-.--");
    m.insert('?', "..--..");
    m
}

fn run_morse() -> anyhow::Result<()> {
    let text = read_stdin()?;
    let map = morse_map();
    let mut result = Vec::new();
    for ch in text.chars() {
        let lower = ch.to_ascii_lowercase();
        if let Some(code) = map.get(&lower) {
            result.push(code.to_string());
        } else {
            result.push(ch.to_string());
        }
    }
    println!("Morse Code: {}", result.join(""));
    Ok(())
}

async fn run_string(name: &str, sub_m: &clap::ArgMatches) -> anyhow::Result<()> {
    let text = match sub_m.get_one::<String>("text") {
        Some(t) => t.clone(),
        None => read_stdin()?,
    };

    match name {
        "base64" => {
            println!(
                "{}",
                base64::Engine::encode(&base64::engine::general_purpose::STANDARD, text.as_bytes())
            );
        }
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
