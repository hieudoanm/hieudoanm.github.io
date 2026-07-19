//! GUI entry point. With the `gui` feature the slint Material manager is
//! compiled in (`src/gui/real.rs`); without it, `run` reports an error so the
//! CLI can tell users to build with `--features gui`.

#[cfg(not(feature = "gui"))]
use crate::db::DB;
#[cfg(not(feature = "gui"))]
use std::sync::Arc;

/// Opens the key/value manager GUI alongside the server.
#[cfg(not(feature = "gui"))]
pub fn run(_kv: Arc<DB>) -> anyhow::Result<()> {
    anyhow::bail!("GUI support not compiled in; build with: cargo build --features gui")
}

#[cfg(feature = "gui")]
mod real;
#[cfg(feature = "gui")]
pub use real::run;
