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

pub fn capture(_url: &str, _opts: Options) -> Result<Vec<u8>, anyhow::Error> {
    anyhow::bail!("headless browser capture requires the `headless_chrome` crate which is not yet integrated")
}
