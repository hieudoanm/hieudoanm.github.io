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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_gold_color_rgb() {
        let c = gold();
        assert_eq!(c, Color::Rgb(201, 168, 76));
    }

    #[test]
    fn test_muted_color_rgb() {
        let c = muted();
        assert_eq!(c, Color::Rgb(107, 90, 62));
    }

    #[test]
    fn test_success_color_rgb() {
        let c = success();
        assert_eq!(c, Color::Rgb(129, 199, 132));
    }

    #[test]
    fn test_warning_color_rgb() {
        let c = warning();
        assert_eq!(c, Color::Rgb(255, 183, 77));
    }

    #[test]
    fn test_error_color_rgb() {
        let c = error();
        assert_eq!(c, Color::Rgb(229, 115, 115));
    }

    #[test]
    fn test_title_style() {
        let s = title();
        assert_eq!(s.fg, Some(gold()));
        assert_eq!(s.add_modifier, Modifier::BOLD);
    }

    #[test]
    fn test_status_style_error() {
        let s = status_style(90.0);
        assert_eq!(s.fg, Some(error()));
    }

    #[test]
    fn test_status_style_warning() {
        let s = status_style(70.0);
        assert_eq!(s.fg, Some(warning()));
    }

    #[test]
    fn test_status_style_success() {
        let s = status_style(50.0);
        assert_eq!(s.fg, Some(success()));
    }

    #[test]
    fn test_status_style_boundary() {
        let s1 = status_style(85.0);
        assert_eq!(s1.fg, Some(warning()));
        let s2 = status_style(85.1);
        assert_eq!(s2.fg, Some(error()));
        let s3 = status_style(65.0);
        assert_eq!(s3.fg, Some(success()));
        let s4 = status_style(65.1);
        assert_eq!(s4.fg, Some(warning()));
    }

    #[test]
    fn test_dot_for_status_up() {
        let (dot, style) = dot_for_status("up");
        assert_eq!(dot, green_dot());
        assert_eq!(style.fg, Some(success()));
    }

    #[test]
    fn test_dot_for_status_ok() {
        let (dot, style) = dot_for_status("ok");
        assert_eq!(dot, green_dot());
        assert_eq!(style.fg, Some(success()));
    }

    #[test]
    fn test_dot_for_status_down() {
        let (dot, style) = dot_for_status("down");
        assert_eq!(dot, red_dot());
        assert_eq!(style.fg, Some(error()));
    }

    #[test]
    fn test_dot_for_status_unknown() {
        let (dot, style) = dot_for_status("unknown");
        assert_eq!(dot, yellow_dot());
        assert_eq!(style.fg, Some(warning()));
    }

    #[test]
    fn test_icons_return_non_empty() {
        assert!(!copy_icon().is_empty());
        assert!(!lock_icon().is_empty());
        assert!(!globe_icon().is_empty());
        assert!(!key_icon().is_empty());
    }
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
