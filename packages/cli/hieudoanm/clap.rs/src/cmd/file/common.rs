use anyhow::Context;
use std::path::Path;

pub fn split_lines(s: &str) -> Vec<String> {
    let mut lines = Vec::new();
    let mut start = 0;
    for (i, ch) in s.char_indices() {
        if ch == '\n' {
            lines.push(s[start..i].to_string());
            start = i + 1;
        }
    }
    if start <= s.len() {
        lines.push(s[start..].to_string());
    }
    lines
}

pub fn format_size(bytes: u64) -> String {
    const UNIT: u64 = 1024;
    const SIZES: &[&str] = &["KB", "MB", "GB", "TB"];
    if bytes < UNIT {
        return format!("{} B", bytes);
    }
    let mut div = UNIT;
    let mut exp = 0;
    let mut n = bytes / UNIT;
    while n >= UNIT && exp < SIZES.len() - 1 {
        div *= UNIT;
        n /= UNIT;
        exp += 1;
    }
    format!("{:.1} {}", bytes as f64 / div as f64, SIZES[exp])
}

pub fn parse_mode(s: &str) -> anyhow::Result<std::fs::Permissions> {
    let mode = u32::from_str_radix(s, 8)
        .with_context(|| format!("invalid mode {s:?} (use octal e.g. 755)"))?;
    use std::os::unix::fs::PermissionsExt;
    Ok(std::fs::Permissions::from_mode(mode))
}

pub fn detect_mime(path: &str) -> String {
    let ext = Path::new(path)
        .extension()
        .and_then(|e| e.to_str())
        .map(|e| format!(".{}", e.to_lowercase()))
        .unwrap_or_default();

    const MIMES: &[(&str, &str)] = &[
        (".txt", "text/plain"),
        (".md", "text/markdown"),
        (".html", "text/html"),
        (".css", "text/css"),
        (".js", "text/javascript"),
        (".json", "application/json"),
        (".xml", "application/xml"),
        (".yml", "application/x-yaml"),
        (".yaml", "application/x-yaml"),
        (".toml", "application/toml"),
        (".csv", "text/csv"),
        (".jpg", "image/jpeg"),
        (".jpeg", "image/jpeg"),
        (".png", "image/png"),
        (".gif", "image/gif"),
        (".svg", "image/svg+xml"),
        (".webp", "image/webp"),
        (".pdf", "application/pdf"),
        (".doc", "application/msword"),
        (
            ".docx",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ),
        (".xls", "application/vnd.ms-excel"),
        (
            ".xlsx",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ),
        (".zip", "application/zip"),
        (".tar", "application/x-tar"),
        (".gz", "application/gzip"),
        (".mp3", "audio/mpeg"),
        (".mp4", "video/mp4"),
        (".go", "text/x-go"),
        (".py", "text/x-python"),
        (".rs", "text/x-rust"),
        (".sh", "text/x-shellscript"),
        (".swift", "text/x-swift"),
    ];

    for &(e, mime) in MIMES {
        if ext == e {
            return mime.to_string();
        }
    }
    "application/octet-stream".to_string()
}

