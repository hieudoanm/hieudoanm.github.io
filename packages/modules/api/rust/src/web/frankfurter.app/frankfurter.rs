use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::core::frankfurter::FrankfurterClient;

#[wasm_bindgen]
pub struct WasmFrankfurter {
    inner: FrankfurterClient,
}

#[wasm_bindgen]
impl WasmFrankfurter {
    #[wasm_bindgen(constructor)]
    pub fn new(base_url: Option<String>) -> Self {
        Self {
            inner: FrankfurterClient::new(base_url),
        }
    }

    pub fn latest(&self, base: &str, to_json: &str) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let base_url = self.inner.base_url.clone();
        let base = base.to_string();
        let to_json = to_json.to_string();
        future_to_promise(async move {
            let to: Vec<String> = serde_json::from_str(&to_json).unwrap();
            let to_refs: Vec<&str> = to.iter().map(|s| s.as_str()).collect();
            let client = FrankfurterClient { client, base_url };
            let resp = client
                .latest(&base, &to_refs)
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }
}
