pub fn command() -> clap::Command {
    clap::Command::new("youtube")
        .about("YouTube related tools")
        .subcommand(
            clap::Command::new("thumbnails")
                .about("Download YouTube thumbnails")
                .arg(
                    clap::Arg::new("video")
                        .help("YouTube video ID or URL")
                        .required(true),
                ),
        )
        .subcommand(
            clap::Command::new("transcript")
                .about("Fetch YouTube video transcript")
                .alias("fetch")
                .arg(
                    clap::Arg::new("video")
                        .help("YouTube video ID or URL")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("lang")
                        .long("lang")
                        .short('l')
                        .default_value("en")
                        .help("Language code"),
                ),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("thumbnails", sub_m)) => {
            let video = sub_m
                .get_one::<String>("video")
                .ok_or_else(|| anyhow::anyhow!("video id required"))?;
            let video_id = extract_video_id(video);
            println!("Thumbnails for video {video_id}:");
            for size in &["default", "mqdefault", "hqdefault", "maxresdefault"] {
                let url = format!("https://img.youtube.com/vi/{video_id}/{size}.jpg");
                println!("  {size}: {url}");
            }
        }
        Some(("transcript", sub_m)) => {
            let video = sub_m
                .get_one::<String>("video")
                .ok_or_else(|| anyhow::anyhow!("video id required"))?;
            let lang = sub_m
                .get_one::<String>("lang")
                .map(|s| s.as_str())
                .unwrap_or("en");
            let video_id = extract_video_id(video);
            let client = crate::services::transcript::Client::new();
            let transcript = client.fetch(video_id, lang)?;
            for line in &transcript.lines {
                println!("{}", line.text);
            }
        }
        _ => {}
    }
    Ok(())
}

fn extract_video_id(input: &str) -> &str {
    if let Some(pos) = input.find("v=") {
        let start = pos + 2;
        let end = input[start..]
            .find(['&', ' '])
            .map_or(input.len(), |e| start + e);
        &input[start..end]
    } else if let Some(pos) = input.find("youtu.be/") {
        &input[pos + 9..]
    } else {
        input
    }
}
