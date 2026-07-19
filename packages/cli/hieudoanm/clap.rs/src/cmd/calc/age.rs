use chrono::{Datelike, Local, NaiveDate};

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'y', long = "year", help = "Birth year")]
    pub year: String,
    #[arg(short = 'm', long = "month", help = "Birth month (1-12)")]
    pub month: String,
    #[arg(short = 'd', long = "day", help = "Birth day (1-31)")]
    pub day: String,
}

pub fn command() -> clap::Command {
    clap::Command::new("age")
        .about("Calculate age from birthdate")
        .arg(
            clap::Arg::new("year")
                .long("year")
                .short('y')
                .help("Birth year")
                .required(true),
        )
        .arg(
            clap::Arg::new("month")
                .long("month")
                .short('m')
                .help("Birth month (1-12)")
                .required(true),
        )
        .arg(
            clap::Arg::new("day")
                .long("day")
                .short('d')
                .help("Birth day (1-31)")
                .required(true),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let year: i32 = matches.year.parse().unwrap_or(0);
    let month: u32 = matches.month.parse().unwrap_or(0);
    let day: u32 = matches.day.parse().unwrap_or(0);

    if year <= 0 || !(1..=12).contains(&month) || !(1..=31).contains(&day) {
        anyhow::bail!("invalid birth date: year/month/day must be valid values");
    }

    let birth = NaiveDate::from_ymd_opt(year, month, day).ok_or_else(|| {
        anyhow::anyhow!("invalid birth date: {year}/{month}/{day} does not exist")
    })?;

    let now = Local::now().naive_local().date();

    show(birth, now)?;
    Ok(())
}

pub fn show(birth: NaiveDate, now: NaiveDate) -> anyhow::Result<String> {
    if birth > now {
        anyhow::bail!("birth date cannot be in the future");
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

    let result = format!("{years} years, {months} months, {days} days");
    println!("{result}");
    Ok(result)
}

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_days_in_month_31() {
        assert_eq!(days_in_month(2024, 1), 31);
        assert_eq!(days_in_month(2024, 3), 31);
        assert_eq!(days_in_month(2024, 5), 31);
        assert_eq!(days_in_month(2024, 7), 31);
        assert_eq!(days_in_month(2024, 8), 31);
        assert_eq!(days_in_month(2024, 10), 31);
        assert_eq!(days_in_month(2024, 12), 31);
    }

    #[test]
    fn test_days_in_month_30() {
        assert_eq!(days_in_month(2024, 4), 30);
        assert_eq!(days_in_month(2024, 6), 30);
        assert_eq!(days_in_month(2024, 9), 30);
        assert_eq!(days_in_month(2024, 11), 30);
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
    fn test_days_in_month_century_leap() {
        assert_eq!(days_in_month(2000, 2), 29);
    }

    #[test]
    fn test_days_in_month_century_non_leap() {
        assert_eq!(days_in_month(1900, 2), 28);
    }

    #[test]
    fn test_days_in_month_invalid() {
        assert_eq!(days_in_month(2024, 0), 0);
        assert_eq!(days_in_month(2024, 13), 0);
    }

    #[test]
    fn test_show_exact_birthday_today() {
        let now = NaiveDate::from_ymd_opt(2025, 6, 15).unwrap();
        let result = show(now, now).unwrap();
        assert_eq!(result, "0 years, 0 months, 0 days");
    }

    #[test]
    fn test_show_full_years() {
        let birth = NaiveDate::from_ymd_opt(2000, 6, 15).unwrap();
        let now = NaiveDate::from_ymd_opt(2025, 6, 15).unwrap();
        let result = show(birth, now).unwrap();
        assert_eq!(result, "25 years, 0 months, 0 days");
    }

    #[test]
    fn test_show_with_months() {
        let birth = NaiveDate::from_ymd_opt(2000, 3, 10).unwrap();
        let now = NaiveDate::from_ymd_opt(2025, 6, 15).unwrap();
        let result = show(birth, now).unwrap();
        assert_eq!(result, "25 years, 3 months, 5 days");
    }

    #[test]
    fn test_show_day_borrow_from_prev_month() {
        let birth = NaiveDate::from_ymd_opt(2000, 5, 20).unwrap();
        let now = NaiveDate::from_ymd_opt(2025, 6, 10).unwrap();
        let result = show(birth, now).unwrap();
        assert_eq!(result, "25 years, 0 months, 21 days");
    }

    #[test]
    fn test_show_month_borrow_from_prev_year() {
        let birth = NaiveDate::from_ymd_opt(2000, 10, 15).unwrap();
        let now = NaiveDate::from_ymd_opt(2025, 3, 10).unwrap();
        let result = show(birth, now).unwrap();
        assert_eq!(result, "24 years, 4 months, 23 days");
    }

    #[test]
    fn test_show_both_borrows() {
        let birth = NaiveDate::from_ymd_opt(2000, 3, 31).unwrap();
        let now = NaiveDate::from_ymd_opt(2025, 2, 28).unwrap();
        let result = show(birth, now).unwrap();
        assert_eq!(result, "24 years, 10 months, 28 days");
    }

    #[test]
    fn test_show_january_prev_month_december() {
        let birth = NaiveDate::from_ymd_opt(2000, 12, 15).unwrap();
        let now = NaiveDate::from_ymd_opt(2025, 1, 10).unwrap();
        let result = show(birth, now).unwrap();
        assert_eq!(result, "24 years, 0 months, 26 days");
    }

    #[test]
    fn test_show_leap_year_birthday_to_feb28() {
        let birth = NaiveDate::from_ymd_opt(2000, 2, 29).unwrap();
        let now = NaiveDate::from_ymd_opt(2025, 2, 28).unwrap();
        let result = show(birth, now).unwrap();
        assert_eq!(result, "24 years, 11 months, 30 days");
    }

    #[test]
    fn test_show_leap_year_birthday_to_march1() {
        let birth = NaiveDate::from_ymd_opt(2000, 2, 29).unwrap();
        let now = NaiveDate::from_ymd_opt(2025, 3, 1).unwrap();
        let result = show(birth, now).unwrap();
        assert_eq!(result, "25 years, 0 months, 0 days");
    }

    #[test]
    fn test_show_leap_year_birthday_on_leap_day() {
        let birth = NaiveDate::from_ymd_opt(2000, 2, 29).unwrap();
        let now = NaiveDate::from_ymd_opt(2024, 2, 29).unwrap();
        let result = show(birth, now).unwrap();
        assert_eq!(result, "24 years, 0 months, 0 days");
    }

    #[test]
    fn test_show_newborn() {
        let now = NaiveDate::from_ymd_opt(2025, 6, 15).unwrap();
        let result = show(now, now).unwrap();
        assert_eq!(result, "0 years, 0 months, 0 days");
    }

    #[test]
    fn test_show_future_birthdate_errors() {
        let birth = NaiveDate::from_ymd_opt(2030, 1, 1).unwrap();
        let now = NaiveDate::from_ymd_opt(2025, 6, 15).unwrap();
        let err = show(birth, now).unwrap_err();
        assert!(err.to_string().contains("future"));
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert_eq!(cmd.get_name(), "age");
    }
}
