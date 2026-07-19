//! The tool handlers behind the Landify MCP surface.
//!
//! Every handler returns a [`ToolResult`] rather than a `Result`: a config
//! that fails validation is a normal result the model can read and fix, so only
//! a transport-level problem should ever escape as a protocol error.

use crate::color;
use crate::config::Config;
use crate::mcp::protocol::{marshal, ToolResult};
use crate::mcp::tools::ToolHandler;
use crate::mcp::workspace::{Workspace, DEFAULT_CONFIG_PATH};
use crate::placeholder;
use crate::render;
use crate::themes;
use crate::validate;
use anyhow::{anyhow, Result};
use serde::Serialize;
use serde_json::{json, Value};

/// Where a config came from, echoed back in every result so a model can tell
/// an inline draft from a file on disk.
struct ConfigSource {
    cfg: Config,
    origin: String,
}

/// Reads the config described by `args`.
///
/// Both `yaml` and `path` set is an error: the two would silently disagree
/// about which content wins. With neither, the tools fall back to the CLI's
/// default config file.
fn resolve(ws: &Workspace, yaml: &str, path: &str) -> Result<ConfigSource> {
    let yaml = yaml.trim();
    let path = path.trim();
    if !yaml.is_empty() && !path.is_empty() {
        return Err(anyhow!("pass either yaml or path, not both"));
    }
    if !yaml.is_empty() {
        let cfg = Config::load(yaml.as_bytes()).map_err(|e| anyhow!("{e}"))?;
        return Ok(ConfigSource {
            cfg,
            origin: "inline".to_string(),
        });
    }
    let path = if path.is_empty() {
        DEFAULT_CONFIG_PATH
    } else {
        path
    };
    let data = ws.read(path)?;
    let cfg = Config::load(&data).map_err(|e| anyhow!("parse {path}: {e}"))?;
    Ok(ConfigSource {
        cfg,
        origin: path.to_string(),
    })
}

/// Reads a string argument, defaulting to `""` when absent.
fn string_arg(args: &Value, name: &str) -> String {
    args.get(name)
        .and_then(Value::as_str)
        .unwrap_or_default()
        .to_string()
}

/// Rejects a missing or blank value. Without it a client that omits a required
/// argument would silently operate on `""`, which no tool wants.
fn require_non_blank(name: &str, value: &str) -> Result<()> {
    if value.trim().is_empty() {
        return Err(anyhow!("{name} is required and must not be blank"));
    }
    Ok(())
}

/// Turns a handler error into the tool result a model can act on.
fn err_result(e: impl std::fmt::Display) -> ToolResult {
    ToolResult::error(e.to_string())
}

/// Returns a starter config for a page type and, when the caller names a path,
/// writes it there.
///
/// Overwriting is opt-in so a model cannot silently destroy a config the user
/// is editing.
pub fn handle_scaffold(ws: &Workspace) -> ToolHandler {
    // The workspace is cloned into the handler so it can own its sandbox: a
    // handler outlives the borrow it was built from.
    let ws = ws.clone();
    Box::new(move |raw: &Value| {
        let args = match to_args(raw) {
            Ok(args) => args,
            Err(e) => return err_result(e),
        };
        let page_type = string_arg(&args, "type");
        if let Err(e) = require_non_blank("type", &page_type) {
            return err_result(e);
        }
        let kind = validate::normalize_type(&page_type);
        let yaml = match placeholder::example(&kind) {
            Ok(yaml) => yaml,
            Err(e) => return err_result(format!("type \"{page_type}\" is not supported: {e}")),
        };
        let path = string_arg(&args, "path");
        let overwrite = args
            .get("overwrite")
            .and_then(Value::as_bool)
            .unwrap_or(false);
        match write_unless_present(&ws, &path, yaml.as_bytes(), overwrite) {
            Ok(written) => ToolResult::text(marshal(&ScaffoldResult {
                page_type: kind,
                written,
                yaml: yaml.to_string(),
            })),
            Err(e) => err_result(e),
        }
    })
}

/// Writes `data` to `path` inside the root and returns the path it wrote.
///
/// A blank path writes nothing and returns `""`, because "show me the yaml" is
/// the common case for a model that only wants to read the starter config.
fn write_unless_present(
    ws: &Workspace,
    path: &str,
    data: &[u8],
    overwrite: bool,
) -> Result<String> {
    if path.is_empty() {
        return Ok(String::new());
    }
    if !overwrite && ws.exists(path)? {
        return Err(anyhow!(
            "{path} already exists; pass overwrite to replace it"
        ));
    }
    ws.write(path, data)?;
    Ok(path.to_string())
}

/// Schema-checks a config and reports every problem at once, so a model can fix
/// a draft in one pass instead of discovering fields one at a time.
pub fn handle_validate(ws: &Workspace) -> ToolHandler {
    // The workspace is cloned into the handler so it can own its sandbox: a
    // handler outlives the borrow it was built from.
    let ws = ws.clone();
    Box::new(move |raw: &Value| {
        let args = match to_args(raw) {
            Ok(args) => args,
            Err(e) => return err_result(e),
        };
        let source = match resolve(&ws, &string_arg(&args, "yaml"), &string_arg(&args, "path")) {
            Ok(source) => source,
            Err(e) => return err_result(e),
        };
        ToolResult::text(marshal(&validate_payload(&source.cfg, &source.origin)))
    })
}

