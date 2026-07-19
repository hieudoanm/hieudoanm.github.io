//! Config: the strict YAML schema for `landify.yaml`.
//!
//! Mirrors the Go implementation: every struct decodes with
//! `deny_unknown_fields` (like `yaml.Decoder.KnownFields(true)`), missing
//! fields fall back to their zero value (like Go's zero-init), and the theme
//! section merges with the built-in defaults after parsing.

use anyhow::{anyhow, Context, Result};
use serde::{Deserialize, Serialize};

/// Top-level schema. `page_type` selects the template; it defaults to
/// "product" when empty.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Config {
    #[serde(rename = "type")]
    pub page_type: String,
    pub theme: Theme,
    pub site: Site,
    pub hero: Hero,
    pub features: Features,
    pub demo: Demo,
    pub cta: Cta,
    pub footer: Footer,
    pub waitlist: Waitlist,
    pub event: Event,
    pub download: Download,
    pub pricing: Pricing,
    pub app: App,
    pub portfolio: Portfolio,
    pub docs: Docs,
    pub faq: Faq,
    pub team: Team,
    pub status: Status,
    pub linktree: Linktree,
}

impl Config {
    /// Loads `data` as a Strict YAML config, rejecting unknown fields, then
    /// fills empty theme fields with the defaults.
    pub fn load(data: &[u8]) -> Result<Config> {
        let mut cfg: Config =
            serde_yaml::from_slice(data).map_err(|e| anyhow!("parse yaml: {e}"))?;
        cfg.theme = cfg.theme.merged();
        Ok(cfg)
    }

    /// Loads and parses the YAML file at `path`.
    pub fn load_file(path: &str) -> Result<Config> {
        let data = std::fs::read(path).with_context(|| format!("read {path}"))?;
        Self::load(&data)
    }
}

/// Design input. Only the base colors are authored; every other `:root` token
/// (surfaces, borders, text-on-accent, dark/tint variants) is derived by
/// `crate::color::tokens`. `radius` is a CSS value, not a color.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Theme {
    pub base: String,
    pub primary: String,
    pub secondary: String,
    pub neutral: String,
    pub info: String,
    pub warning: String,
    pub success: String,
    pub error: String,
    pub radius: String,
}

/// The fallback palette used for any theme field a YAML leaves empty.
impl Theme {
    pub fn defaults() -> Theme {
        Theme {
            base: "#f7f8fa".into(),
            primary: "#0d9488".into(),
            secondary: "#7c3aed".into(),
            neutral: "#555f6e".into(),
            info: "#2563eb".into(),
            warning: "#d97706".into(),
            success: "#16a34a".into(),
            error: "#dc2626".into(),
            radius: "10px".into(),
        }
    }

    /// Fills empty fields with their defaults, so a YAML that omits the whole
    /// section (or individual colors) still resolves completely.
    pub fn merged(self) -> Theme {
        let d = Theme::defaults();
        Theme {
            base: if self.base.is_empty() {
                d.base
            } else {
                self.base
            },
            primary: if self.primary.is_empty() {
                d.primary
            } else {
                self.primary
            },
            secondary: if self.secondary.is_empty() {
                d.secondary
            } else {
                self.secondary
            },
            neutral: if self.neutral.is_empty() {
                d.neutral
            } else {
                self.neutral
            },
            info: if self.info.is_empty() {
                d.info
            } else {
                self.info
            },
            warning: if self.warning.is_empty() {
                d.warning
            } else {
                self.warning
            },
            success: if self.success.is_empty() {
                d.success
            } else {
                self.success
            },
            error: if self.error.is_empty() {
                d.error
            } else {
                self.error
            },
            radius: if self.radius.is_empty() {
                d.radius
            } else {
                self.radius
            },
        }
    }
}

/// Brand identity and global navigation.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Site {
    pub name: String,
    pub mark: String,
    pub description: String,
    pub nav: Vec<NavItem>,
}

/// A single link shown in the navbar and footer.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct NavItem {
    pub label: String,
    pub href: String,
}

/// The first section visitors see.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Hero {
    pub badge: String,
    pub headline: String,
    pub subheadline: String,
    pub primary: Button,
    pub secondary: Button,
    pub image: HeroImage,
}

