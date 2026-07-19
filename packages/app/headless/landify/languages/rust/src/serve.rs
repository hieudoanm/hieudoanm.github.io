//! A dependency-free static file server: serves a directory over HTTP so the
//! built landing page can be previewed in a browser (mirrors Go's `net/http`
//! FileServer for this use case). Stops when the caller sets the stop flag;
//! the CLI wires it to SIGINT/SIGTERM via `bind_serve`.

use anyhow::{anyhow, Context, Result};
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::time::Duration;

const POLL: Duration = Duration::from_millis(250);
const MAX_REQUEST: usize = 64 * 1024;

/// Blocks serving the files in `dir` over HTTP on the listener until `stop`
/// is set, then returns `Ok(())`.
pub fn serve(listener: TcpListener, dir: &str, stop: &Arc<AtomicBool>) -> Result<()> {
    serve_loop(listener, dir, stop)
}

/// Binds `bind:port`, registers a SIGINT/SIGTERM stop flag, prints the
/// serving banner, and serves `dir` until interrupted.
pub fn bind_serve(dir: &str, bind: &str, port: u16) -> Result<()> {
    let addr = format!("{bind}:{port}");
    let listener = TcpListener::bind(&addr).with_context(|| format!("listen on {addr}"))?;
    let stop = Arc::new(AtomicBool::new(false));
    register_signals(&stop)?;
    println!("Serving {dir} on http://{addr}");
    serve(listener, dir, &stop)
}

fn serve_loop(listener: TcpListener, dir: &str, stop: &Arc<AtomicBool>) -> Result<()> {
    listener.set_nonblocking(true)?;
    let mut conns: Vec<TcpStream> = Vec::new();
    loop {
        if stop.load(Ordering::Relaxed) {
            return Ok(());
        }
        match listener.accept() {
            Ok((stream, _)) => {
                let _ = stream.set_nonblocking(false);
                conns.push(stream);
            }
            Err(e) if e.kind() == std::io::ErrorKind::WouldBlock => {
                drain_conns(&mut conns, dir);
                std::thread::sleep(POLL);
            }
            Err(e) => {
                drain_conns(&mut conns, dir);
                return Err(anyhow!("accept: {e}"));
            }
        }
    }
}

/// Handles every readable connection, dropping the ones that finished or
/// stalled.
fn drain_conns(conns: &mut Vec<TcpStream>, dir: &str) {
    let mut keep = Vec::with_capacity(conns.len());
    for mut conn in conns.drain(..) {
        if handle_conn(&mut conn, dir) {
            keep.push(conn);
        }
    }
    *conns = keep;
}

/// Serves one HTTP request on `conn`. Returns `true` if the connection should
/// be kept (multiple pipelined requests); with `Connection: close` a single
/// request per connection is enough in practice.
fn handle_conn(conn: &mut TcpStream, dir: &str) -> bool {
    let mut buf = vec![0u8; MAX_REQUEST];
    let n = match conn.read(&mut buf) {
        Ok(0) => return false,
        Ok(n) => n,
        Err(e) if e.kind() == std::io::ErrorKind::WouldBlock => return true,
        Err(_) => return false,
    };
    let Ok(request) = std::str::from_utf8(&buf[..n]) else {
        return false;
    };
    let Some(request_line) = request.lines().next() else {
        return false;
    };
    let mut parts = request_line.split_whitespace();
    match (parts.next(), parts.next()) {
        (Some("GET"), Some(target)) => reply(conn, dir, target),
        _ => { /* not GET: keep the connection open for the next request */ }
    }
    !request.ends_with("\r\n\r\n") && !request.trim_end().is_empty()
}

