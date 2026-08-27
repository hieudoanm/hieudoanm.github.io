use css::Color;
use image::{ImageBuffer, Rgba, RgbaImage};
use layout::Rect;
use paint::{DisplayCommand, DisplayList};

#[derive(Debug, Clone)]
pub struct RenderOptions {
    pub width: u32,
    pub height: u32,
    pub background: Color,
}

impl Default for RenderOptions {
    fn default() -> Self {
        RenderOptions {
            width: 800,
            height: 600,
            background: Color::WHITE,
        }
    }
}

pub struct SoftwareRenderer {
    buffer: RgbaImage,
}

impl SoftwareRenderer {
    pub fn new(options: &RenderOptions) -> Self {
        SoftwareRenderer {
            buffer: RgbaImage::new(options.width, options.height),
        }
    }

    pub fn render(&mut self, list: &DisplayList, options: &RenderOptions) {
        // Fill background
        let bg = color_to_rgba(options.background);
        for pixel in self.buffer.pixels_mut() {
            *pixel = bg;
        }

        // Execute display commands
        for cmd in &list.commands {
            match cmd {
                DisplayCommand::FillRect { rect, color } => {
                    self.fill_rect(rect, *color);
                }
                DisplayCommand::StrokeRect { rect, color, width } => {
                    self.stroke_rect(rect, *color, *width);
                }
                DisplayCommand::DrawText {
                    rect,
                    text,
                    color,
                    font_size,
                } => {
                    self.draw_text(rect, text, *color, *font_size);
                }
            }
        }
    }

    fn fill_rect(&mut self, rect: &Rect, color: Color) {
        let rgba = color_to_rgba(color);
        let x0 = rect.x.round() as i32;
        let y0 = rect.y.round() as i32;
        let x1 = rect.right().round() as i32;
        let y1 = rect.bottom().round() as i32;

        for y in y0..y1 {
            for x in x0..x1 {
                if x >= 0
                    && x < self.buffer.width() as i32
                    && y >= 0
                    && y < self.buffer.height() as i32
                {
                    self.buffer.put_pixel(x as u32, y as u32, rgba);
                }
            }
        }
    }

    fn stroke_rect(&mut self, rect: &Rect, color: Color, width: f32) {
        let rgba = color_to_rgba(color);
        let w = width.round() as i32;
        let x0 = rect.x.round() as i32;
        let y0 = rect.y.round() as i32;
        let x1 = rect.right().round() as i32;
        let y1 = rect.bottom().round() as i32;

        for y in y0..y1 {
            for x in x0..x1 {
                let is_border =
                    (y - y0 < w) || (y1 - y - 1 < w) || (x - x0 < w) || (x1 - x - 1 < w);
                if is_border
                    && x >= 0
                    && x < self.buffer.width() as i32
                    && y >= 0
                    && y < self.buffer.height() as i32
                {
                    self.buffer.put_pixel(x as u32, y as u32, rgba);
                }
            }
        }
    }

    fn draw_text(&mut self, rect: &Rect, text: &str, color: Color, font_size: f32) {
        let rgba = color_to_rgba(color);
        let char_width = (font_size * 0.6).round() as i32;
        let char_height = (font_size * 1.2).round() as i32;
        let start_x = rect.x.round() as i32;
        let start_y = rect.y.round() as i32;

        // Simple block rendering of text as rectangles (placeholder for real font rendering)
        for (i, _) in text.chars().enumerate() {
            let x = start_x + i as i32 * char_width;
            let y = start_y;

            // Draw a small rectangle for each character
            for dy in 0..char_height.min(3) {
                for dx in 0..char_width - 1 {
                    if x + dx >= 0
                        && x + dx < self.buffer.width() as i32
                        && y + dy >= 0
                        && y + dy < self.buffer.height() as i32
                    {
                        self.buffer
                            .put_pixel((x + dx) as u32, (y + dy) as u32, rgba);
                    }
                }
            }
        }
    }

    pub fn into_buffer(self) -> RgbaImage {
        self.buffer
    }

    pub fn save_png(&self, path: &str) -> Result<(), image::ImageError> {
        self.buffer.save(path)
    }

    pub fn buffer(&self) -> &RgbaImage {
        &self.buffer
    }
}

fn color_to_rgba(color: Color) -> Rgba<u8> {
    Rgba([color.r, color.g, color.b, color.a])
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_render_options() {
        let opts = RenderOptions::default();
        assert_eq!(opts.width, 800);
        assert_eq!(opts.height, 600);
    }

    #[test]
    fn create_renderer() {
        let opts = RenderOptions::default();
        let renderer = SoftwareRenderer::new(&opts);
        assert_eq!(renderer.buffer.width(), 800);
        assert_eq!(renderer.buffer.height(), 600);
    }

    #[test]
    fn render_empty_list() {
        let opts = RenderOptions::default();
        let mut renderer = SoftwareRenderer::new(&opts);
        let list = DisplayList::new();
        renderer.render(&list, &opts);
        // Background should be filled
        let pixel = renderer.buffer.get_pixel(0, 0);
        assert_eq!(pixel[0], 255);
        assert_eq!(pixel[1], 255);
        assert_eq!(pixel[2], 255);
    }

    #[test]
    fn render_fill_rect() {
        let opts = RenderOptions::default();
        let mut renderer = SoftwareRenderer::new(&opts);
        let mut list = DisplayList::new();
        list.push(DisplayCommand::FillRect {
            rect: Rect::new(10.0, 10.0, 50.0, 50.0),
            color: Color::new(255, 0, 0, 255),
        });
        renderer.render(&list, &opts);
        let pixel = renderer.buffer.get_pixel(20, 20);
        assert_eq!(pixel[0], 255);
        assert_eq!(pixel[1], 0);
        assert_eq!(pixel[2], 0);
    }

    #[test]
    fn render_out_of_bounds_rect() {
        let opts = RenderOptions::default();
        let mut renderer = SoftwareRenderer::new(&opts);
        let mut list = DisplayList::new();
        list.push(DisplayCommand::FillRect {
            rect: Rect::new(-10.0, -10.0, 5.0, 5.0),
            color: Color::new(255, 0, 0, 255),
        });
        renderer.render(&list, &opts);
        // Should not panic
    }

    #[test]
    fn color_conversion() {
        let c = Color::new(128, 64, 32, 200);
        let rgba = color_to_rgba(c);
        assert_eq!(rgba[0], 128);
        assert_eq!(rgba[1], 64);
        assert_eq!(rgba[2], 32);
        assert_eq!(rgba[3], 200);
    }
}
