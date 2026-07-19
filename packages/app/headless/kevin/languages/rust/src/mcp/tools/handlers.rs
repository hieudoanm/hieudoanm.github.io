//! One function per tool. Every handler reports a failure as an errored
//! `ToolResult` rather than a JSON-RPC error, so the model can see it and react.

use super::super::schema::ToolResult;
use super::super::store::Store;
use super::args::{boolean, integer, require_key, string, string_list};
use anyhow::Result;
use serde_json::{json, Value};
use std::sync::Arc;

/// Renders a store result as a text tool result, formatting any error.
fn report(result: Result<Value>) -> ToolResult {
    match result {
        Ok(value) => ToolResult::text(value),
        Err(e) => ToolResult::failure(format!("{e:#}")),
    }
}

pub fn ping(store: &Arc<dyn Store>, _args: &Option<Value>) -> ToolResult {
    report(store.ping().map(|()| json!({"pong": true})))
}

pub fn set(store: &Arc<dyn Store>, args: &Option<Value>) -> ToolResult {
    let key = string(args, "key");
    let value = string(args, "value");
    if let Err(e) = require_key(&key) {
        return ToolResult::failure(e);
    }
    if value.is_empty() {
        return ToolResult::failure("value is required and must not be empty");
    }
    let ttl = integer(args, "ttl_seconds");
    report(store.set(&key, &value, ttl).map(|()| json!({"ok": true})))
}

pub fn get(store: &Arc<dyn Store>, args: &Option<Value>) -> ToolResult {
    let key = string(args, "key");
    if let Err(e) = require_key(&key) {
        return ToolResult::failure(e);
    }
    report(store.get(&key).map(|(value, found)| {
        json!({"found": found, "value": if found { json!(value) } else { Value::Null }})
    }))
}

pub fn del(store: &Arc<dyn Store>, args: &Option<Value>) -> ToolResult {
    let keys = string_list(args, "keys");
    if keys.is_empty() {
        return ToolResult::failure("keys is required and must contain at least one key");
    }
    report(store.del(&keys).map(|deleted| json!({"deleted": deleted})))
}

pub fn exists(store: &Arc<dyn Store>, args: &Option<Value>) -> ToolResult {
    let key = string(args, "key");
    if let Err(e) = require_key(&key) {
        return ToolResult::failure(e);
    }
    report(store.exists(&key).map(|exists| json!({"exists": exists})))
}

pub fn keys(store: &Arc<dyn Store>, _args: &Option<Value>) -> ToolResult {
    report(store.keys().map(|keys| {
        let count = keys.len();
        json!({"keys": keys, "count": count})
    }))
}

pub fn len(store: &Arc<dyn Store>, _args: &Option<Value>) -> ToolResult {
    report(store.len().map(|count| json!({"count": count})))
}

pub fn ttl(store: &Arc<dyn Store>, args: &Option<Value>) -> ToolResult {
    let key = string(args, "key");
    if let Err(e) = require_key(&key) {
        return ToolResult::failure(e);
    }
    match store.ttl(&key) {
        Ok((seconds, state)) => ToolResult::text(json!({
            "key": key,
            "seconds": state.signed_seconds(seconds),
            "state": state.as_str(),
        })),
        Err(e) => ToolResult::failure(format!("{e:#}")),
    }
}

pub fn expire(store: &Arc<dyn Store>, args: &Option<Value>) -> ToolResult {
    let key = string(args, "key");
    let seconds = integer(args, "seconds");
    if let Err(e) = require_key(&key) {
        return ToolResult::failure(e);
    }
    if seconds <= 0 {
        return ToolResult::failure("seconds is required and must be greater than 0");
    }
    report(store.expire(&key, seconds).map(|ok| json!({"ok": ok})))
}

pub fn flush(store: &Arc<dyn Store>, args: &Option<Value>) -> ToolResult {
    if !boolean(args, "confirm") {
        return ToolResult::failure("confirm must be true to remove every key");
    }
    report(store.flush().map(|deleted| json!({"deleted": deleted})))
}
