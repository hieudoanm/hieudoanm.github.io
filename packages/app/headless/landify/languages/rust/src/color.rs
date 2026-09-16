//! Color math: turns a `Theme` into every `:root` custom property.
//!
//! Only the authored colors appear as inputs; the rest are derived (tints,
//! shades, WCAG-contrast text and borders). Output is plain hex
//! (`#rrggbb`), never `color-mix()`, matching the Go implementation.

use crate::config::Theme;
use anyhow::{anyhow, Result};

/// Expands a `Theme` into every `:root` custom property as sorted
/// "key → value" pairs (`base-100` through `radius`, 19 tokens).
pub fn tokens(theme: &Theme) -> Result<Vec<(String, String)>> {
    let (base_r, base_g, base_b) = parse_hex(&theme.base)?;
    let (primary_r, primary_g, primary_b) = parse_hex(&theme.primary)?;
    let (secondary_r, secondary_g, secondary_b) = parse_hex(&theme.secondary)?;
    let (neutral_r, neutral_g, neutral_b) = parse_hex(&theme.neutral)?;
    for c in [&theme.info, &theme.warning, &theme.success, &theme.error] {
        parse_hex(c)?;
    }

    let tint = |c: i64, base: i64, strength: f64| {
        (c as f64 + (base as f64 - c as f64) * strength).round() as i64
    };
    let shade = |c: i64, strength: f64| (c as f64 * (1.0 - strength)).round() as i64;

    let base_lum = luminance(base_r, base_g, base_b);
    let (mut base200, mut base300) = (
        hex(
            tint(base_r, 255, 0.85),
            tint(base_g, 255, 0.85),
            tint(base_b, 255, 0.85),
        ),
        hex(
            shade(base_r, 0.03),
            shade(base_g, 0.03),
            shade(base_b, 0.03),
        ),
    );
    if base_lum < 0.35 {
        base200 = hex(
            tint(base_r, 255, 0.10),
            tint(base_g, 255, 0.10),
            tint(base_b, 255, 0.10),
        );
        base300 = hex(
            shade(base_r, 0.08),
            shade(base_g, 0.08),
            shade(base_b, 0.08),
        );
    }

    let mut out = vec![
        ("base-100".into(), theme.base.clone()),
        ("base-200".into(), base200),
        ("base-300".into(), base300),
        (
            "base-content".into(),
            contrasting_text(base_r, base_g, base_b),
        ),
        ("primary".into(), theme.primary.clone()),
        (
            "primary-dark".into(),
            hex(
                shade(primary_r, 0.15),
                shade(primary_g, 0.15),
                shade(primary_b, 0.15),
            ),
        ),
        (
            "primary-soft".into(),
            hex(
                tint(primary_r, base_r, 0.88),
                tint(primary_g, base_g, 0.88),
                tint(primary_b, base_b, 0.88),
            ),
        ),
        (
            "primary-content".into(),
            contrasting_text(primary_r, primary_g, primary_b),
        ),
        ("secondary".into(), theme.secondary.clone()),
        (
            "secondary-content".into(),
            contrasting_text(secondary_r, secondary_g, secondary_b),
        ),
        ("neutral".into(), theme.neutral.clone()),
        (
            "neutral-faint".into(),
            hex(
                tint(neutral_r, base_r, 0.45),
                tint(neutral_g, base_g, 0.45),
                tint(neutral_b, base_b, 0.45),
            ),
        ),
        ("border".into(), theme.neutral.clone()),
        (
            "border-soft".into(),
            hex(
                tint(neutral_r, base_r, 0.60),
                tint(neutral_g, base_g, 0.60),
                tint(neutral_b, base_b, 0.60),
            ),
        ),
        ("info".into(), theme.info.clone()),
        ("warning".into(), theme.warning.clone()),
        ("success".into(), theme.success.clone()),
        ("error".into(), theme.error.clone()),
        ("radius".into(), theme.radius.clone()),
    ];
    out.sort();
    Ok(out)
}

