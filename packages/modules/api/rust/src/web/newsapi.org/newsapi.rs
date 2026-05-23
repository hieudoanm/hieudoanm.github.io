use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::core::newsapi::NewsAPIClient;

#[wasm_bindgen]
pub struct WasmNewsAPI {
    inner: NewsAPIClient,
}

#[wasm_bindgen]
impl WasmNewsAPI {
    #[wasm_bindgen(constructor)]
    pub fn new(api_key: String, base_url: Option<String>) -> Self {
        Self {
            inner: NewsAPIClient::new(api_key, base_url),
        }
    }

    pub fn top_headlines(&self, country: &str) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let api_key = self.inner.api_key.clone();
        let base_url = self.inner.base_url.clone();
        let country = country.to_string();
        future_to_promise(async move {
            let client = NewsAPIClient {
                client,
                api_key,
                base_url,
            };
            let resp = client
                .top_headlines(&country)
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }
}
