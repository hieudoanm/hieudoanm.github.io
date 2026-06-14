use super::service;

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let prompt = matches
        .get_one::<String>("prompt")
        .ok_or_else(|| anyhow::anyhow!("prompt required"))?;
    let model_id = matches
        .get_one::<String>("model")
        .cloned()
        .unwrap_or_else(|| "openai/gpt-4o-mini".to_string());
    let models = service::fetch_free_models()?;
    let model = service::resolve_model(&model_id, &models)
        .ok_or_else(|| anyhow::anyhow!("model '{model_id}' not found"))?;
    println!("Using model: {}", model.id);
    println!("Sending: {prompt}");
    let result = service::generate(model_id.as_str(), prompt)?;
    println!("Response: {result}");
    Ok(())
}
