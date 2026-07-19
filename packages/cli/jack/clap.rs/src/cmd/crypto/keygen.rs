use std::path::Path;
use std::process::Command;

#[derive(clap::Args)]
pub struct Args {
    #[arg(
        short = 'a',
        long = "algo",
        default_value = "ed25519",
        help = "Key algorithm (rsa, ecdsa, ed25519)"
    )]
    pub algorithm: String,
    #[arg(
        short = 'b',
        long = "bits",
        default_value = "256",
        help = "Key size (bits): 2048/4096 for rsa, 256/384/521 for ecdsa"
    )]
    pub bits: String,
    #[arg(
        short = 'o',
        long = "output",
        default_value = "id_rsa",
        help = "Output file path"
    )]
    pub output: String,
}

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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let algorithm = Some(&matches.algorithm)
        .map(|s| s.as_str())
        .unwrap_or("ed25519");
    let bits: usize = matches.bits.parse().unwrap_or(256);
    let output = &matches.output;

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
    validate_rsa_bits(bits)?;
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
    let curve = ecdsa_curve_for_bits(bits)?;
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

fn validate_rsa_bits(bits: usize) -> anyhow::Result<()> {
    if bits != 2048 && bits != 4096 {
        anyhow::bail!("rsa key size must be 2048 or 4096");
    }
    Ok(())
}

fn ecdsa_curve_for_bits(bits: usize) -> anyhow::Result<&'static str> {
    match bits {
        256 => Ok("P-256"),
        384 => Ok("P-384"),
        521 => Ok("P-521"),
        _ => anyhow::bail!("ecdsa key size must be 256, 384, or 521"),
    }
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

    #[test]
    fn test_validate_rsa_bits_2048() {
        assert!(validate_rsa_bits(2048).is_ok());
    }

    #[test]
    fn test_validate_rsa_bits_4096() {
        assert!(validate_rsa_bits(4096).is_ok());
    }

    #[test]
    fn test_validate_rsa_bits_1024() {
        let err = validate_rsa_bits(1024).unwrap_err();
        assert!(err.to_string().contains("2048 or 4096"));
    }

    #[test]
    fn test_validate_rsa_bits_0() {
        let err = validate_rsa_bits(0).unwrap_err();
        assert!(err.to_string().contains("2048 or 4096"));
    }

    #[test]
    fn test_validate_rsa_bits_8192() {
        let err = validate_rsa_bits(8192).unwrap_err();
        assert!(err.to_string().contains("2048 or 4096"));
    }

    #[test]
    fn test_ecdsa_curve_for_bits_256() {
        assert_eq!(ecdsa_curve_for_bits(256).unwrap(), "P-256");
    }

    #[test]
    fn test_ecdsa_curve_for_bits_384() {
        assert_eq!(ecdsa_curve_for_bits(384).unwrap(), "P-384");
    }

    #[test]
    fn test_ecdsa_curve_for_bits_521() {
        assert_eq!(ecdsa_curve_for_bits(521).unwrap(), "P-521");
    }

    #[test]
    fn test_ecdsa_curve_for_bits_128() {
        let err = ecdsa_curve_for_bits(128).unwrap_err();
        assert!(err.to_string().contains("256, 384, or 521"));
    }

    #[test]
    fn test_ecdsa_curve_for_bits_1024() {
        let err = ecdsa_curve_for_bits(1024).unwrap_err();
        assert!(err.to_string().contains("256, 384, or 521"));
    }

    #[test]
    fn test_ecdsa_curve_for_bits_0() {
        let err = ecdsa_curve_for_bits(0).unwrap_err();
        assert!(err.to_string().contains("256, 384, or 521"));
    }
}