/// Renders the `:root` declarations as 8-space-indented `--name: value;`
/// lines in sorted token order, spliced into the `@LANDIFY_THEME@` slot.
pub fn theme_css(tokens: &[(String, String)]) -> String {
    let mut b = String::new();
    for (k, v) in tokens {
        b.push_str(&format!("        --{k}: {v};\n"));
    }
    b
}

/// Parses a `#rrggbb` color (the `#` is optional) into RGB channels.
pub(crate) fn parse_hex(s: &str) -> Result<(i64, i64, i64)> {
    let s = s.trim().trim_start_matches('#');
    if s.len() != 6 {
        return Err(anyhow!(r#"parse "{s}": want #rrggbb"#));
    }
    let n = u32::from_str_radix(s, 16).map_err(|e| anyhow!(r#"parse "{s}": {e}"#))?;
    Ok((
        i64::from(n >> 16),
        i64::from((n >> 8) & 0xff),
        i64::from(n & 0xff),
    ))
}

/// Formats RGB channels as a `#rrggbb` string.
fn hex(r: i64, g: i64, b: i64) -> String {
    format!("#{r:02x}{g:02x}{b:02x}")
}

/// Picks the readable foreground for a background: near-black on light
/// backgrounds, white on dark ones, using WCAG relative luminance.
fn contrasting_text(r: i64, g: i64, b: i64) -> String {
    if luminance(r, g, b) >= 0.5 {
        return "#181d25".into();
    }
    "#ffffff".into()
}

/// WCAG relative luminance of an sRGB color (0.0 dark .. 1.0 bright).
fn luminance(r: i64, g: i64, b: i64) -> f64 {
    let linear = |c: i64| {
        let v = c as f64 / 255.0;
        if v <= 0.04045 {
            v / 12.92
        } else {
            ((v + 0.055) / 1.055).powf(2.4)
        }
    };
    0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_theme_expands_to_nineteen_tokens() {
        let tokens = tokens(&Theme::defaults()).unwrap();
        assert_eq!(tokens.len(), 19);
        assert_eq!(tokens[0].0, "base-100");
        assert_eq!(tokens[18].0, "warning");
    }

    #[test]
    fn tokens_are_sorted() {
        let tokens = tokens(&Theme::defaults()).unwrap();
        let names: Vec<&str> = tokens.iter().map(|(k, _)| k.as_str()).collect();
        let mut sorted = names.clone();
        sorted.sort_unstable();
        assert_eq!(names, sorted);
    }

    #[test]
    fn primary_content_is_dark_on_light_primary() {
        let tokens = tokens(&Theme::defaults()).unwrap();
        let v = tokens.iter().find(|(k, _)| k == "primary-content").unwrap();
        assert_eq!(v.1, "#ffffff");
    }

    #[test]
    fn dark_theme_inverts_base_surfaces() {
        let mut dark = Theme::defaults();
        dark.base = "#0f172a".into();
        let tokens = tokens(&dark).unwrap();
        let v = tokens.iter().find(|(k, _)| k == "base-content").unwrap();
        assert_eq!(v.1, "#ffffff");
    }

    #[test]
    fn invalid_hex_color_rejected() {
        let mut t = Theme::defaults();
        t.primary = "not-a-color".into();
        assert!(tokens(&t).is_err());
    }

    #[test]
    fn three_digit_hex_rejected() {
        let mut t = Theme::defaults();
        t.error = "#fff".into();
        assert!(tokens(&t).is_err());
    }

    #[test]
    fn theme_css_indents_and_sorts() {
        let theme_css = theme_css(&tokens(&Theme::defaults()).unwrap());
        assert!(theme_css.starts_with("        --base-100: #f7f8fa;\n"));
        assert!(theme_css.ends_with("        --warning: #d97706;\n"));
    }
}
