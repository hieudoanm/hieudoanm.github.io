use serde::{Deserialize, Serialize};
use reqwest::Client;
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

#[derive(Debug)]
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
    base_url: String,
    client: Client,
}

impl CrossRefClient {
    pub fn new() -> Self {
        Self {
            base_url: "https://api.crossref.org".to_string(),
            client: Client::builder()
                .timeout(Duration::from_secs(60))
                .build()
                .unwrap(),
        }
    }

    pub async fn get_work(&self, id: &str) -> Result<Reference, reqwest::Error> {
        let url = format!("{}/works/{}", self.base_url, id);
        let resp = self.client.get(url).send().await?.error_for_status()?;
        let data = resp.json::<CrossRefResponse>().await?;

        let m = data.message;
        let published = m.published_print.as_ref().or(m.published_online.as_ref());
        
        let mut year = 0;
        if let Some(p) = published {
            if let Some(first_part) = p.date_parts.get(0) {
                if let Some(y) = first_part.get(0) {
                    year = *y;
                }
            }
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
