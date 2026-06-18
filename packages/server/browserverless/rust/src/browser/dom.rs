use html5ever::serialize::{serialize, SerializeOpts, TraversalScope};
use html5ever::tendril::TendrilSink;
use html5ever::{parse_document, ParseOpts, local_name, ns, Attribute, QualName};
use markup5ever_rcdom::{Handle, NodeData, RcDom, SerializableHandle};
use rquickjs::class::{Trace, Tracer};
use std::cell::{Cell, RefCell};
use std::rc::Rc;

#[rquickjs::class]
pub struct JsDocument {
    pub handle: Handle,
}

#[rquickjs::methods]
impl JsDocument {
    #[qjs(rename = "querySelector")]
    pub fn query_selector<'js>(&self, ctx: rquickjs::Ctx<'js>, selector: String) -> Option<rquickjs::Class<'js, JsElement>> {
        self.find_by_tag(&self.handle, &selector).map(|h| {
            rquickjs::Class::instance(ctx, JsElement { handle: h }).unwrap()
        })
    }

    #[qjs(rename = "querySelectorAll")]
    pub fn query_selector_all<'js>(&self, ctx: rquickjs::Ctx<'js>, tag: String) -> Vec<rquickjs::Class<'js, JsElement>> {
        let mut results = Vec::new();
        self.find_all_by_tag(&self.handle, &tag, &mut results);
        results.into_iter().map(|h| {
            rquickjs::Class::instance(ctx.clone(), JsElement { handle: h }).unwrap()
        }).collect()
    }

    #[qjs(rename = "getElementById")]
    pub fn get_element_by_id<'js>(&self, ctx: rquickjs::Ctx<'js>, id: String) -> Option<rquickjs::Class<'js, JsElement>> {
        self.find_by_id(&self.handle, &id).map(|h| {
            rquickjs::Class::instance(ctx, JsElement { handle: h }).unwrap()
        })
    }

    #[qjs(rename = "createElement")]
    pub fn create_element<'js>(&self, ctx: rquickjs::Ctx<'js>, tag_name: String) -> rquickjs::Class<'js, JsElement> {
        let handle = create_element_node(&tag_name);
        rquickjs::Class::instance(ctx, JsElement { handle }).unwrap()
    }
}

impl JsDocument {
    fn find_by_tag(&self, handle: &Handle, tag: &str) -> Option<Handle> {
        let node = handle;
        if let NodeData::Element { name, .. } = &node.data {
            if name.local.to_string().eq_ignore_ascii_case(tag) {
                return Some(node.clone());
            }
        }
        for child in node.children.borrow().iter() {
            if let Some(found) = self.find_by_tag(child, tag) {
                return Some(found);
            }
        }
        None
    }

    fn find_all_by_tag(&self, handle: &Handle, tag: &str, results: &mut Vec<Handle>) {
        let node = handle;
        if let NodeData::Element { name, .. } = &node.data {
            if name.local.to_string().eq_ignore_ascii_case(tag) {
                results.push(node.clone());
            }
        }
        for child in node.children.borrow().iter() {
            self.find_all_by_tag(child, tag, results);
        }
    }

    fn find_by_id(&self, handle: &Handle, id: &str) -> Option<Handle> {
        let node = handle;
        if let NodeData::Element { attrs, .. } = &node.data {
            for attr in attrs.borrow().iter() {
                if attr.name.local.to_string() == "id" && attr.value.to_string() == id {
                    return Some(node.clone());
                }
            }
        }
        for child in node.children.borrow().iter() {
            if let Some(found) = self.find_by_id(child, id) {
                return Some(found);
            }
        }
        None
    }
}

#[rquickjs::class]
pub struct JsElement {
    pub handle: Handle,
}

#[rquickjs::methods]
impl JsElement {
    #[qjs(get, rename = "innerHTML")]
    pub fn get_inner_html(&self) -> String {
        serialize_children(&self.handle)
    }

    #[qjs(set, rename = "innerHTML")]
    pub fn set_inner_html(&self, html: String) {
        let dom = parse_document(RcDom::default(), ParseOpts::default())
            .from_utf8()
            .read_from(&mut html.as_bytes())
            .unwrap();

        let new_children = collect_body_children(&dom.document);

        let mut children = self.handle.children.borrow_mut();
        children.clear();
        for child in new_children {
            child.parent.set(Some(Rc::downgrade(&self.handle)));
            children.push(child);
        }
    }