/// Streams the requested file (or 404) over `conn`.
fn reply(conn: &mut TcpStream, dir: &str, target: &str) {
    match resolve(dir, target) {
        Ok(path) if path.is_file() => match std::fs::read(&path) {
            Ok(bytes) => {
                let ct = content_type(&path);
                let head = format!(
                    "HTTP/1.1 200 OK\r\nContent-Type: {ct}\r\nContent-Length: {}\r\nConnection: close\r\n\r\n",
                    bytes.len()
                );
                let _ = conn.write_all(head.as_bytes());
                let _ = conn.write_all(&bytes);
            }
            Err(_) => not_found(conn),
        },
        _ => not_found(conn),
    }
}

fn not_found(conn: &mut TcpStream) {
    let head = "HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\nConnection: close\r\n\r\n";
    let _ = conn.write_all(head.as_bytes());
}

/// Resolves a URL path into a file inside `dir`, guarding against traversal.
fn resolve(dir: &str, target: &str) -> Result<PathBuf> {
    let path = target.split('?').next().unwrap_or(target);
    let decoded = percent_decode(path);
    if decoded.contains("..") {
        return Err(anyhow!("path traversal denied"));
    }
    let cleaned = decoded.trim_start_matches('/');
    let root = Path::new(dir);
    let candidate = if cleaned.is_empty() || cleaned == "/" {
        root.join("index.html")
    } else {
        root.join(cleaned)
    };
    let candidate = if candidate.is_dir() {
        candidate.join("index.html")
    } else {
        candidate
    };
    let canonical_root = root.canonicalize().unwrap_or_else(|_| root.to_path_buf());
    let canonical = candidate.canonicalize().map_err(|e| anyhow!("{e}"))?;
    if !canonical.starts_with(&canonical_root) {
        return Err(anyhow!("path traversal denied"));
    }
    Ok(canonical)
}

/// Percent-decodes a URL path (a single pass is enough for preview traffic).
fn percent_decode(s: &str) -> String {
    let bytes = s.as_bytes();
    let mut out = Vec::with_capacity(bytes.len());
    let mut i = 0;
    while i < bytes.len() {
        if bytes[i] == b'%' && i + 2 < bytes.len() {
            if let (Some(hi), Some(lo)) = (hex_val(bytes[i + 1]), hex_val(bytes[i + 2])) {
                out.push((hi << 4) | lo);
                i += 3;
                continue;
            }
        }
        out.push(bytes[i]);
        i += 1;
    }
    String::from_utf8_lossy(&out).into_owned()
}

fn hex_val(b: u8) -> Option<u8> {
    match b {
        b'0'..=b'9' => Some(b - b'0'),
        b'a'..=b'f' => Some(b - b'a' + 10),
        b'A'..=b'F' => Some(b - b'A' + 10),
        _ => None,
    }
}

/// Content type by file extension, mirroring the Go server broadly.
fn content_type(path: &Path) -> &'static str {
    match path.extension().and_then(|e| e.to_str()).unwrap_or("") {
        "html" | "htm" => "text/html; charset=utf-8",
        "css" => "text/css; charset=utf-8",
        "js" | "mjs" => "application/javascript",
        "json" => "application/json",
        "png" => "image/png",
        "jpg" | "jpeg" => "image/jpeg",
        "gif" => "image/gif",
        "webp" => "image/webp",
        "svg" => "image/svg+xml",
        "ico" => "image/x-icon",
        "mp4" => "video/mp4",
        "webm" => "video/webm",
        "vtt" => "text/vtt",
        "woff" => "font/woff",
        "woff2" => "font/woff2",
        "ttf" => "font/ttf",
        "txt" => "text/plain; charset=utf-8",
        _ => "application/octet-stream",
    }
}

/// Sets a flag when SIGINT or SIGTERM is received so the serve loop stops.
fn register_signals(stop: &Arc<AtomicBool>) -> Result<()> {
    use signal_hook::consts::{SIGINT, SIGTERM};
    signal_hook::flag::register(SIGINT, stop.clone()).context("register SIGINT handler")?;
    signal_hook::flag::register(SIGTERM, Arc::clone(stop)).context("register SIGTERM handler")?;
    Ok(())
}
