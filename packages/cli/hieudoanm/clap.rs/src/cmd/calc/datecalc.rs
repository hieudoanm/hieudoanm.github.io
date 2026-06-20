use chrono::{Datelike, NaiveDate};

#[derive(clap::Args)]
pub struct Args {
    #[arg(
        short = 'd',
        long = "date",
        help = "Reference date (YYYY-MM-DD, default: today)"
    )]
    pub date: Option<String>,
    #[arg(long = "add", help = "Add N days")]
    pub add: Option<String>,
    #[arg(long = "add-months", help = "Add N months")]
    pub add_months: Option<String>,
    #[arg(long = "add-years", help = "Add N years")]
    pub add_years: Option<String>,
    #[arg(long = "diff", help = "Calculate days between two dates (YYYY-MM-DD)")]
    pub diff: Option<String>,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let json = matches.json;

    let today = chrono::Local::now().naive_local().date();

    if let Some(diff_str) = matches.diff.as_ref() {
        let date2 = NaiveDate::parse_from_str(diff_str, "%Y-%m-%d")
            .map_err(|_| anyhow::anyhow!("invalid date {:?} (use YYYY-MM-DD)", diff_str))?;

        if let Some(date_str) = matches.date.as_ref() {
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

    let base = if let Some(date_str) = matches.date.as_ref() {
        NaiveDate::parse_from_str(date_str, "%Y-%m-%d")
            .map_err(|_| anyhow::anyhow!("invalid date {:?} (use YYYY-MM-DD)", date_str))?
    } else {
        today
    };

    let mut result = base;
    if let Some(add_str) = matches.add.as_ref() {
        let days: i64 = add_str.parse()?;
        result += chrono::Duration::days(days);
    }
    if let Some(add_months) = matches.add_months.as_ref() {
        let months: i32 = add_months.parse()?;
        if let Some(d) = result.with_month(((result.month() as i32 - 1 + months) % 12 + 1) as u32) {
            let year_add = (result.month() as i32 - 1 + months) / 12;
            if let Some(d) = d.with_year(result.year() + year_add) {
                result = d;
            }
        }
    }
    if let Some(add_years) = matches.add_years.as_ref() {
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_date_diff() {
        let date1 = NaiveDate::parse_from_str("2024-01-01", "%Y-%m-%d").unwrap();
        let date2 = NaiveDate::parse_from_str("2024-12-31", "%Y-%m-%d").unwrap();
        let days = (date2 - date1).num_days();
        assert_eq!(days, 365);
    }

    #[test]
    fn test_date_diff_same_day() {
        let date1 = NaiveDate::parse_from_str("2024-06-15", "%Y-%m-%d").unwrap();
        let date2 = NaiveDate::parse_from_str("2024-06-15", "%Y-%m-%d").unwrap();
        let days = (date2 - date1).num_days();
        assert_eq!(days, 0);
    }

    #[test]
    fn test_add_days() {
        let base = NaiveDate::parse_from_str("2024-01-01", "%Y-%m-%d").unwrap();
        let result = base + chrono::Duration::days(31);
        assert_eq!(result.format("%Y-%m-%d").to_string(), "2024-02-01");
    }

    #[test]
    fn test_add_months() {
        let base = NaiveDate::parse_from_str("2024-01-15", "%Y-%m-%d").unwrap();
        let months = 3i32;
        let result = base.with_month(1 + months as u32).unwrap();
        assert_eq!(result.format("%Y-%m-%d").to_string(), "2024-04-15");
    }

    #[test]
    fn test_add_years() {
        let base = NaiveDate::parse_from_str("2024-01-01", "%Y-%m-%d").unwrap();
        let years = 5i32;
        let result = base.with_year(base.year() + years).unwrap();
        assert_eq!(result.format("%Y-%m-%d").to_string(), "2029-01-01");
    }

    #[test]
    fn test_weekday_format() {
        let date = NaiveDate::parse_from_str("2024-02-05", "%Y-%m-%d").unwrap();
        assert_eq!(date.format("%A").to_string(), "Monday");
    }

    #[test]
    fn test_parse_invalid_date() {
        let result = NaiveDate::parse_from_str("not-a-date", "%Y-%m-%d");
        assert!(result.is_err());
    }
}
