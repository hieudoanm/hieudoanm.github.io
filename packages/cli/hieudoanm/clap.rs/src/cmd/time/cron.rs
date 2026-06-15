use std::collections::HashMap;

use chrono::Datelike;
use chrono::Timelike;

use lazy_static::lazy_static;

const MONTH_NAMES: &[&str] = &[
    "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec",
];

const WEEK_NAMES: &[&str] = &["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

lazy_static! {
    static ref MONTH_MAP: HashMap<&'static str, u32> = {
        MONTH_NAMES.iter().enumerate().map(|(i, n)| (*n, (i + 1) as u32)).collect()
    };
    static ref WEEK_MAP: HashMap<&'static str, u32> = {
        WEEK_NAMES.iter().enumerate().map(|(i, n)| (*n, i as u32)).collect()
    };
}

pub fn command() -> clap::Command {
    clap::Command::new("cron")
        .about("Parse and describe cron expressions")
        .arg(
            clap::Arg::new("expression")
                .short('e')
                .long("expression")
                .required(true)
                .help("Cron expression (5 fields)"),
        )
        .arg(
            clap::Arg::new("next")
                .short('n')
                .long("next")
                .help("Show next N run times")
                .value_parser(clap::value_parser!(usize)),
        )
        .arg(
            clap::Arg::new("until")
                .long("until")
                .help("Show runs until this date (YYYY-MM-DD)"),
        )
}

fn resolve_val(val: &str, names: &HashMap<&str, u32>) -> String {
    if let Some(&n) = names.get(val.to_lowercase().as_str()) {
        n.to_string()
    } else {
        val.to_string()
    }
}

fn expand_field(field: &str, _min: u32, _max: u32, names: &HashMap<&str, u32>) -> String {
    if field == "*" {
        return "every".into();
    }
    if let Some(n) = field.strip_prefix("*/") {
        if let Ok(n) = n.parse::<u32>() {
            return format!("every {n}");
        }
        return field.into();
    }
    if field.contains('-') {
        let parts: Vec<&str> = field.splitn(2, '-').collect();
        let from = resolve_val(parts[0], names);
        let to = resolve_val(parts[1], names);
        return format!("{from}-{to}");
    }
    if field.contains(',') {
        return field.into();
    }
    resolve_val(field, names)
}

fn describe(expr: &str) -> String {
    let fields: Vec<&str> = expr.split_whitespace().collect();
    if fields.len() != 5 {
        return "invalid cron expression (need 5 fields)".into();
    }

    let minute = expand_field(fields[0], 0, 59, &HashMap::new());
    let hour = expand_field(fields[1], 0, 23, &HashMap::new());
    let dom = expand_field(fields[2], 1, 31, &HashMap::new());
    let month = expand_field(fields[3], 1, 12, &MONTH_MAP);
    let dow = expand_field(fields[4], 0, 6, &WEEK_MAP);

    let mut parts: Vec<String> = Vec::new();

    if minute == "every" && hour == "every" {
        parts.push("every minute".into());
    } else if hour == "every" {
        parts.push(format!("minute {minute} of every hour"));
    } else if minute == "every" {
        parts.push(format!("every minute of hour {hour}"));
    } else {
        parts.push(format!("at {hour}:{minute}"));
    }

    if month != "*" && month != "every" {
        parts.push(format!("in {month}"));
    }
    if dom != "*" && dom != "every" {
        parts.push(format!("on day {dom}"));
    }
    if dow != "*" && dow != "every" {
        parts.push(format!("on {dow}"));
    }

    parts.join(" ")
}

fn match_field(spec: &str, val: u32, _min: u32, _max: u32) -> bool {
    if spec == "*" {
        return true;
    }
    if let Some(step) = spec.strip_prefix("*/") {
        if let Ok(step) = step.parse::<u32>() {
            return step > 0 && val % step == 0;
        }
        return false;
    }
    if spec.contains(',') {
        return spec.split(',').any(|p| p.trim().parse::<u32>().ok() == Some(val));
    }
    if spec.contains('-') {
        let parts: Vec<&str> = spec.splitn(2, '-').collect();
        let lo: u32 = parts[0].parse().unwrap_or(0);
        let hi: u32 = parts[1].parse().unwrap_or(59);
        return val >= lo && val <= hi;
    }
    spec.parse::<u32>().ok() == Some(val)
}

fn next_runs(expr: &str, count: usize, until: chrono::NaiveDate) -> Vec<chrono::NaiveDateTime> {
    let fields: Vec<&str> = expr.split_whitespace().collect();
    if fields.len() != 5 {
        return vec![];
    }

    let min_spec = fields[0];
    let hour_spec = fields[1];
    let dom_spec = fields[2];
    let month_spec = fields[3];
    let dow_spec = fields[4];

    let mut runs = Vec::new();
    let mut current = chrono::Utc::now().naive_utc()
        .date()
        .and_hms_opt(0, 0, 0)
        .unwrap();
    let until_dt = until.and_hms_opt(23, 59, 0).unwrap();
    let max_iterations = 525_600;

    for _ in 0..max_iterations {
        if runs.len() >= count || current > until_dt {
            break;
        }

        if match_field(min_spec, current.minute(), 0, 59)
            && match_field(hour_spec, current.hour(), 0, 23)
            && match_field(dom_spec, current.day(), 1, 31)
            && match_field(month_spec, current.month(), 1, 12)
            && match_field(dow_spec, current.weekday().num_days_from_sunday(), 0, 6)
        {
            runs.push(current);
        }

        current = current + chrono::TimeDelta::minutes(1);
    }

    runs
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let expr = matches.get_one::<String>("expression").unwrap();
    let next = matches.get_one::<usize>("next").copied().unwrap_or(0);
    let until = matches
        .get_one::<String>("until")
        .and_then(|s| {
            chrono::NaiveDate::parse_from_str(s, "%Y-%m-%d").ok()
        })
        .unwrap_or_else(|| {
            chrono::NaiveDate::from_ymd_opt(2100, 1, 1).unwrap()
        });

    let runs = if next > 0 {
        next_runs(expr, next, until)
    } else {
        vec![]
    };

    println!("Expression: {expr}");
    println!("Description: {}", describe(expr));

    if !runs.is_empty() {
        println!();
        println!("Next {} runs:", runs.len());
        for (i, t) in runs.iter().enumerate() {
            println!("  {:2}. {}", i + 1, t.format("%Y-%m-%d %H:%M %a"));
        }
    }

    Ok(())
}
