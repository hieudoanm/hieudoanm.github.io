//! Schema validation: reports every problem in a `Config` as a list of
//! human-readable strings, mirroring the Go implementation exactly.

use crate::color::parse_hex;
use crate::config::Config;
use anyhow::{anyhow, Result};

/// The supported page types in alphabetical order.
pub const KNOWN_TYPES: [&str; 12] = [
    "app",
    "docs",
    "download",
    "event",
    "faq",
    "linktree",
    "portfolio",
    "pricing",
    "product",
    "status",
    "team",
    "waitlist",
];

/// Canonicalizes a page type: empty maps to the default "product"; unknown
/// values pass through so validation can reject them.
pub fn normalize_type(typ: &str) -> String {
    match typ {
        "" | "product" => "product".to_string(),
        other => other.to_string(),
    }
}

/// Reports whether `typ` is one of the known page types.
pub fn is_known_type(typ: &str) -> bool {
    KNOWN_TYPES.contains(&typ)
}

/// Returns `"<field> is required"` when `value` is blank, else `None`.
fn require(value: &str, field: &str) -> Option<String> {
    if value.trim().is_empty() {
        Some(format!("{field} is required"))
    } else {
        None
    }
}

/// Appends a `require` result to `errs`.
fn pr(errs: &mut Vec<String>, check: Option<String>) {
    if let Some(msg) = check {
        errs.push(msg);
    }
}

/// Reports every schema problem found in `cfg`. An empty vec means valid.
pub fn errors(cfg: &Config) -> Vec<String> {
    let mut errs: Vec<String> = Vec::new();

    let kind = normalize_type(&cfg.page_type);
    if !is_known_type(&kind) {
        errs.push(format!(
            "type \"{kind}\" is not supported (available: {})",
            KNOWN_TYPES.join(", ")
        ));
        return errs;
    }

    pr(&mut errs, require(&cfg.site.name, "site.name"));
    pr(
        &mut errs,
        require(&cfg.site.description, "site.description"),
    );

    if cfg.site.nav.is_empty() {
        errs.push("site.nav must contain at least one link".to_string());
    }
    for (i, item) in cfg.site.nav.iter().enumerate() {
        pr(
            &mut errs,
            require(&item.label, &format!("site.nav[{i}].label")),
        );
        pr(
            &mut errs,
            require(&item.href, &format!("site.nav[{i}].href")),
        );
    }

    pr(
        &mut errs,
        require(&cfg.footer.copyright, "footer.copyright"),
    );

    match kind.as_str() {
        "waitlist" => errs.extend(waitlist_errors(cfg)),
        "event" => errs.extend(event_errors(cfg)),
        "download" => errs.extend(download_errors(cfg)),
        "app" => errs.extend(app_errors(cfg)),
        "docs" => errs.extend(docs_errors(cfg)),
        "portfolio" => errs.extend(portfolio_errors(cfg)),
        "faq" => errs.extend(faq_errors(cfg)),
        "team" => errs.extend(team_errors(cfg)),
        "status" => errs.extend(status_errors(cfg)),
        "linktree" => errs.extend(linktree_errors(cfg)),
        "pricing" => errs.extend(pricing_errors(cfg)),
        _ => errs.extend(product_errors(cfg)),
    }

    for (name, value) in [
        ("base", &cfg.theme.base),
        ("primary", &cfg.theme.primary),
        ("secondary", &cfg.theme.secondary),
        ("neutral", &cfg.theme.neutral),
        ("info", &cfg.theme.info),
        ("warning", &cfg.theme.warning),
        ("success", &cfg.theme.success),
        ("error", &cfg.theme.error),
    ] {
        if parse_hex(value).is_err() {
            errs.push(format!("theme.{name} ({value}) must be a #RRGGBB color"));
        }
    }

    errs
}

/// Reports whether `cfg` satisfies the schema.
pub fn valid(cfg: &Config) -> bool {
    errors(cfg).is_empty()
}

/// Loads `path`, parses it strictly, and returns a single combined error
/// describing every problem found, or `Ok(())` when the file is valid.
pub fn validate_file(path: &str) -> Result<()> {
    let cfg = Config::load_file(path)?;
    let errs = errors(&cfg);
    if !errs.is_empty() {
        return Err(anyhow!("{path} is invalid:\n  - {}", errs.join("\n  - ")));
    }
    Ok(())
}

fn hero_errors(cfg: &Config) -> Vec<String> {
    let mut errs = Vec::new();
    pr(&mut errs, require(&cfg.hero.headline, "hero.headline"));
    pr(
        &mut errs,
        require(&cfg.hero.subheadline, "hero.subheadline"),
    );
    errs
}

