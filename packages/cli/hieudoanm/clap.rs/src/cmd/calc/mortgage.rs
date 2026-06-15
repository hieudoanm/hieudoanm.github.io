use clap::ArgMatches;

use super::service::calc_payment;

pub fn command() -> clap::Command {
    clap::Command::new("mortgage")
        .about("Mortgage payment calculator")
        .arg(
            clap::Arg::new("principal")
                .long("principal")
                .short('p')
                .help("Loan principal")
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
                .default_value("30"),
        )
        .arg(
            clap::Arg::new("taxes")
                .long("taxes")
                .help("Annual property taxes")
                .default_value("0"),
        )
        .arg(
            clap::Arg::new("insurance")
                .long("insurance")
                .help("Annual insurance")
                .default_value("0"),
        )
        .arg(
            clap::Arg::new("pmi")
                .long("pmi")
                .help("Annual PMI")
                .default_value("0"),
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
    let taxes: f64 = matches.get_one::<String>("taxes").unwrap().parse()?;
    let insurance: f64 = matches.get_one::<String>("insurance").unwrap().parse()?;
    let pmi: f64 = matches.get_one::<String>("pmi").unwrap().parse()?;
    let json = matches.get_flag("json");

    let payment = calc_payment(principal, rate, years);
    let n = years * 12.0;

    let monthly_taxes = taxes / 12.0;
    let monthly_insurance = insurance / 12.0;
    let monthly_pmi = pmi / 12.0;
    let total_monthly = payment + monthly_taxes + monthly_insurance + monthly_pmi;
    let total_paid = total_monthly * n;
    let total_interest =
        total_paid - principal - monthly_taxes * n - monthly_insurance * n - monthly_pmi * n;

    if json {
        let output = serde_json::json!({
            "principal": principal,
            "rate": rate,
            "years": years,
            "monthly_payment": payment,
            "monthly_taxes": monthly_taxes,
            "monthly_insurance": monthly_insurance,
            "monthly_pmi": monthly_pmi,
            "total_monthly": total_monthly,
            "total_paid": total_paid,
            "total_interest": total_interest,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("=== Mortgage Calculator ===");
        println!("Principal:           {:14.2}", principal);
        println!("Annual rate:         {:14.2}%", rate);
        println!("Years:               {:14.0}", years);
        println!();
        println!("Principal & Interest: {:12.2}", payment);
        if taxes > 0.0 {
            println!("Property taxes:      {:12.2}/mo", monthly_taxes);
        }
        if insurance > 0.0 {
            println!("Insurance:           {:12.2}/mo", monthly_insurance);
        }
        if pmi > 0.0 {
            println!("PMI:                 {:12.2}/mo", monthly_pmi);
        }
        println!("{}", "-".repeat(35));
        println!("Total monthly:       {:12.2}", total_monthly);
        println!();
        println!("Total paid:          {:14.2}", total_paid);
        println!("Total interest:      {:14.2}", total_interest);
    }

    Ok(())
}
