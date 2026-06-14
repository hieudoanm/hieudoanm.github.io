use std::collections::{HashMap, HashSet};
use std::fs;
use std::io::Write;
use std::path::Path;

use serde::Serialize;

pub fn command() -> clap::Command {
    clap::Command::new("docsify")
        .about("Codebase documentation and analysis tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("tree")
                .about("Generate directory tree as Markdown")
                .arg(
                    clap::Arg::new("dir")
                        .long("dir")
                        .default_value(".")
                        .help("Root directory to tree"),
                )
                .arg(
                    clap::Arg::new("out")
                        .long("out")
                        .default_value("TREE.md")
                        .help("Output file path"),
                ),
        )
        .subcommand(
            clap::Command::new("cobra")
                .about("Generate docs from a Cobra CLI project")
                .arg(
                    clap::Arg::new("path")
                        .help("Path to cobra project")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("output")
                        .short('o')
                        .long("output")
                        .default_value("README.md")
                        .help("Output file path"),
                ),
        )
        .subcommand(
            clap::Command::new("scan")
                .about("Scan a codebase and generate a GraphML file")
                .arg(
                    clap::Arg::new("dir")
                        .long("dir")
                        .default_value(".")
                        .help("Root directory to scan"),
                )
                .arg(
                    clap::Arg::new("out")
                        .long("out")
                        .default_value("codebase.graphml")
                        .help("Output .graphml file path"),
                )
                .arg(
                    clap::Arg::new("exclude")
                        .long("exclude")
                        .default_value(".git,node_modules,vendor,dist,.next,__pycache__")
                        .help("Comma-separated directories to exclude"),
                )
                .arg(
                    clap::Arg::new("verbose")
                        .long("verbose")
                        .action(clap::ArgAction::SetTrue)
                        .help("Print progress to stderr"),
                ),
        )
        .subcommand(
            clap::Command::new("obsidian")
                .about("Build a wiki-link graph from markdown files")
                .arg(
                    clap::Arg::new("dir")
                        .long("dir")
                        .default_value(".")
                        .help("Root directory to scan"),
                )
                .arg(
                    clap::Arg::new("out")
                        .long("out")
                        .default_value("")
                        .help("Output file path (default: stdout)"),
                )
                .arg(
                    clap::Arg::new("format")
                        .long("format")
                        .default_value("dot")
                        .help("Output format: dot, json, edges"),
                )
                .arg(
                    clap::Arg::new("exclude")
                        .long("exclude")
                        .default_value(".git,node_modules,vendor,dist,.next,__pycache__")
                        .help("Comma-separated directories to exclude"),
                ),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("tree", m)) => run_tree(m).await,
        Some(("cobra", m)) => run_cobra(m).await,
        Some(("scan", m)) => run_scan(m).await,
        Some(("obsidian", m)) => run_obsidian(m).await,
        _ => Ok(()),
    }
}

#[allow(clippy::type_complexity)]
fn load_gitignore(dir: &str) -> Result<Box<dyn Fn(&str, bool) -> bool>, anyhow::Error> {
    let path = Path::new(dir).join(".gitignore");
    let content = match fs::read_to_string(&path) {
        Ok(c) => c,
        Err(_) => return Ok(Box::new(|_: &str, _: bool| false)),
    };

    struct Rule {
        pattern: String,
        negate: bool,
        dir_only: bool,
    }

    let mut rules: Vec<Rule> = Vec::new();
    for line in content.lines() {
        let line = line.trim();
        if line.is_empty() || line.starts_with('#') {
            continue;
        }
        let mut negate = false;
        let mut pat = line;
        if let Some(stripped) = pat.strip_prefix('!') {
            negate = true;
            pat = stripped;
        }
        let dir_only = pat.ends_with('/');
        if dir_only {
            pat = pat.trim_end_matches('/');
        }
        pat = pat.trim_start_matches('/');
        rules.push(Rule {
            pattern: pat.to_string(),
            negate,
            dir_only,
        });
    }

    Ok(Box::new(move |rel_path: &str, is_dir: bool| -> bool {
        let mut ignored = false;
        for r in &rules {
            if r.dir_only && !is_dir {
                continue;
            }
            let path = Path::new(rel_path);
            let matched = path.to_string_lossy().contains(&r.pattern)
                || path
                    .file_name()
                    .and_then(|n| n.to_str())
                    .map(|n| n.contains(&r.pattern))
                    .unwrap_or(false);
            if matched {
                ignored = !r.negate;
            }
        }
        ignored
    }))
}

