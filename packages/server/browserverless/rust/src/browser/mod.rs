mod dom;
mod js;

use std::cell::RefCell;
use std::rc::Rc;
use anyhow::{Context, Result};
use base64::Engine;
use html5ever::serialize::{serialize, SerializeOpts, TraversalScope};
use html5ever::tendril::TendrilSink;
use html5ever::{parse_document, ParseOpts, local_name, QualName, ns};
use markup5ever_rcdom::{RcDom, SerializableHandle, NodeData, Handle};
use reqwest::Client;
use js::JsRuntime;

pub struct Browser {
    client: Client,
    dom: RcDom,
    js_runtime: Option<JsRuntime>,
    page_url: String,
}

struct ScriptContent {
    inline: Option<String>,
    external: Option<String>,
}

impl Browser {
    pub fn new(url: &str) -> Result<Self> {
        let client = Client::builder()
            .user_agent("Browserverless/0.1.0")
            .cookie_store(true)
            .build()?;
        Ok(Self {
            client,
            dom: RcDom::default(),
            js_runtime: None,
            page_url: url.to_string(),
        })
    }

    pub async fn fetch(&mut self, url: &str) -> Result<()> {
        let response = self.client
            .get(url)
            .send()
            .await
            .context(format!("Failed to fetch URL: {}", url))?;

        if !response.status().is_success() {
            anyhow::bail!("HTTP request failed with status: {}", response.status());
        }

        let html = response.text().await.context("Failed to read response body")?;

        self.dom = parse_document(RcDom::default(), ParseOpts::default())
            .from_utf8()
            .read_from(&mut html.as_bytes())
            .context("Failed to parse HTML")?;

        self.js_runtime = Some(JsRuntime::new(self.dom.document.clone(), url).await?);
        self.execute_scripts().await?;
        if let Some(js) = &self.js_runtime {
            js.idle().await?;
        }
        self.inject_og_media();

        Ok(())
    }

    async fn execute_scripts(&mut self) -> Result<()> {
        let scripts = self.collect_scripts(&self.dom.document);

        for (i, script) in scripts.iter().enumerate() {
            if let Some(js_runtime) = &self.js_runtime {
                if let Some(inline) = &script.inline {
                    if !inline.trim().is_empty() {
                        if let Err(e) = js_runtime.execute(inline).await {
                            eprintln!("Failed to execute script {}: {}", i, e);
                        }
                    }
                }
                if let Some(src) = &script.external {
                    match self.fetch_external_script(src).await {
                        Ok(code) => {
                            if let Err(e) = js_runtime.execute(&code).await {
                                eprintln!("Failed to execute external script {}: {}", i, e);
                            }
                        }
                        Err(e) => {
                            eprintln!("Failed to fetch external script '{}': {}", src, e);
                        }
                    }
                }
            }
        }
        Ok(())
    }

    async fn fetch_external_script(&self, src: &str) -> Result<String> {
        if let Some(decoded) = decode_data_uri(src) {
            return Ok(decoded);
        }
        let base = url::Url::parse(&self.page_url)
            .context("Failed to parse page URL")?;
        let absolute = base.join(src)
            .context(format!("Failed to resolve URL: {}", src))?;
        let resp = self.client
            .get(absolute.as_str())
            .send()
            .await
            .context(format!("Failed to fetch script: {}", absolute))?;
        resp.text().await.context("Failed to read script response")
    }

    fn collect_scripts(&self, handle: &Handle) -> Vec<ScriptContent> {
        let mut scripts = Vec::new();
        self.collect_scripts_recursive(handle, &mut scripts);
        scripts
    }

    fn collect_scripts_recursive(&self, handle: &Handle, scripts: &mut Vec<ScriptContent>) {
        if let NodeData::Element { name, attrs, .. } = &handle.data {
            if name.local == local_name!("script") {
                let mut inline = String::new();
                for child in handle.children.borrow().iter() {
                    if let NodeData::Text { contents } = &child.data {
                        inline.push_str(&contents.borrow());
                    }
                }
                let src = get_attr_raw(attrs, "src");

                if !inline.trim().is_empty() || src.is_some() {
                    scripts.push(ScriptContent {
                        inline: if inline.trim().is_empty() { None } else { Some(inline) },
                        external: src,
                    });
                }
                return;
            }
        }
        for child in handle.children.borrow().iter() {
            self.collect_scripts_recursive(child, scripts);
        }
    }

