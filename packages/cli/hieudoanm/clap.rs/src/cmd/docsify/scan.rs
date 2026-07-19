use std::collections::HashMap;
use std::fs;
use std::path::Path;

use super::service;

fn parse_exclude_list(s: &str) -> HashMap<String, bool> {
    let mut m = HashMap::new();
    for part in s.split(',') {
        let part = part.trim().to_string();
        if !part.is_empty() {
            m.insert(part, true);
        }
    }
    m
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let dir = matches.get_one::<String>("dir").unwrap();
    let out = matches.get_one::<String>("out").unwrap();
    let exclude_str = matches.get_one::<String>("exclude").unwrap();
    let verbose = matches.get_flag("verbose");

    let abs_dir = Path::new(dir).canonicalize()?;
    let abs_dir_str = abs_dir.to_string_lossy().to_string();
    let exclude_set = parse_exclude_list(exclude_str);

    if verbose {
        eprintln!("scanning {abs_dir_str}");
    }

    let files = service::walk(&abs_dir_str, &exclude_set)?;

    if verbose {
        eprintln!("found {} source files", files.len());
    }

    let mut graph = service::Graph::new();
    for f in &files {
        if verbose {
            eprintln!("  extracting: {}", f.rel_path);
        }
        match service::extract(f) {
            Ok(info) => graph.add_file(&info),
            Err(e) => {
                eprintln!("  warning: skipping {}: {e}", f.rel_path);
            }
        }
    }
    graph.resolve_call_edges();

    let out_file = fs::File::create(out)?;
    service::write_graphml(&graph, out_file)?;

    println!("graph written to {out}");
    println!(
        "  nodes: {}  edges: {}",
        graph.node_count(),
        graph.edge_count()
    );
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use clap::Command;

    #[test]
    fn test_parse_exclude_list_empty() {
        let m = parse_exclude_list("");
        assert!(m.is_empty());
    }

    #[test]
    fn test_parse_exclude_list_single() {
        let m = parse_exclude_list("node_modules");
        assert_eq!(m.len(), 1);
        assert!(m.contains_key("node_modules"));
    }

    #[test]
    fn test_parse_exclude_list_multiple() {
        let m = parse_exclude_list("node_modules,target,.git");
        assert_eq!(m.len(), 3);
        assert!(m.contains_key("node_modules"));
        assert!(m.contains_key("target"));
        assert!(m.contains_key(".git"));
    }

    #[test]
    fn test_parse_exclude_list_with_spaces() {
        let m = parse_exclude_list("  dist ,  build ");
        assert_eq!(m.len(), 2);
        assert!(m.contains_key("dist"));
        assert!(m.contains_key("build"));
    }

    #[test]
    fn test_parse_exclude_list_ignores_empty_parts() {
        let m = parse_exclude_list("a,,b,");
        assert_eq!(m.len(), 2);
        assert!(m.contains_key("a"));
        assert!(m.contains_key("b"));
    }

    fn make_scan_command() -> Command {
        Command::new("scan")
            .arg(clap::Arg::new("dir").required(true))
            .arg(clap::Arg::new("out").required(true))
            .arg(clap::Arg::new("exclude").default_value(""))
            .arg(
                clap::Arg::new("verbose")
                    .long("verbose")
                    .short('v')
                    .action(clap::ArgAction::SetTrue),
            )
    }

    #[tokio::test]
    async fn test_run_nonexistent_dir() {
        let cmd = make_scan_command();
        let m = cmd
            .try_get_matches_from(vec!["scan", "/tmp/nonexistent_dir_xyz", "/tmp/out.graphml"])
            .unwrap();
        let result = run(&m).await;
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_run_with_exclude_and_verbose() {
        let cmd = make_scan_command();
        let m = cmd
            .try_get_matches_from(vec![
                "scan",
                "/tmp/nonexistent_dir_abc",
                "/tmp/out.graphml",
                "node_modules,target",
                "-v",
            ])
            .unwrap();
        let result = run(&m).await;
        assert!(result.is_err());
    }
}
