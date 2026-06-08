use std::collections::HashMap;
use std::io::{self, BufRead, Write};

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
    m.insert('\'', ".----.");
    m.insert('-', "-....-");
    m.insert('(', "-.--.");
    m.insert(')', "-.--.-");
    m.insert('"', ".-..-.");
    m.insert('/', "-..-.");
    m
}

pub fn convert_text_to_morse(text: &str) -> String {
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
    result.join("")
}

pub fn command() -> clap::Command {
    clap::Command::new("morse").about("Convert text to Morse code")
}

pub fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    print!("Text: ");
    io::stdout().flush()?;
    let mut text = String::new();
    io::stdin().lock().read_line(&mut text)?;
    let text = text.trim().to_string();
    println!("Converting: {text}");
    let morse = convert_text_to_morse(&text);
    println!("Morse Code: {morse}");
    Ok(())
}
