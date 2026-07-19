use super::parse_version;

fn check_range(version_str: &str, range_str: &str) -> anyhow::Result<bool> {
    let ver = parse_version(version_str)?;

    let parts: Vec<&str> = range_str.split_whitespace().collect();
    if parts.is_empty() {
        anyhow::bail!("invalid range format: use e.g. '>=1.0.0 <2.0.0'");
    }
    if parts.len() % 2 != 0 {
        anyhow::bail!("invalid range format: use e.g. '>=1.0.0 <2.0.0'");
    }

    for chunk in parts.chunks(2) {
        let op = chunk[0];
        let target_str = chunk[1];
        let target = parse_version(target_str)?;
        let cmp = super::compare(&ver, &target);

        let ok = match op {
            ">=" => cmp != std::cmp::Ordering::Less,
            "<=" => cmp != std::cmp::Ordering::Greater,
            ">" => cmp == std::cmp::Ordering::Greater,
            "<" => cmp == std::cmp::Ordering::Less,
            "=" | "==" => cmp == std::cmp::Ordering::Equal,
            "!=" => cmp != std::cmp::Ordering::Equal,
            _ => anyhow::bail!("unknown operator '{op}'"),
        };

        if !ok {
            return Ok(false);
        }
    }

    Ok(true)
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let version_str = matches
        .get_one::<String>("version")
        .ok_or_else(|| anyhow::anyhow!("version required"))?;
    let range_str = matches
        .get_one::<String>("range")
        .ok_or_else(|| anyhow::anyhow!("range required (e.g. '>=1.0.0 <2.0.0')"))?;

    let result = check_range(version_str, range_str)?;
    println!("{result}");
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_check_range_equal() {
        assert!(check_range("1.2.3", "= 1.2.3").unwrap());
        assert!(check_range("1.2.3", "== 1.2.3").unwrap());
    }

    #[test]
    fn test_check_range_not_equal() {
        assert!(!check_range("1.2.3", "!= 1.2.3").unwrap());
        assert!(check_range("1.2.3", "!= 1.2.4").unwrap());
    }

    #[test]
    fn test_check_range_greater_than() {
        assert!(check_range("2.0.0", "> 1.0.0").unwrap());
        assert!(!check_range("1.0.0", "> 1.0.0").unwrap());
        assert!(!check_range("0.9.0", "> 1.0.0").unwrap());
    }

    #[test]
    fn test_check_range_less_than() {
        assert!(check_range("0.9.0", "< 1.0.0").unwrap());
        assert!(!check_range("1.0.0", "< 1.0.0").unwrap());
        assert!(!check_range("1.0.1", "< 1.0.0").unwrap());
    }

    #[test]
    fn test_check_range_greater_eq() {
        assert!(check_range("1.0.0", ">= 1.0.0").unwrap());
        assert!(check_range("1.0.1", ">= 1.0.0").unwrap());
        assert!(!check_range("0.9.0", ">= 1.0.0").unwrap());
    }

    #[test]
    fn test_check_range_less_eq() {
        assert!(check_range("1.0.0", "<= 1.0.0").unwrap());
        assert!(check_range("0.9.0", "<= 1.0.0").unwrap());
        assert!(!check_range("1.0.1", "<= 1.0.0").unwrap());
    }

    #[test]
    fn test_check_range_composite() {
        assert!(check_range("1.5.0", ">= 1.0.0 < 2.0.0").unwrap());
        assert!(!check_range("2.0.0", ">= 1.0.0 < 2.0.0").unwrap());
        assert!(!check_range("0.5.0", ">= 1.0.0 < 2.0.0").unwrap());
    }

    #[test]
    fn test_check_range_with_v_prefix() {
        assert!(check_range("v1.2.3", ">= 1.0.0").unwrap());
        assert!(check_range("1.2.3", ">= v1.0.0").unwrap());
    }

    #[test]
    fn test_check_range_unknown_operator() {
        assert!(check_range("1.0.0", "~1.0.0").is_err());
    }

    #[test]
    fn test_check_range_invalid_format() {
        assert!(check_range("1.0.0", ">=").is_err());
        assert!(check_range("1.0.0", "").is_err());
    }

    #[test]
    fn test_check_range_invalid_version() {
        assert!(check_range("abc", ">1.0.0").is_err());
    }
}
