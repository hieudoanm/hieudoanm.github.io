use std::collections::{HashMap, HashSet};
use std::fs;
use std::path::Path;

use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
struct ObsidianNode {
    id: String,
    name: String,
    path: String,
    links: usize,
}

#[derive(Debug, Clone, Serialize)]
struct ObsidianEdge {
    source: String,
    target: String,
}

#[derive(Debug, Serialize)]
struct ObsidianGraph {
    root: String,
    nodes: Vec<ObsidianNode>,
    edges: Vec<ObsidianEdge>,
    orphan: usize,
}

fn build_obsidian_graph(
    root: &str,
    exclude_set: &HashSet<String>,
) -> anyhow::Result<(Vec<ObsidianNode>, Vec<ObsidianEdge>)> {
    let mut markdown_files: Vec<(String, String)> = Vec::new();
    let mut links: Vec<(String, Vec<String>)> = Vec::new();
    let wiki_link_re = regex::Regex::new(r"\[\[([^\]|]+)(?:\|[^\]|]+)?\]\]")?;

    for entry in walkdir::WalkDir::new(root).into_iter().filter_entry(|e| {
        let name = e.file_name().to_string_lossy().to_string();
        if name.starts_with('.') {
            return false;
        }
        if e.file_type().is_dir() && exclude_set.contains(&name) {
            return false;
        }
        true
    }) {
        let entry = match entry {
            Ok(e) => e,
            Err(_) => continue,
        };
        if !entry.file_type().is_file() {
            continue;
        }
        let path = entry.path();
        if !path.to_string_lossy().to_lowercase().ends_with(".md") {
            continue;
        }
        let abs_path = path.to_string_lossy().to_string();
        let name = path
            .file_stem()
            .map(|s| s.to_string_lossy().to_string())
            .unwrap_or_default();
        markdown_files.push((abs_path.clone(), name));
        let content = match fs::read_to_string(&abs_path) {
            Ok(c) => c,
            Err(_) => continue,
        };
        let file_links: Vec<String> = wiki_link_re
            .captures_iter(&content)
            .map(|c| c[1].to_string())
            .collect();
        if !file_links.is_empty() {
            links.push((abs_path, file_links));
        }
    }

    let lookup: HashMap<String, String> = markdown_files
        .iter()
        .map(|(p, n)| (n.to_lowercase(), p.clone()))
        .collect();
    markdown_files.sort_by(|a, b| a.0.cmp(&b.0));

    let mut rel_map: HashMap<String, String> = HashMap::new();
    let mut node_map: HashMap<String, usize> = HashMap::new();
    let mut nodes: Vec<ObsidianNode> = Vec::with_capacity(markdown_files.len());

    for (i, (abs, name)) in markdown_files.iter().enumerate() {
        let rel = Path::new(abs)
            .strip_prefix(root)
            .map(|p| p.to_string_lossy().to_string())
            .unwrap_or_else(|_| abs.clone());
        rel_map.insert(abs.clone(), rel.clone());
        node_map.insert(abs.clone(), i);
        nodes.push(ObsidianNode {
            id: rel,
            name: name.clone(),
            path: abs.clone(),
            links: 0,
        });
    }

    let mut edge_set: HashSet<String> = HashSet::new();
    let mut edges: Vec<ObsidianEdge> = Vec::new();

    for (source_path, targets) in &links {
        let src_idx = match node_map.get(source_path) {
            Some(i) => *i,
            None => continue,
        };
        for t in targets {
            let target_path = match lookup.get(&t.to_lowercase()) {
                Some(p) => p,
                None => continue,
            };
            let tgt_idx = match node_map.get(target_path) {
                Some(i) => *i,
                None => continue,
            };
            let key = format!("{}->{}", src_idx, tgt_idx);
            if !edge_set.insert(key) {
                continue;
            }
            edges.push(ObsidianEdge {
                source: rel_map[source_path].clone(),
                target: rel_map[target_path].clone(),
            });
            nodes[src_idx].links += 1;
        }
    }

    Ok((nodes, edges))
}

fn write_output(data: &str, path: &str) -> anyhow::Result<()> {
    if path.is_empty() {
        print!("{data}");
    } else {
        fs::write(path, data)?;
    }
    Ok(())
}

fn write_obsidian_dot(
    nodes: &[ObsidianNode],
    edges: &[ObsidianEdge],
    path: &str,
) -> anyhow::Result<()> {
    let mut b = String::new();
    b.push_str("digraph obsidian {\n  rankdir=LR;\n  node [shape=box style=rounded];\n\n");
    for n in nodes {
        let label = n.name.replace('\"', "\\\"");
        b.push_str(&format!("  {:?} [label=\"{label}\"];\n", n.id));
    }
    b.push('\n');
    for e in edges {
        b.push_str(&format!("  {:?} -> {:?};\n", e.source, e.target));
    }
    b.push_str("}\n");
    write_output(&b, path)
}

fn write_obsidian_json(
    root: &str,
    nodes: &[ObsidianNode],
    edges: &[ObsidianEdge],
    orphan: usize,
    path: &str,
) -> anyhow::Result<()> {
    let g = ObsidianGraph {
        root: root.to_string(),
        nodes: nodes.to_vec(),
        edges: edges.to_vec(),
        orphan,
    };
    let data = serde_json::to_string_pretty(&g)?;
    write_output(&data, path)
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let dir = matches.get_one::<String>("dir").unwrap();
    let out = matches.get_one::<String>("out").unwrap();
    let format = matches.get_one::<String>("format").unwrap();
    let exclude_str = matches.get_one::<String>("exclude").unwrap();

    let abs_dir = Path::new(dir).canonicalize()?;
    let abs_dir_str = abs_dir.to_string_lossy().to_string();
    let exclude_set: HashSet<String> = exclude_str
        .split(',')
        .map(|s| s.trim().to_string())
        .filter(|s| !s.is_empty())
        .collect();

    let (nodes, edges) = build_obsidian_graph(&abs_dir_str, &exclude_set)?;
    let orphan = nodes.iter().filter(|n| n.links == 0).count();

    match *format {
        ref f if f == "json" => write_obsidian_json(&abs_dir_str, &nodes, &edges, orphan, out),
        _ => write_obsidian_dot(&nodes, &edges, out),
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_module_compiles() {
        assert!(true);
    }
}
