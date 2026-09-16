//! TCP server: accept loop with graceful shutdown, goroutine-style
//! thread-per-connection, and structured logging mirroring the Go slog level
//! mapping (INFO conn lifecycle / WARN command errors / DEBUG per command).

use crate::db::DB;
use crate::handler::handle_line;
use std::io::{BufRead, BufReader, ErrorKind, Write};
use std::net::{TcpListener, TcpStream};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::time::Duration;
use tracing::{debug, info, warn};

/// Serves Redis-style requests on `listener` until `stop` is set true.
pub fn serve(listener: TcpListener, kv: Arc<DB>, stop: Arc<AtomicBool>) -> std::io::Result<()> {
    listener.set_nonblocking(true)?;
    info!(addr = %listener.local_addr()?, "server listening");
    loop {
        match listener.accept() {
            Ok((stream, peer)) => {
                info!(%peer, "connection opened");
                let kv = kv.clone();
                std::thread::Builder::new()
                    .name(format!("conn-{peer}"))
                    .spawn(move || handle_connection(stream, kv))
                    .map_err(std::io::Error::other)?;
            }
            Err(e) if e.kind() == ErrorKind::WouldBlock => {
                if stop.load(Ordering::Relaxed) {
                    info!("server stopped");
                    return Ok(());
                }
                std::thread::sleep(Duration::from_millis(10));
            }
            Err(e) => {
                if stop.load(Ordering::Relaxed) {
                    info!("server stopped");
                    return Ok(());
                }
                warn!(%e, "accept failed");
                std::thread::sleep(Duration::from_millis(10));
            }
        }
    }
}

/// Reads protocol lines and writes responses until the client disconnects.
fn handle_connection(stream: TcpStream, kv: Arc<DB>) {
    let peer = stream
        .peer_addr()
        .map(|a| a.to_string())
        .unwrap_or_else(|_| "unknown".to_string());
    let mut reader = BufReader::new(stream.try_clone().unwrap());
    let mut writer = stream;
    let mut line = String::new();

    loop {
        line.clear();
        match reader.read_line(&mut line) {
            Ok(0) => break, // EOF
            Ok(_) => {
                let (resp, reply) = handle_line(&line, &kv);
                if !reply {
                    continue;
                }
                let trimmed = resp.trim_end();
                if trimmed.starts_with("ERR ") {
                    warn!(%peer, request = %line.trim(), response = %trimmed, "command error");
                } else {
                    debug!(%peer, request = %line.trim(), response = %trimmed, "command handled");
                }
                if writer.write_all(resp.as_bytes()).is_err() {
                    break;
                }
                let _ = writer.flush();
            }
            Err(_) => break, // connection reset / read failure
        }
    }
    info!(%peer, "connection closed");
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Read;
    use std::net::TcpListener as StdListener;

    fn start() -> (
        std::net::SocketAddr,
        Arc<AtomicBool>,
        std::thread::JoinHandle<std::io::Result<()>>,
    ) {
        let listener = StdListener::bind("127.0.0.1:0").unwrap();
        let addr = listener.local_addr().unwrap();
        let stop = Arc::new(AtomicBool::new(false));
        let kv = Arc::new(DB::new());
        let kv2 = kv.clone();
        let stop2 = stop.clone();
        let handle = std::thread::spawn(move || serve(listener, kv2, stop2));
        (addr, stop, handle)
    }

    fn roundtrip(addr: std::net::SocketAddr, req: &str) -> String {
        let mut stream = TcpStream::connect(addr).unwrap();
        stream.write_all(req.as_bytes()).unwrap();
        stream.shutdown(std::net::Shutdown::Write).unwrap();
        let mut buf = Vec::new();
        stream.read_to_end(&mut buf).unwrap();
        String::from_utf8(buf).unwrap()
    }

    #[test]
    fn serve_ping_set_get() {
        let (addr, stop, _) = start();
        assert_eq!(roundtrip(addr, "PING\n"), "PONG\n");
        let mut a = TcpStream::connect(addr).unwrap();
        a.write_all(b"SET k hello world\nGET k\nKEYS\n").unwrap();
        a.shutdown(std::net::Shutdown::Write).unwrap();
        let mut buf = String::new();
        BufReader::new(a.try_clone().unwrap())
            .read_to_string(&mut buf)
            .unwrap();
        assert!(buf.contains("OK\n"));
        assert!(buf.contains("hello world\n"));
        stop.store(true, Ordering::Relaxed);
    }

    #[test]
    fn graceful_stop() {
        let (addr, stop, handle) = start();
        assert_eq!(roundtrip(addr, "PING\n"), "PONG\n");
        stop.store(true, Ordering::Relaxed);
        assert!(handle.join().unwrap().is_ok());
    }
}
