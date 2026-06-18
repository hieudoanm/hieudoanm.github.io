use clap::ArgMatches;
use std::path::Path;
use std::process::Command;

pub fn command() -> clap::Command {
    clap::Command::new("keygen")
        .about("Generate cryptographic keys")
        .arg(
            clap::Arg::new("algorithm")
                .long("algo")
                .short('a')
                .help("Key algorithm (rsa, ecdsa, ed25519)")
                .default_value("ed25519"),
        )
        .arg(
            clap::Arg::new("bits")
                .long("bits")
                .short('b')
                .help("Key size (bits): 2048/4096 for rsa, 256/384/521 for ecdsa")
                .default_value("256"),
        )
        .arg(
            clap::Arg::new("output")
                .long("output")
                .short('o')
                .help("Output file path")
                .default_value("id_rsa"),
        )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let algorithm = matches
        .get_one::<String>("algorithm")
        .map(|s| s.as_str())
        .unwrap_or("ed25519");
    let bits: usize = matches
        .get_one::<String>("bits")
        .unwrap()
        .parse()
        .unwrap_or(256);
    let output = matches.get_one::<String>("output").unwrap();

    let out_path = Path::new(output);
    if let Some(parent) = out_path.parent() {
        if !parent.as_os_str().is_empty() {
            std::fs::create_dir_all(parent)?;
        }
    }

    match algorithm {
        "rsa" => gen_rsa(bits, output),
        "ecdsa" => gen_ecdsa(bits, output),
        "ed25519" => gen_ed25519(output),
        _ => anyhow::bail!("unsupported algorithm: {algorithm} (use rsa, ecdsa, or ed25519)"),
    }
}

fn gen_rsa(bits: usize, path: &str) -> anyhow::Result<()> {
    if bits != 2048 && bits != 4096 {
        anyhow::bail!("rsa key size must be 2048 or 4096");
    }
    let status = Command::new("openssl")
        .args(["genpkey", "-algorithm", "RSA"])
        .args(["-pkeyopt", &format!("rsa_keygen_bits:{bits}")])
        .arg("-out")
        .arg(path)
        .status()?;
    if !status.success() {
        anyhow::bail!("openssl genpkey failed");
    }
    extract_pub(path)?;
    let abs = std::fs::canonicalize(path)?;
    println!("Wrote {}", abs.display());
    println!("Wrote {}.pub", abs.display());
    Ok(())
}

fn gen_ecdsa(bits: usize, path: &str) -> anyhow::Result<()> {
    let curve = match bits {
        256 => "P-256",
        384 => "P-384",
        521 => "P-521",
        _ => anyhow::bail!("ecdsa key size must be 256, 384, or 521"),
    };
    let status = Command::new("openssl")
        .args(["genpkey", "-algorithm", "EC"])
        .args(["-pkeyopt", &format!("ec_paramgen_curve:{curve}")])
        .arg("-out")
        .arg(path)
        .status()?;
    if !status.success() {
        anyhow::bail!("openssl genpkey failed");
    }
    extract_pub(path)?;
    let abs = std::fs::canonicalize(path)?;
    println!("Wrote {}", abs.display());
    println!("Wrote {}.pub", abs.display());
    Ok(())
}

fn gen_ed25519(path: &str) -> anyhow::Result<()> {
    let status = Command::new("openssl")
        .args(["genpkey", "-algorithm", "ED25519"])
        .arg("-out")
        .arg(path)
        .status()?;
    if !status.success() {
        anyhow::bail!("openssl genpkey failed");
    }
    extract_pub(path)?;
    let abs = std::fs::canonicalize(path)?;
    println!("Wrote {}", abs.display());
    println!("Wrote {}.pub", abs.display());
    Ok(())
}

fn extract_pub(path: &str) -> anyhow::Result<()> {
    let pub_path = format!("{path}.pub");
    let status = Command::new("openssl")
        .args(["pkey", "-in", path, "-pubout"])
        .arg("-out")
        .arg(&pub_path)
        .status()?;
    if !status.success() {
        anyhow::bail!("openssl pkey failed");
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
