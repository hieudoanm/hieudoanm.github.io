pub fn component_to_hex(code: u8) -> String {
    let hex = format!("{:x}", code);
    if hex.len() == 1 { format!("{}{}", hex, hex) } else { hex }
}

pub fn rgb_to_hex(red: u8, green: u8, blue: u8) -> String {
    format!("#{:02x}{:02x}{:02x}", red, green, blue)
}

pub fn hex_to_rgb(hex: &str) -> Option<(u8, u8, u8)> {
    let h = hex.trim_start_matches('#');
    let h = if h.len() == 3 {
        h.chars().flat_map(|c| std::iter::repeat(c).take(2)).collect::<String>()
    } else {
        h.to_string()
    };
    if h.len() != 6 { return None; }
    let r = u8::from_str_radix(&h[0..2], 16).ok()?;
    let g = u8::from_str_radix(&h[2..4], 16).ok()?;
    let b = u8::from_str_radix(&h[4..6], 16).ok()?;
    Some((r, g, b))
}

pub fn hex_to_hsl(hex: &str) -> (f64, f64, f64) {
    let (r, g, b) = hex_to_rgb(hex).unwrap_or((0, 0, 0));
    rgb_to_hsl(r, g, b)
}

pub fn rgb_to_hsl(r: u8, g: u8, b: u8) -> (f64, f64, f64) {
    let r = r as f64 / 255.0;
    let g = g as f64 / 255.0;
    let b = b as f64 / 255.0;

    let max = r.max(g).max(b);
    let min = r.min(g).min(b);
    let delta = max - min;

    let l = (max + min) / 2.0;

    if delta == 0.0 {
        return (0.0, 0.0, l * 100.0);
    }

    let s = delta / (1.0 - (2.0 * l - 1.0).abs());
    let h = if max == r {
        ((g - b) / delta + if g < b { 6.0 } else { 0.0 }) * 60.0
    } else if max == g {
        ((b - r) / delta + 2.0) * 60.0
    } else {
        ((r - g) / delta + 4.0) * 60.0
    };

    (h.round(), (s * 100.0).round(), (l * 100.0).round())
}

pub fn hex_to_cmyk(hex: &str) -> (f64, f64, f64, f64) {
    let (r, g, b) = hex_to_rgb(hex).unwrap_or((0, 0, 0));
    let r = r as f64 / 255.0;
    let g = g as f64 / 255.0;
    let b = b as f64 / 255.0;

    let c = 1.0 - r;
    let m = 1.0 - g;
    let y = 1.0 - b;
    let k = c.min(m).min(y);
    let denom = 1.0 - k;
    if denom == 0.0 {
        return (0.0, 0.0, 0.0, 100.0);
    }
    (
        ((c - k) / denom * 100.0).round(),
        ((m - k) / denom * 100.0).round(),
        ((y - k) / denom * 100.0).round(),
        (k * 100.0).round(),
    )
}

pub fn cmyk_to_hex(c: f64, m: f64, y: f64, k: f64) -> String {
    let r = (255.0 * (1.0 - c / 100.0) * (1.0 - k / 100.0)).round() as u8;
    let g = (255.0 * (1.0 - m / 100.0) * (1.0 - k / 100.0)).round() as u8;
    let b = (255.0 * (1.0 - y / 100.0) * (1.0 - k / 100.0)).round() as u8;
    rgb_to_hex(r, g, b)
}

pub fn cmyk_to_hsl(c: f64, m: f64, y: f64, k: f64) -> String {
    let r = 255.0 * (1.0 - c / 100.0) * (1.0 - k / 100.0);
    let g = 255.0 * (1.0 - m / 100.0) * (1.0 - k / 100.0);
    let bl = 255.0 * (1.0 - y / 100.0) * (1.0 - k / 100.0);

    let rn = r / 255.0;
    let gn = g / 255.0;
    let bn = bl / 255.0;

    let max = rn.max(gn).max(bn);
    let min = rn.min(gn).min(bn);
    let delta = max - min;
    let l = (max + min) / 2.0;

    if delta == 0.0 {
        return format!("hsl(0, 0%, {}%)", (l * 100.0).round());
    }

    let s = delta / (1.0 - (2.0 * l - 1.0).abs());
    let h = if max == rn {
        ((gn - bn) / delta + if gn < bn { 6.0 } else { 0.0 }) * 60.0
    } else if max == gn {
        ((bn - rn) / delta + 2.0) * 60.0
    } else {
        ((rn - gn) / delta + 4.0) * 60.0
    };

    format!("hsl({}, {}%, {}%)", h.round(), (s * 100.0).round(), (l * 100.0).round())
}

