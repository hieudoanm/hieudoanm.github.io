use super::parse_version;

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let version_str = matches
        .get_one::<String>("version")
        .ok_or_else(|| anyhow::anyhow!("version required"))?;
    let range_str = matches
        .get_one::<String>("range")
        .ok_or_else(|| anyhow::anyhow!("range required (e.g. '>=1.0.0 <2.0.0')"))?;

    let ver = parse_version(version_str)?;

    let parts: Vec<&str> = range_str.split_whitespace().collect();
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
            println!("false");
            return Ok(());
        }
    }

    println!("true");
    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_module_compiles() {
        assert!(true);
    }
}
