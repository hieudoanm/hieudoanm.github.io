use std::collections::HashMap;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_language_colors_contains_common() {
        let colors = language_colors();
        assert_eq!(colors.get("Rust"), Some(&"#DEA584"));
        assert_eq!(colors.get("Go"), Some(&"#00ADD8"));
        assert_eq!(colors.get("Python"), Some(&"#3572A5"));
    }

    #[test]
    fn test_language_colors_count() {
        let colors = language_colors();
        assert!(colors.len() >= 30);
    }

    #[test]
    fn test_language_colors_unknown() {
        let colors = language_colors();
        assert!(colors.get("UnknownLang").is_none());
    }

    #[test]
    fn test_language_colors_hex_format() {
        let colors = language_colors();
        for (_, hex) in &colors {
            assert_eq!(hex.len(), 7);
            assert!(hex.starts_with('#'));
        }
    }
}

pub fn language_colors() -> HashMap<&'static str, &'static str> {
    HashMap::from([
        ("Go", "#00ADD8"),
        ("TypeScript", "#3178C6"),
        ("JavaScript", "#F7DF1E"),
        ("Python", "#3572A5"),
        ("Java", "#B07219"),
        ("Rust", "#DEA584"),
        ("C", "#555555"),
        ("C++", "#F34B7D"),
        ("C#", "#178600"),
        ("Ruby", "#701516"),
        ("PHP", "#4F5D95"),
        ("Swift", "#F05138"),
        ("Kotlin", "#A97BFF"),
        ("Scala", "#C22D40"),
        ("Shell", "#89E051"),
        ("HTML", "#E34F26"),
        ("CSS", "#563D7C"),
        ("Vue", "#41B883"),
        ("Svelte", "#FF3E00"),
        ("Dart", "#00B4AB"),
        ("Lua", "#000080"),
        ("R", "#198CE7"),
        ("Haskell", "#5E5086"),
        ("Elixir", "#6E4A7E"),
        ("Clojure", "#DB5855"),
        ("Erlang", "#B83998"),
        ("Zig", "#EC915C"),
        ("Nix", "#7EBAE4"),
        ("Solidity", "#AA6746"),
        ("YAML", "#CB171E"),
        ("Markdown", "#083FA1"),
        ("Dockerfile", "#384D54"),
        ("Makefile", "#427819"),
        ("CMake", "#DA3434"),
        ("TeX", "#3D6117"),
    ])
}
