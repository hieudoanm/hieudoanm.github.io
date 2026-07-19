use crate::libs::{history, mcp};
use serde_json::Value;
use std::collections::HashMap;
use std::time::Instant;

fn build_root() -> clap::Command {
    clap::Command::new("hieudoanm")
        .subcommand_required(true)
        .subcommand(super::version::command())
        .subcommand(super::calc::command())
        .subcommand(super::casino::command())
        .subcommand(super::chess::command())
        .subcommand(super::colors::command())
        .subcommand(super::convert::command())
        .subcommand(super::crypto::command())
        .subcommand(super::data::command())
        .subcommand(super::docsify::command())
        .subcommand(super::doi::command())
        .subcommand(super::english::command())
        .subcommand(super::file::command())
        .subcommand(super::gemini::command())
        .subcommand(super::gh::command())
        .subcommand(super::image::command())
        .subcommand(super::net::command())
        .subcommand(super::openapi::command())
        .subcommand(super::openrouter::command())
        .subcommand(super::port::command())
        .subcommand(super::search::command())
        .subcommand(super::semver::command())
        .subcommand(super::system::command())
        .subcommand(super::telegram::command())
        .subcommand(super::time::command())
        .subcommand(super::web::command())
}

fn walk_commands(cmd: &clap::Command, prefix: &str) -> Vec<(String, clap::Command)> {
    let mut result = Vec::new();
    for sub in cmd.get_subcommands() {
        let name = sub.get_name();
        if name == "help" || name == "mcp" || name == "history" {
            continue;
        }
        let full = if prefix.is_empty() {
            name.to_string()
        } else {
            format!("{prefix}.{name}")
        };
        if sub.has_subcommands() {
            result.extend(walk_commands(sub, &full));
            if sub.get_arguments().count() > 0 || sub.is_subcommand_required_set() {
                result.push((full, sub.clone()));
            }
        } else {
            result.push((full, sub.clone()));
        }
    }
    result
}

fn build_schema(cmd: &clap::Command) -> mcp::Schema {
    let mut props = HashMap::new();
    let mut has_positional = false;

    for arg in cmd.get_arguments() {
        if arg.is_positional() {
            has_positional = true;
            continue;
        }
        let long = match arg.get_long() {
            Some(l) => l.to_string(),
            None => continue,
        };
        if long == "help" || long == "json" {
            continue;
        }

        let action = arg.get_action();
        let prop_type = if matches!(action, clap::ArgAction::SetTrue | clap::ArgAction::SetFalse) {
            "boolean".to_string()
        } else if matches!(action, clap::ArgAction::Append) {
            "array".to_string()
        } else {
            determine_value_type(arg)
        };

        let mut ps = mcp::PropertySchema {
            prop_type,
            description: arg.get_help().map(|h| h.to_string()),
            default: None,
            items: None,
        };

        if ps.prop_type == "array" {
            ps.items = Some(Box::new(mcp::PropertySchema {
                prop_type: "string".to_string(),
                description: None,
                default: None,
                items: None,
            }));
        }

        let defaults = arg.get_default_values();
        if let Some(val) = defaults.first() {
            let s = val.to_string_lossy();
            if !s.is_empty() {
                ps.default = Some(Value::String(s.to_string()));
            }
        }

        props.insert(long, ps);
    }

    if has_positional || props.is_empty() {
        props.insert(
            "_args".to_string(),
            mcp::PropertySchema {
                prop_type: "array".to_string(),
                description: Some("Positional command-line arguments".to_string()),
                default: None,
                items: Some(Box::new(mcp::PropertySchema {
                    prop_type: "string".to_string(),
                    description: None,
                    default: None,
                    items: None,
                })),
            },
        );
    }

    mcp::Schema {
        schema_type: "object".to_string(),
        properties: Some(props),
        required: None,
    }
}