pub fn hsl_to_hex(h: f64, s: f64, l: f64) -> String {
    let l = l / 100.0;
    let a = s * l.min(1.0 - l) / 100.0;
    let f = |n: f64| -> String {
        let k = (n + h / 30.0) % 12.0;
        let color = l - a * (k - 3.0).min(9.0 - k).max(-1.0).min(1.0);
        format!("{:02x}", (255.0 * color).round() as u8)
    };
    format!("#{}{}{}", f(0.0), f(8.0), f(4.0))
}

pub fn hsl_to_rgb(h: f64, s: f64, l: f64) -> (u8, u8, u8) {
    let s = s / 100.0;
    let l = l / 100.0;
    let c = (1.0 - (2.0 * l - 1.0).abs()) * s;
    let x = c * (1.0 - ((h / 60.0) % 2.0 - 1.0).abs());
    let m = l - c / 2.0;

    let (r1, g1, b1) = if h < 60.0 { (c, x, 0.0) }
        else if h < 120.0 { (x, c, 0.0) }
        else if h < 180.0 { (0.0, c, x) }
        else if h < 240.0 { (0.0, x, c) }
        else if h < 300.0 { (x, 0.0, c) }
        else { (c, 0.0, x) };

    (
        ((r1 + m) * 255.0).round() as u8,
        ((g1 + m) * 255.0).round() as u8,
        ((b1 + m) * 255.0).round() as u8,
    )
}

pub fn hsl_to_cmyk(h: f64, s: f64, l: f64) -> (f64, f64, f64, f64) {
    let (r, g, b) = hsl_to_rgb(h, s, l);
    let r = r as f64 / 255.0;
    let g = g as f64 / 255.0;
    let b = b as f64 / 255.0;

    let k = 1.0 - r.max(g).max(b);
    if k == 1.0 { return (0.0, 0.0, 0.0, 100.0); }

    (
        ((1.0 - r - k) / (1.0 - k) * 100.0).round(),
        ((1.0 - g - k) / (1.0 - k) * 100.0).round(),
        ((1.0 - b - k) / (1.0 - k) * 100.0).round(),
        (k * 100.0).round(),
    )
}

pub fn hex_to_oklch(hex: &str) -> (f64, f64, f64) {
    let (r, g, b) = hex_to_rgb(hex).unwrap_or((0, 0, 0));
    let r = r as f64 / 255.0;
    let g = g as f64 / 255.0;
    let b = b as f64 / 255.0;

    let linearize = |c: f64| -> f64 {
        if c <= 0.04045 { c / 12.92 } else { ((c + 0.055) / 1.055).powf(2.4) }
    };

    let r_lin = linearize(r);
    let g_lin = linearize(g);
    let b_lin = linearize(b);

    let l = 0.4122214708 * r_lin + 0.5363325363 * g_lin + 0.0514459929 * b_lin;
    let m = 0.2119034982 * r_lin + 0.6806995451 * g_lin + 0.1073969566 * b_lin;
    let s = 0.0883024619 * r_lin + 0.2817188376 * g_lin + 0.6299787005 * b_lin;

    let l_cbrt = l.cbrt();
    let m_cbrt = m.cbrt();
    let s_cbrt = s.cbrt();

    let l_val = 0.2104542553 * l_cbrt + 0.793617785 * m_cbrt - 0.0040720468 * s_cbrt;
    let a = 1.9779984951 * l_cbrt - 2.428592205 * m_cbrt + 0.4505937099 * s_cbrt;
    let b2 = 0.0259040371 * l_cbrt + 0.7827717662 * m_cbrt - 0.808675766 * s_cbrt;

    let c_val = (a * a + b2 * b2).sqrt();
    let h_deg = b2.atan2(a) * 180.0 / std::f64::consts::PI;
    let h = (h_deg + 360.0) % 360.0;

    ((l_val * 10000.0).round() / 10000.0, (c_val * 10000.0).round() / 10000.0, (h * 100.0).round() / 100.0)
}

