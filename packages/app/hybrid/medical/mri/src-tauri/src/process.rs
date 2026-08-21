use serde::Serialize;
use std::io::{BufRead, BufReader};
use std::process::{Command, Stdio};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::thread::JoinHandle;
use std::time::{Duration, Instant};

/// Scientific tools the process manager is allowed to execute. Everything
/// else is rejected before a process is ever spawned.
pub const ALLOWED_TOOLS: &[&str] = &[
  "dcm2niix",
  "antsRegistration",
  "antsApplyTransforms",
  "N4BiasFieldCorrection",
  "bet",
  "flirt",
  "fslmaths",
  "mrconvert",
  "dwi2mask",
  "dwi2tensor",
];

#[derive(Debug, Clone)]
pub struct CommandSpec {
  pub executable: String,
  pub args: Vec<String>,
}

impl CommandSpec {
  pub fn new(executable: &str, args: &[String]) -> Self {
    Self {
      executable: executable.to_string(),
      args: args.to_vec(),
    }
  }
}

pub fn is_allowed(executable: &str) -> bool {
  ALLOWED_TOOLS.contains(&executable)
}

/// Structured validation: bare tool names from the allowlist only, no NUL
/// bytes in arguments. Never build commands through string concatenation.
pub fn validate_spec(spec: &CommandSpec) -> Result<(), String> {
  if spec.executable.is_empty() {
    return Err("executable is required".to_string());
  }
  if !is_allowed(&spec.executable) {
    return Err(format!("tool '{}' is not in the allowlist", spec.executable));
  }
  if spec.args.iter().any(|arg| arg.contains('\0')) {
    return Err("arguments must not contain NUL bytes".to_string());
  }
  Ok(())
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ProcessResult {
  pub exit_code: Option<i32>,
  pub stdout: String,
  pub stderr: String,
  pub timed_out: bool,
  pub cancelled: bool,
}

impl ProcessResult {
  pub fn succeeded(&self) -> bool {
    !self.timed_out && !self.cancelled && self.exit_code == Some(0)
  }

  fn failure(stderr: String) -> Self {
    Self {
      exit_code: None,
      stdout: String::new(),
      stderr,
      timed_out: false,
      cancelled: false,
    }
  }
}

pub struct RunOptions<'a> {
  pub timeout: Duration,
  pub cancel: &'a AtomicBool,
}

enum Outcome {
  Exited(std::process::ExitStatus),
  TimedOut,
  Cancelled,
}

/// Runs a command with piped output capture, polling for exit, deadline, or
/// cancellation. Reader threads drain the pipes so large outputs cannot
/// deadlock the poll loop.
pub fn run(spec: &CommandSpec, options: &RunOptions) -> ProcessResult {
  let mut child = match Command::new(&spec.executable)
    .args(&spec.args)
    .stdout(Stdio::piped())
    .stderr(Stdio::piped())
    .spawn()
  {
    Ok(child) => child,
    Err(error) => return ProcessResult::failure(error.to_string()),
  };

  let stdout = spawn_reader(child.stdout.take());
  let stderr = spawn_reader(child.stderr.take());  let start = Instant::now();
  let outcome = loop {
    if options.cancel.load(Ordering::Relaxed) {
      let _ = child.kill();
      break Outcome::Cancelled;
    }
    match child.try_wait() {
      Ok(Some(status)) => break Outcome::Exited(status),
      Ok(None) => {}
      Err(error) => {
        return ProcessResult::failure(error.to_string());
      }
    }
    if start.elapsed() >= options.timeout {
      let _ = child.kill();
      break Outcome::TimedOut;
    }
    std::thread::sleep(Duration::from_millis(25));
  };
  let _ = child.wait();
  let timed_out = matches!(outcome, Outcome::TimedOut);
  let cancelled = matches!(outcome, Outcome::Cancelled);
  ProcessResult {
    exit_code: match outcome {
      Outcome::Exited(status) => status.code(),
      _ => None,
    },
    stdout: stdout.join().unwrap_or_default(),
    stderr: stderr.join().unwrap_or_default(),
    timed_out,
    cancelled,
  }
}

fn spawn_reader<R>(pipe: Option<R>) -> JoinHandle<String>
where
  R: std::io::Read + Send + 'static,
{
  std::thread::spawn(move || {
    let mut buffered_reader = match pipe {
      Some(pipe) => BufReader::new(pipe),
      None => return String::new(),
    };
    let mut collected = String::new();
    loop {
      let mut line = String::new();
      match buffered_reader.read_line(&mut line) {
        Ok(0) | Err(_) => break,
        Ok(_) => collected.push_str(&line),
      }
    }
    collected
  })
}

/// Convenience wrapper for tests and callers without cancellation.
pub fn run_simple(spec: &CommandSpec, timeout: Duration) -> ProcessResult {
  let cancel = Arc::new(AtomicBool::new(false));
  run(
    spec,
    &RunOptions {
      timeout,
      cancel: &cancel,
    },
  )
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn validates_against_the_allowlist() {
    assert!(is_allowed("dcm2niix"));
    assert!(!is_allowed("rm"));
    let ok = CommandSpec::new("dcm2niix", &["-z".to_string(), "y".to_string()]);
    assert!(validate_spec(&ok).is_ok());
    let blocked = CommandSpec::new("rm", &["-rf".to_string(), "/".to_string()]);
    assert!(validate_spec(&blocked).is_err());
    let empty = CommandSpec::new("", &[]);
    assert!(validate_spec(&empty).is_err());
  }

  #[test]
  fn captures_stdout_of_a_successful_run() {
    let spec = CommandSpec::new("/bin/echo", &["hello".to_string()]);
    let result = run_simple(&spec, Duration::from_secs(10));
    assert!(result.succeeded());
    assert_eq!(result.exit_code, Some(0));
    assert!(result.stdout.contains("hello"));
  }

  #[test]
  fn reports_spawn_failures() {
    let spec = CommandSpec::new("/nonexistent-tool-xyz", &[]);
    let result = run_simple(&spec, Duration::from_secs(1));
    assert!(!result.succeeded());
    assert!(result.stderr.contains("No such file"));
  }

  #[test]
  fn enforces_timeouts() {
    let spec = CommandSpec::new("/bin/sleep", &["5".to_string()]);
    let result = run_simple(&spec, Duration::from_millis(200));
    assert!(result.timed_out);
    assert!(!result.succeeded());
  }

  #[test]
  fn honours_cancellation() {
    let cancel = Arc::new(AtomicBool::new(true));
    let spec = CommandSpec::new("/bin/sleep", &["5".to_string()]);
    let result = run(
      &spec,
      &RunOptions {
        timeout: Duration::from_secs(10),
        cancel: &cancel,
      },
    );
    assert!(result.cancelled);
    assert!(!result.succeeded());
  }
}
