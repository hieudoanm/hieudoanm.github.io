use std::io::Write;

use super::service::calc_payment;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'p', long = "principal", help = "Loan principal")]
    pub principal: String,
    #[arg(short = 'r', long = "rate", help = "Annual interest rate (percentage)")]
    pub rate: String,
    #[arg(short = 'y', long = "years", default_value = "30", help = "Loan term in years")]
    pub years: String,
    #[arg(long = "taxes", default_value = "0", help = "Annual property taxes")]
    pub taxes: String,
    #[arg(long = "insurance", default_value = "0", help = "Annual insurance")]
    pub insurance: String,
    #[arg(long = "pmi", default_value = "0", help = "Annual PMI")]
    pub pmi: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    run_write(matches, &mut std::io::stdout()).await
}

pub async fn run_write(matches: &Args, write: &mut impl Write) -> anyhow::Result<()> {
    let principal: f64 = matches.principal.parse()?;
    let rate: f64 = matches.rate.parse()?;
    let years: f64 = matches.years.parse()?;
    let taxes: f64 = matches.taxes.parse()?;
    let insurance: f64 = matches.insurance.parse()?;
    let pmi: f64 = matches.pmi.parse()?;
    let json = matches.json;

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
        writeln!(write, "{}", serde_json::to_string_pretty(&output)?)?;
    } else {
        writeln!(write, "=== Mortgage Calculator ===")?;
        writeln!(write, "Principal:           {:14.2}", principal)?;
        writeln!(write, "Annual rate:         {:14.2}%", rate)?;
        writeln!(write, "Years:               {:14.0}", years)?;
        writeln!(write)?;
        writeln!(write, "Principal & Interest: {:12.2}", payment)?;
        if taxes > 0.0 {
            writeln!(write, "Property taxes:      {:12.2}/mo", monthly_taxes)?;
        }
        if insurance > 0.0 {
            writeln!(write, "Insurance:           {:12.2}/mo", monthly_insurance)?;
        }
        if pmi > 0.0 {
            writeln!(write, "PMI:                 {:12.2}/mo", monthly_pmi)?;
        }
        writeln!(write, "{}", "-".repeat(35))?;
        writeln!(write, "Total monthly:       {:12.2}", total_monthly)?;
        writeln!(write)?;
        writeln!(write, "Total paid:          {:14.2}", total_paid)?;
        writeln!(write, "Total interest:      {:14.2}", total_interest)?;
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::super::service::calc_payment;

    #[tokio::test]
    async fn test_run_write_text() {
        use super::*;
        let args = Args {
            principal: "300000".into(),
            rate: "7".into(),
            years: "30".into(),
            taxes: "0".into(),
            insurance: "0".into(),
            pmi: "0".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("Principal & Interest:"));
        assert!(output.contains("1995.91"));
    }

    #[tokio::test]
    async fn test_run_write_json() {
        use super::*;
        let args = Args {
            principal: "300000".into(),
            rate: "7".into(),
            years: "30".into(),
            taxes: "0".into(),
            insurance: "0".into(),
            pmi: "0".into(),
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("monthly_payment"));
        assert!(output.contains("1995"));
    }

    #[tokio::test]
    async fn test_run_write_with_taxes() {
        use super::*;
        let args = Args {
            principal: "200000".into(),
            rate: "6".into(),
            years: "30".into(),
            taxes: "2400".into(),
            insurance: "600".into(),
            pmi: "0".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("200.00"));
        assert!(output.contains("50.00"));
    }

    #[test]
    fn test_mortgage_payment() {
        let payment = calc_payment(300_000.0, 7.0, 30.0);
        assert!((payment - 1995.91).abs() < 0.01);
    }

    #[test]
    fn test_mortgage_total_paid() {
        let principal = 200_000.0;
        let rate = 6.0;
        let years = 30.0;
        let payment = calc_payment(principal, rate, years);
        let n = years * 12.0;
        let total_paid = payment * n;
        let total_interest = total_paid - principal;
        assert!(total_paid > principal);
        assert!(total_interest > 0.0);
    }

    #[test]
    fn test_mortgage_with_taxes() {
        let principal: f64 = 200_000.0;
        let rate: f64 = 6.0;
        let years: f64 = 30.0;
        let taxes: f64 = 2400.0;
        let insurance: f64 = 600.0;
        let pmi: f64 = 0.0;
        let payment: f64 = calc_payment(principal, rate, years);
        let monthly_taxes: f64 = taxes / 12.0;
        let monthly_insurance: f64 = insurance / 12.0;
        let monthly_pmi: f64 = pmi / 12.0;
        let total_monthly: f64 = payment + monthly_taxes + monthly_insurance + monthly_pmi;
        assert!((monthly_taxes - 200.0).abs() < 0.01);
        assert!((monthly_insurance - 50.0).abs() < 0.01);
        assert!(total_monthly > payment);
    }
}
