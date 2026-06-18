use clap::ArgMatches;
use rand::Rng;

const LOWERCASE: &[u8] = b"abcdefghijklmnopqrstuvwxyz";
const UPPERCASE: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS: &[u8] = b"0123456789";
const SYMBOLS: &[u8] = b"!@#$%^&*()-_=+[]{}<>?|~";
const VOWELS: &[u8] = b"aeiou";
const CONSONANTS: &[u8] = b"bcdfghjklmnpqrstvwxyz";

pub fn command() -> clap::Command {
    clap::Command::new("passwd")
        .about("Generate secure random passwords")
        .arg(
            clap::Arg::new("length")
                .long("length")
                .short('l')
                .help("Password length")
                .default_value("16"),
        )
        .arg(
            clap::Arg::new("count")
                .long("count")
                .short('n')
                .help("Number of passwords")
                .default_value("1"),
        )
        .arg(
            clap::Arg::new("digits")
                .long("digits")
                .short('d')
                .help("Include digits")
                .action(clap::ArgAction::Set)
                .default_value("true"),
        )
        .arg(
            clap::Arg::new("symbols")
                .long("symbols")
                .short('s')
                .help("Include symbols")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("no-upper")
                .long("no-upper")
                .help("Exclude uppercase letters")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("pin")
                .long("pin")
                .help("Generate numeric PIN")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("clip")
                .long("clip")
                .help("Copy to clipboard (first password only)")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("pronounceable")
                .long("pronounceable")
                .help("Generate pronounceable password")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_pronounceable_length() {
        for len in [4, 8, 12, 16] {
            let pw = generate_pronounceable(len);
            assert_eq!(pw.len(), len, "length mismatch for {len}");
        }
    }

    #[test]
    fn test_generate_pronounceable_only_consonants_and_vowels() {
        let pw = generate_pronounceable(100);
        for (i, c) in pw.chars().enumerate() {
            if i % 2 == 0 {
                assert!(
                    CONSONANTS.contains(&(c as u8)),
                    "expected consonant at {i}, got {c}"
                );
            } else {
                assert!(
                    VOWELS.contains(&(c as u8)),
                    "expected vowel at {i}, got {c}"
                );
            }
        }
    }

    #[test]
    fn test_generate_pronounceable_empty() {
        assert_eq!(generate_pronounceable(0), "");
    }

    #[test]
    fn test_generate_pronounceable_different() {
        let a = generate_pronounceable(16);
        let b = generate_pronounceable(16);
        assert_ne!(
            a, b,
            "two calls should produce different passwords"
        );
    }
}

fn generate_pronounceable(length: usize) -> String {
    let mut rng = rand::thread_rng();
    let mut s = String::with_capacity(length);
    while s.len() < length {
        s.push(CONSONANTS[rng.gen_range(0..CONSONANTS.len())] as char);
        s.push(VOWELS[rng.gen_range(0..VOWELS.len())] as char);
    }
    s.truncate(length);
    s
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let length: usize = matches
        .get_one::<String>("length")
        .unwrap()
        .parse()
        .unwrap_or(16);
    let count: usize = matches
        .get_one::<String>("count")
        .unwrap()
        .parse()
        .unwrap_or(1);
    let include_digits = matches
        .get_one::<String>("digits")
        .map(|s| s != "false")
        .unwrap_or(true);
    let include_symbols = matches.get_flag("symbols");
    let no_upper = matches.get_flag("no-upper");
    let pin = matches.get_flag("pin");
    let clip = matches.get_flag("clip");
    let pronounceable = matches.get_flag("pronounceable");
    let json = matches.get_flag("json");

    let mut rng = rand::thread_rng();
    let mut passwords = Vec::with_capacity(count);

    for _ in 0..count {
        let pw = if pin {
            (0..length)
                .map(|_| DIGITS[rng.gen_range(0..DIGITS.len())] as char)
                .collect()
        } else if pronounceable {
            generate_pronounceable(length)
        } else {
            let mut charset = LOWERCASE.to_vec();
            if !no_upper {
                charset.extend_from_slice(UPPERCASE);
            }
            if include_digits {
                charset.extend_from_slice(DIGITS);
            }
            if include_symbols {
                charset.extend_from_slice(SYMBOLS);
            }
            (0..length)
                .map(|_| charset[rng.gen_range(0..charset.len())] as char)
                .collect()
        };
        passwords.push(pw);
    }

    if json {
        let kind = if pin {
            "pin"
        } else if pronounceable {
            "pronounceable"
        } else {
            "random"
        };
        let out = serde_json::json!({
            "passwords": passwords,
            "count": count,
            "length": length,
            "type": kind,
        });
        println!("{}", serde_json::to_string_pretty(&out)?);
    } else if clip {
        print!("{}", passwords[0]);
    } else {
        for p in &passwords {
            println!("{p}");
        }
    }
    Ok(())
}