pub fn oklch_to_hex(l: f64, c: f64, h: f64) -> String {
    let a = c * (h / 360.0 * 2.0 * std::f64::consts::PI).cos();
    let b_val = c * (h / 360.0 * 2.0 * std::f64::consts::PI).sin();

    let l_cubed = l * l * l;
    let m_cubed = (a + 0.3963377774 * l_cubed - 0.2158037573 * b_val) / 0.5372041979;
    let s_cubed = (b_val + 0.1055613458 * l_cubed + 0.0638541748 * a) / 0.7032193155;

    let r_lin = 3.2404541621 * l_cubed - 1.5371385121 * m_cubed - 0.498531409 * s_cubed;
    let g_lin = -0.9692660301 * l_cubed + 1.8760108454 * m_cubed + 0.0415560175 * s_cubed;
    let bl_lin = 0.0556434137 * l_cubed - 0.2040259133 * m_cubed + 1.0572251882 * s_cubed;

    let linear_to_srgb = |c: f64| -> f64 {
        if c <= 0.0031308 { c * 12.92 } else { 1.055 * c.powf(1.0 / 2.4) - 0.055 }
    };

    let r = (linear_to_srgb(r_lin) * 255.0).round() as u8;
    let g = (linear_to_srgb(g_lin) * 255.0).round() as u8;
    let bl = (linear_to_srgb(bl_lin) * 255.0).round() as u8;

    rgb_to_hex(r, g, bl)
}

pub fn brightness(hex: &str) -> bool {
    let (r, g, b) = hex_to_rgb(hex).unwrap_or((0, 0, 0));
    let luma = 0.299 * r as f64 + 0.587 * g as f64 + 0.114 * b as f64;
    luma < 186.0
}

