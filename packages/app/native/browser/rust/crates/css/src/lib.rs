use std::fmt;

#[derive(Debug, Clone, PartialEq)]
pub struct Stylesheet {
    pub rules: Vec<CssRule>,
}

#[derive(Debug, Clone, PartialEq)]
pub struct CssRule {
    pub selectors: Vec<Selector>,
    pub declarations: Vec<Declaration>,
}

#[derive(Debug, Clone, PartialEq)]
pub struct Selector {
    pub parts: Vec<SelectorPart>,
}

#[derive(Debug, Clone, PartialEq)]
pub struct SelectorPart {
    pub kind: SelectorKind,
    pub combinator: Option<Combinator>,
}

#[derive(Debug, Clone, PartialEq)]
pub enum SelectorKind {
    Universal,
    Type(String),
    Class(String),
    Id(String),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Combinator {
    Descendant,
    Child,
    AdjacentSibling,
}

#[derive(Debug, Clone, PartialEq)]
pub struct Declaration {
    pub name: String,
    pub value: Property,
}

#[derive(Debug, Clone, PartialEq)]
pub enum Property {
    Color(Color),
    BackgroundColor(Color),
    Width(Length),
    Height(Length),
    Margin(Box<Length>),
    Padding(Box<Length>),
    Border(Border),
    FontSize(Length),
    FontFamily(String),
    FontWeight(FontWeight),
    Display(Display),
    Visibility(Visibility),
    Opacity(f32),
    Unknown(String),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Color {
    pub r: u8,
    pub g: u8,
    pub b: u8,
    pub a: u8,
}

impl Color {
    pub const TRANSPARENT: Color = Color {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
    };
    pub const BLACK: Color = Color {
        r: 0,
        g: 0,
        b: 0,
        a: 255,
    };
    pub const WHITE: Color = Color {
        r: 255,
        g: 255,
        b: 255,
        a: 255,
    };

    pub fn new(r: u8, g: u8, b: u8, a: u8) -> Self {
        Color { r, g, b, a }
    }

    pub fn from_hex(hex: &str) -> Option<Color> {
        let hex = hex.trim_start_matches('#');
        match hex.len() {
            3 => {
                let r = u8::from_str_radix(&hex[0..1], 16).ok()? * 17;
                let g = u8::from_str_radix(&hex[1..2], 16).ok()? * 17;
                let b = u8::from_str_radix(&hex[2..3], 16).ok()? * 17;
                Some(Color { r, g, b, a: 255 })
            }
            6 => {
                let r = u8::from_str_radix(&hex[0..2], 16).ok()?;
                let g = u8::from_str_radix(&hex[2..4], 16).ok()?;
                let b = u8::from_str_radix(&hex[4..6], 16).ok()?;
                Some(Color { r, g, b, a: 255 })
            }
            8 => {
                let r = u8::from_str_radix(&hex[0..2], 16).ok()?;
                let g = u8::from_str_radix(&hex[2..4], 16).ok()?;
                let b = u8::from_str_radix(&hex[4..6], 16).ok()?;
                let a = u8::from_str_radix(&hex[6..8], 16).ok()?;
                Some(Color { r, g, b, a })
            }
            _ => None,
        }
    }

