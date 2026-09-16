//! Rendering: minijinja (Jinja2) templates over the strict `Config`, with the
//! derived theme tokens spliced into the `@LANDIFY_THEME@` slot.
//!
//! Mirrors the Go `html/template` pipeline: the page type selects the
//! `template-<type>.j2` layout (falling back to `product` for unknown types),
//! partials `header` / `footer` / `base-css` are included, and the resulting
//! HTML bytes are byte-identical to the Go implementation.

use crate::color::{theme_css, tokens};
use crate::config::Config;
use crate::themes::theme_by_name;
use crate::validate::{is_known_type, normalize_type};
use anyhow::{anyhow, Context, Result};
use minijinja::{AutoEscape, Environment, Value};
use std::fs;
use std::path::Path;

/// Marks where the `:root` custom properties are spliced in. Static text so
/// autoescaping leaves it untouched inside the `<style>` element.
const THEME_SLOT: &str = "@LANDIFY_THEME@";

/// All page templates, embedded at compile time.
const PAGE_TEMPLATES: &[(&str, &str)] = &[
    (
        "template-app.j2",
        include_str!("../assets/templates/template-app.j2"),
    ),
    (
        "template-docs.j2",
        include_str!("../assets/templates/template-docs.j2"),
    ),
    (
        "template-download.j2",
        include_str!("../assets/templates/template-download.j2"),
    ),
    (
        "template-event.j2",
        include_str!("../assets/templates/template-event.j2"),
    ),
    (
        "template-faq.j2",
        include_str!("../assets/templates/template-faq.j2"),
    ),
    (
        "template-linktree.j2",
        include_str!("../assets/templates/template-linktree.j2"),
    ),
    (
        "template-portfolio.j2",
        include_str!("../assets/templates/template-portfolio.j2"),
    ),
    (
        "template-pricing.j2",
        include_str!("../assets/templates/template-pricing.j2"),
    ),
    (
        "template-product.j2",
        include_str!("../assets/templates/template-product.j2"),
    ),
    (
        "template-status.j2",
        include_str!("../assets/templates/template-status.j2"),
    ),
    (
        "template-team.j2",
        include_str!("../assets/templates/template-team.j2"),
    ),
    (
        "template-waitlist.j2",
        include_str!("../assets/templates/template-waitlist.j2"),
    ),
];

/// Shared partials, embedded at compile time.
const PARTIALS: &[(&str, &str)] = &[
    ("header.j2", include_str!("../assets/partials/header.j2")),
    ("footer.j2", include_str!("../assets/partials/footer.j2")),
    (
        "base-css.j2",
        include_str!("../assets/partials/base-css.j2"),
    ),
];

/// Returns the landing page HTML for `cfg`.
pub fn render(cfg: &Config) -> Result<Vec<u8>> {
    let mut kind = normalize_type(&cfg.page_type);
    if !is_known_type(&kind) {
        kind = "product".to_string();
    }
    let name = format!("template-{kind}.j2");
    let env = env()?;
    let template = env
        .get_template(&name)
        .map_err(|e| anyhow!("no template for type {kind}: {e}"))?;
    let out = template
        .render(context(cfg))
        .map_err(|e| anyhow!("render {kind} template: {e}"))?;
    let theme = theme_css(&tokens(&cfg.theme)?);
    // Go's `html/template` leaves "/" unescaped in text and quoted attribute
    // contexts, while minijinja emits &#x2f;. Restore the raw slash for parity.
    // It also renders "'" as &#39; while minijinja emits &#x27;.
    Ok(out
        .replace(THEME_SLOT, &theme)
        .replace("&#x2f;", "/")
        .replace("&#x27;", "&#39;")
        .into_bytes())
}

