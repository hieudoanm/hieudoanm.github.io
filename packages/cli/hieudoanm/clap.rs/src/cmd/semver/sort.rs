pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let versions_str = matches.get_one::<String>("versions").unwrap();
    let mut versions: Vec<super::Version> = versions_str
        .split(',')
        .map(|s| super::parse_version(s.trim()))
        .collect::<anyhow::Result<_>>()?;
    versions.sort_by(super::compare);
    for v in &versions {
        println!("{v}");
    }
    Ok(())
}
