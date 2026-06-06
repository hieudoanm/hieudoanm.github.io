pub mod core;
#[cfg(target_arch = "wasm32")]
pub mod web;
pub use core::*;
