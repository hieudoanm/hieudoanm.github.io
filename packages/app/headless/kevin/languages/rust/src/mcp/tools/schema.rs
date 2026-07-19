//! The tool catalogue: name, description and JSON Schema for every tool. A
//! tool that requires a property must describe it, otherwise a client has no
//! type information with which to build a valid call.

use super::super::schema::{PropertySchema, Schema, Tool};

/// Builds a tool from its name, description and argument schema.
fn tool(name: &str, description: &str, input_schema: Schema) -> Tool {
    Tool {
        name: name.to_string(),
        description: description.to_string(),
        input_schema,
    }
}

/// Builds an object schema, marking `required` names as mandatory.
fn schema<const N: usize>(properties: [(&str, PropertySchema); N], required: &[&str]) -> Schema {
    Schema {
        kind: "object".to_string(),
        properties: properties
            .into_iter()
            .map(|(name, property)| (name.to_string(), property))
            .collect(),
        required: (!required.is_empty())
            .then(|| required.iter().map(|name| (*name).to_string()).collect()),
    }
}

fn string_property(description: &str) -> PropertySchema {
    PropertySchema {
        kind: "string".to_string(),
        description: Some(description.to_string()),
        items: None,
    }
}

fn integer_property(description: &str) -> PropertySchema {
    PropertySchema {
        kind: "integer".to_string(),
        description: Some(description.to_string()),
        items: None,
    }
}

fn boolean_property(description: &str) -> PropertySchema {
    PropertySchema {
        kind: "boolean".to_string(),
        description: Some(description.to_string()),
        items: None,
    }
}

fn key_property() -> PropertySchema {
    string_property("Key to operate on.")
}

fn plain_string() -> PropertySchema {
    PropertySchema {
        kind: "string".to_string(),
        description: None,
        items: None,
    }
}

pub fn ping() -> Tool {
    tool(
        "kevin_ping",
        "Verify the KeVIN key/value store is reachable.",
        schema([], &[]),
    )
}

pub fn set() -> Tool {
    tool(
        "kevin_set",
        "Store value under key, overwriting any existing value. Set ttl_seconds to expire the key automatically.",
        schema(
            [
                ("key", key_property()),
                ("value", string_property("Value to store. May contain spaces.")),
                (
                    "ttl_seconds",
                    integer_property("Seconds until the key expires. Omit or use 0 for no expiry."),
                ),
            ],
            &["key", "value"],
        ),
    )
}

pub fn get() -> Tool {
    tool(
        "kevin_get",
        "Retrieve the value stored under key. Returns found=false when the key is absent or expired.",
        schema([("key", key_property())], &["key"]),
    )
}

pub fn del() -> Tool {
    tool(
        "kevin_del",
        "Delete one or more keys and report how many were present.",
        schema(
            [(
                "keys",
                PropertySchema::array("Keys to delete.", plain_string()),
            )],
            &["keys"],
        ),
    )
}

pub fn exists() -> Tool {
    tool(
        "kevin_exists",
        "Check whether key is present and not expired.",
        schema([("key", key_property())], &["key"]),
    )
}

pub fn keys() -> Tool {
    tool(
        "kevin_keys",
        "List every present, unexpired key.",
        schema([], &[]),
    )
}

pub fn len() -> Tool {
    tool(
        "kevin_len",
        "Count the present, unexpired keys.",
        schema([], &[]),
    )
}

pub fn ttl() -> Tool {
    tool(
        "kevin_ttl",
        "Report the remaining lifetime of key in whole seconds, rounded up. The state is one of expiring, no-expiry, or missing.",
        schema([("key", key_property())], &["key"]),
    )
}

pub fn expire() -> Tool {
    tool(
        "kevin_expire",
        "Set an expiry on an existing key, replacing any previous one. Reports ok=false when the key does not exist.",
        schema(
            [
                ("key", key_property()),
                (
                    "seconds",
                    integer_property("Seconds until the key expires. Must be greater than 0."),
                ),
            ],
            &["key", "seconds"],
        ),
    )
}

pub fn flush() -> Tool {
    tool(
        "kevin_flush",
        "Remove every key and report how many were removed. Destructive: requires confirm=true.",
        schema(
            [(
                "confirm",
                boolean_property("Must be true. Guards against an accidental flush."),
            )],
            &["confirm"],
        ),
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    fn all() -> Vec<Tool> {
        vec![
            ping(),
            set(),
            get(),
            del(),
            exists(),
            keys(),
            len(),
            ttl(),
            expire(),
            flush(),
        ]
    }

    #[test]
    fn every_tool_is_named_and_described() {
        for tool in all() {
            assert!(tool.name.starts_with("kevin_"), "got {}", tool.name);
            assert!(
                !tool.description.is_empty(),
                "{} has no description",
                tool.name
            );
        }
    }

    #[test]
    fn every_tool_declares_an_object_schema() {
        for tool in all() {
            assert_eq!(tool.input_schema.kind, "object", "{}", tool.name);
        }
    }

    #[test]
    fn every_required_property_is_described() {
        for tool in all() {
            let required = tool.input_schema.required.clone().unwrap_or_default();
            for name in required {
                assert!(
                    tool.input_schema.properties.contains_key(&name),
                    "{} requires undescribed property {name}",
                    tool.name
                );
            }
        }
    }

    #[test]
    fn the_catalogue_covers_the_ten_store_operations() {
        let mut names: Vec<String> = all().into_iter().map(|tool| tool.name).collect();
        names.sort();
        assert_eq!(
            names,
            vec![
                "kevin_del",
                "kevin_exists",
                "kevin_expire",
                "kevin_flush",
                "kevin_get",
                "kevin_keys",
                "kevin_len",
                "kevin_ping",
                "kevin_set",
                "kevin_ttl",
            ]
        );
    }

    #[test]
    fn array_properties_describe_their_item_type() {
        let del = del();
        let keys = del.input_schema.properties.get("keys").unwrap();
        assert_eq!(keys.kind, "array");
        assert_eq!(keys.items.as_ref().unwrap().kind, "string");
    }

    #[test]
    fn a_tool_without_required_arguments_omits_the_key() {
        let json = serde_json::to_value(ping()).unwrap();
        assert!(json["inputSchema"].get("required").is_none());
    }
}
