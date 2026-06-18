use html5ever::serialize::{serialize, SerializeOpts, TraversalScope};
use html5ever::tendril::TendrilSink;
use html5ever::{parse_document, ParseOpts, local_name, ns, Attribute, QualName};
use markup5ever_rcdom::{Handle, NodeData, RcDom, SerializableHandle};
use rquickjs::class::{Trace, Tracer};
use rquickjs::Object;
use rquickjs::prelude::Func;
use std::cell::{Cell, RefCell};
use std::collections::HashMap;
use std::rc::Rc;
use std::sync::Mutex;

thread_local! {
    static ACTIVE_ELEMENT: RefCell<Option<Handle>> = const { RefCell::new(None) };
}

#[rquickjs::class]
pub struct JsDocument {
    pub handle: Handle,
}

#[rquickjs::methods]
impl JsDocument {
    #[qjs(get, rename = "title")]
    pub fn get_title(&self) -> String {
        get_title_text(&self.handle)
    }

    #[qjs(set, rename = "title")]
    pub fn set_title(&self, title: String) {
        set_title_text(&self.handle, &title);
    }

    #[qjs(get, rename = "cookie")]
    pub fn get_cookie(&self) -> String {
        let store = cookie_store().lock().unwrap();
        store
            .iter()
            .map(|(k, v)| format!("{}={}", k, v))
            .collect::<Vec<_>>()
            .join("; ")
    }

    #[qjs(set, rename = "cookie")]
    pub fn set_cookie(&self, val: String) {
        if let Some((key, value)) = val.split_once('=') {
            let key = key.trim().to_string();
            let value = value.split(';').next().unwrap_or("").trim().to_string();
            cookie_store().lock().unwrap().insert(key, value);
        }
    }

    #[qjs(rename = "querySelector")]
    pub fn query_selector<'js>(&self, ctx: rquickjs::Ctx<'js>, selector: String) -> Option<rquickjs::Class<'js, JsElement>> {
        let sels = parse_selector_list(&selector).ok()?;
        find_first_match(&self.handle, &sels).map(|h| {
            rquickjs::Class::instance(ctx, JsElement::new(h)).unwrap()
        })
    }

    #[qjs(rename = "querySelectorAll")]
    pub fn query_selector_all<'js>(&self, ctx: rquickjs::Ctx<'js>, selector: String) -> Vec<rquickjs::Class<'js, JsElement>> {
        let sels = match parse_selector_list(&selector) {
            Ok(s) => s,
            Err(_) => return Vec::new(),
        };
        let mut results = Vec::new();
        collect_matches(&self.handle, &sels, &mut results);
        results.into_iter().map(|h| {
            rquickjs::Class::instance(ctx.clone(), JsElement::new(h)).unwrap()
        }).collect()
    }

    #[qjs(rename = "getElementById")]
    pub fn get_element_by_id<'js>(&self, ctx: rquickjs::Ctx<'js>, id: String) -> Option<rquickjs::Class<'js, JsElement>> {
        self.find_by_id(&self.handle, &id).map(|h| {
            rquickjs::Class::instance(ctx, JsElement::new(h)).unwrap()
        })
    }

    #[qjs(get, rename = "body")]
    pub fn get_body<'js>(&self, ctx: rquickjs::Ctx<'js>) -> Option<rquickjs::Class<'js, JsElement>> {
        find_element_by_tag(&self.handle, "body").map(|h| {
            rquickjs::Class::instance(ctx, JsElement::new(h)).unwrap()
        })
    }

    #[qjs(get, rename = "documentElement")]
    pub fn get_document_element<'js>(&self, ctx: rquickjs::Ctx<'js>) -> Option<rquickjs::Class<'js, JsElement>> {
        find_element_by_tag(&self.handle, "html").map(|h| {
            rquickjs::Class::instance(ctx, JsElement::new(h)).unwrap()
        })
    }

    #[qjs(get, rename = "head")]
    pub fn get_head<'js>(&self, ctx: rquickjs::Ctx<'js>) -> Option<rquickjs::Class<'js, JsElement>> {
        find_element_by_tag(&self.handle, "head").map(|h| {
            rquickjs::Class::instance(ctx, JsElement::new(h)).unwrap()
        })
    }

    #[qjs(get, rename = "activeElement")]
    pub fn get_active_element<'js>(&self, ctx: rquickjs::Ctx<'js>) -> Option<rquickjs::Class<'js, JsElement>> {
        get_active_element().map(|h| {
            rquickjs::Class::instance(ctx, JsElement::new(h)).unwrap()
        })
    }

    #[qjs(rename = "createElement")]
    pub fn create_element<'js>(&self, ctx: rquickjs::Ctx<'js>, tag_name: String) -> rquickjs::Class<'js, JsElement> {
        let handle = create_element_node(&tag_name);
        rquickjs::Class::instance(ctx, JsElement::new(handle)).unwrap()
    }

    #[qjs(rename = "createTextNode")]
    pub fn create_text_node<'js>(&self, ctx: rquickjs::Ctx<'js>, text: String) -> rquickjs::Class<'js, JsElement> {
        let handle = Rc::new(markup5ever_rcdom::Node {
            parent: std::cell::Cell::new(None),
            children: RefCell::new(Vec::new()),
            data: NodeData::Text {
                contents: RefCell::new(text.into()),
            },
        });
        rquickjs::Class::instance(ctx, JsElement::new(handle)).unwrap()
    }
}

