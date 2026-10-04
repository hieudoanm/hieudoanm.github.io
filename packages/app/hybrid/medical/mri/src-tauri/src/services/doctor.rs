use crate::domain::doctor::{self, DoctorReport};
use crate::services::launcher::command::{doctor_command, help_command};
use crate::services::launcher::process;
use crate::services::settings::Settings;
use std::time::Duration;

pub const DOCTOR_TIMEOUT: Duration = Duration::from_secs(90);

/// Runs `pipeline doctor` and turns its output into a structured report. The
/// raw output is kept so the setup screen can show exactly what the CLI said.
pub fn check(settings: &Settings) -> Result<DoctorReport, String> {
    let command = doctor_command(settings).map_err(|error| error.to_string())?;
    let display = command.display();
    let outcome = process::run_with_timeout(&command, DOCTOR_TIMEOUT);
    let combined = format!("{}{}", outcome.stdout, outcome.stderr);
    if !outcome.succeeded() {
        log::warn!("`{display}` exited with {:?}", outcome.exit_code);
    }
    let mut report = doctor::parse(&combined, &display, outcome.exit_code);
    report.available_commands = available_commands(settings);
    report.can_launch = Some(
        report
            .available_commands
            .iter()
            .any(|command| command == "run"),
    );
    if outcome.timed_out {
        return Err(format!(
      "`{display}` did not finish within {} seconds. Check that the Python environment starts.",
      DOCTOR_TIMEOUT.as_secs()
    ));
    }
    Ok(report)
}

/// Reads the CLI's own command list. A workbench that cannot see a `run`
/// subcommand must not offer to launch a run.
fn available_commands(settings: &Settings) -> Vec<String> {
    let Ok(command) = help_command(settings) else {
        return Vec::new();
    };
    let outcome = process::run_with_timeout(&command, DOCTOR_TIMEOUT);
    doctor::commands_from_help(&format!("{}{}", outcome.stdout, outcome.stderr))
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::services::settings::Settings;

    #[test]
    fn fails_with_a_readable_message_when_the_interpreter_is_missing() {
        let mut settings = Settings {
            project_root: Some("/tmp".to_string()),
            ..Settings::default()
        };
        settings.python_env = "/nonexistent/python3".to_string();
        let report = check(&settings).unwrap();
        assert!(!report.ok);
        assert!(report.command.contains("doctor"));
    }

    #[test]
    fn reports_that_a_project_without_a_run_command_cannot_launch() {
        let dir = tempfile::tempdir().unwrap();
        std::fs::write(dir.path().join("pyproject.toml"), "[project]\nname='p'\n").unwrap();
        std::fs::create_dir_all(dir.path().join("pipeline")).unwrap();
        let settings = Settings {
            project_root: Some(dir.path().to_string_lossy().to_string()),
            python_env: "python3".to_string(),
            ..Settings::default()
        };
        let commands = available_commands(&settings);
        assert!(
            !commands.iter().any(|command| command == "run"),
            "the stub CLI exposes no run command, so launching must stay unavailable: {commands:?}"
        );
    }

    #[test]
    fn fails_without_a_project_folder() {
        let settings = Settings::default();
        let error = check(&settings).unwrap_err();
        assert!(error.contains("project folder is not set"));
    }
}
