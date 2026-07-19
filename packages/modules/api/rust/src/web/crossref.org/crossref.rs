use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::core::crossref::CrossRefClient;

#[wasm_bindgen]
pub struct WasmCrossRef {
    inner: CrossRefClient,
}

#[wasm_bindgen]
impl WasmCrossRef {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            inner: CrossRefClient::new(),
        }
    }

    pub fn get_work(&self, id: &str) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let base_url = self.inner.base_url.clone();
        let id = id.to_string();
        future_to_promise(async move {
            let client = CrossRefClient { base_url, client };
            let resp = client
                .get_work(&id)
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }
}