pub fn is_binary(path: &str) -> bool {
    let ext = Path::new(path)
        .extension()
        .and_then(|e| e.to_str())
        .map(|e| e.to_lowercase())
        .unwrap_or_default();

    const BINARY_EXTS: &[&str] = &[
        "exe", "bin", "o", "a", "so", "dll", "dylib", "jpg", "jpeg", "png", "gif", "ico", "pdf",
        "zip", "tar", "gz", "bz2", "7z", "mp3", "mp4", "mov", "avi", "webp", "woff", "woff2",
    ];

    BINARY_EXTS.contains(&ext.as_str())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_split_lines_empty() {
        let result = split_lines("");
        assert_eq!(result, vec![""]);
    }

    #[test]
    fn test_split_lines_single_line() {
        let result = split_lines("hello");
        assert_eq!(result, vec!["hello"]);
    }

    #[test]
    fn test_split_lines_multiple() {
        let result = split_lines("a\nb\nc");
        assert_eq!(result, vec!["a", "b", "c"]);
    }

    #[test]
    fn test_split_lines_trailing_newline() {
        let result = split_lines("a\nb\n");
        assert_eq!(result, vec!["a", "b", ""]);
    }

    #[test]
    fn test_format_size_bytes() {
        assert_eq!(format_size(0), "0 B");
        assert_eq!(format_size(512), "512 B");
        assert_eq!(format_size(1023), "1023 B");
    }

    #[test]
    fn test_format_size_kb() {
        assert_eq!(format_size(1024), "1.0 KB");
        assert_eq!(format_size(1536), "1.5 KB");
    }

    #[test]
    fn test_format_size_mb() {
        assert_eq!(format_size(1048576), "1.0 MB");
        assert_eq!(format_size(1572864), "1.5 MB");
    }

    #[test]
    fn test_format_size_gb() {
        let gb = 1073741824u64;
        assert_eq!(format_size(gb), "1.0 GB");
    }

    #[test]
    fn test_format_size_tb() {
        let tb = 1099511627776u64;
        assert_eq!(format_size(tb), "1.0 TB");
    }

    #[test]
    fn test_detect_mime_text() {
        assert_eq!(detect_mime("file.txt"), "text/plain");
        assert_eq!(detect_mime("file.md"), "text/markdown");
        assert_eq!(detect_mime("file.rs"), "text/x-rust");
    }

    #[test]
    fn test_detect_mime_image() {
        assert_eq!(detect_mime("photo.jpg"), "image/jpeg");
        assert_eq!(detect_mime("photo.png"), "image/png");
        assert_eq!(detect_mime("icon.svg"), "image/svg+xml");
    }

    #[test]
    fn test_detect_mime_unknown() {
        assert_eq!(detect_mime("file.unknown"), "application/octet-stream");
    }

    #[test]
    fn test_detect_mime_no_extension() {
        assert_eq!(detect_mime("Makefile"), "application/octet-stream");
    }

    #[test]
    fn test_is_binary_true() {
        assert!(is_binary("file.exe"));
        assert!(is_binary("image.jpg"));
        assert!(is_binary("archive.zip"));
        assert!(is_binary("binary.so"));
    }

    #[test]
    fn test_is_binary_false() {
        assert!(!is_binary("main.rs"));
        assert!(!is_binary("index.html"));
        assert!(!is_binary("script.py"));
    }

    #[test]
    fn test_hex_encode_empty() {
        assert_eq!(hex_encode(b""), "");
    }

    #[test]
    fn test_hex_encode_basic() {
        assert_eq!(hex_encode(b"hello"), "68656c6c6f");
    }

    #[test]
    fn test_hex_encode_binary() {
        assert_eq!(hex_encode(&[0x00, 0xff, 0xab]), "00ffab");
    }

    #[test]
    fn test_parse_mode_valid() {
        let perm = parse_mode("755").unwrap();
        #[cfg(unix)]
        {
            use std::os::unix::fs::PermissionsExt;
            assert_eq!(perm.mode() & 0o777, 0o755);
        }
    }

    #[test]
    fn test_parse_mode_invalid() {
        assert!(parse_mode("abc").is_err());
        assert!(parse_mode("").is_err());
    }
}

pub fn read_stdin() -> anyhow::Result<String> {
    use std::io::{IsTerminal, Read};
    if std::io::stdin().is_terminal() {
        anyhow::bail!("no content provided (pipe content or pass as argument)");
    }
    let mut data = String::new();
    std::io::stdin().read_to_string(&mut data)?;
    if data.ends_with('\n') {
        data.pop();
    }
    Ok(data)
}

pub fn hex_encode(bytes: &[u8]) -> String {
    const HEX: &[u8] = b"0123456789abcdef";
    let mut s = String::with_capacity(bytes.len() * 2);
    for &b in bytes {
        s.push(HEX[(b >> 4) as usize] as char);
        s.push(HEX[(b & 0xf) as usize] as char);
    }
    s
}
