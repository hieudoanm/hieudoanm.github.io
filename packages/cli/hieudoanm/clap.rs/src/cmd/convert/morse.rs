use std::collections::HashMap;

use crate::cmd::convert::read_stdin;

pub fn command() -> clap::Command {
    clap::Command::new("morse").about("Convert text to Morse code")
}

pub async fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
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
