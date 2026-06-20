use std::path::Path;

pub fn generate_thumbnail(path: &Path, max_dim: u32) -> Result<Vec<u8>, String> {
    let img = image::open(path).map_err(|e| format!("open image: {e}"))?;
    let (w, h) = (img.width(), img.height());
    let (new_w, new_h) = if w > h {
        (max_dim, (h * max_dim / w).max(1))
    } else {
        ((w * max_dim / h).max(1), max_dim)
    };
    let resized = img.resize_exact(new_w, new_h, image::imageops::FilterType::CatmullRom);
    let mut buf = std::io::Cursor::new(Vec::new());
    resized
        .write_to(&mut buf, image::ImageFormat::Jpeg)
        .map_err(|e| format!("encode: {e}"))?;
    Ok(buf.into_inner())
}

pub fn is_supported_image(mime: &str) -> bool {
    matches!(mime, "image/jpeg" | "image/png" | "image/webp" | "image/gif")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn supports_jpeg() {
        assert!(is_supported_image("image/jpeg"));
    }

    #[test]
    fn supports_png() {
        assert!(is_supported_image("image/png"));
    }

    #[test]
    fn supports_gif() {
        assert!(is_supported_image("image/gif"));
    }

    #[test]
    fn supports_webp() {
        assert!(is_supported_image("image/webp"));
    }

    #[test]
    fn rejects_text_plain() {
        assert!(!is_supported_image("text/plain"));
    }

    #[test]
    fn rejects_empty_string() {
        assert!(!is_supported_image(""));
    }

    #[test]
    fn rejects_case_insensitive() {
        assert!(!is_supported_image("IMAGE/JPEG"));
    }
}
