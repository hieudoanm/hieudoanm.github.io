use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader};
use tokio::net::TcpStream;
use tokio::time::{timeout, Duration};

fn whois_server(domain: &str) -> &str {
    let tld = domain.rsplit('.').next().unwrap_or("");
    match tld {
        "com" | "net" => "whois.verisign-grs.com",
        "org" => "whois.pir.org",
        "io" => "whois.nic.io",
        "dev" => "whois.nic.dev",
        "app" => "whois.nic.google",
        "ai" => "whois.nic.ai",
        "me" => "whois.nic.me",
        "co" => "whois.nic.co",
        "uk" => "whois.nic.uk",
        "de" => "whois.denic.de",
        "jp" => "whois.jprs.jp",
        "fr" => "whois.nic.fr",
        "xyz" => "whois.nic.xyz",
        _ => "whois.iana.org",
    }
}

pub fn command() -> clap::Command {
    clap::Command::new("whois")
        .about("WHOIS lookup for a domain")
        .arg(
            clap::Arg::new("domain")
                .short('d')
                .long("domain")
                .help("Domain to look up")
                .required(true),
        )
        .arg(
            clap::Arg::new("server")
                .short('s')
                .long("server")
                .help("WHOIS server to query"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let domain = matches
        .get_one::<String>("domain")
        .unwrap()
        .trim()
        .to_string();
    let server = matches
        .get_one::<String>("server")
        .cloned()
        .unwrap_or_else(|| whois_server(&domain).to_string());

    let addr = format!("{server}:43");
    let mut stream = timeout(Duration::from_secs(10), TcpStream::connect(&addr))
        .await
        .map_err(|_| anyhow::anyhow!("connect to {server}: timeout"))?
        .map_err(|e| anyhow::anyhow!("connect to {server}: {e}"))?;

    let request = format!("{domain}\r\n");
    stream.write_all(request.as_bytes()).await?;

    let mut reader = BufReader::new(&mut stream);
    let mut response = String::new();
    let mut buf = String::new();
    loop {
        buf.clear();
        let n = reader.read_line(&mut buf).await?;
        if n == 0 {
            break;
        }
        response.push_str(&buf);
    }

    println!("{response}");
    Ok(())
}
