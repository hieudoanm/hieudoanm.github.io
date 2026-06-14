use std::fs;
use std::io::Write;
use std::path::Path;

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let project_path = matches.get_one::<String>("path").unwrap();
    let output = matches.get_one::<String>("output").unwrap();
    let mut md = String::new();
    let project_name = Path::new(project_path)
        .file_name()
        .map(|n| n.to_string_lossy().to_string())
        .unwrap_or_else(|| "project".to_string());
    md.push_str(&format!("# {project_name}\n\n"));
    md.push_str("---\n\n");
    let mut file = fs::File::create(output)?;
    file.write_all(md.as_bytes())?;
    println!("Docs written to {output}");
    Ok(())
}
