pub fn command() -> clap::Command {
    clap::Command::new("tax")
        .about("Vietnamese personal income tax calculator")
        .arg(
            clap::Arg::new("income")
                .long("income")
                .short('i')
                .help("Monthly income (VND)")
                .value_parser(clap::value_parser!(f64)),
        )
        .arg(
            clap::Arg::new("dependents")
                .long("dependents")
                .short('d')
                .default_value("0")
                .help("Number of dependents"),
        )
        .arg(
            clap::Arg::new("no-insurance")
                .long("no-insurance")
                .action(clap::ArgAction::SetTrue)
                .help("Disable insurance deduction"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    use crate::services::tax;

    if let Some(income) = matches.get_one::<f64>("income") {
        let dependents: u32 = matches
            .get_one::<String>("dependents")
            .unwrap_or(&"0".into())
            .parse()
            .unwrap_or(0);
        let no_insurance = matches.get_flag("no-insurance");

        let result = tax::calculate_tax_full(*income, dependents, !no_insurance);

        println!();
        println!("Tax Calculation Results");
        println!("=======================");
        println!("Gross Income:   {:>14.0} VND", result.gross);
        println!("Taxable Income: {:>14.0} VND", result.taxable_income);
        println!("Total Tax:      {:>14.0} VND", result.tax);
        println!("Net Income:     {:>14.0} VND", result.net);
        println!();
        println!("Breakdown:");
        for b in &result.breakdown {
            println!(
                "  Rate: {:<5.1}%  Taxable: {:>10.0}  Tax: {:>10.0} VND",
                b.rate * 100.0,
                b.taxable,
                b.tax
            );
        }
    } else {
        println!("Tax calculator");
        println!("Use --income <amount> to calculate tax. Example:");
        println!("  hieudoanm tax --income 20000000 --dependents 1");
    }

    Ok(())
}
