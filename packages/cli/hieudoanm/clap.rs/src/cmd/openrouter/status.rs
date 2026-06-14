use super::service;

pub async fn run() -> anyhow::Result<()> {
    let models = service::fetch_free_models()?;
    println!("OpenRouter API Status: OK");
    println!("Free models available: {}", models.len());
    Ok(())
}
