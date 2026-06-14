use clap::ArgMatches;

macro_rules! stub_cmd {
    ($name:expr, $about:expr) => {
        clap::Command::new($name).about($about)
    };
}

pub fn info_cmd() -> clap::Command {
    stub_cmd!("info", "Get image metadata").arg(
        clap::Arg::new("file")
            .long("file")
            .help("Image file")
            .required(true),
    )
}
pub fn convert_cmd() -> clap::Command {
    stub_cmd!("convert", "Convert image format")
        .arg(
            clap::Arg::new("file")
                .long("file")
                .help("Image file")
                .required(true),
        )
        .arg(
            clap::Arg::new("format")
                .long("format")
                .help("Target format")
                .required(true),
        )
}
pub fn dominant_cmd() -> clap::Command {
    stub_cmd!("dominant", "Extract dominant colors").arg(
        clap::Arg::new("file")
            .long("file")
            .help("Image file")
            .required(true),
    )
}

pub async fn run(name: &str, _matches: &ArgMatches) -> anyhow::Result<()> {
    println!("{name} (not yet implemented)");
    Ok(())
}
