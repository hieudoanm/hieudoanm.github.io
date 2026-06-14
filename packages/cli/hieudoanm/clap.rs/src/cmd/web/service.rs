use anyhow::{Context, Result};
use std::time::Duration;

pub struct ShopifyResult {
    pub is_shopify: bool,
    pub is_plus: bool,
    pub signals: Vec<String>,
}

pub fn check_shopify(url: &str) -> Result<ShopifyResult> {
    let client = reqwest::blocking::Client::builder()
        .timeout(Duration::from_secs(10))
        .build()
        .context("failed to build HTTP client")?;

    let resp = client
        .get(url)
        .header("User-Agent", "shopify-check/1.0")
        .send()
        .context("request failed")?;

    let mut result = ShopifyResult {
        is_shopify: false,
        is_plus: false,
        signals: Vec::new(),
    };

    for (key, value) in resp.headers().iter() {
        let lk = key.as_str().to_lowercase();

        if lk.starts_with("x-shopify") {
            result.is_shopify = true;
            result.signals.push(format!("Header: {}", key.as_str()));

            if lk == "x-shopify-stage" || lk == "x-shopify-shop-api-call-limit" {
                result.is_plus = true;
            }
        }

        if let Ok(v) = value.to_str() {
            if v.to_lowercase().contains("shopify") {
                result.is_shopify = true;
                result
                    .signals
                    .push(format!("Header value: {}", key.as_str()));
            }
        }
    }

    let body = resp.text().context("failed to read response body")?;
    let html = body.to_lowercase();

    if html.contains("cdn.shopify.com") {
        result.is_shopify = true;
        result.signals.push("HTML: cdn.shopify.com".into());
    }

    if html.contains("shopify-section") {
        result.is_shopify = true;
        result.signals.push("HTML: shopify-section".into());
    }

    if html.contains("shopify-plus") {
        result.is_plus = true;
        result.signals.push("HTML: shopify-plus".into());
    }

    Ok(result)
}

use regex::Regex;
use serde::Deserialize;

const USER_AGENT: &str = "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 Chrome/90.0.4430.91 Mobile Safari/537.36";
const CLIENT_NAME: &str = "ANDROID";
const CLIENT_VERSION: &str = "20.10.38";

