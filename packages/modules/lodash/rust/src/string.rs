use std::collections::HashMap;

fn split_words(s: &str) -> Vec<String> {
    let mut words = Vec::new();
    let mut current = String::new();
    let chars: Vec<char> = s.chars().collect();
    for (i, &c) in chars.iter().enumerate() {
        if c.is_alphanumeric() {
            if c.is_uppercase() && !current.is_empty() {
                if i + 1 < chars.len() && chars[i + 1].is_lowercase() {
                    words.push(current.clone());
                    current.clear();
                }
            }
            current.push(c.to_ascii_lowercase());
        } else {
            if !current.is_empty() {
                words.push(current.clone());
                current.clear();
            }
        }
    }
    if !current.is_empty() {
        words.push(current);
    }
    words
}

pub fn camel_case(s: &str) -> String {
    let words = split_words(s);
    let mut result = String::new();
    for (i, word) in words.iter().enumerate() {
        if i == 0 {
            result.push_str(word);
        } else {
            let mut chars = word.chars();
            if let Some(c) = chars.next() {
                result.push(c.to_ascii_uppercase());
                result.push_str(chars.as_str());
            }
        }
    }
    result
}

pub fn capitalize(s: &str) -> String {
    let mut chars = s.chars();
    match chars.next() {
        None => String::new(),
        Some(c) => {
            let mut result = c.to_uppercase().to_string();
            result.push_str(&chars.as_str().to_lowercase());
            result
        }
    }
}

pub fn deburr(s: &str) -> String {
    let mut result = String::with_capacity(s.len());
    for c in s.chars() {
        match c {
            'à' | 'á' | 'â' | 'ã' | 'ä' | 'å' | 'ā' | 'ă' | 'ą' => result.push('a'),
            'ç' | 'ć' | 'ĉ' | 'ċ' | 'č' => result.push('c'),
            'è' | 'é' | 'ê' | 'ë' | 'ē' | 'ĕ' | 'ė' | 'ę' | 'ě' => result.push('e'),
            'ì' | 'í' | 'î' | 'ï' | 'ĩ' | 'ī' | 'ĭ' | 'į' => result.push('i'),
            'ñ' | 'ń' | 'ņ' | 'ň' => result.push('n'),
            'ò' | 'ó' | 'ô' | 'õ' | 'ö' | 'ø' | 'ō' | 'ŏ' | 'ő' => result.push('o'),
            'ù' | 'ú' | 'û' | 'ü' | 'ũ' | 'ū' | 'ŭ' | 'ů' => result.push('u'),
            'ý' | 'ÿ' | 'ŷ' => result.push('y'),
            'À' | 'Á' | 'Â' | 'Ã' | 'Ä' | 'Å' | 'Ā' | 'Ă' | 'Ą' => result.push('A'),
            'Ç' | 'Ć' | 'Ĉ' | 'Ċ' | 'Č' => result.push('C'),
            'È' | 'É' | 'Ê' | 'Ë' | 'Ē' | 'Ĕ' | 'Ė' | 'Ę' | 'Ě' => result.push('E'),
            'Ì' | 'Í' | 'Î' | 'Ï' | 'Ĩ' | 'Ī' | 'Ĭ' | 'Į' => result.push('I'),
            'Ñ' | 'Ń' | 'Ņ' | 'Ň' => result.push('N'),
            'Ò' | 'Ó' | 'Ô' | 'Õ' | 'Ö' | 'Ø' | 'Ō' | 'Ŏ' | 'Ő' => result.push('O'),
            'Ù' | 'Ú' | 'Û' | 'Ü' | 'Ũ' | 'Ū' | 'Ŭ' | 'Ů' => result.push('U'),
            'Ý' | 'Ÿ' | 'Ŷ' => result.push('Y'),
            'đ' => result.push('d'),
            'Đ' => result.push('D'),
            'ß' => result.push_str("ss"),
            'æ' => result.push_str("ae"),
            'œ' => result.push_str("oe"),
            _ => result.push(c),
        }
    }
    result
}

pub fn escape(s: &str) -> String {
    let mut result = String::with_capacity(s.len());
    for c in s.chars() {
        match c {
            '&' => result.push_str("&amp;"),
            '<' => result.push_str("&lt;"),
            '>' => result.push_str("&gt;"),
            '"' => result.push_str("&quot;"),
            '\'' => result.push_str("&#39;"),
            _ => result.push(c),
        }
    }
    result
}

pub fn escape_regexp(s: &str) -> String {
    let mut result = String::with_capacity(s.len());
    for c in s.chars() {
        match c {
            '.' | '*' | '+' | '?' | '(' | ')' | '[' | ']' | '{' | '}' | '^' | '$'
            | '|' | '\\' => {
                result.push('\\');
                result.push(c);
            }
            _ => result.push(c),
        }
    }
    result
}

pub fn kebab_case(s: &str) -> String {
    let words = split_words(s);
    words.join("-")
}

pub fn lower_case(s: &str) -> String {
    let words = split_words(s);
    words.join(" ")
}

pub fn lower_first(s: &str) -> String {
    let mut chars = s.chars();
    match chars.next() {
        None => String::new(),
        Some(c) => {
            let mut result = c.to_lowercase().to_string();
            result.push_str(chars.as_str());
            result
        }
    }
}

