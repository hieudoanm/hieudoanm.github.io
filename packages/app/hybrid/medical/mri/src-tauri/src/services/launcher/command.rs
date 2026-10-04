use crate::error::{AppError, AppResult};
use crate::services::settings::Settings;
use std::path::{Path, PathBuf};

/// Structured command description. Nothing is ever concatenated into a shell
/// string: the program and every argument stay separate.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CommandSpec {
    pub program: String,
    pub args: Vec<String>,
}

impl CommandSpec {
    pub fn display(&self) -> String {
        std::iter::once(self.program.clone())
            .chain(self.args.iter().cloned())
            .collect::<Vec<_>>()
            .join(" ")
    }
}

const INTERPRETER_NAMES: &[&str] = &["uv", "python", "python3", "python3.11", "python3.12"];

/// The only executable the workbench may start is the pipeline interpreter:
/// either `uv` or a Python executable path. Anything else is refused.
pub fn validate_program(program: &str) -> AppResult<()> {
    if program.trim().is_empty() {
        return Err(AppError::Invalid {
            kind: "interpreter",
            value: program.to_string(),
        });
    }
    let file_name = PathBuf::from(program)
        .file_name()
        .map(|name| name.to_string_lossy().to_string())
        .unwrap_or_else(|| program.to_string());
    if INTERPRETER_NAMES.contains(&file_name.as_str()) || file_name.contains("python") {
        return Ok(());
    }
    Err(AppError::Invalid {
        kind: "interpreter",
        value: format!("{program} is not a Python environment or uv"),
    })
}

fn validate_args(args: &[String]) -> AppResult<()> {
    if args.iter().any(|argument| argument.contains('\0')) {
        return Err(AppError::Invalid {
            kind: "argument",
            value: "arguments must not contain NUL bytes".to_string(),
        });
    }
    Ok(())
}

fn uv_project(root: &Path) -> Option<String> {
    if root.join("pyproject.toml").is_file() {
        return Some(root.to_string_lossy().to_string());
    }
    let nested = root.join("pipeline");
    nested
        .join("pyproject.toml")
        .is_file()
        .then(|| nested.to_string_lossy().to_string())
}

/// `uv run --project <dir> pipeline <args...>` when the project is a uv project,
/// otherwise `<python> -m pipeline <args...>`.
pub fn pipeline_command(settings: &Settings, subcommand: &[&str]) -> AppResult<CommandSpec> {
    let root = settings
        .project_root
        .clone()
        .ok_or(AppError::ProjectRootMissing)?;
    let root = PathBuf::from(root);
    if settings.uses_uv() {
        validate_program("uv")?;
        let mut args: Vec<String> = vec!["run".to_string()];
        if let Some(project) = uv_project(&root) {
            args.push("--project".to_string());
            args.push(project);
        }
        args.push("pipeline".to_string());
        args.extend(subcommand.iter().map(|value| value.to_string()));
        validate_args(&args)?;
        return Ok(CommandSpec {
            program: "uv".to_string(),
            args,
        });
    }
    let interpreter = settings.python_env.clone();
    validate_program(&interpreter)?;
    let mut args = vec!["-m".to_string(), "pipeline".to_string()];
    args.extend(subcommand.iter().map(|value| value.to_string()));
    validate_args(&args)?;
    Ok(CommandSpec {
        program: interpreter,
        args,
    })
}

pub fn doctor_command(settings: &Settings) -> AppResult<CommandSpec> {
    pipeline_command(settings, &["doctor", "--verbose"])
}

pub fn help_command(settings: &Settings) -> AppResult<CommandSpec> {
    pipeline_command(settings, &["--help"])
}

pub fn run_command(
    settings: &Settings,
    config_path: &str,
    output_dir: &str,
    run_id: Option<&str>,
) -> AppResult<CommandSpec> {
    let mut subcommand = vec![
        "run".to_string(),
        "--config".to_string(),
        config_path.to_string(),
        "--output-dir".to_string(),
        output_dir.to_string(),
    ];
    if let Some(run_id) = run_id {
        subcommand.push("--run-id".to_string());
        subcommand.push(run_id.to_string());
    }
    let borrowed: Vec<&str> = subcommand.iter().map(String::as_str).collect();
    pipeline_command(settings, &borrowed)
}

#[cfg(test)]
mod tests {
    use super::*;

    fn settings(root: &str, python_env: &str) -> Settings {
        let mut settings = Settings {
            project_root: Some(root.to_string()),
            ..Settings::default()
        };
        settings.python_env = python_env.to_string();
        settings
    }

    #[test]
    fn builds_a_uv_command_without_string_concatenation() {
        let settings = settings("/project", "uv");
        let command = pipeline_command(&settings, &["doctor"]).unwrap();
        assert_eq!(command.program, "uv");
        assert_eq!(command.args, vec!["run", "pipeline", "doctor"]);
    }

    #[test]
    fn points_uv_at_the_pipeline_project_when_present() {
        let dir = tempfile::tempdir().unwrap();
        std::fs::write(dir.path().join("pyproject.toml"), "").unwrap();
        let settings = settings(&dir.path().to_string_lossy(), "uv");
        let command = pipeline_command(&settings, &["split"]).unwrap();
        assert_eq!(command.args[0], "run");
        assert!(command
            .args
            .contains(&dir.path().to_string_lossy().to_string()));
    }

    #[test]
    fn builds_a_python_module_command() {
        let settings = settings("/project", "/opt/venv/bin/python3");
        let command = pipeline_command(&settings, &["train"]).unwrap();
        assert_eq!(command.program, "/opt/venv/bin/python3");
        assert_eq!(command.args, vec!["-m", "pipeline", "train"]);
    }

    #[test]
    fn refuses_any_other_executable() {
        let settings = settings("/project", "/bin/rm");
        let error = pipeline_command(&settings, &["train"]).unwrap_err();
        assert!(error.to_string().contains("not a Python environment"));
        assert!(validate_program("bash").is_err());
        assert!(validate_program("").is_err());
    }

    #[test]
    fn requires_a_project_folder() {
        let settings = Settings::default();
        assert!(matches!(
            pipeline_command(&settings, &["train"]),
            Err(AppError::ProjectRootMissing)
        ));
    }

    #[test]
    fn builds_the_run_command_with_structured_arguments() {
        let settings = settings("/project", "uv");
        let command =
            run_command(&settings, "configs/launched/r_1.yaml", "runs", Some("r_1")).unwrap();
        assert_eq!(
            command.args,
            vec![
                "run",
                "pipeline",
                "run",
                "--config",
                "configs/launched/r_1.yaml",
                "--output-dir",
                "runs",
                "--run-id",
                "r_1"
            ]
        );
    }

    #[test]
    fn builds_the_doctor_command() {
        let settings = settings("/project", "uv");
        let command = doctor_command(&settings).unwrap();
        assert!(command.display().ends_with("pipeline doctor --verbose"));
    }
}
