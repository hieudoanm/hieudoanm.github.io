use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::core::airvisual::AirVisualClient;

#[wasm_bindgen]
pub struct WasmAirVisual {
    inner: AirVisualClient,
}

#[wasm_bindgen]
impl WasmAirVisual {
    #[wasm_bindgen(constructor)]
    pub fn new(api_key: String, base_url: Option<String>) -> Self {
        Self {
            inner: AirVisualClient::new(api_key, base_url),
        }
    }

    pub fn get_countries(&self) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let api_key = self.inner.api_key.clone();
        let base_url = self.inner.base_url.clone();
        future_to_promise(async move {
            let client = AirVisualClient {
                api_key,
                base_url,
                client,
            };
            let resp = client
                .get_countries()
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }
}