    pub fn from_name(name: &str) -> Option<Color> {
        match name.to_ascii_lowercase().as_str() {
            "black" => Some(Color::BLACK),
            "white" => Some(Color::WHITE),
            "red" => Some(Color::new(255, 0, 0, 255)),
            "green" => Some(Color::new(0, 128, 0, 255)),
            "blue" => Some(Color::new(0, 0, 255, 255)),
            "transparent" => Some(Color::TRANSPARENT),
            _ => None,
        }
    }
}

impl fmt::Display for Color {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if self.a == 255 {
            write!(f, "#{:02x}{:02x}{:02x}", self.r, self.g, self.b)
        } else {
            write!(
                f,
                "#{:02x}{:02x}{:02x}{:02x}",
                self.r, self.g, self.b, self.a
            )
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Length {
    Px(f32),
    Auto,
}

impl Length {
    pub fn px(val: f32) -> Self {
        Length::Px(val)
    }

    pub fn value(&self) -> f32 {
        match self {
            Length::Px(v) => *v,
            Length::Auto => 0.0,
        }
    }
}

#[derive(Debug, Clone, PartialEq)]
pub struct Border {
    pub width: Length,
    pub style: BorderStyle,
    pub color: Color,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BorderStyle {
    None,
    Solid,
    Dashed,
    Dotted,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum FontWeight {
    Normal,
    Bold,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Display {
    Block,
    Inline,
    InlineBlock,
    None,
    Flex,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Visibility {
    Visible,
    Hidden,
    Collapse,
}

pub fn parse_css(input: &str) -> Stylesheet {
    let mut rules = Vec::new();
    let trimmed = input.trim();
    if trimmed.is_empty() {
        return Stylesheet { rules };
    }

    let mut depth = 0i32;
    let mut rule_start = 0;
    let mut in_string = false;
    let mut string_char = '"';

    for (i, ch) in input.char_indices() {
        match ch {
            '"' | '\'' if !in_string => {
                in_string = true;
                string_char = ch;
            }
            c if c == string_char && in_string => {
                in_string = false;
            }
            '{' if !in_string => {
                depth += 1;
                if depth == 1 {
                    rule_start = i + 1;
                }
            }
            '}' if !in_string => {
                depth -= 1;
                if depth == 0 {
                    let selector_str = input[0..rule_start - 1].trim();
                    let body = &input[rule_start..i];
                    if let Some(rule) = parse_rule(selector_str, body) {
                        rules.push(rule);
                    }
                }
                if depth <= 0 {
                    // Find next rule start
                    let rest = &input[i + 1..];
                    if let Some(pos) = rest.find(|c: char| c != ' ' && c != '\n' && c != '\r') {
                        // This is a simplified parser - in real CSS, selectors are before {
                    }
                }
            }
            _ => {}
        }
    }

    Stylesheet { rules }
}

fn parse_rule(selector_str: &str, body: &str) -> Option<CssRule> {
    let selectors = parse_selectors(selector_str);
    if selectors.is_empty() {
        return None;
    }

    let declarations = parse_declarations(body);
    Some(CssRule {
        selectors,
        declarations,
    })
}

fn parse_selectors(input: &str) -> Vec<Selector> {
    input
        .split(',')
        .filter_map(|s| {
            let s = s.trim();
            if s.is_empty() {
                return None;
            }
            let parts = parse_selector_parts(s);
            if parts.is_empty() {
                None
            } else {
                Some(Selector { parts })
            }
        })
        .collect()
}

fn parse_selector_parts(input: &str) -> Vec<SelectorPart> {
    let mut parts = Vec::new();
    for token in input.split_whitespace() {
        let token = token.trim();
        if token.is_empty() {
            continue;
        }

        let (kind, remaining) = if token == "*" {
            (SelectorKind::Universal, &token[1..])
        } else if let Some(rest) = token.strip_prefix('.') {
            (SelectorKind::Class(rest.to_string()), rest)
        } else if let Some(rest) = token.strip_prefix('#') {
            (SelectorKind::Id(rest.to_string()), rest)
        } else {
            (SelectorKind::Type(token.to_string()), "")
        };

        parts.push(SelectorPart {
            kind,
            combinator: None,
        });
    }
    parts
}

pub fn parse_declarations(body: &str) -> Vec<Declaration> {
    let mut declarations = Vec::new();
    for part in body.split(';') {
        let part = part.trim();
        if part.is_empty() {
            continue;
        }
        if let Some((name, value)) = part.split_once(':') {
            let name = name.trim().to_string();
            let value = value.trim().to_string();
            if let Some(prop) = parse_property(&name, &value) {
                declarations.push(Declaration { name, value: prop });
            }
        }
    }
    declarations
}

fn parse_property(name: &str, value: &str) -> Option<Property> {
    match name {
        "color" => Color::from_hex(value)
            .or_else(|| Color::from_name(value))
            .map(Property::Color),
        "background-color" => Color::from_hex(value)
            .or_else(|| Color::from_name(value))
            .map(Property::BackgroundColor),
        "width" => parse_length(value).map(Property::Width),
        "height" => parse_length(value).map(Property::Height),
        "margin" => parse_length(value).map(|l| Property::Margin(Box::new(l))),
        "padding" => parse_length(value).map(|l| Property::Padding(Box::new(l))),
        "border" => parse_border(value).map(Property::Border),
        "font-size" => parse_length(value).map(Property::FontSize),
        "font-family" => Some(Property::FontFamily(value.trim_matches('"').to_string())),
        "font-weight" => match value {
            "bold" => Some(Property::FontWeight(FontWeight::Bold)),
            _ => Some(Property::FontWeight(FontWeight::Normal)),
        },
        "display" => match value {
            "block" => Some(Property::Display(Display::Block)),
            "inline" => Some(Property::Display(Display::Inline)),
            "inline-block" => Some(Property::Display(Display::InlineBlock)),
            "none" => Some(Property::Display(Display::None)),
            "flex" => Some(Property::Display(Display::Flex)),
            _ => None,
        },
        "visibility" => match value {
            "visible" => Some(Property::Visibility(Visibility::Visible)),
            "hidden" => Some(Property::Visibility(Visibility::Hidden)),
            "collapse" => Some(Property::Visibility(Visibility::Collapse)),
            _ => None,
        },
        "opacity" => value.parse::<f32>().ok().map(Property::Opacity),
        _ => Some(Property::Unknown(name.to_string())),
    }
}

fn parse_length(value: &str) -> Option<Length> {
    let value = value.trim();
    if value == "auto" {
        return Some(Length::Auto);
    }
    value
        .strip_suffix("px")
        .and_then(|s| s.trim().parse::<f32>().ok())
        .map(Length::Px)
}

fn parse_border(value: &str) -> Option<Border> {
    let parts: Vec<&str> = value.split_whitespace().collect();
    let width = parts
        .first()
        .and_then(|s| parse_length(s))
        .unwrap_or(Length::Px(1.0));
    let style = parts
        .get(1)
        .map(|s| match *s {
            "solid" => BorderStyle::Solid,
            "dashed" => BorderStyle::Dashed,
            "dotted" => BorderStyle::Dotted,
            _ => BorderStyle::None,
        })
        .unwrap_or(BorderStyle::None);
    let color = parts
        .get(2)
        .and_then(|s| Color::from_hex(s).or_else(|| Color::from_name(s)))
        .unwrap_or(Color::BLACK);

    Some(Border {
        width,
        style,
        color,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_empty_css() {
        let ss = parse_css("");
        assert!(ss.rules.is_empty());
    }

    #[test]
    fn parse_single_rule() {
        let ss = parse_css("body { background: white; }");
        assert_eq!(ss.rules.len(), 1);
    }

    #[test]
    fn parse_color_hex() {
        let c = Color::from_hex("#ff0000").unwrap();
        assert_eq!(c, Color::new(255, 0, 0, 255));
    }

    #[test]
    fn parse_color_hex_short() {
        let c = Color::from_hex("#f0f").unwrap();
        assert_eq!(c, Color::new(255, 0, 255, 255));
    }

    #[test]
    fn parse_color_name() {
        assert_eq!(Color::from_name("red"), Some(Color::new(255, 0, 0, 255)));
        assert_eq!(Color::from_name("blue"), Some(Color::new(0, 0, 255, 255)));
    }

    #[test]
    fn parse_length_px() {
        assert_eq!(parse_length("10px"), Some(Length::Px(10.0)));
        assert_eq!(parse_length("auto"), Some(Length::Auto));
    }

    #[test]
    fn parse_selector_type() {
        let selectors = parse_selectors("div");
        assert_eq!(selectors.len(), 1);
        assert_eq!(
            selectors[0].parts[0].kind,
            SelectorKind::Type("div".to_string())
        );
    }

    #[test]
    fn parse_selector_class() {
        let selectors = parse_selectors(".box");
        assert_eq!(selectors.len(), 1);
        assert_eq!(
            selectors[0].parts[0].kind,
            SelectorKind::Class("box".to_string())
        );
    }

    #[test]
    fn parse_selector_id() {
        let selectors = parse_selectors("#main");
        assert_eq!(selectors.len(), 1);
        assert_eq!(
            selectors[0].parts[0].kind,
            SelectorKind::Id("main".to_string())
        );
    }

    #[test]
    fn parse_multiple_selectors() {
        let selectors = parse_selectors("div, span");
        assert_eq!(selectors.len(), 2);
    }

    #[test]
    fn test_parse_declarations() {
        let decls = parse_declarations("color: red; font-size: 16px;");
        assert_eq!(decls.len(), 2);
    }
}
