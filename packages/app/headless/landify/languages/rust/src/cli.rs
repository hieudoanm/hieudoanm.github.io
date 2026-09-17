//! clap.rs CLI: the root `landify` command with seven subcommands, mirroring
//! the Go cobra wiring: `new`, `validate`, `build`, `themes`, `serve`,
//! `tui`, `studio`. `--file`/`-f` (default `landify.yaml`) is a global flag.

use crate::{gui, placeholder, render, serve, tui, validate};
use anyhow::{anyhow, Result};
use clap::{Parser, Subcommand};
use std::path::Path;

/// Build a landing page from a YAML file.
#[derive(Debug, Parser)]
#[command(
    name = "landify",
    version,
    about = "Build a landing page from a YAML file",
    long_about = "Landify generates a flat, dependency-free landing page from a\nsingle YAML file. No build tooling is required to serve the result — just\nHTML and CSS.\n\nCommands:\n  new       create a landify.yaml with placeholder content\n  validate  check the schema of landify.yaml\n  build     generate index.html from landify.yaml\n  themes    list the sixty-four built-in theme presets\n  serve     preview the result over HTTP\n  tui       open the terminal editor (ships with every build)\n  studio    open the optional desktop editor (GUI build)"
)]
pub struct Cli {
    /// Path to the YAML content file
    #[arg(short = 'f', long, default_value = "landify.yaml", global = true)]
    pub file: String,

    #[command(subcommand)]
    pub command: Command,
}

#[derive(Debug, Subcommand)]
pub enum Command {
    /// Create a landify.yaml with placeholder content
    New(NewArgs),
    /// Validate the schema of landify.yaml
    Validate,
    /// Build index.html from landify.yaml
    Build(BuildArgs),
    /// List the built-in theme presets
    Themes,
    /// Serve the current directory over HTTP
    Serve(ServeArgs),
    /// Open the landify terminal editor
    Tui(TuiArgs),
    /// Open the landify studio desktop app
    Studio(StudioArgs),
}

#[derive(Debug, clap::Args)]
pub struct NewArgs {
    /// Page type to scaffold: product (default) | waitlist | event | download
    /// | app | pricing | portfolio | docs | faq | team | status | linktree
    #[arg(short = 't', long = "type", default_value = "product")]
    pub page_type: String,
    /// Overwrite an existing file
    #[arg(short = 'F', long)]
    pub force: bool,
}

#[derive(Debug, clap::Args)]
pub struct BuildArgs {
    /// Path to write the generated page
    #[arg(short = 'o', long = "output", default_value = "index.html")]
    pub output: String,
    /// Built-in theme preset overriding the YAML theme
    #[arg(short = 't', long = "theme", default_value = "")]
    pub theme: String,
}

#[derive(Debug, clap::Args)]
pub struct ServeArgs {
    /// Directory to serve
    #[arg(short = 'd', long = "dir", default_value = ".")]
    pub dir: String,
    /// Address to bind
    #[arg(short = 'b', long = "bind", default_value = "127.0.0.1")]
    pub bind: String,
    /// Port to listen on
    #[arg(short = 'p', long = "port", default_value_t = 8080)]
    pub port: u16,
}

#[derive(Debug, Default, clap::Args)]
pub struct StudioArgs {
    #[arg(value_name = "path")]
    pub path: Option<String>,
}

#[derive(Debug, Default, clap::Args)]
pub struct TuiArgs {
    #[arg(value_name = "path")]
    pub path: Option<String>,
}

/// Parses the CLI and dispatches to the subcommand.
pub fn run() -> Result<()> {
    let cli = Cli::parse();
    match cli.command {
        Command::New(args) => run_new(&cli.file, &args),
        Command::Validate => run_validate(&cli.file),
        Command::Build(args) => run_build(&cli.file, &args),
        Command::Themes => run_themes(),
        Command::Serve(args) => run_serve(&args),
        Command::Tui(args) => run_tui(&args),
        Command::Studio(args) => run_studio(&args),
    }
}

fn run_new(file: &str, args: &NewArgs) -> Result<()> {
    if Path::new(file).exists() && !args.force {
        return Err(anyhow!("{file} already exists (use --force to overwrite)"));
    }
    placeholder::write_placeholder(file, &args.page_type)?;
    println!("Created {file}\nNext: landify validate\nthen: landify build");
    Ok(())
}

fn run_validate(file: &str) -> Result<()> {
    validate::validate_file(file)?;
    println!("{file} is valid");
    Ok(())
}

fn run_build(file: &str, args: &BuildArgs) -> Result<()> {
    render::build_file(file, &args.output, &args.theme)?;
    println!("Built {} from {file}", args.output);
    Ok(())
}

fn run_themes() -> Result<()> {
    let mut themes = crate::themes::named_themes();
    themes.sort_by(|a, b| a.name.cmp(b.name));
    for t in themes {
        println!("{}\t{}", t.name, t.description);
    }
    Ok(())
}

fn run_serve(args: &ServeArgs) -> Result<()> {
    serve::bind_serve(&args.dir, &args.bind, args.port)
}

fn run_studio(args: &StudioArgs) -> Result<()> {
    gui::run(args.path.as_deref())
}

fn run_tui(args: &TuiArgs) -> Result<()> {
    tui::run(args.path.as_deref())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn parse(args: &[&str]) -> (String, Command) {
        let cli = Cli::try_parse_from(args).unwrap();
        (cli.file, cli.command)
    }

    #[test]
    fn default_file_flag() {
        let (file, _) = parse(&["landify", "validate"]);
        assert_eq!(file, "landify.yaml");
    }

    #[test]
    fn global_file_flag_parsed() {
        let (file, _) = parse(&["landify", "-f", "custom.yaml", "build"]);
        assert_eq!(file, "custom.yaml");
    }

    #[test]
    fn new_defaults() {
        let (_, cmd) = parse(&["landify", "new"]);
        match cmd {
            Command::New(a) => {
                assert_eq!(a.page_type, "product");
                assert!(!a.force);
            }
            _ => panic!("expected new"),
        }
    }

    #[test]
    fn build_flags_parsed() {
        let (_, cmd) = parse(&["landify", "build", "-o", "out.html", "-t", "midnight"]);
        match cmd {
            Command::Build(a) => {
                assert_eq!(a.output, "out.html");
                assert_eq!(a.theme, "midnight");
            }
            _ => panic!("expected build"),
        }
    }

    #[test]
    fn serve_defaults() {
        let (_, cmd) = parse(&["landify", "serve"]);
        match cmd {
            Command::Serve(a) => {
                assert_eq!(a.dir, ".");
                assert_eq!(a.bind, "127.0.0.1");
                assert_eq!(a.port, 8080);
            }
            _ => panic!("expected serve"),
        }
    }

    #[test]
    fn studio_optional_path() {
        let (_, cmd) = parse(&["landify", "studio", "x.yaml"]);
        match cmd {
            Command::Studio(a) => assert_eq!(a.path.as_deref(), Some("x.yaml")),
            _ => panic!("expected studio"),
        }
    }

    #[test]
    fn tui_optional_path() {
        let (_, cmd) = parse(&["landify", "tui", "custom.yaml"]);
        match cmd {
            Command::Tui(a) => assert_eq!(a.path.as_deref(), Some("custom.yaml")),
            _ => panic!("expected tui"),
        }
    }

    #[test]
    fn unknown_flag_rejected() {
        assert!(Cli::try_parse_from(["landify", "serve", "--nope"]).is_err());
    }

    #[test]
    fn unknown_subcommand_rejected() {
        assert!(Cli::try_parse_from(["landify", "frobnicate"]).is_err());
    }
}
