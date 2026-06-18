pub fn command() -> clap::Command {
    clap::Command::new("http")
        .about("Make HTTP requests")
        .arg(
            clap::Arg::new("url")
                .short('u')
                .long("url")
                .help("URL to request")
                .required(true),
        )
        .arg(
            clap::Arg::new("method")
                .short('X')
                .long("method")
                .help("HTTP method (GET, POST, PUT, DELETE)")
                .default_value("GET"),
        )
        .arg(
            clap::Arg::new("data")
                .short('d')
                .long("data")
                .help("Request body data"),
        )
        .arg(
            clap::Arg::new("header")
                .short('H')
                .long("header")
                .help("Request headers (key:val,key2:val2)"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Pretty-print JSON response")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let url = matches.get_one::<String>("url").unwrap().clone();
    let method = matches.get_one::<String>("method").unwrap().to_uppercase();
    let data = matches.get_one::<String>("data").cloned();
    let header = matches.get_one::<String>("header").cloned();
    let json = matches.get_flag("json");

    let client = reqwest::Client::new();
    let mut req = match method.as_str() {
        "GET" => client.get(&url),
        "POST" => client.post(&url),
        "PUT" => client.put(&url),
        "DELETE" => client.delete(&url),
        _ => anyhow::bail!("unsupported method: {method} (use GET, POST, PUT, DELETE)"),
    };

    if let Some(ref h) = header {
        for part in h.split(',') {
            let part = part.trim();
            if let Some((key, val)) = part.split_once(':') {
                req = req.header(key.trim(), val.trim());
            }
        }
    }

    if let Some(d) = data {
        req = req.body(d);
    }

    let resp = req.send().await?;
    let body = resp.text().await?;

    if json {
        if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&body) {
            println!("{}", serde_json::to_string_pretty(&parsed)?);
            return Ok(());
        }
    }

    println!("{body}");
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
}
