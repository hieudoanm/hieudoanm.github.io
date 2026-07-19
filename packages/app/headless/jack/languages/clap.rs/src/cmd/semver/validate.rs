pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let v = matches.get_one::<String>("version").unwrap();
    match super::parse_version(v) {
        Ok(ver) => println!("✅ {v} is valid semver ({ver})"),
        Err(e) => println!("❌ {v} is invalid: {e}"),
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_module_compiles() {
        assert!(true);
    }
}
