use std::collections::HashMap;

use anyhow::Context;
use image::GenericImageView;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'f', long = "file", help = "Image file")]
    pub file: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("dominant")
        .about("Extract dominant color from an image")
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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let file = &matches.file;
    let json = matches.json;

    let img = image::ImageReader::open(file)
        .with_context(|| format!("failed to open {file}"))?
        .decode()
        .context("decode error")?;

    let (width, height) = img.dimensions();
    let total_pixels = width * height;
    let step = std::cmp::max(1, total_pixels / 10000);

    let mut color_counts: HashMap<String, usize> = HashMap::new();
    let mut count = 0u64;
    for y in 0..height {
        for x in 0..width {
            count += 1;
            if count % step as u64 != 0 {
                continue;
            }
            let pixel = img.get_pixel(x, y);
            let key = format!("#{:02x}{:02x}{:02x}", pixel[0], pixel[1], pixel[2]);
            *color_counts.entry(key).or_default() += 1;
        }
    }

    let sampled = std::cmp::max(1, count / step as u64);
    let mut entries: Vec<(String, usize)> = color_counts.into_iter().collect();
    entries.sort_by_key(|a| std::cmp::Reverse(a.1));
    entries.truncate(5);

    if json {
        let results: Vec<serde_json::Value> = entries
            .iter()
            .map(|(hex, c)| {
                serde_json::json!({
                    "hex": hex,
                    "percentage": (*c as f64 * 100.0 / sampled as f64 * 100.0).round() / 100.0,
                })
            })
            .collect();
        println!("{:#}", serde_json::json!(results));
    } else {
        println!("Dominant colors for {file}:\n");
        for (hex, c) in &entries {
            let pct = *c as f64 * 100.0 / sampled as f64;
            println!("  {hex}  {pct:.1}%");
        }
    }

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
