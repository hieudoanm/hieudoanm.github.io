use std::fs;
use std::process::Command;
use std::sync::atomic::{AtomicUsize, Ordering};

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

fn test_dir(name: &str) -> String {
    static ID: AtomicUsize = AtomicUsize::new(0);
    let id = ID.fetch_add(1, Ordering::SeqCst);
    let dir = format!("/tmp/hieudoanm_test_{name}_{id}");
    let _ = fs::create_dir_all(&dir);
    dir
}

fn write_test_file(dir: &str, name: &str, content: &str) -> String {
    let path = format!("{dir}/{name}");
    fs::write(&path, content).unwrap();
    path
}

#[test]
fn file_read_basic() {
    let dir = test_dir("read");
    let path = write_test_file(&dir, "test.txt", "hello\nworld\nfoo\nbar\nbaz\n");

    let output = binary()
        .args(["file", "read", "-f", &path])
        .output()
        .unwrap();
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("hello"));
    assert!(stdout.contains("world"));
}

#[test]
fn file_read_with_lines() {
    let dir = test_dir("read_lines");
    let path = write_test_file(&dir, "lines.txt", "line1\nline2\nline3\nline4\nline5\n");

    let output = binary()
        .args(["file", "read", "-f", &path, "-n", "2"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("line1"));
    assert!(stdout.contains("line2"));
    assert!(!stdout.contains("line3"));
}

#[test]
fn file_head() {
    let dir = test_dir("head");
    let path = write_test_file(&dir, "head.txt", "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk\nl\n");

    let output = binary()
        .args(["file", "head", "-f", &path, "-n", "3"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("a"));
    assert!(stdout.contains("c"));
    assert!(!stdout.contains("d"));
}

#[test]
fn file_tail() {
    let dir = test_dir("tail");
    let path = write_test_file(&dir, "tail.txt", "a\nb\nc\nd\ne\n");

    let output = binary()
        .args(["file", "tail", "-f", &path, "-n", "2"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("d"));
    assert!(stdout.contains("e"));
    assert!(!stdout.contains("a"));
}

#[test]
fn file_write_and_read() {
    let dir = test_dir("write");
    let path = format!("{dir}/written.txt");

    let output = binary()
        .args(["file", "write", "-f", &path, "-c", "hello world"])
        .output()
        .unwrap();
    assert!(output.status.success());

    let content = fs::read_to_string(&path).unwrap();
    assert_eq!(content, "hello world");
}

#[test]
fn file_append() {
    let dir = test_dir("append");
    let path = write_test_file(&dir, "append.txt", "initial\n");

    let output = binary()
        .args(["file", "write", "-f", &path, "-c", "appended", "-a"])
        .output()
        .unwrap();
    assert!(output.status.success());

    let content = fs::read_to_string(&path).unwrap();
    assert!(content.contains("initial"));
    assert!(content.contains("appended"));
}

#[test]
fn file_edit_replace() {
    let dir = test_dir("edit_replace");
    let path = write_test_file(&dir, "edit.txt", "hello world\nfoo bar\n");

    let output = binary()
        .args(["file", "edit", "-f", &path, "-o", "world", "--new", "there"])
        .output()
        .unwrap();
    assert!(output.status.success());

    let content = fs::read_to_string(&path).unwrap();
    assert!(content.contains("hello there"));
    assert!(content.contains("foo bar"));
}

#[test]
fn file_edit_preview() {
    let dir = test_dir("edit_preview");
    let path = write_test_file(&dir, "preview.txt", "hello world\n");

    let output = binary()
        .args([
            "file", "edit", "-f", &path, "-o", "world", "--new", "there", "-p",
        ])
        .output()
        .unwrap();
    assert!(output.status.success());

    // file should remain unchanged
    let content = fs::read_to_string(&path).unwrap();
    assert!(content.contains("world"));
}

#[test]
fn file_edit_no_match() {
    let dir = test_dir("edit_nomatch");
    let path = write_test_file(&dir, "nomatch.txt", "hello world\n");

    let output = binary()
        .args([
            "file",
            "edit",
            "-f",
            &path,
            "-o",
            "XYZZY_NOT_THERE",
            "--new",
            "x",
        ])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("No matches"));
}

#[test]
fn file_grep_finds_pattern() {
    let dir = test_dir("grep");
    let path = write_test_file(&dir, "grep.txt", "hello world\nfoo bar\nbaz qux\n");

    let output = binary()
        .args(["file", "grep", "-p", "hello", "-P", &path])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("hello"));
}

#[test]
fn file_grep_no_match() {
    let dir = test_dir("grep_nomatch");
    let path = write_test_file(&dir, "grep_none.txt", "hello world\n");

    let output = binary()
        .args(["file", "grep", "-p", "XYZZY", "-P", &path])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("no matches"));
}

#[test]
fn file_checksum_sha256() {
    let dir = test_dir("checksum");
    let path = write_test_file(&dir, "checksum.txt", "hello");

    let output = binary()
        .args(["file", "checksum", "-f", &path, "-a", "sha256"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"));
}

#[test]
fn file_checksum_md5() {
    let dir = test_dir("checksum_md5");
    let path = write_test_file(&dir, "checksum_md5.txt", "hello");

    let output = binary()
        .args(["file", "checksum", "-f", &path, "-a", "md5"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("5d41402abc4b2a76b9719d911017c592"));
}

#[test]
fn file_chmod() {
    let dir = test_dir("chmod");
    let path = write_test_file(&dir, "chmod.txt", "test");

    let output = binary()
        .args(["file", "chmod", "-m", "600", "-f", &path])
        .output()
        .unwrap();
    assert!(output.status.success());

    let meta = fs::metadata(&path).unwrap();
    use std::os::unix::fs::PermissionsExt;
    let mode = PermissionsExt::mode(&meta.permissions()) & 0o777;
    assert_eq!(mode, 0o600);
}

#[test]
fn file_count() {
    let dir = test_dir("count");
    let path = write_test_file(&dir, "count.txt", "one two three\nfour five\nsix\n");

    let output = binary()
        .args(["file", "count", "-f", &path])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("3")); // lines
    assert!(stdout.contains("6")); // words
}

#[test]
fn file_type_detect() {
    let dir = test_dir("ftype");
    let path = write_test_file(&dir, "type.txt", "hello");

    let output = binary()
        .args(["file", "type", "-f", &path])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("type.txt"));
    assert!(stdout.contains("MIME"));
}

#[test]
fn file_info_size() {
    let dir = test_dir("size");
    let path = write_test_file(&dir, "size.txt", "hello");

    let output = binary()
        .args(["file", "size", "-p", &path])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    // "5 B" for 5 bytes input "hello"
    assert!(stdout.contains("5") || stdout.contains("B"));
}

#[test]
fn file_info_stats() {
    let dir = test_dir("stats");
    write_test_file(&dir, "a.rs", "fn main() {}");
    write_test_file(&dir, "b.rs", "fn foo() {}");
    write_test_file(&dir, "c.txt", "hello");

    let output = binary()
        .args(["file", "stats", "-d", &dir])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains(".rs"));
    assert!(stdout.contains(".txt"));
}

#[test]
fn file_duplicates_finds_none() {
    let dir = test_dir("dups");
    write_test_file(&dir, "a.txt", "hello");
    write_test_file(&dir, "b.txt", "world");

    let output = binary()
        .args(["file", "duplicates", "-d", &dir, "-m", "1"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("No duplicates"));
}
