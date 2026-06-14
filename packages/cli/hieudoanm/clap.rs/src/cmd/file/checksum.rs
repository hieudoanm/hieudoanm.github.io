use crate::cmd::file::common::hex_encode;
use sha1::Sha1;
use sha2::{Digest, Sha256, Sha512};
use std::io::Read;

fn md5_hash(data: &[u8]) -> String {
    let mut h = md5::Md5::new();
    h.update(data);
    hex_encode(&h.finalize())
}

pub fn command() -> clap::Command {
    clap::Command::new("checksum")
        .about("Compute file checksum")
        .arg(
            clap::Arg::new("algorithm")
                .short('a')
                .long("algorithm")
                .help("Hash algorithm: md5, sha1, sha256, sha512")
                .default_value("sha256"),
        )
        .arg(
            clap::Arg::new("file")
                .short('f')
                .long("file")
                .help("File path")
                .required(true),
        )
}

pub async fn run(m: &clap::ArgMatches, json: bool) -> anyhow::Result<()> {
    let algorithm = m.get_one::<String>("algorithm").unwrap();
    let file_path = m.get_one::<String>("file").unwrap();

    let mut file = std::fs::File::open(file_path)?;
    let mut buf = Vec::new();
    file.read_to_end(&mut buf)?;

    let hash = match algorithm.as_str() {
        "md5" => md5_hash(&buf),
        "sha1" => {
            let mut h = Sha1::new();
            h.update(&buf);
            hex_encode(&h.finalize())
        }
        "sha512" => {
            let mut h = Sha512::new();
            h.update(&buf);
            hex_encode(&h.finalize())
        }
        _ => {
            let mut h = Sha256::new();
            h.update(&buf);
            hex_encode(&h.finalize())
        }
    };

    if json {
        let output = serde_json::json!({
            "file": file_path,
            "algorithm": algorithm,
            "hash": hash,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("{hash}  {file_path}");
    }

    Ok(())
}
