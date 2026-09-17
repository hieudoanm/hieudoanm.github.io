//! Landify: build a flat, dependency-free landing page from a single YAML
//! file — behaviour-identical to the Go implementation.

pub mod cli;
pub mod color;
pub mod config;
pub mod gui;
pub mod placeholder;
pub mod render;
pub mod serve;
pub mod themes;
pub mod tui;
pub mod validate;

pub use cli::run;
