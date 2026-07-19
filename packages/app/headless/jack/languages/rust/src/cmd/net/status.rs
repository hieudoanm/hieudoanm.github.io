fn load_services() -> Vec<(String, String)> {
    let services = crate::configs::services();
    let mut result = Vec::new();
    for svcs in services.values() {
        for (name, url) in svcs {
            result.push((name.clone(), url.clone()));
        }
    }
    result
}

async fn check_service(_name: &str, url: &str) -> String {
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(10))
        .build()
        .unwrap();
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

#[derive(clap::Args)]
pub struct Args;

pub fn command() -> clap::Command {
    clap::Command::new("status").about("Check service status")
}

pub fn command_all() -> clap::Command {
    clap::Command::new("status-all")
        .about("Show status of all services")
        .alias("all")
}

pub async fn run(_matches: &Args) -> anyhow::Result<()> {
    let services = load_services();
    let mut options: Vec<String> = Vec::new();
    for (name, url) in &services {
        options.push(name.clone());
        println!("{name}: {}", check_service(name, url).await);
    }
    Ok(())
}

fn format_status_display(status: &str) -> String {
    if status.starts_with("UP") {
        format!("\x1b[32m{status}\x1b[0m")
    } else if status.starts_with("DOWN") {
        format!("\x1b[31m{status}\x1b[0m")
    } else {
        format!("\x1b[33m{status}\x1b[0m")
    }
}

pub async fn run_all(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let services = load_services();
    println!("┌─────────────────────────────────────────────────────────────┐");
    println!("│                    Service Status Dashboard                  │");
    println!("├─────────────────────────────────────────────────────────────┤");
    for (name, url) in &services {
        print!("│ {name:<30} ");
        let status = check_service(name, url).await;
        let status_display = format_status_display(&status);
        println!("{status_display:<37} │");
    }
    println!("└─────────────────────────────────────────────────────────────┘");
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert_eq!(cmd.get_name(), "status");
    }

    #[test]
    fn test_command_all_definition() {
        let cmd = command_all();
        assert_eq!(cmd.get_name(), "status-all");
    }

    #[test]
    fn test_command_all_alias() {
        let cmd = command_all();
        let aliases: Vec<&str> = cmd.get_aliases().collect();
        assert!(aliases.contains(&"all"));
    }

    #[test]
    fn test_load_services_returns_vec() {
        // load_services reads from configs::services() which may be empty in test
        let services = load_services();
        assert!(services.iter().all(|(n, u)| !n.is_empty() && !u.is_empty()));
    }

    #[test]
    fn test_format_status_display_up() {
        let result = format_status_display("UP (200)");
        assert_eq!(result, "\x1b[32mUP (200)\x1b[0m");
    }

    #[test]
    fn test_format_status_display_down() {
        let result = format_status_display("DOWN (500)");
        assert_eq!(result, "\x1b[31mDOWN (500)\x1b[0m");
    }

    #[test]
    fn test_format_status_display_error() {
        let result = format_status_display("ERROR: connection refused");
        assert_eq!(result, "\x1b[33mERROR: connection refused\x1b[0m");
    }

    #[test]
    fn test_format_status_display_edge() {
        let result = format_status_display("UP");
        assert_eq!(result, "\x1b[32mUP\x1b[0m");
        let result = format_status_display("DOWN");
        assert_eq!(result, "\x1b[31mDOWN\x1b[0m");
        let result = format_status_display("");
        assert_eq!(result, "\x1b[33m\x1b[0m");
    }
}
