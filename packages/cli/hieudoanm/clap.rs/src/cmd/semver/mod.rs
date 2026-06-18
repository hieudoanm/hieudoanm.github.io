use std::cmp::Ordering;
use std::fmt;

pub mod bump;
pub mod compare;
pub mod range;
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
        .subcommand(
            clap::Command::new("bump")
                .about("Bump a version (major, minor, patch)")
                .arg(
                    clap::Arg::new("version")
                        .help("Version to bump")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("part")
                        .help("Part to bump (major, minor, patch)")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("prerelease")
                        .short('p')
                        .long("prerelease")
                        .help("Prerelease tag"),
                ),
        )
        .subcommand(
            clap::Command::new("range")
                .about("Check if a version satisfies a range")
                .arg(
                    clap::Arg::new("version")
                        .help("Version to check")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("range")
                        .help("Range (e.g. '>=1.0.0 <2.0.0')")
                        .required(true),
                ),
        )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_version_basic() {
        let v = parse_version("1.2.3").unwrap();
        assert_eq!(v.major, 1);
        assert_eq!(v.minor, 2);
        assert_eq!(v.patch, 3);
        assert!(v.prerelease.is_empty());
    }

    #[test]
    fn test_parse_version_with_v_prefix() {
        let v = parse_version("v2.0.1").unwrap();
        assert_eq!(v.major, 2);
        assert_eq!(v.minor, 0);
        assert_eq!(v.patch, 1);
    }

    #[test]
    fn test_parse_version_with_prerelease() {
        let v = parse_version("1.0.0-alpha.1").unwrap();
        assert_eq!(v.major, 1);
        assert_eq!(v.prerelease, "alpha.1");
    }

    #[test]
    fn test_parse_version_invalid() {
        assert!(parse_version("1.2").is_err());
        assert!(parse_version("abc").is_err());
        assert!(parse_version("").is_err());
    }

    #[test]
    fn test_version_display() {
        let v = Version { major: 1, minor: 2, patch: 3, prerelease: String::new() };
        assert_eq!(format!("{v}"), "1.2.3");
    }

    #[test]
    fn test_version_display_prerelease() {
        let v = Version { major: 2, minor: 0, patch: 0, prerelease: "rc.1".to_string() };
        assert_eq!(format!("{v}"), "2.0.0-rc.1");
    }

    #[test]
    fn test_compare_equal() {
        let a = parse_version("1.0.0").unwrap();
        let b = parse_version("1.0.0").unwrap();
        assert_eq!(compare(&a, &b), std::cmp::Ordering::Equal);
    }

    #[test]
    fn test_compare_greater_major() {
        let a = parse_version("2.0.0").unwrap();
        let b = parse_version("1.0.0").unwrap();
        assert_eq!(compare(&a, &b), std::cmp::Ordering::Greater);
    }

    #[test]
    fn test_compare_less_minor() {
        let a = parse_version("1.0.0").unwrap();
        let b = parse_version("1.1.0").unwrap();
        assert_eq!(compare(&a, &b), std::cmp::Ordering::Less);
    }

    #[test]
    fn test_compare_prerelease_vs_release() {
        let a = parse_version("1.0.0-alpha").unwrap();
        let b = parse_version("1.0.0").unwrap();
        assert_eq!(compare(&a, &b), std::cmp::Ordering::Less);
    }

    #[test]
    fn test_compare_release_vs_prerelease() {
        let a = parse_version("1.0.0").unwrap();
        let b = parse_version("1.0.0-alpha").unwrap();
        assert_eq!(compare(&a, &b), std::cmp::Ordering::Greater);
    }

    #[test]
    fn test_compare_patch() {
        let a = parse_version("1.0.2").unwrap();
        let b = parse_version("1.0.1").unwrap();
        assert_eq!(compare(&a, &b), std::cmp::Ordering::Greater);
    }
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("validate", sub_m)) => validate::run(sub_m).await,
        Some(("compare", sub_m)) => compare::run(sub_m).await,
        Some(("sort", sub_m)) => sort::run(sub_m).await,
        Some(("bump", sub_m)) => bump::run(sub_m).await,
        Some(("range", sub_m)) => range::run(sub_m).await,
        _ => Ok(()),
    }
}