impl JsDocument {
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
    pub listeners: RefCell<Vec<(String, rquickjs::Persistent<rquickjs::Function<'static>>)>>,
}

impl JsElement {
    fn new(handle: Handle) -> Self {
        JsElement {
            handle,
            listeners: RefCell::new(Vec::new()),
        }
    }
}

fn cookie_store() -> &'static Mutex<HashMap<String, String>> {
    static STORE: std::sync::OnceLock<Mutex<HashMap<String, String>>> = std::sync::OnceLock::new();
    STORE.get_or_init(|| Mutex::new(HashMap::new()))
}

fn set_active_element(h: Handle) {
    ACTIVE_ELEMENT.with(|cell| *cell.borrow_mut() = Some(h));
}

fn clear_active_element() {
    ACTIVE_ELEMENT.with(|cell| *cell.borrow_mut() = None);
}

fn get_active_element() -> Option<Handle> {
    ACTIVE_ELEMENT.with(|cell| cell.borrow().clone())
}

fn find_element_by_tag(handle: &Handle, tag: &str) -> Option<Handle> {
    let tag_lower = tag.to_lowercase();
    for child in handle.children.borrow().iter() {
        if let NodeData::Element { ref name, .. } = child.data {
            if name.local.as_ref() == tag_lower {
                return Some(child.clone());
            }
        }
        if let Some(found) = find_element_by_tag(child, tag) {
            return Some(found);
        }
    }
    None
}

fn find_parent_element(handle: &Handle) -> Option<Handle> {
    let parent = parent_handle(handle)?;
    if matches!(parent.data, NodeData::Element { .. }) {
        Some(parent)
    } else {
        None
    }
}

fn find_prev_element_sibling(handle: &Handle) -> Option<Handle> {
    let parent = parent_handle(handle)?;
    let children = parent.children.borrow();
    let mut found_self = false;
    for child in children.iter().rev() {
        if Rc::ptr_eq(child, handle) {
            found_self = true;
        } else if found_self && matches!(child.data, NodeData::Element { .. }) {
            return Some(child.clone());
        }
    }
    None
}

fn find_next_element_sibling(handle: &Handle) -> Option<Handle> {
    let parent = parent_handle(handle)?;
    let children = parent.children.borrow();
    let mut found_self = false;
    for child in children.iter() {
        if Rc::ptr_eq(child, handle) {
            found_self = true;
        } else if found_self && matches!(child.data, NodeData::Element { .. }) {
            return Some(child.clone());
        }
    }
    None
}

