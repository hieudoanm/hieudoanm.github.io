use std::cmp::Ordering;

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let a = super::parse_version(matches.get_one::<String>("a").unwrap())?;
    let b = super::parse_version(matches.get_one::<String>("b").unwrap())?;
    match super::compare(&a, &b) {
        Ordering::Less => println!("{} < {}", a, b),
        Ordering::Equal => println!("{} == {}", a, b),
        Ordering::Greater => println!("{} > {}", a, b),
    }
    Ok(())
}