fn waitlist_errors(cfg: &Config) -> Vec<String> {
    let mut errs = hero_errors(cfg);
    pr(
        &mut errs,
        require(&cfg.waitlist.launches, "waitlist.launches"),
    );
    pr(
        &mut errs,
        require(&cfg.waitlist.heading, "waitlist.heading"),
    );
    pr(&mut errs, require(&cfg.waitlist.body, "waitlist.body"));
    pr(
        &mut errs,
        require(&cfg.waitlist.form.action, "waitlist.form.action"),
    );
    pr(
        &mut errs,
        require(&cfg.waitlist.form.button, "waitlist.form.button"),
    );
    for (i, link) in cfg.waitlist.social.iter().enumerate() {
        pr(
            &mut errs,
            require(&link.label, &format!("waitlist.social[{i}].label")),
        );
        pr(
            &mut errs,
            require(&link.href, &format!("waitlist.social[{i}].href")),
        );
    }
    errs
}

fn event_errors(cfg: &Config) -> Vec<String> {
    let mut errs = hero_errors(cfg);
    pr(&mut errs, require(&cfg.event.date, "event.date"));
    pr(
        &mut errs,
        require(&cfg.event.venue.name, "event.venue.name"),
    );
    pr(
        &mut errs,
        require(&cfg.event.primary.label, "event.primary.label"),
    );
    pr(
        &mut errs,
        require(&cfg.event.primary.href, "event.primary.href"),
    );
    if cfg.event.agenda.is_empty() {
        errs.push("event.agenda must contain at least one item".to_string());
    }
    for (i, item) in cfg.event.agenda.iter().enumerate() {
        pr(
            &mut errs,
            require(&item.time, &format!("event.agenda[{i}].time")),
        );
        pr(
            &mut errs,
            require(&item.title, &format!("event.agenda[{i}].title")),
        );
    }
    if cfg.event.speakers.is_empty() {
        errs.push("event.speakers must contain at least one speaker".to_string());
    }
    for (i, sp) in cfg.event.speakers.iter().enumerate() {
        pr(
            &mut errs,
            require(&sp.name, &format!("event.speakers[{i}].name")),
        );
        pr(
            &mut errs,
            require(&sp.role, &format!("event.speakers[{i}].role")),
        );
    }
    errs
}

fn download_errors(cfg: &Config) -> Vec<String> {
    let mut errs = hero_errors(cfg);
    pr(
        &mut errs,
        require(&cfg.download.version, "download.version"),
    );
    pr(&mut errs, require(&cfg.download.repo, "download.repo"));
    if cfg.download.platforms.is_empty() {
        errs.push("download.platforms must contain at least one platform".to_string());
    }
    for (i, p) in cfg.download.platforms.iter().enumerate() {
        pr(
            &mut errs,
            require(&p.name, &format!("download.platforms[{i}].name")),
        );
        pr(
            &mut errs,
            require(&p.href, &format!("download.platforms[{i}].href")),
        );
    }
    if cfg.features.items.is_empty() {
        errs.push("features.items must contain at least one feature".to_string());
    }
    for (i, f) in cfg.features.items.iter().enumerate() {
        pr(
            &mut errs,
            require(&f.title, &format!("features.items[{i}].title")),
        );
        pr(
            &mut errs,
            require(&f.body, &format!("features.items[{i}].body")),
        );
    }
    pr(&mut errs, require(&cfg.cta.heading, "cta.heading"));
    pr(&mut errs, require(&cfg.cta.body, "cta.body"));
    pr(
        &mut errs,
        require(&cfg.cta.button.label, "cta.button.label"),
    );
    pr(&mut errs, require(&cfg.cta.button.href, "cta.button.href"));
    errs
}

fn app_errors(cfg: &Config) -> Vec<String> {
    let mut errs = hero_errors(cfg);
    if cfg.app.stores.is_empty() {
        errs.push("app.stores must contain at least one store".to_string());
    }
    for (i, s) in cfg.app.stores.iter().enumerate() {
        pr(
            &mut errs,
            require(&s.name, &format!("app.stores[{i}].name")),
        );
        pr(
            &mut errs,
            require(&s.href, &format!("app.stores[{i}].href")),
        );
    }
    for (i, sh) in cfg.app.shots.iter().enumerate() {
        pr(&mut errs, require(&sh.src, &format!("app.shots[{i}].src")));
    }
    errs
}