fn create_class_list<'js>(ctx: &rquickjs::Ctx<'js>, element_handle: Handle) -> rquickjs::Result<Object<'js>> {
    let cl = Object::new(ctx.clone())?;

    let h_add = element_handle.clone();
    let _ = cl.set("add", Func::from(move |token: String| {
        let mut current = get_attr(&h_add, "class");
        let tokens: Vec<&str> = current.split_whitespace().collect();
        if !tokens.contains(&token.as_str()) {
            if !current.is_empty() {
                current.push(' ');
            }
            current.push_str(&token);
            set_attr(&h_add, "class", &current);
        }
    }));

    let h_remove = element_handle.clone();
    let _ = cl.set("remove", Func::from(move |token: String| {
        let current = get_attr(&h_remove, "class");
        let tokens: Vec<&str> = current.split_whitespace().filter(|t| *t != token.as_str()).collect();
        set_attr(&h_remove, "class", &tokens.join(" "));
    }));

    let h_toggle = element_handle.clone();
    let _ = cl.set("toggle", Func::from(move |token: String| -> bool {
        let current = get_attr(&h_toggle, "class");
        let tokens: Vec<&str> = current.split_whitespace().collect();
        if tokens.contains(&token.as_str()) {
            let filtered: Vec<&str> = tokens.into_iter().filter(|t| *t != token.as_str()).collect();
            set_attr(&h_toggle, "class", &filtered.join(" "));
            false
        } else {
            let mut updated = current;
            if !updated.is_empty() {
                updated.push(' ');
            }
            updated.push_str(&token);
            set_attr(&h_toggle, "class", &updated);
            true
        }
    }));

    let h_contains = element_handle.clone();
    let _ = cl.set("contains", Func::from(move |token: String| -> bool {
        let current = get_attr(&h_contains, "class");
        current.split_whitespace().any(|t| t == token.as_str())
    }));

    let h_len = element_handle.clone();
    let _ = cl.set("length", Func::from(move || -> usize {
        let current = get_attr(&h_len, "class");
        if current.is_empty() { 0 } else { current.split_whitespace().count() }
    }));

    let h_item = element_handle.clone();
    let _ = cl.set("item", Func::from(move |index: usize| -> Option<String> {
        let current = get_attr(&h_item, "class");
        current.split_whitespace().nth(index).map(String::from)
    }));

    Ok(cl)
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

    #[qjs(get, rename = "tagName")]
    pub fn get_tag_name(&self) -> String {
        if let NodeData::Element { ref name, .. } = self.handle.data {
            name.local.to_uppercase()
        } else {
            String::new()
        }
    }

    #[qjs(rename = "addEventListener")]
    pub fn add_event_listener<'js>(&self, ctx: rquickjs::Ctx<'js>, event_type: String, handler: rquickjs::Function<'js>) {
        let persistent = rquickjs::Persistent::save(&ctx, handler);
        self.listeners.borrow_mut().push((event_type, persistent));
    }

    #[qjs(rename = "removeEventListener")]
    pub fn remove_event_listener<'js>(&self, ctx: rquickjs::Ctx<'js>, event_type: String, handler: rquickjs::Function<'js>) {
        let persistent = rquickjs::Persistent::save(&ctx, handler);
        self.listeners.borrow_mut().retain(|(t, h)| t != &event_type || h != &persistent);
    }

    #[qjs(rename = "dispatchEvent")]
    pub fn dispatch_event<'js>(&self, ctx: rquickjs::Ctx<'js>, event_type: String) -> bool {
        let handlers: Vec<rquickjs::Persistent<rquickjs::Function<'static>>> = self
            .listeners
            .borrow()
            .iter()
            .filter(|(t, _)| t == &event_type)
            .map(|(_, h)| h.clone())
            .collect();

        if handlers.is_empty() {
            return false;
        }

        let event = match rquickjs::Object::new(ctx.clone()) {
            Ok(obj) => obj,
            Err(_) => return false,
        };
        let _ = event.set("type", event_type.as_str());
        let _ = event.set("defaultPrevented", false);
        let _ = event.set("preventDefault", rquickjs::Function::new(ctx.clone(), {
            let ev = event.clone();
            move || { let _ = ev.set("defaultPrevented", true); }
        }));
        let _ = event.set("stopPropagation", rquickjs::Function::new(ctx.clone(), || {}));
        let el_ref = rquickjs::Class::instance(ctx.clone(), JsElement::new(self.handle.clone())).unwrap();
        let _ = event.set("target", el_ref.clone());
        let _ = event.set("currentTarget", el_ref);

        for handler in handlers {
            if let Ok(f) = handler.restore(&ctx) {
                let _ = f.call::<_, ()>((event.clone(),));
            }
        }

        let cancelled = event.get::<_, bool>("defaultPrevented").unwrap_or(false);
        !cancelled
    }

    #[qjs(rename = "click")]
    pub fn click<'js>(&self, ctx: rquickjs::Ctx<'js>) {
        let _ = self.dispatch_event(ctx, "click".to_string());
    }

    #[qjs(rename = "submit")]
    pub fn submit<'js>(&self, ctx: rquickjs::Ctx<'js>) {
        let _ = self.dispatch_event(ctx, "submit".to_string());
    }

    #[qjs(rename = "focus")]
    pub fn focus<'js>(&self, ctx: rquickjs::Ctx<'js>) {
        set_active_element(self.handle.clone());
        let _ = self.dispatch_event(ctx, "focus".to_string());
    }

    #[qjs(rename = "blur")]
    pub fn blur<'js>(&self, ctx: rquickjs::Ctx<'js>) {
        clear_active_element();
        let _ = self.dispatch_event(ctx, "blur".to_string());
    }

    #[qjs(rename = "change")]
    pub fn change<'js>(&self, ctx: rquickjs::Ctx<'js>) {
        let _ = self.dispatch_event(ctx, "change".to_string());
    }

    #[qjs(rename = "input")]
    pub fn input<'js>(&self, ctx: rquickjs::Ctx<'js>) {
        let _ = self.dispatch_event(ctx, "input".to_string());
    }

    #[qjs(get, rename = "classList")]
    pub fn get_class_list<'js>(&self, ctx: rquickjs::Ctx<'js>) -> rquickjs::Result<Object<'js>> {
        create_class_list(&ctx, self.handle.clone())
    }

    #[qjs(rename = "remove")]
    pub fn remove(&self) {
        if let Some(parent) = parent_handle(&self.handle) {
            let mut children = parent.children.borrow_mut();
            if let Some(pos) = children.iter().position(|h| Rc::ptr_eq(h, &self.handle)) {
                children.remove(pos);
                self.handle.parent.set(None);
            }
        }
    }

    #[qjs(get, rename = "parentElement")]
    pub fn get_parent_element<'js>(&self, ctx: rquickjs::Ctx<'js>) -> Option<rquickjs::Class<'js, JsElement>> {
        find_parent_element(&self.handle).map(|h| rquickjs::Class::instance(ctx, JsElement::new(h)).unwrap())
    }

    #[qjs(get, rename = "children")]
    pub fn get_children<'js>(&self, ctx: rquickjs::Ctx<'js>) -> Vec<rquickjs::Class<'js, JsElement>> {
        self.handle
            .children
            .borrow()
            .iter()
            .filter(|h| matches!(h.data, NodeData::Element { .. }))
            .map(|h| rquickjs::Class::instance(ctx.clone(), JsElement::new(h.clone())).unwrap())
            .collect()
    }

    #[qjs(get, rename = "firstChild")]
    pub fn get_first_child<'js>(&self, ctx: rquickjs::Ctx<'js>) -> Option<rquickjs::Class<'js, JsElement>> {
        self.handle
            .children
            .borrow()
            .iter()
            .find(|h| matches!(h.data, NodeData::Element { .. }))
            .map(|h| rquickjs::Class::instance(ctx, JsElement::new(h.clone())).unwrap())
    }

    #[qjs(get, rename = "nextSibling")]
    pub fn get_next_sibling<'js>(&self, ctx: rquickjs::Ctx<'js>) -> Option<rquickjs::Class<'js, JsElement>> {
        find_next_element_sibling(&self.handle)
            .map(|h| rquickjs::Class::instance(ctx, JsElement::new(h)).unwrap())
    }

    #[qjs(get, rename = "previousSibling")]
    pub fn get_previous_sibling<'js>(&self, ctx: rquickjs::Ctx<'js>) -> Option<rquickjs::Class<'js, JsElement>> {
        find_prev_element_sibling(&self.handle)
            .map(|h| rquickjs::Class::instance(ctx, JsElement::new(h)).unwrap())
    }

    #[qjs(rename = "closest")]
    pub fn closest<'js>(&self, ctx: rquickjs::Ctx<'js>, selector: String) -> Option<rquickjs::Class<'js, JsElement>> {
        let sels = parse_selector_list(&selector).ok()?;
        if sels.is_empty() {
            return None;
        }
        let mut current = Some(self.handle.clone());
        while let Some(el) = current {
            if sels.iter().any(|sel| matches_selector(&el, sel)) {
                return Some(rquickjs::Class::instance(ctx, JsElement::new(el)).unwrap());
            }
            current = parent_handle(&el);
        }
        None
    }

    #[qjs(rename = "matches")]
    pub fn matches(&self, selector: String) -> bool {
        let sels = match parse_selector_list(&selector) {
            Ok(s) => s,
            Err(_) => return false,
        };
        sels.iter().any(|sel| matches_selector(&self.handle, sel))
    }

    #[qjs(rename = "hasAttribute")]
    pub fn has_attribute(&self, name: String) -> bool {
        if let NodeData::Element { attrs, .. } = &self.handle.data {
            attrs.borrow().iter().any(|a| a.name.local.as_ref() == name)
        } else {
            false
        }
    }

    #[qjs(rename = "getBoundingClientRect")]
    pub fn get_bounding_client_rect<'js>(&self, ctx: rquickjs::Ctx<'js>) -> rquickjs::Result<Object<'js>> {
        let rect = Object::new(ctx)?;
        rect.set("x", 0)?; rect.set("y", 0)?;
        rect.set("top", 0)?; rect.set("right", 0)?;
        rect.set("bottom", 0)?; rect.set("left", 0)?;
        rect.set("width", 0)?; rect.set("height", 0)?;
        Ok(rect)
    }

    #[qjs(rename = "insertBefore")]
    pub fn insert_before(&self, new_child: rquickjs::Class<'_, JsElement>, ref_child: Option<rquickjs::Class<'_, JsElement>>) {
        let new_handle = &new_child.borrow().handle;
        let mut children = self.handle.children.borrow_mut();
        new_handle.parent.set(Some(Rc::downgrade(&self.handle)));
        match ref_child {
            Some(ref_child) => {
                let ref_handle = &ref_child.borrow().handle;
                if let Some(pos) = children.iter().position(|h| Rc::ptr_eq(h, ref_handle)) {
                    children.insert(pos, new_handle.clone());
                } else {
                    children.push(new_handle.clone());
                }
            }
            None => {
                children.push(new_handle.clone());
            }
        }
    }

    #[qjs(get, rename = "style")]
    pub fn get_style<'js>(&self, ctx: rquickjs::Ctx<'js>) -> rquickjs::Result<Object<'js>> {
        let el = rquickjs::Class::instance(ctx.clone(), JsElement::new(self.handle.clone())).unwrap();
        let js = r#"
