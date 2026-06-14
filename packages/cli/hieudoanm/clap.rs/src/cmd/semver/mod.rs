use std::cmp::Ordering;
use std::fmt;

pub mod compare;
pub mod sort;
pub mod validate;

#[derive(Debug, Clone)]
struct Version {
    major: u64,
    minor: u64,
    patch: u64,
    prerelease: String,
}

fn parse_version(s: &str) -> anyhow::Result<Version> {
    let s = s.trim_start_matches('v');
    let parts: Vec<&str> = s.splitn(3, '.').collect();
    if parts.len() < 3 {
        anyhow::bail!("invalid semver: {s} (need major.minor.patch)");
    }
    let major: u64 = parts[0]
        .parse()
        .map_err(|_| anyhow::anyhow!("invalid major: {}", parts[0]))?;
    let minor: u64 = parts[1]
        .parse()
        .map_err(|_| anyhow::anyhow!("invalid minor: {}", parts[1]))?;
    let patch_str = parts[2];
    let prerelease = if let Some(idx) = patch_str.find('-') {
        patch_str[idx + 1..].to_string()
    } else {
        String::new()
    };
    let patch_str = if prerelease.is_empty() {
        patch_str.to_string()
    } else {
        patch_str[..patch_str.find('-').unwrap()].to_string()
    };
    let patch: u64 = patch_str
        .parse()
        .map_err(|_| anyhow::anyhow!("invalid patch: {patch_str}"))?;
    Ok(Version {
        major,
        minor,
        patch,
        prerelease,
    })
}

impl fmt::Display for Version {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}.{}.{}", self.major, self.minor, self.patch)?;
        if !self.prerelease.is_empty() {
            write!(f, "-{}", self.prerelease)?;
        }
        Ok(())
    }
}

fn compare(a: &Version, b: &Version) -> Ordering {
    match a.major.cmp(&b.major) {
        Ordering::Equal => match a.minor.cmp(&b.minor) {
            Ordering::Equal => match a.patch.cmp(&b.patch) {
                Ordering::Equal => {
                    if a.prerelease == b.prerelease {
                        Ordering::Equal
                    } else if a.prerelease.is_empty() {
                        Ordering::Greater
                    } else if b.prerelease.is_empty() {
                        Ordering::Less
                    } else {
                        a.prerelease.cmp(&b.prerelease)
                    }
                }
                other => other,
            },
            other => other,
        },
        other => other,
    }
}

pub fn command() -> clap::Command {
    clap::Command::new("semver")
        .about("Parse, compare, sort, and bump semver strings")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("validate")
                .about("Validate a semver string")
                .arg(
                    clap::Arg::new("version")
                        .help("Version to validate")
                        .required(true),
                ),
        )
        .subcommand(
            clap::Command::new("compare")
                .about("Compare two semver strings")
                .arg(clap::Arg::new("a").help("First version").required(true))
                .arg(clap::Arg::new("b").help("Second version").required(true)),
        )
        .subcommand(
            clap::Command::new("sort").about("Sort semver strings").arg(
                clap::Arg::new("versions")
                    .help("Comma-separated versions")
                    .required(true),
            ),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("validate", sub_m)) => validate::run(sub_m).await,
        Some(("compare", sub_m)) => compare::run(sub_m).await,
        Some(("sort", sub_m)) => sort::run(sub_m).await,
        _ => Ok(()),
    }
}
