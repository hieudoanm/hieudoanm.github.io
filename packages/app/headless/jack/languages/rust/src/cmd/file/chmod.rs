use crate::cmd::file::common::parse_mode;
use walkdir::WalkDir;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'm', long = "mode", help = "Octal permission mode (e.g. 755)")]
    pub mode: String,
    #[arg(short = 'f', long = "file", help = "File or directory path")]
    pub file: String,
    #[arg(short = 'r', long = "recursive", action = clap::ArgAction::SetTrue, help = "Change permissions recursively")]
    pub recursive: bool,
}

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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let mode_str = &matches.mode;
    let file_path = &matches.file;
    let recursive = matches.recursive;

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
