//! Desktop studio entry point. With the `gui` feature the slint Material
//! editor is compiled in (`src/gui/real.rs`); without it, `run` reports an
//! error so the CLI can tell users to build with `--features gui`.

/// Opens the landify studio desktop app for the optional YAML path (a new
/// product scaffold when `None`).
#[cfg(not(feature = "gui"))]
pub fn run(_path: Option<&str>) -> anyhow::Result<()> {
    anyhow::bail!("GUI support not compiled in; build with: cargo build --features gui")
}

#[cfg(feature = "gui")]
mod real;
#[cfg(feature = "gui")]
pub use real::run;
