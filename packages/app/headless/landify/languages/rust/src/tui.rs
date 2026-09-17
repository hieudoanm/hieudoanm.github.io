//! Terminal editor (`landify tui`) built on ratatui + crossterm. Mirrors the
//! slint `studio` app: edit `landify.yaml` in a YAML pane and drive actions
//! from a `:` command line (save / reload / validate / build / generate /
//! theme). Ships in every build; blocking, exit with q or Ctrl-C.

use anyhow::{anyhow, Context, Result};
use crossterm::event::{self, Event, KeyCode, KeyEvent, KeyEventKind, KeyModifiers};
use ratatui::layout::{Alignment, Constraint, Layout};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, BorderType, Borders, Paragraph, Wrap};
use ratatui::{DefaultTerminal, Frame};
use std::fs;

use crate::config::Config;
use crate::{placeholder, render, themes, validate};

/// Runs the editor on `path` (default `landify.yaml`), blocking until quit.
pub fn run(path: Option<&str>) -> Result<()> {
    let path = path.unwrap_or("landify.yaml").to_string();
    let mut terminal = ratatui::try_init().context("initialise terminal")?;
    let mut app = App::new(path);
    let result = app.run_loop(&mut terminal);
    ratatui::try_restore().context("restore terminal")?;
    result
}

/// Where typed characters go.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
enum Mode {
    #[default]
    Edit,
    Command,
}

/// A minimal line-based text buffer with a (row, char-col) cursor.
#[derive(Debug, Clone, Default)]
struct Editor {
    lines: Vec<String>,
    row: usize,
    col: usize,
}

impl Editor {
    fn new() -> Self {
        Editor {
            lines: vec![String::new()],
            row: 0,
            col: 0,
        }
    }

    fn set_text(&mut self, text: &str) {
        self.lines = text.split('\n').map(str::to_string).collect();
        if self.lines.is_empty() {
            self.lines.push(String::new());
        }
        self.row = 0;
        self.col = 0;
    }

    fn text(&self) -> String {
        self.lines.join("\n")
    }

    fn line_len(&self) -> usize {
        self.lines[self.row].chars().count()
    }

    fn insert_char(&mut self, ch: char) {
        let idx = self.char_index();
        self.lines[self.row].insert(idx, ch);
        self.col += 1;
    }

    /// Removes the character before the cursor; merges lines at home.
    fn backspace(&mut self) {
        if self.col > 0 {
            let idx = self.char_index() - 1;
            self.lines[self.row].remove(idx);
            self.col -= 1;
        } else if self.row > 0 {
            let cur = self.lines.remove(self.row);
            let pos = self.lines[self.row - 1].chars().count();
            self.lines[self.row - 1].push_str(&cur);
            self.row -= 1;
            self.col = pos;
        }
    }

    /// Splits the line at the cursor; the tail moves to the next row.
    fn newline(&mut self) {
        let idx = self.char_index();
        let tail = self.lines[self.row].split_off(idx);
        self.lines.insert(self.row + 1, tail);
        self.row += 1;
        self.col = 0;
    }

    fn move_left(&mut self) {
        if self.col > 0 {
            self.col -= 1;
        } else if self.row > 0 {
            self.row -= 1;
            self.col = self.line_len();
        }
    }

    fn move_right(&mut self) {
        if self.col < self.line_len() {
            self.col += 1;
        } else if self.row + 1 < self.lines.len() {
            self.row += 1;
            self.col = 0;
        }
    }

    fn move_up(&mut self) {
        if self.row > 0 {
            self.row -= 1;
            self.clamp_col();
        }
    }

    fn move_down(&mut self) {
        if self.row + 1 < self.lines.len() {
            self.row += 1;
            self.clamp_col();
        }
    }

    fn home(&mut self) {
        self.col = 0;
    }

    fn end(&mut self) {
        self.col = self.line_len();
    }

    fn char_index(&self) -> usize {
        self.lines[self.row]
            .char_indices()
            .nth(self.col)
            .map(|(i, _)| i)
            .unwrap_or(self.lines[self.row].len())
    }

    fn clamp_col(&mut self) {
        self.col = self.col.min(self.line_len());
    }
}