(function(el) {
    return new Proxy({}, {
        get: function(target, prop) {
            if (prop === 'setProperty') {
                return function(name, value) {
                    var cssProp = name.replace(/[A-Z]/g, '-$&').toLowerCase();
                    el.setAttribute('style', (el.getAttribute('style') || '') + cssProp + ': ' + value + ';');
                };
            }
            if (typeof prop === 'string' && prop !== 'then' && prop !== 'toJSON') {
                var style = el.getAttribute('style') || '';
                var regex = new RegExp(prop.replace(/[A-Z]/g, '-$&').toLowerCase() + '\\s*:\\s*([^;]+)');
                var match = style.match(regex);
                return match ? match[1].trim() : '';
            }
            return target[prop];
        },
        set: function(target, prop, value) {
            if (typeof prop === 'string') {
                var cssProp = prop.replace(/[A-Z]/g, '-$&').toLowerCase();
                el.setAttribute('style', (el.getAttribute('style') || '') + cssProp + ': ' + value + ';');
            }
            return true;
        }
    });
})
"#;
        let func = ctx.eval::<rquickjs::Function, _>(js)?;
        func.call::<_, Object>((el,))
    }

    #[qjs(get, rename = "dataset")]
    pub fn get_dataset<'js>(&self, ctx: rquickjs::Ctx<'js>) -> rquickjs::Result<Object<'js>> {
        let el = rquickjs::Class::instance(ctx.clone(), JsElement::new(self.handle.clone())).unwrap();
        let js = r#"
