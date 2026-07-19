//! Terminal UI key/value manager (`serve --tui`) built on ratatui + crossterm.
//! Mirrors the slint GUI: key/search and value inputs, a No|Key|Value table,
//! delete-all confirmation and a status bar. Blocking; exit with q / Ctrl-C.

use crate::db::DB;
use anyhow::Context;
use crossterm::event::{self, Event, KeyCode, KeyEvent, KeyEventKind, KeyModifiers};
use ratatui::layout::{Constraint, Layout};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::Line;
use ratatui::widgets::{Block, Borders, Paragraph, Row, Table, TableState};
use ratatui::{DefaultTerminal, Frame};
use std::sync::Arc;

const MAX_VALUE_RUNES: usize = 80;

/// The focused element; tab cycles Key → Value → Table.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
enum Focus {
    #[default]
    Key,
    Value,
    Table,
}

/// Runs the TUI on `kv`, blocking until the user quits.
pub fn run(kv: Arc<DB>) -> anyhow::Result<()> {
    let mut terminal = ratatui::try_init().context("initialise terminal")?;
    let result = App::new(kv).run(&mut terminal);
    ratatui::try_restore().context("restore terminal")?;
    result
}

struct App {
    kv: Arc<DB>,
    focus: Focus,
    key_text: String,
    value_text: String,
    keys: Vec<String>,
    cursor: usize,
    status: String,
    confirm_delete: bool,
}

impl App {
    fn new(kv: Arc<DB>) -> Self {
        let mut app = App {
            kv,
            focus: Focus::Key,
            key_text: String::new(),
            value_text: String::new(),
            keys: Vec::new(),
            cursor: 0,
            status: String::new(),
            confirm_delete: false,
        };
        app.rebuild();
        app
    }

    fn run(&mut self, terminal: &mut DefaultTerminal) -> anyhow::Result<()> {
        loop {
            terminal.draw(|frame| self.render(frame))?;
            match event::read()? {
                Event::Key(key) if key.kind == KeyEventKind::Press && self.on_key(key) => {
                    return Ok(());
                }
                Event::Resize(..) | Event::FocusGained | Event::FocusLost => {}
                _ => {}
            }
        }
    }

    fn render(&self, frame: &mut Frame) {
        let chunks = Layout::vertical([
            Constraint::Length(1),
            Constraint::Length(3),
            Constraint::Length(3),
            Constraint::Min(3),
            Constraint::Length(2),
        ])
        .split(frame.area());

        frame.render_widget(
            Paragraph::new(Line::from(format!(
                "kevin — Key/Value ({} keys)",
                self.kv.len()
            )))
            .style(Style::default().add_modifier(Modifier::BOLD)),
            chunks[0],
        );
        frame.render_widget(
            self.input_block("Key/Search", &self.key_text, self.focus == Focus::Key),
            chunks[1],
        );
        frame.render_widget(
            self.input_block("Value", &self.value_text, self.focus == Focus::Value),
            chunks[2],
        );

        let mut state = TableState::default();
        state.select((!self.keys.is_empty()).then_some(self.cursor));
        let rows = self
            .keys
            .iter()
            .enumerate()
            .map(|(no, key)| {
                let value = self.kv.get(key).unwrap_or_default();
                Row::new(vec![
                    (no + 1).to_string(),
                    key.clone(),
                    truncate(&value, MAX_VALUE_RUNES),
                ])
            })
            .collect::<Vec<_>>();
        frame.render_stateful_widget(
            Table::new(
                rows,
                [
                    Constraint::Length(4),
                    Constraint::Percentage(30),
                    Constraint::Min(10),
                ],
            )
            .header(
                Row::new(vec!["No", "Key", "Value"])
                    .style(Style::default().add_modifier(Modifier::BOLD)),
            )
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .title("No | Key | Value"),
            )
            .row_highlight_style(Style::default().bg(Color::DarkGray)),
            chunks[3],
            &mut state,
        );

