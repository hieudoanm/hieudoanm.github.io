use super::service;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'i', long = "income", help = "Gross monthly income (VND)")]
    pub income: String,
    #[arg(
        short = 'd',
        long = "dependents",
        default_value = "0",
        help = "Number of dependents"
    )]
    pub dependents: String,
    #[arg(long = "insurance", action = clap::ArgAction::SetTrue, help = "Include insurance deductions")]
    pub insurance: bool,
    #[arg(long = "gross-up", action = clap::ArgAction::SetTrue, help = "Calculate gross from target net income")]
    pub gross_up: bool,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let json = matches.json;

    if matches.gross_up {
        let target_net: f64 = matches.income.parse()?;
        let dependents: u32 = matches.dependents.parse().unwrap_or(0);
        let insurance = matches.insurance;
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

    let income: f64 = matches.income.parse()?;
    let dependents: u32 = matches.dependents.parse().unwrap_or(0);
    let insurance = matches.insurance;
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[test]
    fn test_command_has_income_arg() {
        let cmd = command();
        let income = cmd.get_arguments().find(|a| a.get_id() == "income");
        assert!(income.is_some());
        assert!(income.unwrap().is_required_set());
    }

    #[test]
    fn test_command_has_dependents_default() {
        let cmd = command();
        let dep = cmd.get_arguments().find(|a| a.get_id() == "dependents");
        assert!(dep.is_some());
        assert_eq!(dep.unwrap().get_default_values().first().unwrap(), "0");
    }

    #[test]
    fn test_run_text_no_insurance() {
        let args = Args {
            income: "15000000".to_string(),
            dependents: "0".to_string(),
            insurance: false,
            gross_up: false,
            json: false,
        };
        let rt = tokio::runtime::Runtime::new().unwrap();
        rt.block_on(async { run(&args).await.unwrap() });
    }

    #[test]
    fn test_run_json_with_insurance() {
        let args = Args {
            income: "25000000".to_string(),
            dependents: "2".to_string(),
            insurance: true,
            gross_up: false,
            json: true,
        };
        let rt = tokio::runtime::Runtime::new().unwrap();
        rt.block_on(async { run(&args).await.unwrap() });
    }

    #[test]
    fn test_run_gross_up_text() {
        let args = Args {
            income: "12000000".to_string(),
            dependents: "0".to_string(),
            insurance: false,
            gross_up: true,
            json: false,
        };
        let rt = tokio::runtime::Runtime::new().unwrap();
        rt.block_on(async { run(&args).await.unwrap() });
    }

    #[test]
    fn test_run_gross_up_json() {
        let args = Args {
            income: "15000000".to_string(),
            dependents: "1".to_string(),
            insurance: true,
            gross_up: true,
            json: true,
        };
        let rt = tokio::runtime::Runtime::new().unwrap();
        rt.block_on(async { run(&args).await.unwrap() });
    }
}
