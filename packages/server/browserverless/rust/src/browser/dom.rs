use html5ever::serialize::{serialize, SerializeOpts, TraversalScope};
use html5ever::tendril::TendrilSink;
use html5ever::{parse_document, ParseOpts, local_name};
use markup5ever_rcdom::{Handle, NodeData, RcDom, SerializableHandle};
use rquickjs::class::{Trace, Tracer};

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

    #[qjs(rename = "getElementById")]
    pub fn get_element_by_id<'js>(&self, ctx: rquickjs::Ctx<'js>, id: String) -> Option<rquickjs::Class<'js, JsElement>> {
        self.find_by_id(&self.handle, &id).map(|h| {
            rquickjs::Class::instance(ctx, JsElement { handle: h }).unwrap()
        })
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
        let mut output = Vec::new();
        let document: SerializableHandle = self.handle.clone().into();
        serialize(&mut output, &document, SerializeOpts {
            traversal_scope: TraversalScope::ChildrenOnly(None),
            ..Default::default()
        })
        .unwrap();

        String::from_utf8(output).unwrap()
    }

    #[qjs(set, rename = "innerHTML")]
    pub fn set_inner_html(&self, html: String) {
        let dom = parse_document(RcDom::default(), ParseOpts::default())
            .from_utf8()
            .read_from(&mut html.as_bytes())
            .unwrap();
        
        let mut new_children = Vec::new();
        self.collect_body_children(&dom.document, &mut new_children);

        let mut children = self.handle.children.borrow_mut();
        children.clear();
        for child in new_children {
            children.push(child);
        }
    }
}

impl JsElement {
    fn collect_body_children(&self, handle: &Handle, acc: &mut Vec<Handle>) {
        match &handle.data {
            NodeData::Element { name, .. } if name.local == local_name!("body") => {
                for child in handle.children.borrow().iter() {
                    acc.push(child.clone());
                }
            }
            _ => {
                for child in handle.children.borrow().iter() {
                    self.collect_body_children(child, acc);
                    if !acc.is_empty() {
                        return;
                    }
                }
            }
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