    fn inject_og_media(&mut self) {
        let meta_tags = self.collect_og_image_urls(&self.dom.document);
        if meta_tags.is_empty() {
            return;
        }
        let body = self.find_body(&self.dom.document);
        let body = match body {
            Some(b) => b,
            None => return,
        };
        let container = create_element_node("div");
        set_attr(&container, "id", "og-media");
        for url in meta_tags {
            let img = create_element_node("img");
            set_attr(&img, "src", &url);
            set_attr(&img, "alt", "Open Graph image");
            container.children.borrow_mut().push(img);
        }
        container.parent.set(Some(Rc::downgrade(&body)));
        body.children.borrow_mut().push(container);
    }

    fn collect_og_image_urls(&self, handle: &Handle) -> Vec<String> {
        let mut urls = Vec::new();
        self.collect_og_image_urls_recursive(handle, &mut urls);
        urls
    }

    fn collect_og_image_urls_recursive(&self, handle: &Handle, urls: &mut Vec<String>) {
        if let NodeData::Element { name, attrs, .. } = &handle.data {
            if name.local == local_name!("meta") {
                let mut property = None;
                let mut content = None;
                for attr in attrs.borrow().iter() {
                    if attr.name.local == local_name!("property") {
                        property = Some(attr.value.to_string());
                    } else if attr.name.local == local_name!("content") {
                        content = Some(attr.value.to_string());
                    }
                }
                if let (Some(prop), Some(url)) = (property, content) {
                    if prop == "og:image" && !url.is_empty() {
                        urls.push(url);
                    }
                }
            }
        }
        for child in handle.children.borrow().iter() {
            self.collect_og_image_urls_recursive(child, urls);
        }
    }

    fn find_body(&self, handle: &Handle) -> Option<Handle> {
        if let NodeData::Element { name, .. } = &handle.data {
            if name.local == local_name!("body") {
                return Some(handle.clone());
            }
        }
        for child in handle.children.borrow().iter() {
            if let Some(found) = self.find_body(child) {
                return Some(found);
            }
        }
        None
    }

    pub fn serialize(&self) -> Result<String> {
        let mut output = Vec::new();
        let document: SerializableHandle = self.dom.document.clone().into();
        serialize(&mut output, &document, SerializeOpts {
            traversal_scope: TraversalScope::ChildrenOnly(None),
            ..Default::default()
        })
        .context("Failed to serialize DOM")?;

        String::from_utf8(output).context("Failed to convert serialized HTML to string")
    }
}

fn get_attr_raw(attrs: &std::cell::RefCell<Vec<html5ever::Attribute>>, name: &str) -> Option<String> {
    for attr in attrs.borrow().iter() {
        if attr.name.local.to_string() == name {
            return Some(attr.value.to_string());
        }
    }
    None
}

fn create_element_node(tag_name: &str) -> Handle {
    Rc::new(markup5ever_rcdom::Node {
        parent: std::cell::Cell::new(None),
        children: RefCell::new(Vec::new()),
        data: NodeData::Element {
            name: QualName::new(None, ns!(html), tag_name.into()),
            attrs: RefCell::new(Vec::new()),
            template_contents: RefCell::new(None),
            mathml_annotation_xml_integration_point: false,
        },
    })
}

fn set_attr(handle: &Handle, name: &str, value: &str) {
    if let NodeData::Element { attrs, .. } = &handle.data {
        let mut attrs = attrs.borrow_mut();
        if let Some(existing) = attrs.iter_mut().find(|a| a.name.local.to_string() == name) {
            existing.value.clear();
            existing.value.push_slice(value);
        } else {
            attrs.push(html5ever::Attribute {
                name: QualName::new(None, ns!(), name.into()),
                value: value.into(),
            });
        }
    }
}

fn decode_data_uri(uri: &str) -> Option<String> {
    let rest = uri.strip_prefix("data:")?;
    let (header, data) = rest.split_once(',')?;

    if header.contains(";base64") {
        let decoded = base64::engine::general_purpose::STANDARD
            .decode(data)
            .ok()?;
        Some(String::from_utf8(decoded).ok()?)
    } else {
        // Raw data (percent-encoded or plain text)
        Some(data.to_string())
    }
}
