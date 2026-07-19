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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_convert_base() {
        let builder = convert_base("10");
        let target = builder.from(10);
        assert_eq!(target.to(2), "A");
    }

    #[test]
    fn test_convert_base_invalid() {
        let builder = convert_base("XYZ");
        let target = builder.from(10);
        assert_eq!(target.to(10), "Invalid number or base");
    }

    #[test]
    fn test_pad_zero() {
        assert_eq!(pad_zero(5, 2), "05");
        assert_eq!(pad_zero(42, 2), "42");
        assert_eq!(pad_zero(123, 2), "123");
        assert_eq!(pad_zero(7, 4), "0007");
    }

    #[test]
    fn test_format_currency() {
        assert_eq!(format_currency(1234.56, "USD"), "1,234.56 USD");
        assert_eq!(format_currency(0.0, "EUR"), "0.00 EUR");
    }

    #[test]
    fn test_format_comma() {
        assert_eq!(format_comma(1000), "1,000");
        assert_eq!(format_comma(1234567), "1,234,567");
        assert_eq!(format_comma(-1000), "-1,000");
    }

    #[test]
    fn test_arabic_to_roman() {
        assert_eq!(arabic_to_roman(1), "I");
        assert_eq!(arabic_to_roman(4), "IV");
        assert_eq!(arabic_to_roman(9), "IX");
        assert_eq!(arabic_to_roman(58), "LVIII");
        assert_eq!(arabic_to_roman(1994), "MCMXCIV");
        assert_eq!(arabic_to_roman(3999), "MMMCMXCIX");
    }

    #[test]
    fn test_roman_to_arabic() {
        assert_eq!(roman_to_arabic("I"), "1");
        assert_eq!(roman_to_arabic("IV"), "4");
        assert_eq!(roman_to_arabic("MCMXCIV"), "1994");
    }

    #[test]
    fn test_roman_to_arabic_invalid() {
        assert_eq!(roman_to_arabic("EFG"), "0");
    }
}
