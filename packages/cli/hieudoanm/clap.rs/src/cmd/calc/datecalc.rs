use chrono::{Datelike, NaiveDate};
use clap::ArgMatches;

pub fn command() -> clap::Command {
    clap::Command::new("datecalc")
        .about("Date arithmetic and difference")
        .arg(
            clap::Arg::new("date")
                .long("date")
                .short('d')
                .help("Reference date (YYYY-MM-DD, default: today)"),
        )
        .arg(clap::Arg::new("add").long("add").help("Add N days"))
        .arg(
            clap::Arg::new("add-months")
                .long("add-months")
                .help("Add N months"),
        )
        .arg(
            clap::Arg::new("add-years")
                .long("add-years")
                .help("Add N years"),
        )
        .arg(
            clap::Arg::new("diff")
                .long("diff")
                .help("Calculate days between two dates (YYYY-MM-DD)"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let json = matches.get_flag("json");

    let today = chrono::Local::now().naive_local().date();

    if let Some(diff_str) = matches.get_one::<String>("diff") {
        let date2 = NaiveDate::parse_from_str(diff_str, "%Y-%m-%d")
            .map_err(|_| anyhow::anyhow!("invalid date {:?} (use YYYY-MM-DD)", diff_str))?;

        if let Some(date_str) = matches.get_one::<String>("date") {
            let date1 = NaiveDate::parse_from_str(date_str, "%Y-%m-%d")
                .map_err(|_| anyhow::anyhow!("invalid date {:?} (use YYYY-MM-DD)", date_str))?;
            let days = (date2 - date1).num_days().abs();
            if json {
                let output = serde_json::json!({
                    "date1": date1.format("%Y-%m-%d").to_string(),
                    "date2": date2.format("%Y-%m-%d").to_string(),
                    "days": days,
                });
                println!("{}", serde_json::to_string_pretty(&output)?);
            } else {
                println!(
                    "{} → {}: {} days",
                    date1.format("%Y-%m-%d"),
                    date2.format("%Y-%m-%d"),
                    days
                );
            }
        } else {
            let days = (date2 - today).num_days().abs();
            if json {
                let output = serde_json::json!({
                    "date1": today.format("%Y-%m-%d").to_string(),
                    "date2": date2.format("%Y-%m-%d").to_string(),
                    "days": days,
                });
                println!("{}", serde_json::to_string_pretty(&output)?);
            } else {
                println!(
                    "{} → {}: {} days",
                    today.format("%Y-%m-%d"),
                    date2.format("%Y-%m-%d"),
                    days
                );
            }
        }
        return Ok(());
    }

    let base = if let Some(date_str) = matches.get_one::<String>("date") {
        NaiveDate::parse_from_str(date_str, "%Y-%m-%d")
            .map_err(|_| anyhow::anyhow!("invalid date {:?} (use YYYY-MM-DD)", date_str))?
    } else {
        today
    };

    let mut result = base;
    if let Some(add_str) = matches.get_one::<String>("add") {
        let days: i64 = add_str.parse()?;
        result += chrono::Duration::days(days);
    }
    if let Some(add_months) = matches.get_one::<String>("add-months") {
        let months: i32 = add_months.parse()?;
        if let Some(d) = result.with_month(((result.month() as i32 - 1 + months) % 12 + 1) as u32) {
            let year_add = (result.month() as i32 - 1 + months) / 12;
            if let Some(d) = d.with_year(result.year() + year_add) {
                result = d;
            }
        }
    }
    if let Some(add_years) = matches.get_one::<String>("add-years") {
        let years: i32 = add_years.parse()?;
        if let Some(d) = result.with_year(result.year() + years) {
            result = d;
        }
    }

    if json {
        let output = serde_json::json!({
            "date": result.format("%Y-%m-%d").to_string(),
            "iso": result.format("%Y-%m-%dT00:00:00").to_string(),
            "weekday": result.format("%A").to_string(),
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("{}", result.format("%Y-%m-%d"));
    }

    Ok(())
}
