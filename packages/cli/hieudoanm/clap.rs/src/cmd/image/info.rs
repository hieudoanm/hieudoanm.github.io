use anyhow::Context;

pub fn command() -> clap::Command {
    clap::Command::new("info")
        .about("Show image metadata (dimensions, format, etc.)")
        .arg(
            clap::Arg::new("file")
                .short('f')
                .long("file")
                .help("Image file")
                .required(true),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let file = matches.get_one::<String>("file").unwrap();
    let json = matches.get_flag("json");

    let img = image::ImageReader::open(file)
        .with_context(|| format!("failed to open {file}"))?
        .with_guessed_format()
        .context("failed to guess image format")?;
    let format = img
        .format()
        .map(|f| format!("{f:?}"))
        .unwrap_or_else(|| "unknown".to_string());
    let decoded = img.decode().context("not a recognized image")?;
    let (width, height) = (decoded.width(), decoded.height());
    let color = format!("{:?}", decoded.color());
    let metadata = std::fs::metadata(file).context("failed to read file metadata")?;
    let size_kb = metadata.len() / 1024;

    if json {
        let out = serde_json::json!({
            "file": file,
            "format": format,
            "width": width,
            "height": height,
            "sizeKB": size_kb,
        });
        println!("{out:#}");
    } else {
        println!("File     : {file}");
        println!("Format   : {format}");
        println!("Width    : {width} px");
        println!("Height   : {height} px");
        println!("Size     : {size_kb} KB");
        println!("Color    : {color}");
    }

    Ok(())
}
