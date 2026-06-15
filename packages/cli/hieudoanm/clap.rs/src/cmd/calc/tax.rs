use clap::ArgMatches;

use super::service;

pub fn command() -> clap::Command {
    clap::Command::new("tax")
        .about("Calculate Vietnamese personal income tax")
        .arg(
            clap::Arg::new("income")
                .long("income")
                .short('i')
                .help("Gross monthly income (VND)")
                .required(true),
        )
        .arg(
            clap::Arg::new("dependents")
                .long("dependents")
                .short('d')
                .help("Number of dependents")
                .default_value("0"),
        )
        .arg(
            clap::Arg::new("insurance")
                .long("insurance")
                .help("Include insurance deductions")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("gross-up")
                .long("gross-up")
                .help("Calculate gross from target net income")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let json = matches.get_flag("json");

    if matches.get_flag("gross-up") {
        let target_net: f64 = matches.get_one::<String>("income").unwrap().parse()?;
        let dependents: u32 = matches
            .get_one::<String>("dependents")
            .unwrap()
            .parse()
            .unwrap_or(0);
        let insurance = matches.get_flag("insurance");
        let gross = service::solve_gross_from_net(target_net, dependents, insurance);
        let result = service::calculate_tax_full(gross, dependents, insurance);

        if json {
            let output = serde_json::json!({
                "target_net": target_net,
                "gross": result.gross,
                "net": result.net,
                "tax": result.tax,
                "insurance_social": result.insurance_social,
                "insurance_health": result.insurance_health,
                "insurance_unemployment": result.insurance_unemployment,
                "taxable_income": result.taxable_income,
            });
            println!("{}", serde_json::to_string_pretty(&output)?);
        } else {
            println!("=== Tax Gross-Up ===");
            println!("Target net:            {:14.0} VND", target_net);
            println!("Required gross:        {:14.0} VND", gross);
            println!(
                "Social insurance:      {:14.0} VND",
                result.insurance_social
            );
            println!(
                "Health insurance:      {:14.0} VND",
                result.insurance_health
            );
            println!(
                "Unemployment insurance:{:14.0} VND",
                result.insurance_unemployment
            );
            println!("Taxable income:        {:14.0} VND", result.taxable_income);
            println!("Income tax:            {:14.0} VND", result.tax);
            println!("Net income:            {:14.0} VND", result.net);
        }
        return Ok(());
    }

    let income: f64 = matches.get_one::<String>("income").unwrap().parse()?;
    let dependents: u32 = matches
        .get_one::<String>("dependents")
        .unwrap()
        .parse()
        .unwrap_or(0);
    let insurance = matches.get_flag("insurance");
    let result = service::calculate_tax_full(income, dependents, insurance);

    if json {
        let output = serde_json::json!({
            "gross": result.gross,
            "net": result.net,
            "tax": result.tax,
            "insurance_social": result.insurance_social,
            "insurance_health": result.insurance_health,
            "insurance_unemployment": result.insurance_unemployment,
            "taxable_income": result.taxable_income,
            "breakdown": result.breakdown.iter().map(|b| serde_json::json!({
                "rate": b.rate,
                "taxable": b.taxable,
                "tax": b.tax,
            })).collect::<Vec<_>>(),
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("=== Tax Calculator ===");
        println!("Gross income:          {:14.0} VND", income);
        println!("Dependents:            {:14}", dependents);
        if insurance {
            println!(
                "Social insurance:      {:14.0} VND",
                result.insurance_social
            );
            println!(
                "Health insurance:      {:14.0} VND",
                result.insurance_health
            );
            println!(
                "Unemployment insurance:{:14.0} VND",
                result.insurance_unemployment
            );
        }
        println!("Taxable income:        {:14.0} VND", result.taxable_income);
        println!("{}", "-".repeat(42));
        for b in &result.breakdown {
            println!(
                "  {:>5.0}%  {:>14.0}  {:>14.0} VND",
                b.rate * 100.0,
                b.taxable,
                b.tax
            );
        }
        println!("{}", "-".repeat(42));
        println!("Total tax:             {:14.0} VND", result.tax);
        println!("Net income:            {:14.0} VND", result.net);
    }

    Ok(())
}
