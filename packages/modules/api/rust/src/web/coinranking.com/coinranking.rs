use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::core::coinranking::CoinRankingClient;

#[wasm_bindgen]
pub struct WasmCoinRanking {
    inner: CoinRankingClient,
}

#[wasm_bindgen]
impl WasmCoinRanking {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            inner: CoinRankingClient::new(),
        }
    }

    pub fn get_coins(&self, tag: Option<String>) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let base_url = self.inner.base_url.clone();
        future_to_promise(async move {
            let client = CoinRankingClient { base_url, client };
            let resp = client
                .get_coins(tag.as_deref())
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }
}
