pub fn command() -> clap::Command {
    clap::Command::new("count")
        .about("Count lines, words, and bytes in a file")
        .arg(
            clap::Arg::new("file")
                .short('f')
                .long("file")
                .help("File path")
                .required(true),
        )
}

pub async fn run(m: &clap::ArgMatches, json: bool) -> anyhow::Result<()> {
    let file_path = m.get_one::<String>("file").unwrap();

    let data = std::fs::read(file_path)?;

    let lines = data.iter().filter(|&&b| b == b'\n').count();
    let content = String::from_utf8_lossy(&data);
    let words = content.split_whitespace().count();
    let bytes = data.len();

    if json {
        let output = serde_json::json!({
            "file": file_path,
            "lines": lines,
            "words": words,
            "bytes": bytes,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("{lines:>8} {words:>8} {bytes:>8} {file_path}");
    }

    Ok(())
}