lazy_static::lazy_static! {
    static ref RE_API_KEY: Regex = Regex::new(r#""INNERTUBE_API_KEY":"([^"]+)""#).unwrap();
    static ref RE_PLAYER_RESP: Regex = Regex::new(r"ytInitialPlayerResponse\s*=\s*(\{.+?\})\s*;\s*(?:var\s+(?:meta|head)|</script|\n)").unwrap();
}

#[derive(Debug, Clone, Deserialize)]
#[allow(non_snake_case)]
pub struct CaptionTrack {
    pub base_url: Option<String>,
    #[serde(rename = "baseUrl")]
    pub baseUrl: Option<String>,
    pub language_code: Option<String>,
    #[serde(rename = "languageCode")]
    pub languageCode: Option<String>,
    pub kind: Option<String>,
    pub name: Option<CaptionTrackName>,
    pub is_translatable: Option<bool>,
    #[serde(rename = "isTranslatable")]
    pub isTranslatable: Option<bool>,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(non_snake_case)]
pub struct CaptionTrackName {
    pub simple_text: Option<String>,
    #[serde(rename = "simpleText")]
    pub simpleText: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct Line {
    pub start: f64,
    pub duration: f64,
    pub text: String,
}

#[derive(Debug, Clone)]
pub struct Transcript {
    pub video_id: String,
    pub language: String,
    pub kind: String,
    pub lines: Vec<Line>,
}

#[derive(Debug, Deserialize)]
struct CaptionsResponse {
    captions: Option<CaptionsWrapper>,
}

#[derive(Debug, Deserialize)]
struct CaptionsWrapper {
    #[serde(rename = "playerCaptionsTracklistRenderer")]
    player_captions_tracklist_renderer: Option<PlayerCaptionsTracklistRenderer>,
}

#[derive(Debug, Deserialize)]
struct PlayerCaptionsTracklistRenderer {
    #[serde(rename = "captionTracks")]
    caption_tracks: Option<Vec<CaptionTrack>>,
}

pub struct Client {
    inner: reqwest::blocking::Client,
}

impl Client {
    pub fn new() -> Self {
        Self {
            inner: reqwest::blocking::Client::builder()
                .timeout(Duration::from_secs(15))
                .build()
                .expect("failed to build HTTP client"),
        }
    }

    pub fn fetch(&self, video_id: &str, lang: &str) -> Result<Transcript> {
        let page_html = self.get_page(video_id)?;

        let tracks = self
            .tracks_via_innertube(video_id, &page_html)
            .or_else(|_| self.tracks_via_html_scrape(&page_html))
            .context("could not extract caption tracks")?;

        if tracks.is_empty() {
            anyhow::bail!("no caption tracks found — video may have no captions");
        }

        let track = select_track(&tracks, lang);
        let track = track.ok_or_else(|| {
            let langs = available_langs(&tracks);
            anyhow::anyhow!("no captions for language {:?} (available: {})", lang, langs)
        })?;

        let base_url = track.base_url();
        let lines = self.fetch_captions(&base_url)?;

        let kind = if track.kind() == "asr" {
            "auto-generated".to_string()
        } else {
            "manual".to_string()
        };

        Ok(Transcript {
            video_id: video_id.to_string(),
            language: track.language_code(),
            kind,
            lines,
        })
    }

    fn get_page(&self, video_id: &str) -> Result<String> {
        let url = format!("https://www.youtube.com/watch?v={}", video_id);
        let resp = self
            .inner
            .get(&url)
            .header("User-Agent", USER_AGENT)
            .header("Accept-Language", "en-US,en;q=0.9")
            .send()
            .context("failed to fetch YouTube page")?;
        resp.text().context("failed to read page body")
    }

    fn tracks_via_innertube(&self, video_id: &str, page_html: &str) -> Result<Vec<CaptionTrack>> {
        let api_key = RE_API_KEY
            .captures(page_html)
            .and_then(|c| c.get(1))
            .map(|m| m.as_str())
            .context("INNERTUBE_API_KEY not found in page")?;

        let url = format!("https://www.youtube.com/youtubei/v1/player?key={}", api_key);

        let body = serde_json::json!({
            "context": {
                "client": {
                    "clientName": CLIENT_NAME,
                    "clientVersion": CLIENT_VERSION
                }
            },
            "videoId": video_id
        });

        let resp = self
            .inner
            .post(&url)
            .json(&body)
            .send()
            .context("Innertube request failed")?;

        let text = resp.text().context("failed to read innertube response")?;
        parse_caption_tracks(&text)
    }

    fn tracks_via_html_scrape(&self, page_html: &str) -> Result<Vec<CaptionTrack>> {
        let json_str = RE_PLAYER_RESP
            .captures(page_html)
            .and_then(|c| c.get(1))
            .map(|m| m.as_str())
            .context("ytInitialPlayerResponse not found in page")?;

        parse_caption_tracks(json_str)
    }

    fn fetch_captions(&self, base_url: &str) -> Result<Vec<Line>> {
        let resp = self
            .inner
            .get(base_url)
            .send()
            .context("failed to fetch captions XML")?;

        let text = resp.text().context("failed to read captions response")?;
        parse_timed_text(&text)
    }
}

impl CaptionTrack {
    fn base_url(&self) -> String {
        self.base_url
            .clone()
            .or_else(|| self.baseUrl.clone())
            .unwrap_or_default()
    }

    fn language_code(&self) -> String {
        self.language_code
            .clone()
            .or_else(|| self.languageCode.clone())
            .unwrap_or_default()
    }

    fn kind(&self) -> String {
        self.kind.clone().unwrap_or_default()
    }
}

fn parse_caption_tracks(json_str: &str) -> Result<Vec<CaptionTrack>> {
    let resp: CaptionsResponse = serde_json::from_str(json_str)?;

    let tracks = resp
        .captions
        .and_then(|c| c.player_captions_tracklist_renderer)
        .and_then(|r| r.caption_tracks)
        .unwrap_or_default();

    let tracks: Vec<CaptionTrack> = tracks
        .into_iter()
        .map(|mut t| {
            let raw = t.base_url();
            let unescaped = html_escape::decode_html_entities(&raw).to_string();
            t.base_url = Some(unescaped.clone());
            t.baseUrl = Some(unescaped);
            t
        })
        .collect();

    Ok(tracks)
}

fn parse_timed_text(xml: &str) -> Result<Vec<Line>> {
    #[derive(Debug, Deserialize)]
    struct TimedTextDoc {
        body: Option<TimedTextBody>,
    }

    #[derive(Debug, Deserialize)]
    struct TimedTextBody {
        #[serde(rename = "p")]
        paragraphs: Option<Vec<TimedTextEntry>>,
    }

    #[derive(Debug, Deserialize)]
    struct TimedTextEntry {
        #[serde(rename = "t")]
        start_ms: Option<i64>,
        #[serde(rename = "d")]
        duration_ms: Option<i64>,
        #[serde(rename = "$value")]
        text: Option<String>,
    }

    let doc: TimedTextDoc = quick_xml::de::from_str(xml)?;

    let paragraphs = match doc.body.and_then(|b| b.paragraphs) {
        Some(p) => p,
        None => return Ok(Vec::new()),
    };

    let mut lines = Vec::new();
    for entry in paragraphs {
        let text = entry.text.as_deref().unwrap_or("");
        let text = html_escape::decode_html_entities(text).to_string();
        let text = text.trim().to_string();
        if text.is_empty() {
            continue;
        }

        lines.push(Line {
            start: entry.start_ms.unwrap_or(0) as f64 / 1000.0,
            duration: entry.duration_ms.unwrap_or(0) as f64 / 1000.0,
            text,
        });
    }

    Ok(lines)
}

fn select_track<'a>(tracks: &'a [CaptionTrack], lang: &str) -> Option<&'a CaptionTrack> {
    let mut fallback = None;
    for track in tracks {
        if track.language_code() == lang {
            if track.kind() != "asr" {
                return Some(track);
            }
            fallback = Some(track);
        }
    }
    fallback
}

fn available_langs(tracks: &[CaptionTrack]) -> String {
    let mut seen = std::collections::HashSet::new();
    let mut langs = Vec::new();
    for t in tracks {
        let code = t.language_code();
        if seen.insert(code.clone()) {
            langs.push(code);
        }
    }
    langs.join(", ")
}
