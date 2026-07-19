use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::core::lichess::LichessClient;

#[wasm_bindgen]
pub struct WasmLichess {
    inner: LichessClient,
}

#[wasm_bindgen]
impl WasmLichess {
    #[wasm_bindgen(constructor)]
    pub fn new(token: String, base_url: Option<String>) -> Self {
        Self {
            inner: LichessClient::new(token, base_url),
        }
    }

    pub fn get_my_profile(&self) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let token = self.inner.token.clone();
        let base_url = self.inner.base_url.clone();
        future_to_promise(async move {
            let client = LichessClient {
                client,
                token,
                base_url,
            };
            let resp = client
                .get_my_profile()
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }
}
