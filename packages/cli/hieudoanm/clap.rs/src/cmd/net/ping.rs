use tokio::net::TcpStream;
use tokio::time::{timeout, Duration};

pub fn command() -> clap::Command {
    clap::Command::new("ping")
        .about("TCP ping to check host reachability")
        .arg(
            clap::Arg::new("host")
                .short('H')
                .long("host")
                .help("Host to ping")
                .required(true),
        )
        .arg(
            clap::Arg::new("port")
                .short('p')
                .long("port")
                .help("TCP port")
                .default_value("80"),
        )
        .arg(
            clap::Arg::new("count")
                .short('c')
                .long("count")
                .help("Number of pings")
                .default_value("4"),
        )
        .arg(
            clap::Arg::new("timeout")
                .short('t')
                .long("timeout")
                .help("Per-ping timeout in seconds")
                .default_value("5"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let host = matches.get_one::<String>("host").unwrap();
    let port: u16 = matches
        .get_one::<String>("port")
        .unwrap()
        .parse()
        .unwrap_or(80);
    let count: u32 = matches
        .get_one::<String>("count")
        .unwrap()
        .parse()
        .unwrap_or(4);
    let timeout_secs: u64 = matches
        .get_one::<String>("timeout")
        .unwrap()
        .parse()
        .unwrap_or(5);

    let mut successes = 0u32;
    let mut failures = 0u32;
    let mut total = Duration::from_secs(0);

    let addr = format!("{host}:{port}");

    for seq in 1..=count {
        let start = std::time::Instant::now();
        match timeout(Duration::from_secs(timeout_secs), TcpStream::connect(&addr)).await {
            Ok(Ok(conn)) => {
                drop(conn);
                successes += 1;
                let elapsed = start.elapsed();
                total += elapsed;
                println!(
                    "PING {} (port {}) — seq={} time={}ms",
                    host,
                    port,
                    seq,
                    elapsed.as_millis()
                );
            }
            _ => {
                failures += 1;
                let elapsed = start.elapsed();
                println!(
                    "PING {} (port {}) — seq={} time={}ms error=timeout",
                    host,
                    port,
                    seq,
                    elapsed.as_millis()
                );
            }
        }
    }

    let loss = if count > 0 {
        (failures as f64 / count as f64) * 100.0
    } else {
        0.0
    };

    println!();
    println!("--- {host} ping statistics ---");
    println!("{count} sent, {successes} received, {loss:.0}% loss");
    if successes > 0 {
        let avg = total / successes;
        println!("avg time: {}ms", avg.as_millis());
    }

    Ok(())
}
