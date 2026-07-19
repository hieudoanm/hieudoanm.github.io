pub fn add_zero(number: i32) -> String {
    if number < 9 {
        format!("0{number}")
    } else {
        number.to_string()
    }
}

pub fn comma(n: i64) -> String {
    let s = n.to_string();
    let n_len = s.len();

    if n_len <= 3 {
        return s;
    }

    let mut result = String::new();
    let pre = n_len % 3;
    if pre > 0 {
        result.push_str(&s[..pre]);
        if n_len > pre {
            result.push(',');
        }
    }

    let mut i = pre;
    while i < n_len {
        let end = (i + 3).min(n_len);
        result.push_str(&s[i..end]);
        if end < n_len {
            result.push(',');
        }
        i = end;
    }

    result
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add_zero() {
        assert_eq!(add_zero(5), "05");
        assert_eq!(add_zero(10), "10");
        assert_eq!(add_zero(0), "00");
    }

    #[test]
    fn test_comma() {
        assert_eq!(comma(123), "123");
        assert_eq!(comma(1234), "1,234");
        assert_eq!(comma(1234567), "1,234,567");
    }
}
