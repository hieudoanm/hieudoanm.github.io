use aes_gcm::{
    Aes256Gcm, Nonce,
    aead::{Aead, KeyInit, OsRng},
};
use rand::RngCore;
use serde_json::Value;
use std::path::PathBuf;

use crate::models::Secret;

pub const EVENT_SECRET_CREATE: &str = "secret.create";
pub const EVENT_SECRET_UPDATE: &str = "secret.update";
pub const EVENT_SECRET_DELETE: &str = "secret.delete";

pub fn get_or_create_secrets_key(data_dir: &PathBuf) -> Result<Vec<u8>, String> {
    if let Ok(env_key) = std::env::var("SIMPLE_SECRETS_KEY") {
        return hex::decode(&env_key).map_err(|e| format!("decode env key: {e}"));
    }
    let key_path = data_dir.join("secrets.key");
    if let Ok(data) = std::fs::read_to_string(&key_path) {
        return hex::decode(data.trim()).map_err(|e| format!("decode key file: {e}"));
    }
    let mut key = vec![0u8; 32];
    rand::rngs::OsRng.fill_bytes(&mut key);
    let hex_key = hex::encode(&key);
    std::fs::write(&key_path, &hex_key).map_err(|e| format!("write key file: {e}"))?;
    Ok(key)
}

pub fn encrypt_secret(key: &[u8], plaintext: &str) -> Result<String, String> {
    let cipher = Aes256Gcm::new_from_slice(key).map_err(|e| format!("new cipher: {e}"))?;
    let mut nonce_bytes = vec![0u8; 12];
    OsRng.fill_bytes(&mut nonce_bytes);
    let nonce = Nonce::from_slice(&nonce_bytes);
    let ciphertext = cipher
        .encrypt(nonce, plaintext.as_bytes())
        .map_err(|e| format!("encrypt: {e}"))?;
    Ok(hex::encode(nonce_bytes) + ":" + &hex::encode(ciphertext))
}

pub fn decrypt_secret(key: &[u8], encrypted: &str) -> Result<String, String> {
    let parts: Vec<&str> = encrypted.splitn(2, ':').collect();
    if parts.len() != 2 {
        return Err("invalid encrypted format".into());
    }
    let nonce_bytes = hex::decode(parts[0]).map_err(|e| format!("decode nonce: {e}"))?;
    let ciphertext = hex::decode(parts[1]).map_err(|e| format!("decode ciphertext: {e}"))?;
    let cipher = Aes256Gcm::new_from_slice(key).map_err(|e| format!("new cipher: {e}"))?;
    let nonce = Nonce::from_slice(&nonce_bytes);
    let plaintext = cipher
        .decrypt(nonce, ciphertext.as_slice())
        .map_err(|e| format!("decrypt: {e}"))?;
    Ok(String::from_utf8(plaintext).map_err(|e| format!("utf8: {e}"))?)
}

pub fn webhook_secret_data(secret: &Secret) -> Value {
    serde_json::json!({
        "secret": secret,
    })
}
