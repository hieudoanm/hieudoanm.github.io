mod cmd;
mod configs;
mod data;
mod libs;
mod services;

#[tokio::main]
async fn main() {
    if let Err(e) = cmd::execute().await {
        eprintln!("Error: {e}");
        std::process::exit(1);
    }
}
