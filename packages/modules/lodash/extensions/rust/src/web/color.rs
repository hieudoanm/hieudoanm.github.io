use wasm_bindgen::prelude::*;

fn to_js_obj(pairs: &[(&str, &JsValue)]) -> JsValue {
    let obj = js_sys::Object::new();
    for (k, v) in pairs {
        js_sys::Reflect::set(&obj, &(*k).into(), v).ok();
    }
    obj.into()
}

#[wasm_bindgen]
pub fn component_to_hex(code: u8) -> String {
    crate::core::color::component_to_hex(code)
}

#[wasm_bindgen]
pub fn rgb_to_hex(red: u8, green: u8, blue: u8) -> String {
    crate::core::color::rgb_to_hex(red, green, blue)
}

#[wasm_bindgen]
pub fn hex_to_rgb(hex: &str) -> JsValue {
    match crate::core::color::hex_to_rgb(hex) {
        Some((r, g, b)) => to_js_obj(&[("r", &JsValue::from(r)), ("g", &JsValue::from(g)), ("b", &JsValue::from(b))]),
        None => JsValue::NULL,
    }
}

#[wasm_bindgen]
pub fn hex_to_hsl(hex: &str) -> JsValue {
    let (h, s, l) = crate::core::color::hex_to_hsl(hex);
    to_js_obj(&[("h", &JsValue::from_f64(h)), ("s", &JsValue::from_f64(s)), ("l", &JsValue::from_f64(l))])
}

#[wasm_bindgen]
pub fn rgb_to_hsl(r: u8, g: u8, b: u8) -> JsValue {
    let (h, s, l) = crate::core::color::rgb_to_hsl(r, g, b);
    to_js_obj(&[("h", &JsValue::from_f64(h)), ("s", &JsValue::from_f64(s)), ("l", &JsValue::from_f64(l))])
}

#[wasm_bindgen]
pub fn hsl_to_rgb(h: f64, s: f64, l: f64) -> JsValue {
    let (r, g, b) = crate::core::color::hsl_to_rgb(h, s, l);
    to_js_obj(&[("r", &JsValue::from(r)), ("g", &JsValue::from(g)), ("b", &JsValue::from(b))])
}

#[wasm_bindgen]
pub fn hsl_to_hex(h: f64, s: f64, l: f64) -> String {
    crate::core::color::hsl_to_hex(h, s, l)
}

#[wasm_bindgen]
pub fn hex_to_cmyk(hex: &str) -> JsValue {
    let (c, m, y, k) = crate::core::color::hex_to_cmyk(hex);
    to_js_obj(&[
        ("c", &JsValue::from_f64(c)),
        ("m", &JsValue::from_f64(m)),
        ("y", &JsValue::from_f64(y)),
        ("k", &JsValue::from_f64(k)),
    ])
}

#[wasm_bindgen]
pub fn cmyk_to_hex(c: f64, m: f64, y: f64, k: f64) -> String {
    crate::core::color::cmyk_to_hex(c, m, y, k)
}

#[wasm_bindgen]
pub fn cmyk_to_hsl(c: f64, m: f64, y: f64, k: f64) -> String {
    crate::core::color::cmyk_to_hsl(c, m, y, k)
}

#[wasm_bindgen]
pub fn hex_to_oklch(hex: &str) -> JsValue {
    let (l, c, h) = crate::core::color::hex_to_oklch(hex);
    to_js_obj(&[("l", &JsValue::from_f64(l)), ("c", &JsValue::from_f64(c)), ("h", &JsValue::from_f64(h))])
}

#[wasm_bindgen]
pub fn oklch_to_hex(l: f64, c: f64, h: f64) -> String {
    crate::core::color::oklch_to_hex(l, c, h)
}

#[wasm_bindgen]
pub fn brightness(hex: &str) -> bool {
    crate::core::color::brightness(hex)
}

#[wasm_bindgen]
pub fn random_hex() -> String {
    crate::core::color::random_hex()
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
        assert_eq!(rgb_to_hex(0, 0, 0), "#000000");
        assert_eq!(rgb_to_hex(255, 255, 255), "#ffffff");
    }

    #[test]
    fn test_hsl_to_hex() {
        assert_eq!(hsl_to_hex(0.0, 100.0, 50.0), "#ff0000");
        assert_eq!(hsl_to_hex(120.0, 100.0, 50.0), "#00ff00");
        assert_eq!(hsl_to_hex(240.0, 100.0, 50.0), "#0000ff");
    }

    #[test]
    fn test_cmyk_to_hex() {
        assert_eq!(cmyk_to_hex(0.0, 100.0, 100.0, 0.0), "#ff0000");
        assert_eq!(cmyk_to_hex(0.0, 0.0, 0.0, 100.0), "#000000");
    }

    #[test]
    fn test_cmyk_to_hsl() {
        assert_eq!(cmyk_to_hsl(0.0, 100.0, 100.0, 0.0), "hsl(0, 100%, 50%)");
        assert_eq!(cmyk_to_hsl(0.0, 0.0, 0.0, 100.0), "hsl(0, 0%, 0%)");
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
    fn test_random_hex() {
        let h = random_hex();
        assert!(h.starts_with('#'));
        assert_eq!(h.len(), 7);
    }
}
