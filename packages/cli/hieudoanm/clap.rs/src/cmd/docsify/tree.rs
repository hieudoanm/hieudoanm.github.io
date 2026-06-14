use std::fs;
use std::io::Write;
use std::path::Path;

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

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
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
