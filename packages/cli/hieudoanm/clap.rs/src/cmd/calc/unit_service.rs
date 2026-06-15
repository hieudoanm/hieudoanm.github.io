struct UnitConv {
    cat: &'static str,
    aliases: &'static [&'static str],
    to_base: fn(f64) -> f64,
    from_base: fn(f64) -> f64,
}

const UNIT_TABLE: &[UnitConv] = &[
    UnitConv {
        cat: "length",
        aliases: &["mm", "millimeter", "millimetre"],
        to_base: |v| v / 1000.0,
        from_base: |v| v * 1000.0,
    },
    UnitConv {
        cat: "length",
        aliases: &["cm", "centimeter", "centimetre"],
        to_base: |v| v / 100.0,
        from_base: |v| v * 100.0,
    },
    UnitConv {
        cat: "length",
        aliases: &["m", "meter", "metre"],
        to_base: |v| v,
        from_base: |v| v,
    },
    UnitConv {
        cat: "length",
        aliases: &["km", "kilometer", "kilometre"],
        to_base: |v| v * 1000.0,
        from_base: |v| v / 1000.0,
    },
    UnitConv {
        cat: "length",
        aliases: &["in", "inch"],
        to_base: |v| v * 0.0254,
        from_base: |v| v / 0.0254,
    },
    UnitConv {
        cat: "length",
        aliases: &["ft", "foot", "feet"],
        to_base: |v| v * 0.3048,
        from_base: |v| v / 0.3048,
    },
    UnitConv {
        cat: "length",
        aliases: &["yd", "yard"],
        to_base: |v| v * 0.9144,
        from_base: |v| v / 0.9144,
    },
    UnitConv {
        cat: "length",
        aliases: &["mi", "mile"],
        to_base: |v| v * 1609.344,
        from_base: |v| v / 1609.344,
    },
    UnitConv {
        cat: "weight",
        aliases: &["mg", "milligram"],
        to_base: |v| v / 1_000_000.0,
        from_base: |v| v * 1_000_000.0,
    },
    UnitConv {
        cat: "weight",
        aliases: &["g", "gram"],
        to_base: |v| v / 1000.0,
        from_base: |v| v * 1000.0,
    },
    UnitConv {
        cat: "weight",
        aliases: &["kg", "kilogram"],
        to_base: |v| v,
        from_base: |v| v,
    },
    UnitConv {
        cat: "weight",
        aliases: &["t", "tonne", "metric-ton"],
        to_base: |v| v * 1000.0,
        from_base: |v| v / 1000.0,
    },
    UnitConv {
        cat: "weight",
        aliases: &["lb", "lbs", "pound"],
        to_base: |v| v * 0.453592,
        from_base: |v| v / 0.453592,
    },
    UnitConv {
        cat: "weight",
        aliases: &["oz", "ounce"],
        to_base: |v| v * 0.0283495,
        from_base: |v| v / 0.0283495,
    },
    UnitConv {
        cat: "temperature",
        aliases: &["c", "celsius"],
        to_base: |v| v,
        from_base: |v| v,
    },
    UnitConv {
        cat: "temperature",
        aliases: &["f", "fahrenheit"],
        to_base: |v| (v - 32.0) * 5.0 / 9.0,
        from_base: |v| v * 9.0 / 5.0 + 32.0,
    },
    UnitConv {
        cat: "temperature",
        aliases: &["k", "kelvin"],
        to_base: |v| v - 273.15,
        from_base: |v| v + 273.15,
    },
    UnitConv {
        cat: "speed",
        aliases: &["m/s", "mps"],
        to_base: |v| v,
        from_base: |v| v,
    },
    UnitConv {
        cat: "speed",
        aliases: &["km/h", "kph"],
        to_base: |v| v / 3.6,
        from_base: |v| v * 3.6,
    },
    UnitConv {
        cat: "speed",
        aliases: &["mph"],
        to_base: |v| v * 0.44704,
        from_base: |v| v / 0.44704,
    },
    UnitConv {
        cat: "speed",
        aliases: &["kn", "knot", "knots"],
        to_base: |v| v * 0.514444,
        from_base: |v| v / 0.514444,
    },
];

fn find_unit(name: &str) -> Option<&'static UnitConv> {
    let lower = name.to_lowercase();
    for u in UNIT_TABLE {
        for a in u.aliases {
            if *a == lower {
                return Some(u);
            }
        }
    }
    None
}

pub struct UnitResult {
    pub value: f64,
    pub from: String,
    pub to: String,
    pub result: f64,
    pub category: &'static str,
}

pub fn convert(value: f64, from: &str, to: &str) -> Result<UnitResult, String> {
    let from_unit = find_unit(from).ok_or_else(|| format!("unknown unit: {}", from))?;
    let to_unit = find_unit(to).ok_or_else(|| format!("unknown unit: {}", to))?;

    if from_unit.cat != to_unit.cat {
        return Err(format!(
            "cannot convert {} ({}) to {} ({})",
            from, from_unit.cat, to, to_unit.cat
        ));
    }

    let base = (from_unit.to_base)(value);
    let result = (to_unit.from_base)(base);

    Ok(UnitResult {
        value,
        from: from.to_string(),
        to: to.to_string(),
        result,
        category: from_unit.cat,
    })
}
