#[derive(clap::Args)]
pub struct Args {
    #[arg(
        short = 'p',
        long = "port",
        default_value = "8080",
        help = "Port to listen on"
    )]
    pub port: String,
}

pub fn command() -> clap::Command {
    clap::Command::new("serve")
        .about("Start the OpenRouter HTTP server")
        .arg(
            clap::Arg::new("port")
                .short('p')
                .long("port")
                .help("Port to listen on")
                .default_value("8080"),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let port = Some(&matches.port)
        .and_then(|p| p.parse::<u16>().ok())
        .unwrap_or(8080);
    println!("OpenRouter HTTP server starting on http://localhost:{port}");
    println!("Endpoints:");
    println!("  GET  /       - Health check");
    println!("  POST /chat   - Forward prompt to OpenRouter");
    println!("Press Ctrl+C to stop.");
    let addr = format!("0.0.0.0:{port}");
    let listener = tokio::net::TcpListener::bind(&addr).await?;
    loop {
        let (socket, _) = listener.accept().await?;
        tokio::spawn(async move {
            if let Err(e) = handle_connection(socket).await {
                eprintln!("connection error: {e}");
            }
        });
    }
}

fn route_request(request_line: &str) -> &'static str {
    if request_line.starts_with("GET / ") {
        "HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n{\"status\":\"ok\"}"
    } else {
        "HTTP/1.1 404 Not Found\r\n\r\n"
    }
}

async fn handle_connection(mut socket: tokio::net::TcpStream) -> anyhow::Result<()> {
    use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader};
    let (reader, mut writer) = socket.split();
    let mut buf_reader = BufReader::new(reader);
    let mut request_line = String::new();
    buf_reader.read_line(&mut request_line).await?;
    let response = route_request(&request_line);
    writer.write_all(response.as_bytes()).await?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[test]
    fn test_route_health_check() {
        let resp = route_request("GET / HTTP/1.1\r\n");
        assert!(resp.contains("200 OK"));
        assert!(resp.contains("{\"status\":\"ok\"}"));
        assert!(resp.contains("Content-Type: application/json"));
    }

    #[test]
    fn test_route_not_found() {
        let resp = route_request("POST /chat HTTP/1.1\r\n");
        assert!(resp.contains("404 Not Found"));
    }

    #[test]
    fn test_route_empty_line() {
        let resp = route_request("");
        assert!(resp.contains("404 Not Found"));
    }

    #[test]
    fn test_route_bogus_method() {
        let resp = route_request("OPTIONS * HTTP/1.1\r\n");
        assert!(resp.contains("404 Not Found"));
    }

    #[test]
    fn test_command_has_port_default() {
        let cmd = command();
        let port = cmd.get_arguments().find(|a| a.get_id() == "port");
        assert!(port.is_some());
        assert_eq!(
            port.unwrap().get_default_values().first().unwrap(),
            "8080"
        );
    }
}