(function(el) {
    var cache = {};
    return new Proxy(cache, {
        get: function(target, prop) {
            if (typeof prop === 'string') {
                var attr = 'data-' + prop.replace(/[A-Z]/g, '-$&').toLowerCase();
                var val = el.getAttribute(attr);
                return val !== null ? val : undefined;
            }
            return target[prop];
        },
        set: function(target, prop, value) {
            if (typeof prop === 'string') {
                var attr = 'data-' + prop.replace(/[A-Z]/g, '-$&').toLowerCase();
                if (value === null || value === undefined) {
                    el.setAttribute(attr, '');
                } else {
                    el.setAttribute(attr, String(value));
                }
                target[prop] = value;
            }
            return true;
        }
    });
})
"#;
        let func = ctx.eval::<rquickjs::Function, _>(js)?;
        func.call::<_, Object>((el,))
    }

    #[qjs(rename = "querySelector")]
    pub fn query_selector_element<'js>(&self, ctx: rquickjs::Ctx<'js>, selector: String) -> Option<rquickjs::Class<'js, JsElement>> {
        let sels = parse_selector_list(&selector).ok()?;
        find_first_match(&self.handle, &sels).map(|h| {
            rquickjs::Class::instance(ctx, JsElement::new(h)).unwrap()
        })
    }

    #[qjs(rename = "querySelectorAll")]
    pub fn query_selector_all_element<'js>(&self, ctx: rquickjs::Ctx<'js>, selector: String) -> Vec<rquickjs::Class<'js, JsElement>> {
        let sels = match parse_selector_list(&selector) {
            Ok(s) => s,
            Err(_) => return Vec::new(),
        };
        let mut results = Vec::new();
        collect_matches(&self.handle, &sels, &mut results);
        results.into_iter().map(|h| {
            rquickjs::Class::instance(ctx.clone(), JsElement::new(h)).unwrap()
        }).collect()
    }

    #[qjs(get, rename = "src")]
    pub fn get_src(&self) -> String {
        get_attr(&self.handle, "src")
    }

    #[qjs(set, rename = "src")]
    pub fn set_src(&self, val: String) {
        set_attr(&self.handle, "src", &val);
    }

    #[qjs(rename = "scrollIntoView")]
    pub fn scroll_into_view(&self) {
        // No-op for headless browser
    }
}

// --- CSS Selector Engine ---

#[derive(Debug, Clone)]
enum SimpleSelector {
    Universal,
    Tag(String),
    Class(String),
    Id(String),
    AttrExists(String),
    AttrEquals(String, String),
    AttrIncludes { name: String, value: String },
}

#[derive(Debug, Clone)]
struct Selector {
    simples: Vec<SimpleSelector>,
}

#[derive(Debug, Clone)]
enum Combinator {
    Descendant,
    Child,
}

#[derive(Debug, Clone)]
struct ComplexSelector {
    left: Box<SelectorOrComplex>,
    combinator: Combinator,
    right: Selector,
}

#[derive(Debug, Clone)]
enum SelectorOrComplex {
    Simple(Selector),
    Complex(Box<ComplexSelector>),
}

fn parse_selector_list(input: &str) -> Result<Vec<SelectorOrComplex>, String> {
    let mut results = Vec::new();
    for part in input.split(',') {
        let part = part.trim();
        if !part.is_empty() {
            results.push(parse_selector(part)?);
        }
    }
    if results.is_empty() {
        return Err("empty selector".into());
    }
    Ok(results)
}

fn parse_selector(input: &str) -> Result<SelectorOrComplex, String> {
    let parts = split_by_combinator(input)?;
    if parts.is_empty() {
        return Err("empty compound".into());
    }

    let mut iter = parts.into_iter().peekable();
    let mut current = SelectorOrComplex::Simple(parse_compound(&iter.next().unwrap())?);

    while iter.peek().is_some() {
        let comb_raw = iter.next().unwrap();
        let comb = if comb_raw == ">" {
            Combinator::Child
        } else {
            Combinator::Descendant
        };
        let right = parse_compound(&iter.next().unwrap())?;
        current = SelectorOrComplex::Complex(Box::new(ComplexSelector {
            left: Box::new(current),
            combinator: comb,
            right,
        }));
    }

    Ok(current)
}

fn split_by_combinator(input: &str) -> Result<Vec<String>, String> {
    let mut result = Vec::new();
    let mut buf = String::new();
    let mut chars = input.chars().peekable();
    let mut in_bracket: i32 = 0;

    while let Some(ch) = chars.next() {
        match ch {
            '[' => {
                in_bracket += 1;
                buf.push(ch);
            }
            ']' => {
                in_bracket = in_bracket.saturating_sub(1);
                buf.push(ch);
            }
            '>' if in_bracket == 0 => {
                let trimmed = buf.trim().to_string();
                if !trimmed.is_empty() {
                    result.push(trimmed);
                }
                result.push(">".to_string());
                buf.clear();
            }
            ' ' | '\t' | '\n' if in_bracket == 0 => {
                if !buf.trim().is_empty() {
                    let trimmed = buf.trim().to_string();
                    buf.clear();
                    // Look ahead for '>' or more whitespace
                    let mut lookahead = chars.clone();
                    let next = lookahead.next();
                    if next == Some('>') {
                        result.push(trimmed);
                        result.push(">".to_string());
                        chars = lookahead;
                    } else {
                        result.push(trimmed);
                        result.push(" ".to_string());
                    }
                }
            }
            _ => buf.push(ch),
        }
    }

    let trimmed = buf.trim().to_string();
    if !trimmed.is_empty() {
        result.push(trimmed);
    }

    // Collapse whitespace combinators: remove consecutive spaces
    let mut collapsed = Vec::new();
    let mut prev_was_space = false;
    for item in &result {
        if item == " " {
            if !prev_was_space {
                collapsed.push(" ".to_string());
                prev_was_space = true;
            }
        } else {
            collapsed.push(item.clone());
            prev_was_space = false;
        }
    }

    Ok(collapsed)
}