/// Loads `path`, validates it, renders the landing page, and writes it to
/// `output` (creating parent directories as needed). A non-empty `theme_name`
/// overrides the YAML's `theme:` section with a built-in preset.
pub fn build_file(path: &str, output: &str, theme_name: &str) -> Result<()> {
    let mut cfg = Config::load_file(path)?;
    if !theme_name.is_empty() {
        match theme_by_name(theme_name) {
            Some(theme) => cfg.theme = theme,
            None => {
                let available = crate::themes::theme_names().join(", ");
                return Err(anyhow!(
                    "unknown theme \"{theme_name}\" (available: {available})"
                ));
            }
        }
    }
    let errs = crate::validate::errors(&cfg);
    if !errs.is_empty() {
        return Err(anyhow!("{path} is invalid:\n  - {}", errs.join("\n  - ")));
    }
    let html = render(&cfg)?;
    let dir = Path::new(output).parent().unwrap_or_else(|| Path::new(""));
    if !dir.as_os_str().is_empty() && dir != Path::new(".") {
        fs::create_dir_all(dir).with_context(|| format!("create {}", dir.display()))?;
    }
    fs::write(output, html).with_context(|| format!("write {output}"))?;
    Ok(())
}

/// Builds the template environment: all partials and pages registered by
/// filename, HTML autoescaping on (mirrors Go's `html/template`).
fn env() -> Result<Environment<'static>> {
    let mut env = Environment::new();
    env.set_auto_escape_callback(|_| AutoEscape::Html);
    // Go's `html/template` preserves the template's final newline.
    env.set_keep_trailing_newline(true);
    for (name, source) in PARTIALS.iter().chain(PAGE_TEMPLATES) {
        env.add_template(name, source)
            .map_err(|e| anyhow!("parse template {name}: {e}"))?;
    }
    Ok(env)
}

/// The render context: the serialized `Config` under a `config` key.
#[derive(serde::Serialize)]
struct RenderContext<'a> {
    config: &'a Config,
}

fn context(cfg: &Config) -> Value {
    Value::from_serialize(RenderContext { config: cfg })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn product_renders_with_theme_splice() {
        let cfg = Config::load(include_bytes!("../assets/examples/example-product.yaml")).unwrap();
        let html = String::from_utf8(render(&cfg).unwrap()).unwrap();
        assert!(!html.contains(THEME_SLOT));
        assert!(html.contains("--primary: #0d9488;"));
        assert!(html.contains("<title>Landify</title>"));
        assert!(html.contains("<header>"));
        assert!(html.contains("</footer>"));
    }

    #[test]
    fn unknown_type_falls_back_to_product() {
        let mut cfg =
            Config::load(include_bytes!("../assets/examples/example-product.yaml")).unwrap();
        cfg.page_type = "banana".into();
        let html = render(&cfg).unwrap();
        assert!(String::from_utf8(html)
            .unwrap()
            .contains("<section class=\"hero\">"));
    }

    #[test]
    fn build_file_creates_output_dirs() {
        let dir = tempfile::tempdir().unwrap();
        let out = dir.path().join("nested/deep/index.html");
        let in_path = dir.path().join("landify.yaml");
        fs::write(
            &in_path,
            include_bytes!("../assets/examples/example-product.yaml"),
        )
        .unwrap();
        build_file(in_path.to_str().unwrap(), out.to_str().unwrap(), "").unwrap();
        assert!(out.exists());
    }

    #[test]
    fn build_file_rejects_invalid_theme() {
        let dir = tempfile::tempdir().unwrap();
        let in_path = dir.path().join("landify.yaml");
        fs::write(
            &in_path,
            include_bytes!("../assets/examples/example-product.yaml"),
        )
        .unwrap();
        let err = build_file(in_path.to_str().unwrap(), "index.html", "nope").unwrap_err();
        assert!(err.to_string().starts_with("unknown theme \"nope\""));
    }

    #[test]
    fn build_file_overrides_theme() {
        let dir = tempfile::tempdir().unwrap();
        let in_path = dir.path().join("landify.yaml");
        let out_path = dir.path().join("index.html");
        fs::write(
            &in_path,
            include_bytes!("../assets/examples/example-product.yaml"),
        )
        .unwrap();
        build_file(
            in_path.to_str().unwrap(),
            out_path.to_str().unwrap(),
            "midnight",
        )
        .unwrap();
        let html = fs::read(&out_path).unwrap();
        assert!(String::from_utf8(html)
            .unwrap()
            .contains("--base-100: #0f172a;"));
    }
}
