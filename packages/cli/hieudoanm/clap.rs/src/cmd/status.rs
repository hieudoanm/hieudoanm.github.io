use std::collections::HashMap;

async fn check_service(_name: &str, url: &str) -> String {
    let client = reqwest::Client::new();
    match client.get(url).send().await {
        Ok(resp) => {
            let status = resp.status();
            if status.is_success() {
                format!("UP ({status})")
            } else {
                format!("DOWN ({status})")
            }
        }
        Err(e) => format!("ERROR: {e}"),
    }
}

pub fn command() -> clap::Command {
    clap::Command::new("status")
        .about("Interactive service status check")
        .subcommand(
            clap::Command::new("all")
                .about("Show status of all services")
                .alias("status-all"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("all", m)) => super::status_all::run(m).await,
        _ => {
            let services = crate::configs::services();
            let mut options: Vec<String> = Vec::new();
            let mut service_map: HashMap<String, (String, String)> = HashMap::new();

            for (group, svcs) in &services {
                for (name, url) in svcs {
                    let label = format!("{group} / {name}");
                    options.push(label.clone());
                    service_map.insert(label, (name.clone(), url.clone()));
                }
            }

            println!("Available services:");
            for (i, opt) in options.iter().enumerate() {
                println!("  {}. {opt}", i + 1);
            }

            print!("\nChoose a service (1-{}): ", options.len());
            std::io::Write::flush(&mut std::io::stdout())?;

            let mut input = String::new();
            std::io::stdin().read_line(&mut input)?;
            let idx: usize = input.trim().parse().unwrap_or(0);

            if idx == 0 || idx > options.len() {
                anyhow::bail!("invalid choice");
            }

            let label = &options[idx - 1];
            let (name, url) = service_map
                .get(label)
                .ok_or_else(|| anyhow::anyhow!("service not found"))?;

            println!("\nChecking {name}...");
            let status = check_service(name, url).await;
            println!("{name}: {status}");

            Ok(())
        }
    }
}
