pub fn calc_payment(principal: f64, annual_rate: f64, years: f64) -> f64 {
    if annual_rate == 0.0 {
        return principal / (years * 12.0);
    }
    let r = annual_rate / 100.0 / 12.0;
    let n = years * 12.0;
    let p = (1.0 + r).powf(n);
    principal * r * p / (p - 1.0)
}

const PERSONAL_DEDUCTION: f64 = 11_000_000.0;
const DEPENDENT_DEDUCTION: f64 = 4_400_000.0;
const INSURANCE_CAP: f64 = 36_000_000.0;

const SOCIAL_INSURANCE_RATE: f64 = 0.08;
const HEALTH_INSURANCE_RATE: f64 = 0.015;
const UNEMPLOYMENT_INSURANCE_RATE: f64 = 0.01;

const TAX_BRACKETS: [(f64, f64); 7] = [
    (5_000_000.0, 0.05),
    (5_000_000.0, 0.10),
    (8_000_000.0, 0.15),
    (14_000_000.0, 0.20),
    (20_000_000.0, 0.25),
    (28_000_000.0, 0.30),
    (f64::MAX, 0.35),
];

pub struct TaxBreakdown {
    pub rate: f64,
    pub taxable: f64,
    pub tax: f64,
}

pub fn calculate_insurance(income: f64) -> (f64, f64, f64) {
    let base = if income > INSURANCE_CAP {
        INSURANCE_CAP
    } else {
        income
    };
    let social = base * SOCIAL_INSURANCE_RATE;
    let health = base * HEALTH_INSURANCE_RATE;
    let unemployment = base * UNEMPLOYMENT_INSURANCE_RATE;
    (social, health, unemployment)
}

pub fn sum_insurance_rate() -> f64 {
    SOCIAL_INSURANCE_RATE + HEALTH_INSURANCE_RATE + UNEMPLOYMENT_INSURANCE_RATE
}

pub fn calculate_tax(taxable: f64) -> (Vec<TaxBreakdown>, f64) {
    let mut out = Vec::new();
    let mut remain = taxable;
    let mut total = 0.0;

    for &(limit, rate) in &TAX_BRACKETS {
        if remain <= 0.0 {
            break;
        }
        let apply = if limit < remain { limit } else { remain };
        let tax = apply * rate;
        out.push(TaxBreakdown {
            rate,
            taxable: apply,
            tax,
        });
        total += tax;
        remain -= apply;
    }

    (out, total)
}

pub fn solve_gross_from_net(target_net: f64, dependents: u32, insurance: bool) -> f64 {
    let mut gross = target_net;
    for _ in 0..20 {
        let base = if insurance {
            if gross > INSURANCE_CAP {
                INSURANCE_CAP
            } else {
                gross
            }
        } else {
            0.0
        };
        let ins = base * sum_insurance_rate();
        let deductions = PERSONAL_DEDUCTION + dependents as f64 * DEPENDENT_DEDUCTION + ins;
        let taxable = if gross > deductions {
            gross - deductions
        } else {
            0.0
        };
        let (_, tax) = calculate_tax(taxable);
        let net = gross - ins - tax;
        gross += target_net - net;
    }
    gross
}

pub fn calculate_tax_full(income: f64, dependents: u32, insurance_enabled: bool) -> TaxResult {
    let base = if insurance_enabled {
        if income > INSURANCE_CAP {
            INSURANCE_CAP
        } else {
            income
        }
    } else {
        0.0
    };
    let (social, health, unemployment) = calculate_insurance(base);
    let total_ins = social + health + unemployment;
    let deductions = PERSONAL_DEDUCTION + dependents as f64 * DEPENDENT_DEDUCTION + total_ins;
    let taxable = if income > deductions {
        income - deductions
    } else {
        0.0
    };
    let (breakdown, tax) = calculate_tax(taxable);
    let net = income - total_ins - tax;

    TaxResult {
        gross: income,
        net,
        tax,
        insurance_social: social,
        insurance_health: health,
        insurance_unemployment: unemployment,
        taxable_income: taxable,
        breakdown,
    }
}

pub struct TaxResult {
    pub gross: f64,
    pub net: f64,
    pub tax: f64,
    pub insurance_social: f64,
    pub insurance_health: f64,
    pub insurance_unemployment: f64,
    pub taxable_income: f64,
    pub breakdown: Vec<TaxBreakdown>,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_calculate_tax_no_taxable_income() {
        let (breakdown, total) = calculate_tax(0.0);
        assert!(breakdown.is_empty());
        assert!((total - 0.0).abs() < 0.001);
    }

    #[test]
    fn test_calculate_tax_low_income() {
        let (breakdown, total) = calculate_tax(5_000_000.0);
        assert!(!breakdown.is_empty());
        assert!((total - 250_000.0).abs() < 0.001);
    }

    #[test]
    fn test_insurance_calculation() {
        let (s, h, u) = calculate_insurance(20_000_000.0);
        assert!((s - 1_600_000.0).abs() < 0.001);
        assert!((h - 300_000.0).abs() < 0.001);
        assert!((u - 200_000.0).abs() < 0.001);
    }

    #[test]
    fn test_insurance_cap() {
        let (s, h, u) = calculate_insurance(50_000_000.0);
        assert!((s - 2_880_000.0).abs() < 0.001);
        assert!((h - 540_000.0).abs() < 0.001);
        assert!((u - 360_000.0).abs() < 0.001);
    }
}
