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
    outer.update(&inner_hash);
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
    outer.update(&inner_hash);
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
    outer.update(&inner_hash);
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
    outer.update(&inner_hash);
    outer.finalize().to_vec()
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
