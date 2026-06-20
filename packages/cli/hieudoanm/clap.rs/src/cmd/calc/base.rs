use std::collections::HashMap;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'v', long = "value", help = "Value to convert")]
    pub value: String,
    #[arg(
        short = 'f',
        long = "from",
        default_value = "dec",
        help = "Source base (bin/oct/dec/hex)"
    )]
    pub from: String,
    #[arg(
        short = 't',
        long = "to",
        default_value = "hex",
        help = "Target base (bin/oct/dec/hex)"
    )]
    pub to: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("base")
        .about("Convert between number bases (bin/oct/dec/hex)")
        .arg(
            clap::Arg::new("value")
                .long("value")
                .short('v')
                .help("Value to convert")
                .required(true),
        )
        .arg(
            clap::Arg::new("from")
                .long("from")
                .short('f')
                .help("Source base (bin/oct/dec/hex)")
                .default_value("dec"),
        )
        .arg(
            clap::Arg::new("to")
                .long("to")
                .short('t')
                .help("Target base (bin/oct/dec/hex)")
                .default_value("hex"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let value = &matches.value;
    let from = &matches.from;
    let to = &matches.to;
    let json = matches.json;

    let bases: HashMap<&str, u32> = [
        ("bin", 2),
        ("binary", 2),
        ("oct", 8),
        ("octal", 8),
        ("dec", 10),
        ("decimal", 10),
        ("hex", 16),
        ("hexadecimal", 16),
    ]
    .iter()
    .cloned()
    .collect();

    let from_base = bases
        .get(from.as_str())
        .ok_or_else(|| anyhow::anyhow!("unknown base: {} (use bin/oct/dec/hex)", from))?;
    let to_base = bases
        .get(to.as_str())
        .ok_or_else(|| anyhow::anyhow!("unknown base: {} (use bin/oct/dec/hex)", to))?;

    let n = i64::from_str_radix(value, *from_base)
        .map_err(|_| anyhow::anyhow!("invalid value '{}' for base {}", value, from))?;

    let result = match to_base {
        2 => format!("{:b}", n),
        8 => format!("{:o}", n),
        10 => format!("{}", n),
        16 => format!("{:X}", n),
        _ => unreachable!(),
    };

    let base_names: HashMap<u32, &str> = [
        (2, "binary"),
        (8, "octal"),
        (10, "decimal"),
        (16, "hexadecimal"),
    ]
    .iter()
    .cloned()
    .collect();

    if json {
        let output = serde_json::json!({
            "value": value,
            "from": base_names.get(from_base).unwrap_or(&"unknown"),
            "to": base_names.get(to_base).unwrap_or(&"unknown"),
            "result": result,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!(
            "{} ({}) = {} ({})",
            value,
            base_names.get(from_base).unwrap_or(&"unknown"),
            result,
            base_names.get(to_base).unwrap_or(&"unknown"),
        );
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_dec_to_hex() {
        let value = "255";
        let from_base = 10u32;
        let to_base = 16u32;
        let n = i64::from_str_radix(value, from_base).unwrap();
        let result = match to_base {
            2 => format!("{:b}", n),
            8 => format!("{:o}", n),
            10 => format!("{}", n),
            16 => format!("{:X}", n),
            _ => unreachable!(),
        };
        assert_eq!(result, "FF");
    }

    #[test]
    fn test_hex_to_dec() {
        let value = "FF";
        let from_base = 16u32;
        let to_base = 10u32;
        let n = i64::from_str_radix(value, from_base).unwrap();
        let result = match to_base {
            2 => format!("{:b}", n),
            8 => format!("{:o}", n),
            10 => format!("{}", n),
            16 => format!("{:X}", n),
            _ => unreachable!(),
        };
        assert_eq!(result, "255");
    }

    #[test]
    fn test_dec_to_bin() {
        let value = "42";
        let from_base = 10u32;
        let to_base = 2u32;
        let n = i64::from_str_radix(value, from_base).unwrap();
        let result = match to_base {
            2 => format!("{:b}", n),
            8 => format!("{:o}", n),
            10 => format!("{}", n),
            16 => format!("{:X}", n),
            _ => unreachable!(),
        };
        assert_eq!(result, "101010");
    }

    #[test]
    fn test_bin_to_oct() {
        let value = "101010";
        let from_base = 2u32;
        let to_base = 8u32;
        let n = i64::from_str_radix(value, from_base).unwrap();
        let result = match to_base {
            2 => format!("{:b}", n),
            8 => format!("{:o}", n),
            10 => format!("{}", n),
            16 => format!("{:X}", n),
            _ => unreachable!(),
        };
        assert_eq!(result, "52");
    }

    #[test]
    fn test_bases_map() {
        let bases: HashMap<&str, u32> = [
            ("bin", 2),
            ("binary", 2),
            ("oct", 8),
            ("octal", 8),
            ("dec", 10),
            ("decimal", 10),
            ("hex", 16),
            ("hexadecimal", 16),
        ]
        .iter()
        .cloned()
        .collect();

        assert_eq!(*bases.get("bin").unwrap(), 2u32);
        assert_eq!(*bases.get("hexadecimal").unwrap(), 16u32);
    }

    #[test]
    fn test_negative_number_hex() {
        let n = -255i64;
        let hex = format!("{:X}", n);
        assert_eq!(hex, String::from("FFFFFFFFFFFFFF01"));
    }
}
