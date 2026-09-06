use ratatui::layout::{Constraint, Direction, Layout, Rect};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span};
use ratatui::widgets::{Block, BorderType, Borders, Paragraph, Wrap};
use ratatui::Frame;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_chat_new() {
        let chat = Chat::new();
        assert!(chat.messages.is_empty());
        assert!(chat.input.is_empty());
    }

    #[test]
    fn test_chat_add_message() {
        let mut chat = Chat::new();
        chat.add_message("user", "hello");
        assert_eq!(chat.messages.len(), 1);
        assert_eq!(chat.messages[0].role, "user");
        assert_eq!(chat.messages[0].content, "hello");
    }

    #[test]
    fn test_chat_input_char() {
        let mut chat = Chat::new();
        chat.input_char('a');
        chat.input_char('b');
        assert_eq!(chat.input, "ab");
    }

    #[test]
    fn test_chat_input_backspace() {
        let mut chat = Chat::new();
        chat.input_char('a');
        chat.input_char('b');
        chat.input_backspace();
        assert_eq!(chat.input, "a");
    }

    #[test]
    fn test_chat_input_backspace_empty() {
        let mut chat = Chat::new();
        chat.input_backspace();
        assert!(chat.input.is_empty());
    }

    #[test]
    fn test_chat_clear_input() {
        let mut chat = Chat::new();
        chat.input_char('x');
        chat.clear_input();
        assert!(chat.input.is_empty());
    }

    #[test]
    fn test_format_message_user() {
        let chat = Chat::new();
        let msg = Message::new("user", "hello");
        let lines = chat.format_message(&msg, 80);
        assert!(!lines.is_empty());
    }

    #[test]
    fn test_format_message_assistant() {
        let chat = Chat::new();
        let msg = Message::new("assistant", "response");
        let lines = chat.format_message(&msg, 80);
        assert!(!lines.is_empty());
    }

    #[test]
    fn test_format_message_error() {
        let chat = Chat::new();
        let msg = Message::new("error", "something went wrong");
        let lines = chat.format_message(&msg, 80);
        assert!(!lines.is_empty());
    }

    #[test]
    fn test_format_message_tool() {
        let chat = Chat::new();
        let msg = Message::new("tool", "result");
        let lines = chat.format_message(&msg, 80);
        assert!(!lines.is_empty());
    }

    #[test]
    fn test_format_message_multiline() {
        let chat = Chat::new();
        let msg = Message::new("user", "line1\nline2\nline3");
        let lines = chat.format_message(&msg, 80);
        assert!(lines.len() >= 5);
    }

    #[test]
    fn test_format_code_block_basic() {
        let chat = Chat::new();
        let lines = chat.format_code_block("rust", None, "fn main() {}");
        assert!(lines.len() >= 2);
    }

    #[test]
    fn test_format_code_block_with_filename() {
        let chat = Chat::new();
        let lines = chat.format_code_block("rust", Some("main.rs"), "fn main() {}");
        assert!(lines.len() >= 2);
    }

    #[test]
    fn test_format_code_block_empty() {
        let chat = Chat::new();
        let lines = chat.format_code_block("", None, "");
        assert!(lines.len() >= 1);
    }

    #[test]
    fn test_chat_add_multiple_messages() {
        let mut chat = Chat::new();
        chat.add_message("user", "hi");
        chat.add_message("assistant", "hello!");
        chat.add_message("user", "how are you?");
        assert_eq!(chat.messages.len(), 3);
        assert_eq!(chat.messages[1].role, "assistant");
    }
}

use super::message::Message;
use super::spinner::Spinner;
use super::state::State;

fn index(n: u8) -> Color {
    Color::Indexed(n)
}

const CODE_BG: Color = Color::Rgb(7, 7, 7);

pub struct Chat {
    pub state: State,
    pub messages: Vec<Message>,
    pub input: String,
    pub spinner: Spinner,
}

impl Chat {
    pub fn new() -> Self {
        Self {
            state: State::Chat,
            messages: Vec::new(),
            input: String::new(),
            spinner: Spinner::new(),
        }
    }

    pub fn add_message(&mut self, role: impl Into<String>, content: impl Into<String>) {
        self.messages.push(Message::new(role, content));
    }