fn parse_compound(input: &str) -> Result<Selector, String> {
    let input = input.trim();
    let mut simples = Vec::new();
    let mut rest = input;

    while !rest.is_empty() {
        rest = rest.trim_start();
        if rest.is_empty() {
            break;
        }

        let (simple, consumed) = parse_simple(rest)?;
        simples.push(simple);
        rest = consumed;
    }

    if simples.is_empty() {
        return Err(format!("invalid selector: '{}'", input));
    }

    Ok(Selector { simples })
}

fn parse_simple(input: &str) -> Result<(SimpleSelector, &str), String> {
    let input = input.trim_start();
    if input.is_empty() {
        return Err("unexpected end of selector".into());
    }

    let ch = input.chars().next().unwrap();
    match ch {
        '*' => {
            Ok((SimpleSelector::Universal, &input[1..]))
        }
        '.' => {
            let after_dot = &input[1..];
            let len = find_ident_len(after_dot);
            if len == 0 {
                return Err("expected class name after '.'".into());
            }
            let class_name = &after_dot[..len];
            Ok((SimpleSelector::Class(class_name.to_string()), &after_dot[len..]))
        }
        '#' => {
            let after_hash = &input[1..];
            let len = find_ident_len(after_hash);
            if len == 0 {
                return Err("expected id after '#'".into());
            }
            let id = &after_hash[..len];
            Ok((SimpleSelector::Id(id.to_string()), &after_hash[len..]))
        }
        '[' => {
            parse_attr_selector(input)
        }
        'a'..='z' | 'A'..='Z' | '-' | '_' => {
            let len = find_ident_len(input);
            let tag = &input[..len];
            Ok((SimpleSelector::Tag(tag.to_string()), &input[len..]))
        }
        c => {
            Err(format!("unexpected character '{}' in selector", c))
        }
    }
}

fn parse_attr_selector(input: &str) -> Result<(SimpleSelector, &str), String> {
    let rest = input.strip_prefix('[').ok_or("expected '['")?;
    let rest = rest.trim_start();
    let name_len = find_ident_len(rest);
    if name_len == 0 {
        return Err("expected attribute name".into());
    }
    let name = rest[..name_len].to_string();
    let mut rest = &rest[name_len..];

    rest = rest.trim_start();

    if let Some(remaining) = rest.strip_prefix(']') {
        return Ok((SimpleSelector::AttrExists(name), remaining));
    }

    if rest.starts_with('=') {
        rest = &rest[1..];
    } else if rest.starts_with("~=") {
        rest = &rest[2..];
        let (value, after_val) = parse_attr_value(rest)?;
        let after_val = after_val.trim_start();
        if !after_val.starts_with(']') {
            return Err("expected ']' to close attribute selector".into());
        }
        return Ok((SimpleSelector::AttrIncludes { name, value }, &after_val[1..]));
    } else {
        return Err(format!("expected ']' or '=' in attribute selector, got '{}'", &rest[..rest.len().min(5)]));
    }

    let (value, rest) = parse_attr_value(rest)?;
    let rest = rest.trim_start();
    if !rest.starts_with(']') {
        return Err("expected ']' to close attribute selector".to_string());
    }

    Ok((SimpleSelector::AttrEquals(name, value), &rest[1..]))
}

fn parse_attr_value(input: &str) -> Result<(String, &str), String> {
    let input = input.trim_start();
    if input.starts_with('"') || input.starts_with('\'') {
        let quote = input.chars().next().unwrap();
        let mut end = None;
        for (i, c) in input[1..].char_indices() {
            if c == quote {
                end = Some(i + 1);
                break;
            }
        }
        match end {
            Some(i) => Ok((input[1..i].to_string(), &input[i+1..])),
            None => Err("unterminated string in attribute selector".into()),
        }
    } else {
        let len = find_ident_len(input);
        if len == 0 {
            return Err("expected attribute value".into());
        }
        Ok((input[..len].to_string(), &input[len..]))
    }
}

fn find_ident_len(s: &str) -> usize {
    let mut len = 0;
    for (i, c) in s.char_indices() {
        match c {
            'a'..='z' | 'A'..='Z' | '0'..='9' | '-' | '_' => len = i + 1,
            _ => break,
        }
    }
    len
}

fn parent_handle(el: &Handle) -> Option<Handle> {
    let weak = el.parent.take();
    let result = weak.as_ref().and_then(|w| w.upgrade());
    el.parent.set(weak);
    result
}

fn matches_selector(el: &Handle, sel: &SelectorOrComplex) -> bool {
    match sel {
        SelectorOrComplex::Simple(compound) => matches_compound(el, compound),
        SelectorOrComplex::Complex(complex) => {
            if !matches_compound(el, &complex.right) {
                return false;
            }
            match complex.combinator {
                Combinator::Descendant => {
                    let mut current = parent_handle(el);
                    while let Some(parent) = current {
                        if matches_selector(&parent, &complex.left) {
                            return true;
                        }
                        current = parent_handle(&parent);
                    }
                    false
                }
                Combinator::Child => parent_handle(el)
                    .is_some_and(|parent| matches_selector(&parent, &complex.left)),
            }
        }
    }
}

