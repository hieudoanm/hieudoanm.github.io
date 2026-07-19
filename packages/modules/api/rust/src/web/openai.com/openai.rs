use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::core::openai::{ChatRequest, OpenAIClient};

#[wasm_bindgen]
pub struct WasmOpenAI {
    inner: OpenAIClient,
}

#[wasm_bindgen]
impl WasmOpenAI {
    #[wasm_bindgen(constructor)]
    pub fn new(api_key: String, base_url: Option<String>) -> Self {
        Self {
            inner: OpenAIClient::new(api_key, base_url),
        }
    }

    pub fn chat(&self, request_json: &str) -> js_sys::Promise {
        let req: ChatRequest = serde_json::from_str(request_json).unwrap();
        let client = self.inner.client.clone();
        let api_key = self.inner.api_key.clone();
        let base_url = self.inner.base_url.clone();
        future_to_promise(async move {
            let client = OpenAIClient {
                client,
                api_key,
                base_url,
            };
            let resp = client
                .chat(&req)
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }
}