/// The ratatui palette, defined once and threaded through `render` so colour
/// never scatters across the UI. Matches the shared design tokens (dark
/// variant); truecolour `Color::Rgb` so broad terminal support is automatic.
#[derive(Debug, Clone, Copy)]
struct UiTheme {
    background: Color,
    surface: Color,
    primary: Color,
    accent: Color,
    foreground: Color,
    muted: Color,
    border: Color,
    border_focused: Color,
    error: Color,
    success: Color,
}

impl UiTheme {
    fn dark() -> Self {
        Self {
            background: Color::Rgb(0x1a, 0x1a, 0x1e),
            surface: Color::Rgb(0x26, 0x26, 0x2c),
            primary: Color::Rgb(0x4f, 0x9c, 0xff),
            accent: Color::Rgb(0xa7, 0x8b, 0xfa),
            foreground: Color::Rgb(0xe8, 0xe8, 0xec),
            muted: Color::Rgb(0x9a, 0x9a, 0xa5),
            border: Color::Rgb(0x3a, 0x3a, 0x42),
            border_focused: Color::Rgb(0x4f, 0x9c, 0xff),
            error: Color::Rgb(0xff, 0x5c, 0x5c),
            success: Color::Rgb(0x4f, 0xd6, 0x8c),
        }
    }
}

/// The status bar tone for a message: errors red, confirms green, hints muted.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum StatusTone {
    Ok,
    Error,
    Hint,
}

/// Classifies a status message so the footer colours match its meaning.
fn status_tone(status: &str) -> StatusTone {
    const ERRORS: [&str; 5] = [
        "could not read",
        "save failed",
        "build failed",
        "invalid",
        "unknown",
    ];
    if ERRORS.iter().any(|prefix| status.starts_with(prefix)) {
        return StatusTone::Error;
    }
    const OK: [&str; 6] = [
        "Saved",
        "Reloaded",
        "Built",
        "Generated",
        "valid",
        "Build theme:",
    ];
    if OK.iter().any(|prefix| status.starts_with(prefix)) {
        return StatusTone::Ok;
    }
    StatusTone::Hint
}

fn status_style(tone: StatusTone, theme: UiTheme) -> Style {
    match tone {
        StatusTone::Ok => Style::default()
            .fg(theme.success)
            .add_modifier(Modifier::BOLD),
        StatusTone::Error => Style::default()
            .fg(theme.error)
            .add_modifier(Modifier::BOLD),
        StatusTone::Hint => Style::default().fg(theme.muted).add_modifier(Modifier::DIM),
    }
}

struct App {
    file: String,
    editor: Editor,
    mode: Mode,
    command: String,
    theme_override: String,
    saved: String,
    dirty: bool,
    status: String,
}

impl App {
    fn new(file: String) -> Self {
        let mut app = App {
            file,
            editor: Editor::new(),
            mode: Mode::Edit,
            command: String::new(),
            theme_override: String::new(),
            saved: String::new(),
            dirty: false,
            status: String::new(),
        };
        app.reload();
        app
    }

    fn run_loop(&mut self, terminal: &mut DefaultTerminal) -> Result<()> {
        loop {
            terminal.draw(|frame| self.render(frame))?;
            match event::read()? {
                Event::Key(key) if key.kind == KeyEventKind::Press && self.on_key(key) => {
                    return Ok(());
                }
                _ => {}
            }
        }
    }