    #[qjs(get, rename = "textContent")]
    pub fn get_text_content(&self) -> String {
        collect_text_content(&self.handle)
    }

    #[qjs(set, rename = "textContent")]
    pub fn set_text_content(&self, text: String) {
        let mut children = self.handle.children.borrow_mut();
        children.clear();
        let text_node = Rc::new(markup5ever_rcdom::Node {
            parent: std::cell::Cell::new(Some(Rc::downgrade(&self.handle))),
            children: RefCell::new(Vec::new()),
            data: NodeData::Text {
                contents: RefCell::new(text.into()),
            },
        });
        children.push(text_node);
    }

    #[qjs(get, rename = "value")]
    pub fn get_value(&self) -> String {
        get_attr(&self.handle, "value")
    }

    #[qjs(set, rename = "value")]
    pub fn set_value(&self, val: String) {
        set_attr(&self.handle, "value", &val);
    }

    #[qjs(get, rename = "id")]
    pub fn get_id(&self) -> String {
        get_attr(&self.handle, "id")
    }

    #[qjs(get, rename = "className")]
    pub fn get_class_name(&self) -> String {
        get_attr(&self.handle, "class")
    }

    #[qjs(rename = "appendChild")]
    pub fn append_child(&self, child: rquickjs::Class<'_, JsElement>) {
        let child_handle = &child.borrow().handle;
        child_handle.parent.set(Some(Rc::downgrade(&self.handle)));
        self.handle.children.borrow_mut().push(child_handle.clone());
    }

    #[qjs(rename = "removeChild")]
    pub fn remove_child(&self, child: rquickjs::Class<'_, JsElement>) {
        let child_handle = &child.borrow().handle;
        let mut children = self.handle.children.borrow_mut();
        if let Some(pos) = children.iter().position(|h| Rc::ptr_eq(h, child_handle)) {
            children.remove(pos);
            child_handle.parent.set(None);
        }
    }

    #[qjs(rename = "setAttribute")]
    pub fn set_attribute(&self, name: String, value: String) {
        set_attr(&self.handle, &name, &value);
    }

    #[qjs(rename = "getAttribute")]
    pub fn get_attribute(&self, name: String) -> Option<String> {
        let val = get_attr(&self.handle, &name);
        if val.is_empty() {
            // Check if attribute actually exists (vs empty string value)
            if let NodeData::Element { attrs, .. } = &self.handle.data {
                if attrs.borrow().iter().any(|a| a.name.local.as_ref() == name) {
                    return Some(val);
                }
            }
            None
        } else {
            Some(val)
        }
    }

    #[qjs(rename = "click")]
    pub fn click(&self) {
        // Phase 4: dispatch a click event. For now this is a no-op.
    }
}

// --- Free helper functions ---

fn create_element_node(tag_name: &str) -> Handle {
    Rc::new(markup5ever_rcdom::Node {
        parent: std::cell::Cell::new(None),
        children: RefCell::new(Vec::new()),
        data: NodeData::Element {
            name: QualName::new(None, ns!(html), tag_name.into()),
            attrs: RefCell::new(Vec::new()),
            template_contents: RefCell::new(None),
            mathml_annotation_xml_integration_point: false,
        },
    })
}

fn serialize_children(handle: &Handle) -> String {
    let mut output = Vec::new();
    let document: SerializableHandle = handle.clone().into();
    serialize(&mut output, &document, SerializeOpts {
        traversal_scope: TraversalScope::ChildrenOnly(None),
        ..Default::default()
    })
    .unwrap();
    String::from_utf8(output).unwrap()
}

fn clone_subtree(handle: &Handle) -> Handle {
    let children: Vec<Handle> = handle.children.borrow().iter().map(clone_subtree).collect();
    Rc::new(markup5ever_rcdom::Node {
        parent: Cell::new(None),
        children: RefCell::new(children),
        data: handle.data.clone(),
    })
}

fn collect_body_children(handle: &Handle) -> Vec<Handle> {
    let mut acc = Vec::new();
    collect_body_children_recursive(handle, &mut acc);
    acc
}

fn collect_body_children_recursive(handle: &Handle, acc: &mut Vec<Handle>) {
    match &handle.data {
        NodeData::Element { name, .. } if name.local == local_name!("body") => {
            for child in handle.children.borrow().iter() {
                acc.push(clone_subtree(child));
            }
        }
        _ => {
            for child in handle.children.borrow().iter() {
                collect_body_children_recursive(child, acc);
                if !acc.is_empty() {
                    return;
                }
            }
        }
    }
}

