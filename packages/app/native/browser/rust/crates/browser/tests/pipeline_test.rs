use browser::Browser;

fn fixture_path(relative: &str) -> String {
    let manifest_dir = env!("CARGO_MANIFEST_DIR");
    let workspace_root = std::path::Path::new(manifest_dir)
        .parent()
        .unwrap()
        .parent()
        .unwrap();
    workspace_root.join(relative).to_string_lossy().to_string()
}

fn load_fixture(relative: &str) -> String {
    let path = fixture_path(relative);
    std::fs::read_to_string(&path).unwrap_or_else(|e| panic!("Failed to read {}: {}", path, e))
}

#[test]
fn test_mvp_page() {
    let html = load_fixture("tests/rendering/mvp.html");
    let mut browser = Browser::new();
    browser.set_viewport(800, 600);
    browser.load_html(&html);
    browser.build_layout();
    browser.build_display_list();

    let img = browser.render();
    assert_eq!(img.width(), 800);
    assert_eq!(img.height(), 600);
}

#[test]
fn test_basic_html() {
    let html = load_fixture("tests/html/basic.html");
    let mut browser = Browser::new();
    browser.load_html(&html);
    browser.build_layout();
    browser.build_display_list();

    let dom = browser.dom().unwrap();
    assert!(dom.node_count() > 0);
}

#[test]
fn test_nested_elements() {
    let html = load_fixture("tests/html/nested.html");
    let mut browser = Browser::new();
    browser.load_html(&html);
    browser.build_layout();
    browser.build_display_list();

    let dom = browser.dom().unwrap();
    assert!(dom.node_count() > 3);
}

#[test]
fn test_malformed_html() {
    let html = load_fixture("tests/html/malformed.html");
    let mut browser = Browser::new();
    browser.load_html(&html);
    browser.build_layout();
    browser.build_display_list();

    let _img = browser.render();
}

fn find_element_recursive(dom: &dom::Dom, start: dom::NodeId, name: &str) -> Option<dom::NodeId> {
    for &child in dom.children(start) {
        if dom.element_name(child) == Some(name) {
            return Some(child);
        }
        if let Some(found) = find_element_recursive(dom, child, name) {
            return Some(found);
        }
    }
    None
}

#[test]
fn test_attributes() {
    let html = load_fixture("tests/html/attributes.html");
    let mut browser = Browser::new();
    browser.load_html(&html);

    let dom = browser.dom().unwrap();
    let root = dom.root();
    let html_elem = dom.children(root)[0];
    let div = find_element_recursive(&dom, html_elem, "div").expect("div not found");

    assert_eq!(dom.attribute(div, "class"), Some("container"));
    assert_eq!(dom.attribute(div, "id"), Some("main"));
    assert_eq!(dom.attribute(div, "data-value"), Some("42"));
}

#[test]
fn test_colors_css() {
    let html = load_fixture("tests/css/colors.html");
    let mut browser = Browser::new();
    browser.set_viewport(800, 600);
    browser.load_html(&html);
    browser.build_layout();
    browser.build_display_list();

    let img = browser.render();
    assert_eq!(img.width(), 800);
}

#[test]
fn test_margin_css() {
    let html = load_fixture("tests/css/margin.html");
    let mut browser = Browser::new();
    browser.set_viewport(800, 600);
    browser.load_html(&html);
    browser.build_layout();
    browser.build_display_list();

    let img = browser.render();
    assert_eq!(img.width(), 800);
}

#[test]
fn test_padding_css() {
    let html = load_fixture("tests/css/padding.html");
    let mut browser = Browser::new();
    browser.set_viewport(800, 600);
    browser.load_html(&html);
    browser.build_layout();
    browser.build_display_list();

    let img = browser.render();
    assert_eq!(img.width(), 800);
}

#[test]
fn test_selectors_css() {
    let html = load_fixture("tests/css/selectors.html");
    let mut browser = Browser::new();
    browser.set_viewport(800, 600);
    browser.load_html(&html);
    browser.build_layout();
    browser.build_display_list();

    let img = browser.render();
    assert_eq!(img.width(), 800);
}

#[test]
fn test_block_layout() {
    let html = load_fixture("tests/rendering/block-layout.html");
    let mut browser = Browser::new();
    browser.set_viewport(800, 600);
    browser.load_html(&html);
    browser.build_layout();
    browser.build_display_list();

    let img = browser.render();
    assert_eq!(img.width(), 800);
}

#[test]
fn test_text_rendering() {
    let html = load_fixture("tests/rendering/text.html");
    let mut browser = Browser::new();
    browser.set_viewport(800, 600);
    browser.load_html(&html);
    browser.build_layout();
    browser.build_display_list();

    let img = browser.render();
    assert_eq!(img.width(), 800);
}

#[test]
fn test_screenshot_output() {
    let html = r#"
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: white; }
    .box {
      width: 300px;
      height: 100px;
      margin: 50px;
      padding: 20px;
      background: lightgray;
    }
  </style>
</head>
<body>
  <div class="box">Hello Browser</div>
</body>
</html>
"#;
    let mut browser = Browser::new();
    browser.set_viewport(800, 600);
    browser.load_html(html);
    browser.build_layout();
    browser.build_display_list();

    let img = browser.render();
    assert_eq!(img.width(), 800);
    assert_eq!(img.height(), 600);
}