/// The shared `validate` payload, also returned by `build` for a config that
/// cannot render.
fn validate_payload(cfg: &Config, origin: &str) -> ValidateResult {
    let errors = validate::errors(cfg);
    ValidateResult {
        valid: errors.is_empty(),
        page_type: validate::normalize_type(&cfg.page_type),
        source: origin.to_string(),
        errors,
    }
}

/// Renders a config to HTML and returns the markup. The theme override mirrors
/// `landify build --theme`, and validation runs first so a broken config
/// reports every problem instead of a template error.
pub fn handle_build(ws: &Workspace) -> ToolHandler {
    // The workspace is cloned into the handler so it can own its sandbox: a
    // handler outlives the borrow it was built from.
    let ws = ws.clone();
    Box::new(move |raw: &Value| {
        let args = match to_args(raw) {
            Ok(args) => args,
            Err(e) => return err_result(e),
        };
        let output = string_arg(&args, "output");
        // Reject an unusable output path before rendering, so a bad path fails
        // immediately instead of after the whole page has been built.
        if !output.trim().is_empty() {
            if let Err(e) = ws.resolve(&output) {
                return err_result(e);
            }
        }
        let mut source = match resolve(&ws, &string_arg(&args, "yaml"), &string_arg(&args, "path"))
        {
            Ok(source) => source,
            Err(e) => return err_result(e),
        };
        let override_name = string_arg(&args, "theme");
        let theme = match apply_theme_override(&mut source.cfg, &override_name) {
            Ok(pair) => pair,
            Err(e) => return err_result(e),
        };
        let errors = validate::errors(&source.cfg);
        if !errors.is_empty() {
            return ToolResult::text(marshal(&validate_payload(&source.cfg, &source.origin)));
        }
        let html = match render::render(&source.cfg) {
            Ok(html) => html,
            Err(e) => return err_result(e),
        };
        let mut written = String::new();
        if !output.trim().is_empty() {
            if let Err(e) = ws.write(&output, &html) {
                return err_result(e);
            }
            written = output.clone();
        }
        ToolResult::text(marshal(&BuildResult {
            page_type: validate::normalize_type(&source.cfg.page_type),
            theme,
            source: source.origin,
            written,
            bytes: html.len(),
            html: String::from_utf8_lossy(&html).into_owned(),
        }))
    })
}

/// Resolves a theme into the derived CSS custom properties.
///
/// The theme comes from a named preset when one is given, otherwise from the
/// config, so a model can check the palette of a draft before building it.
pub fn handle_theme_tokens(ws: &Workspace) -> ToolHandler {
    // The workspace is cloned into the handler so it can own its sandbox: a
    // handler outlives the borrow it was built from.
    let ws = ws.clone();
    Box::new(move |raw: &Value| {
        let args = match to_args(raw) {
            Ok(args) => args,
            Err(e) => return err_result(e),
        };
        let override_name = string_arg(&args, "theme");
        let (theme, origin) = match resolve_theme(
            &ws,
            &string_arg(&args, "yaml"),
            &string_arg(&args, "path"),
            &override_name,
        ) {
            Ok(pair) => pair,
            Err(e) => return err_result(e),
        };
        let tokens = match color::tokens(&theme) {
            Ok(tokens) => tokens,
            Err(e) => return err_result(e),
        };
        let map: serde_json::Map<String, Value> = tokens
            .iter()
            .map(|(k, v)| (k.clone(), Value::String(v.clone())))
            .collect();
        ToolResult::text(marshal(&ThemeTokensResult {
            theme: theme_label(&theme, &override_name),
            source: origin,
            token_count: map.len(),
            tokens: map,
        }))
    })
}

/// Picks the theme to inspect and names where it came from. A named preset wins
/// over the config, matching the CLI's `--theme` flag.
fn resolve_theme(
    ws: &Workspace,
    yaml: &str,
    path: &str,
    override_name: &str,
) -> Result<(crate::config::Theme, String)> {
    let name = override_name.trim();
    if name.is_empty() {
        let source = resolve(ws, yaml, path)?;
        return Ok((source.cfg.theme, source.origin));
    }
    match themes::theme_by_name(name) {
        Some(theme) => Ok((theme, format!("preset:{name}"))),
        None => Err(unknown_theme_error(name)),
    }
}

/// Replaces `cfg`'s theme with a named preset when one is given, mirroring the
/// CLI's `--theme` flag, and returns the preset name so the result can report
/// which theme actually rendered.
fn apply_theme_override(cfg: &mut Config, override_name: &str) -> Result<String> {
    let name = override_name.trim();
    if name.is_empty() {
        return Ok(String::new());
    }
    let theme = themes::theme_by_name(name).ok_or_else(|| unknown_theme_error(name))?;
    cfg.theme = theme;
    Ok(name.to_string())
}

