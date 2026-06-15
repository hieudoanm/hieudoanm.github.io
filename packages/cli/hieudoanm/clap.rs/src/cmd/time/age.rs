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
