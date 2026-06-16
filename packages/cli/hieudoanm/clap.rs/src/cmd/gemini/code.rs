use super::super::openrouter::service;

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let prompt = matches
        .get_one::<String>("prompt")
        .ok_or_else(|| anyhow::anyhow!("prompt required"))?;
    let models = service::fetch_free_models()?;
    let model_id = models
        .iter()
        .find(|m| m.id.contains("gemini"))
        .map(|m| m.id.clone())
        .unwrap_or_else(|| "google/gemini-2.0-flash-001:free".to_string());
    if let Some(model) = service::resolve_model(&model_id, &models) {
        println!("Using model: {}", model.id);
    }
    println!("Sending to Gemini: {prompt}");
    let result = service::generate(&model_id, prompt)?;
    println!("{}", result);
    Ok(())
}
