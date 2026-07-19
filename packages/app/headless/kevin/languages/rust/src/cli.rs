//! clap.rs CLI: a `serve` subcommand with `--port`, `--bind`, `--data`,
//! `--gui` and `--tui` flags, plus an `mcp serve` subcommand exposing the
//! store as Model Context Protocol tools. `run()` is the application entry
//! point.

use crate::db::DB;
use crate::{gui, mcp, server, tui};
use anyhow::Context;
use clap::{Parser, Subcommand};
use std::io::{self, IsTerminal};
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
    /// Model Context Protocol server exposing KeVIN as tools
    Mcp(McpArgs),
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

    /// Open the key/value manager TUI alongside the server
    #[arg(long, conflicts_with = "gui")]
    pub tui: bool,
}

/// Groups the `mcp` subcommands.
#[derive(Debug, clap::Args, PartialEq)]
pub struct McpArgs {
    #[command(subcommand)]
    pub command: McpCommands,
}

#[derive(Debug, Subcommand, PartialEq)]
pub enum McpCommands {
    /// Start the KeVIN MCP server on stdio
    Serve(McpServeArgs),
}

#[derive(Debug, clap::Args, PartialEq)]
pub struct McpServeArgs {
    /// Address of a running kevin serve to proxy over TCP (e.g. localhost:6379)
    #[arg(long)]
    pub addr: Option<String>,

    /// Path to JSON data file for persistence (in-process only)
    #[arg(long, conflicts_with = "addr")]
    pub data: Option<String>,
}

/// Parses the CLI, initialises logging and dispatches to the subcommand.
pub fn run() -> anyhow::Result<()> {
    init_logging();
    let cli = Cli::parse();
    match cli.command {
        Commands::Serve(args) => run_serve(args),
        Commands::Mcp(args) => run_mcp(args),
    }
}

/// Initialises structured tracing; `RUST_LOG` overrides the default `info`.
///
/// Logs go to stderr because `kevin mcp serve` speaks JSON-RPC on stdout, where
/// any stray line would corrupt the stream.
fn init_logging() {
    let filter = EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new("info"));
    tracing_subscriber::fmt()
        .with_env_filter(filter)
        .with_writer(io::stderr)
        .with_ansi(io::stderr().is_terminal())
        .init();
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

    let serve_result = if args.tui {
        run_with_ui(listener, &kv, &stop, tui::run)
    } else if args.gui {
        run_with_ui(listener, &kv, &stop, gui::run)
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

/// Serves in a background thread while the UI runs on the main thread,
/// mirroring the Go implementation. Closing the UI stops the server.
fn run_with_ui(
    listener: TcpListener,
    kv: &Arc<DB>,
    stop: &Arc<AtomicBool>,
    ui: fn(Arc<DB>) -> anyhow::Result<()>,
) -> anyhow::Result<()> {
    let kv_server = kv.clone();
    let stop_server = stop.clone();
    let handle = std::thread::Builder::new()
        .name("server".to_string())
        .spawn(move || server::serve(listener, kv_server, stop_server))
        .context("spawn server thread")?;

    let ui_result = ui(kv.clone()).context("UI failed");

    stop.store(true, Ordering::Relaxed);
    let _ = handle.join();
    ui_result
}

/// Sets `stop` true when SIGINT or SIGTERM is received.
fn register_signals(stop: &Arc<AtomicBool>) -> anyhow::Result<()> {
    use signal_hook::consts::{SIGINT, SIGTERM};
    signal_hook::flag::register(SIGINT, stop.clone()).context("register SIGINT handler")?;
    signal_hook::flag::register(SIGTERM, Arc::clone(stop)).context("register SIGTERM handler")?;
    Ok(())
}

/// Serves the MCP protocol on stdio against the requested store backend, then
/// releases the store so an embedded session can persist its snapshot.
fn run_mcp(args: McpArgs) -> anyhow::Result<()> {
    let McpCommands::Serve(args) = args.command;
    let session = mcp::Session::open(args.addr.as_deref(), args.data.as_deref())?;
    session.store().ping().context("ping store")?;
    info!(
        transport = "stdio",
        store = describe_store(args.addr.as_deref()),
        "mcp server ready"
    );

    let stop = Arc::new(AtomicBool::new(false));
    register_signals(&stop)?;
    let result = mcp::new_server(session.store()).serve_stdio(&stop);
    session.finish();
    result
}

/// Names the backend for the startup log line.
fn describe_store(addr: Option<&str>) -> String {
    match addr {
        Some(addr) => format!("tcp:{addr}"),
        None => "in-process".to_string(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn serve_args(args: &[&str]) -> ServeArgs {
        let cli = Cli::try_parse_from(args).unwrap();
        match cli.command {
            Commands::Serve(a) => a,
            Commands::Mcp(_) => panic!("expected a serve subcommand"),
        }
    }

    fn mcp_serve_args(args: &[&str]) -> McpServeArgs {
        let cli = Cli::try_parse_from(args).unwrap();
        let Commands::Mcp(mcp) = cli.command else {
            panic!("expected an mcp subcommand");
        };
        let McpCommands::Serve(a) = mcp.command;
        a
    }

    #[test]
    fn default_port_and_bind() {
        let args = serve_args(&["kevin", "serve"]);
        assert_eq!(args.port, 6379);
        assert_eq!(args.bind, "0.0.0.0");
        assert!(!args.gui);
        assert!(!args.tui);
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
        assert!(!args.tui);
    }

    #[test]
    fn tui_flag_parsed() {
        let args = serve_args(&["kevin", "serve", "--tui"]);
        assert!(args.tui);
        assert!(!args.gui);
    }

    #[test]
    fn gui_and_tui_conflict() {
        assert!(Cli::try_parse_from(["kevin", "serve", "--gui", "--tui"]).is_err());
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

    #[test]
    fn mcp_serve_defaults_to_an_embedded_store() {
        let args = mcp_serve_args(&["kevin", "mcp", "serve"]);
        assert!(args.addr.is_none());
        assert!(args.data.is_none());
    }

    #[test]
    fn mcp_serve_accepts_an_addr() {
        let args = mcp_serve_args(&["kevin", "mcp", "serve", "--addr", "127.0.0.1:6379"]);
        assert_eq!(args.addr.as_deref(), Some("127.0.0.1:6379"));
        assert!(args.data.is_none());
    }

    #[test]
    fn mcp_serve_accepts_a_data_file() {
        let args = mcp_serve_args(&["kevin", "mcp", "serve", "--data", "/tmp/x.json"]);
        assert_eq!(args.data.as_deref(), Some("/tmp/x.json"));
        assert!(args.addr.is_none());
    }

    #[test]
    fn mcp_serve_rejects_addr_with_data() {
        assert!(Cli::try_parse_from([
            "kevin",
            "mcp",
            "serve",
            "--addr",
            "127.0.0.1:6379",
            "--data",
            "/tmp/x.json",
        ])
        .is_err());
    }

    #[test]
    fn mcp_serve_rejects_unknown_flags() {
        assert!(Cli::try_parse_from(["kevin", "mcp", "serve", "--nope"]).is_err());
    }

    #[test]
    fn describe_store_names_the_backend() {
        assert_eq!(describe_store(None), "in-process");
        assert_eq!(describe_store(Some("localhost:6379")), "tcp:localhost:6379");
    }
}
