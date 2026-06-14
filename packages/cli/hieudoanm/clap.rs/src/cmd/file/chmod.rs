use crate::cmd::file::common::parse_mode;
use walkdir::WalkDir;

pub fn command() -> clap::Command {
    clap::Command::new("chmod")
        .about("Change file permissions")
        .arg(
            clap::Arg::new("mode")
                .short('m')
                .long("mode")
                .help("Octal permission mode (e.g. 755)")
                .required(true),
        )
        .arg(
            clap::Arg::new("file")
                .short('f')
                .long("file")
                .help("File or directory path")
                .required(true),
        )
        .arg(
            clap::Arg::new("recursive")
                .short('r')
                .long("recursive")
                .help("Change permissions recursively")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(m: &clap::ArgMatches) -> anyhow::Result<()> {
    let mode_str = m.get_one::<String>("mode").unwrap();
    let file_path = m.get_one::<String>("file").unwrap();
    let recursive = m.get_flag("recursive");

    let mode = parse_mode(mode_str)?;

    if recursive {
        for entry in WalkDir::new(file_path).into_iter().filter_map(|e| e.ok()) {
            std::fs::set_permissions(entry.path(), mode.clone())?;
        }
    } else {
        std::fs::set_permissions(file_path, mode)?;
    }

    Ok(())
}