    pub fn input_char(&mut self, c: char) {
        self.input.push(c);
    }

    pub fn input_backspace(&mut self) {
        self.input.pop();
    }

    pub fn clear_input(&mut self) {
        self.input.clear();
    }

    fn format_message<'a>(&self, msg: &'a Message, _width: usize) -> Vec<Line<'a>> {
        let border_color = match msg.role.as_str() {
            "user" => index(39),
            "assistant" => index(42),
            "error" => index(196),
            "tool" => index(214),
            _ => index(240),
        };

        let label = match msg.role.as_str() {
            "user" => Span::styled(
                " You ",
                Style::new().fg(border_color).add_modifier(Modifier::BOLD),
            ),
            "assistant" => Span::styled(
                " Assistant ",
                Style::new().fg(border_color).add_modifier(Modifier::BOLD),
            ),
            "error" => Span::styled(
                " Error ",
                Style::new().fg(border_color).add_modifier(Modifier::BOLD),
            ),
            "tool" => Span::styled(
                " Tool ",
                Style::new().fg(border_color).add_modifier(Modifier::BOLD),
            ),
            _ => Span::styled(format!(" {} ", msg.role), Style::new().fg(border_color)),
        };

        let content_lines: Vec<Line> = msg
            .content
            .lines()
            .map(|line| {
                Line::from(Span::styled(
                    format!("  {}", line),
                    Style::new().fg(index(250)),
                ))
            })
            .collect();

        let mut result = Vec::new();
        result.push(Line::from(Span::styled(
            "\u{2502}",
            Style::new().fg(border_color),
        )));
        result.push(Line::from(vec![
            Span::styled("\u{251C}", Style::new().fg(border_color)),
            label,
            Span::styled("".to_string(), Style::default()),
        ]));
        result.extend(content_lines);
        result.push(Line::from(Span::styled(
            "\u{2514}".to_string(),
            Style::new().fg(border_color),
        )));
        result.push(Line::from(Span::styled("".to_string(), Style::default())));
        result
    }

    fn format_code_block<'a>(
        &self,
        lang: &'a str,
        filename: Option<&'a str>,
        code: &'a str,
    ) -> Vec<Line<'a>> {
        let header = if let Some(fname) = filename {
            format!(" {} {} ", lang, fname)
        } else {
            format!(" {} ", lang)
        };

        let mut lines = Vec::new();
        lines.push(Line::from(Span::styled(
            header,
            Style::new()
                .fg(index(245))
                .bg(CODE_BG)
                .add_modifier(Modifier::BOLD),
        )));
        for line in code.lines() {
            lines.push(Line::from(Span::styled(
                format!(" {}", line),
                Style::new().fg(index(252)).bg(CODE_BG),
            )));
        }
        lines.push(Line::from(Span::styled("".to_string(), Style::default())));
        lines
    }

    pub fn render_chat_view(&self, area: Rect, frame: &mut Frame) {
        let layout = Layout::default()
            .direction(Direction::Vertical)
            .constraints([Constraint::Min(1), Constraint::Length(3)])
            .split(area);

        let mut chat_lines: Vec<Line> = Vec::new();
        for msg in &self.messages {
            chat_lines.extend(self.format_message(msg, layout[0].width as usize));
        }
        if self.state == State::Loading {
            chat_lines.push(Line::from(Span::styled(
                format!(" {} thinking...", self.spinner.current()),
                Style::new().fg(index(240)),
            )));
        }

        let history = Paragraph::new(chat_lines.clone())
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_type(BorderType::Rounded)
                    .style(Style::new().fg(index(62))),
            )
            .wrap(Wrap { trim: false });
        frame.render_widget(history, layout[0]);

        let input_style = if self.state == State::Loading {
            Style::new().fg(index(240))
        } else {
            Style::new().fg(index(15))
        };

        let input_para = Paragraph::new(self.input.as_str())
            .style(input_style)
            .block(
                Block::default()
                    .borders(Borders::ALL)
                    .border_type(BorderType::Rounded)
                    .style(Style::new().fg(index(62))),
            );
        frame.render_widget(input_para, layout[1]);
    }
}
