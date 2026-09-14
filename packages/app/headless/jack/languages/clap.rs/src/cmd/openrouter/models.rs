use super::service;

pub async fn run() -> anyhow::Result<()> {
    let models = service::fetch_free_models()?;
    println!("Available free models:");
    for m in &models {
        let pricing = &m.pricing;
        let prompt_price: f64 = pricing.prompt.parse().unwrap_or(0.0);
        println!("  {} (${:.6}/1K tokens)", m.id, prompt_price);
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_module_compiles() {
        assert!(true);
    }
}
