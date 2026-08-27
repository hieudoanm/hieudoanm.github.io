use dom::{Dom, NodeId};

pub fn parse_html(input: &str) -> Dom {
    let mut dom = Dom::new();
    let root = dom.root();
    let html = dom.create_element("html", "http://www.w3.org/1999/xhtml", root);
    let mut stack = vec![html];

    let mut chars = input.chars().peekable();
    let mut buffer = String::new();

    while let Some(&ch) = chars.peek() {
        if ch == '<' {
            // Flush text buffer
            if !buffer.trim().is_empty() {
                let parent = *stack.last().unwrap_or(&html);
                dom.create_text(&buffer, parent);
            }
            buffer.clear();
            chars.next();

            // Parse tag
            if let Some(tag) = parse_tag(&mut chars) {
                match tag {
                    Tag::Start { name, attributes } => {
                        let parent = *stack.last().unwrap_or(&html);
                        let elem =
                            dom.create_element(&name, "http://www.w3.org/1999/xhtml", parent);
                        for (k, v) in &attributes {
                            dom.set_attribute(elem, k, v);
                        }
                        if !is_void_element(&name) {
                            stack.push(elem);
                        }
                    }
                    Tag::End { name } => {
                        let name_lower = name.to_ascii_lowercase();
                        // Pop until we find the matching tag
                        while stack.len() > 1 {
                            let top = *stack.last().unwrap();
                            if dom.element_name(top) == Some(name_lower.as_str()) {
                                stack.pop();
                                break;
                            }
                            stack.pop();
                        }
                    }
                    Tag::Comment(text) => {
                        let parent = *stack.last().unwrap_or(&html);
                        dom.create_comment(&text, parent);
                    }
                    Tag::Doctype => {
                        // Skip doctype
                    }
                }
            }
        } else {
            buffer.push(ch);
            chars.next();
        }
    }

    // Flush remaining text
    if !buffer.trim().is_empty() {
        let parent = *stack.last().unwrap_or(&html);
        dom.create_text(&buffer, parent);
    }

    dom
}

enum Tag {
    Start {
        name: String,
        attributes: Vec<(String, String)>,
    },
    End {
        name: String,
    },
    Comment(String),
    Doctype,
}

fn parse_tag(chars: &mut std::iter::Peekable<std::str::Chars<'_>>) -> Option<Tag> {
    let mut name = String::new();
    let mut attributes = Vec::new();

    // Check for comment: <!-- -->
    if chars.peek() == Some(&'!') {
        chars.next();
        if chars.peek() == Some(&'-') {
            chars.next();
            if chars.peek() == Some(&'-') {
                chars.next();
                let mut comment = String::new();
                loop {
                    match chars.next()? {
                        '-' if chars.peek() == Some(&'-') => {
                            chars.next();
                            if chars.peek() == Some(&'>') {
                                chars.next();
                                return Some(Tag::Comment(comment));
                            }
                            comment.push('-');
                        }
                        c => comment.push(c),
                    }
                }
            }
        }
        // Check for doctype: <!DOCTYPE ...>
        let mut doctype_buf = String::new();
        doctype_buf.push('!');
        while let Some(&ch) = chars.peek() {
            if ch == '>' {
                chars.next();
                return Some(Tag::Doctype);
            }
            doctype_buf.push(ch);
            chars.next();
        }
        return Some(Tag::Doctype);
    }

    // Closing tag: </name>
    let closing = if chars.peek() == Some(&'/') {
        chars.next();
        true
    } else {
        false
    };

    // Tag name
    while let Some(&ch) = chars.peek() {
        if ch.is_alphanumeric() || ch == '-' || ch == '_' {
            name.push(ch);
            chars.next();
        } else {
            break;
        }
    }

    if name.is_empty() {
        return None;
    }

    if closing {
        // Skip to >
        while let Some(ch) = chars.next() {
            if ch == '>' {
                break;
            }
        }
        return Some(Tag::End { name });
    }

    // Parse attributes
    loop {
        // Skip whitespace
        while let Some(&ch) = chars.peek() {
            if !ch.is_whitespace() {
                break;
            }
            chars.next();
        }

        if let Some(&ch) = chars.peek() {
            match ch {
                '>' => {
                    chars.next();
                    break;
                }
                '/' => {
                    chars.next();
                    if chars.peek() == Some(&'>') {
                        chars.next();
                    }
                    break;
                }
                _ => {
                    // Parse attribute
                    if let Some((attr_name, attr_value)) = parse_attribute(chars) {
                        attributes.push((attr_name, attr_value));
                    } else {
                        break;
                    }
                }
            }
        } else {
            break;
        }
    }

    Some(Tag::Start { name, attributes })
}