        let status = if self.confirm_delete {
            "confirm: press D again to delete all keys"
        } else if self.status.is_empty() {
            "ok"
        } else {
            &self.status
        };
        frame.render_widget(Paragraph::new(Line::from(format!(
            "{status}\ntab cycle focus · enter set/edit · ↑/↓ move · d delete · D delete-all · r refresh · q quit"
        ))), chunks[4]);
    }

    fn input_block(&self, title: &str, text: &str, focused: bool) -> Paragraph<'static> {
        let block = if focused {
            Block::default()
                .borders(Borders::ALL)
                .title(title.to_string())
                .border_style(Style::default().fg(Color::Cyan))
        } else {
            Block::default()
                .borders(Borders::ALL)
                .title(title.to_string())
        };
        let cursor = if focused { "▏" } else { "" };
        Paragraph::new(Line::from(format!("{text}{cursor}"))).block(block)
    }

    fn on_key(&mut self, key: KeyEvent) -> bool {
        match key.code {
            KeyCode::Char('c') if key.modifiers.contains(KeyModifiers::CONTROL) => true,
            KeyCode::Char('q') if self.focus == Focus::Table => true,
            KeyCode::Tab => {
                self.cycle();
                false
            }
            KeyCode::Enter => {
                match self.focus {
                    Focus::Table => self.edit_selected(),
                    Focus::Key | Focus::Value => self.do_set(),
                }
                false
            }
            KeyCode::Up if self.focus == Focus::Table => {
                self.move_selection(-1);
                false
            }
            KeyCode::Down if self.focus == Focus::Table => {
                self.move_selection(1);
                false
            }
            KeyCode::Char('D') if self.focus == Focus::Table => {
                self.confirm_delete_all();
                false
            }
            KeyCode::Char('d') if self.focus == Focus::Table => {
                self.delete_selected();
                false
            }
            KeyCode::Char('r') if self.focus == Focus::Table => {
                self.refresh();
                false
            }
            KeyCode::Char(' ') if self.focus == Focus::Table => {
                self.edit_selected();
                false
            }
            KeyCode::Backspace => {
                match self.focus {
                    Focus::Key => {
                        self.key_text.pop();
                        self.rebuild();
                    }
                    Focus::Value => {
                        self.value_text.pop();
                    }
                    Focus::Table => {}
                }
                false
            }
            KeyCode::Char(ch) => {
                match self.focus {
                    Focus::Key => {
                        self.key_text.push(ch);
                        self.rebuild();
                    }
                    Focus::Value => self.value_text.push(ch),
                    Focus::Table => {}
                }
                false
            }
            _ => false,
        }
    }

    fn rebuild(&mut self) {
        let query = self.key_text.trim().to_lowercase();
        self.keys = self
            .kv
            .keys()
            .into_iter()
            .filter(|key| {
                if query.is_empty() {
                    return true;
                }
                let value = self.kv.get(key).unwrap_or_default().to_lowercase();
                key.to_lowercase().contains(&query) || value.contains(&query)
            })
            .collect();
        if self.keys.is_empty() {
            self.cursor = 0;
        } else if self.cursor >= self.keys.len() {
            self.cursor = self.keys.len() - 1;
        }
    }

    fn do_set(&mut self) {
        let key = self.key_text.trim().to_string();
        if key.is_empty() {
            self.status = "enter a key first".to_string();
            return;
        }
        let existed = self.kv.get(&key).is_some();
        self.kv.set(&key, &self.value_text);
        if existed {
            self.status = format!("updated {key}");
        } else {
            self.status = format!("set {key}");
        }
        self.rebuild();
    }

    fn edit_selected(&mut self) {
        if self.cursor >= self.keys.len() {
            return;
        }
        let key = self.keys[self.cursor].clone();
        self.key_text = key.clone();
        self.value_text = self.kv.get(&key).unwrap_or_default();
        self.status = format!("loaded {key}");
        self.focus = Focus::Value;
    }

    fn delete_selected(&mut self) {
        if self.cursor >= self.keys.len() {
            return;
        }
        let key = self.keys[self.cursor].clone();
        if self.kv.del(&key) {
            self.status = format!("deleted {key}");
            self.rebuild();
        }
    }

    fn confirm_delete_all(&mut self) {
        if self.confirm_delete {
            self.confirm_delete = false;
            let n = self.kv.flush();
            self.status = format!("deleted {n} keys");
            self.rebuild();
            return;
        }
        self.confirm_delete = true;
        self.status.clear();
    }

    fn refresh(&mut self) {
        self.key_text.clear();
        self.value_text.clear();
        self.status = "refreshed".to_string();
        self.rebuild();
    }

    fn move_selection(&mut self, delta: isize) {
        if self.keys.is_empty() {
            return;
        }
        let len = self.keys.len() as isize;
        self.cursor = (self.cursor as isize + delta).rem_euclid(len) as usize;
    }

    fn cycle(&mut self) {
        self.focus = match self.focus {
            Focus::Key => Focus::Value,
            Focus::Value => Focus::Table,
            Focus::Table => Focus::Key,
        };
    }
}

