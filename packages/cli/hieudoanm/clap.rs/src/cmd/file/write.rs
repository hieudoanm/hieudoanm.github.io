use crate::cmd::file::common::{parse_mode, read_stdin};
use std::io::Write;

fn open_file_for_write(
    path: &str,
    append: bool,
    mkdir: bool,
    mode_str: Option<&str>,
) -> anyhow::Result<(std::fs::File, std::fs::Permissions)> {
    if mkdir {
        if let Some(parent) = std::path::Path::new(path).parent() {
            if parent.as_os_str().is_empty() {
                // parent is "." which is fine
            } else {
                std::fs::create_dir_all(parent)?;
            }
        }
    }

    let mode = match mode_str {
        Some(s) if !s.is_empty() => parse_mode(s)?,
        _ => {
            use std::os::unix::fs::PermissionsExt;
            std::fs::Permissions::from_mode(0o644)
        }
    };

    let file = if append {
        std::fs::OpenOptions::new()
            .create(true)
            .append(true)
            .open(path)?
    } else {
        std::fs::File::create(path)?
    };

    Ok((file, mode))
}

pub fn command() -> clap::Command {
    clap::Command::new("write")
        .about("Write or append content to a file")
        .arg(
            clap::Arg::new("file")
                .short('f')
                .long("file")
                .help("File path")
                .required(true),
        )
        .arg(
            clap::Arg::new("content")
                .short('c')
                .long("content")
                .help("File content (omit to read from stdin)")
                .required(false),
        )
        .arg(
            clap::Arg::new("append")
                .short('a')
                .long("append")
                .help("Append to file instead of overwriting")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("mkdir")
                .short('p')
                .long("mkdir")
                .help("Create parent directories if needed")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("mode")
                .short('m')
                .long("mode")
                .help("File permissions (octal, e.g. 644)")
                .required(false),
        )
}

pub async fn run(m: &clap::ArgMatches, json: bool) -> anyhow::Result<()> {
    let path = m.get_one::<String>("file").unwrap();
    let content_flag = m.get_one::<String>("content").map(|s| s.as_str());
    let append = m.get_flag("append");
    let mkdir = m.get_flag("mkdir");
    let mode_str = m.get_one::<String>("mode").map(|s| s.as_str());

    let content = match content_flag {
        Some(c) if !c.is_empty() => c.to_string(),
        _ => read_stdin()?,
    };

    let (mut file, mode) = open_file_for_write(path, append, mkdir, mode_str)?;
    file.write_all(content.as_bytes())?;
    // set permissions after writing (mode from open_for_write)
    use std::os::unix::fs::PermissionsExt;
    std::fs::set_permissions(
        path,
        std::fs::Permissions::from_mode(PermissionsExt::mode(&mode)),
    )?;
    let n = content.len();

    if json {
        let output = serde_json::json!({
            "file": path,
            "bytes": n,
            "append": append,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        let verb = if append { "Appended" } else { "Written" };
        println!("{verb} {n} bytes to {path}");
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
