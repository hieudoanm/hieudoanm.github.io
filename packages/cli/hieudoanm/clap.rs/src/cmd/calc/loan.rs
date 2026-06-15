use clap::ArgMatches;

use super::service::calc_payment;

pub fn command() -> clap::Command {
    clap::Command::new("loan")
        .about("Loan amortization calculator")
        .arg(
            clap::Arg::new("principal")
                .long("principal")
                .short('p')
                .help("Loan principal amount")
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
                .help("Loan term in years")
                .required(true),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let principal: f64 = matches.get_one::<String>("principal").unwrap().parse()?;
    let rate: f64 = matches.get_one::<String>("rate").unwrap().parse()?;
    let years: f64 = matches.get_one::<String>("years").unwrap().parse()?;
    let json = matches.get_flag("json");

    let payment = calc_payment(principal, rate, years);
    let n = (years * 12.0) as i32;
    let total_payment = payment * n as f64;
    let total_interest = total_payment - principal;
    let r = rate / 100.0 / 12.0;

    if json {
        let mut schedule = Vec::new();
        let mut balance = principal;
        for i in 1..=n.min(12) {
            let interest = balance * r;
            let principal_paid = payment - interest;
            balance -= principal_paid;
            schedule.push(serde_json::json!({
                "month": i,
                "payment": payment,
                "interest": interest,
                "balance": balance.max(0.0),
            }));
        }
        let output = serde_json::json!({
            "principal": principal,
            "rate": rate,
            "years": years,
            "monthly": payment,
            "total_paid": total_payment,
            "total_interest": total_interest,
            "schedule": schedule,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("=== Loan Amortization ===");
        println!("Principal:     {:15.2}", principal);
        println!("Annual rate:   {:15.2}%", rate);
        println!("Years:         {:15.0}", years);
        println!("Monthly:       {:15.2}", payment);
        println!("Total paid:    {:15.2}", total_payment);
        println!("Total interest:{:15.2}", total_interest);
        println!();
        println!(
            "{:<6} {:>12} {:>12} {:>12}",
            "Month", "Payment", "Interest", "Balance"
        );
        println!("------   ------------   ------------   ------------");
        let mut balance = principal;
        for i in 1..=n.min(12) {
            let interest = balance * r;
            let principal_paid = payment - interest;
            balance -= principal_paid;
            println!(
                "{:<6} {:>12.2} {:>12.2} {:>12.2}",
                i,
                payment,
                interest,
                balance.max(0.0)
            );
        }
        if n > 12 {
            println!("... ({} more months)", n - 12);
        }
    }

    Ok(())
}
