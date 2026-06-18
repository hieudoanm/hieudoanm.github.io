use clap::ArgMatches;

pub fn command() -> clap::Command {
    clap::Command::new("compound")
        .about("Compound interest calculator")
        .arg(
            clap::Arg::new("principal")
                .long("principal")
                .short('p')
                .help("Initial principal amount")
                .required(true),
        )
        .arg(
            clap::Arg::new("rate")
                .long("rate")
                .short('r')
                .help("Annual interest rate (percentage)")
                .required(true),
        )
        .arg(
            clap::Arg::new("years")
                .long("years")
                .short('y')
                .help("Number of years")
                .required(true),
        )
        .arg(
            clap::Arg::new("contribute")
                .long("contribute")
                .short('c')
                .help("Regular contribution per period")
                .default_value("0"),
        )
        .arg(
            clap::Arg::new("compound")
                .long("compound")
                .short('n')
                .help("Compounding frequency (yearly/quarterly/monthly/daily)")
                .default_value("yearly"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

fn compounding_periods(freq: &str) -> f64 {
    match freq {
        "daily" => 365.0,
        "monthly" => 12.0,
        "quarterly" => 4.0,
        _ => 1.0,
    }
}

fn future_value(principal: f64, rate: f64, years: f64, contribute: f64, n: f64) -> (f64, f64) {
    let nt = n * years;
    let r = rate / 100.0;

    let fv_principal = principal * (1.0 + r / n).powf(nt);

    let fv_contributions = if contribute > 0.0 {
        if r == 0.0 {
            contribute * nt
        } else {
            contribute * ((1.0 + r / n).powf(nt) - 1.0) / (r / n)
        }
    } else {
        0.0
    };

    let total_fv = fv_principal + fv_contributions;
    let total_contributions = principal + contribute * nt;
    (total_fv, total_contributions)
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let principal: f64 = matches.get_one::<String>("principal").unwrap().parse()?;
    let rate: f64 = matches.get_one::<String>("rate").unwrap().parse()?;
    let years: f64 = matches.get_one::<String>("years").unwrap().parse()?;
    let contribute: f64 = matches.get_one::<String>("contribute").unwrap().parse()?;
    let compound = matches.get_one::<String>("compound").unwrap();
    let json = matches.get_flag("json");

    let n = compounding_periods(compound);
    let (fv, total_deposits) = future_value(principal, rate, years, contribute, n);
    let total_interest = fv - total_deposits;

    if json {
        let output = serde_json::json!({
            "principal": principal,
            "rate": rate,
            "years": years,
            "compounding": compound,
            "contribution": contribute,
            "future_value": fv,
            "total_deposits": total_deposits,
            "total_interest": total_interest,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("=== Compound Interest Calculator ===");
        println!("Principal:         {:15.2}", principal);
        println!("Annual rate:       {:15.2}%", rate);
        println!("Years:             {:15.0}", years);
        println!("Compounding:       {:15}", compound);
        if contribute > 0.0 {
            println!(
                "Contribution:      {:15.2} per {}",
                contribute,
                compound.trim_end_matches("ly")
            );
        }
        println!();
        println!(
            "{:6} {:>14} {:>14} {:>14}",
            "Year", "Deposits", "Interest", "Balance"
        );
        println!("------   ------------   ------------   ------------");
        let r = rate / 100.0;
        for y in 1..=years as i32 {
            let pt = n * y as f64;
            let b = principal * (1.0 + r / n).powf(pt);
            let dep = principal + contribute * n * y as f64;
            let total = if contribute > 0.0 && r > 0.0 {
                b + contribute * ((1.0 + r / n).powf(pt) - 1.0) / (r / n)
            } else if contribute > 0.0 {
                principal + contribute * n * y as f64
            } else {
                b
            };
            let int = total - dep;
            println!("{:<6} {:>14.2} {:>14.2} {:>14.2}", y, dep, int, total);
        }
        println!();
        println!(
            "{:<6} {:>14.2} {:>14.2} {:>14.2}",
            "Total", total_deposits, total_interest, fv
        );
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_compounding_periods_yearly() {
        assert!((compounding_periods("yearly") - 1.0).abs() < 1e-10);
    }

    #[test]
    fn test_compounding_periods_quarterly() {
        assert!((compounding_periods("quarterly") - 4.0).abs() < 1e-10);
    }

    #[test]
    fn test_compounding_periods_monthly() {
        assert!((compounding_periods("monthly") - 12.0).abs() < 1e-10);
    }

    #[test]
    fn test_compounding_periods_daily() {
        assert!((compounding_periods("daily") - 365.0).abs() < 1e-10);
    }

    #[test]
    fn test_compounding_periods_unknown_defaults_to_yearly() {
        assert!((compounding_periods("weekly") - 1.0).abs() < 1e-10);
    }

    #[test]
    fn test_future_value_no_contributions() {
        let (fv, deposits) = future_value(1000.0, 10.0, 5.0, 0.0, 1.0);
        assert!((deposits - 1000.0).abs() < 0.01);
        assert!((fv - 1610.51).abs() < 0.01);
    }

    #[test]
    fn test_future_value_with_contributions() {
        let (fv, deposits) = future_value(1000.0, 10.0, 5.0, 1200.0, 12.0);
        assert!((deposits - 73000.0).abs() < 0.01);
        assert!(fv > deposits);
    }

    #[test]
    fn test_future_value_zero_rate_with_contributions() {
        let (fv, deposits) = future_value(1000.0, 0.0, 5.0, 0.0, 12.0);
        assert!((deposits - 1000.0).abs() < 0.01);
        assert!((fv - 1000.0).abs() < 0.01);
    }

    #[test]
    fn test_future_value_zero_rate_no_contributions() {
        let (fv, deposits) = future_value(1000.0, 0.0, 5.0, 0.0, 1.0);
        assert!((deposits - 1000.0).abs() < 0.01);
        assert!((fv - 1000.0).abs() < 0.01);
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[tokio::test]
    async fn test_run_basic() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec![
                "compound",
                "--principal",
                "1000",
                "--rate",
                "10",
                "--years",
                "5",
            ])
            .unwrap();
        run(&m).await.unwrap();
    }

    #[tokio::test]
    async fn test_run_json() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec![
                "compound",
                "--principal",
                "1000",
                "--rate",
                "10",
                "--years",
                "5",
                "--json",
            ])
            .unwrap();
        run(&m).await.unwrap();
    }
}
