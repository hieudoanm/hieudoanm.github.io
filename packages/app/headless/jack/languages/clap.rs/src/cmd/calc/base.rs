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

    let result = convert_base(value, from, to)?;

    if json {
        let output = serde_json::json!({
            "value": value,
            "from": base_name(resolve_base(from).unwrap_or(0)),
            "to": base_name(resolve_base(to).unwrap_or(0)),
            "result": result,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!(
            "{} ({}) = {} ({})",
            value,
            base_name(resolve_base(from).unwrap_or(0)),
            result,
            base_name(resolve_base(to).unwrap_or(0)),
        );
    }

    Ok(())
}

pub fn resolve_base(name: &str) -> Option<u32> {
    match name {
        "bin" | "binary" => Some(2),
        "oct" | "octal" => Some(8),
        "dec" | "decimal" => Some(10),
        "hex" | "hexadecimal" => Some(16),
        _ => None,
    }
}

pub fn base_name(radix: u32) -> &'static str {
    match radix {
        2 => "binary",
        8 => "octal",
        10 => "decimal",
        16 => "hexadecimal",
        _ => "unknown",
    }
}

pub fn format_value(n: i64, radix: u32) -> String {
    match radix {
        2 => format!("{:b}", n),
        8 => format!("{:o}", n),
        10 => format!("{}", n),
        16 => format!("{:X}", n),
        _ => format!("{}", n),
    }
}

pub fn convert_base(value: &str, from: &str, to: &str) -> anyhow::Result<String> {
    let from_base = resolve_base(from)
        .ok_or_else(|| anyhow::anyhow!("unknown base: {} (use bin/oct/dec/hex)", from))?;
    let to_base = resolve_base(to)
        .ok_or_else(|| anyhow::anyhow!("unknown base: {} (use bin/oct/dec/hex)", to))?;

    let n = i64::from_str_radix(value, from_base)
        .map_err(|_| anyhow::anyhow!("invalid value '{}' for base {}", value, from))?;

    Ok(format_value(n, to_base))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_resolve_base_bin() {
        assert_eq!(resolve_base("bin"), Some(2));
        assert_eq!(resolve_base("binary"), Some(2));
    }

    #[test]
    fn test_resolve_base_oct() {
        assert_eq!(resolve_base("oct"), Some(8));
        assert_eq!(resolve_base("octal"), Some(8));
    }

    #[test]
    fn test_resolve_base_dec() {
        assert_eq!(resolve_base("dec"), Some(10));
        assert_eq!(resolve_base("decimal"), Some(10));
    }

    #[test]
    fn test_resolve_base_hex() {
        assert_eq!(resolve_base("hex"), Some(16));
        assert_eq!(resolve_base("hexadecimal"), Some(16));
    }

    #[test]
    fn test_resolve_base_unknown() {
        assert_eq!(resolve_base("trinary"), None);
        assert_eq!(resolve_base(""), None);
    }

    #[test]
    fn test_base_name_known() {
        assert_eq!(base_name(2), "binary");
        assert_eq!(base_name(8), "octal");
        assert_eq!(base_name(10), "decimal");
        assert_eq!(base_name(16), "hexadecimal");
    }

    #[test]
    fn test_base_name_unknown() {
        assert_eq!(base_name(0), "unknown");
        assert_eq!(base_name(7), "unknown");
    }

    #[test]
    fn test_format_value_bin() {
        assert_eq!(format_value(42, 2), "101010");
        assert_eq!(format_value(255, 2), "11111111");
    }

    #[test]
    fn test_format_value_oct() {
        assert_eq!(format_value(42, 8), "52");
        assert_eq!(format_value(64, 8), "100");
    }

    #[test]
    fn test_format_value_dec() {
        assert_eq!(format_value(255, 10), "255");
        assert_eq!(format_value(0, 10), "0");
    }

    #[test]
    fn test_format_value_hex() {
        assert_eq!(format_value(255, 16), "FF");
        assert_eq!(format_value(0, 16), "0");
    }

    #[test]
    fn test_format_value_negative() {
        assert_eq!(format_value(-255, 16), "FFFFFFFFFFFFFF01");
    }

    #[test]
    fn test_format_value_unknown_radix() {
        assert_eq!(format_value(42, 0), "42");
    }

    #[test]
    fn test_convert_base_dec_to_hex() {
        assert_eq!(convert_base("255", "dec", "hex").unwrap(), "FF");
    }

    #[test]
    fn test_convert_base_hex_to_dec() {
        assert_eq!(convert_base("FF", "hex", "dec").unwrap(), "255");
    }

    #[test]
    fn test_convert_base_dec_to_bin() {
        assert_eq!(convert_base("42", "dec", "bin").unwrap(), "101010");
    }

    #[test]
    fn test_convert_base_bin_to_oct() {
        assert_eq!(convert_base("101010", "bin", "oct").unwrap(), "52");
    }

    #[test]
    fn test_convert_base_unknown_from() {
        assert!(convert_base("42", "trinary", "dec").is_err());
    }

    #[test]
    fn test_convert_base_unknown_to() {
        assert!(convert_base("42", "dec", "trinary").is_err());
    }

    #[test]
    fn test_convert_base_invalid_value() {
        assert!(convert_base("ZZZ", "dec", "hex").is_err());
    }

    #[test]
    fn test_convert_base_empty_value() {
        assert!(convert_base("", "dec", "hex").is_err());
    }

    #[test]
    fn test_convert_base_full_names() {
        assert_eq!(convert_base("FF", "hexadecimal", "decimal").unwrap(), "255");
        assert_eq!(convert_base("42", "decimal", "binary").unwrap(), "101010");
    }
}