fn collect_text_content(handle: &Handle) -> String {
    let mut result = String::new();
    collect_text_content_recursive(handle, &mut result);
    result
}

fn collect_text_content_recursive(handle: &Handle, result: &mut String) {
    if let NodeData::Text { contents } = &handle.data {
        result.push_str(&contents.borrow());
    }
    for child in handle.children.borrow().iter() {
        collect_text_content_recursive(child, result);
    }
}

fn get_attr(handle: &Handle, name: &str) -> String {
    if let NodeData::Element { attrs, .. } = &handle.data {
        for attr in attrs.borrow().iter() {
            if attr.name.local.to_string() == name {
                return attr.value.to_string();
            }
        }
    }
    String::new()
}

fn set_attr(handle: &Handle, name: &str, value: &str) {
    if let NodeData::Element { attrs, .. } = &handle.data {
        let mut attrs = attrs.borrow_mut();
        if let Some(existing) = attrs.iter_mut().find(|a| a.name.local.to_string() == name) {
            existing.value.clear();
            existing.value.push_slice(value);
        } else {
            attrs.push(Attribute {
                name: QualName::new(None, ns!(), name.into()),
                value: value.into(),
            });
        }
    }
}

impl<'js> Trace<'js> for JsDocument {
    fn trace<'a>(&self, _tracer: Tracer<'a, 'js>) {}
}

unsafe impl Send for JsDocument {}
unsafe impl Sync for JsDocument {}

impl<'js> Trace<'js> for JsElement {
    fn trace<'a>(&self, _tracer: Tracer<'a, 'js>) {}
}