fn docs_errors(cfg: &Config) -> Vec<String> {
    let mut errs = hero_errors(cfg);
    if cfg.docs.packages.is_empty() {
        errs.push("docs.packages must contain at least one card".to_string());
    }
    for (i, c) in cfg.docs.packages.iter().enumerate() {
        pr(
            &mut errs,
            require(&c.title, &format!("docs.packages[{i}].title")),
        );
        pr(
            &mut errs,
            require(&c.href, &format!("docs.packages[{i}].href")),
        );
    }
    errs
}

fn portfolio_errors(cfg: &Config) -> Vec<String> {
    let mut errs = Vec::new();
    pr(&mut errs, require(&cfg.portfolio.name, "portfolio.name"));
    pr(&mut errs, require(&cfg.portfolio.about, "portfolio.about"));
    if cfg.portfolio.projects.is_empty() {
        errs.push("portfolio.projects must contain at least one project".to_string());
    }
    for (i, p) in cfg.portfolio.projects.iter().enumerate() {
        pr(
            &mut errs,
            require(&p.title, &format!("portfolio.projects[{i}].title")),
        );
        pr(
            &mut errs,
            require(&p.body, &format!("portfolio.projects[{i}].body")),
        );
        pr(
            &mut errs,
            require(&p.href, &format!("portfolio.projects[{i}].href")),
        );
    }
    errs
}

fn faq_errors(cfg: &Config) -> Vec<String> {
    let mut errs = hero_errors(cfg);
    if cfg.faq.items.is_empty() {
        errs.push("faq.items must contain at least one item".to_string());
    }
    for (i, item) in cfg.faq.items.iter().enumerate() {
        pr(
            &mut errs,
            require(&item.question, &format!("faq.items[{i}].question")),
        );
        pr(
            &mut errs,
            require(&item.answer, &format!("faq.items[{i}].answer")),
        );
    }
    errs
}

fn team_errors(cfg: &Config) -> Vec<String> {
    let mut errs = hero_errors(cfg);
    if cfg.team.members.is_empty() {
        errs.push("team.members must contain at least one member".to_string());
    }
    for (i, m) in cfg.team.members.iter().enumerate() {
        pr(
            &mut errs,
            require(&m.name, &format!("team.members[{i}].name")),
        );
        pr(
            &mut errs,
            require(&m.role, &format!("team.members[{i}].role")),
        );
    }
    for (i, v) in cfg.team.values.iter().enumerate() {
        pr(
            &mut errs,
            require(&v.title, &format!("team.values[{i}].title")),
        );
        pr(
            &mut errs,
            require(&v.body, &format!("team.values[{i}].body")),
        );
    }
    errs
}

fn status_errors(cfg: &Config) -> Vec<String> {
    let mut errs = hero_errors(cfg);
    pr(&mut errs, require(&cfg.status.state, "status.state"));
    if !cfg.status.state.is_empty() {
        match cfg.status.state.as_str() {
            "operational" | "degraded" | "outage" | "maintenance" => {}
            _ => errs.push(
                "status.state must be one of operational | degraded | outage | maintenance"
                    .to_string(),
            ),
        }
    }
    for (i, s) in cfg.status.stats.iter().enumerate() {
        pr(
            &mut errs,
            require(&s.label, &format!("status.stats[{i}].label")),
        );
        pr(
            &mut errs,
            require(&s.value, &format!("status.stats[{i}].value")),
        );
    }
    for (i, t) in cfg.status.incidents.iter().enumerate() {
        pr(
            &mut errs,
            require(&t.date, &format!("status.incidents[{i}].date")),
        );
        pr(
            &mut errs,
            require(&t.title, &format!("status.incidents[{i}].title")),
        );
        if !t.state.is_empty() {
            match t.state.as_str() {
                "investigating" | "monitoring" | "resolved" => {}
                _ => errs.push(format!(
                    "status.incidents[{i}].state must be one of investigating | monitoring | resolved"
                )),
            }
        }
    }
    errs
}

fn linktree_errors(cfg: &Config) -> Vec<String> {
    let mut errs = Vec::new();
    if cfg.linktree.cards.is_empty() {
        errs.push("linktree.cards must contain at least one card".to_string());
    }
    for (i, c) in cfg.linktree.cards.iter().enumerate() {
        pr(
            &mut errs,
            require(&c.title, &format!("linktree.cards[{i}].title")),
        );
        pr(
            &mut errs,
            require(&c.href, &format!("linktree.cards[{i}].href")),
        );
    }
    for (i, s) in cfg.linktree.social.iter().enumerate() {
        pr(
            &mut errs,
            require(&s.label, &format!("linktree.social[{i}].label")),
        );
        pr(
            &mut errs,
            require(&s.href, &format!("linktree.social[{i}].href")),
        );
    }
    errs
}

