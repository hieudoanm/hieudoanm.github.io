use std::io::IsTerminal;

fn enable_color() -> bool {
    std::io::stdout().is_terminal()
}

pub fn green(s: &str) -> String {
    if enable_color() {
        format!("\x1b[32m{s}\x1b[0m")
    } else {
        s.to_string()
    }
}

pub fn red(s: &str) -> String {
    if enable_color() {
        format!("\x1b[31m{s}\x1b[0m")
    } else {
        s.to_string()
    }
}

pub fn yellow(s: &str) -> String {
    if enable_color() {
        format!("\x1b[33m{s}\x1b[0m")
    } else {
        s.to_string()
    }
}

pub fn cyan(s: &str) -> String {
    if enable_color() {
        format!("\x1b[36m{s}\x1b[0m")
    } else {
        s.to_string()
    }
}

pub fn dim(s: &str) -> String {
    if enable_color() {
        format!("\x1b[2m{s}\x1b[0m")
    } else {
        s.to_string()
    }
}

pub fn blue(s: &str) -> String {
    if enable_color() {
        format!("\x1b[34m{s}\x1b[0m")
    } else {
        s.to_string()
    }
}

pub fn gray(s: &str) -> String {
    if enable_color() {
        format!("\x1b[90m{s}\x1b[0m")
    } else {
        s.to_string()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn color_active() -> bool {
        enable_color()
    }

    #[test]
    fn test_green_output() {
        let out = green("hello");
        if color_active() {
            assert_eq!(out, "\x1b[32mhello\x1b[0m");
        } else {
            assert_eq!(out, "hello");
        }
    }

    #[test]
    fn test_red_output() {
        let out = red("error");
        if color_active() {
            assert_eq!(out, "\x1b[31merror\x1b[0m");
        } else {
            assert_eq!(out, "error");
        }
    }

    #[test]
    fn test_yellow_output() {
        let out = yellow("warn");
        if color_active() {
            assert_eq!(out, "\x1b[33mwarn\x1b[0m");
        } else {
            assert_eq!(out, "warn");
        }
    }

    #[test]
    fn test_cyan_output() {
        let out = cyan("info");
        if color_active() {
            assert_eq!(out, "\x1b[36minfo\x1b[0m");
        } else {
            assert_eq!(out, "info");
        }
    }

    #[test]
    fn test_dim_output() {
        let out = dim("muted");
        if color_active() {
            assert_eq!(out, "\x1b[2mmuted\x1b[0m");
        } else {
            assert_eq!(out, "muted");
        }
    }

    #[test]
    fn test_blue_output() {
        let out = blue("link");
        if color_active() {
            assert_eq!(out, "\x1b[34mlink\x1b[0m");
        } else {
            assert_eq!(out, "link");
        }
    }

    #[test]
    fn test_gray_output() {
        let out = gray("note");
        if color_active() {
            assert_eq!(out, "\x1b[90mnote\x1b[0m");
        } else {
            assert_eq!(out, "note");
        }
    }
}
