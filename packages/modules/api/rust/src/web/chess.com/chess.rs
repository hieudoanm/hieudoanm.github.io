use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::core::chess::ChessClient;

#[wasm_bindgen]
pub struct WasmChess {
    inner: ChessClient,
}

#[wasm_bindgen]
impl WasmChess {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            inner: ChessClient::new(),
        }
    }

    pub fn get_players(&self, title: &str) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let base_url = self.inner.base_url.clone();
        let title = title.to_string();
        future_to_promise(async move {
            let client = ChessClient { base_url, client };
            let resp = client
                .get_players(&title)
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }

    pub fn get_player(&self, player: &str) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let base_url = self.inner.base_url.clone();
        let player = player.to_string();
        future_to_promise(async move {
            let client = ChessClient { base_url, client };
            let resp = client
                .get_player(&player)
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }

    pub fn get_stats(&self, player: &str) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let base_url = self.inner.base_url.clone();
        let player = player.to_string();
        future_to_promise(async move {
            let client = ChessClient { base_url, client };
            let resp = client
                .get_stats(&player)
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }
}
