use crate::cmd::file::common::{detect_mime, format_size};

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'f', long = "file", help = "File path")]
    pub file: String,
}

pub fn command() -> clap::Command {
    clap::Command::new("type")
        .about("Detect file type by extension")
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
    let info = std::fs::metadata(file_path)?;
    let mime = detect_mime(file_path);

    if json {
        let output = serde_json::json!({
            "file": file_path,
            "size": info.len(),
            "mime": mime,
            "mode": format!("{:o}", std::os::unix::fs::PermissionsExt::mode(&info.permissions())),
            "modified": info.modified()
                .map(|t| {
                    let dt: chrono::DateTime<chrono::Utc> = t.into();
                    dt.format("%Y-%m-%dT%H:%M:%SZ").to_string()
                })
                .unwrap_or_default(),
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("File     : {file_path}");
        println!("Size     : {}", format_size(info.len()));
        println!("MIME     : {mime}");
        println!(
            "Mode     : {:o}",
            std::os::unix::fs::PermissionsExt::mode(&info.permissions())
        );
        if !info.is_dir() {
            if let Ok(modified) = info.modified() {
                let dt: chrono::DateTime<chrono::Utc> = modified.into();
                println!("Modified : {}", dt.format("%Y-%m-%d %H:%M:%S"));
            }
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
