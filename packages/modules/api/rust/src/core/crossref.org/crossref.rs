use reqwest::Client;
use serde::{Deserialize, Serialize};
#[cfg(not(target_arch = "wasm32"))]
use std::time::Duration;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Author {
    pub given: Option<String>,
    pub family: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DateParts {
    #[serde(rename = "date-parts")]
    pub date_parts: Vec<Vec<i32>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CrossRefMessage {
    pub author: Vec<Author>,
    pub title: Vec<String>,
    #[serde(rename = "container-title")]
    pub container_title: Vec<String>,
    pub volume: Option<String>,
    pub issue: Option<String>,
    pub page: Option<String>,
    #[serde(rename = "published-print")]
    pub published_print: Option<DateParts>,
    #[serde(rename = "published-online")]
    pub published_online: Option<DateParts>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CrossRefResponse {
    pub message: CrossRefMessage,
}

#[derive(Debug, Serialize)]
pub struct Reference {
    pub id: String,
    pub authors: Vec<Author>,
    pub title: String,
    pub journal: String,
    pub volume: Option<String>,
    pub issue: Option<String>,
    pub pages: Option<String>,
    pub year: i32,
    pub url: String,
}

pub struct CrossRefClient {
    pub base_url: String,
    pub client: Client,
}

impl CrossRefClient {
    pub fn new() -> Self {
        #[cfg(not(target_arch = "wasm32"))]
        let client = Client::builder()
            .timeout(Duration::from_secs(60))
            .build()
            .unwrap();
        #[cfg(target_arch = "wasm32")]
        let client = Client::new();
        Self {
            base_url: "https://api.crossref.org".to_string(),
            client,
        }
    }

    pub async fn get_work(&self, id: &str) -> Result<Reference, reqwest::Error> {
        let url = format!("{}/works/{}", self.base_url, id);
        let resp = self.client.get(url).send().await?.error_for_status()?;
        let data = resp.json::<CrossRefResponse>().await?;

        let m = data.message;
        let published = m.published_print.as_ref().or(m.published_online.as_ref());

        let mut year = 0;
        if let Some(p) = published
            && let Some(first_part) = p.date_parts.first()
            && let Some(y) = first_part.first()
        {
            year = *y;
        }

        Ok(Reference {
            id: id.to_string(),
            authors: m.author,
            title: m.title.first().cloned().unwrap_or_default(),
            journal: m.container_title.first().cloned().unwrap_or_default(),
            volume: m.volume,
            issue: m.issue,
            pages: m.page,
            year,
            url: format!("https://doi.org/{}", id),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use wiremock::matchers::{method, path};
    use wiremock::{Mock, MockServer, ResponseTemplate};

    #[tokio::test]
    async fn test_get_work_success() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/works/10.1038/nature12345"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "message": {
                    "author": [{"given": "John", "family": "Doe"}],
                    "title": ["Test Title"],
                    "container-title": ["Test Journal"],
                    "volume": "10",
                    "issue": "5",
                    "page": "100-110",
                    "published-print": {
                        "date-parts": [[2020, 6, 15]]
                    }
                }
            })))
            .mount(&mock_server)
            .await;

        let client = CrossRefClient {
            base_url: mock_server.uri(),
            client: Client::builder()
                .timeout(Duration::from_secs(60))
                .build()
                .unwrap(),
        };
        let result = client.get_work("10.1038/nature12345").await.unwrap();
        assert_eq!(result.authors.len(), 1);
        assert_eq!(result.authors[0].given.as_deref(), Some("John"));
        assert_eq!(result.title, "Test Title");
        assert_eq!(result.journal, "Test Journal");
        assert_eq!(result.year, 2020);
    }

    #[tokio::test]
    async fn test_get_work_published_online_fallback() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/works/10.1038/nature12345"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "message": {
                    "author": [{"given": "Jane", "family": "Smith"}],
                    "title": ["Online Title"],
                    "container-title": ["Online Journal"],
                    "published-online": {
                        "date-parts": [[2021, 1, 10]]
                    }
                }
            })))
            .mount(&mock_server)
            .await;

        let client = CrossRefClient {
            base_url: mock_server.uri(),
            client: Client::builder()
                .timeout(Duration::from_secs(60))
                .build()
                .unwrap(),
        };
        let result = client.get_work("10.1038/nature12345").await.unwrap();
        assert_eq!(result.year, 2021);
    }
}
