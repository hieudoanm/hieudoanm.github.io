#[derive(Debug, Clone)]
pub struct Options {
    pub width: i32,
    pub height: i32,
    pub full_page: bool,
    pub delay_ms: u64,
    pub quality: i32,
    pub pdf: bool,
}

impl Default for Options {
    fn default() -> Self {
        Self {
            width: 1440,
            height: 900,
            full_page: false,
            delay_ms: 0,
            quality: 90,
            pdf: false,
        }
    }
}

pub fn default_options() -> Options {
    Options::default()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_options() {
        let opts = default_options();
        assert_eq!(opts.width, 1440);
        assert_eq!(opts.height, 900);
        assert!(!opts.full_page);
        assert_eq!(opts.delay_ms, 0);
        assert_eq!(opts.quality, 90);
        assert!(!opts.pdf);
    }

    #[test]
    fn test_options_default_trait() {
        let opts = Options::default();
        assert_eq!(opts.width, 1440);
        assert_eq!(opts.height, 900);
    }
}

pub fn capture(_url: &str, _opts: Options) -> Result<Vec<u8>, anyhow::Error> {
    anyhow::bail!(
        "headless browser capture requires the `headless_chrome` crate which is not yet integrated"
    )
}
