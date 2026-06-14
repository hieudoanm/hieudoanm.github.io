use anyhow::Context;
use serde_json::Value;

pub fn command() -> clap::Command {
    clap::Command::new("json")
        .about("Query, format, diff, and merge JSON data")
        .arg(clap::Arg::new("file").help("JSON file"))
        .arg(
            clap::Arg::new("query")
                .long("query")
                .short('q')
                .help("JQ-like query (e.g. .name, .items[0])"),
        )
        .arg(
            clap::Arg::new("diff")
                .long("diff")
                .help("Diff with another JSON file"),
        )
        .arg(
            clap::Arg::new("merge")
                .long("merge")
                .help("Merge with another JSON file (patch)"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let file = matches.get_one::<String>("file");
    let diff = matches.get_one::<String>("diff");
    let merge = matches.get_one::<String>("merge");
    let query = matches.get_one::<String>("query");

    if let Some(other) = diff {
        let f1 = file.context("first file required for diff")?;
        return json_diff(f1, other);
    }

    if let Some(other) = merge {
        let f1 = file.context("base file required for merge")?;
        return json_merge(f1, other);
    }

    let input = read_json_input(file)?;
    let data: Value = serde_json::from_slice(&input).context("parse json")?;

    if let Some(q) = query {
        let result = json_query(&data, q)?;
        println!("{}", serde_json::to_string_pretty(&result)?);
    } else {
        println!("{}", serde_json::to_string_pretty(&data)?);
    }

    Ok(())
}

fn read_json_input(file: Option<&String>) -> anyhow::Result<Vec<u8>> {
    match file {
        Some(path) => std::fs::read(path).context("read file"),
        None => {
            let mut input = Vec::new();
            std::io::Read::read_to_end(&mut std::io::stdin(), &mut input).context("read stdin")?;
            Ok(input)
        }
    }
}

fn json_query(data: &Value, query: &str) -> anyhow::Result<Value> {
    let query = query.trim_start_matches('.');
    if query.is_empty() {
        return Ok(data.clone());
    }

    let parts: Vec<&str> = query.split('.').collect();
    let mut current = data;

    for part in parts {
        if part.is_empty() {
            continue;
        }
        if part.ends_with(']') {
            if let Some(bracket_idx) = part.find('[') {
                let key = &part[..bracket_idx];
                let idx_str = &part[bracket_idx + 1..part.len() - 1];
                let idx: usize = idx_str.parse().context("invalid array index")?;

                if !key.is_empty() {
                    current = current.get(key).context(format!("key {key} not found"))?;
                }

                current = current
                    .get(idx)
                    .context(format!("index {idx} out of bounds"))?;
            }
        } else {
            current = current.get(part).context(format!("key {part} not found"))?;
        }
    }

    Ok(current.clone())
}

fn json_diff(file1: &str, file2: &str) -> anyhow::Result<()> {
    let a: Value = serde_json::from_slice(&std::fs::read(file1)?)?;
    let b: Value = serde_json::from_slice(&std::fs::read(file2)?)?;

    let a_str = serde_json::to_string_pretty(&a)?;
    let b_str = serde_json::to_string_pretty(&b)?;

    let lines_a: Vec<&str> = a_str.lines().collect();
    let lines_b: Vec<&str> = b_str.lines().collect();

    let max = lines_a.len().max(lines_b.len());

    for i in 0..max {
        let la = lines_a.get(i).copied().unwrap_or("");
        let lb = lines_b.get(i).copied().unwrap_or("");
        if la != lb {
            if !la.is_empty() {
                println!("- {la}");
            }
            if !lb.is_empty() {
                println!("+ {lb}");
            }
        }
    }

    Ok(())
}

fn json_merge(base_file: &str, patch_file: &str) -> anyhow::Result<()> {
    let mut base: Value = serde_json::from_slice(&std::fs::read(base_file)?)?;
    let patch: Value = serde_json::from_slice(&std::fs::read(patch_file)?)?;

    if let (Value::Object(ref mut base_map), Value::Object(patch_map)) = (&mut base, patch) {
        for (k, v) in patch_map {
            base_map.insert(k, v);
        }
    }

    println!("{}", serde_json::to_string_pretty(&base)?);
    Ok(())
}
