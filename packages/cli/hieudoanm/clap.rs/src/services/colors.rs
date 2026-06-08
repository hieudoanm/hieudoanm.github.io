use rand::Rng;
use regex::Regex;
use std::fmt;

// ── Hex ─────────────────────────────────────────────────────────────

pub type Hex = String;

pub fn is_valid_hex(hex: &str) -> bool {
    let re = Regex::new(r"^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$").unwrap();
    re.is_match(hex.trim())
}

pub fn hex_to_rgb(hex: &str) -> Result<(u8, u8, u8), String> {
    let h = hex.trim_start_matches('#');
    let h = if h.len() == 3 {
        format!(
            "{}{}{}{}{}{}",
            &h[0..1],
            &h[0..1],
            &h[1..2],
            &h[1..2],
            &h[2..3],
            &h[2..3]
        )
    } else {
        h.to_string()
    };
    if h.len() != 6 {
        return Err("invalid hex length".into());
    }
    let r = u8::from_str_radix(&h[0..2], 16).map_err(|e| e.to_string())?;
    let g = u8::from_str_radix(&h[2..4], 16).map_err(|e| e.to_string())?;
    let b = u8::from_str_radix(&h[4..6], 16).map_err(|e| e.to_string())?;
    Ok((r, g, b))
}

pub fn hex_to_hsl(hex: &str) -> Result<(f64, f64, f64), String> {
    let (r, g, b) = hex_to_rgb(hex)?;
    Ok(Rgb { r, g, b }.to_hsl())
}

pub fn hex_to_oklch(hex: &str) -> Result<(f64, f64, f64), String> {
    let (r, g, b) = hex_to_rgb(hex)?;
    Ok(Rgb { r, g, b }.to_oklch())
}

pub fn hex_to_hcl(hex: &str) -> Result<(f64, f64, f64), String> {
    let (r, g, b) = hex_to_rgb(hex)?;
    Ok(Rgb { r, g, b }.to_hcl())
}

pub fn hex_to_cmyk(hex: &str) -> Result<(f64, f64, f64, f64), String> {
    let (r, g, b) = hex_to_rgb(hex)?;
    Ok(Rgb { r, g, b }.to_cmyk())
}

pub fn generate_random_hex_color() -> String {
    let mut rng = rand::thread_rng();
    format!(
        "#{:02X}{:02X}{:02X}",
        rng.gen_range(0..=255),
        rng.gen_range(0..=255),
        rng.gen_range(0..=255)
    )
}

// ── Rgb ─────────────────────────────────────────────────────────────

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Rgb {
    pub r: u8,
    pub g: u8,
    pub b: u8,
}

#[allow(clippy::wrong_self_convention)]
impl Rgb {
    pub fn new(r: u8, g: u8, b: u8) -> Self {
        Self { r, g, b }
    }

    pub fn to_hex(&self) -> String {
        format!("#{:02X}{:02X}{:02X}", self.r, self.g, self.b)
    }

    pub fn to_hsl(&self) -> (f64, f64, f64) {
        let r = self.r as f64 / 255.0;
        let g = self.g as f64 / 255.0;
        let b = self.b as f64 / 255.0;

        let max = r.max(g).max(b);
        let min = r.min(g).min(b);
        let l = (max + min) / 2.0;

        if max == min {
            return (0.0, 0.0, l * 100.0);
        }

        let d = max - min;
        let s = if l > 0.5 {
            d / (2.0 - max - min)
        } else {
            d / (max + min)
        };

        let h = match max {
            x if x == r => {
                let mut h = (g - b) / d;
                if g < b {
                    h += 6.0;
                }
                h * 60.0
            }
            x if x == g => ((b - r) / d + 2.0) * 60.0,
            _ => ((r - g) / d + 4.0) * 60.0,
        };

        (h, s * 100.0, l * 100.0)
    }

    pub fn to_cmyk(&self) -> (f64, f64, f64, f64) {
        let r = self.r as f64 / 255.0;
        let g = self.g as f64 / 255.0;
        let b = self.b as f64 / 255.0;

        let k = 1.0 - r.max(g).max(b);
        if k == 1.0 {
            return (0.0, 0.0, 0.0, 100.0);
        }
        let c = (1.0 - r - k) / (1.0 - k) * 100.0;
        let m = (1.0 - g - k) / (1.0 - k) * 100.0;
        let y = (1.0 - b - k) / (1.0 - k) * 100.0;
        (c, m, y, k * 100.0)
    }

    pub fn to_hcl(&self) -> (f64, f64, f64) {
        let r = linearize(self.r as f64 / 255.0);
        let g = linearize(self.g as f64 / 255.0);
        let b = linearize(self.b as f64 / 255.0);

        let x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
        let y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
        let z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b;

        let (l, a, bb) = xyz_to_lab(x, y, z);
        let c = (a * a + bb * bb).sqrt();
        let mut h = bb.atan2(a).to_degrees();
        if h < 0.0 {
            h += 360.0;
        }
        (h, c, l)
    }

