use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Author {
    pub given: Option<String>,
    pub family: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct Message {
    pub author: Option<Vec<Author>>,
    pub title: Option<Vec<String>>,
    #[serde(rename = "container-title")]
    pub container_title: Option<Vec<String>>,
    pub volume: Option<String>,
    pub issue: Option<String>,
    pub page: Option<String>,
    #[serde(rename = "published-print")]
    pub published_print: Option<PublishedPrint>,
}

#[derive(Debug, Deserialize)]
pub struct PublishedPrint {
    #[serde(rename = "date-parts")]
    pub date_parts: Option<Vec<Vec<i32>>>,
}

#[derive(Debug, Deserialize)]
pub struct CrossRefData {
    pub status: String,
    pub message: Message,
}

pub fn format_citation(data: &CrossRefData) -> String {
    let msg = &data.message;

    let year = msg
        .published_print
        .as_ref()
        .and_then(|p| p.date_parts.as_ref())
        .and_then(|dp| dp.first())
        .and_then(|d| d.first())
        .map(|y| y.to_string())
        .unwrap_or_else(|| "n.d.".to_string());

    let authors = msg.author.as_deref().unwrap_or_default();

    match authors.len() {
        0 => format!("(Unknown, {})", year),
        1 => {
            let family = authors[0].family.as_deref().unwrap_or("Unknown");
            format!("({}, {})", family, year)
        }
        2 => {
            let a1 = authors[0].family.as_deref().unwrap_or("Unknown");
            let a2 = authors[1].family.as_deref().unwrap_or("Unknown");
            format!("({} & {}, {})", a1, a2, year)
        }
        _ => {
            let a1 = authors[0].family.as_deref().unwrap_or("Unknown");
            format!("({} et al., {})", a1, year)
        }
    }
}

pub fn format_reference(data: &CrossRefData) -> String {
    let msg = &data.message;

    // Authors
    let authors_apa = {
        let authors = msg.author.as_deref().unwrap_or_default();
        let mut parts = Vec::new();
        for (i, a) in authors.iter().enumerate() {
            let family = a.family.as_deref().unwrap_or("Unknown");
            let given = a.given.as_deref().unwrap_or("");
            let initial = given
                .chars()
                .next()
                .map(|c| c.to_string())
                .unwrap_or_default();
            let part = format!("{}, {}.", family, initial);
            if i == 0 {
                parts.push(part);
            } else if i == authors.len() - 1 {
                parts.push(format!(" & {}", part));
            } else {
                parts.push(format!(", {}", part));
            }
        }
        parts.concat()
    };

    // Year
    let year = msg
        .published_print
        .as_ref()
        .and_then(|p| p.date_parts.as_ref())
        .and_then(|dp| dp.first())
        .and_then(|d| d.first())
        .map(|y| y.to_string())
        .unwrap_or_else(|| "n.d.".to_string());

    // Title
    let title = msg
        .title
        .as_ref()
        .and_then(|t| t.first())
        .map(|s| s.as_str())
        .unwrap_or("");

    // Journal
    let journal = msg
        .container_title
        .as_ref()
        .and_then(|t| t.first())
        .map(|s| s.as_str())
        .unwrap_or("");

    let volume = msg.volume.as_deref().unwrap_or("");
    let issue = msg.issue.as_deref().unwrap_or("");
    let pages = msg.page.as_deref().unwrap_or("");

    format!(
        "{} ({}). {}. {}, {}({}), {}.",
        authors_apa, year, title, journal, volume, issue, pages
    )
}

pub fn print_citation(data: &CrossRefData) {
    println!("Cite:");
    println!("{}", format_citation(data));
}

pub fn print_reference(data: &CrossRefData) {
    println!("APA:");
    println!("{}", format_reference(data));
}
