pub fn command() -> clap::Command {
    clap::Command::new("weather")
        .about("Check current weather for a city")
        .arg(clap::Arg::new("city").help("City name"))
        .arg(
            clap::Arg::new("forecast")
                .short('f')
                .long("forecast")
                .help("Show 3-day forecast")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("json")
                .short('j')
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("units")
                .short('u')
                .long("units")
                .help("Units: metric, imperial, uk")
                .default_value("metric"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let forecast = matches.get_flag("forecast");
    let json = matches.get_flag("json");
    let units = matches
        .get_one::<String>("units")
        .map(|s| s.as_str())
        .unwrap_or("metric");
    let city = matches.get_one::<String>("city").cloned();

    let city = if let Some(c) = city {
        c
    } else if !forecast {
        detect_location().await.unwrap_or_default()
    } else {
        String::new()
    };

    if city.is_empty() {
        anyhow::bail!("provide a city name");
    }

    let unit_param = match units {
        "us" | "imperial" => "u",
        "uk" => "M",
        _ => "m",
    };

    let url = if forecast {
        if json {
            format!("https://wttr.in/{city}?format=j1&lang=en&{unit_param}")
        } else {
            format!("https://wttr.in/{city}?0&lang=en&{unit_param}")
        }
    } else if json {
        format!("https://wttr.in/{city}?format=j1&lang=en&{unit_param}")
    } else {
        format!("https://wttr.in/{city}?format=%C+%t+%w+%h&{unit_param}")
    };

    let client = reqwest::Client::new();
    let resp = client
        .get(&url)
        .send()
        .await
        .map_err(|e| anyhow::anyhow!("fetch error: {e}"))?;
    let text = resp.text().await?.trim().to_string();

    if json {
        let data: serde_json::Value =
            serde_json::from_str(&text).map_err(|e| anyhow::anyhow!("json parse error: {e}"))?;
        println!("{data:#}");
    } else {
        println!("{text}");
    }

    Ok(())
}

async fn detect_location() -> anyhow::Result<String> {
    let client = reqwest::Client::new();
    let resp = client.get("https://ipinfo.io/json").send().await?;
    let data: serde_json::Value = resp.json().await?;
    let city = data["city"]
        .as_str()
        .ok_or_else(|| anyhow::anyhow!("could not detect city"))?;
    Ok(city.to_string())
}
