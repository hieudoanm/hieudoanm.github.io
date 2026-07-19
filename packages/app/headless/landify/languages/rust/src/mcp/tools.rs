//! The Landify tool surface exposed over MCP.

use crate::mcp::protocol::{object_schema, ToolResult};
use crate::mcp::workspace::DEFAULT_CONFIG_PATH;
use crate::validate::KNOWN_TYPES;
use serde_json::{json, Value};

/// Tool names exposed over MCP. They carry a server prefix so a model can tell
/// which server produced a result when several servers share one session.
pub const TOOL_SCAFFOLD: &str = "landify_scaffold";
pub const TOOL_VALIDATE: &str = "landify_validate";
pub const TOOL_BUILD: &str = "landify_build";
pub const TOOL_TYPES: &str = "landify_types";
pub const TOOL_THEMES: &str = "landify_themes";
pub const TOOL_THEME_TOKENS: &str = "landify_theme_tokens";

/// One entry in the `tools/list` result.
#[derive(Debug, Clone)]
pub struct Tool {
    pub name: &'static str,
    pub description: &'static str,
    pub input_schema: Value,
}

/// Every tool this server exposes, in a stable order.
pub fn tools() -> Vec<Tool> {
    vec![
        Tool {
            name: TOOL_SCAFFOLD,
            description: "Return an annotated starter landify.yaml for one of the twelve page types, optionally writing it to a file in the server root. Start from this, then edit and validate.",
            input_schema: object_schema(
                vec![
                    ("type", json!({
                        "type": "string",
                        "description": "Page type to scaffold.",
                        "enum": KNOWN_TYPES,
                    })),
                    ("path", json!({
                        "type": "string",
                        "description": "Relative path to write the starter config to. Omit to only return the YAML.",
                    })),
                    ("overwrite", json!({
                        "type": "boolean",
                        "description": "Allow replacing an existing file at path. Defaults to false.",
                    })),
                ],
                &["type"],
            ),
        },
        Tool {
            name: TOOL_VALIDATE,
            description: "Parse and schema-check a Landify config, reporting every problem at once. Accepts inline YAML or a file in the server root. Unknown fields and typos are rejected.",
            input_schema: object_schema(
                vec![
                    ("yaml", yaml_property()),
                    ("path", path_property()),
                ],
                &[],
            ),
        },
        Tool {
            name: TOOL_BUILD,
            description: "Render a Landify config to a self-contained HTML page and return the markup, optionally writing it to a file. An invalid config is reported with the same errors landify validate gives.",
            input_schema: object_schema(
                vec![
                    ("yaml", yaml_property()),
                    ("path", path_property()),
                    ("theme", theme_property()),
                    ("output", output_property()),
                ],
                &[],
            ),
        },
        Tool {
            name: TOOL_TYPES,
            description: "List the twelve supported page types and what each layout contains.",
            input_schema: object_schema(vec![], &[]),
        },
        Tool {
            name: TOOL_THEMES,
            description: "List the built-in theme presets with their one-line descriptions. Pass a name to landify_build or landify_theme_tokens to apply one.",
            input_schema: object_schema(
                vec![(
                    "query",
                    json!({
                        "type": "string",
                        "description": "Case-insensitive substring filter over preset names and descriptions. Omit to list all 64.",
                    }),
                )],
                &[],
            ),
        },
        Tool {
            name: TOOL_THEME_TOKENS,
            description: "Resolve a theme into the derived :root CSS custom properties (tints, shades and WCAG contrast pairs). Use a named preset, or read the theme from a config.",
            input_schema: object_schema(
                vec![
                    ("theme", theme_property()),
                    ("yaml", yaml_property()),
                    ("path", path_property()),
                ],
                &[],
            ),
        },
    ]
}

/// The `yaml`, `path` and `theme` schemas are shared by every tool that takes a
/// config. They are written out by hand because MCP clients read them to build
/// the tool descriptions a model sees.
fn yaml_property() -> Value {
    json!({
        "type": "string",
        "description": "Inline landify.yaml content. Mutually exclusive with path.",
    })
}

fn path_property() -> Value {
    json!({
        "type": "string",
        "description": format!(
            "Path to a landify.yaml inside the server root. Defaults to {DEFAULT_CONFIG_PATH} when neither path nor yaml is given."
        ),
    })
}

fn theme_property() -> Value {
    json!({
        "type": "string",
        "description": "Built-in preset name overriding the config's theme: section. Omit to use the config's own theme.",
    })
}

fn output_property() -> Value {
    json!({
        "type": "string",
        "description": "Relative path to write the rendered page to. Omit to only return the markup.",
    })
}

/// The `tools/list` result for the given tools, sorted by name so clients and
/// tests see a stable order.
pub fn list_result(tools: &[Tool]) -> Value {
    let mut sorted: Vec<&Tool> = tools.iter().collect();
    sorted.sort_by_key(|t| t.name);
    json!({
        "tools": sorted
            .iter()
            .map(|t| json!({
                "name": t.name,
                "description": t.description,
                "inputSchema": t.input_schema,
            }))
            .collect::<Vec<Value>>(),
    })
}

/// A handler that reads tool arguments and produces a result. It is a boxed
/// closure rather than a function pointer because most handlers capture the
/// sandboxed workspace they are bound to.
pub type ToolHandler = Box<dyn Fn(&Value) -> ToolResult + Send + Sync>;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn every_tool_name_is_prefixed_and_unique() {
        let names: Vec<&str> = tools().iter().map(|t| t.name).collect();
        for name in &names {
            assert!(name.starts_with("landify_"), "{name}");
        }
        let mut sorted = names.clone();
        sorted.sort_unstable();
        sorted.dedup();
        assert_eq!(sorted.len(), names.len());
    }

    #[test]
    fn every_tool_advertises_an_object_schema() {
        for tool in tools() {
            assert_eq!(tool.input_schema["type"], "object", "{}", tool.name);
            assert!(tool.input_schema["properties"].is_object(), "{}", tool.name);
        }
    }
}
