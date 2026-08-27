use dom::{Dom, NodeId};
use style::{ComputedStyle, Length, StyleContext};

#[derive(Debug, Clone)]
pub struct LayoutBox {
    pub node_id: NodeId,
    pub box_type: BoxType,
    pub children: Vec<LayoutBox>,
    pub rect: Rect,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BoxType {
    Block,
    Inline,
    Text,
}

#[derive(Debug, Clone, Copy, Default)]
pub struct Rect {
    pub x: f32,
    pub y: f32,
    pub width: f32,
    pub height: f32,
}

impl Rect {
    pub fn new(x: f32, y: f32, width: f32, height: f32) -> Self {
        Rect {
            x,
            y,
            width,
            height,
        }
    }

    pub fn right(&self) -> f32 {
        self.x + self.width
    }

    pub fn bottom(&self) -> f32 {
        self.y + self.height
    }
}

#[derive(Debug, Default)]
pub struct LayoutContext {
    pub viewport_width: f32,
    pub viewport_height: f32,
}

impl LayoutContext {
    pub fn new(width: f32, height: f32) -> Self {
        LayoutContext {
            viewport_width: width,
            viewport_height: height,
        }
    }
}

pub fn build_layout_tree(dom: &Dom, styles: &StyleContext) -> Vec<LayoutBox> {
    let mut boxes = Vec::new();
    let body = find_body(dom);
    if let Some(body) = body {
        for &child in dom.children(body) {
            if let Some(box_) = build_box(dom, styles, child, BoxType::Block) {
                boxes.push(box_);
            }
        }
    }
    boxes
}

fn find_body(dom: &Dom) -> Option<NodeId> {
    let root = dom.root();
    let html = dom
        .children(root)
        .iter()
        .find(|&&c| dom.element_name(c) == Some("html"))
        .copied()?;
    dom.children(html)
        .iter()
        .find(|&&c| dom.element_name(c) == Some("body"))
        .copied()
}

fn build_box(
    dom: &Dom,
    styles: &StyleContext,
    node_id: NodeId,
    containing: BoxType,
) -> Option<LayoutBox> {
    let style = styles.get(node_id);

    if style.display == style::Display::None || style.visibility != style::Visibility::Visible {
        return None;
    }

    let is_element = dom.is_element(node_id);
    let is_text = dom.is_text(node_id);

    if !is_element && !is_text {
        return None;
    }

    let box_type = if is_text {
        BoxType::Text
    } else {
        match style.display {
            style::Display::Block => BoxType::Block,
            style::Display::Inline | style::Display::InlineBlock => BoxType::Inline,
            _ => BoxType::Block,
        }
    };

    let mut children = Vec::new();
    for &child_id in dom.children(node_id) {
        if let Some(child_box) = build_box(dom, styles, child_id, box_type) {
            children.push(child_box);
        }
    }

    Some(LayoutBox {
        node_id,
        box_type,
        children,
        rect: Rect::default(),
    })
}

pub fn layout(boxes: &mut [LayoutBox], ctx: &LayoutContext, dom: &Dom, styles: &StyleContext) {
    let mut y = 0.0f32;
    for box_ in boxes.iter_mut() {
        layout_block(box_, ctx, dom, styles, 0.0, &mut y);
    }
}

fn layout_block(
    box_: &mut LayoutBox,
    ctx: &LayoutContext,
    dom: &Dom,
    styles: &StyleContext,
    x: f32,
    y: &mut f32,
) {
    let style = styles.get(box_.node_id);

    let margin_top = style.margin_top.value();
    let margin_bottom = style.margin_bottom.value();
    let padding_top = style.padding_top.value();
    let padding_bottom = style.padding_bottom.value();
    let border_top = style.border_top_width.value();
    let border_bottom = style.border_bottom_width.value();

    *y += margin_top;

    let content_x = x
        + style.margin_left.value()
        + style.border_left_width.value()
        + style.padding_left.value();
    let content_width = match style.width {
        Length::Px(w) => w,
        _ => {
            ctx.viewport_width
                - style.margin_left.value()
                - style.margin_right.value()
                - style.border_left_width.value()
                - style.border_right_width.value()
                - style.padding_left.value()
                - style.padding_right.value()
        }
    };

    box_.rect.x = x;
    box_.rect.y = *y;
    box_.rect.width = content_width
        + style.padding_left.value()
        + style.padding_right.value()
        + style.border_left_width.value()
        + style.border_right_width.value();

    let mut content_y = *y + border_top + padding_top;
    let start_y = content_y;

    for child in box_.children.iter_mut() {
        match child.box_type {
            BoxType::Block => {
                layout_block(child, ctx, dom, styles, content_x, &mut content_y);
            }
            BoxType::Inline | BoxType::Text => {
                layout_inline(child, ctx, dom, styles, content_x, &mut content_y);
            }
        }
    }

    let content_height = match style.height {
        Length::Px(h) => h,
        _ => content_y - start_y,
    };

    box_.rect.height = content_height + padding_top + padding_bottom + border_top + border_bottom;

    *y += box_.rect.height + margin_bottom;
}

fn layout_inline(
    box_: &mut LayoutBox,
    ctx: &LayoutContext,
    dom: &Dom,
    styles: &StyleContext,
    x: f32,
    y: &mut f32,
) {
    let style = styles.get(box_.node_id);

    let font_size = style.font_size.value();
    let text_height = if dom.is_text(box_.node_id) {
        font_size * 1.2
    } else {
        font_size
    };

    let text_width = if dom.is_text(box_.node_id) {
        let text = dom.text_content(box_.node_id).unwrap_or("");
        estimate_text_width(text, font_size)
    } else {
        let mut width = 0.0f32;
        for child in &box_.children {
            width += child.rect.width;
        }
        width.max(style.width.value())
    };

    box_.rect.x = x;
    box_.rect.y = *y;
    box_.rect.width = text_width;
    box_.rect.height = text_height;

    *y += text_height;
}

fn estimate_text_width(text: &str, font_size: f32) -> f32 {
    let char_width = font_size * 0.6;
    text.chars().count() as f32 * char_width
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rect_basics() {
        let r = Rect::new(10.0, 20.0, 100.0, 50.0);
        assert_eq!(r.right(), 110.0);
        assert_eq!(r.bottom(), 70.0);
    }

    #[test]
    fn layout_context() {
        let ctx = LayoutContext::new(1024.0, 768.0);
        assert_eq!(ctx.viewport_width, 1024.0);
        assert_eq!(ctx.viewport_height, 768.0);
    }

    #[test]
    fn build_empty_layout_tree() {
        let dom = Dom::new();
        let styles = StyleContext::new();
        let boxes = build_layout_tree(&dom, &styles);
        assert!(boxes.is_empty());
    }

    #[test]
    fn build_layout_tree_with_div() {
        let mut dom = Dom::new();
        let root = dom.root();
        let html = dom.create_element("html", "", root);
        let body = dom.create_element("body", "", html);
        dom.create_element("div", "", body);

        let styles = StyleContext::new();
        let boxes = build_layout_tree(&dom, &styles);
        assert_eq!(boxes.len(), 1);
    }

    #[test]
    fn test_estimate_text_width() {
        let w = estimate_text_width("hello", 16.0);
        assert!(w > 0.0);
    }

    #[test]
    fn layout_single_block() {
        let mut dom = Dom::new();
        let root = dom.root();
        let html = dom.create_element("html", "", root);
        let body = dom.create_element("body", "", html);
        let _div = dom.create_element("div", "", body);

        let styles = StyleContext::new();
        let ctx = LayoutContext::new(800.0, 600.0);
        let mut boxes = build_layout_tree(&dom, &styles);
        layout(&mut boxes, &ctx, &dom, &styles);

        assert!(!boxes.is_empty());
        assert!(boxes[0].rect.width > 0.0);
    }
}
