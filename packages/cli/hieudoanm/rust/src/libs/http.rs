use std::collections::HashMap;

pub const CONTENT_TYPE_HEADER: &str = "Content-Type";
pub const CONTENT_TYPE_APPLICATION_JSON: &str = "application/json";
pub const RESPONSE_ERROR: &str = "Response Error";
pub const RESPONSE_STATUS: &str = "Response Status";
pub const RESPONSE_BODY: &str = "Response Body";

#[derive(Debug, Default, Clone)]
pub struct Options {
    pub headers: HashMap<String, String>,
    pub query: HashMap<String, String>,
    pub body: Option<serde_json::Value>,
    pub debug: bool,
}

fn debug_log(debug: bool, label: &str, value: &str) {
    if debug {
        println!("{label}: {value}");
    }
}

fn set_headers_and_query(
    req: reqwest::RequestBuilder,
    options: &Options,
) -> reqwest::RequestBuilder {
    let mut req = req;
    for (k, v) in &options.headers {
        req = req.header(k, v);
    }
    req
}

pub async fn get(url: &str, options: Options) -> Result<Vec<u8>, anyhow::Error> {
    let client = reqwest::Client::new();
    let mut req = client.get(url);
    req = set_headers_and_query(req, &options);
    if !options.query.is_empty() {
        req = req.query(&options.query);
    }

    let response = req.send().await?;
    let body = response.bytes().await?.to_vec();

    debug_log(
        options.debug,
        RESPONSE_STATUS,
        &String::from_utf8_lossy(&body),
    );
    debug_log(
        options.debug,
        RESPONSE_BODY,
        &String::from_utf8_lossy(&body),
    );
    Ok(body)
}

pub async fn post(url: &str, options: Options) -> Result<Vec<u8>, anyhow::Error> {
    let client = reqwest::Client::new();
    let mut req = client.post(url);
    req = set_headers_and_query(req, &options);
    if !options.query.is_empty() {
        req = req.query(&options.query);
    }
    if let Some(body) = &options.body {
        req = req.json(body);
    }

    let response = req.send().await?;
    let body = response.bytes().await?.to_vec();

    debug_log(
        options.debug,
        RESPONSE_STATUS,
        &String::from_utf8_lossy(&body),
    );
    debug_log(
        options.debug,
        RESPONSE_BODY,
        &String::from_utf8_lossy(&body),
    );
    Ok(body)
}

pub async fn put(url: &str, options: Options) -> Result<Vec<u8>, anyhow::Error> {
    let client = reqwest::Client::new();
    let mut req = client.put(url);
    req = set_headers_and_query(req, &options);
    if !options.query.is_empty() {
        req = req.query(&options.query);
    }
    if let Some(body) = &options.body {
        req = req.json(body);
    }

    let response = req.send().await?;
    let body = response.bytes().await?.to_vec();

    debug_log(
        options.debug,
        RESPONSE_STATUS,
        &String::from_utf8_lossy(&body),
    );
    debug_log(
        options.debug,
        RESPONSE_BODY,
        &String::from_utf8_lossy(&body),
    );
    Ok(body)
}

pub async fn delete(url: &str, options: Options) -> Result<Vec<u8>, anyhow::Error> {
    let client = reqwest::Client::new();
    let mut req = client.delete(url);
    req = set_headers_and_query(req, &options);
    if !options.query.is_empty() {
        req = req.query(&options.query);
    }
    if let Some(body) = &options.body {
        req = req.json(body);
    }

    let response = req.send().await?;
    let body = response.bytes().await?.to_vec();

    debug_log(
        options.debug,
        RESPONSE_STATUS,
        &String::from_utf8_lossy(&body),
    );
    debug_log(
        options.debug,
        RESPONSE_BODY,
        &String::from_utf8_lossy(&body),
    );
    Ok(body)
}
