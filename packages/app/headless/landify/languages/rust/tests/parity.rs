//! Golden parity: the rendered page for every type must byte-match the Go
//! binary's output, including the two themed variants.

macro_rules! assert_parity {
    ($typ:literal, $theme:expr, $golden:literal) => {{
        let tmp = tempfile::tempdir().unwrap();
        let in_path = tmp.path().join("in.yaml");
        let out_path = tmp.path().join("out.html");
        std::fs::write(
            &in_path,
            include_str!(concat!("../assets/examples/example-", $typ, ".yaml")),
        )
        .unwrap();
        landify::render::build_file(
            in_path.to_str().unwrap(),
            out_path.to_str().unwrap(),
            $theme,
        )
        .unwrap();
        let actual = std::fs::read(&out_path).unwrap();
        let golden = include_bytes!(concat!("./golden/", $golden));
        assert_eq!(
            actual,
            golden,
            "parity mismatch for {} (theme: {})",
            $typ,
            stringify!($theme)
        );
    }};
}

#[test]
fn product_parity() {
    assert_parity!("product", "", "product.html");
}

#[test]
fn product_midnight_parity() {
    assert_parity!("product", "midnight", "product-midnight.html");
}

#[test]
fn linktree_parity() {
    assert_parity!("linktree", "", "linktree.html");
}

#[test]
fn linktree_abyss_parity() {
    assert_parity!("linktree", "abyss", "linktree-abyss.html");
}

#[test]
fn app_parity() {
    assert_parity!("app", "", "app.html");
}

#[test]
fn docs_parity() {
    assert_parity!("docs", "", "docs.html");
}

#[test]
fn download_parity() {
    assert_parity!("download", "", "download.html");
}

#[test]
fn event_parity() {
    assert_parity!("event", "", "event.html");
}

#[test]
fn faq_parity() {
    assert_parity!("faq", "", "faq.html");
}

#[test]
fn portfolio_parity() {
    assert_parity!("portfolio", "", "portfolio.html");
}

#[test]
fn pricing_parity() {
    assert_parity!("pricing", "", "pricing.html");
}

#[test]
fn status_parity() {
    assert_parity!("status", "", "status.html");
}

#[test]
fn team_parity() {
    assert_parity!("team", "", "team.html");
}

#[test]
fn waitlist_parity() {
    assert_parity!("waitlist", "", "waitlist.html");
}
