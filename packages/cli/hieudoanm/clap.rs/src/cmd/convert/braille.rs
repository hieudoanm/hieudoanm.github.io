use std::collections::HashMap;

use crate::cmd::convert::read_stdin;

pub fn command() -> clap::Command {
    clap::Command::new("braille").about("Convert text to braille")
}

pub async fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_braille_map_contains_all_letters() {
        let map = braille_map();
        for ch in 'a'..='z' {
            assert!(map.contains_key(&ch), "missing braille for {ch}");
        }
    }

    #[test]
    fn test_braille_map_contains_punctuation() {
        let map = braille_map();
        assert!(map.contains_key(&'.'));
        assert!(map.contains_key(&','));
        assert!(map.contains_key(&'!'));
        assert!(map.contains_key(&'?'));
    }

    #[test]
    fn test_braille_map_known_value() {
        let map = braille_map();
        assert_eq!(map.get(&'a'), Some(&"⠁"));
        assert_eq!(map.get(&'z'), Some(&"⠵"));
    }

    #[test]
    fn test_braille_map_lowercase_only() {
        let map = braille_map();
        assert!(map.contains_key(&'a'));
        assert!(!map.contains_key(&'A'));
    }
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
