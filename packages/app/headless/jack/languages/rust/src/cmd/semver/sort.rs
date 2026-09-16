fn sort_versions(versions_str: &str) -> anyhow::Result<Vec<super::Version>> {
    let mut versions: Vec<super::Version> = versions_str
        .split(',')
        .map(|s| super::parse_version(s.trim()))
        .collect::<anyhow::Result<_>>()?;
    versions.sort_by(super::compare);
    Ok(versions)
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let versions_str = matches.get_one::<String>("versions").unwrap();
    let versions = sort_versions(versions_str)?;
    for v in &versions {
        println!("{v}");
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sort_versions_ascending() {
        let versions = sort_versions("1.0.0,2.0.0,3.0.0").unwrap();
        assert_eq!(versions.len(), 3);
        assert_eq!(format!("{}", versions[0]), "1.0.0");
        assert_eq!(format!("{}", versions[1]), "2.0.0");
        assert_eq!(format!("{}", versions[2]), "3.0.0");
    }

    #[test]
    fn test_sort_versions_descending() {
        let versions = sort_versions("3.0.0,2.0.0,1.0.0").unwrap();
        assert_eq!(format!("{}", versions[0]), "1.0.0");
        assert_eq!(format!("{}", versions[1]), "2.0.0");
        assert_eq!(format!("{}", versions[2]), "3.0.0");
    }

    #[test]
    fn test_sort_versions_mixed() {
        let versions = sort_versions("2.1.0,1.9.0,2.0.0").unwrap();
        assert_eq!(format!("{}", versions[0]), "1.9.0");
        assert_eq!(format!("{}", versions[1]), "2.0.0");
        assert_eq!(format!("{}", versions[2]), "2.1.0");
    }

    #[test]
    fn test_sort_versions_with_prerelease() {
        let versions = sort_versions("1.0.0-alpha,1.0.0,1.0.0-beta").unwrap();
        assert_eq!(format!("{}", versions[0]), "1.0.0-alpha");
        assert_eq!(format!("{}", versions[1]), "1.0.0-beta");
        assert_eq!(format!("{}", versions[2]), "1.0.0");
    }

    #[test]
    fn test_sort_versions_with_v_prefix() {
        let versions = sort_versions("v2.0.0,v1.0.0").unwrap();
        assert_eq!(format!("{}", versions[0]), "1.0.0");
        assert_eq!(format!("{}", versions[1]), "2.0.0");
    }

    #[test]
    fn test_sort_versions_single() {
        let versions = sort_versions("1.2.3").unwrap();
        assert_eq!(versions.len(), 1);
        assert_eq!(format!("{}", versions[0]), "1.2.3");
    }

    #[test]
    fn test_sort_versions_invalid() {
        assert!(sort_versions("abc").is_err());
        assert!(sort_versions("1.0.0,abc").is_err());
    }

    #[test]
    fn test_sort_versions_with_spaces() {
        let versions = sort_versions(" 2.0.0 , 1.0.0 ").unwrap();
        assert_eq!(format!("{}", versions[0]), "1.0.0");
        assert_eq!(format!("{}", versions[1]), "2.0.0");
    }

    #[test]
    fn test_sort_versions_equal() {
        let versions = sort_versions("1.0.0,1.0.0").unwrap();
        assert_eq!(versions.len(), 2);
        assert_eq!(format!("{}", versions[0]), "1.0.0");
        assert_eq!(format!("{}", versions[1]), "1.0.0");
    }
}
