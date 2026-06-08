use std::collections::HashMap;
use std::io::{self, BufRead, Write};

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

pub fn convert_to_braille(text: &str) -> String {
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
    result
}

pub fn command() -> clap::Command {
    clap::Command::new("braille").about("Convert text to braille")
}

pub fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    print!("Text: ");
    io::stdout().flush()?;
    let mut text = String::new();
    io::stdin().lock().read_line(&mut text)?;
    let text = text.trim().to_string();
    println!("Converting: {text}");
    let braille = convert_to_braille(&text);
    println!("Braille: {braille}");
    Ok(())
}
