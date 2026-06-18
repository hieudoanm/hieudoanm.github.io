use super::service;

pub async fn run() -> anyhow::Result<()> {
    let models = service::fetch_free_models()?;
    println!("OpenRouter API Status: OK");
    println!("Free models available: {}", models.len());
    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_module_compiles() {
        assert!(true);
    }
}
