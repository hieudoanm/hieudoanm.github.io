use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn convert_base(number: &str) -> WasmConvertBaseBuilder {
    WasmConvertBaseBuilder { inner: crate::core::number::convert_base(number) }
}

#[wasm_bindgen]
pub struct WasmConvertBaseBuilder {
    inner: crate::core::number::ConvertBaseBuilder,
}

#[wasm_bindgen]
impl WasmConvertBaseBuilder {
    pub fn from(&self, from_base: u32) -> WasmConvertBaseTarget {
        WasmConvertBaseTarget { inner: self.inner.clone().from(from_base) }
    }
}

#[wasm_bindgen]
pub struct WasmConvertBaseTarget {
    inner: crate::core::number::ConvertBaseTarget,
}

#[wasm_bindgen]
impl WasmConvertBaseTarget {
    pub fn to(&self, to_base: u32) -> String { self.inner.to(to_base) }
}

#[wasm_bindgen]
pub fn pad_zero(number: i64, length: usize) -> String {
    crate::core::number::pad_zero(number, length)
}

#[wasm_bindgen]
pub fn format_currency(amount: f64, currency: &str) -> String {
    crate::core::number::format_currency(amount, currency)
}

#[wasm_bindgen]
pub fn format_comma(number: i64) -> String {
    crate::core::number::format_comma(number)
}

#[wasm_bindgen]
pub fn arabic_to_roman(num: i32) -> String {
    crate::core::number::arabic_to_roman(num)
}

#[wasm_bindgen]
pub fn roman_to_arabic(roman: &str) -> String {
    crate::core::number::roman_to_arabic(roman)
}