fn matches_compound(el: &Handle, compound: &Selector) -> bool {
    let node = el;
    for simple in &compound.simples {
        if !matches_simple(node, simple) {
            return false;
        }
    }
    true
}

fn matches_simple(el: &Handle, simple: &SimpleSelector) -> bool {
    let node = el;
    match &node.data {
        NodeData::Element { name, attrs, .. } => {
            let attrs = attrs.borrow();
            match simple {
                SimpleSelector::Universal => true,
                SimpleSelector::Tag(tag) => name.local.as_ref().eq_ignore_ascii_case(tag),
                SimpleSelector::Class(class_name) => {
                    attrs.iter().any(|a| {
                        a.name.local.as_ref() == "class"
                            && a.value
                                .to_string()
                                .split_whitespace()
                                .any(|c| c == class_name.as_str())
                    })
                }
                SimpleSelector::Id(id) => {
                    attrs.iter().any(|a| {
                        a.name.local.as_ref() == "id" && a.value.as_ref() == id.as_str()
                    })
                }
                SimpleSelector::AttrExists(name) => {
                    attrs.iter().any(|a| a.name.local.as_ref() == name.as_str())
                }
                SimpleSelector::AttrEquals(name, value) => {
                    attrs.iter().any(|a| {
                        a.name.local.as_ref() == name.as_str() && a.value.as_ref() == value.as_str()
                    })
                }
                SimpleSelector::AttrIncludes { name, value } => {
                    attrs.iter().any(|a| {
                        a.name.local.as_ref() == name.as_str()
                            && a.value
                                .to_string()
                                .split_whitespace()
                                .any(|v| v == value.as_str())
                    })
                }
            }
        }
        _ => false,
    }
}

fn collect_matches(root: &Handle, sels: &[SelectorOrComplex], results: &mut Vec<Handle>) {
    if let NodeData::Element { .. } = &root.data {
        for sel in sels {
            if matches_selector(root, sel) {
                results.push(root.clone());
                break;
            }
        }
    }
    for child in root.children.borrow().iter() {
        collect_matches(child, sels, results);
    }
}

