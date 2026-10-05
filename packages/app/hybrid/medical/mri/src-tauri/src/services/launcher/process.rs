use super::command::CommandSpec;
use std::io::{BufRead, BufReader};
use std::process::{Command, Stdio};
use std::sync::mpsc::Sender;
use std::time::{Duration, Instant};

#[derive(Debug, Clone, Default)]
pub struct ProcessOutcome {
    pub exit_code: Option<i32>,
    pub stdout: String,
    pub stderr: String,
    pub timed_out: bool,
}

impl ProcessOutcome {
    pub fn succeeded(&self) -> bool {
        !self.timed_out && self.exit_code == Some(0)
    }
}

/// Runs a command to completion with a deadline, used for `pipeline doctor`.
pub fn run_with_timeout(spec: &CommandSpec, timeout: Duration) -> ProcessOutcome {
    let mut child = match spawn(spec) {
        Ok(child) => child,
        Err(error) => {
            return ProcessOutcome {
                exit_code: None,
                stdout: String::new(),
                stderr: error.to_string(),
                timed_out: false,
            }
        }
    };
    let stdout = drain(&mut child, Stream::Stdout);
    let stderr = drain(&mut child, Stream::Stderr);
    let start = Instant::now();
    let mut timed_out = false;
    let status = loop {
        match child.try_wait() {
            Ok(Some(status)) => break Some(status),
            Ok(None) => {}
            Err(_) => break None,
        }
        if start.elapsed() >= timeout {
            let _ = child.kill();
            timed_out = true;
            break None;
        }
        std::thread::sleep(Duration::from_millis(25));
    };
    let _ = child.wait();
    ProcessOutcome {
        exit_code: status.and_then(|status| status.code()),
        stdout: stdout.join().unwrap_or_default(),
        stderr: stderr.join().unwrap_or_default(),
        timed_out,
    }
}

pub fn spawn(spec: &CommandSpec) -> std::io::Result<std::process::Child> {
    Command::new(&spec.program)
        .args(&spec.args)
        .current_dir(working_dir(spec))
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
}

/// `uv run` needs the interpreter to resolve from inside the project folder.
fn working_dir(spec: &CommandSpec) -> std::path::PathBuf {
    if spec.program == "uv" {
        if let Some(index) = spec.args.iter().position(|arg| arg == "--project") {
            if let Some(project) = spec.args.get(index + 1) {
                return std::path::PathBuf::from(project);
            }
        }
    }
    std::env::current_dir().unwrap_or_else(|_| std::path::PathBuf::from("."))
}

#[derive(Clone, Copy)]
enum Stream {
    Stdout,
    Stderr,
}

fn drain(child: &mut std::process::Child, stream: Stream) -> std::thread::JoinHandle<String> {
    let handle = match stream {
        Stream::Stdout => child
            .stdout
            .take()
            .map(|pipe| Box::new(pipe) as Box<dyn std::io::Read + Send>),
        Stream::Stderr => child
            .stderr
            .take()
            .map(|pipe| Box::new(pipe) as Box<dyn std::io::Read + Send>),
    };
    std::thread::spawn(move || {
        let Some(pipe) = handle else {
            return String::new();
        };
        let mut reader = BufReader::new(pipe);
        let mut collected = String::new();
        loop {
            let mut line = String::new();
            match reader.read_line(&mut line) {
                Ok(0) | Err(_) => break,
                Ok(_) => collected.push_str(&line),
            }
        }
        collected
    })
}

#[derive(Debug, Clone)]
pub struct StreamLine {
    pub stream: &'static str,
    pub line: String,
}

/// Forwards every output line to a channel so a long run can stream to the UI.
pub fn forward_lines<R: std::io::Read + Send + 'static>(
    pipe: Option<R>,
    stream: &'static str,
    sender: Sender<StreamLine>,
) -> std::thread::JoinHandle<()> {
    std::thread::spawn(move || {
        let Some(pipe) = pipe else {
            return;
        };
        let reader = BufReader::new(pipe);
        for line in reader.lines() {
            let Ok(line) = line else { break };
            if sender.send(StreamLine { stream, line }).is_err() {
                break;
            }
        }
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    fn spec(program: &str, args: &[&str]) -> CommandSpec {
        CommandSpec {
            program: program.to_string(),
            args: args.iter().map(|arg| arg.to_string()).collect(),
        }
    }

    #[test]
    fn captures_output_of_a_successful_command() {
        let outcome = run_with_timeout(&spec("/bin/echo", &["hello"]), Duration::from_secs(10));
        assert!(outcome.succeeded());
        assert!(outcome.stdout.contains("hello"));
    }

    #[test]
    fn reports_a_missing_executable() {
        let outcome = run_with_timeout(&spec("/nonexistent-pipeline", &[]), Duration::from_secs(5));
        assert!(!outcome.succeeded());
        assert!(!outcome.stderr.is_empty());
    }

    #[test]
    fn enforces_the_deadline() {
        let outcome = run_with_timeout(&spec("/bin/sleep", &["5"]), Duration::from_millis(150));
        assert!(outcome.timed_out);
        assert!(!outcome.succeeded());
    }

    #[test]
    fn streams_lines_to_the_channel() {
        let (sender, receiver) = std::sync::mpsc::channel();
        let mut output = std::process::Command::new("/bin/echo")
            .args(["a", "b"])
            .stdout(Stdio::piped())
            .spawn()
            .unwrap();
        let lines = forward_lines(output.stdout.take(), "stdout", sender);
        output.wait().unwrap();
        lines.join().unwrap();
        let lines: Vec<StreamLine> = receiver.try_iter().collect();
        assert_eq!(lines.len(), 1);
        assert_eq!(lines[0].line, "a b");
    }
}
