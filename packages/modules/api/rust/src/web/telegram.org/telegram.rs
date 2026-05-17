use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::core::telegram::TelegramClient;

#[wasm_bindgen]
pub struct WasmTelegram {
    inner: TelegramClient,
}

#[wasm_bindgen]
impl WasmTelegram {
    #[wasm_bindgen(constructor)]
    pub fn new(bot_token: String, base_url: Option<String>) -> Self {
        Self {
            inner: TelegramClient::new(bot_token, base_url),
        }
    }

    pub fn send_message(&self, chat_id: &str, text: &str) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let bot_token = self.inner.bot_token.clone();
        let base_url = self.inner.base_url.clone();
        let chat_id = chat_id.to_string();
        let text = text.to_string();
        future_to_promise(async move {
            let client = TelegramClient {
                client,
                bot_token,
                base_url,
            };
            let resp = client
                .send_message(&chat_id, &text)
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }
}