pub fn random_hex() -> String {
    use rand::Rng;
    let mut rng = rand::thread_rng();
    let n: u32 = rng.gen_range(0..=0xffffff);
    format!("#{:06x}", n)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_component_to_hex() {
        assert_eq!(component_to_hex(0), "00");
        assert_eq!(component_to_hex(15), "ff");
        assert_eq!(component_to_hex(255), "ff");
        assert_eq!(component_to_hex(16), "10");
    }

    #[test]
    fn test_rgb_to_hex() {
        assert_eq!(rgb_to_hex(255, 0, 0), "#ff0000");
        assert_eq!(rgb_to_hex(0, 255, 0), "#00ff00");
        assert_eq!(rgb_to_hex(0, 0, 255), "#0000ff");
        assert_eq!(rgb_to_hex(0, 0, 0), "#000000");
        assert_eq!(rgb_to_hex(255, 255, 255), "#ffffff");
    }

    #[test]
    fn test_hex_to_rgb_roundtrip() {
        let hex = "#ff0000";
        let (r, g, b) = hex_to_rgb(hex).unwrap();
        assert_eq!((r, g, b), (255, 0, 0));
        assert_eq!(rgb_to_hex(r, g, b), hex);

        let hex2 = "#00ff00";
        let (r2, g2, b2) = hex_to_rgb(hex2).unwrap();
        assert_eq!((r2, g2, b2), (0, 255, 0));
    }

    #[test]
    fn test_hex_to_rgb_3digit() {
        let (r, g, b) = hex_to_rgb("#f00").unwrap();
        assert_eq!((r, g, b), (255, 0, 0));
    }

    #[test]
    fn test_hex_to_rgb_invalid() {
        assert!(hex_to_rgb("#xyzxyz").is_none());
        assert!(hex_to_rgb("#ff").is_none());
        assert!(hex_to_rgb("nothex").is_none());
        assert!(hex_to_rgb("").is_none());
    }

    #[test]
    fn test_hex_to_hsl() {
        let (h, s, l) = hex_to_hsl("#ff0000");
        assert_eq!(h, 0.0);
        assert_eq!(s, 100.0);
        assert_eq!(l, 50.0);

        let (h2, s2, l2) = hex_to_hsl("#000000");
        assert_eq!(h2, 0.0);
        assert_eq!(s2, 0.0);
        assert_eq!(l2, 0.0);

        let (h3, s3, l3) = hex_to_hsl("#ffffff");
        assert_eq!(h3, 0.0);
        assert_eq!(s3, 0.0);
        assert_eq!(l3, 100.0);
    }

    #[test]
    fn test_hex_to_hsl_invalid_defaults_black() {
        let (h, s, l) = hex_to_hsl("#invalid");
        assert_eq!((h, s, l), (0.0, 0.0, 0.0));
    }

    #[test]
    fn test_rgb_to_hsl() {
        let (h, s, l) = rgb_to_hsl(255, 0, 0);
        assert_eq!(h, 0.0);
        assert_eq!(s, 100.0);
        assert_eq!(l, 50.0);
    }

    #[test]
    fn test_hex_to_cmyk() {
        let (c, m, y, k) = hex_to_cmyk("#ff0000");
        assert_eq!(c, 0.0);
        assert_eq!(m, 100.0);
        assert_eq!(y, 100.0);
        assert_eq!(k, 0.0);
    }

    #[test]
    fn test_hex_to_cmyk_black() {
        let (c, m, y, k) = hex_to_cmyk("#000000");
        assert_eq!(c, 0.0);
        assert_eq!(m, 0.0);
        assert_eq!(y, 0.0);
        assert_eq!(k, 100.0);
    }

    #[test]
    fn test_cmyk_to_hex() {
        let hex = cmyk_to_hex(0.0, 100.0, 100.0, 0.0);
        assert_eq!(hex, "#ff0000");
    }

    #[test]
    fn test_cmyk_to_hsl() {
        let result = cmyk_to_hsl(0.0, 100.0, 100.0, 0.0);
        assert_eq!(result, "hsl(0, 100%, 50%)");
    }

    #[test]
    fn test_cmyk_to_hsl_black() {
        let result = cmyk_to_hsl(0.0, 0.0, 0.0, 100.0);
        assert_eq!(result, "hsl(0, 0%, 0%)");
    }

    #[test]
    fn test_hsl_to_hex() {
        assert_eq!(hsl_to_hex(0.0, 100.0, 50.0), "#ff0000");
        assert_eq!(hsl_to_hex(120.0, 100.0, 50.0), "#00ff00");
        assert_eq!(hsl_to_hex(240.0, 100.0, 50.0), "#0000ff");
    }

    #[test]
    fn test_hsl_to_rgb() {
        assert_eq!(hsl_to_rgb(0.0, 100.0, 50.0), (255, 0, 0));
        assert_eq!(hsl_to_rgb(120.0, 100.0, 50.0), (0, 255, 0));
        assert_eq!(hsl_to_rgb(240.0, 100.0, 50.0), (0, 0, 255));
        assert_eq!(hsl_to_rgb(0.0, 0.0, 0.0), (0, 0, 0));
        assert_eq!(hsl_to_rgb(0.0, 0.0, 100.0), (255, 255, 255));
    }

    #[test]
    fn test_hsl_to_cmyk() {
        let (c, m, y, k) = hsl_to_cmyk(0.0, 100.0, 50.0);
        assert_eq!(c, 0.0);
        assert_eq!(m, 100.0);
        assert_eq!(y, 100.0);
        assert_eq!(k, 0.0);
    }

    #[test]
    fn test_hsl_to_cmyk_black() {
        let (c, m, y, k) = hsl_to_cmyk(0.0, 0.0, 0.0);
        assert_eq!(c, 0.0);
        assert_eq!(m, 0.0);
        assert_eq!(y, 0.0);
        assert_eq!(k, 100.0);
    }

    #[test]
    fn test_hex_to_oklch() {
        let (l, c, h) = hex_to_oklch("#ff0000");
        assert!((l - 0.6279).abs() < 0.01);
        assert!((c - 0.2576).abs() < 0.01);
        assert!((h - 29.23).abs() < 1.0);
    }

    #[test]
    fn test_oklch_to_hex() {
        let hex = oklch_to_hex(0.5, 0.2, 180.0);
        assert!(hex.starts_with('#'));
        assert_eq!(hex.len(), 7);
    }

    #[test]
    fn test_brightness() {
        assert!(brightness("#000000"));
        assert!(!brightness("#ffffff"));
    }

    #[test]
    fn test_random_hex_format() {
        let h = random_hex();
        assert!(h.starts_with('#'));
        assert_eq!(h.len(), 7);
    }
}
