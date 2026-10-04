use serde::{Deserialize, Serialize};

/// Parsed `pipeline doctor` output. The CLI prints human-readable text, so the
/// workbench parses that text and keeps the raw output for the UI.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DoctorReport {
    #[serde(default)]
    pub ok: bool,
    #[serde(default)]
    pub command: String,
    #[serde(alias = "exit_code")]
    pub exit_code: Option<i32>,
    #[serde(alias = "raw_output")]
    #[serde(default)]
    pub raw_output: String,
    #[serde(alias = "python_version")]
    pub python_version: Option<String>,
    pub platform: Option<String>,
    #[serde(alias = "available_devices")]
    #[serde(default)]
    pub available_devices: Vec<String>,
    #[serde(alias = "recommended_device")]
    pub recommended_device: Option<String>,
    #[serde(alias = "data_path")]
    pub data_path: Option<String>,
    #[serde(alias = "data_path_exists")]
    #[serde(default)]
    pub data_path_exists: bool,
    #[serde(alias = "required_dependencies")]
    #[serde(default)]
    pub required_dependencies: Vec<DependencyStatus>,
    #[serde(alias = "optional_dependencies")]
    #[serde(default)]
    pub optional_dependencies: Vec<DependencyStatus>,
    /// `None` until the CLI's own help output has been inspected.
    #[serde(alias = "can_launch")]
    pub can_launch: Option<bool>,
    #[serde(alias = "available_commands")]
    #[serde(default)]
    pub available_commands: Vec<String>,
}

/// Typer prints its command names inside a rich box panel, one per line, and
/// older/plain renderings use an indented `Commands:` list. Both are read here,
/// because these names decide what the workbench offers to launch.
pub fn commands_from_help(help_output: &str) -> Vec<String> {
    let mut inside_commands = false;
    let mut name_offset: Option<usize> = None;
    let mut commands: Vec<String> = Vec::new();
    for line in help_output.lines() {
        let trimmed = line.trim();
        if is_commands_header(trimmed) {
            inside_commands = true;
            name_offset = None;
            continue;
        }
        if !inside_commands {
            continue;
        }
        if strip_panel(trimmed).is_empty() {
            inside_commands = false;
            continue;
        }
        if let Some(name) = command_name(line, &mut name_offset) {
            if !commands.contains(&name) {
                commands.push(name);
            }
        }
    }
    commands
}

/// A panel header (`Commands:`, `Commands`, or `╭─ Commands ─╮`) starts the list.
fn is_commands_header(trimmed: &str) -> bool {
    let mut text = strip_panel(trimmed);
    text = text.trim_end_matches(':').trim().to_string();
    text.eq_ignore_ascii_case("commands")
}

/// Drops the box-drawing border so only the panel's text content is left.
fn strip_panel(line: &str) -> String {
    line.trim_matches(|c: char| PANEL_CHARS.contains(&c) || c.is_whitespace())
        .to_string()
}

const PANEL_CHARS: [char; 6] = ['│', '─', '╭', '╮', '╰', '╯'];

