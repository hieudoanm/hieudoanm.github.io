use std::collections::HashMap;
use std::fs;
use std::io::Write;
use std::path::Path;

pub fn command() -> clap::Command {
    clap::Command::new("docsify")
        .about("Documentation generation tools")
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
                .about("Generate README.md documentation from a Cobra CLI project")
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
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("tree", m)) => run_tree(m).await,
        Some(("cobra", m)) => run_cobra(m).await,
        Some(("scan", m)) => run_scan(m).await,
        _ => {
            println!("docsify: use `tree`, `cobra`, or `scan` subcommand");
            Ok(())
        }
    }
}

// ── Tree subcommand ──────────────────────────────────────────────────────────

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

    println!("📄 Tree written to {out}");
    Ok(())
}

// ── Cobra subcommand ─────────────────────────────────────────────────────────

async fn run_cobra(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let project_path = matches.get_one::<String>("path").unwrap();
    let output = matches.get_one::<String>("output").unwrap();

    let _cmd_dir = find_cmd_dir(project_path)?;

    let mut md = String::new();
    let project_name = Path::new(project_path)
        .file_name()
        .map(|n| n.to_string_lossy().to_string())
        .unwrap_or_else(|| "project".to_string());

    md.push_str(&format!("# 📦 {project_name}\n\n"));
    md.push_str("---\n\n");

    let mut file = fs::File::create(output)?;
    file.write_all(md.as_bytes())?;

    println!("📄 Docs written to {output}");
    Ok(())
}

fn find_cmd_dir(project_path: &str) -> Result<String, anyhow::Error> {
    for candidate in &["cmd", "src/cmd"] {
        let path = Path::new(project_path).join(candidate);
        if path.exists() {
            return Ok(path.to_string_lossy().to_string());
        }
    }
    anyhow::bail!("cmd/ or src/cmd/ directory not found in {project_path}")
}

// ── Scan subcommand ──────────────────────────────────────────────────────────

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