    fn render(&self, frame: &mut Frame) {
        let theme = UiTheme::dark();
        let area = frame.area();
        frame.render_widget(
            Block::default().style(Style::default().bg(theme.background)),
            area,
        );
        let chunks = Layout::vertical([
            Constraint::Length(1),
            Constraint::Min(4),
            Constraint::Length(1),
        ])
        .split(area);

        let build_theme = if self.theme_override.is_empty() {
            "yaml".to_string()
        } else {
            self.theme_override.clone()
        };
        let title = Line::from(vec![
            Span::styled(
                "landify tui",
                Style::default()
                    .fg(theme.primary)
                    .add_modifier(Modifier::BOLD),
            ),
            Span::styled(
                format!("  build theme: {build_theme} "),
                Style::default().fg(theme.muted),
            ),
        ]);
        frame.render_widget(
            Paragraph::new(title).style(Style::default().bg(theme.surface)),
            chunks[0],
        );

        let dirty_mark = if self.dirty { " •" } else { " " };
        let mode_label = if self.mode == Mode::Command {
            "COMMAND"
        } else {
            "EDIT"
        };
        let edge_color = if self.mode == Mode::Edit {
            theme.border_focused
        } else {
            theme.border
        };
        let file_title = Line::from(vec![
            Span::styled(
                format!(" {} ", self.file),
                Style::default()
                    .fg(theme.primary)
                    .add_modifier(Modifier::BOLD),
            ),
            Span::styled(dirty_mark, Style::default().fg(theme.accent)),
        ]);
        let mode_title = Line::from(format!(" {mode_label} "))
            .alignment(Alignment::Right)
            .style(
                Style::default()
                    .fg(theme.accent)
                    .add_modifier(Modifier::BOLD),
            );
        let content: Vec<Line> = self
            .editor
            .lines
            .iter()
            .enumerate()
            .map(|(no, line)| {
                let at_cursor = no == self.editor.row;
                let gutter = if at_cursor {
                    Style::default()
                        .fg(theme.primary)
                        .add_modifier(Modifier::BOLD)
                } else {
                    Style::default().fg(theme.muted)
                };
                Line::from(vec![
                    Span::styled(format!("{:>4} ", no + 1), gutter),
                    Span::styled("│ ", Style::default().fg(theme.muted)),
                    Span::styled(line, Style::default().fg(theme.foreground)),
                ])
            })
            .collect();
        let height = chunks[1].height.saturating_sub(2) as usize;
        let scroll = self.editor.row.saturating_sub(height);
        frame.render_widget(
            Paragraph::new(content)
                .block(
                    Block::default()
                        .borders(Borders::ALL)
                        .border_type(BorderType::Rounded)
                        .title(file_title)
                        .title(mode_title)
                        .border_style(Style::default().fg(edge_color)),
                )
                .style(Style::default().bg(theme.surface))
                .wrap(Wrap { trim: true })
                .scroll((scroll as u16, 0)),
            chunks[1],
        );

        let bottom = if self.mode == Mode::Command {
            Line::from(vec![
                Span::styled(
                    ": ",
                    Style::default()
                        .fg(theme.primary)
                        .add_modifier(Modifier::BOLD),
                ),
                Span::styled(self.command.clone(), Style::default().fg(theme.foreground)),
                Span::styled("▏", Style::default().fg(theme.muted)),
            ])
        } else if self.status.is_empty() {
            Line::from(vec![Span::styled(
                "type to edit — Esc for :commands · Ctrl-C to quit",
                Style::default().fg(theme.muted).add_modifier(Modifier::DIM),
            )])
        } else {
            Line::from(vec![Span::styled(
                self.status.clone(),
                status_style(status_tone(&self.status), theme),
            )])
        };
        frame.render_widget(
            Paragraph::new(bottom).style(Style::default().bg(theme.surface)),
            chunks[2],
        );
    }

    fn on_key(&mut self, key: KeyEvent) -> bool {
        if key.code == KeyCode::Char('c') && key.modifiers.contains(KeyModifiers::CONTROL) {
            return true;
        }
        if self.mode == Mode::Command {
            match key.code {
                KeyCode::Esc => {
                    self.command.clear();
                    self.mode = Mode::Edit;
                }
                KeyCode::Enter => {
                    let line = self.command.clone();
                    self.command.clear();
                    self.mode = Mode::Edit;
                    return self.run_command(&line);
                }
                KeyCode::Backspace => {
                    self.command.pop();
                }
                KeyCode::Char(ch) => self.command.push(ch),
                _ => {}
            }
            return false;
        }
        match key.code {
            KeyCode::Esc => self.mode = Mode::Command,
            KeyCode::Char(ch) => self.editor.insert_char(ch),
            KeyCode::Backspace => self.editor.backspace(),
            KeyCode::Enter => self.editor.newline(),
            KeyCode::Left => self.editor.move_left(),
            KeyCode::Right => self.editor.move_right(),
            KeyCode::Up => self.editor.move_up(),
            KeyCode::Down => self.editor.move_down(),
            KeyCode::Home => self.editor.home(),
            KeyCode::End => self.editor.end(),
            KeyCode::Tab => {
                self.editor.insert_char('\t');
            }
            _ => {}
        }
        self.publish_dirty();
        false
    }

