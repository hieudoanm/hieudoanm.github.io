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
