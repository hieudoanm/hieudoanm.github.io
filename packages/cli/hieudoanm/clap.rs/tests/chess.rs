use std::fs;
use std::process::Command;
use std::sync::atomic::{AtomicUsize, Ordering};

fn binary() -> Command {
    Command::new(env!("CARGO_BIN_EXE_hieudoanm"))
}

fn test_dir(name: &str) -> String {
    static ID: AtomicUsize = AtomicUsize::new(0);
    let id = ID.fetch_add(1, Ordering::SeqCst);
    let dir = format!("/tmp/hieudoanm_test_chess_{name}_{id}");
    let _ = fs::create_dir_all(&dir);
    dir
}

#[test]
fn chess_fen_svg_creates_svg() {
    let dir = test_dir("fen_svg");
    let out = format!("{dir}/board.svg");

    let output = binary()
        .args([
            "chess",
            "fen",
            "svg",
            "--fen",
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            "--out",
            &out,
        ])
        .output()
        .expect("failed to run chess fen svg");
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );

    let svg = fs::read_to_string(&out).expect("SVG file should exist");
    assert!(svg.starts_with(r#"<svg xmlns="http://www.w3.org/2000/svg""#));
    assert!(svg.trim_end().ends_with("</svg>"));
    assert!(svg.contains("width=\"480\""));
    assert!(svg.contains("height=\"480\""));
    assert!(svg.contains("#f0d9b5"));
    assert!(svg.contains("#b58863"));
}

#[test]
fn chess_fen_svg_defaults_to_board_svg() {
    let dir = test_dir("fen_svg_default");

    let output = binary()
        .current_dir(&dir)
        .args([
            "chess",
            "fen",
            "svg",
            "--fen",
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        ])
        .output()
        .expect("failed to run chess fen svg");
    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );

    let svg_path = format!("{dir}/board.svg");
    assert!(
        fs::metadata(&svg_path).is_ok(),
        "default board.svg should exist"
    );
    let svg = fs::read_to_string(&svg_path).unwrap();
    assert!(svg.contains("width=\"480\""));
}

#[test]
fn chess_fen_svg_start_position() {
    let dir = test_dir("fen_start");
    let out = format!("{dir}/start.svg");

    let output = binary()
        .args([
            "chess",
            "fen",
            "svg",
            "--fen",
            "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
            "--out",
            &out,
        ])
        .output()
        .unwrap();
    assert!(output.status.success());

    let svg = fs::read_to_string(&out).unwrap();
    assert_eq!(svg.matches("<rect ").count(), 64);
}

#[test]
fn chess_pgn_fen_is_stub() {
    let output = binary()
        .args(["chess", "pgn", "fen"])
        .output()
        .expect("failed to run chess pgn fen");
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("not yet implemented"),
        "stdout: {stdout}"
    );
}

#[test]
fn chess_pgn_uci_is_stub() {
    let output = binary()
        .args(["chess", "pgn", "uci"])
        .output()
        .expect("failed to run chess pgn uci");
    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(
        stdout.contains("not yet implemented"),
        "stdout: {stdout}"
    );
}

#[test]
fn chess_elo_via_stdin() {
    use std::io::Write;

    let mut child = binary()
        .args(["chess", "elo"])
        .stdin(std::process::Stdio::piped())
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .spawn()
        .expect("failed to spawn chess elo");

    let stdin = child.stdin.as_mut().unwrap();
    stdin.write_all(b"1500\n1700\n1.0\n32\n").unwrap();
    let output = child.wait_with_output().unwrap();

    assert!(
        output.status.success(),
        "stderr: {}",
        String::from_utf8_lossy(&output.stderr)
    );
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("Your new rating:"), "stdout: {stdout}");
}

#[test]
fn chess_elo_win_raises_rating() {
    use std::io::Write;

    let mut child = binary()
        .args(["chess", "elo"])
        .stdin(std::process::Stdio::piped())
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .spawn()
        .expect("failed to spawn chess elo");

    let stdin = child.stdin.as_mut().unwrap();
    stdin.write_all(b"1500\n1500\n1.0\n32\n").unwrap();
    let output = child.wait_with_output().unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("1516"), "stdout: {stdout}");
}

#[test]
fn chess_elo_loss_lowers_rating() {
    use std::io::Write;

    let mut child = binary()
        .args(["chess", "elo"])
        .stdin(std::process::Stdio::piped())
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .spawn()
        .expect("failed to spawn chess elo");

    let stdin = child.stdin.as_mut().unwrap();
    stdin.write_all(b"1500\n1500\n0.0\n32\n").unwrap();
    let output = child.wait_with_output().unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("1484"), "stdout: {stdout}");
}

#[test]
fn chess_elo_default_k_factor() {
    use std::io::Write;

    let mut child = binary()
        .args(["chess", "elo"])
        .stdin(std::process::Stdio::piped())
        .stdout(std::process::Stdio::piped())
        .stderr(std::process::Stdio::piped())
        .spawn()
        .expect("failed to spawn chess elo");

    let stdin = child.stdin.as_mut().unwrap();
    stdin.write_all(b"1500\n1500\n0.5\n\n").unwrap();
    let output = child.wait_with_output().unwrap();

    assert!(output.status.success());
    let stdout = String::from_utf8_lossy(&output.stdout);
    assert!(stdout.contains("1500"), "stdout: {stdout}");
}