    /// Returns true when the command signals quit.
    fn run_command(&mut self, line: &str) -> bool {
        let (name, arg) = parse_command(line);
        match name.as_str() {
            "save" => self.do_save(),
            "reload" => self.reload(),
            "validate" => self.do_validate(),
            "build" => {
                let output = if arg.is_empty() {
                    "index.html".to_string()
                } else {
                    arg
                };
                self.do_build(&output);
            }
            "generate" => {
                let typ = if arg.is_empty() {
                    "product".to_string()
                } else {
                    arg
                };
                self.do_generate(&typ);
            }
            "theme" => self.do_theme(&arg),
            "help" => {
                self.status = "save | reload | validate | build [file] | generate <type> | theme <name|yaml> | help | quit".to_string();
            }
            "quit" | "q" => return true,
            _ => self.status = format!("unknown command {:?} — type help", name),
        }
        false
    }

    fn reload(&mut self) {
        match fs::read_to_string(&self.file) {
            Ok(text) => {
                self.editor.set_text(&text);
                self.saved = text;
                self.dirty = false;
                self.status = format!("Reloaded {} ({} bytes)", self.file, self.saved.len());
            }
            Err(err) => {
                self.saved.clear();
                self.editor.set_text("");
                self.dirty = false;
                self.status = format!("could not read {} — {err}", self.file);
            }
        }
    }

    fn do_save(&mut self) {
        let text = self.editor.text();
        match fs::write(&self.file, &text) {
            Ok(()) => {
                self.saved = text;
                self.dirty = false;
                self.status = format!("Saved {} ({} bytes)", self.file, self.saved.len());
            }
            Err(err) => self.status = format!("save failed — {err}"),
        }
    }

    fn do_validate(&mut self) {
        match valid_content(&self.editor.text()) {
            Ok(()) => self.status = "valid — landify.yaml conforms to the schema".to_string(),
            Err(err) => self.status = format!("invalid — {err}"),
        }
    }

    fn do_build(&mut self, output: &str) {
        match render_config(&self.editor.text(), &self.theme_override) {
            Ok(html) => match fs::write(output, &html) {
                Ok(()) => self.status = format!("Built {output} ({} bytes)", html.len()),
                Err(err) => self.status = format!("build failed — {err}"),
            },
            Err(err) => self.status = format!("build failed — {err}"),
        }
    }

    fn do_generate(&mut self, typ: &str) {
        match placeholder::example(typ) {
            Ok(scaffold) => {
                self.editor.set_text(scaffold);
                self.saved = scaffold.to_string();
                self.dirty = false;
                self.status = format!("Generated {typ} scaffold (unsaved)");
            }
            Err(err) => self.status = err.to_string(),
        }
    }

    fn do_theme(&mut self, name: &str) {
        if name.is_empty() || name == "yaml" || name == "-" {
            self.theme_override.clear();
            self.status = "Build theme: from landify.yaml".to_string();
            return;
        }
        if themes::theme_by_name(name).is_none() {
            self.status = format!(
                "unknown theme {:?} (available: {})",
                name,
                themes::theme_names().join(", ")
            );
            return;
        }
        self.theme_override = name.to_string();
        self.status = format!("Build theme: {name}");
    }

    fn publish_dirty(&mut self) {
        self.dirty = self.editor.text() != self.saved;
    }
}

/// Splits a `:command` line into its name and a single argument.
fn parse_command(line: &str) -> (String, String) {
    let mut parts = line.split_whitespace();
    let name = parts.next().unwrap_or("").to_string();
    let arg = parts.collect::<Vec<_>>().join(" ");
    (name, arg)
}

/// Validates `data` against the schema, mirroring `landify validate`.
fn valid_content(data: &str) -> Result<()> {
    let cfg = Config::load(data.as_bytes())?;
    let errs = validate::errors(&cfg);
    if errs.is_empty() {
        Ok(())
    } else {
        Err(anyhow!("{} problems — {}", errs.len(), errs.join("; ")))
    }
}