fn pad_inner(s: &str, length: usize, chars: &str, left: bool, right: bool) -> String {
    let s_len = s.chars().count();
    if s_len >= length || chars.is_empty() {
        return s.to_string();
    }
    let total_pad = length - s_len;
    let left_pad = if left { total_pad / 2 } else { 0 };
    let right_pad = if right {
        total_pad - left_pad
    } else {
        total_pad
    };
    let mut result = String::with_capacity(length);
    let pad_chars: Vec<char> = chars.chars().collect();
    for i in 0..left_pad {
        result.push(pad_chars[i % pad_chars.len()]);
    }
    result.push_str(s);
    for i in 0..right_pad {
        result.push(pad_chars[i % pad_chars.len()]);
    }
    result
}

pub fn pad(s: &str, length: usize, chars: &str) -> String {
    pad_inner(s, length, chars, true, true)
}

pub fn pad_end(s: &str, length: usize, chars: &str) -> String {
    pad_inner(s, length, chars, false, true)
}

pub fn pad_start(s: &str, length: usize, chars: &str) -> String {
    pad_inner(s, length, chars, true, false)
}

pub fn parse_int(s: &str, radix: u32) -> i32 {
    let s = s.trim();
    if radix < 2 || radix > 36 {
        return 0;
    }
    let (negative, start) = if let Some(rest) = s.strip_prefix('-') {
        (true, rest)
    } else {
        let s = s.strip_prefix('+').unwrap_or(s);
        (false, s)
    };
    match i32::from_str_radix(start, radix) {
        Ok(n) => {
            if negative {
                -n
            } else {
                n
            }
        }
        Err(_) => 0,
    }
}

pub fn repeat(s: &str, n: usize) -> String {
    if n == 0 || s.is_empty() {
        return String::new();
    }
    let mut result = String::with_capacity(s.len() * n);
    for _ in 0..n {
        result.push_str(s);
    }
    result
}

pub fn replace(s: &str, pattern: &str, replacement: &str) -> String {
    s.replace(pattern, replacement)
}

pub fn snake_case(s: &str) -> String {
    let words = split_words(s);
    words.join("_")
}

pub fn split<'a>(s: &'a str, separator: &str, limit: usize) -> Vec<&'a str> {
    if limit == 0 {
        return Vec::new();
    }
    let parts: Vec<&str> = s.splitn(limit, separator).collect();
    let mut result = Vec::with_capacity(parts.len().min(limit));
    for (i, part) in parts.iter().enumerate() {
        if result.len() < limit - 1 || i == parts.len() - 1 {
            result.push(*part);
        } else {
            result.push(*part);
        }
    }
    result
}

pub fn start_case(s: &str) -> String {
    let words = split_words(s);
    let mut result = String::new();
    for (i, word) in words.iter().enumerate() {
        if i > 0 {
            result.push(' ');
        }
        let mut chars = word.chars();
        if let Some(c) = chars.next() {
            result.push(c.to_ascii_uppercase());
            result.push_str(chars.as_str());
        }
    }
    result
}

pub fn template(s: &str, data: &HashMap<&str, &str>) -> String {
    let mut result = s.to_string();
    for (key, value) in data {
        result = result.replace(&format!("{{{{{}}}}}", key), value);
    }
    result
}

pub fn to_lower(s: &str) -> String {
    s.to_lowercase()
}

pub fn to_upper(s: &str) -> String {
    s.to_uppercase()
}

pub fn truncate(s: &str, length: usize, omission: &str) -> String {
    let s_len = s.chars().count();
    if s_len <= length {
        return s.to_string();
    }
    let omission_len = omission.chars().count();
    let trunc_len = if length >= omission_len {
        length - omission_len
    } else {
        0
    };
    let truncated: String = s.chars().take(trunc_len).collect();
    format!("{}{}", truncated, omission)
}

pub fn unescape(s: &str) -> String {
    let mut result = String::with_capacity(s.len());
    let mut rest = s;
    while let Some(pos) = rest.find('&') {
        result.push_str(&rest[..pos]);
        rest = &rest[pos..];
        if rest.starts_with("&amp;") {
            result.push('&');
            rest = &rest[5..];
        } else if rest.starts_with("&lt;") {
            result.push('<');
            rest = &rest[4..];
        } else if rest.starts_with("&gt;") {
            result.push('>');
            rest = &rest[4..];
        } else if rest.starts_with("&quot;") {
            result.push('"');
            rest = &rest[6..];
        } else if rest.starts_with("&#39;") {
            result.push('\'');
            rest = &rest[5..];
        } else if rest.starts_with("&#x27;") {
            result.push('\'');
            rest = &rest[7..];
        } else {
            result.push('&');
            rest = &rest[1..];
        }
    }
    result.push_str(rest);
    result
}

pub fn upper_case(s: &str) -> String {
    let words = split_words(s);
    words
        .iter()
        .map(|w| w.to_uppercase())
        .collect::<Vec<_>>()
        .join(" ")
}

pub fn upper_first(s: &str) -> String {
    let mut chars = s.chars();
    match chars.next() {
        None => String::new(),
        Some(c) => {
            let mut result = c.to_uppercase().to_string();
            result.push_str(chars.as_str());
            result
        }
    }
}

pub fn words(s: &str) -> Vec<String> {
    split_words(s)
}
