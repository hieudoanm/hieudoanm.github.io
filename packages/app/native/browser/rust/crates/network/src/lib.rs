use std::collections::HashMap;
use url::Url;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ResourceType {
    Html,
    Css,
    JavaScript,
    Image,
    Font,
    Other,
}

impl ResourceType {
    pub fn from_content_type(ct: &str) -> Self {
        if ct.contains("text/html") {
            ResourceType::Html
        } else if ct.contains("text/css") {
            ResourceType::Css
        } else if ct.contains("javascript") || ct.contains("ecmascript") {
            ResourceType::JavaScript
        } else if ct.contains("image/") {
            ResourceType::Image
        } else if ct.contains("font/") || ct.contains("application/font") {
            ResourceType::Font
        } else {
            ResourceType::Other
        }
    }

    pub fn from_url(url: &Url) -> Self {
        match url.path().rsplit('.').next() {
            Some("html" | "htm") => ResourceType::Html,
            Some("css") => ResourceType::Css,
            Some("js") => ResourceType::JavaScript,
            Some("png" | "jpg" | "jpeg" | "gif" | "svg" | "webp") => ResourceType::Image,
            Some("woff" | "woff2" | "ttf" | "otf") => ResourceType::Font,
            _ => ResourceType::Other,
        }
    }
}

#[derive(Debug, Clone)]
pub struct Resource {
    pub url: Url,
    pub content_type: ResourceType,
    pub body: Vec<u8>,
    pub status: u16,
    pub headers: HashMap<String, String>,
}

#[derive(Debug, Clone)]
pub struct NetworkError {
    pub message: String,
}

impl std::fmt::Display for NetworkError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Network error: {}", self.message)
    }
}

impl std::error::Error for NetworkError {}

pub struct ResourceLoader {
    resources: HashMap<Url, Resource>,
}

impl ResourceLoader {
    pub fn new() -> Self {
        ResourceLoader {
            resources: HashMap::new(),
        }
    }

    pub fn load(&self, url: &Url) -> Result<Resource, NetworkError> {
        self.resources
            .get(url)
            .cloned()
            .ok_or_else(|| NetworkError {
                message: format!("Resource not found: {}", url),
            })
    }

    pub fn insert(&mut self, resource: Resource) {
        self.resources.insert(resource.url.clone(), resource);
    }

    pub fn load_html(&mut self, url: &Url, html: &str) -> Result<Resource, NetworkError> {
        let resource = Resource {
            url: url.clone(),
            content_type: ResourceType::Html,
            body: html.as_bytes().to_vec(),
            status: 200,
            headers: HashMap::new(),
        };
        self.insert(resource.clone());
        Ok(resource)
    }

    pub fn load_css(&mut self, url: &Url, css: &str) -> Result<Resource, NetworkError> {
        let resource = Resource {
            url: url.clone(),
            content_type: ResourceType::Css,
            body: css.as_bytes().to_vec(),
            status: 200,
            headers: HashMap::new(),
        };
        self.insert(resource.clone());
        Ok(resource)
    }
}

impl Default for ResourceLoader {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn resource_type_from_content_type() {
        assert_eq!(
            ResourceType::from_content_type("text/html"),
            ResourceType::Html
        );
        assert_eq!(
            ResourceType::from_content_type("text/css"),
            ResourceType::Css
        );
        assert_eq!(
            ResourceType::from_content_type("image/png"),
            ResourceType::Image
        );
    }

    #[test]
    fn resource_type_from_url() {
        let html_url = Url::parse("https://example.com/page.html").unwrap();
        assert_eq!(ResourceType::from_url(&html_url), ResourceType::Html);

        let css_url = Url::parse("https://example.com/style.css").unwrap();
        assert_eq!(ResourceType::from_url(&css_url), ResourceType::Css);

        let img_url = Url::parse("https://example.com/logo.png").unwrap();
        assert_eq!(ResourceType::from_url(&img_url), ResourceType::Image);
    }

    #[test]
    fn resource_loader_insert_and_load() {
        let mut loader = ResourceLoader::new();
        let url = Url::parse("https://example.com/").unwrap();
        let resource = Resource {
            url: url.clone(),
            content_type: ResourceType::Html,
            body: b"<html>".to_vec(),
            status: 200,
            headers: HashMap::new(),
        };
        loader.insert(resource);

        let loaded = loader.load(&url).unwrap();
        assert_eq!(loaded.status, 200);
    }

    #[test]
    fn resource_loader_not_found() {
        let loader = ResourceLoader::new();
        let url = Url::parse("https://example.com/").unwrap();
        assert!(loader.load(&url).is_err());
    }

    #[test]
    fn load_html() {
        let mut loader = ResourceLoader::new();
        let url = Url::parse("https://example.com/").unwrap();
        let resource = loader.load_html(&url, "<html></html>").unwrap();
        assert_eq!(resource.content_type, ResourceType::Html);
    }

    #[test]
    fn load_css() {
        let mut loader = ResourceLoader::new();
        let url = Url::parse("https://example.com/style.css").unwrap();
        let resource = loader.load_css(&url, "body { color: red; }").unwrap();
        assert_eq!(resource.content_type, ResourceType::Css);
    }
}
