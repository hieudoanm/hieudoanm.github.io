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

#[cfg(test)]
mod tests {
    use super::*;

    fn make_data(authors: Vec<Author>, title: &str, year: i32) -> CrossRefData {
        CrossRefData {
            status: "ok".into(),
            message: Message {
                author: if authors.is_empty() { None } else { Some(authors) },
                title: Some(vec![title.into()]),
                container_title: Some(vec!["Test Journal".into()]),
                volume: Some("10".into()),
                issue: Some("2".into()),
                page: Some("100-110".into()),
                published_print: Some(PublishedPrint {
                    date_parts: Some(vec![vec![year]]),
                }),
            },
        }
    }

    #[test]
    fn test_format_citation_one_author() {
        let data = make_data(
            vec![Author { given: Some("John".into()), family: Some("Doe".into()) }],
            "A Great Paper", 2023,
        );
        assert_eq!(format_citation(&data), "(Doe, 2023)");
    }

    #[test]
    fn test_format_citation_two_authors() {
        let data = make_data(
            vec![
                Author { given: Some("John".into()), family: Some("Doe".into()) },
                Author { given: Some("Jane".into()), family: Some("Smith".into()) },
            ],
            "A Great Paper", 2023,
        );
        assert_eq!(format_citation(&data), "(Doe & Smith, 2023)");
    }

    #[test]
    fn test_format_citation_three_authors() {
        let data = make_data(
            vec![
                Author { given: Some("A".into()), family: Some("Alpha".into()) },
                Author { given: Some("B".into()), family: Some("Beta".into()) },
                Author { given: Some("C".into()), family: Some("Gamma".into()) },
            ],
            "A Great Paper", 2023,
        );
        assert_eq!(format_citation(&data), "(Alpha et al., 2023)");
    }

    #[test]
    fn test_format_citation_no_author() {
        let data = make_data(vec![], "Untitled", 2023);
        assert_eq!(format_citation(&data), "(Unknown, 2023)");
    }

    #[test]
    fn test_format_citation_no_year() {
        let data = CrossRefData {
            status: "ok".into(),
            message: Message {
                author: Some(vec![Author { given: Some("John".into()), family: Some("Doe".into()) }]),
                title: Some(vec!["Paper".into()]),
                container_title: None,
                volume: None,
                issue: None,
                page: None,
                published_print: None,
            },
        };
        assert_eq!(format_citation(&data), "(Doe, n.d.)");
    }

    #[test]
    fn test_format_reference_basic() {
        let data = make_data(
            vec![
                Author { given: Some("John".into()), family: Some("Doe".into()) },
                Author { given: Some("Jane".into()), family: Some("Smith".into()) },
            ],
            "An Important Study", 2022,
        );
        let ref_text = format_reference(&data);
        assert!(ref_text.contains("Doe, J."));
        assert!(ref_text.contains(" & Smith, J."));
        assert!(ref_text.contains("(2022)"));
        assert!(ref_text.contains("An Important Study"));
        assert!(ref_text.contains("Test Journal"));
    }
}

pub fn print_citation(data: &CrossRefData) {
    println!("Cite:");
    println!("{}", format_citation(data));
}

pub fn print_reference(data: &CrossRefData) {
    println!("APA:");
    println!("{}", format_reference(data));
}
