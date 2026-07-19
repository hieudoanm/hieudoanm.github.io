use std::path::Path;

use anyhow::Context;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'i', long = "file", help = "Input image file")]
    pub file: String,
    #[arg(
        short = 'f',
        long = "format",
        default_value = "png",
        help = "Output format (png, jpg, gif)"
    )]
    pub format: String,
    #[arg(short = 'o', long = "output", help = "Output file path")]
    pub output: Option<String>,
}

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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let file = &matches.file;
    let to_format = &matches.format;
    let output = matches.output.as_ref();

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