/// The command name occupies a fixed column, so a description that wrapped onto
/// the next line is not mistaken for another command.
fn command_name(line: &str, name_offset: &mut Option<usize>) -> Option<String> {
    let chars: Vec<char> = line.chars().collect();
    let offset = match *name_offset {
        Some(offset) => offset,
        None => {
            let offset = chars.iter().position(|c| !c.is_whitespace() && *c != '│')?;
            *name_offset = Some(offset);
            offset
        }
    };
    let token: String = chars
        .get(offset..)?
        .iter()
        .take_while(|c| !c.is_whitespace())
        .collect();
    if token.is_empty() {
        None
    } else {
        Some(token)
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DependencyStatus {
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub installed: bool,
}

const OK_MARK: char = '✓';

fn dependency(line: &str) -> Option<DependencyStatus> {
    let trimmed = line.trim();
    let (mark, rest) = trimmed.split_at(trimmed.chars().next()?.len_utf8());
    if mark != OK_MARK.to_string() && mark != "✗" {
        return None;
    }
    Some(DependencyStatus {
        name: rest.trim().to_string(),
        installed: mark == OK_MARK.to_string(),
    })
}

fn value_after(line: &str, prefix: &str) -> Option<String> {
    line.trim()
        .strip_prefix(prefix)
        .map(|value| value.trim().to_string())
        .filter(|value| !value.is_empty())
}

#[derive(Clone, Copy)]
enum Section {
    None,
    Required,
    Optional,
}

fn section_of(line: &str) -> Section {
    if line.contains("Required dependencies:") {
        return Section::Required;
    }
    if line.contains("Optional dependencies:") {
        return Section::Optional;
    }
    Section::None
}

pub fn parse(output: &str, command: &str, exit_code: Option<i32>) -> DoctorReport {
    let mut required = Vec::new();
    let mut optional = Vec::new();
    let mut section = Section::None;
    let mut python_version = None;
    let mut platform = None;
    let mut available_devices = Vec::new();
    let mut recommended_device = None;
    let mut data_path = None;
    let mut data_path_exists = false;
    for line in output.lines() {
        if let Some(value) = value_after(line, "Python version:") {
            python_version = Some(value);
        }
        if let Some(value) = value_after(line, "Platform:") {
            platform = Some(value);
        }
        if let Some(value) = value_after(line, "Available devices:") {
            available_devices = value
                .split(',')
                .map(|item| item.trim().to_string())
                .collect();
        }
        if let Some(value) = value_after(line, "Recommended device:") {
            recommended_device = Some(value);
        }
        if let Some(value) = value_after(line, "Data path:") {
            data_path = Some(value);
        }
        if let Some(value) = value_after(line, "Data path exists:") {
            data_path_exists = value.starts_with(OK_MARK);
        }
        match section_of(line) {
            Section::Required => {
                section = Section::Required;
            }
            Section::Optional => {
                section = Section::Optional;
            }
            Section::None => {
                if let Some(entry) = dependency(line) {
                    match section {
                        Section::Required => required.push(entry),
                        Section::Optional => optional.push(entry),
                        Section::None => {}
                    }
                }
            }
        }
    }
    let missing_required = required.iter().any(|entry| !entry.installed);
    let ok = exit_code == Some(0) && !missing_required && data_path_exists;
    DoctorReport {
        ok,
        command: command.to_string(),
        exit_code,
        raw_output: output.to_string(),
        python_version,
        platform,
        available_devices,
        recommended_device,
        data_path,
        data_path_exists,
        required_dependencies: required,
        optional_dependencies: optional,
        can_launch: None,
        available_commands: Vec::new(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn reads_the_command_names_out_of_typer_help() {
        let help = [
            "Usage: pipeline [OPTIONS] COMMAND [ARGS]...",
            "",
            "Options:",
            "  --help  Show this message and exit.",
            "",
            "Commands:",
            "  doctor     Check the environment.",
            "  run        Execute a pipeline run.",
            "  list-runs  List runs on disk.",
        ]
        .join("\n");
        assert_eq!(
            commands_from_help(&help),
            vec!["doctor", "run", "list-runs"]
        );
    }

    #[test]
    fn finds_no_commands_in_help_without_a_command_panel() {
        assert!(commands_from_help("Usage: pipeline [OPTIONS]\n").is_empty());
    }

    /// Real `pipeline --help` output from Typer's rich renderer, which draws a
    /// box panel rather than an indented list and wraps long descriptions.
    const RICH_HELP: &str = concat!(
        "Usage: pipeline [OPTIONS] COMMAND [ARGS]...\n",
        "\n",
        "Options:\n",
        "╭─ Options ───────────────────────────────────────────────────────────────────╮\n",
        "│ --help          Show this message and exit.                                 │\n",
        "╰──────────────────────────────────────────────────────────────────────────────╯\n",
        "\n",
        "╭─ Commands ───────────────────────────────────────────────────────────────────╮\n",
        "│ doctor          Check system dependencies and configuration.                 │\n",
        "│ export-schemas  Export configuration schemas as JSON Schema.                 │\n",
        "│ list-runs       List all runs.                                               │\n",
        "│ data            Data management commands.                                    │\n",
        "│ run             Run the configured stages and write one run folder.          │\n",
        "│                 Because the description wrapped onto this line.             │\n",
        "│ split           Create train/validation/test splits.                         │\n",
        "╰──────────────────────────────────────────────────────────────────────────────╯\n",
    );

    #[test]
    fn reads_commands_out_of_a_rich_box_panel() {
        assert_eq!(
            commands_from_help(RICH_HELP),
            vec![
                "doctor",
                "export-schemas",
                "list-runs",
                "data",
                "run",
                "split"
            ]
        );
    }

    #[test]
    fn a_wrapped_description_is_not_read_as_a_command() {
        let commands = commands_from_help(RICH_HELP);

        assert!(commands.contains(&"run".to_string()));
        assert!(!commands.iter().any(|name| name.contains("Because")));
    }

    #[test]
    fn the_run_command_is_visible_so_the_workbench_can_launch() {
        assert!(commands_from_help(RICH_HELP).contains(&"run".to_string()));
    }

    #[test]
    fn stops_at_the_end_of_the_command_panel() {
        let help = format!("{RICH_HELP}\n╭─ Notes ─╮\n│ not a command │\n╰─────────╯\n");

        assert!(!commands_from_help(&help).contains(&"not".to_string()));
    }

    /// The captured output of `pipeline --help`, so a Typer upgrade that changes
    /// the panel layout fails here instead of silently disabling Launch.
    #[test]
    fn parses_the_captured_pipeline_help() {
        let commands = commands_from_help(include_str!("../../tests/fixtures/pipeline_help.txt"));

        assert!(commands.contains(&"run".to_string()), "{commands:?}");
        assert!(commands.contains(&"doctor".to_string()), "{commands:?}");
        assert!(commands.contains(&"list-runs".to_string()), "{commands:?}");
    }

    const OUTPUT: &str = "Pipeline doctor - checking system...\n\n\
    Python version: 3.14.0\n\
    Platform: Darwin (arm64)\n\n\
    Available devices: cpu, mps\n\
    Recommended device: mps\n\n\
    Required dependencies:\n  ✓ numpy\n  ✓ pandas\n  ✗ typer\n\n\
    Optional dependencies:\n  ✓ torch\n  ✗ nibabel\n\n\
    Data path: /Users/x/project/data\n\
    Data path exists: ✓\n";

    #[test]
    fn reads_the_system_summary() {
        let report = parse(OUTPUT, "pipeline doctor", Some(0));
        assert_eq!(report.python_version.as_deref(), Some("3.14.0"));
        assert_eq!(report.platform.as_deref(), Some("Darwin (arm64)"));
        assert_eq!(report.available_devices.len(), 2);
        assert_eq!(report.recommended_device.as_deref(), Some("mps"));
        assert!(report.data_path_exists);
    }

    #[test]
    fn separates_required_from_optional_dependencies() {
        let report = parse(OUTPUT, "pipeline doctor", Some(0));
        assert_eq!(report.required_dependencies.len(), 3);
        assert_eq!(report.required_dependencies[2].name, "typer");
        assert!(!report.required_dependencies[2].installed);
        assert_eq!(report.optional_dependencies.len(), 2);
    }

    #[test]
    fn reports_failure_when_a_required_dependency_is_missing() {
        let report = parse(OUTPUT, "pipeline doctor", Some(0));
        assert!(!report.ok);
    }

    #[test]
    fn reports_success_when_everything_is_present() {
        let output = "Python version: 3.12.0\nRequired dependencies:\n  ✓ numpy\n\
      Data path: /data\nData path exists: ✓\n";
        let report = parse(output, "pipeline doctor", Some(0));
        assert!(report.ok);
    }

    #[test]
    fn reports_failure_when_the_data_path_is_missing() {
        let output = "Python version: 3.12.0\nRequired dependencies:\n  ✓ numpy\n\
      Data path: /data\nData path exists: ✗\n";
        assert!(!parse(output, "pipeline doctor", Some(0)).ok);
    }

    #[test]
    fn reports_failure_on_a_non_zero_exit_code() {
        let output = "Python version: 3.12.0\nRequired dependencies:\n  ✓ numpy\n\
      Data path: /data\nData path exists: ✓\n";
        assert!(!parse(output, "pipeline doctor", Some(1)).ok);
    }

    #[test]
    fn keeps_unparseable_output_for_the_user() {
        let report = parse("command not found", "uv run pipeline doctor", Some(127));
        assert_eq!(report.exit_code, Some(127));
        assert!(report.raw_output.contains("command not found"));
        assert!(!report.ok);
    }
}
