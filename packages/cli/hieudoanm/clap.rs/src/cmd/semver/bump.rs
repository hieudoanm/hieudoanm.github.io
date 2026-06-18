use super::{parse_version, Version};

pub fn bump_version(version_str: &str, part: &str, prerelease: Option<&str>) -> anyhow::Result<String> {
    let v = parse_version(version_str)?;
    let prerelease_str = prerelease.unwrap_or("").to_string();
    let bumped = match part {
        "major" => Version {
            major: v.major + 1,
            minor: 0,
            patch: 0,
            prerelease: prerelease_str,
        },
        "minor" => Version {
            major: v.major,
            minor: v.minor + 1,
            patch: 0,
            prerelease: prerelease_str,
        },
        "patch" => Version {
            major: v.major,
            minor: v.minor,
            patch: v.patch + 1,
            prerelease: prerelease_str,
        },
        _ => anyhow::bail!("invalid part '{part}': use major, minor, or patch"),
    };

    let prefix = if version_str.starts_with('v') {
        "v"
    } else {
        ""
    };
    Ok(format!("{prefix}{bumped}"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let version_str = matches
        .get_one::<String>("version")
        .ok_or_else(|| anyhow::anyhow!("version required"))?;
    let part = matches
        .get_one::<String>("part")
        .ok_or_else(|| anyhow::anyhow!("part required (major, minor, patch)"))?;
    let prerelease = matches.get_one::<String>("prerelease");

    let result = bump_version(version_str, part, prerelease.map(|s| s.as_str()))?;
    println!("{result}");
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_bump_major() {
        assert_eq!(bump_version("1.2.3", "major", None).unwrap(), "2.0.0");
    }

    #[test]
    fn test_bump_minor() {
        assert_eq!(bump_version("1.2.3", "minor", None).unwrap(), "1.3.0");
    }

    #[test]
    fn test_bump_patch() {
        assert_eq!(bump_version("1.2.3", "patch", None).unwrap(), "1.2.4");
    }

    #[test]
    fn test_bump_with_v_prefix() {
        assert_eq!(bump_version("v1.2.3", "minor", None).unwrap(), "v1.3.0");
    }

    #[test]
    fn test_bump_with_prerelease() {
        assert_eq!(
            bump_version("1.2.3", "patch", Some("rc.1")).unwrap(),
            "1.2.4-rc.1"
        );
    }

    #[test]
    fn test_bump_from_zero() {
        assert_eq!(bump_version("0.1.0", "minor", None).unwrap(), "0.2.0");
    }

    #[test]
    fn test_bump_invalid_part() {
        assert!(bump_version("1.0.0", "invalid", None).is_err());
    }

    #[test]
    fn test_bump_invalid_version() {
        assert!(bump_version("not-a-version", "patch", None).is_err());
    }
}
