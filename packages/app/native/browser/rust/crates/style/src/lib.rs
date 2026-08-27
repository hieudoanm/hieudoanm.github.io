pub use css::{Color, Display, FontWeight, Length, Property, SelectorKind, Visibility};
use dom::{Dom, NodeId};
use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct ComputedStyle {
    pub color: Color,
    pub background_color: Color,
    pub width: Length,
    pub height: Length,
    pub margin_top: Length,
    pub margin_right: Length,
    pub margin_bottom: Length,
    pub margin_left: Length,
    pub padding_top: Length,
    pub padding_right: Length,
    pub padding_bottom: Length,
    pub padding_left: Length,
    pub border_top_width: Length,
    pub border_right_width: Length,
    pub border_bottom_width: Length,
    pub border_left_width: Length,
    pub border_top_color: Color,
    pub border_right_color: Color,
    pub border_bottom_color: Color,
    pub border_left_color: Color,
    pub font_size: Length,
    pub font_family: String,
    pub font_weight: FontWeight,
    pub display: Display,
    pub visibility: Visibility,
    pub opacity: f32,
}

impl Default for ComputedStyle {
    fn default() -> Self {
        ComputedStyle {
            color: Color::BLACK,
            background_color: Color::TRANSPARENT,
            width: Length::Auto,
            height: Length::Auto,
            margin_top: Length::Px(0.0),
            margin_right: Length::Px(0.0),
            margin_bottom: Length::Px(0.0),
            margin_left: Length::Px(0.0),
            padding_top: Length::Px(0.0),
            padding_right: Length::Px(0.0),
            padding_bottom: Length::Px(0.0),
            padding_left: Length::Px(0.0),
            border_top_width: Length::Px(0.0),
            border_right_width: Length::Px(0.0),
            border_bottom_width: Length::Px(0.0),
            border_left_width: Length::Px(0.0),
            border_top_color: Color::BLACK,
            border_right_color: Color::BLACK,
            border_bottom_color: Color::BLACK,
            border_left_color: Color::BLACK,
            font_size: Length::Px(16.0),
            font_family: "serif".to_string(),
            font_weight: FontWeight::Normal,
            display: Display::Block,
            visibility: Visibility::Visible,
            opacity: 1.0,
        }
    }
}

#[derive(Debug, Default)]
pub struct StyleContext {
    styles: HashMap<NodeId, ComputedStyle>,
    default: ComputedStyle,
}

impl StyleContext {
    pub fn new() -> Self {
        StyleContext {
            styles: HashMap::new(),
            default: ComputedStyle::default(),
        }
    }

    pub fn compute(&mut self, dom: &Dom, stylesheet: &css::Stylesheet) {
        self.compute_node(dom, dom.root(), stylesheet);
    }

    fn compute_node(&mut self, dom: &Dom, node_id: NodeId, stylesheet: &css::Stylesheet) {
        let mut style = ComputedStyle::default();

        // Apply stylesheet rules
        for rule in &stylesheet.rules {
            if self.matches_selector(dom, &rule.selectors, node_id) {
                for decl in &rule.declarations {
                    self.apply_declaration(&mut style, &decl.value);
                }
            }
        }

        // Apply inline styles from style attribute
        if let Some(style_attr) = dom.attribute(node_id, "style") {
            for decl in css::parse_declarations(style_attr) {
                self.apply_declaration(&mut style, &decl.value);
            }
        }

        self.styles.insert(node_id, style);

        for &child in dom.children(node_id) {
            self.compute_node(dom, child, stylesheet);
        }
    }

    fn matches_selector(&self, dom: &Dom, selectors: &[css::Selector], node_id: NodeId) -> bool {
        selectors
            .iter()
            .any(|sel| self.matches_single_selector(dom, sel, node_id))
    }

    fn matches_single_selector(
        &self,
        dom: &Dom,
        selector: &css::Selector,
        node_id: NodeId,
    ) -> bool {
        if selector.parts.is_empty() {
            return false;
        }
        self.matches_last_part(dom, selector, selector.parts.len() - 1, node_id)
    }

    fn matches_last_part(
        &self,
        dom: &Dom,
        selector: &css::Selector,
        part_idx: usize,
        node_id: NodeId,
    ) -> bool {
        let part = &selector.parts[part_idx];
        if !self.matches_part(dom, &part.kind, node_id) {
            return false;
        }

        if part_idx == 0 {
            return true;
        }

        let parent = match dom.parent(node_id) {
            Some(p) => p,
            None => return false,
        };

        let combinator = selector.parts[part_idx - 1].combinator;
        match combinator {
            Some(css::Combinator::Child) => {
                self.matches_last_part(dom, selector, part_idx - 1, parent)
            }
            Some(css::Combinator::Descendant) | None => {
                let mut current = parent;
                loop {
                    if self.matches_last_part(dom, selector, part_idx - 1, current) {
                        return true;
                    }
                    match dom.parent(current) {
                        Some(p) => current = p,
                        None => return false,
                    }
                }
            }
            _ => false,
        }
    }

    fn matches_part(&self, dom: &Dom, kind: &SelectorKind, node_id: NodeId) -> bool {
        match kind {
            SelectorKind::Universal => dom.is_element(node_id),
            SelectorKind::Type(name) => dom.element_name(node_id) == Some(name.as_str()),
            SelectorKind::Class(name) => {
                if let Some(class_attr) = dom.attribute(node_id, "class") {
                    class_attr.split_whitespace().any(|c| c == name.as_str())
                } else {
                    false
                }
            }
            SelectorKind::Id(name) => dom.attribute(node_id, "id") == Some(name.as_str()),
        }
    }

