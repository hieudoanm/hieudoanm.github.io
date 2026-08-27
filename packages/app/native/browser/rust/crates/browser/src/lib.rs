use css::Stylesheet;
use dom::Dom;
use image::RgbaImage;
use layout::{LayoutBox, LayoutContext};
use paint::DisplayList;
use renderer::{RenderOptions, SoftwareRenderer};
use style::StyleContext;
use url::Url;

pub struct Browser {
    dom: Option<Dom>,
    stylesheet: Option<Stylesheet>,
    layout_boxes: Vec<LayoutBox>,
    display_list: DisplayList,
    render_options: RenderOptions,
}

impl Browser {
    pub fn new() -> Self {
        Browser {
            dom: None,
            stylesheet: None,
            layout_boxes: Vec::new(),
            display_list: DisplayList::new(),
            render_options: RenderOptions::default(),
        }
    }

    pub fn set_viewport(&mut self, width: u32, height: u32) {
        self.render_options.width = width;
        self.render_options.height = height;
    }

    pub fn load_html(&mut self, html: &str) {
        self.dom = Some(html::parse_html(html));
        self.stylesheet = None;
        self.layout_boxes.clear();
        self.display_list = DisplayList::new();
    }

    pub fn load_css(&mut self, css_input: &str) {
        self.stylesheet = Some(css::parse_css(css_input));
    }

    pub fn compute_styles(&mut self) {
        if let Some(ref dom) = self.dom {
            let mut style_ctx = StyleContext::new();
            if let Some(ref ss) = self.stylesheet {
                style_ctx.compute(dom, ss);
            }
            // Store for layout phase
            self.dom = self.dom.take(); // Keep dom, we need it later
        }
    }

    pub fn build_layout(&mut self) {
        let dom = match self.dom {
            Some(ref dom) => dom,
            None => return,
        };

        let mut style_ctx = StyleContext::new();
        if let Some(ref ss) = self.stylesheet {
            style_ctx.compute(dom, ss);
        }

        self.layout_boxes = layout::build_layout_tree(dom, &style_ctx);
        let ctx = LayoutContext::new(
            self.render_options.width as f32,
            self.render_options.height as f32,
        );
        layout::layout(&mut self.layout_boxes, &ctx, dom, &style_ctx);
    }

    pub fn build_display_list(&mut self) {
        let dom = match self.dom {
            Some(ref dom) => dom,
            None => return,
        };

        let mut style_ctx = StyleContext::new();
        if let Some(ref ss) = self.stylesheet {
            style_ctx.compute(dom, ss);
        }

        self.display_list = paint::build_display_list(&self.layout_boxes, dom, &style_ctx);
    }

    pub fn render(&self) -> RgbaImage {
        let mut renderer = SoftwareRenderer::new(&self.render_options);
        renderer.render(&self.display_list, &self.render_options);
        renderer.into_buffer()
    }

    pub fn render_to_image(&self, path: &str) -> Result<(), image::ImageError> {
        let img = self.render();
        img.save(path)
    }

    pub fn dom(&self) -> Option<&Dom> {
        self.dom.as_ref()
    }

    pub fn display_list(&self) -> &DisplayList {
        &self.display_list
    }
}

impl Default for Browser {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn new_browser() {
        let browser = Browser::new();
        assert!(browser.dom().is_none());
    }

    #[test]
    fn load_html() {
        let mut browser = Browser::new();
        browser.load_html("<html><body><div>Hello</div></body></html>");
        assert!(browser.dom().is_some());
    }

    #[test]
    fn set_viewport() {
        let mut browser = Browser::new();
        browser.set_viewport(1024, 768);
        assert_eq!(browser.render_options.width, 1024);
        assert_eq!(browser.render_options.height, 768);
    }

    #[test]
    fn full_pipeline() {
        let mut browser = Browser::new();
        browser.load_html(r#"<html><body><div class="box">Hello</div></body></html>"#);
        browser.load_css(".box { background: lightgray; width: 300px; height: 100px; }");
        browser.build_layout();
        browser.build_display_list();
        let img = browser.render();
        assert_eq!(img.width(), 800);
        assert_eq!(img.height(), 600);
    }

    #[test]
    fn render_to_image() {
        let mut browser = Browser::new();
        browser.load_html("<html><body><p>Test</p></body></html>");
        browser.build_layout();
        browser.build_display_list();
        let result = browser.render_to_image("/tmp/test_browser.png");
        assert!(result.is_ok());
    }
}
