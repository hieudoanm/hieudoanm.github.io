use std::collections::HashMap;
use std::time::Duration;

use crate::libs::colors;

pub const HEADER_CONTENT_TYPE: &str = "Content-Type";
pub const HEADER_ACCEPT: &str = "Accept";
pub const HEADER_AUTHORIZATION: &str = "Authorization";
pub const HEADER_USER_AGENT: &str = "User-Agent";
pub const HEADER_CACHE_CONTROL: &str = "Cache-Control";
pub const HEADER_CONTENT_LENGTH: &str = "Content-Length";
pub const HEADER_CONTENT_ENCODING: &str = "Content-Encoding";
pub const HEADER_ACCEPT_ENCODING: &str = "Accept-Encoding";
pub const HEADER_ACCEPT_LANGUAGE: &str = "Accept-Language";

pub const CONTENT_TYPE_JSON: &str = "application/json";
pub const CONTENT_TYPE_XML: &str = "application/xml";
pub const CONTENT_TYPE_FORM_URLENCODED: &str = "application/x-www-form-urlencoded";
pub const CONTENT_TYPE_TEXT_PLAIN: &str = "text/plain";
pub const CONTENT_TYPE_TEXT_HTML: &str = "text/html";
pub const CONTENT_TYPE_MULTIPART_FORM: &str = "multipart/form-data";

pub const LOG_RESPONSE_STATUS: &str = "Response Status";
pub const LOG_RESPONSE_BODY: &str = "Response Body";

#[derive(Debug, Default, Clone)]
pub struct Options {
    pub headers: HashMap<String, String>,
    pub query: HashMap<String, String>,
    pub body: Option<serde_json::Value>,
    pub timeout: Duration,
    pub retries: usize,
    pub debug: bool,
}

fn should_retry(
    err: Option<&anyhow::Error>,
    status: u16,
    attempt: usize,
    max_retries: usize,
) -> bool {
    if attempt >= max_retries {
        return false;
    }
    if err.is_some() {
        return true;
    }
    status >= 500 && status <= 599
}

fn backoff(attempt: usize) {
    std::thread::sleep(Duration::from_millis((attempt as u64 + 1) * 300));
}

async fn attempt_request(
    method: reqwest::Method,
    url: &str,
    options: &Options,
) -> Result<reqwest::Response, anyhow::Error> {
    let client = reqwest::Client::new();
    let mut req = client.request(method, url);

    for (k, v) in &options.headers {
        req = req.header(k, v);
    }
    if !options.query.is_empty() {
        req = req.query(&options.query);
    }
    if options.body.is_some() {
        req = req.json(&options.body);
        req = req.header(HEADER_CONTENT_TYPE, CONTENT_TYPE_JSON);
    }

    let resp = req.send().await?;
    Ok(resp)
}

fn log_response(resp: &reqwest::Response, body: &[u8], options: &Options) {
    if !options.debug {
        return;
    }

    const MAX_BODY_LENGTH: usize = 1000;
    let body_str = String::from_utf8_lossy(body);
    let body_str = if body_str.len() > MAX_BODY_LENGTH {
        format!("{}...[truncated]", &body_str[..MAX_BODY_LENGTH])
    } else {
        body_str.to_string()
    };

    let status = resp.status();
    let status_color = if status.is_server_error() {
        colors::red
    } else if status.is_client_error() {
        colors::yellow
    } else {
        colors::green
    };

    let headers_str = format!("{:?}", resp.headers());

    println!(
        "{}===== HTTP Response Debug ====={}",
        colors::blue(""),
        colors::blue("")
    );
    println!("Status: {}{}{}", status_color(&status.to_string()), "", "");
    println!("Headers: {headers_str}");
    println!(
        "Body: {}{}{}",
        colors::gray(""),
        colors::gray(&body_str),
        ""
    );
    println!(
        "{}==============================={}",
        colors::blue(""),
        colors::blue("")
    );
}

pub async fn do_request(
    method: reqwest::Method,
    url: &str,
    options: Options,
) -> Result<Vec<u8>, anyhow::Error> {
    let max_retries = options.retries;
    let timeout = if options.timeout.as_secs() == 0 {
        Duration::from_secs(10)
    } else {
        options.timeout
    };

    let mut last_err: Option<anyhow::Error> = None;

    for attempt in 0..=max_retries {
        let result =
            tokio::time::timeout(timeout, attempt_request(method.clone(), url, &options)).await;

        match result {
            Ok(Ok(resp)) => {
                let status = resp.status();
                let body = resp.bytes().await?.to_vec();

                if should_retry(None, status.as_u16(), attempt, max_retries) {
                    last_err = Some(anyhow::anyhow!("server error: {}", status));
                    backoff(attempt);
                    continue;
                }

                log_response_raw(&status, &body, &options);
                return Ok(body);
            }
            Ok(Err(e)) => {
                last_err = Some(anyhow::anyhow!("{e}"));
                if should_retry(Some(&last_err.as_ref().unwrap()), 0, attempt, max_retries) {
                    backoff(attempt);
                    continue;
                }
                return Err(e);
            }
            Err(_) => {
                last_err = Some(anyhow::anyhow!("timeout"));
                if should_retry(None, 0, attempt, max_retries) {
                    backoff(attempt);
                    continue;
                }
                return Err(anyhow::anyhow!("request timed out"));
            }
        }
    }

    Err(anyhow::anyhow!(
        "request failed after retries: {:?}",
        last_err
    ))
}

fn log_response_raw(status: &reqwest::StatusCode, body: &[u8], options: &Options) {
    if !options.debug {
        return;
    }
    const MAX_BODY_LENGTH: usize = 1000;
    let body_str = String::from_utf8_lossy(body);
    let body_str = if body_str.len() > MAX_BODY_LENGTH {
        format!("{}...[truncated]", &body_str[..MAX_BODY_LENGTH])
    } else {
        body_str.to_string()
    };

    let status_color = if status.is_server_error() {
        colors::red
    } else if status.is_client_error() {
        colors::yellow
    } else {
        colors::green
    };

    println!(
        "{}===== HTTP Response Debug ====={}",
        colors::blue(""),
        colors::blue("")
    );
    println!("Status: {}", status_color(&status.to_string()));
    println!(
        "Body: {}{}{}",
        colors::gray(""),
        colors::gray(&body_str),
        ""
    );
    println!(
        "{}==============================={}",
        colors::blue(""),
        colors::blue("")
    );
}

pub async fn get(url: &str, options: Options) -> Result<Vec<u8>, anyhow::Error> {
    do_request(reqwest::Method::GET, url, options).await
}

pub async fn post(url: &str, options: Options) -> Result<Vec<u8>, anyhow::Error> {
    do_request(reqwest::Method::POST, url, options).await
}

pub async fn put(url: &str, options: Options) -> Result<Vec<u8>, anyhow::Error> {
    do_request(reqwest::Method::PUT, url, options).await
}

pub async fn patch(url: &str, options: Options) -> Result<Vec<u8>, anyhow::Error> {
    do_request(reqwest::Method::PATCH, url, options).await
}

pub async fn delete(url: &str, options: Options) -> Result<Vec<u8>, anyhow::Error> {
    do_request(reqwest::Method::DELETE, url, options).await
}