fn determine_value_type(arg: &clap::Arg) -> String {
    let parser = arg.get_value_parser();
    let s = format!("{parser:?}");
    if s.contains("i8")
        || s.contains("i16")
        || s.contains("i32")
        || s.contains("i64")
        || s.contains("u8")
        || s.contains("u16")
        || s.contains("u32")
        || s.contains("u64")
        || s.contains("isize")
        || s.contains("usize")
    {
        "integer".to_string()
    } else if s.contains("f32") || s.contains("f64") {
        "number".to_string()
    } else {
        "string".to_string()
    }
}

fn json_to_cli_args(tool_name: &str, json_args: Value) -> Vec<String> {
    let mut args = vec!["hieudoanm".to_string()];
    for part in tool_name.split('.') {
        args.push(part.to_string());
    }

    if let Value::Object(map) = json_args {
        for (key, value) in &map {
            if key == "_args" {
                if let Value::Array(items) = value {
                    for item in items {
                        if let Value::String(s) = item {
                            args.push(s.clone());
                        } else {
                            args.push(item.to_string());
                        }
                    }
                }
            } else {
                match value {
                    Value::Bool(true) => args.push(format!("--{key}")),
                    Value::Bool(false) => {}
                    Value::Null => {}
                    Value::Number(n) => {
                        args.push(format!("--{key}"));
                        args.push(n.to_string());
                    }
                    Value::String(s) => {
                        args.push(format!("--{key}"));
                        args.push(s.to_string());
                    }
                    Value::Array(items) => {
                        for item in items {
                            args.push(format!("--{key}"));
                            if let Value::String(s) = item {
                                args.push(s.clone());
                            } else {
                                args.push(item.to_string());
                            }
                        }
                    }
                    _ => {}
                }
            }
        }
    }

    args
}

fn execute_tool(tool_name: &str, json_args: Value) -> Value {
    let start = Instant::now();
    let cli_args = json_to_cli_args(tool_name, json_args);

    let exe = match std::env::current_exe() {
        Ok(p) => p,
        Err(e) => return mcp::new_tool_result_error(&format!("no exe: {e}")),
    };

    let output = match std::process::Command::new(&exe)
        .args(&cli_args[1..])
        .output()
    {
        Ok(o) => o,
        Err(e) => return mcp::new_tool_result_error(&format!("exec: {e}")),
    };

    let mut result_text = String::from_utf8_lossy(&output.stdout).to_string();
    if !output.stderr.is_empty() && !output.status.success() {
        if !result_text.is_empty() {
            result_text.push('\n');
        }
        result_text.push_str(&String::from_utf8_lossy(&output.stderr));
    }
    let result_text = result_text.trim().to_string();

    let tool_path = tool_name.replace('.', " ");
    let mut entry = history::entry("mcp", &tool_path);
    entry.duration_ms = Some(start.elapsed().as_millis() as i64);

    if output.status.success() {
        let _ = history::append(&entry);
        mcp::new_tool_result_text(&result_text)
    } else {
        entry.error = Some(String::from_utf8_lossy(&output.stderr).trim().to_string());
        let _ = history::append(&entry);
        mcp::new_tool_result_error(&result_text)
    }
}

pub fn command() -> clap::Command {
    clap::Command::new("mcp")
        .about("MCP server exposing CLI tools to AI agents")
        .subcommand(clap::Command::new("serve").about("Start the MCP server over stdio"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("serve", _)) => {
            let mut server = mcp::Server::new();
            register_tools(&mut server);
            eprintln!("[mcp] tools registered");
            server.run()
        }
        _ => Ok(()),
    }
}

fn register_tools(server: &mut mcp::Server) {
    let root = build_root();
    let tools = walk_commands(&root, "");

    eprintln!("[mcp] discovering tools...");
    for (name, cmd) in &tools {
        let desc = match cmd.get_long_about().or_else(|| cmd.get_about()) {
            Some(d) => d.to_string(),
            None => String::new(),
        };

        let schema = build_schema(cmd);
        let tool_name = name.clone();
        let handler = move |args: Value| -> Value { execute_tool(&tool_name, args) };

        server.add_tool(
            mcp::Tool {
                name: name.clone(),
                description: desc,
                input_schema: schema,
            },
            handler,
        );

        eprintln!("[mcp]   {name}");
    }
}
