use std::path::Path;

use anyhow::Context;

pub fn command() -> clap::Command {
    clap::Command::new("convert")
        .about("Convert image to another format")
        .arg(
            clap::Arg::new("file")
                .short('i')
                .long("file")
                .help("Input image file")
                .required(true),
        )
        .arg(
            clap::Arg::new("format")
                .short('f')
                .long("format")
                .help("Output format (png, jpg, gif)")
                .default_value("png"),
        )
        .arg(
            clap::Arg::new("output")
                .short('o')
                .long("output")
                .help("Output file path"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let file = matches.get_one::<String>("file").unwrap();
    let to_format = matches.get_one::<String>("format").unwrap();
    let output = matches.get_one::<String>("output");

    let img = image::ImageReader::open(file)
        .with_context(|| format!("failed to open {file}"))?
        .decode()
        .context("decode error")?;

    let out_path = if let Some(out) = output {
        out.clone()
    } else {
        let base = Path::new(file)
            .file_stem()
            .and_then(|s| s.to_str())
            .unwrap_or("output");
        format!("{base}.{to_format}")
    };

    match to_format.as_str() {
        "png" => {
            img.save(&out_path).context("failed to save png")?;
        }
        "jpg" | "jpeg" => {
            img.save(&out_path).context("failed to save jpeg")?;
        }
        "gif" => {
            img.save(&out_path).context("failed to save gif")?;
        }
        _ => anyhow::bail!("unsupported format: {to_format} (use png, jpg, gif)"),
    }

    println!("Converted to {out_path}");
    Ok(())
}