fn find_first_match(root: &Handle, sels: &[SelectorOrComplex]) -> Option<Handle> {
    if let NodeData::Element { .. } = &root.data {
        for sel in sels {
            if matches_selector(root, sel) {
                return Some(root.clone());
            }
        }
    }
    for child in root.children.borrow().iter() {
        if let Some(found) = find_first_match(child, sels) {
            return Some(found);
        }
    }
    None
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

fn get_title_text(handle: &Handle) -> String {
    if let NodeData::Element { name, .. } = &handle.data {
        if name.local == local_name!("title") {
            return collect_text_content(handle);
        }
    }
    for child in handle.children.borrow().iter() {
        let result = get_title_text(child);
        if !result.is_empty() {
            return result;
        }
    }
    String::new()
}

fn set_title_text(handle: &Handle, title: &str) {
    if let NodeData::Element { name, .. } = &handle.data {
        if name.local == local_name!("title") {
            let mut children = handle.children.borrow_mut();
            children.clear();
            let text_node = Rc::new(markup5ever_rcdom::Node {
                parent: std::cell::Cell::new(Some(Rc::downgrade(handle))),
                children: RefCell::new(Vec::new()),
                data: NodeData::Text {
                    contents: RefCell::new(title.into()),
                },
            });
            children.push(text_node);
            return;
        }
    }
    for child in handle.children.borrow().iter() {
        set_title_text(child, title);
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
    fn test_css_selector_tag_match() {
        let handle = create_element_node("body");
        let sels = parse_selector_list("body").unwrap();
        let found = find_first_match(&handle, &sels);
        assert!(found.is_some());
    }

    #[test]
    fn test_css_selector_tag_no_match() {
        let handle = create_element_node("div");
        let sels = parse_selector_list("span").unwrap();
        let found = find_first_match(&handle, &sels);
        assert!(found.is_none());
    }

    #[test]
    fn test_css_selector_tag_case_insensitive() {
        let handle = create_element_node("DIV");
        let sels = parse_selector_list("div").unwrap();
        let found = find_first_match(&handle, &sels);
        assert!(found.is_some());
    }

    #[test]
    fn test_css_selector_id() {
        let handle = create_element_node("div");
        set_attr(&handle, "id", "my-id");
        let sels = parse_selector_list("#my-id").unwrap();
        let found = find_first_match(&handle, &sels);
        assert!(found.is_some());
    }

    #[test]
    fn test_css_selector_class() {
        let handle = create_element_node("div");
        set_attr(&handle, "class", "foo");
        let sels = parse_selector_list(".foo").unwrap();
        let found = find_first_match(&handle, &sels);
        assert!(found.is_some());
    }

    #[test]
    fn test_css_selector_class_no_match() {
        let handle = create_element_node("div");
        set_attr(&handle, "class", "bar");
        let sels = parse_selector_list(".foo").unwrap();
        assert!(find_first_match(&handle, &sels).is_none());
    }

    #[test]
    fn test_css_selector_compound() {
        let handle = create_element_node("div");
        set_attr(&handle, "id", "x");
        set_attr(&handle, "class", "y");
        let sels = parse_selector_list("div#x.y").unwrap();
        assert!(find_first_match(&handle, &sels).is_some());
    }

    #[test]
    fn test_css_selector_descendant() {
        let parent = create_element_node("div");
        let child = create_element_node("span");
        child.parent.set(Some(Rc::downgrade(&parent)));
        parent.children.borrow_mut().push(child.clone());
        let sels = parse_selector_list("div span").unwrap();
        assert!(find_first_match(&child, &sels).is_some());
    }

    #[test]
    fn test_css_selector_child() {
        let parent = create_element_node("div");
        let child = create_element_node("span");
        child.parent.set(Some(Rc::downgrade(&parent)));
        parent.children.borrow_mut().push(child.clone());
        let sels = parse_selector_list("div > span").unwrap();
        assert!(find_first_match(&child, &sels).is_some());
    }

    #[test]
    fn test_css_selector_child_no_match_grandparent() {
        let grandparent = create_element_node("div");
        let parent = create_element_node("section");
        let child = create_element_node("span");
        parent.parent.set(Some(Rc::downgrade(&grandparent)));
        child.parent.set(Some(Rc::downgrade(&parent)));
        grandparent.children.borrow_mut().push(parent.clone());
        parent.children.borrow_mut().push(child.clone());
        // div > span should NOT match since span's parent is section, not div
        let sels = parse_selector_list("div > span").unwrap();
        assert!(find_first_match(&child, &sels).is_none());
    }

    #[test]
    fn test_css_selector_list() {
        let h1 = create_element_node("h1");
        let h2 = create_element_node("h2");
        let sels = parse_selector_list("h1, h2").unwrap();
        assert!(find_first_match(&h1, &sels).is_some());
        assert!(find_first_match(&h2, &sels).is_some());
    }

    #[test]
    fn test_css_selector_attr_exists() {
        let handle = create_element_node("input");
        set_attr(&handle, "disabled", "");
        let sels = parse_selector_list("[disabled]").unwrap();
        assert!(find_first_match(&handle, &sels).is_some());
    }

    #[test]
    fn test_css_selector_attr_equals() {
        let handle = create_element_node("input");
        set_attr(&handle, "type", "text");
        let sels = parse_selector_list("[type=text]").unwrap();
        assert!(find_first_match(&handle, &sels).is_some());
    }

    #[test]
    fn test_css_selector_attr_includes() {
        let handle = create_element_node("div");
        set_attr(&handle, "class", "foo bar baz");
        let sels = parse_selector_list("[class~=bar]").unwrap();
        assert!(find_first_match(&handle, &sels).is_some());
    }

    #[test]
    fn test_css_selector_collect_matches() {
        let ul = create_element_node("ul");
        let li1 = create_element_node("li");
        let li2 = create_element_node("li");
        li1.parent.set(Some(Rc::downgrade(&ul)));
        li2.parent.set(Some(Rc::downgrade(&ul)));
        ul.children.borrow_mut().push(li1.clone());
        ul.children.borrow_mut().push(li2.clone());
        let sels = parse_selector_list("li").unwrap();
        let mut results = Vec::new();
        collect_matches(&ul, &sels, &mut results);
        assert_eq!(results.len(), 2);
    }

    #[test]
    fn test_set_inner_html_clears_and_replaces() {
        let parent = create_element_node("div");
        let elem = JsElement::new(parent.clone());
        elem.set_inner_html("<p>hello</p>".into());
        let html = elem.get_inner_html();
        assert_eq!(html, "<p>hello</p>", "unexpected inner html: '{}'", html);
    }

    #[test]
    fn test_set_inner_html_multiple_children() {
        let parent = create_element_node("div");
        let elem = JsElement::new(parent.clone());
        elem.set_inner_html("<a></a><b></b>".into());
        assert_eq!(parent.children.borrow().len(), 2);
    }

    #[test]
    fn test_set_text_content_creates_text_node() {
        let parent = create_element_node("div");
        let elem = JsElement::new(parent.clone());
        elem.set_text_content("hello".into());
        assert_eq!(elem.get_text_content(), "hello");
    }

    #[test]
    fn test_get_value_returns_attribute() {
        let handle = create_element_node("input");
        set_attr(&handle, "value", "test-val");
        let elem = JsElement::new(handle);
        assert_eq!(elem.get_value(), "test-val");
    }

    #[test]
    fn test_set_value_updates_attribute() {
        let handle = create_element_node("input");
        let elem = JsElement::new(handle.clone());
        elem.set_value("new-val".into());
        assert_eq!(get_attr(&handle, "value"), "new-val");
    }

    #[test]
    fn test_get_id_returns_id_attr() {
        let handle = create_element_node("div");
        set_attr(&handle, "id", "my-div");
        let elem = JsElement::new(handle);
        assert_eq!(elem.get_id(), "my-div");
    }

    #[test]
    fn test_get_class_name_returns_class_attr() {
        let handle = create_element_node("div");
        set_attr(&handle, "class", "foo bar");
        let elem = JsElement::new(handle);
        assert_eq!(elem.get_class_name(), "foo bar");
    }
}