unsafe impl Send for JsElement {}
unsafe impl Sync for JsElement {}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_element_node_sets_tag_name() {
        let handle = create_element_node("div");
        match &handle.data {
            NodeData::Element { name, .. } => {
                assert_eq!(name.local.to_string(), "div");
            }
            _ => panic!("expected Element"),
        }
    }

    #[test]
    fn test_create_element_node_has_no_children() {
        let handle = create_element_node("span");
        assert!(handle.children.borrow().is_empty());
    }

    #[test]
    fn test_get_attr_returns_empty_for_non_element() {
        let text_handle = Rc::new(markup5ever_rcdom::Node {
            parent: std::cell::Cell::new(None),
            children: RefCell::new(Vec::new()),
            data: NodeData::Text {
                contents: RefCell::new("hello".into()),
            },
        });
        assert_eq!(get_attr(&text_handle, "id"), "");
    }

    #[test]
    fn test_set_attr_and_get_attr_roundtrip() {
        let handle = create_element_node("div");
        set_attr(&handle, "class", "foo");
        assert_eq!(get_attr(&handle, "class"), "foo");
    }

    #[test]
    fn test_set_attr_overwrites_existing() {
        let handle = create_element_node("div");
        set_attr(&handle, "id", "first");
        set_attr(&handle, "id", "second");
        assert_eq!(get_attr(&handle, "id"), "second");
    }

    #[test]
    fn test_collect_text_content_empty() {
        let handle = create_element_node("div");
        assert_eq!(collect_text_content(&handle), "");
    }

    #[test]
    fn test_collect_text_content_with_text_node() {
        let handle = Rc::new(markup5ever_rcdom::Node {
            parent: std::cell::Cell::new(None),
            children: RefCell::new(Vec::new()),
            data: NodeData::Text {
                contents: RefCell::new("Hello World".into()),
            },
        });
        assert_eq!(collect_text_content(&handle), "Hello World");
    }

    #[test]
    fn test_collect_text_content_nested() {
        let parent = create_element_node("div");
        let child_text = Rc::new(markup5ever_rcdom::Node {
            parent: std::cell::Cell::new(Some(Rc::downgrade(&parent))),
            children: RefCell::new(Vec::new()),
            data: NodeData::Text {
                contents: RefCell::new("nested".into()),
            },
        });
        parent.children.borrow_mut().push(child_text);
        assert_eq!(collect_text_content(&parent), "nested");
    }

    #[test]
    fn test_serialize_children_empty() {
        let handle = create_element_node("div");
        let html = serialize_children(&handle);
        assert_eq!(html, "");
    }

    #[test]
    fn test_serialize_children_with_child() {
        let parent = create_element_node("div");
        let child = create_element_node("span");
        child.parent.set(Some(Rc::downgrade(&parent)));
        parent.children.borrow_mut().push(child);
        let html = serialize_children(&parent);
        assert_eq!(html, "<span></span>");
    }

    #[test]
    fn test_find_by_tag_matches_element() {
        let doc = JsDocument { handle: create_element_node("body") };
        let found = doc.find_by_tag(&doc.handle, "body");
        assert!(found.is_some());
    }

    #[test]
    fn test_find_by_tag_no_match() {
        let doc = JsDocument { handle: create_element_node("div") };
        let found = doc.find_by_tag(&doc.handle, "span");
        assert!(found.is_none());
    }

    #[test]
    fn test_find_by_tag_case_insensitive() {
        let doc = JsDocument { handle: create_element_node("DIV") };
        let found = doc.find_by_tag(&doc.handle, "div");
        assert!(found.is_some());
    }

    #[test]
    fn test_find_by_id_finds_element() {
        let handle = create_element_node("div");
        set_attr(&handle, "id", "my-id");
        let doc = JsDocument { handle: create_element_node("root") };
        doc.handle.children.borrow_mut().push(handle.clone());
        let found = doc.find_by_id(&doc.handle, "my-id");
        assert!(found.is_some());
    }

    #[test]
    fn test_find_by_id_no_match() {
        let doc = JsDocument { handle: create_element_node("div") };
        let found = doc.find_by_id(&doc.handle, "nonexistent");
        assert!(found.is_none());
    }

    #[test]
    fn test_find_all_by_tag_returns_multiple() {
        let parent = create_element_node("ul");
        let child1 = create_element_node("li");
        let child2 = create_element_node("li");
        child1.parent.set(Some(Rc::downgrade(&parent)));
        child2.parent.set(Some(Rc::downgrade(&parent)));
        parent.children.borrow_mut().push(child1);
        parent.children.borrow_mut().push(child2);
        let doc = JsDocument { handle: parent };
        let mut results = Vec::new();
        doc.find_all_by_tag(&doc.handle, "li", &mut results);
        assert_eq!(results.len(), 2);
    }

    #[test]
    fn test_find_all_by_tag_no_matches() {
        let doc = JsDocument { handle: create_element_node("div") };
        let mut results = Vec::new();
        doc.find_all_by_tag(&doc.handle, "span", &mut results);
        assert!(results.is_empty());
    }

    #[test]
    fn test_set_inner_html_clears_and_replaces() {
        let parent = create_element_node("div");
        let elem = JsElement { handle: parent.clone() };
        elem.set_inner_html("<p>hello</p>".into());
        let html = elem.get_inner_html();
        assert_eq!(html, "<p>hello</p>", "unexpected inner html: '{}'", html);
    }

    #[test]
    fn test_set_inner_html_multiple_children() {
        let parent = create_element_node("div");
        let elem = JsElement { handle: parent.clone() };
        elem.set_inner_html("<a></a><b></b>".into());
        assert_eq!(parent.children.borrow().len(), 2);
    }

    #[test]
    fn test_set_text_content_creates_text_node() {
        let parent = create_element_node("div");
        let elem = JsElement { handle: parent.clone() };
        elem.set_text_content("hello".into());
        assert_eq!(elem.get_text_content(), "hello");
    }

    #[test]
    fn test_get_value_returns_attribute() {
        let handle = create_element_node("input");
        set_attr(&handle, "value", "test-val");
        let elem = JsElement { handle };
        assert_eq!(elem.get_value(), "test-val");
    }

    #[test]
    fn test_set_value_updates_attribute() {
        let handle = create_element_node("input");
        let elem = JsElement { handle: handle.clone() };
        elem.set_value("new-val".into());
        assert_eq!(get_attr(&handle, "value"), "new-val");
    }

    #[test]
    fn test_get_id_returns_id_attr() {
        let handle = create_element_node("div");
        set_attr(&handle, "id", "my-div");
        let elem = JsElement { handle };
        assert_eq!(elem.get_id(), "my-div");
    }

    #[test]
    fn test_get_class_name_returns_class_attr() {
        let handle = create_element_node("div");
        set_attr(&handle, "class", "foo bar");
        let elem = JsElement { handle };
        assert_eq!(elem.get_class_name(), "foo bar");
    }
}
