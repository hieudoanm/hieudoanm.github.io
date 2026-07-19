use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::future_to_promise;

use crate::core::openweathermap::OpenWeatherClient;

#[wasm_bindgen]
pub struct WasmOpenWeather {
    inner: OpenWeatherClient,
}

#[wasm_bindgen]
impl WasmOpenWeather {
    #[wasm_bindgen(constructor)]
    pub fn new(api_key: String, base_url: Option<String>) -> Self {
        Self {
            inner: OpenWeatherClient::new(api_key, base_url),
        }
    }

    pub fn get_weather(&self, city: &str) -> js_sys::Promise {
        let client = self.inner.client.clone();
        let api_key = self.inner.api_key.clone();
        let base_url = self.inner.base_url.clone();
        let city = city.to_string();
        future_to_promise(async move {
            let client = OpenWeatherClient {
                client,
                api_key,
                base_url,
            };
            let resp = client
                .get_weather(&city)
                .await
                .map_err(|e| js_sys::Error::new(&e.to_string()))?;
            Ok(js_sys::JSON::parse(&serde_json::to_string(&resp).unwrap()).unwrap())
        })
    }
}
