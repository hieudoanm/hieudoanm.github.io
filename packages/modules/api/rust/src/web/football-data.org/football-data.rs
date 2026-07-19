use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::core::football_data::FootballClient;

#[wasm_bindgen]
pub struct WasmFootball {
    inner: FootballClient,
}

#[wasm_bindgen]
impl WasmFootball {
    #[wasm_bindgen(constructor)]
    pub fn new(api_key: String, base_url: Option<String>) -> Self {
        Self {
            inner: FootballClient::new(api_key, base_url),
        }
    }

    pub fn get_matches(&self) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let api_key = self.inner.api_key.clone();
        let base_url = self.inner.base_url.clone();
        future_to_promise(async move {
            let client = FootballClient {
                client,
                api_key,
                base_url,
            };
            let resp = client
                .get_matches()
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }
}