    fn apply_declaration(&self, style: &mut ComputedStyle, prop: &Property) {
        match prop {
            Property::Color(c) => style.color = *c,
            Property::BackgroundColor(c) => style.background_color = *c,
            Property::Width(l) => style.width = *l,
            Property::Height(l) => style.height = *l,
            Property::Margin(l) => {
                style.margin_top = *l.clone();
                style.margin_right = *l.clone();
                style.margin_bottom = *l.clone();
                style.margin_left = *l.clone();
            }
            Property::Padding(l) => {
                style.padding_top = *l.clone();
                style.padding_right = *l.clone();
                style.padding_bottom = *l.clone();
                style.padding_left = *l.clone();
            }
            Property::Border(b) => {
                style.border_top_width = b.width;
                style.border_right_width = b.width;
                style.border_bottom_width = b.width;
                style.border_left_width = b.width;
                style.border_top_color = b.color;
                style.border_right_color = b.color;
                style.border_bottom_color = b.color;
                style.border_left_color = b.color;
            }
            Property::FontSize(l) => style.font_size = *l,
            Property::FontFamily(f) => style.font_family = f.clone(),
            Property::FontWeight(w) => style.font_weight = *w,
            Property::Display(d) => style.display = *d,
            Property::Visibility(v) => style.visibility = *v,
            Property::Opacity(o) => style.opacity = *o,
            Property::Unknown(_) => {}
        }
    }

    pub fn get(&self, node_id: NodeId) -> &ComputedStyle {
        self.styles.get(&node_id).unwrap_or(&self.default)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use css::{Declaration, Selector, SelectorKind, SelectorPart, Stylesheet};

    fn make_stylesheet(declarations: Vec<Property>) -> css::Stylesheet {
        Stylesheet {
            rules: vec![css::CssRule {
                selectors: vec![Selector {
                    parts: vec![SelectorPart {
                        kind: SelectorKind::Universal,
                        combinator: None,
                    }],
                }],
                declarations: declarations
                    .into_iter()
                    .enumerate()
                    .map(|(i, p)| Declaration {
                        name: format!("prop{i}"),
                        value: p,
                    })
                    .collect(),
            }],
        }
    }

    #[test]
    fn default_style() {
        let style = ComputedStyle::default();
        assert_eq!(style.color, Color::BLACK);
        assert_eq!(style.display, Display::Block);
        assert_eq!(style.opacity, 1.0);
    }

    #[test]
    fn compute_text_color() {
        let mut dom = Dom::new();
        let root = dom.root();
        let div = dom.create_element("div", "", root);

        let ss = make_stylesheet(vec![Property::Color(Color::new(255, 0, 0, 255))]);
        let mut ctx = StyleContext::new();
        ctx.compute(&dom, &ss);
        assert_eq!(ctx.get(div).color, Color::new(255, 0, 0, 255));
    }

    #[test]
    fn matches_class_selector() {
        let mut dom = Dom::new();
        let root = dom.root();
        let div = dom.create_element("div", "", root);
        dom.set_attribute(div, "class", "box");

        let ss = Stylesheet {
            rules: vec![css::CssRule {
                selectors: vec![Selector {
                    parts: vec![SelectorPart {
                        kind: SelectorKind::Class("box".to_string()),
                        combinator: None,
                    }],
                }],
                declarations: vec![Declaration {
                    name: "color".to_string(),
                    value: Property::Color(Color::new(0, 255, 0, 255)),
                }],
            }],
        };

        let mut ctx = StyleContext::new();
        ctx.compute(&dom, &ss);
        assert_eq!(ctx.get(div).color, Color::new(0, 255, 0, 255));
    }

    #[test]
    fn matches_id_selector() {
        let mut dom = Dom::new();
        let root = dom.root();
        let div = dom.create_element("div", "", root);
        dom.set_attribute(div, "id", "main");

        let ss = Stylesheet {
            rules: vec![css::CssRule {
                selectors: vec![Selector {
                    parts: vec![SelectorPart {
                        kind: SelectorKind::Id("main".to_string()),
                        combinator: None,
                    }],
                }],
                declarations: vec![Declaration {
                    name: "font-size".to_string(),
                    value: Property::FontSize(Length::Px(20.0)),
                }],
            }],
        };

        let mut ctx = StyleContext::new();
        ctx.compute(&dom, &ss);
        assert_eq!(ctx.get(div).font_size, Length::Px(20.0));
    }

    #[test]
    fn cascading_styles() {
        let mut dom = Dom::new();
        let root = dom.root();
        let div = dom.create_element("div", "", root);
        dom.set_attribute(div, "class", "box");

        let ss = Stylesheet {
            rules: vec![
                css::CssRule {
                    selectors: vec![Selector {
                        parts: vec![SelectorPart {
                            kind: SelectorKind::Universal,
                            combinator: None,
                        }],
                    }],
                    declarations: vec![Declaration {
                        name: "color".to_string(),
                        value: Property::Color(Color::BLACK),
                    }],
                },
                css::CssRule {
                    selectors: vec![Selector {
                        parts: vec![SelectorPart {
                            kind: SelectorKind::Class("box".to_string()),
                            combinator: None,
                        }],
                    }],
                    declarations: vec![Declaration {
                        name: "color".to_string(),
                        value: Property::Color(Color::WHITE),
                    }],
                },
            ],
        };

        let mut ctx = StyleContext::new();
        ctx.compute(&dom, &ss);
        assert_eq!(ctx.get(div).color, Color::WHITE);
    }
}
