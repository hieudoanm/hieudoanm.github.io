use clap::ArgMatches;
use md5::{Digest, Md5};
use sha1::Sha1;
use sha2::{Sha256, Sha512};
use std::io::Read;

pub fn command() -> clap::Command {
    clap::Command::new("hash")
        .about("Compute hashes of text or files")
        .arg(
            clap::Arg::new("algorithm")
                .long("algo")
                .short('a')
                .help("Hash algorithm (md5, sha1, sha256, sha512)")
                .default_value("sha256"),
        )
        .arg(
            clap::Arg::new("text")
                .long("text")
                .short('t')
                .help("Text to hash"),
        )
        .arg(
            clap::Arg::new("key")
                .long("key")
                .short('k')
                .help("HMAC key"),
        )
        .arg(
            clap::Arg::new("check")
                .long("check")
                .help("Verify file hash from 'hash filename' format")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
        .arg(clap::Arg::new("file").help("File to hash"))
}

fn hex_encode(bytes: &[u8]) -> String {
    let mut s = String::with_capacity(bytes.len() * 2);
    for b in bytes {
        s.push_str(&format!("{b:02x}"));
    }
    s
}

fn compute_hash(input: &[u8], algorithm: &str) -> anyhow::Result<String> {
    match algorithm {
        "md5" => {
            let mut hasher = Md5::new();
            hasher.update(input);
            Ok(hex_encode(&hasher.finalize()))
        }
        "sha1" => {
            let mut hasher = Sha1::new();
            hasher.update(input);
            Ok(hex_encode(&hasher.finalize()))
        }
        "sha256" => {
            let mut hasher = Sha256::new();
            hasher.update(input);
            Ok(hex_encode(&hasher.finalize()))
        }
        "sha512" => {
            let mut hasher = Sha512::new();
            hasher.update(input);
            Ok(hex_encode(&hasher.finalize()))
        }
        _ => anyhow::bail!("unknown algorithm: {algorithm}"),
    }
}

fn hmac_sha256(key: &[u8], data: &[u8]) -> Vec<u8> {
    let block_size = 64;
    let mut k = key.to_vec();
    if k.len() > block_size {
        let mut hasher = Sha256::new();
        hasher.update(&k);
        k = hasher.finalize().to_vec();
    }
    k.resize(block_size, 0);
    let mut ipad = vec![0x36u8; block_size];
    let mut opad = vec![0x5cu8; block_size];
    for i in 0..block_size {
        ipad[i] ^= k[i];
        opad[i] ^= k[i];
    }
    let mut inner = Sha256::new();
    inner.update(&ipad);
    inner.update(data);
    let inner_hash = inner.finalize();
    let mut outer = Sha256::new();
    outer.update(&opad);
    outer.update(inner_hash);
    outer.finalize().to_vec()
}

fn hmac_sha1(key: &[u8], data: &[u8]) -> Vec<u8> {
    let block_size = 64;
    let mut k = key.to_vec();
    if k.len() > block_size {
        let mut hasher = Sha1::new();
        hasher.update(&k);
        k = hasher.finalize().to_vec();
    }
    k.resize(block_size, 0);
    let mut ipad = vec![0x36u8; block_size];
    let mut opad = vec![0x5cu8; block_size];
    for i in 0..block_size {
        ipad[i] ^= k[i];
        opad[i] ^= k[i];
    }
    let mut inner = Sha1::new();
    inner.update(&ipad);
    inner.update(data);
    let inner_hash = inner.finalize();
    let mut outer = Sha1::new();
    outer.update(&opad);
    outer.update(inner_hash);
    outer.finalize().to_vec()
}

fn hmac_md5(key: &[u8], data: &[u8]) -> Vec<u8> {
    let block_size = 64;
    let mut k = key.to_vec();
    if k.len() > block_size {
        let mut hasher = Md5::new();
        hasher.update(&k);
        k = hasher.finalize().to_vec();
    }
    k.resize(block_size, 0);
    let mut ipad = vec![0x36u8; block_size];
    let mut opad = vec![0x5cu8; block_size];
    for i in 0..block_size {
        ipad[i] ^= k[i];
        opad[i] ^= k[i];
    }
    let mut inner = Md5::new();
    inner.update(&ipad);
    inner.update(data);
    let inner_hash = inner.finalize();
    let mut outer = Md5::new();
    outer.update(&opad);
    outer.update(inner_hash);
    outer.finalize().to_vec()
}

fn hmac_sha512(key: &[u8], data: &[u8]) -> Vec<u8> {
    let block_size = 128;
    let mut k = key.to_vec();
    if k.len() > block_size {
        let mut hasher = Sha512::new();
        hasher.update(&k);
        k = hasher.finalize().to_vec();
    }
    k.resize(block_size, 0);
    let mut ipad = vec![0x36u8; block_size];
    let mut opad = vec![0x5cu8; block_size];
    for i in 0..block_size {
        ipad[i] ^= k[i];
        opad[i] ^= k[i];
    }
    let mut inner = Sha512::new();
    inner.update(&ipad);
    inner.update(data);
    let inner_hash = inner.finalize();
    let mut outer = Sha512::new();
    outer.update(&opad);
    outer.update(inner_hash);
    outer.finalize().to_vec()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hex_encode_empty() {
        assert_eq!(hex_encode(b""), "");
    }

    #[test]
    fn test_hex_encode() {
        assert_eq!(hex_encode(b"hello"), "68656c6c6f");
    }

    #[test]
    fn test_compute_hash_md5() {
        let h = compute_hash(b"hello", "md5").unwrap();
        assert_eq!(h, "5d41402abc4b2a76b9719d911017c592");
    }

    #[test]
    fn test_compute_hash_sha1() {
        let h = compute_hash(b"hello", "sha1").unwrap();
        assert_eq!(h, "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d");
    }

    #[test]
    fn test_compute_hash_sha256() {
        let h = compute_hash(b"hello", "sha256").unwrap();
        assert_eq!(h, "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824");
    }

    #[test]
    fn test_compute_hash_sha512() {
        let h = compute_hash(b"hello", "sha512").unwrap();
        assert_eq!(h, "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043");
    }

    #[test]
    fn test_compute_hash_unknown_algorithm() {
        let result = compute_hash(b"hello", "unknown");
        assert!(result.is_err());
    }

    #[test]
    fn test_hmac_sha256() {
        let result = hmac_sha256(b"key", b"data");
        assert_eq!(hex_encode(&result), "5031fe3d989c6d1537a013fa6e739da23463fdaec3b70137d828e36ace221bd0");
    }

    #[test]
    fn test_hmac_sha1() {
        let result = hmac_sha1(b"key", b"data");
        assert_eq!(hex_encode(&result), "104152c5bfdca07bc633eebd46199f0255c9f49d");
    }

    #[test]
    fn test_hmac_md5() {
        let result = hmac_md5(b"key", b"data");
        assert_eq!(hex_encode(&result), "9d5c73ef85594d34ec4438b7c97e51d8");
    }

    #[test]
    fn test_hmac_sha512() {
        let result = hmac_sha512(b"key", b"data");
        assert_eq!(hex_encode(&result), "3c5953a18f7303ec653ba170ae334fafa08e3846f2efe317b87efce82376253cb52a8c31ddcde5a3a2eee183c2b34cb91f85e64ddbc325f7692b199473579c58");
    }

    #[test]
    fn test_hmac_long_key_sha256() {
        let long_key = b"this is a very long key that exceeds the block size of 64 bytes for sha256, so it must be hashed first before being used as the HMAC key";
        let result = hmac_sha256(long_key, b"test data");
        let hash = hex_encode(&result);
        assert_eq!(hash.len(), 64);
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert_eq!(cmd.get_name(), "hash");
    }

    #[tokio::test]
    async fn test_run_with_text_sha256() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["hash", "--text", "hello", "--algo", "sha256"])
            .unwrap();
        run(&m).await.unwrap();
    }

    #[tokio::test]
    async fn test_run_with_text_md5_json() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["hash", "--text", "hello", "--algo", "md5", "--json"])
            .unwrap();
        run(&m).await.unwrap();
    }

    #[tokio::test]
    async fn test_run_with_hmac_sha256() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["hash", "--text", "data", "--key", "key", "--algo", "sha256"])
            .unwrap();
        run(&m).await.unwrap();
    }

    #[tokio::test]
    async fn test_run_with_hmac_sha1_json() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["hash", "--text", "data", "--key", "key", "--algo", "sha1", "--json"])
            .unwrap();
        run(&m).await.unwrap();
    }

    #[tokio::test]
    async fn test_run_with_hmac_md5() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["hash", "--text", "data", "--key", "key", "--algo", "md5"])
            .unwrap();
        run(&m).await.unwrap();
    }

    #[tokio::test]
    async fn test_run_with_hmac_sha512_json() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["hash", "--text", "data", "--key", "key", "--algo", "sha512", "--json"])
            .unwrap();
        run(&m).await.unwrap();
    }
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let algorithm = matches
        .get_one::<String>("algorithm")
        .map(|s| s.as_str())
        .unwrap_or("sha256");
    let text = matches.get_one::<String>("text").map(|s| s.as_str());
    let key = matches.get_one::<String>("key").map(|s| s.as_str());
    let check = matches.get_flag("check");
    let json = matches.get_flag("json");
    let file = matches.get_one::<String>("file");

    let input: Vec<u8> = if let Some(t) = text {
        t.as_bytes().to_vec()
    } else if let Some(f) = file {
        std::fs::read(f)?
    } else {
        let mut buf = Vec::new();
        std::io::stdin().read_to_end(&mut buf)?;
        buf
    };

    if check {
        let s = String::from_utf8_lossy(&input);
        let parts: Vec<&str> = s.trim().splitn(2, ' ').collect();
        if parts.len() != 2 {
            anyhow::bail!("invalid --check format: expected 'hash filename'");
        }
        let expected_hash = parts[0];
        let filename = parts[1];
        let file_content = std::fs::read(filename)?;
        let actual_hash = compute_hash(&file_content, algorithm)?;
        let status = actual_hash == expected_hash;
        if json {
            let out = serde_json::json!({
                "filename": filename,
                "algorithm": algorithm,
                "expected": expected_hash,
                "actual": actual_hash,
                "status": status,
            });
            println!("{}", serde_json::to_string_pretty(&out)?);
        } else if status {
            println!("{filename}: OK");
        } else {
            println!("{filename}: FAILED");
            anyhow::bail!("hash mismatch");
        }
        return Ok(());
    }

    if let Some(k) = key {
        let result = match algorithm {
            "md5" => hmac_md5(k.as_bytes(), &input),
            "sha1" => hmac_sha1(k.as_bytes(), &input),
            "sha256" => hmac_sha256(k.as_bytes(), &input),
            "sha512" => hmac_sha512(k.as_bytes(), &input),
            _ => anyhow::bail!("unknown algorithm: {algorithm}"),
        };
        let hash = hex_encode(&result);
        if json {
            let out = serde_json::json!({
                "algorithm": algorithm,
                "mode": "hmac",
                "hash": hash,
            });
            println!("{}", serde_json::to_string_pretty(&out)?);
        } else {
            println!("{hash}");
        }
    } else {
        let result = compute_hash(&input, algorithm)?;
        if json {
            let out = serde_json::json!({
                "algorithm": algorithm,
                "hash": result,
            });
            println!("{}", serde_json::to_string_pretty(&out)?);
        } else {
            println!("{result}");
        }
    }
    Ok(())
}
