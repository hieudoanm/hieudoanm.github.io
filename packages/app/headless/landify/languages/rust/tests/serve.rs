//! Static server integration: starts the HTTP server on a random port,
//! exercises it over real TCP, and verifies graceful shutdown.

use std::io::{Read, Write};
use std::net::{Shutdown, SocketAddr, TcpListener, TcpStream};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;

fn start(
    dir: &tempfile::TempDir,
) -> (
    SocketAddr,
    Arc<AtomicBool>,
    std::thread::JoinHandle<anyhow::Result<()>>,
) {
    let listener = TcpListener::bind("127.0.0.1:0").unwrap();
    let addr = listener.local_addr().unwrap();
    let stop = Arc::new(AtomicBool::new(false));
    let stop2 = stop.clone();
    let dir = dir.path().to_string_lossy().into_owned();
    let handle = std::thread::spawn(move || landify::serve::serve(listener, &dir, &stop2));
    (addr, stop, handle)
}

fn get(addr: SocketAddr, path: &str) -> String {
    let mut stream = TcpStream::connect(addr).unwrap();
    let mut req = format!("GET {path} HTTP/1.1\r\nHost: localhost\r\n");
    req.push_str("\r\n");
    stream.write_all(req.as_bytes()).unwrap();
    stream.shutdown(Shutdown::Write).unwrap();
    let mut buf = Vec::new();
    stream.read_to_end(&mut buf).unwrap();
    String::from_utf8(buf).unwrap()
}

fn status_and_body(resp: &str) -> (u16, String) {
    let status = resp
        .lines()
        .next()
        .and_then(|l| l.split_whitespace().nth(1))
        .and_then(|s| s.parse().ok())
        .unwrap();
    let body = resp.split("\r\n\r\n").nth(1).unwrap_or("").to_string();
    (status, body)
}

#[test]
fn serves_index_page() {
    let dir = tempfile::tempdir().unwrap();
    std::fs::write(dir.path().join("index.html"), "hi\n").unwrap();
    let (addr, stop, _) = start(&dir);
    let resp = get(addr, "/");
    let (status, body) = status_and_body(&resp);
    assert_eq!(status, 200);
    assert_eq!(body, "hi\n");
    assert!(resp.contains("text/html"));
    stop.store(true, Ordering::Relaxed);
}

#[test]
fn serves_nested_css_with_type() {
    let dir = tempfile::tempdir().unwrap();
    std::fs::create_dir_all(dir.path().join("css")).unwrap();
    std::fs::write(dir.path().join("css/style.css"), "body{}").unwrap();
    let (addr, stop, _) = start(&dir);
    let resp = get(addr, "/css/style.css");
    let (status, body) = status_and_body(&resp);
    assert_eq!(status, 200);
    assert_eq!(body, "body{}");
    assert!(resp.contains("text/css"));
    stop.store(true, Ordering::Relaxed);
}

#[test]
fn percents_are_decoded() {
    let dir = tempfile::tempdir().unwrap();
    std::fs::write(dir.path().join("a b.html"), "spaced").unwrap();
    let (addr, stop, _) = start(&dir);
    let (status, body) = status_and_body(&get(addr, "/a%20b.html"));
    assert_eq!(status, 200);
    assert_eq!(body, "spaced");
    stop.store(true, Ordering::Relaxed);
}

#[test]
fn unknown_files_return_404() {
    let dir = tempfile::tempdir().unwrap();
    let (addr, stop, _) = start(&dir);
    let resp = get(addr, "/missing.html");
    let (status, _) = status_and_body(&resp);
    assert_eq!(status, 404);
    stop.store(true, Ordering::Relaxed);
}

#[test]
fn traversal_is_denied() {
    let dir = tempfile::tempdir().unwrap();
    std::fs::write(dir.path().join("index.html"), "ok").unwrap();
    let (addr, stop, _) = start(&dir);
    let (status, _) = status_and_body(&get(addr, "/../etc/passwd"));
    assert_eq!(status, 404);
    stop.store(true, Ordering::Relaxed);
}

#[test]
fn query_strings_are_ignored() {
    let dir = tempfile::tempdir().unwrap();
    std::fs::write(dir.path().join("index.html"), "query").unwrap();
    let (addr, stop, _) = start(&dir);
    let (status, body) = status_and_body(&get(addr, "/index.html?ref=test"));
    assert_eq!(status, 200);
    assert_eq!(body, "query");
    stop.store(true, Ordering::Relaxed);
}

#[test]
fn stops_cleanly_when_flagged() {
    let dir = tempfile::tempdir().unwrap();
    std::fs::write(dir.path().join("index.html"), "bye").unwrap();
    let (addr, stop, handle) = start(&dir);
    let (status, _) = status_and_body(&get(addr, "/"));
    assert_eq!(status, 200);
    stop.store(true, Ordering::Relaxed);
    assert!(handle.join().unwrap().is_ok());
}
