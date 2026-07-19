use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::core::fixer::FixerClient;

#[wasm_bindgen]
pub struct WasmFixer {
    inner: FixerClient,
}

#[wasm_bindgen]
impl WasmFixer {
    #[wasm_bindgen(constructor)]
    pub fn new(api_key: String, base_url: Option<String>) -> Self {
        Self {
            inner: FixerClient::new(api_key, base_url),
        }
    }

    pub fn latest(&self, base: &str, symbols_json: &str) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let api_key = self.inner.api_key.clone();
        let base_url = self.inner.base_url.clone();
        let base = base.to_string();
        let symbols_json = symbols_json.to_string();
        future_to_promise(async move {
            let symbols: Vec<String> = serde_json::from_str(&symbols_json).unwrap();
            let symbol_refs: Vec<&str> = symbols.iter().map(|s| s.as_str()).collect();
            let client = FixerClient {
                client,
                api_key,
                base_url,
            };
            let resp = client
                .latest(&base, &symbol_refs)
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }
}