/// A labelled link used for call-to-action buttons.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Button {
    pub label: String,
    pub href: String,
}

/// The required 16:9 hero image shown in the hero section.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct HeroImage {
    pub src: String,
    pub alt: String,
}

/// A grid of feature cards.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Features {
    pub heading: String,
    pub sub: String,
    pub items: Vec<Feature>,
}

/// A single card with an emoji icon.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Feature {
    pub icon: String,
    pub title: String,
    pub body: String,
}

/// A video walkthrough rendered in a 16:9 frame.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Demo {
    pub heading: String,
    pub sub: String,
    pub video: Video,
}

/// The required demo video; `poster` is an optional frame shown before
/// playback. `track` points to a WebVTT descriptions/captions file.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Video {
    pub src: String,
    pub poster: String,
    pub track: String,
}

/// The closing call to action.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Cta {
    pub icon: String,
    pub heading: String,
    pub body: String,
    pub button: Button,
}

/// Copyright line and a set of links.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Footer {
    pub copyright: String,
    pub links: Vec<NavItem>,
}

/// Powers the "waitlist" page type: an email capture panel with an optional
/// launch date and social links.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Waitlist {
    pub launches: String,
    pub heading: String,
    pub body: String,
    pub form: Form,
    pub social: Vec<NavItem>,
}

/// The email capture form of a waitlist page.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Form {
    pub action: String,
    pub placeholder: String,
    pub button: String,
}

/// Powers the "event" page type: a conference-style page with a date/venue
/// strip, an agenda timeline, and a speaker grid.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Event {
    pub date: String,
    pub time: String,
    pub venue: EventVenue,
    pub primary: Button,
    #[serde(rename = "speakers_heading")]
    pub speakers_heading: String,
    #[serde(rename = "speakers_sub")]
    pub speakers_sub: String,
    pub agenda: Vec<AgendaItem>,
    pub speakers: Vec<Speaker>,
}

/// The location shown in the event meta strip.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct EventVenue {
    pub name: String,
    pub city: String,
    pub address: String,
}

/// A single timed slot in the event agenda.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct AgendaItem {
    pub time: String,
    pub title: String,
    pub body: String,
    pub speaker: String,
}

/// A person card in the event speaker grid.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Speaker {
    pub name: String,
    pub role: String,
    pub avatar: String,
}

/// Powers the "download" page type: a release page with version/license
/// badges, per-OS download buttons, and an install snippet.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Download {
    pub version: String,
    pub license: String,
    pub repo: String,
    pub install: String,
    pub platforms: Vec<Platform>,
}

/// One OS/arch download button on a download page.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Platform {
    pub name: String,
    pub icon: String,
    pub href: String,
}

/// Powers the "pricing" page type: a grid of tier cards with a highlighted
/// plan and an optional footnote.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Pricing {
    pub heading: String,
    pub sub: String,
    pub note: String,
    pub tiers: Vec<PricingTier>,
}

/// One card in a pricing grid.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct PricingTier {
    pub name: String,
    pub price: String,
    pub period: String,
    pub tag: String,
    pub cta: Button,
    pub perks: Vec<String>,
}

/// Powers the "app" page type: store badges, a rating line, and an optional
/// portrait screenshot gallery.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct App {
    pub stores: Vec<AppStore>,
    pub ratings: String,
    pub reviews: String,
    pub shots: Vec<Shot>,
}

/// A store download link (App Store, Play Store, ...) with an optional emoji
/// icon.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct AppStore {
    pub name: String,
    pub icon: String,
    pub href: String,
}

/// One portrait (9:16) app screenshot with an optional caption.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Shot {
    pub title: String,
    pub src: String,
}

/// Powers the "portfolio" page type: a personal page with an avatar, skills
/// chips, and a project card grid.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Portfolio {
    pub name: String,
    pub role: String,
    pub location: String,
    pub avatar: String,
    pub about: String,
    pub skills: Vec<String>,
    pub projects: Vec<Project>,
}

