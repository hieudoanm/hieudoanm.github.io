use super::{parse_version, Version};

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let version_str = matches
        .get_one::<String>("version")
        .ok_or_else(|| anyhow::anyhow!("version required"))?;
    let part = matches
        .get_one::<String>("part")
        .ok_or_else(|| anyhow::anyhow!("part required (major, minor, patch)"))?;
    let prerelease = matches.get_one::<String>("prerelease").cloned();

    let v = parse_version(version_str)?;
    let bumped = match part.as_str() {
        "major" => Version {
            major: v.major + 1,
            minor: 0,
            patch: 0,
            prerelease: prerelease.clone().unwrap_or_default(),
        },
        "minor" => Version {
            major: v.major,
            minor: v.minor + 1,
            patch: 0,
            prerelease: prerelease.clone().unwrap_or_default(),
        },
        "patch" => Version {
            major: v.major,
            minor: v.minor,
            patch: v.patch + 1,
            prerelease: prerelease.clone().unwrap_or_default(),
        },
        _ => anyhow::bail!("invalid part '{part}': use major, minor, or patch"),
    };

    let prefix = if version_str.starts_with('v') {
        "v"
    } else {
        ""
    };
    println!("{}{bumped}", prefix);
    Ok(())
}
