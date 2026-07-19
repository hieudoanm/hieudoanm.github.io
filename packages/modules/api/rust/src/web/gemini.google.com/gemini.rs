use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::core::gemini::{GeminiClient, GeminiContent, GeminiModel, GeminiRole};

fn parse_contents(arr: &js_sys::Array) -> Result<Vec<GeminiContent>, JsValue> {
    let mut contents = Vec::new();
    for i in 0..arr.length() {
        let item = js_sys::Object::from(arr.get(i));
        let role_str = js_sys::Reflect::get(&item, &"role".into())
            .map_err(|_| js_sys::Error::new("missing role"))?
            .as_string()
            .ok_or_else(|| js_sys::Error::new("role must be a string"))?;
        let role = match role_str.as_str() {
            "user" => GeminiRole::User,
            "model" => GeminiRole::Model,
            _ => return Err(js_sys::Error::new(&format!("unknown role: {}", role_str)).into()),
        };
        let parts_arr = js_sys::Reflect::get(&item, &"parts".into())
            .map_err(|_| js_sys::Error::new("missing parts"))?
            .dyn_into::<js_sys::Array>()
            .map_err(|_| js_sys::Error::new("parts must be an array"))?;
        let mut parts = Vec::new();
        for j in 0..parts_arr.length() {
            let part = js_sys::Object::from(parts_arr.get(j));
            let text = js_sys::Reflect::get(&part, &"text".into())
                .map_err(|_| js_sys::Error::new("missing text"))?
                .as_string()
                .ok_or_else(|| js_sys::Error::new("text must be a string"))?;
            parts.push(crate::core::gemini::GeminiPart { text });
        }
        contents.push(GeminiContent { role, parts });
    }
    Ok(contents)
}

#[wasm_bindgen]
pub struct WasmGemini {
    inner: GeminiClient,
}

#[wasm_bindgen]
impl WasmGemini {
    #[wasm_bindgen(constructor)]
    pub fn new(api_key: String) -> Self {
        Self {
            inner: GeminiClient::new(api_key),
        }
    }

    pub fn generate_content(
        &self,
        model: &str,
        contents: JsValue,
        timeout_secs: u32,
    ) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let api_key = self.inner.api_key.clone();
        let base_url = self.inner.base_url.clone();
        let model = model.to_string();
        future_to_promise(async move {
            let arr = contents
                .dyn_into::<js_sys::Array>()
                .map_err(|_| js_sys::Error::new("contents must be an array"))?;
            let parsed = parse_contents(&arr)?;

            let gemini_model = match model.as_str() {
                "gemini-2.5-flash" => GeminiModel::Gemini25Flash,
                "gemini-2.0-flash" => GeminiModel::Gemini20Flash,
                "gemini-2.0-flash-lite" => GeminiModel::Gemini20FlashLite,
                "gemini-1.5-flash" => GeminiModel::Gemini15Flash,
                "gemini-1.5-flash-8b" => GeminiModel::Gemini15Flash8B,
                _ => return Err(js_sys::Error::new(&format!("unknown model: {}", model)).into()),
            };

            let client = GeminiClient {
                client,
                api_key,
                base_url,
            };

            let resp = client
                .generate_content(&gemini_model, &parsed, timeout_secs as u64)
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;

            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }
}
