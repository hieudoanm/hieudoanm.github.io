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
}

impl Browser {
    pub fn new() -> Result<Self> {
        let client = Client::builder()
            .user_agent("Browserverless/0.1.0")
            .build()?;
        Ok(Self {
            client,
            dom: RcDom::default(),
            js_runtime: None,
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

        self.js_runtime = Some(JsRuntime::new(self.dom.document.clone()).await?);
        self.execute_scripts().await?;
        if let Some(js) = &self.js_runtime {
            js.idle().await?;
        }

        Ok(())
    }

    async fn execute_scripts(&mut self) -> Result<()> {
        let mut scripts = Vec::new();
        self.find_scripts(&self.dom.document, &mut scripts);

        for (i, script) in scripts.iter().enumerate() {
            let script_content = script.trim();
            if let Some(js_runtime) = &self.js_runtime {
                if let Err(e) = js_runtime.execute(script_content).await {
                    eprintln!("Failed to execute script {}: {}", i, e);
                }
            }
        }
        Ok(())
    }

    fn find_scripts(&self, handle: &Handle, scripts: &mut Vec<String>) {
        let node = handle;
        match &node.data {
            NodeData::Element { name, .. } if name.local == local_name!("script") => {
                let mut content = String::new();
                for child in node.children.borrow().iter() {
                    if let NodeData::Text { contents } = &child.data {
                        content.push_str(&contents.borrow());
                    }
                }
                if !content.is_empty() {
                    scripts.push(content);
                }
            }
            _ => {
                for child in node.children.borrow().iter() {
                    self.find_scripts(child, scripts);
                }
            }
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
