use std::fs;
use std::process::Command;

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

#[test]
fn docsify_tree_generates_output() {
    let dir = "/tmp/hieudoanm_docsify_tree_test";
    let out = "/tmp/hieudoanm_docsify_tree_out.md";
    let _ = fs::create_dir_all(format!("{dir}/sub"));
    fs::write(format!("{dir}/a.rs"), "fn a() {}").unwrap();
    fs::write(format!("{dir}/b.txt"), "hello").unwrap();
    fs::write(format!("{dir}/sub/c.rs"), "fn c() {}").unwrap();

    let output = binary()
        .args(["docsify", "tree", "--dir", dir, "--out", out])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );

    let content = fs::read_to_string(out).unwrap();
    assert!(content.contains("a.rs"));
    assert!(content.contains("b.txt"));
    assert!(content.contains("sub/"));

    let _ = fs::remove_dir_all(dir);
    let _ = fs::remove_file(out);
}

#[test]
fn docsify_cobra_generates_output() {
    let dir = "/tmp/hieudoanm_cobra_test";
    let out = "/tmp/hieudoanm_cobra_out.md";
    let _ = fs::create_dir_all(dir);
    fs::write(format!("{dir}/main.go"), "package main").unwrap();

    let output = binary()
        .args(["docsify", "cobra", dir, "-o", out])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );

    let content = fs::read_to_string(out).unwrap();
    assert!(!content.is_empty());

    let _ = fs::remove_dir_all(dir);
    let _ = fs::remove_file(out);
}

#[test]
fn docsify_scan_generates_graph() {
    let dir = "/tmp/hieudoanm_scan_test";
    let out = "/tmp/hieudoanm_scan_out.graphml";
    let _ = fs::create_dir_all(dir);
    fs::write(
        format!("{dir}/main.rs"),
        "fn hello() {}\nfn main() { hello(); }",
    )
    .unwrap();

    let output = binary()
        .args(["docsify", "scan", "--dir", dir, "--out", out])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );

    let content = fs::read_to_string(out).unwrap();
    assert!(content.contains("graphml"));

    let _ = fs::remove_dir_all(dir);
    let _ = fs::remove_file(out);
}

#[test]
fn docsify_obsidian_generates_dot_output() {
    let dir = "/tmp/hieudoanm_obsidian_test";
    let out = "/tmp/hieudoanm_obsidian_out.dot";
    let _ = fs::create_dir_all(dir);
    fs::write(format!("{dir}/note1.md"), "Link to [[note2]]").unwrap();
    fs::write(format!("{dir}/note2.md"), "Content here").unwrap();

    let output = binary()
        .args(["docsify", "obsidian", "--dir", dir, "--out", out])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );

    let content = fs::read_to_string(out).unwrap();
    assert!(content.contains("digraph"));

    let _ = fs::remove_dir_all(dir);
    let _ = fs::remove_file(out);
}

#[test]
fn docsify_obsidian_json_format() {
    let dir = "/tmp/hieudoanm_obsidian_json_test";
    let out = "/tmp/hieudoanm_obsidian_out.json";
    let _ = fs::create_dir_all(dir);
    fs::write(format!("{dir}/a.md"), "Link to [[b]]").unwrap();
    fs::write(format!("{dir}/b.md"), "Back to [[a]]").unwrap();

    let output = binary()
        .args([
            "docsify", "obsidian", "--dir", dir, "--out", out, "--format", "json",
        ])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );

    let content = fs::read_to_string(out).unwrap();
    let v: serde_json::Value = serde_json::from_str(&content).unwrap();
    assert!(v["nodes"].as_array().unwrap().len() >= 2);

    let _ = fs::remove_dir_all(dir);
    let _ = fs::remove_file(out);
}
