//! Model Context Protocol server that exposes the KeVIN key/value store to
//! LLM clients over a newline-delimited JSON-RPC 2.0 stdio transport.
//!
//! The protocol layer is store-agnostic: [`server`] handles frames, [`store`]
//! abstracts the two backends, [`schema`] describes results and tool inputs,
//! and [`tools`] maps the store onto the catalogue.
//! Use [`new_server`] with a [`Session`] to wire an actual server.

pub mod protocol;
pub mod schema;
pub mod server;
pub mod session;
pub mod store;
pub mod tcp_store;
pub mod tools;

pub use server::Server;
pub use session::Session;
pub use store::Store;

use std::sync::Arc;

/// Builds a server with every KeVIN tool registered against `store`.
pub fn new_server(store: Arc<dyn Store>) -> Server {
    let mut server = Server::new();
    tools::register(&mut server, store);
    server
}