    pub fn to_oklch(&self) -> (f64, f64, f64) {
        let r = srgb_to_linear(self.r as f64 / 255.0);
        let g = srgb_to_linear(self.g as f64 / 255.0);
        let b = srgb_to_linear(self.b as f64 / 255.0);

        let l_ = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
        let m_ = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
        let s_ = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

        let l = 0.2104542553 * l_.cbrt() + 0.7936177850 * m_.cbrt() - 0.0040720468 * s_.cbrt();
        let a = 1.9779984951 * l_.cbrt() - 2.4285922050 * m_.cbrt() + 0.4505937099 * s_.cbrt();
        let bb = 0.0259040371 * l_.cbrt() + 0.7827717662 * m_.cbrt() - 0.8086757660 * s_.cbrt();

        let c = (a * a + bb * bb).sqrt();
        let mut h = bb.atan2(a).to_degrees();
        if h < 0.0 {
            h += 360.0;
        }
        (l, c, h)
    }
}

impl fmt::Display for Rgb {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "rgb({}, {}, {})", self.r, self.g, self.b)
    }
}

impl From<&str> for Rgb {
    fn from(hex: &str) -> Self {
        let (r, g, b) = hex_to_rgb(hex).unwrap_or((0, 0, 0));
        Rgb { r, g, b }
    }
}

// ── Hsl ─────────────────────────────────────────────────────────────

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Hsl {
    pub h: f64,
    pub s: f64,
    pub l: f64,
}

#[allow(clippy::wrong_self_convention)]
impl Hsl {
    pub fn new(h: f64, s: f64, l: f64) -> Self {
        Self { h, s, l }
    }

    pub fn to_rgb(&self) -> (u8, u8, u8) {
        let h = self.h % 360.0;
        let s = self.s / 100.0;
        let l = self.l / 100.0;

        let c = (1.0 - (2.0 * l - 1.0).abs()) * s;
        let x = c * (1.0 - ((h / 60.0) % 2.0 - 1.0).abs());
        let m = l - c / 2.0;

        let (r, g, b) = match h as u32 {
            0..=59 => (c, x, 0.0),
            60..=119 => (x, c, 0.0),
            120..=179 => (0.0, c, x),
            180..=239 => (0.0, x, c),
            240..=299 => (x, 0.0, c),
            _ => (c, 0.0, x),
        };

        (
            ((r + m) * 255.0).round() as u8,
            ((g + m) * 255.0).round() as u8,
            ((b + m) * 255.0).round() as u8,
        )
    }

    pub fn to_hex(&self) -> String {
        let (r, g, b) = self.to_rgb();
        format!("#{:02x}{:02x}{:02x}", r, g, b)
    }

    pub fn to_oklch(&self) -> (f64, f64, f64) {
        let (r, g, b) = self.to_rgb();
        Rgb { r, g, b }.to_oklch()
    }
}

// ── Hcl (CIELCh) ────────────────────────────────────────────────────

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Hcl {
    pub h: f64,
    pub c: f64,
    pub l: f64,
}

#[allow(clippy::wrong_self_convention)]
impl Hcl {
    pub fn new(h: f64, c: f64, l: f64) -> Self {
        Self { h, c, l }
    }

    pub fn is_valid(&self) -> bool {
        self.h >= 0.0 && self.h <= 360.0 && self.l >= 0.0 && self.l <= 100.0 && self.c >= 0.0
    }

    pub fn to_lab(&self) -> (f64, f64, f64) {
        let h_rad = self.h.to_radians();
        let a = self.c * h_rad.cos();
        let b = self.c * h_rad.sin();
        (self.l, a, b)
    }

    pub fn to_rgb(&self) -> Result<(u8, u8, u8), String> {
        if !self.is_valid() {
            return Err("invalid Hcl".into());
        }
        let (l, a, b) = self.to_lab();
        let (x, y, z) = lab_to_xyz(l, a, b);
        let (r_lin, g_lin, b_lin) = xyz_to_linear_rgb(x, y, z);
        Ok(linear_to_rgb(r_lin, g_lin, b_lin))
    }

    pub fn to_hex(&self) -> Result<String, String> {
        let (r, g, b) = self.to_rgb()?;
        Ok(format!("#{:02X}{:02X}{:02X}", r, g, b))
    }

    pub fn to_hsl(&self) -> Result<(f64, f64, f64), String> {
        let (r, g, b) = self.to_rgb()?;
        Ok(Rgb { r, g, b }.to_hsl())
    }

