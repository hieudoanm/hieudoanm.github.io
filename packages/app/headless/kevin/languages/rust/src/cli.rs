//! clap.rs CLI: a single `serve` subcommand with `--port`, `--bind`,
//! `--data` and `--gui` flags. `run()` is the application entry point.

use crate::db::DB;
use crate::{gui, server};
use anyhow::Context;
use clap::{Parser, Subcommand};
use std::net::TcpListener;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use tracing::{info, warn};
use tracing_subscriber::EnvFilter;

/// Redis-style in-memory key/value store.
#[derive(Debug, Parser)]
#[command(
    name = "kevin",
    version,
    about = "Redis-style in-memory key/value store"
)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Debug, Subcommand)]
pub enum Commands {
    /// Run the Redis-style TCP server
    Serve(ServeArgs),
}

#[derive(Debug, clap::Args, PartialEq)]
pub struct ServeArgs {
    /// TCP port to listen on
    #[arg(long, default_value_t = 6379)]
    pub port: u16,

    /// Address to bind to
    #[arg(long, default_value = "0.0.0.0")]
    pub bind: String,

    /// Path to JSON data file for persistence
    #[arg(long)]
    pub data: Option<String>,

    /// Open the key/value manager GUI alongside the server
    #[arg(long)]
    pub gui: bool,
}

/// Parses the CLI, initialises logging and dispatches to the subcommand.
pub fn run() -> anyhow::Result<()> {
    init_logging();
    let cli = Cli::parse();
    match cli.command {
        Commands::Serve(args) => run_serve(args),
    }
}

/// Initialises structured tracing; `RUST_LOG` overrides the default `info`.
fn init_logging() {
    let filter = EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info"));
    tracing_subscriber::fmt().with_env_filter(filter).init();
}

/// Runs the TCP server, optionally alongside the slint GUI, then persists.
fn run_serve(args: ServeArgs) -> anyhow::Result<()> {
    let kv = Arc::new(DB::new());
    if let Some(path) = &args.data {
        match kv.load(path) {
            Ok(()) => info!(path, "loaded data file"),
            Err(e) => warn!(path, err = %e, "could not load data file"),
        }
    }

    let addr = format!("{}:{}", args.bind, args.port);
    let listener = TcpListener::bind(&addr).with_context(|| format!("listen on {addr}"))?;

    let stop = Arc::new(AtomicBool::new(false));
    register_signals(&stop)?;

    let serve_result = if args.gui {
        run_with_gui(listener, &kv, &stop)
    } else {
        server::serve(listener, kv.clone(), stop).map_err(anyhow::Error::from)
    };

    if let Some(path) = &args.data {
        match kv.save(path) {
            Ok(()) => info!(path, "saved data file"),
            Err(e) => warn!(path, err = %e, "could not save data file"),
        }
    }
    serve_result
}

/// Serves in a background thread while the GUI runs on the main thread,
/// mirroring the Go implementation. Closing the window stops the server.
fn run_with_gui(listener: TcpListener, kv: &Arc<DB>, stop: &Arc<AtomicBool>) -> anyhow::Result<()> {
    let kv_server = kv.clone();
    let stop_server = stop.clone();
    let handle = std::thread::Builder::new()
        .name("server".to_string())
        .spawn(move || server::serve(listener, kv_server, stop_server))
        .context("spawn server thread")?;

    let gui_result = gui::run(kv.clone()).context("failed to open GUI");

    stop.store(true, Ordering::Relaxed);
    let _ = handle.join();
    gui_result
}

/// Sets `stop` true when SIGINT or SIGTERM is received.
fn register_signals(stop: &Arc<AtomicBool>) -> anyhow::Result<()> {
    use signal_hook::consts::{SIGINT, SIGTERM};
    signal_hook::flag::register(SIGINT, stop.clone()).context("register SIGINT handler")?;
    signal_hook::flag::register(SIGTERM, Arc::clone(stop)).context("register SIGTERM handler")?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn serve_args(args: &[&str]) -> ServeArgs {
        let cli = Cli::try_parse_from(args).unwrap();
        match cli.command {
            Commands::Serve(a) => a,
        }
    }

    #[test]
    fn default_port_and_bind() {
        let args = serve_args(&["kevin", "serve"]);
        assert_eq!(args.port, 6379);
        assert_eq!(args.bind, "0.0.0.0");
        assert!(!args.gui);
        assert!(args.data.is_none());
    }

    #[test]
    fn custom_flags_parsed() {
        let args = serve_args(&[
            "kevin",
            "serve",
            "--port",
            "8090",
            "--bind",
            "127.0.0.1",
            "--gui",
        ]);
        assert_eq!(args.port, 8090);
        assert_eq!(args.bind, "127.0.0.1");
        assert!(args.gui);
    }

    #[test]
    fn data_flag_parsed() {
        let args = serve_args(&["kevin", "serve", "--data", "/tmp/x.json"]);
        assert_eq!(args.data.as_deref(), Some("/tmp/x.json"));
    }

    #[test]
    fn unknown_flag_rejected() {
        assert!(Cli::try_parse_from(["kevin", "serve", "--nope"]).is_err());
    }
}
