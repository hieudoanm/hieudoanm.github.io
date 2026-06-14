use ratatui::style::{Color, Modifier, Style};

fn index(n: u8) -> Color {
    Color::Indexed(n)
}

pub const fn gold() -> Color {
    Color::Rgb(201, 168, 76)
}

pub const fn muted() -> Color {
    Color::Rgb(107, 90, 62)
}

pub const fn success() -> Color {
    Color::Rgb(129, 199, 132)
}

pub const fn warning() -> Color {
    Color::Rgb(255, 183, 77)
}

pub const fn error() -> Color {
    Color::Rgb(229, 115, 115)
}

pub const fn emerald() -> Color {
    Color::Rgb(52, 211, 153)
}

pub fn title() -> Style {
    Style::new().fg(gold()).add_modifier(Modifier::BOLD)
}

pub fn muted_text() -> Style {
    Style::new().fg(muted())
}

pub fn success_text() -> Style {
    Style::new().fg(success())
}

pub fn warning_text() -> Style {
    Style::new().fg(warning())
}

pub fn error_text() -> Style {
    Style::new().fg(error())
}

pub fn ram_style() -> Style {
    Style::new().fg(emerald())
}

pub fn card() -> Style {
    Style::new().fg(gold()).add_modifier(Modifier::BOLD)
}

pub fn box_style() -> Style {
    Style::new().fg(index(62))
}

pub fn header() -> Style {
    Style::new().fg(index(205)).add_modifier(Modifier::BOLD)
}

pub fn footer() -> Style {
    Style::new().fg(index(241))
}

pub fn row() -> Style {
    Style::default()
}

pub fn selected_row() -> Style {
    Style::new()
        .bg(index(62))
        .fg(index(230))
        .add_modifier(Modifier::BOLD)
}

pub fn label() -> Style {
    Style::new().fg(index(215)).add_modifier(Modifier::BOLD)
}

pub fn value() -> Style {
    Style::new().fg(index(188))
}

pub fn section() -> Style {
    Style::new().fg(index(205)).add_modifier(Modifier::BOLD)
}

pub fn dim() -> Style {
    Style::new().fg(index(241))
}

pub fn highlight() -> Style {
    Style::new().fg(index(220)).add_modifier(Modifier::BOLD)
}

pub fn divider() -> Style {
    Style::new().fg(index(240))
}

pub fn copy_icon() -> &'static str {
    "\u{1F4CB}"
}

pub fn lock_icon() -> &'static str {
    "\u{1F512}"
}

pub fn globe_icon() -> &'static str {
    "\u{1F310}"
}

pub fn key_icon() -> &'static str {
    "\u{1F511}"
}

pub fn warning_icon() -> &'static str {
    "\u{26A0}"
}

pub fn check_icon() -> &'static str {
    "\u{2713}"
}

pub fn cross_icon() -> &'static str {
    "\u{2717}"
}

pub fn green_dot() -> &'static str {
    "\u{25CF}"
}

pub fn red_dot() -> &'static str {
    "\u{25CF}"
}

pub fn yellow_dot() -> &'static str {
    "\u{25CF}"
}

pub fn status_style(value: f64) -> Style {
    if value > 85.0 {
        error_text()
    } else if value > 65.0 {
        warning_text()
    } else {
        success_text()
    }
}

pub fn dot_for_status(status: &str) -> (&'static str, Style) {
    match status {
        "up" | "ok" | "healthy" => (green_dot(), success_text()),
        "down" | "error" | "critical" => (red_dot(), error_text()),
        _ => (yellow_dot(), warning_text()),
    }
}