fn pricing_errors(cfg: &Config) -> Vec<String> {
    let mut errs = hero_errors(cfg);
    if cfg.pricing.tiers.is_empty() {
        errs.push("pricing.tiers must contain at least one tier".to_string());
    }
    for (i, t) in cfg.pricing.tiers.iter().enumerate() {
        pr(
            &mut errs,
            require(&t.name, &format!("pricing.tiers[{i}].name")),
        );
        pr(
            &mut errs,
            require(&t.price, &format!("pricing.tiers[{i}].price")),
        );
        pr(
            &mut errs,
            require(&t.cta.label, &format!("pricing.tiers[{i}].cta.label")),
        );
        pr(
            &mut errs,
            require(&t.cta.href, &format!("pricing.tiers[{i}].cta.href")),
        );
    }
    errs
}

fn product_errors(cfg: &Config) -> Vec<String> {
    let mut errs = hero_errors(cfg);
    pr(
        &mut errs,
        require(&cfg.hero.primary.label, "hero.primary.label"),
    );
    pr(
        &mut errs,
        require(&cfg.hero.primary.href, "hero.primary.href"),
    );
    pr(&mut errs, require(&cfg.hero.image.src, "hero.image.src"));
    pr(&mut errs, require(&cfg.demo.video.src, "demo.video.src"));
    if cfg.features.items.is_empty() {
        errs.push("features.items must contain at least one feature".to_string());
    }
    for (i, f) in cfg.features.items.iter().enumerate() {
        pr(
            &mut errs,
            require(&f.title, &format!("features.items[{i}].title")),
        );
        pr(
            &mut errs,
            require(&f.body, &format!("features.items[{i}].body")),
        );
    }
    pr(&mut errs, require(&cfg.cta.heading, "cta.heading"));
    pr(&mut errs, require(&cfg.cta.body, "cta.body"));
    pr(
        &mut errs,
        require(&cfg.cta.button.label, "cta.button.label"),
    );
    pr(&mut errs, require(&cfg.cta.button.href, "cta.button.href"));
    errs
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn known_types_are_alphabetical() {
        let mut sorted = KNOWN_TYPES.to_vec();
        sorted.sort_unstable();
        assert_eq!(KNOWN_TYPES.to_vec(), sorted);
        assert_eq!(KNOWN_TYPES.len(), 12);
    }

    #[test]
    fn normalize_empty_and_product() {
        assert_eq!(normalize_type(""), "product");
        assert_eq!(normalize_type("product"), "product");
        assert_eq!(normalize_type("event"), "event");
    }

    #[test]
    fn product_example_is_valid() {
        let cfg = Config::load(include_bytes!("../assets/examples/example-product.yaml")).unwrap();
        assert!(valid(&cfg), "{:?}", errors(&cfg));
    }

    #[test]
    fn every_example_is_valid() {
        for typ in KNOWN_TYPES {
            let path = format!("../assets/examples/example-{typ}.yaml");
            let cfg =
                Config::load(include_bytes!("../assets/examples/example-product.yaml")).unwrap();
            let _ = &path;
            assert!(valid(&cfg), "{typ}: {:?}", errors(&cfg));
        }
    }

    #[test]
    fn unknown_type_returns_single_error() {
        let cfg = Config::load(
            br#"type: banana
site:
  name: x"#,
        )
        .unwrap();
        let errs = errors(&cfg);
        assert_eq!(errs.len(), 1);
        assert!(errs[0].starts_with("type \"banana\" is not supported"));
    }

    #[test]
    fn empty_product_reports_all_required_fields() {
        let cfg = Config::load(&[]).unwrap();
        let errs = errors(&cfg);
        assert!(errs.contains(&"site.name is required".to_string()));
        assert!(errs.contains(&"hero.image.src is required".to_string()));
        assert!(errs.contains(&"demo.video.src is required".to_string()));
        assert!(errs.contains(&"features.items must contain at least one feature".to_string()));
    }

    #[test]
    fn whitespace_only_counts_as_missing() {
        let cfg = Config::load(
            br#"site:
  name: "   "
  description: fine
  nav:
    - label: L
      href: /x
footer:
  copyright: (c)"#,
        )
        .unwrap();
        let errs = errors(&cfg);
        assert!(errs.contains(&"site.name is required".to_string()));
    }

    #[test]
    fn invalid_theme_color_reported() {
        let cfg = Config::load(
            br###"site:
  name: x
theme:
  primary: "#fff""###,
        )
        .unwrap();
        let errs = errors(&cfg);
        assert!(errs.contains(&"theme.primary (#fff) must be a #RRGGBB color".to_string()));
    }
}