/// Validates `data`, applies an optional theme preset, and renders HTML —
/// mirroring `landify build --theme`.
fn render_config(data: &str, theme_override: &str) -> Result<Vec<u8>> {
    let mut cfg = Config::load(data.as_bytes())?;
    if !theme_override.is_empty() {
        let theme = themes::theme_by_name(theme_override).ok_or_else(|| {
            anyhow!(
                "unknown theme {:?} (available: {})",
                theme_override,
                themes::theme_names().join(", ")
            )
        })?;
        cfg.theme = theme;
    }
    let errs = validate::errors(&cfg);
    if !errs.is_empty() {
        return Err(anyhow!("invalid ({} problems) — {}", errs.len(), errs[0]));
    }
    render::render(&cfg)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crossterm::event::{KeyEvent, KeyModifiers};
    use tempfile::tempdir;

    fn app_with(file: String) -> App {
        App::new(file)
    }

    #[test]
    fn editor_roundtrip() {
        let mut e = Editor::new();
        e.set_text("a\nb\n");
        assert_eq!(e.text(), "a\nb\n");
        assert_eq!(e.lines.len(), 3);
    }

    #[test]
    fn editor_insert_backspace_newline() {
        let mut e = Editor::new();
        for ch in "hey".chars() {
            e.insert_char(ch);
        }
        assert_eq!(e.text(), "hey");
        e.backspace();
        assert_eq!(e.text(), "he");

        e.set_text("ab");
        e.col = 1;
        e.newline();
        assert_eq!(e.text(), "a\nb");
        assert_eq!((e.row, e.col), (1, 0));
    }

    #[test]
    fn editor_backspace_merges_lines() {
        let mut e = Editor::new();
        e.set_text("ab\ncd");
        e.row = 1;
        e.col = 0;
        e.backspace();
        assert_eq!(e.text(), "abcd");
        assert_eq!((e.row, e.col), (0, 2));
    }

    #[test]
    fn editor_moves_clamp_and_wrap() {
        let mut e = Editor::new();
        e.set_text("ab\nc");
        e.move_right();
        e.move_right();
        assert_eq!((e.row, e.col), (0, 2));
        e.move_right();
        assert_eq!((e.row, e.col), (1, 0));
        e.move_left();
        assert_eq!((e.row, e.col), (0, 2));
        e.move_down();
        e.move_down();
        assert_eq!(e.row, 1);
        e.col = 99;
        e.move_up();
        assert_eq!((e.row, e.col), (0, 2));
    }

    #[test]
    fn editor_home_end() {
        let mut e = Editor::new();
        e.set_text("hello");
        e.end();
        assert_eq!(e.col, 5);
        e.home();
        assert_eq!(e.col, 0);
    }

    #[test]
    fn parse_command_table() {
        let cases = [
            ("", "", ""),
            ("save", "save", ""),
            ("  build out.html", "build", "out.html"),
            ("generate faq", "generate", "faq"),
            ("theme ocean", "theme", "ocean"),
        ];
        for (line, name, arg) in cases {
            let (got_name, got_arg) = parse_command(line);
            assert_eq!(
                (got_name.as_str(), got_arg.as_str()),
                (name, arg),
                "for {line:?}"
            );
        }
    }

    #[test]
    fn render_config_builds_placeholders() {
        for typ in ["product", "linktree", "status"] {
            let scaffold = placeholder::example(typ).unwrap();
            let html = render_config(scaffold, "").unwrap();
            let out = String::from_utf8(html).unwrap();
            assert!(out.contains("</html>"), "{typ} output missing html footer");
        }
    }

    #[test]
    fn render_config_applies_theme_and_rejects_unknown() {
        let scaffold = placeholder::example("product").unwrap();
        let themed = render_config(scaffold, "ocean").unwrap();
        assert!(!themed.is_empty());
        let err = render_config(scaffold, "banana").unwrap_err();
        assert!(err.to_string().contains("unknown theme"));
    }

    #[test]
    fn render_config_rejects_invalid_yaml() {
        let err = render_config("{broken", "").unwrap_err();
        assert!(err.to_string().contains("parse yaml"));
    }

    #[test]
    fn valid_content_flags_schema_problems() {
        let err = valid_content("type: product\n").unwrap_err();
        assert!(err.to_string().contains("problems"));
        assert!(valid_content(placeholder::example("product").unwrap()).is_ok());
    }

    #[test]
    fn help_and_unknown_commands() {
        let mut app = app_with("no-such-file.yaml".to_string());
        assert!(!app.run_command("help"));
        assert!(app.status.contains("save"));
        assert!(!app.run_command("wibble"));
        assert!(app.status.contains("unknown command"));
    }

    #[test]
    fn quit_returns_true() {
        let mut app = app_with("x.yaml".to_string());
        assert!(app.run_command("q"));
        assert!(app.run_command("quit"));
    }

    #[test]
    fn generate_replaces_buffer_and_clears_dirty() {
        let mut app = app_with("x.yaml".to_string());
        app.run_command("generate faq");
        assert!(app.editor.text().contains("type: faq"));
        assert_eq!(app.saved, app.editor.text());
        assert!(!app.dirty);
        assert!(app.status.contains("Generated faq"));
    }

    #[test]
    fn generate_rejects_unknown_type() {
        let mut app = app_with("x.yaml".to_string());
        app.run_command("generate wibble");
        assert!(app.status.contains("not supported"));
    }

    #[test]
    fn theme_override_roundtrip() {
        let mut app = app_with("x.yaml".to_string());
        app.run_command("theme ocean");
        assert_eq!(app.theme_override, "ocean");
        app.run_command("theme yaml");
        assert!(app.theme_override.is_empty());
        app.run_command("theme banana");
        assert!(app.status.contains("unknown theme"));
    }

    #[test]
    fn save_writes_buffer_and_clears_dirty() {
        let dir = tempdir().unwrap();
        let file = dir.path().join("landify.yaml");
        let path = file.to_str().unwrap();
        let mut app = app_with(path.to_string());
        app.run_command("generate linktree");
        assert!(app.dirty || !app.editor.text().is_empty());

        app.run_command("save");
        let on_disk = fs::read_to_string(path).unwrap();
        assert_eq!(on_disk, app.saved);
        assert!(!app.dirty);
        assert!(app.status.contains("Saved"));
    }

    #[test]
    fn on_key_quit_and_mode_toggle() {
        let mut app = app_with("x.yaml".to_string());
        let ctrl_c = KeyEvent::new(KeyCode::Char('c'), KeyModifiers::CONTROL);
        assert!(app.on_key(ctrl_c));

        let mut app = app_with("x.yaml".to_string());
        assert!(!app.on_key(KeyEvent::new(KeyCode::Esc, KeyModifiers::NONE)));
        assert_eq!(app.mode, Mode::Command);
        assert!(!app.on_key(KeyEvent::new(KeyCode::Esc, KeyModifiers::NONE)));
        assert_eq!(app.mode, Mode::Edit);
    }

    #[test]
    fn typing_tracks_dirty() {
        let dir = tempdir().unwrap();
        let path = dir.path().join("landify.yaml");
        let mut app = App::new(path.to_str().unwrap().to_string());
        app.on_key(KeyEvent::new(KeyCode::Char('a'), KeyModifiers::NONE));
        assert!(app.dirty);
        app.on_key(KeyEvent::new(KeyCode::Char('b'), KeyModifiers::NONE));
        assert_eq!(app.editor.text(), "ab");
        app.do_save();
        assert!(!app.dirty);
    }

    #[test]
    fn ui_theme_dark_palette_matches_tokens() {
        let theme = UiTheme::dark();
        assert_eq!(theme.background, Color::Rgb(0x1a, 0x1a, 0x1e));
        assert_eq!(theme.primary, Color::Rgb(0x4f, 0x9c, 0xff));
        assert_eq!(theme.error, Color::Rgb(0xff, 0x5c, 0x5c));
        assert_eq!(theme.success, Color::Rgb(0x4f, 0xd6, 0x8c));
        assert_eq!(theme.border_focused, theme.primary);
    }

    #[test]
    fn status_tone_classifies_messages() {
        assert_eq!(status_tone("Saved x.yaml (3 bytes)"), StatusTone::Ok);
        assert_eq!(status_tone("valid — landify.yaml conforms"), StatusTone::Ok);
        assert_eq!(status_tone("could not read x.yaml"), StatusTone::Error);
        assert_eq!(status_tone("invalid — 2 problems"), StatusTone::Error);
        assert_eq!(status_tone("unknown command \"wibble\""), StatusTone::Error);
        assert_eq!(status_tone("something else"), StatusTone::Hint);
    }
}