/// A card in a portfolio project grid.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Project {
    pub icon: String,
    pub title: String,
    pub body: String,
    pub href: String,
}

/// Powers the "docs" page type: a documentation landing page with topic card
/// links and an optional code sample.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Docs {
    pub heading: String,
    pub sub: String,
    pub sample: String,
    pub packages: Vec<DocCard>,
}

/// A linked topic card on a docs landing page.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct DocCard {
    pub icon: String,
    pub title: String,
    pub body: String,
    pub href: String,
}

/// Powers the "faq" page type: a question-and-answer list rendered with
/// native `<details>`/`<summary>` elements, so it needs no JavaScript.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Faq {
    pub heading: String,
    pub sub: String,
    pub items: Vec<FaqItem>,
}

/// A single question with its answer.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct FaqItem {
    pub question: String,
    pub answer: String,
}

/// Powers the "team" page type: an optional values strip above a grid of
/// member cards.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Team {
    pub heading: String,
    pub sub: String,
    pub values: Vec<TeamValue>,
    pub members: Vec<TeamMember>,
}

/// One principle card in a team values strip.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct TeamValue {
    pub icon: String,
    pub title: String,
    pub body: String,
}

/// One person card on a team page.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct TeamMember {
    pub name: String,
    pub role: String,
    pub bio: String,
    pub avatar: String,
}

/// Powers the "status" page type: a current-service-state banner with
/// optional uptime stats and a recent incidents list.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Status {
    pub heading: String,
    pub sub: String,
    pub state: String,
    pub updated: String,
    pub announcement: String,
    pub stats: Vec<StatusStat>,
    pub incidents: Vec<StatusTicket>,
}

/// One uptime/health figure (label/value pair).
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct StatusStat {
    pub label: String,
    pub value: String,
}

/// One row in the recent incidents list.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct StatusTicket {
    pub date: String,
    pub title: String,
    pub state: String,
    pub body: String,
}

/// Powers the "linktree" page type: a compact profile page with a centered
/// list of big link cards and optional social links. It has no hero section.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct Linktree {
    pub heading: String,
    pub sub: String,
    pub avatar: String,
    pub cards: Vec<LinkCard>,
    pub social: Vec<NavItem>,
}

/// One big rounded button on a linktree page.
#[derive(Debug, Clone, Default, Deserialize, Serialize)]
#[serde(default, deny_unknown_fields)]
pub struct LinkCard {
    pub title: String,
    pub href: String,
    pub icon: String,
    pub note: String,
}

#[cfg(test)]
mod tests {
    use super::*;

    const PRODUCT: &str = include_str!("../assets/examples/example-product.yaml");

    #[test]
    fn loads_product_example() {
        let cfg = Config::load(PRODUCT.as_bytes()).unwrap();
        assert_eq!(cfg.site.name, "Landify");
        assert_eq!(cfg.theme.primary, "#0d9488");
    }

    #[test]
    fn empty_type_defaults_to_product() {
        let cfg = Config::load(b"site:\n  name: hi\n").unwrap();
        assert_eq!(cfg.page_type, "");
        assert_eq!(crate::validate::normalize_type(&cfg.page_type), "product");
    }

    #[test]
    fn missing_theme_merges_defaults() {
        let cfg = Config::load(b"site:\n  name: hi\n").unwrap();
        assert_eq!(cfg.theme.radius, "10px");
        assert_eq!(cfg.theme.primary, "#0d9488");
        assert_eq!(cfg.theme.base, "#f7f8fa");
    }

    #[test]
    fn partial_theme_merges_missing_colors() {
        let cfg = Config::load(b"theme:\n  primary: \"#112233\"\n").unwrap();
        assert_eq!(cfg.theme.primary, "#112233");
        assert_eq!(cfg.theme.radius, "10px");
    }

    #[test]
    fn unknown_field_rejected() {
        let err = Config::load(b"banana: true\n").unwrap_err();
        assert!(err.to_string().contains("banana"));
    }

    #[test]
    fn unknown_nested_field_rejected() {
        let err = Config::load(b"site:\n  nope: x\n").unwrap_err();
        assert!(err.to_string().contains("nope"));
    }
}
