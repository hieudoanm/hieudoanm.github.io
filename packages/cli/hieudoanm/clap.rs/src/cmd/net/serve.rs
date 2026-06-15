use std::fs;
use std::io::{BufRead, BufReader, Read, Write};
use std::net::{TcpListener, TcpStream};
use std::path::Path;

const INDEX_FILES: &[&str] = &["index.html", "index.htm"];

fn content_type(path: &Path) -> &'static str {
    match path.extension().and_then(|e| e.to_str()) {
        Some("html" | "htm") => "text/html",
        Some("css") => "text/css",
        Some("js") => "application/javascript",
        Some("json") => "application/json",
        Some("png") => "image/png",
        Some("jpg" | "jpeg") => "image/jpeg",
        Some("gif") => "image/gif",
        Some("svg") => "image/svg+xml",
        Some("ico") => "image/x-icon",
        Some("txt") => "text/plain",
        Some("pdf") => "application/pdf",
        Some("zip") => "application/zip",
        Some("xml") => "application/xml",
        Some("wasm") => "application/wasm",
        _ => "application/octet-stream",
    }
}

fn handle_client(mut stream: TcpStream, base_dir: &Path, cors: bool) {
    let mut reader = BufReader::new(&mut stream);
    let mut request_line = String::new();
    if reader.read_line(&mut request_line).is_err() {
        return;
    }

    let parts: Vec<&str> = request_line.split_whitespace().collect();
    if parts.is_empty() {
        return;
    }

    if parts[0] == "OPTIONS" && cors {
        let resp = "HTTP/1.1 204 No Content\r\n\
                     Access-Control-Allow-Origin: *\r\n\
                     Access-Control-Allow-Methods: GET, OPTIONS\r\n\
                     Access-Control-Allow-Headers: *\r\n\
                     Content-Length: 0\r\n\r\n";
        let _ = stream.write_all(resp.as_bytes());
        return;
    }

    if parts.len() < 2 || parts[0] != "GET" {
        let _ = stream.write_all(b"HTTP/1.1 405 Method Not Allowed\r\n\r\n");
        return;
    }

    let req_path = parts[1];
    let req_path = req_path.trim_start_matches('/');
    let file_path = base_dir.join(req_path);

    for _line in reader.by_ref().lines() {
        let line = _line.unwrap_or_default();
        if line.is_empty() || line == "\r" {
            break;
        }
    }

    let mut response = Vec::new();

    if file_path.exists() && file_path.is_file() {
        let data = match fs::read(&file_path) {
            Ok(d) => d,
            Err(_) => {
                let _ = stream.write_all(b"HTTP/1.1 500 Internal Server Error\r\n\r\n");
                return;
            }
        };
        let ct = content_type(&file_path);
        write_response_headers(&mut response, 200, ct, data.len(), cors);
        response.extend_from_slice(&data);
    } else if file_path.is_dir() {
        let index = INDEX_FILES.iter().find(|f| file_path.join(f).exists());
        if let Some(index_file) = index {
            let index_path = file_path.join(index_file);
            let data = match fs::read(&index_path) {
                Ok(d) => d,
                Err(_) => {
                    let _ = stream.write_all(b"HTTP/1.1 500 Internal Server Error\r\n\r\n");
                    return;
                }
            };
            let ct = content_type(&index_path);
            write_response_headers(&mut response, 200, ct, data.len(), cors);
            response.extend_from_slice(&data);
        } else {
            let entries = match fs::read_dir(&file_path) {
                Ok(entries) => {
                    let mut items: Vec<String> = entries
                        .filter_map(|e| e.ok())
                        .map(|e| {
                            let name = e.file_name().to_string_lossy().to_string();
                            let is_dir = e.file_type().map(|t| t.is_dir()).unwrap_or(false);
                            if is_dir {
                                format!("{name}/")
                            } else {
                                name
                            }
                        })
                        .collect();
                    items.sort();
                    items
                }
                Err(_) => vec![],
            };

            let mut listing = String::from("<html><body><h1>Directory Listing</h1><ul>");
            for entry in &entries {
                let href = if req_path.is_empty() {
                    entry.clone()
                } else {
                    format!("/{req_path}/{entry}")
                };
                listing.push_str(&format!("<li><a href=\"{href}\">{entry}</a></li>"));
            }
            listing.push_str("</ul></body></html>");
            let data = listing.into_bytes();
            write_response_headers(&mut response, 200, "text/html", data.len(), cors);
            response.extend_from_slice(&data);
        }
    } else {
        let body = b"404 Not Found";
        write_response_headers(&mut response, 404, "text/plain", body.len(), cors);
        response.extend_from_slice(body);
    }

    let _ = stream.write_all(&response);
}

fn write_response_headers(
    response: &mut Vec<u8>,
    status: u16,
    content_type: &str,
    content_len: usize,
    cors: bool,
) {
    let reason = match status {
        200 => "OK",
        204 => "No Content",
        404 => "Not Found",
        405 => "Method Not Allowed",
        500 => "Internal Server Error",
        _ => "Unknown",
    };
    response.extend_from_slice(
        format!("HTTP/1.1 {status} {reason}\r\nContent-Type: {content_type}\r\nContent-Length: {content_len}\r\n")
            .as_bytes(),
    );
    if cors {
        response.extend_from_slice(
            b"Access-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: GET, OPTIONS\r\nAccess-Control-Allow-Headers: *\r\n",
        );
    }
    response.extend_from_slice(b"\r\n");
}

pub fn command() -> clap::Command {
    clap::Command::new("serve")
        .about("Start an HTTP file server")
        .arg(
            clap::Arg::new("port")
                .short('p')
                .long("port")
                .help("Port to listen on")
                .default_value("8080"),
        )
        .arg(
            clap::Arg::new("dir")
                .short('d')
                .long("dir")
                .help("Directory to serve")
                .default_value("."),
        )
        .arg(
            clap::Arg::new("cors")
                .long("cors")
                .help("Enable CORS headers")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let port: u16 = matches
        .get_one::<String>("port")
        .unwrap()
        .parse()
        .unwrap_or(8080);
    let dir = matches.get_one::<String>("dir").unwrap();
    let cors = matches.get_flag("cors");

    let dir_path = Path::new(dir);
    let abs_dir = if dir_path.is_absolute() {
        dir_path.to_path_buf()
    } else {
        let cwd = std::env::current_dir()?;
        cwd.join(dir_path)
    };

    if !abs_dir.is_dir() {
        anyhow::bail!("{} is not a directory", abs_dir.display());
    }

    let addr = format!("127.0.0.1:{port}");
    let listener =
        TcpListener::bind(&addr).map_err(|e| anyhow::anyhow!("port {port} unavailable: {e}"))?;

    println!("Serving {} on http://{addr}", abs_dir.display());

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                let base_dir = abs_dir.clone();
                handle_client(stream, &base_dir, cors);
            }
            Err(e) => {
                eprintln!("connection error: {e}");
            }
        }
    }

    Ok(())
}