#[allow(clippy::only_used_in_recursion)]
fn write_tree<W: Write>(
    w: &mut W,
    root: &Path,
    dir: &Path,
    prefix: &str,
    ignore: &dyn Fn(&str, bool) -> bool,
) -> Result<(usize, usize), anyhow::Error> {
    let mut entries: Vec<_> = fs::read_dir(dir)?
        .filter_map(|e| e.ok())
        .filter(|e| {
            let name = e.file_name();
            let name_str = name.to_string_lossy();
            !name_str.starts_with('.')
        })
        .collect();
    entries.sort_by_key(|e| e.file_name());

    let mut dir_names: Vec<String> = Vec::new();
    let mut file_names: Vec<String> = Vec::new();

    for e in &entries {
        let name = e.file_name().to_string_lossy().to_string();
        let rel = Path::new(name.as_str());
        let rel_str = rel.to_string_lossy();
        if ignore(&rel_str, e.file_type()?.is_dir()) {
            continue;
        }
        if e.file_type()?.is_dir() {
            dir_names.push(name);
        } else {
            file_names.push(name);
        }
    }

    let total_dirs = dir_names.len();
    let total_files = file_names.len();

    let ordered: Vec<String> = dir_names
        .iter()
        .cloned()
        .chain(file_names.iter().cloned())
        .collect();

    for (i, name) in ordered.iter().enumerate() {
        let is_last = i == ordered.len() - 1;
        let is_dir = i < dir_names.len();
        let connector = if is_last { "└── " } else { "├── " };
        let child_prefix = if is_last {
            format!("{prefix}    ")
        } else {
            format!("{prefix}│   ")
        };

        if is_dir {
            writeln!(w, "{prefix}{connector}{name}/")?;
            let _sub = write_tree(w, root, &dir.join(name), &child_prefix, ignore)?;
        } else {
            writeln!(w, "{prefix}{connector}{name}")?;
        }
    }

    Ok((total_dirs, total_files))
}

async fn run_tree(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let dir = matches.get_one::<String>("dir").unwrap();
    let out = matches.get_one::<String>("out").unwrap();
    let abs_dir = Path::new(dir).canonicalize()?;
    let ignore = load_gitignore(&abs_dir.to_string_lossy())?;
    let mut file = fs::File::create(out)?;
    writeln!(file, "# TREE\n")?;
    writeln!(file, "```bash")?;
    let (_dirs, _files) = write_tree(&mut file, &abs_dir, &abs_dir, "", &*ignore)?;
    writeln!(file, "```")?;
    writeln!(file, "\n{_dirs} directories, {_files} files")?;
    println!("Tree written to {out}");
    Ok(())
}

async fn run_cobra(matches: &clap::ArgMatches) -> anyhow::Result<()> {
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

async fn run_scan(matches: &clap::ArgMatches) -> anyhow::Result<()> {
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

    let files = crate::services::docsify::walk(&abs_dir_str, &exclude_set)?;

    if verbose {
        eprintln!("found {} source files", files.len());
    }

    let mut graph = crate::services::docsify::Graph::new();
    for f in &files {
        if verbose {
            eprintln!("  extracting: {}", f.rel_path);
        }
        match crate::services::docsify::extract(f) {
            Ok(info) => graph.add_file(&info),
            Err(e) => {
                eprintln!("  warning: skipping {}: {e}", f.rel_path);
            }
        }
    }
    graph.resolve_call_edges();

    let out_file = fs::File::create(out)?;
    crate::services::docsify::write_graphml(&graph, out_file)?;

    println!("graph written to {out}");
    println!(
        "  nodes: {}  edges: {}",
        graph.node_count(),
        graph.edge_count()
    );
    Ok(())
}

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

async fn run_obsidian(matches: &clap::ArgMatches) -> anyhow::Result<()> {
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
