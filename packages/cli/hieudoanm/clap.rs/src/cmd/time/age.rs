use chrono::{Datelike, NaiveDate, NaiveDateTime};

fn days_in_month(year: i32, month: u32) -> u32 {
    match month {
        1 | 3 | 5 | 7 | 8 | 10 | 12 => 31,
        4 | 6 | 9 | 11 => 30,
        2 => {
            if (year % 4 == 0 && year % 100 != 0) || year % 400 == 0 {
                29
            } else {
                28
            }
        }
        _ => 0,
    }
}

pub fn command() -> clap::Command {
    clap::Command::new("age")
        .about("Calculate age from a birthdate")
        .arg(
            clap::Arg::new("date")
                .short('d')
                .long("date")
                .required(true)
                .help("Birthdate (YYYY-MM-DD)"),
        )
}

fn parse_date(s: &str) -> Option<NaiveDateTime> {
    if let Ok(d) = NaiveDate::parse_from_str(s, "%Y-%m-%d") {
        return Some(d.and_hms_opt(0, 0, 0).unwrap());
    }
    if let Ok(dt) = NaiveDateTime::parse_from_str(s, "%Y-%m-%d %H:%M:%S") {
        return Some(dt);
    }
    if let Ok(dt) = NaiveDateTime::parse_from_str(s, "%Y-%m-%dT%H:%M:%S") {
        return Some(dt);
    }
    None
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_days_in_month_january() {
        assert_eq!(days_in_month(2024, 1), 31);
    }

    #[test]
    fn test_days_in_month_february_leap() {
        assert_eq!(days_in_month(2024, 2), 29);
    }

    #[test]
    fn test_days_in_month_february_non_leap() {
        assert_eq!(days_in_month(2023, 2), 28);
    }

    #[test]
    fn test_days_in_month_february_century() {
        assert_eq!(days_in_month(1900, 2), 28);
    }

    #[test]
    fn test_days_in_month_february_century_leap() {
        assert_eq!(days_in_month(2000, 2), 29);
    }

    #[test]
    fn test_days_in_month_april() {
        assert_eq!(days_in_month(2024, 4), 30);
    }

    #[test]
    fn test_days_in_month_invalid() {
        assert_eq!(days_in_month(2024, 13), 0);
    }

    #[test]
    fn test_parse_date_ymd() {
        let dt = parse_date("2024-01-15").unwrap();
        assert_eq!(dt.format("%Y-%m-%d").to_string(), "2024-01-15");
    }

    #[test]
    fn test_parse_date_with_time() {
        let dt = parse_date("2024-01-15 10:30:00").unwrap();
        assert_eq!(
            dt.format("%Y-%m-%d %H:%M:%S").to_string(),
            "2024-01-15 10:30:00"
        );
    }

    #[test]
    fn test_parse_date_rfc3339() {
        let dt = parse_date("2024-01-15T10:30:00").unwrap();
        assert_eq!(
            dt.format("%Y-%m-%d %H:%M:%S").to_string(),
            "2024-01-15 10:30:00"
        );
    }

    #[test]
    fn test_parse_date_invalid() {
        assert!(parse_date("not-a-date").is_none());
        assert!(parse_date("").is_none());
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[tokio::test]
    async fn test_run_valid_date() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["age", "--date", "1990-01-01"])
            .unwrap();
        run(&m).await.unwrap();
    }

    #[tokio::test]
    async fn test_run_future_date() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["age", "--date", "2099-01-01"])
            .unwrap();
        let result = run(&m).await;
        assert!(result.is_err());
    }
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let date_str = matches.get_one::<String>("date").unwrap();
    let birth =
        parse_date(date_str).ok_or_else(|| anyhow::anyhow!("unable to parse date: {date_str}"))?;

    let now = chrono::Local::now().naive_local();

    if birth > now {
        anyhow::bail!("birthdate cannot be in the future");
    }

    let mut years = now.year() - birth.year();
    let mut months = now.month() as i32 - birth.month() as i32;
    let mut days = now.day() as i32 - birth.day() as i32;

    if days < 0 {
        months -= 1;
        let prev_month = if now.month() == 1 {
            (now.year() - 1, 12u32)
        } else {
            (now.year(), now.month() - 1)
        };
        days += days_in_month(prev_month.0, prev_month.1) as i32;
    }
    if months < 0 {
        years -= 1;
        months += 12;
    }

    println!("{years} years, {months} months, {days} days");
    Ok(())
}