    pub fn to_cmyk(&self) -> Result<(f64, f64, f64, f64), String> {
        let (r, g, b) = self.to_rgb()?;
        Ok(Rgb { r, g, b }.to_cmyk())
    }

    pub fn to_oklch(&self) -> Result<(f64, f64, f64), String> {
        let (r, g, b) = self.to_rgb()?;
        Ok(Rgb { r, g, b }.to_oklch())
    }
}

// ── Oklch ───────────────────────────────────────────────────────────

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Oklch {
    pub l: f64,
    pub c: f64,
    pub h: f64,
}

#[allow(clippy::wrong_self_convention)]
impl Oklch {
    pub fn new(l: f64, c: f64, h: f64) -> Self {
        Self { l, c, h }
    }

    pub fn is_valid(&self) -> bool {
        self.l >= 0.0 && self.l <= 1.0 && self.c >= 0.0 && self.h >= 0.0 && self.h <= 360.0
    }

    pub fn to_oklab(&self) -> (f64, f64, f64) {
        let h_rad = self.h.to_radians();
        let a = self.c * h_rad.cos();
        let b = self.c * h_rad.sin();
        (self.l, a, b)
    }

    pub fn to_rgb(&self) -> Result<(u8, u8, u8), String> {
        if !self.is_valid() {
            return Err("invalid Oklch".into());
        }
        let (l, a, b) = self.to_oklab();
        let (r_lin, g_lin, b_lin) = oklab_to_linear_rgb(l, a, b);
        Ok(linear_to_rgb(r_lin, g_lin, b_lin))
    }

    pub fn to_hex(&self) -> Result<String, String> {
        let (r, g, b) = self.to_rgb()?;
        Ok(format!("#{:02X}{:02X}{:02X}", r, g, b))
    }

    pub fn to_hsl(&self) -> Result<(f64, f64, f64), String> {
        let (r, g, b) = self.to_rgb()?;
        Ok(Rgb { r, g, b }.to_hsl())
    }

    pub fn to_hcl(&self) -> Result<(f64, f64, f64), String> {
        let (r, g, b) = self.to_rgb()?;
        Ok(Rgb { r, g, b }.to_hcl())
    }

    pub fn to_cmyk(&self) -> Result<(f64, f64, f64, f64), String> {
        let (r, g, b) = self.to_rgb()?;
        Ok(Rgb { r, g, b }.to_cmyk())
    }
}

// ── Cmyk ────────────────────────────────────────────────────────────

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Cmyk {
    pub c: f64,
    pub m: f64,
    pub y: f64,
    pub k: f64,
}

#[allow(clippy::wrong_self_convention)]
impl Cmyk {
    pub fn new(c: f64, m: f64, y: f64, k: f64) -> Self {
        Self { c, m, y, k }
    }

    pub fn is_valid(&self) -> bool {
        self.c >= 0.0
            && self.c <= 100.0
            && self.m >= 0.0
            && self.m <= 100.0
            && self.y >= 0.0
            && self.y <= 100.0
            && self.k >= 0.0
            && self.k <= 100.0
    }

    pub fn to_rgb(&self) -> Result<(u8, u8, u8), String> {
        if !self.is_valid() {
            return Err("invalid Cmyk".into());
        }
        let c = self.c / 100.0;
        let m = self.m / 100.0;
        let y = self.y / 100.0;
        let k = self.k / 100.0;

        let rf = 1.0 - (c * (1.0 - k) + k).min(1.0);
        let gf = 1.0 - (m * (1.0 - k) + k).min(1.0);
        let bf = 1.0 - (y * (1.0 - k) + k).min(1.0);

        Ok((
            (rf * 255.0).round() as u8,
            (gf * 255.0).round() as u8,
            (bf * 255.0).round() as u8,
        ))
    }

    pub fn to_hex(&self) -> Result<String, String> {
        let (r, g, b) = self.to_rgb()?;
        Ok(format!("#{:02X}{:02X}{:02X}", r, g, b))
    }

    pub fn to_hsl(&self) -> Result<(f64, f64, f64), String> {
        let (r, g, b) = self.to_rgb()?;
        Ok(Rgb { r, g, b }.to_hsl())
    }

    pub fn to_hcl(&self) -> Result<(f64, f64, f64), String> {
        let (r, g, b) = self.to_rgb()?;
        Ok(Rgb { r, g, b }.to_hcl())
    }

    pub fn to_oklch(&self) -> Result<(f64, f64, f64), String> {
        let (r, g, b) = self.to_rgb()?;
        Ok(Rgb { r, g, b }.to_oklch())
    }
}

// ── Internal helpers ────────────────────────────────────────────────

fn srgb_to_linear(c: f64) -> f64 {
    if c <= 0.04045 {
        c / 12.92
    } else {
        ((c + 0.055) / 1.055).powf(2.4)
    }
}

fn linearize(u: f64) -> f64 {
    srgb_to_linear(u)
}

