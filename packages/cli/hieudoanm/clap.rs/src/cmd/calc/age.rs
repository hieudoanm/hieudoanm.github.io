use chrono::{Datelike, Local, NaiveDate};

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

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let year: i32 = matches
        .get_one::<String>("year")
        .unwrap()
        .parse()
        .unwrap_or(0);
    let month: u32 = matches
        .get_one::<String>("month")
        .unwrap()
        .parse()
        .unwrap_or(0);
    let day: u32 = matches
        .get_one::<String>("day")
        .unwrap()
        .parse()
        .unwrap_or(0);

    if year <= 0 || !(1..=12).contains(&month) || !(1..=31).contains(&day) {
        anyhow::bail!("invalid birth date: year/month/day must be valid values");
    }

    let birth = NaiveDate::from_ymd_opt(year, month, day)
        .ok_or_else(|| anyhow::anyhow!("invalid birth date: {year}/{month}/{day} does not exist"))?;

    let now = Local::now().naive_local().date();

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

    println!("{years} years, {months} months, {days} days");
    Ok(())
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
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