fn parse_attribute(
    chars: &mut std::iter::Peekable<std::str::Chars<'_>>,
) -> Option<(String, String)> {
    let mut name = String::new();

    // Attribute name
    while let Some(&ch) = chars.peek() {
        if ch == '=' || ch.is_whitespace() || ch == '>' || ch == '/' {
            break;
        }
        name.push(ch);
        chars.next();
    }

    if name.is_empty() {
        return None;
    }

    // Skip whitespace
    while let Some(&ch) = chars.peek() {
        if !ch.is_whitespace() {
            break;
        }
        chars.next();
    }

    // Skip =
    if chars.peek() == Some(&'=') {
        chars.next();
    }

    // Skip whitespace
    while let Some(&ch) = chars.peek() {
        if !ch.is_whitespace() {
            break;
        }
        chars.next();
    }

    // Attribute value
    let value = match chars.peek() {
        Some(&'"') => {
            chars.next();
            let mut val = String::new();
            while let Some(ch) = chars.next() {
                if ch == '"' {
                    break;
                }
                val.push(ch);
            }
            val
        }
        Some(&'\'') => {
            chars.next();
            let mut val = String::new();
            while let Some(ch) = chars.next() {
                if ch == '\'' {
                    break;
                }
                val.push(ch);
            }
            val
        }
        _ => {
            let mut val = String::new();
            while let Some(&ch) = chars.peek() {
                if ch.is_whitespace() || ch == '>' || ch == '/' {
                    break;
                }
                val.push(ch);
                chars.next();
            }
            val
        }
    };

    Some((name, value))
}

fn is_void_element(name: &str) -> bool {
    matches!(
        name.to_ascii_lowercase().as_str(),
        "area"
            | "base"
            | "br"
            | "col"
            | "embed"
            | "hr"
            | "img"
            | "input"
            | "link"
            | "meta"
            | "param"
            | "source"
            | "track"
            | "wbr"
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_empty() {
        let dom = parse_html("");
        assert!(dom.get(dom.root()).is_some());
    }

    #[test]
    fn parse_simple_element() {
        let dom = parse_html("<div></div>");
        let root = dom.root();
        let html = dom.children(root)[0];
        assert_eq!(dom.element_name(html), Some("html"));
    }

    #[test]
    fn parse_text_content() {
        let dom = parse_html("<p>hello</p>");
        let root = dom.root();
        let html = dom.children(root)[0];
        let p = dom
            .children(html)
            .iter()
            .find(|&&c| dom.element_name(c) == Some("p"))
            .copied()
            .unwrap();
        let text = dom.children(p)[0];
        assert_eq!(dom.text_content(text), Some("hello"));
    }

    #[test]
    fn parse_attributes() {
        let dom = parse_html(r#"<div class="box" id="main"></div>"#);
        let root = dom.root();
        let html = dom.children(root)[0];
        let div = dom
            .children(html)
            .iter()
            .find(|&&c| dom.element_name(c) == Some("div"))
            .copied()
            .unwrap();
        assert_eq!(dom.attribute(div, "class"), Some("box"));
        assert_eq!(dom.attribute(div, "id"), Some("main"));
    }

    #[test]
    fn parse_nested() {
        let dom = parse_html("<div><span>text</span></div>");
        let root = dom.root();
        let html = dom.children(root)[0];
        let div = dom
            .children(html)
            .iter()
            .find(|&&c| dom.element_name(c) == Some("div"))
            .copied()
            .unwrap();
        let span = dom
            .children(div)
            .iter()
            .find(|&&c| dom.element_name(c) == Some("span"))
            .copied()
            .unwrap();
        assert_eq!(dom.element_name(span), Some("span"));
    }

    #[test]
    fn parse_comment() {
        let dom = parse_html("<!-- hello -->");
        assert!(dom.node_count() > 1);
    }

    #[test]
    fn parse_void_element() {
        let dom = parse_html("<br><img src=\"test.png\">");
        let root = dom.root();
        let html = dom.children(root)[0];
        let children = dom.children(html);
        assert!(children.len() >= 1);
    }

    #[test]
    fn parse_self_closing() {
        let dom = parse_html("<input type=\"text\" />");
        assert!(dom.node_count() > 1);
    }
}