fn xyz_to_lab(x: f64, y: f64, z: f64) -> (f64, f64, f64) {
    let ref_x = 0.95047;
    let ref_y = 1.00000;
    let ref_z = 1.08883;

    let f = |t: f64| -> f64 {
        if t > 0.008856 {
            t.cbrt()
        } else {
            7.787 * t + 16.0 / 116.0
        }
    };

    let fx = f(x / ref_x);
    let fy = f(y / ref_y);
    let fz = f(z / ref_z);

    let l = 116.0 * fy - 16.0;
    let a = 500.0 * (fx - fy);
    let b = 200.0 * (fy - fz);
    (l, a, b)
}

fn lab_to_xyz(l: f64, a: f64, b: f64) -> (f64, f64, f64) {
    let ref_x = 0.95047;
    let ref_y = 1.00000;
    let ref_z = 1.08883;

    let fy = (l + 16.0) / 116.0;
    let fx = a / 500.0 + fy;
    let fz = fy - b / 200.0;

    let finv = |t: f64| -> f64 {
        if t * t * t > 0.008856 {
            t * t * t
        } else {
            (t - 16.0 / 116.0) / 7.787
        }
    };

    let x = ref_x * finv(fx);
    let y = ref_y * finv(fy);
    let z = ref_z * finv(fz);
    (x, y, z)
}

fn xyz_to_linear_rgb(x: f64, y: f64, z: f64) -> (f64, f64, f64) {
    let r = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
    let g = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z;
    let b = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
    (r, g, b)
}

fn linear_to_rgb(r: f64, g: f64, b: f64) -> (u8, u8, u8) {
    let to_srgb = |u: f64| -> f64 {
        if u <= 0.0 {
            return 0.0;
        }
        if u >= 1.0 {
            return 1.0;
        }
        if u <= 0.0031308 {
            12.92 * u
        } else {
            1.055 * u.powf(1.0 / 2.4) - 0.055
        }
    };
    (
        (to_srgb(r) * 255.0).round() as u8,
        (to_srgb(g) * 255.0).round() as u8,
        (to_srgb(b) * 255.0).round() as u8,
    )
}

fn oklab_to_linear_rgb(l: f64, a: f64, b: f64) -> (f64, f64, f64) {
    let l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    let m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    let s_ = l - 0.0894841775 * a - 1.2914855480 * b;

    let r = 4.0767416621 * l_.cbrt() - 3.3077115913 * m_.cbrt() + 0.2309699292 * s_.cbrt();
    let g = -1.2684380046 * l_.cbrt() + 2.6097574011 * m_.cbrt() - 0.3413193965 * s_.cbrt();
    let b = -0.0041960863 * l_.cbrt() - 0.7034186147 * m_.cbrt() + 1.7076147010 * s_.cbrt();
    (r, g, b)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hex_to_rgb() {
        assert_eq!(hex_to_rgb("#FF0000").unwrap(), (255, 0, 0));
        assert_eq!(hex_to_rgb("#00FF00").unwrap(), (0, 255, 0));
        assert_eq!(hex_to_rgb("#0000FF").unwrap(), (0, 0, 255));
        assert_eq!(hex_to_rgb("#FFFFFF").unwrap(), (255, 255, 255));
        assert_eq!(hex_to_rgb("#000000").unwrap(), (0, 0, 0));
    }

    #[test]
    fn test_hex_to_rgb_shorthand() {
        assert_eq!(hex_to_rgb("#F00").unwrap(), (255, 0, 0));
        assert_eq!(hex_to_rgb("#0F0").unwrap(), (0, 255, 0));
    }

    #[test]
    fn test_rgb_to_hex() {
        assert_eq!(Rgb::new(255, 0, 0).to_hex(), "#FF0000");
        assert_eq!(Rgb::new(0, 255, 0).to_hex(), "#00FF00");
    }

    #[test]
    fn test_rgb_to_hsl() {
        let (h, s, l) = Rgb::new(255, 0, 0).to_hsl();
        assert!((h - 0.0).abs() < 1.0);
        assert!((s - 100.0).abs() < 1.0);
        assert!((l - 50.0).abs() < 1.0);
    }

    #[test]
    fn test_hsl_to_rgb() {
        let hsl = Hsl::new(0.0, 100.0, 50.0);
        let (r, g, b) = hsl.to_rgb();
        assert_eq!(r, 255);
        assert_eq!(g, 0);
        assert_eq!(b, 0);
    }

    #[test]
    fn test_roundtrip_hex_rgb_hex() {
        let hex = "#AABBCC";
        let (r, g, b) = hex_to_rgb(hex).unwrap();
        let rgb = Rgb::new(r, g, b);
        assert_eq!(rgb.to_hex(), "#AABBCC");
    }
}
