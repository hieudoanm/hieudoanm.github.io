use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[allow(dead_code)]
pub struct Result {
    pub definition: String,
    #[serde(default)]
    pub part_of_speech: String,
    #[serde(default)]
    pub synonyms: Vec<String>,
    #[serde(default)]
    pub anonyms: Vec<String>,
    #[serde(default)]
    pub usage_of: Vec<String>,
    #[serde(default)]
    pub type_of: Vec<String>,
}

#[derive(Debug, Deserialize)]
pub struct Word {
    pub word: String,
    #[serde(default)]
    pub results: Vec<Result>,
}

pub fn command() -> clap::Command {
    clap::Command::new("english")
        .about("English dictionary tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("define")
                .about("Look up a word definition")
                .arg(clap::Arg::new("word").help("Word to define").required(true)),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some(("define", m)) = matches.subcommand() {
        let word = m
            .get_one::<String>("word")
            .map(|w| w.trim().to_lowercase())
            .filter(|w| !w.is_empty())
            .ok_or_else(|| anyhow::anyhow!("word cannot be empty"))?;

        let url = format!(
            "https://raw.githubusercontent.com/hieudoanm/words/refs/heads/master/packages/data/english/words/{word}.json"
        );

        let resp = reqwest::get(&url).await?.error_for_status()?;
        let data: Word = resp.json().await?;

        println!("\nWORD: {}\n", data.word);
        for (i, r) in data.results.iter().enumerate() {
            println!("{}) {}", i + 1, r.part_of_speech);
            println!("   Definition: {}", r.definition);
            if !r.synonyms.is_empty() {
                println!("   Synonyms: {}", r.synonyms.join(", "));
            }
            if !r.anonyms.is_empty() {
                println!("   Antonyms: {}", r.anonyms.join(", "));
            }
            println!();
        }
    }
    Ok(())
}
