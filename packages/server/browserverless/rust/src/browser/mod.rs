mod dom;
mod js;

use anyhow::{Context, Result};
use html5ever::serialize::{serialize, SerializeOpts, TraversalScope};
use html5ever::tendril::TendrilSink;
use html5ever::{parse_document, ParseOpts, local_name};
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
