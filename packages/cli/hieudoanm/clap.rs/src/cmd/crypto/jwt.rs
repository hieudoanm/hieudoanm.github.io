use clap::ArgMatches;
use sha2::Digest;

pub fn command() -> clap::Command {
    clap::Command::new("jwt")
        .about("JWT encode/decode")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("encode")
                .about("Encode and sign a JWT token")
                .arg(
                    clap::Arg::new("algorithm")
                        .long("algorithm")
                        .short('a')
                        .help("Signing algorithm (HS256, HS384, HS512)")
                        .default_value("HS256"),
                )
                .arg(
                    clap::Arg::new("key")
                        .long("key")
                        .short('k')
                        .help("Signing key (secret)")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("claims")
                        .long("claims")
                        .short('c')
                        .help("Claims as JSON string")
                        .required(true),
                ),
        )
        .subcommand(
            clap::Command::new("decode")
                .about("Decode a JWT token without signature verification")
                .arg(
                    clap::Arg::new("token")
                        .long("token")
                        .short('t')
                        .help("JWT token to decode")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("json")
                        .long("json")
                        .help("Output in JSON format")
                        .action(clap::ArgAction::SetTrue),
                ),
        )
}

fn base64url_decode(input: &str) -> anyhow::Result<Vec<u8>> {
    let padded = match input.len() % 4 {
        2 => format!("{input}=="),
        3 => format!("{input}="),
        _ => input.to_string(),
    };
    let standard = padded.replace('-', "+").replace('_', "/");
    Ok(base64::Engine::decode(
        &base64::engine::general_purpose::STANDARD,
        &standard,
    )?)
}

fn base64url_encode(input: &[u8]) -> String {
    let encoded = base64::Engine::encode(&base64::engine::general_purpose::STANDARD, input);
    encoded
        .replace('+', "-")
        .replace('/', "_")
        .trim_end_matches('=')
        .to_string()
}

fn hmac_sha256_sign(key: &[u8], data: &[u8]) -> Vec<u8> {
    let block_size = 64;
    let mut k = key.to_vec();
    if k.len() > block_size {
        let mut hasher = sha2::Sha256::new();
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
    let mut inner = sha2::Sha256::new();
    inner.update(&ipad);
    inner.update(data);
    let inner_hash = inner.finalize();
    let mut outer = sha2::Sha256::new();
    outer.update(&opad);
    outer.update(inner_hash);
    outer.finalize().to_vec()
}

fn hmac_sha384_sign(key: &[u8], data: &[u8]) -> Vec<u8> {
    let block_size = 128;
    let mut k = key.to_vec();
    if k.len() > block_size {
        let mut hasher = sha2::Sha384::new();
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
    let mut inner = sha2::Sha384::new();
    inner.update(&ipad);
    inner.update(data);
    let inner_hash = inner.finalize();
    let mut outer = sha2::Sha384::new();
    outer.update(&opad);
    outer.update(inner_hash);
    outer.finalize().to_vec()
}

fn hmac_sha512_sign(key: &[u8], data: &[u8]) -> Vec<u8> {
    let block_size = 128;
    let mut k = key.to_vec();
    if k.len() > block_size {
        let mut hasher = sha2::Sha512::new();
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
    let mut inner = sha2::Sha512::new();
    inner.update(&ipad);
    inner.update(data);
    let inner_hash = inner.finalize();
    let mut outer = sha2::Sha512::new();
    outer.update(&opad);
    outer.update(inner_hash);
    outer.finalize().to_vec()
}

fn run_encode(matches: &ArgMatches) -> anyhow::Result<()> {
    let algorithm = matches
        .get_one::<String>("algorithm")
        .map(|s| s.as_str())
        .unwrap_or("HS256");
    let key = matches.get_one::<String>("key").unwrap();
    let claims_json = matches.get_one::<String>("claims").unwrap();

    let _claims: serde_json::Value = serde_json::from_str(claims_json)?;

    let header = serde_json::json!({"alg": algorithm, "typ": "JWT"});
    let header_b64 = base64url_encode(&serde_json::to_string(&header)?.into_bytes());
    let claims_b64 = base64url_encode(claims_json.as_bytes());
    let signing_input = format!("{header_b64}.{claims_b64}");

    let sig = match algorithm {
        "HS256" => hmac_sha256_sign(key.as_bytes(), signing_input.as_bytes()),
        "HS384" => hmac_sha384_sign(key.as_bytes(), signing_input.as_bytes()),
        "HS512" => hmac_sha512_sign(key.as_bytes(), signing_input.as_bytes()),
        _ => anyhow::bail!("unsupported algorithm: {algorithm} (use HS256, HS384, HS512)"),
    };
    let sig_b64 = base64url_encode(&sig);

    println!("{signing_input}.{sig_b64}");
    Ok(())
}

fn run_decode(matches: &ArgMatches) -> anyhow::Result<()> {
    let token = matches.get_one::<String>("token").unwrap();
    let json = matches.get_flag("json");

    let parts: Vec<&str> = token.split('.').collect();
    if parts.len() < 2 {
        anyhow::bail!("invalid JWT token");
    }

    let header_bytes = base64url_decode(parts[0])?;
    let payload_bytes = base64url_decode(parts[1])?;

    let header_val: serde_json::Value = serde_json::from_slice(&header_bytes)?;
    let payload_val: serde_json::Value = serde_json::from_slice(&payload_bytes)?;

    if json {
        let out = serde_json::json!({
            "header": header_val,
            "payload": payload_val,
        });
        println!("{}", serde_json::to_string_pretty(&out)?);
    } else {
        println!("Header:\n{}", serde_json::to_string_pretty(&header_val)?);
        println!(
            "\nPayload:\n{}",
            serde_json::to_string_pretty(&payload_val)?
        );
    }
    Ok(())
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("encode", m)) => run_encode(m),
        Some(("decode", m)) => run_decode(m),
        _ => anyhow::bail!("expected 'encode' or 'decode' subcommand"),
    }
}
