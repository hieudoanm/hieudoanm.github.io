pub fn command() -> clap::Command {
    clap::Command::new("openrouter")
        .about("OpenRouter AI tools")
        .subcommand(
            clap::Command::new("chat")
                .about("Send a chat message to an AI model")
                .arg(clap::Arg::new("prompt").help("Your message").required(true))
                .arg(
                    clap::Arg::new("model")
                        .short('m')
                        .long("model")
                        .help("Model name or ID"),
                ),
        )
        .subcommand(clap::Command::new("models").about("List available free models"))
        .subcommand(clap::Command::new("status").about("Check OpenRouter API status"))
        .subcommand(clap::Command::new("hook").about("Manage webhooks"))
        .subcommand(clap::Command::new("serve").about("Start the OpenRouter server"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    use crate::services::openrouter;

    match matches.subcommand() {
        Some(("models", _m)) => {
            let models = openrouter::fetch_free_models()?;
            println!("Available free models:");
            for m in &models {
                let pricing = &m.pricing;
                let prompt_price: f64 = pricing.prompt.parse().unwrap_or(0.0);
                println!("  {} (${:.6}/1K tokens)", m.id, prompt_price);
            }
        }
        Some(("status", _m)) => {
            let models = openrouter::fetch_free_models()?;
            println!("OpenRouter API Status: OK");
            println!("Free models available: {}", models.len());
        }
        Some(("chat", sub_m)) => {
            let prompt = sub_m
                .get_one::<String>("prompt")
                .ok_or_else(|| anyhow::anyhow!("prompt required"))?;

            let models = openrouter::fetch_free_models()?;

            let model_id = sub_m
                .get_one::<String>("model")
                .cloned()
                .unwrap_or_else(|| "openai/gpt-4o-mini".to_string());

            let model = openrouter::resolve_model(&model_id, &models)
                .ok_or_else(|| anyhow::anyhow!("model '{model_id}' not found"))?;

            println!("Using model: {}", model.id);
            println!("Sending: {prompt}");

            let result = crate::services::chat::generate(model_id.as_str(), prompt)?;
            println!("Response: {result}");
        }
        Some(("hook", _m)) => {
            println!("OpenRouter webhook management (not yet implemented)");
            println!("See: https://openrouter.ai/docs/webhooks");
        }
        Some(("serve", _m)) => {
            println!("OpenRouter server (not yet implemented)");
        }
        _ => {}
    }
    Ok(())
}
