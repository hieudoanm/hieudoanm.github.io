use kevin::db::DB;
use kevin::server::serve;
use std::io::{Read, Write};
use std::net::{Shutdown, SocketAddr, TcpListener, TcpStream};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;

fn start() -> (
    SocketAddr,
    Arc<AtomicBool>,
    std::thread::JoinHandle<std::io::Result<()>>,
) {
    let listener = TcpListener::bind("127.0.0.1:0").unwrap();
    let addr = listener.local_addr().unwrap();
    let stop = Arc::new(AtomicBool::new(false));
    let kv = Arc::new(DB::new());
    let kv2 = kv.clone();
    let stop2 = stop.clone();
    let handle = std::thread::spawn(move || serve(listener, kv2, stop2));
    (addr, stop, handle)
}

fn roundtrip(addr: SocketAddr, req: &str) -> String {
    let mut stream = TcpStream::connect(addr).unwrap();
    stream.write_all(req.as_bytes()).unwrap();
    stream.shutdown(Shutdown::Write).unwrap();
    let mut buf = Vec::new();
    stream.read_to_end(&mut buf).unwrap();
    String::from_utf8(buf).unwrap()
}

#[test]
fn ping_roundtrip() {
    let (addr, stop, _) = start();
    assert_eq!(roundtrip(addr, "PING\n"), "PONG\n");
    stop.store(true, Ordering::Relaxed);
}

#[test]
fn set_get_with_spaces() {
    let (addr, stop, _) = start();
    let out = roundtrip(addr, "SET k hello world\nGET k\n");
    assert!(out.starts_with("OK\n"));
    assert!(out.contains("hello world\n"));
    stop.store(true, Ordering::Relaxed);
}

#[test]
fn unknown_command_error() {
    let (addr, stop, _) = start();
    assert_eq!(roundtrip(addr, "NOSUCH\n"), "ERR unknown command\n");
    stop.store(true, Ordering::Relaxed);
}

#[test]
fn graceful_stop() {
    let (addr, stop, handle) = start();
    assert_eq!(roundtrip(addr, "PING\n"), "PONG\n");
    stop.store(true, Ordering::Relaxed);
    assert!(handle.join().unwrap().is_ok());
}

#[test]
fn connection_closed_after_eof() {
    let (addr, stop, _) = start();
    let out = roundtrip(addr, "PING\n");
    assert_eq!(out, "PONG\n");
    stop.store(true, Ordering::Relaxed);
}
