pub fn convert_base(number: &str) -> ConvertBaseBuilder {
    ConvertBaseBuilder { number: number.to_string() }
}

#[derive(Clone)]
pub struct ConvertBaseBuilder {
    number: String,
}

impl ConvertBaseBuilder {
    pub fn from(self, from_base: u32) -> ConvertBaseTarget {
        let decimal = u64::from_str_radix(&self.number, from_base);
        ConvertBaseTarget { decimal }
    }
}

pub struct ConvertBaseTarget {
    decimal: Result<u64, std::num::ParseIntError>,
}

impl ConvertBaseTarget {
    pub fn to(&self, to_base: u32) -> String {
        match self.decimal {
            Ok(n) => match to_base {
                2 | 8 | 16 => format!("{:X}", n),
                _ => n.to_string(),
            },
            Err(_) => "Invalid number or base".to_string(),
        }
    }
}

pub fn pad_zero(number: i64, length: usize) -> String {
    format!("{:0>width$}", number, width = length)
}

pub fn format_currency(amount: f64, currency: &str) -> String {
    let whole = amount.trunc() as i64;
    let frac = ((amount - amount.trunc()) * 100.0).round() as i64;
    let whole_str = format_comma(whole);
    format!("{}.{:02} {}", whole_str, frac, currency)
}

pub fn format_comma(number: i64) -> String {
    let s = number.to_string();
    let mut result = String::new();
    let chars: Vec<char> = s.chars().collect();
    let len = chars.len();
    for (i, ch) in chars.iter().enumerate() {
        if i > 0 && (len - i) % 3 == 0 && ch.is_ascii_digit() {
            result.push(',');
        }
        result.push(*ch);
    }
    result
}

pub fn arabic_to_roman(mut num: i32) -> String {
    let map = [
        (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
        (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
        (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I"),
    ];
    let mut result = String::new();
    for &(value, numeral) in &map {
        while num >= value {
            result.push_str(numeral);
            num -= value;
        }
    }
    result
}

pub fn roman_to_arabic(roman: &str) -> String {
    let map: std::collections::HashMap<char, i32> = [
        ('M', 1000), ('D', 500), ('C', 100), ('L', 50),
        ('X', 10), ('V', 5), ('I', 1),
    ].iter().cloned().collect();

    let chars: Vec<char> = roman.chars().collect();
    let mut total = 0i32;
    let mut prev = 0i32;

    for &ch in chars.iter().rev() {
        let current = *map.get(&ch).unwrap_or(&0);
        if current < prev {
            total -= current;
        } else {
            total += current;
        }
        prev = current;
    }

    total.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_convert_base() {
        assert_eq!(convert_base("10").from(10).to(2), "A");
        assert_eq!(convert_base("255").from(10).to(16), "FF");
    }

    #[test]
    fn test_pad_zero() {
        assert_eq!(pad_zero(5, 2), "05");
        assert_eq!(pad_zero(42, 2), "42");
        assert_eq!(pad_zero(123, 2), "123");
        assert_eq!(pad_zero(7, 4), "0007");
    }

    #[test]
    fn test_format_comma() {
        assert_eq!(format_comma(1000), "1,000");
        assert_eq!(format_comma(1234567), "1,234,567");
    }

    #[test]
    fn test_arabic_roman_roundtrip() {
        let cases = [1, 4, 9, 58, 1994, 2024, 3999];
        for &n in &cases {
            let roman = arabic_to_roman(n);
            let arabic = roman_to_arabic(&roman);
            assert_eq!(arabic, n.to_string());
        }
    }
}