/// Names the preset that was asked for and points at the themes tool rather
/// than inlining all 64 names, which would be unreadable.
fn unknown_theme_error(name: &str) -> anyhow::Error {
    anyhow!("unknown theme \"{name}\"; call landify_themes to list the presets")
}

/// Labels a theme for a tool result. A preset keeps its catalogue name; a theme
/// read from a config has none, so it is described by its primary colour
/// instead — which is what a model needs to reason about a custom palette.
fn theme_label(theme: &crate::config::Theme, override_name: &str) -> String {
    if !override_name.trim().is_empty() {
        return override_name.trim().to_string();
    }
    if !theme.primary.is_empty() {
        return format!("custom (primary {})", theme.primary);
    }
    "custom (default)".to_string()
}

/// List the supported page types with what each one renders.
pub fn handle_types() -> ToolHandler {
    Box::new(|_raw: &Value| {
        let entries: Vec<Value> = validate::KNOWN_TYPES
            .iter()
            .map(|name| json!({ "name": name, "description": type_description(name) }))
            .collect();
        ToolResult::text(marshal(&TypesResult {
            count: entries.len(),
            types: entries,
        }))
    })
}

/// `landify types` has to carry this because a model picking a page type has no
/// other way to learn which one fits, and a wrong guess costs a full rewrite.
fn type_description(name: &str) -> &'static str {
    match name {
        "app" => "App store listing: store badges, ratings and a portrait 9:16 screenshot gallery.",
        "docs" => "Documentation index: topic card links plus an optional code sample.",
        "download" => {
            "Release download: version and license badges, per-OS buttons, install snippet."
        }
        "event" => "Event page: date and venue strip, agenda timeline, speaker grid.",
        "faq" => "FAQ: native <details> rows, no JavaScript.",
        "linktree" => {
            "Link-in-bio: compact profile with big link cards. The only type without a hero."
        }
        "portfolio" => "Personal portfolio: avatar, skills chips, project grid.",
        "pricing" => "Pricing table: tier cards with a highlighted most-popular plan.",
        "product" => "Product landing page: hero, features, demo video and CTA. The default type.",
        "status" => "Status page: state banner, uptime stats, incident log.",
        "team" => "Team page: values strip and member cards.",
        _ => "Waitlist capture: email form, launch date, social links.",
    }
}

/// Lists the built-in presets, optionally filtered by a substring of the name
/// or description. The catalogue is 64 entries, so an unfiltered listing is a
/// lot of text for a model to read when it only wants "the dark ones".
pub fn handle_themes() -> ToolHandler {
    Box::new(|raw: &Value| {
        let args = match to_args(raw) {
            Ok(args) => args,
            Err(e) => return err_result(e),
        };
        let query = string_arg(&args, "query").trim().to_lowercase();
        let mut matched: Vec<Value> = themes::named_themes()
            .iter()
            .filter(|t| {
                query.is_empty()
                    || t.name.to_lowercase().contains(&query)
                    || t.description.to_lowercase().contains(&query)
            })
            .map(|t| json!({ "name": t.name, "description": t.description }))
            .collect();
        matched.sort_by(|a, b| a["name"].as_str().cmp(&b["name"].as_str()));
        let total = themes::named_themes().len();
        ToolResult::text(marshal(&ThemesResult {
            count: matched.len(),
            total,
            themes: matched,
        }))
    })
}

/// Treats a missing or null argument object as empty, so a tool with no
/// required properties can be called with no arguments at all. MCP clients
/// typically send `{}`, not `null`.
fn to_args(raw: &Value) -> Result<Value> {
    match raw {
        Value::Null => Ok(json!({})),
        Value::Object(_) => Ok(raw.clone()),
        other => Err(anyhow!(
            "invalid arguments: expected an object, got {other}"
        )),
    }
}

#[derive(Serialize)]
struct ScaffoldResult {
    #[serde(rename = "type")]
    page_type: String,
    #[serde(skip_serializing_if = "String::is_empty")]
    written: String,
    yaml: String,
}

#[derive(Serialize)]
struct ValidateResult {
    valid: bool,
    #[serde(rename = "type")]
    page_type: String,
    source: String,
    errors: Vec<String>,
}

#[derive(Serialize)]
struct BuildResult {
    #[serde(rename = "type")]
    page_type: String,
    #[serde(skip_serializing_if = "String::is_empty")]
    theme: String,
    source: String,
    #[serde(skip_serializing_if = "String::is_empty")]
    written: String,
    bytes: usize,
    html: String,
}

#[derive(Serialize)]
struct ThemeTokensResult {
    theme: String,
    source: String,
    tokens: serde_json::Map<String, Value>,
    token_count: usize,
}

#[derive(Serialize)]
struct TypesResult {
    count: usize,
    types: Vec<Value>,
}

#[derive(Serialize)]
struct ThemesResult {
    count: usize,
    total: usize,
    themes: Vec<Value>,
}
