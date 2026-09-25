//! Argument access shared by the tool handlers. Every getter treats a missing
//! or wrongly typed argument as its default, so a model that omits an optional
//! field gets the documented behaviour instead of a parse failure.

use serde_json::Value;

fn field<'a>(args: &'a Option<Value>, name: &str) -> Option<&'a Value> {
    args.as_ref()?.get(name)
}

/// Reads a string argument, defaulting to empty.
pub fn string(args: &Option<Value>, name: &str) -> String {
    field(args, name)
        .and_then(Value::as_str)
        .map(str::to_string)
        .unwrap_or_default()
}

/// Reads an integer argument, defaulting to zero.
pub fn integer(args: &Option<Value>, name: &str) -> i64 {
    field(args, name).and_then(Value::as_i64).unwrap_or(0)
}

/// Reads a boolean argument, defaulting to false.
pub fn boolean(args: &Option<Value>, name: &str) -> bool {
    field(args, name).and_then(Value::as_bool).unwrap_or(false)
}

/// Reads an array-of-strings argument, defaulting to empty. Non-string entries
/// are dropped rather than failing the whole call.
pub fn string_list(args: &Option<Value>, name: &str) -> Vec<String> {
    field(args, name)
        .and_then(Value::as_array)
        .map(|items| {
            items
                .iter()
                .filter_map(Value::as_str)
                .map(str::to_string)
                .collect()
        })
        .unwrap_or_default()
}

/// Rejects a missing or blank key. Without this a client that omits the
/// argument would silently operate on the empty key, which is never a key the
/// store holds.
pub fn require_key(key: &str) -> Result<(), &'static str> {
    if key.trim().is_empty() {
        return Err("key is required and must not be blank");
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn args(value: Value) -> Option<Value> {
        Some(value)
    }

    #[test]
    fn reads_each_argument_type() {
        let parsed = args(json!({
            "key": "k",
            "seconds": 30,
            "confirm": true,
            "keys": ["a", "b"],
        }));
        assert_eq!(string(&parsed, "key"), "k");
        assert_eq!(integer(&parsed, "seconds"), 30);
        assert!(boolean(&parsed, "confirm"));
        assert_eq!(string_list(&parsed, "keys"), vec!["a", "b"]);
    }

    #[test]
    fn absent_arguments_fall_back_to_their_defaults() {
        let empty: Option<Value> = None;
        assert_eq!(string(&empty, "key"), "");
        assert_eq!(integer(&empty, "seconds"), 0);
        assert!(!boolean(&empty, "confirm"));
        assert!(string_list(&empty, "keys").is_empty());
    }

    #[test]
    fn a_null_arguments_object_reads_as_empty() {
        let null = args(Value::Null);
        assert_eq!(string(&null, "key"), "");
        assert_eq!(integer(&null, "seconds"), 0);
    }

    #[test]
    fn a_wrongly_typed_argument_falls_back_to_its_default() {
        let wrong = args(json!({"key": 7, "seconds": "30", "confirm": "yes"}));
        assert_eq!(string(&wrong, "key"), "");
        assert_eq!(integer(&wrong, "seconds"), 0);
        assert!(!boolean(&wrong, "confirm"));
    }

    #[test]
    fn string_list_drops_non_string_entries() {
        let mixed = args(json!({"keys": ["a", 3, null, "b"]}));
        assert_eq!(string_list(&mixed, "keys"), vec!["a", "b"]);
    }

    #[test]
    fn require_key_rejects_blank_keys() {
        assert!(require_key("a").is_ok());
        assert!(require_key("a key").is_ok());
        assert!(require_key("").is_err());
        assert!(require_key("   ").is_err());
    }
}
