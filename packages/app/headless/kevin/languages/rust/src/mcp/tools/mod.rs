//! Registration of the KeVIN tool catalogue against a store. Each tool maps to
//! a `Store` method rather than the TCP protocol, so the server works against
//! either an in-process or a remote store.

mod args;
mod handlers;
mod schema;

use super::schema::{Tool, ToolResult};
use super::server::{Server, ToolHandler};
use super::store::Store;
use serde_json::Value;
use std::sync::Arc;

/// A tool implementation, before it is bound to a store.
type HandlerFn = fn(&Arc<dyn Store>, &Option<Value>) -> ToolResult;

/// Every tool the server exposes, paired with the handler that serves it.
fn catalog() -> Vec<(Tool, HandlerFn)> {
    vec![
        (schema::ping(), handlers::ping),
        (schema::set(), handlers::set),
        (schema::get(), handlers::get),
        (schema::del(), handlers::del),
        (schema::exists(), handlers::exists),
        (schema::keys(), handlers::keys),
        (schema::len(), handlers::len),
        (schema::ttl(), handlers::ttl),
        (schema::expire(), handlers::expire),
        (schema::flush(), handlers::flush),
    ]
}

/// Registers every KeVIN tool with `server`, all bound to `store`.
pub fn register(server: &mut Server, store: Arc<dyn Store>) {
    for (tool, handler) in catalog() {
        server.add_tool(tool, bind(Arc::clone(&store), handler));
    }
}

/// Captures `store` in a closure that dispatches to `handler`, so every tool
/// shares one connection without the caller threading it through each call.
fn bind(store: Arc<dyn Store>, handler: HandlerFn) -> ToolHandler {
    Box::new(move |args| handler(&store, args))
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::db::DB;
    use crate::mcp::store::DbStore;

    fn registered() -> Server {
        let mut server = Server::new();
        register(&mut server, Arc::new(DbStore::new(Arc::new(DB::new()))));
        server
    }

    #[test]
    fn registers_every_tool_once() {
        assert_eq!(registered().sorted_tools().len(), catalog().len());
    }

    #[test]
    fn each_tool_name_is_unique() {
        let mut names: Vec<String> = catalog().into_iter().map(|(tool, _)| tool.name).collect();
        names.sort();
        let count = names.len();
        names.dedup();
        assert_eq!(names.len(), count);
    }
}
