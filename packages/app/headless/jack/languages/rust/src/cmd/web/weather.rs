#[derive(clap::Args)]
pub struct Args {
    #[arg(help = "City name")]
    pub city: Option<String>,
    #[arg(short = 'f', long = "forecast", action = clap::ArgAction::SetTrue, help = "Show 3-day forecast")]
    pub forecast: bool,
    #[arg(short = 'j', long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
    #[arg(
        short = 'u',
        long = "units",
        default_value = "metric",
        help = "Units: metric, imperial, uk"
    )]
    pub units: String,
}

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

fn build_weather_url(city: &str, forecast: bool, json: bool, units: &str) -> String {
    let unit_param = match units {
        "us" | "imperial" => "u",
        "uk" => "M",
        _ => "m",
    };

    if json {
        format!("https://wttr.in/{city}?format=j1&lang=en&{unit_param}")
    } else if forecast {
        format!("https://wttr.in/{city}?0&lang=en&{unit_param}")
    } else {
        format!("https://wttr.in/{city}?format=%C+%t+%w+%h&{unit_param}")
    }
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let forecast = matches.forecast;
    let json = matches.json;
    let units = Some(&matches.units).map(|s| s.as_str()).unwrap_or("metric");
    let city = matches.city.as_ref().cloned();

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

    let url = build_weather_url(&city, forecast, json, units);

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_build_weather_url_json() {
        let url = build_weather_url("London", false, true, "metric");
        assert!(url.contains("London"));
        assert!(url.contains("format=j1"));
    }

    #[test]
    fn test_build_weather_url_forecast() {
        let url = build_weather_url("Paris", true, false, "metric");
        assert!(url.contains("Paris"));
        assert!(url.contains("?0&"));
    }

    #[test]
    fn test_build_weather_url_current() {
        let url = build_weather_url("Tokyo", false, false, "metric");
        assert!(url.contains("Tokyo"));
        assert!(url.contains("%C+%t+%w+%h"));
    }

    #[test]
    fn test_build_weather_url_imperial() {
        let url = build_weather_url("NYC", false, false, "imperial");
        assert!(url.contains("&u"));
    }

    #[test]
    fn test_build_weather_url_uk_units() {
        let url = build_weather_url("London", false, false, "uk");
        assert!(url.contains("&M"));
    }

    #[test]
    fn test_build_weather_url_json_forecast() {
        let url = build_weather_url("Berlin", true, true, "metric");
        assert!(url.contains("Berlin"));
        assert!(url.contains("format=j1"));
    }
}
