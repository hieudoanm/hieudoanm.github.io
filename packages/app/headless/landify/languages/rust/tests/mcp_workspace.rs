//! Sandbox tests for the MCP workspace.
//!
//! A model chooses every path, so these encode the containment contract: no
//! tool may read or write outside the server root, however creative the path.

#![cfg(unix)]

use landify::mcp::Workspace;
use std::os::unix::fs::symlink;
use tempfile::TempDir;

fn workspace(dir: &TempDir) -> Workspace {
    Workspace::new(dir.path().to_str().expect("utf-8 path")).expect("workspace")
}

// An absolute path is rejected rather than silently served.
#[test]
fn an_absolute_path_is_refused() {
    let dir = TempDir::new().expect("temp dir");
    let err = workspace(&dir).resolve("/etc/passwd").unwrap_err();
    assert!(err.to_string().contains("must be relative"), "{err}");
}

// A ".." escape is refused rather than quietly rewritten, so a caller that means
// to leave the sandbox surfaces its own bug.
#[test]
fn a_parent_escape_is_refused() {
    let dir = TempDir::new().expect("temp dir");
    let err = workspace(&dir).resolve("../outside.yaml").unwrap_err();
    assert!(err.to_string().contains("escapes the server root"), "{err}");
}

// A symlink inside the root pointing out of it is an escape, not a shortcut, so
// it is refused even though the lexical join stays inside.
#[test]
fn a_symlink_out_of_the_root_is_refused() {
    let outside = TempDir::new().expect("outside dir");
    let dir = TempDir::new().expect("root dir");
    let secret = outside.path().join("secret.yaml");
    std::fs::write(&secret, "type: product\n").expect("write secret");
    symlink(&secret, dir.path().join("link.yaml")).expect("symlink");

    let ws = workspace(&dir);
    let err = ws.read("link.yaml").unwrap_err();
    assert!(err.to_string().contains("escapes the server root"), "{err}");
    assert!(ws.write("link.yaml", b"type: team\n").is_err());
    assert_eq!(
        std::fs::read_to_string(&secret).expect("read secret"),
        "type: product\n",
        "the escape must not have written through the link"
    );
}

// A broken symlink is refused outright. Its target does not exist, so nothing
// is written there yet and a naive walk would approve the link's own name — then
// the write would follow the link and create the file outside the root.
#[test]
fn a_dangling_symlink_is_refused_for_every_operation() {
    let outside = TempDir::new().expect("outside dir");
    let dir = TempDir::new().expect("root dir");
    let target = outside.path().join("not-created-yet.yaml");
    symlink(&target, dir.path().join("dangling.yaml")).expect("symlink");

    let ws = workspace(&dir);
    assert!(ws.write("dangling.yaml", b"type: product\n").is_err());
    assert!(ws.read("dangling.yaml").is_err());
    assert!(
        !target.exists(),
        "a dangling symlink must not be able to create its target outside the root"
    );
}

// A broken symlink pointing at a missing directory inside the root is refused
// too, so the outcome does not depend on where the missing target lives.
#[test]
fn a_dangling_symlink_into_the_root_is_refused() {
    let dir = TempDir::new().expect("root dir");
    symlink(
        dir.path().join("missing/target.yaml"),
        dir.path().join("dangling.yaml"),
    )
    .expect("symlink");

    let ws = workspace(&dir);
    assert!(ws.write("dangling.yaml", b"type: product\n").is_err());
    assert!(ws.read("dangling.yaml").is_err());
    assert!(ws.exists("dangling.yaml").is_err());
}

// A symlink whose target is created later must still be confined: the check runs
// on every access, not once at startup.
#[test]
fn a_symlink_is_rechecked_on_every_access() {
    let dir = TempDir::new().expect("root dir");
    let pending = dir.path().join("pending.yaml");
    symlink(&pending, dir.path().join("link.yaml")).expect("symlink");
    let ws = workspace(&dir);

    // The target does not exist yet, so the link is refused.
    assert!(ws.read("link.yaml").is_err());

    // Once the target exists inside the root the link is fine.
    std::fs::write(&pending, "type: product\n").expect("write target");
    assert_eq!(ws.read("link.yaml").expect("read"), b"type: product\n");
}

// An existing symlink that stays inside the root is a shortcut to a permitted
// file, not an escape.
#[test]
fn a_symlink_within_the_root_is_allowed() {
    let dir = TempDir::new().expect("root dir");
    std::fs::write(dir.path().join("real.yaml"), "type: product\n").expect("write");
    symlink(dir.path().join("real.yaml"), dir.path().join("alias.yaml")).expect("symlink");

    assert_eq!(
        workspace(&dir).read("alias.yaml").expect("read"),
        b"type: product\n"
    );
}

// A write creates parent directories inside the root.
#[test]
fn write_creates_parent_directories() {
    let dir = TempDir::new().expect("root dir");
    workspace(&dir)
        .write("nested/deep/site.yaml", b"type: product\n")
        .expect("write");
    assert!(dir.path().join("nested/deep/site.yaml").exists());
}

// Reading a missing file names the path the model passed, not a resolved
// absolute path it never supplied.
#[test]
fn reading_a_missing_file_names_the_relative_path() {
    let dir = TempDir::new().expect("root dir");
    let err = workspace(&dir).read("missing.yaml").unwrap_err();
    let message = err.to_string();
    assert!(message.contains("missing.yaml"), "{message}");
    assert!(
        !message.contains(dir.path().to_str().expect("utf-8")),
        "{message}"
    );
}

// A root that does not exist, or is a file, is rejected at startup rather than
// leaving the server with a sandbox it cannot enforce.
#[test]
fn an_unusable_root_is_rejected() {
    let err = Workspace::new("/no/such/directory/anywhere").unwrap_err();
    assert!(err.to_string().contains("root"), "{err}");

    let dir = TempDir::new().expect("temp dir");
    let file = dir.path().join("not-a-dir");
    std::fs::write(&file, "x").expect("write file");
    let err = Workspace::new(file.to_str().expect("utf-8")).unwrap_err();
    assert!(err.to_string().contains("not a directory"), "{err}");
}