fn truncate(s: &str, max: usize) -> String {
    let runes: Vec<char> = s.chars().collect();
    if runes.len() <= max {
        return s.to_string();
    }
    runes[..max].iter().collect::<String>() + "…"
}

#[cfg(test)]
mod tests {
    use super::*;
    use crossterm::event::KeyEvent;
    use crossterm::event::KeyModifiers;

    fn app() -> App {
        App::new(Arc::new(DB::new()))
    }

    #[test]
    fn rebuild_filters_and_sorts() {
        let kv = Arc::new(DB::new());
        kv.set("beta", "two");
        kv.set("alpha", "one");
        kv.set("gamma", "three");
        let mut app = App::new(kv);

        app.rebuild();
        assert_eq!(app.keys, vec!["alpha", "beta", "gamma"]);

        app.key_text = "BE".to_string();
        app.rebuild();
        assert_eq!(app.keys, vec!["beta"]);

        app.key_text = "three".to_string();
        app.rebuild();
        assert_eq!(app.keys, vec!["gamma"]);
    }

    #[test]
    fn do_set_requires_key() {
        let kv = Arc::new(DB::new());
        let mut app = App::new(kv);
        app.do_set();
        assert_eq!(app.status, "enter a key first");

        app.key_text = "foo".to_string();
        app.value_text = "bar".to_string();
        app.do_set();
        assert_eq!(app.status, "set foo");
        assert_eq!(app.kv.get("foo").unwrap(), "bar");
        app.do_set();
        assert_eq!(app.status, "updated foo");
    }

    #[test]
    fn delete_selected_removes_and_clamps() {
        let kv = Arc::new(DB::new());
        kv.set("alpha", "one");
        kv.set("beta", "two");
        let mut app = App::new(kv);
        app.cursor = 1;
        app.delete_selected();
        assert_eq!(app.status, "deleted beta");
        assert!(app.kv.get("beta").is_none());
        assert!(app.kv.get("alpha").is_some());
        assert_eq!(app.cursor, 0);
    }

    #[test]
    fn delete_all_requires_two_presses() {
        let kv = Arc::new(DB::new());
        kv.set("alpha", "one");
        kv.set("beta", "two");
        let mut app = App::new(kv);
        app.focus = Focus::Table;

        assert!(!app.on_key(KeyEvent::new(KeyCode::Char('D'), KeyModifiers::NONE)));
        assert!(app.confirm_delete);
        assert_eq!(app.kv.len(), 2);

        assert!(!app.on_key(KeyEvent::new(KeyCode::Char('D'), KeyModifiers::NONE)));
        assert!(!app.confirm_delete);
        assert_eq!(app.kv.len(), 0);
        assert_eq!(app.status, "deleted 2 keys");
    }

    #[test]
    fn move_selection_wraps() {
        let kv = Arc::new(DB::new());
        kv.set("alpha", "one");
        kv.set("beta", "two");
        let mut app = App::new(kv);

        app.move_selection(-1);
        assert_eq!(app.cursor, 1);
        app.move_selection(1);
        assert_eq!(app.cursor, 0);
    }

    #[test]
    fn cycle_focus_roundtrip() {
        let mut app = app();
        assert_eq!(app.focus, Focus::Key);
        app.cycle();
        assert_eq!(app.focus, Focus::Value);
        app.cycle();
        assert_eq!(app.focus, Focus::Table);
        app.cycle();
        assert_eq!(app.focus, Focus::Key);
    }

    #[test]
    fn quit_only_from_table() {
        let mut app = app();
        app.focus = Focus::Key;
        assert!(!app.on_key(KeyEvent::new(KeyCode::Char('q'), KeyModifiers::NONE)));
        assert_eq!(app.key_text, "q");

        app.focus = Focus::Table;
        assert!(app.on_key(KeyEvent::new(KeyCode::Char('q'), KeyModifiers::NONE)));
        assert!(app.on_key(KeyEvent::new(KeyCode::Char('c'), KeyModifiers::CONTROL,)));
    }

    #[test]
    fn truncate_keeps_short_and_trims_long() {
        assert_eq!(truncate("hi", 80), "hi");
        assert_eq!(truncate("1234567890", 3), "123…");
        assert_eq!(truncate("héllo wörld", 6), "héllo …");
    }
}
