use boa_engine::object::{FunctionObjectBuilder, ObjectInitializer};
use boa_engine::property::Attribute;
use boa_engine::{js_string, Context, JsError, JsNativeError, JsResult, JsValue, NativeFunction};
use html5ever::serialize::{serialize, SerializeOpts, TraversalScope};
use html5ever::tendril::TendrilSink;
use html5ever::{local_name, parse_document, ParseOpts, QualName};
use markup5ever_rcdom::{Handle, NodeData, RcDom, SerializableHandle};
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
use std::sync::atomic::{AtomicUsize, Ordering};

thread_local! {
    static DOM_NODES: RefCell<HashMap<usize, Handle>> = RefCell::new(HashMap::new());
    static PENDING_SCRIPTS: RefCell<Vec<String>> = const { RefCell::new(Vec::new()) };
}

pub fn drain_pending_scripts() -> Vec<String> {
    PENDING_SCRIPTS.with(|s| s.borrow_mut().drain(..).collect())
}

fn get_handle(id: usize) -> Option<Handle> {
    DOM_NODES.with(|nodes| nodes.borrow().get(&id).cloned())
}

static NODE_ID: AtomicUsize = AtomicUsize::new(1);

fn handle_to_id(handle: &Handle) -> usize {
    DOM_NODES.with(|nodes| {
        for (&id, h) in nodes.borrow().iter() {
            if Rc::ptr_eq(h, handle) {
                return id;
            }
        }
        let id = NODE_ID.fetch_add(1, Ordering::Relaxed);
        nodes.borrow_mut().insert(id, handle.clone());
        id
    })
}

fn get_attr_raw(attrs: &RefCell<Vec<html5ever::Attribute>>, name: &str) -> Option<String> {
    for attr in attrs.borrow().iter() {
        if attr.name.local.to_string() == name {
            return Some(attr.value.to_string());
        }
    }
    None
}

fn set_attr_raw(attrs: &RefCell<Vec<html5ever::Attribute>>, name: &str, value: &str) {
    let mut attrs = attrs.borrow_mut();
    if let Some(existing) = attrs.iter_mut().find(|a| a.name.local.to_string() == name) {
        existing.value.clear();
        existing.value.push_slice(value);
    } else {
        attrs.push(html5ever::Attribute {
            name: QualName::new(None, html5ever::ns!(), name.into()),
            value: value.into(),
        });
    }
}

fn parse_html_fragment(html: &str) -> Vec<Handle> {
    let dom = parse_document(RcDom::default(), ParseOpts::default())
        .from_utf8()
        .read_from(&mut html.as_bytes());
    let dom = match dom {
        Ok(d) => d,
        Err(_) => return Vec::new(),
    };
    let mut children = Vec::new();
    collect_element_children(&dom.document, &mut children);
    if children.len() == 1 {
        if let NodeData::Element { name, .. } = &children[0].data {
            if name.local == local_name!("html") {
                let mut body_children = Vec::new();
                collect_element_children(&children[0], &mut body_children);
                let mut real = Vec::new();
                for child in body_children {
                    if let NodeData::Element { name, .. } = &child.data {
                        if name.local == local_name!("body") || name.local == local_name!("head") {
                            collect_element_children(&child, &mut real);
                            continue;
                        }
                    }
                    real.push(child);
                }
                return real;
            }
        }
    }
    children
}

fn collect_element_children(handle: &Handle, out: &mut Vec<Handle>) {
    for child in handle.children.borrow().iter() {
        if matches!(child.data, NodeData::Element { .. }) {
            out.push(child.clone());
        }
    }
}

fn serialize_node(handle: &Handle) -> String {
    let mut buf = Vec::new();
    let serializable: SerializableHandle = handle.clone().into();
    let _ = serialize(
        &mut buf,
        &serializable,
        SerializeOpts {
            traversal_scope: TraversalScope::ChildrenOnly(None),
            ..Default::default()
        },
    );
    String::from_utf8(buf).unwrap_or_default()
}

fn collect_scripts(handle: &Handle) -> Vec<(Option<String>, Option<String>)> {
    let mut scripts = Vec::new();
    collect_scripts_recursive(handle, &mut scripts);
    scripts
}

fn collect_scripts_recursive(
    handle: &Handle,
    scripts: &mut Vec<(Option<String>, Option<String>)>,
) {
    if let NodeData::Element { name, attrs, .. } = &handle.data {
        if name.local == local_name!("script") {
            let mut inline = String::new();
            for child in handle.children.borrow().iter() {
                if let NodeData::Text { contents } = &child.data {
                    inline.push_str(&contents.borrow());
                }
            }
            let src = get_attr_raw(attrs, "src");
            if !inline.trim().is_empty() || src.is_some() {
                scripts.push((
                    if inline.trim().is_empty() { None } else { Some(inline) },
                    src,
                ));
            }
            return;
        }
    }
    for child in handle.children.borrow().iter() {
        collect_scripts_recursive(child, scripts);
    }
}

fn get_this_node_id(this: &JsValue) -> JsResult<usize> {
    let obj = this.as_object().ok_or_else(|| {
        JsError::from_native(JsNativeError::typ().with_message("not an object"))
    })?;
    let id_val = obj.get(js_string!("__node_id"), &mut Context::default()).map_err(|_| {
        JsError::from_native(JsNativeError::typ().with_message("missing __node_id"))
    })?;
    id_val.as_number()
        .map(|n| n as usize)
        .ok_or_else(|| JsError::from_native(JsNativeError::typ().with_message("invalid __node_id")))
}

fn mk_getter<F>(context: &mut Context, f: F) -> boa_engine::object::builtins::JsFunction
where
    F: Fn(&JsValue, &[JsValue], &mut Context) -> JsResult<JsValue> + Copy + 'static,
{
    FunctionObjectBuilder::new(context.realm(), NativeFunction::from_copy_closure(f))
        .name("getter")
        .length(0)
        .constructor(false)
        .build()
}

fn mk_setter<F>(context: &mut Context, f: F) -> boa_engine::object::builtins::JsFunction
where
    F: Fn(&JsValue, &[JsValue], &mut Context) -> JsResult<JsValue> + Copy + 'static,
{
    FunctionObjectBuilder::new(context.realm(), NativeFunction::from_copy_closure(f))
        .name("setter")
        .length(1)
        .constructor(false)
        .build()
}

fn matches_selector(handle: &Handle, selector: &str) -> bool {
    if let NodeData::Element { name, attrs, .. } = &handle.data {
        let mut parts = selector.trim();
        let mut tag_match = true;
        let mut attr_checks: Vec<(String, Option<String>)> = Vec::new();

        // Parse tag name (alphanumeric before [ . # :)
        if parts.starts_with(|c: char| c.is_ascii_alphabetic()) {
            let mut tag = String::new();
            while let Some(c) = parts.chars().next() {
                if c.is_ascii_alphanumeric() || c == '-' {
                    tag.push(c);
                    parts = &parts[1..];
                } else {
                    break;
                }
            }
            tag_match = name.local.to_string().to_lowercase() == tag.to_lowercase();
        }
        if !tag_match {
            return false;
        }

        // Parse remaining parts: [attr], [attr="val"], .class, #id, :pseudo(...)
        while !parts.is_empty() {
            if parts.starts_with('[') {
                parts = &parts[1..];
                let mut attr_name = String::new();
                let mut attr_value = None;
                while let Some(c) = parts.chars().next() {
                    if c == ']' || c == '=' {
                        break;
                    }
                    attr_name.push(c);
                    parts = &parts[1..];
                }
                if parts.starts_with('=') {
                    parts = &parts[1..];
                    let quote = parts.chars().next();
                    if quote == Some('"') || quote == Some('\'') {
                        let q = quote.unwrap();
                        parts = &parts[1..];
                        let mut val = String::new();
                        while let Some(c) = parts.chars().next() {
                            if c == q { break; }
                            val.push(c);
                            parts = &parts[1..];
                        }
                        if parts.starts_with(q) { parts = &parts[1..]; }
                        attr_value = Some(val);
                    } else {
                        let mut val = String::new();
                        while let Some(c) = parts.chars().next() {
                            if c == ']' { break; }
                            val.push(c);
                            parts = &parts[1..];
                        }
                        attr_value = Some(val);
                    }
                }
                if parts.starts_with(']') { parts = &parts[1..]; }
                attr_checks.push((attr_name, attr_value));
            } else if parts.starts_with('.') {
                parts = &parts[1..];
                let mut cls = String::new();
                while let Some(c) = parts.chars().next() {
                    if !c.is_alphanumeric() && c != '-' && c != '_' { break; }
                    cls.push(c);
                    parts = &parts[1..];
                }
                if let Some(class_attr) = get_attr_raw(attrs, "class") {
                    if !class_attr.split_whitespace().any(|c| c == cls) {
                        return false;
                    }
                } else {
                    return false;
                }
            } else if parts.starts_with('#') {
                parts = &parts[1..];
                let mut id = String::new();
                while let Some(c) = parts.chars().next() {
                    if !c.is_alphanumeric() && c != '-' && c != '_' { break; }
                    id.push(c);
                    parts = &parts[1..];
                }
                if let Some(id_attr) = get_attr_raw(attrs, "id") {
                    if id_attr != id { return false; }
                } else {
                    return false;
                }
            } else if parts.starts_with(':') {
                // Skip past :pseudo-class(...)
                let end = parts.find('(').map(|i| i + 1).unwrap_or(parts.len());
                parts = &parts[end..];
                if !parts.is_empty() && parts.as_bytes()[0] as char != ')' {
                    let mut depth = 1;
                    for (i, c) in parts.char_indices() {
                        if c == '(' { depth += 1; }
                        else if c == ')' { depth -= 1; if depth == 0 { parts = &parts[i+1..]; break; } }
                    }
                } else if parts.starts_with(')') {
                    parts = &parts[1..];
                }
            } else {
                break;
            }
        }

        // Check collected attribute selectors
        for (name, expected) in &attr_checks {
            let attr_val = get_attr_raw(attrs, name);
            match expected {
                Some(val) => {
                    if attr_val.as_deref() != Some(val.as_str()) {
                        return false;
                    }
                }
                None => {
                    if attr_val.is_none() {
                        return false;
                    }
                }
            }
        }

        // Handle :not(...) by re-parsing the selector
        if let Some(not_idx) = selector.find(":not(") {
            let start = not_idx + 5;
            let mut depth = 0;
            let mut end = start;
            for (i, c) in selector[start..].char_indices() {
                if c == '(' { depth += 1; }
                else if c == ')' { if depth == 0 { end = start + i; break; } depth -= 1; }
            }
            let inner = selector[start..end].trim();
            if inner.starts_with('[') {
                let inner_trimmed = inner.trim_start_matches('[').trim_end_matches(']');
                let (not_name, not_expected) = if let Some(eq_idx) = inner_trimmed.find('=') {
                    let n = inner_trimmed[..eq_idx].trim().to_string();
                    let v = inner_trimmed[eq_idx+1..].trim().trim_matches('"').trim_matches('\'').to_string();
                    (n, Some(v))
                } else {
                    (inner_trimmed.to_string(), None)
                };
                let attr_val = get_attr_raw(attrs, &not_name);
                let matches_not = match &not_expected {
                    Some(val) => attr_val.as_deref() == Some(val.as_str()),
                    None => attr_val.is_some(),
                };
                if matches_not {
                    return false;
                }
            }
        }

        return true;
    }
    false
}

fn query_selector_recursive(handle: &Handle, selector: &str) -> Option<Handle> {
    if matches_selector(handle, selector) {
        return Some(handle.clone());
    }
    for child in handle.children.borrow().iter() {
        if let Some(found) = query_selector_recursive(child, selector) {
            return Some(found);
        }
    }
    None
}

fn query_selector_all_recursive(handle: &Handle, selector: &str, results: &mut Vec<Handle>) {
    if matches_selector(handle, selector) {
        results.push(handle.clone());
    }
    for child in handle.children.borrow().iter() {
        query_selector_all_recursive(child, selector, results);
    }
}

fn build_element_object(context: &mut Context, handle: Handle) -> JsResult<JsValue> {
    let id = handle_to_id(&handle);

    let tag_name = if let NodeData::Element { name, .. } = &handle.data {
        name.local.to_string().to_uppercase()
    } else if let NodeData::Text { .. } = &handle.data {
        String::new()
    } else {
        String::new()
    };
    let node_type: i32 = match handle.data {
        NodeData::Element { .. } => 1,
        NodeData::Text { .. } => 3,
        NodeData::Document => 9,
        _ => 1,
    };

    let id_attr = if let NodeData::Element { attrs, .. } = &handle.data {
        get_attr_raw(attrs, "id").unwrap_or_default()
    } else {
        String::new()
    };
    let class_attr = if let NodeData::Element { attrs, .. } = &handle.data {
        get_attr_raw(attrs, "class").unwrap_or_default()
    } else {
        String::new()
    };
    let value_attr = if let NodeData::Element { attrs, .. } = &handle.data {
        get_attr_raw(attrs, "value").unwrap_or_default()
    } else {
        String::new()
    };
    let src_attr = if let NodeData::Element { attrs, .. } = &handle.data {
        get_attr_raw(attrs, "src").unwrap_or_default()
    } else {
        String::new()
    };

    let inner_get = mk_getter(context, |this: &JsValue, _: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
        let eid = get_this_node_id(this)?;
        Ok(match get_handle(eid) {
            Some(elem) => JsValue::from(js_string!(serialize_node(&elem).as_str())),
            None => JsValue::from(js_string!("")),
        })
    });
    let inner_set = mk_setter(context, |this: &JsValue, args: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
        let html = args.first().and_then(|v| v.as_string()).and_then(|s| s.to_std_string().ok()).unwrap_or_default();
        let eid = get_this_node_id(this)?;
        if let Some(elem) = get_handle(eid) {
            *elem.children.borrow_mut() = Vec::new();
            let new_children = parse_html_fragment(&html);
            for child in &new_children {
                for (inline, _) in collect_scripts(child) {
                    if let Some(code) = inline {
                        PENDING_SCRIPTS.with(|s| s.borrow_mut().push(code));
                    }
                }
            }
            elem.children.borrow_mut().extend(new_children);
        }
        Ok(JsValue::undefined())
    });

    let text_get = mk_getter(context, |this: &JsValue, _: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
        let eid = get_this_node_id(this)?;
        Ok(match get_handle(eid) {
            Some(elem) => {
                let mut text = String::new();
                collect_text(&elem, &mut text);
                JsValue::from(js_string!(text.as_str()))
            }
            None => JsValue::from(js_string!("")),
        })
    });
    let text_set = mk_setter(context, |this: &JsValue, args: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
        let text = args.first().and_then(|v| v.as_string()).and_then(|s| s.to_std_string().ok()).unwrap_or_default();
        let eid = get_this_node_id(this)?;
        if let Some(elem) = get_handle(eid) {
            *elem.children.borrow_mut() = Vec::new();
            let text_node = Rc::new(markup5ever_rcdom::Node {
                parent: std::cell::Cell::new(None),
                children: RefCell::new(Vec::new()),
                data: NodeData::Text { contents: RefCell::new(text.as_str().into()) },
            });
            text_node.parent.set(Some(Rc::downgrade(&elem)));
            elem.children.borrow_mut().push(text_node);
        }
        Ok(JsValue::undefined())
    });

    let pe_get = mk_getter(context, |this: &JsValue, _: &[JsValue], context: &mut Context| -> JsResult<JsValue> {
        let eid = get_this_node_id(this)?;
        if let Some(elem) = get_handle(eid) {
            let p = elem.parent.take();
            elem.parent.set(p.clone());
            if let Some(parent) = p.and_then(|p| p.upgrade()) {
                return build_element_object(context, parent);
            }
        }
        Ok(JsValue::null())
    });

    let children_get = mk_getter(context, |_: &JsValue, _: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
        Ok(JsValue::undefined())
    });

    let fc_get = mk_getter(context, |this: &JsValue, _: &[JsValue], context: &mut Context| -> JsResult<JsValue> {
        let eid = get_this_node_id(this)?;
        if let Some(elem) = get_handle(eid) {
            if let Some(first) = elem.children.borrow().first() {
                return build_element_object(context, first.clone());
            }
        }
        Ok(JsValue::null())
    });

    let class_list = ObjectInitializer::new(context)
        .function(NativeFunction::from_copy_closure(|_, _, _| Ok(JsValue::undefined())), js_string!("add"), 1)
        .function(NativeFunction::from_copy_closure(|_, _, _| Ok(JsValue::undefined())), js_string!("remove"), 1)
        .function(NativeFunction::from_copy_closure(|_, _, _| Ok(JsValue::undefined())), js_string!("toggle"), 1)
        .function(NativeFunction::from_copy_closure(|_, _, _| Ok(JsValue::new(false))), js_string!("contains"), 1)
        .build();
    let style = ObjectInitializer::new(context).build();

    let mut obj = ObjectInitializer::new(context);
    obj.property(js_string!("__node_id"), id as i64, Attribute::all());
    obj.property(js_string!("tagName"), js_string!(tag_name.as_str()), Attribute::all());
    obj.property(js_string!("nodeType"), node_type, Attribute::all());
    obj.property(js_string!("id"), js_string!(id_attr.as_str()), Attribute::WRITABLE | Attribute::CONFIGURABLE);
    obj.property(js_string!("className"), js_string!(class_attr.as_str()), Attribute::WRITABLE | Attribute::CONFIGURABLE);
    obj.property(js_string!("value"), js_string!(value_attr.as_str()), Attribute::WRITABLE | Attribute::CONFIGURABLE);
    obj.property(js_string!("src"), js_string!(src_attr.as_str()), Attribute::WRITABLE | Attribute::CONFIGURABLE);
    obj.property(js_string!("classList"), class_list, Attribute::all());
    obj.property(js_string!("style"), style, Attribute::all());

    obj.accessor(js_string!("innerHTML"), Some(inner_get), Some(inner_set), Attribute::all());
    obj.accessor(js_string!("textContent"), Some(text_get), Some(text_set), Attribute::all());
    obj.accessor(js_string!("parentElement"), Some(pe_get), None, Attribute::all());
    obj.accessor(js_string!("children"), Some(children_get), None, Attribute::all());
    obj.accessor(js_string!("firstChild"), Some(fc_get), None, Attribute::all());

    obj.function(
        NativeFunction::from_copy_closure(|this: &JsValue, args: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
            let name = args.first().and_then(|v| v.as_string()).and_then(|s| s.to_std_string().ok()).unwrap_or_default();
            let value = args.get(1).and_then(|v| v.as_string()).and_then(|s| s.to_std_string().ok()).unwrap_or_default();
            if let Some(elem) = get_handle(get_this_node_id(this)?) {
                if let NodeData::Element { attrs, .. } = &elem.data {
                    set_attr_raw(attrs, &name, &value);
                }
            }
            Ok(JsValue::undefined())
        }),
        js_string!("setAttribute"),
        2,
    );
    obj.function(
        NativeFunction::from_copy_closure(|this: &JsValue, args: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
            let name = args.first().and_then(|v| v.as_string()).and_then(|s| s.to_std_string().ok()).unwrap_or_default();
            if let Some(elem) = get_handle(get_this_node_id(this)?) {
                if let NodeData::Element { attrs, .. } = &elem.data {
                    if let Some(val) = get_attr_raw(attrs, &name) {
                        return Ok(JsValue::from(js_string!(val.as_str())));
                    }
                }
            }
            Ok(JsValue::null())
        }),
        js_string!("getAttribute"),
        1,
    );
    obj.function(
        NativeFunction::from_copy_closure(|this: &JsValue, args: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
            let child_obj = args.first().and_then(|v| v.as_object());
            if let Some(child_obj) = child_obj {
                let child_id = child_obj.get(js_string!("__node_id"), &mut Context::default()).ok()
                    .and_then(|v| v.as_number().map(|n| n as usize));
                if let Some(elem) = get_handle(get_this_node_id(this)?) {
                    if let Some(child_id) = child_id {
                        let p = elem.parent.take();
                        elem.parent.set(p);
                        if let Some(child) = get_handle(child_id) {
                            child.parent.set(Some(Rc::downgrade(&elem)));
                            elem.children.borrow_mut().push(child);
                        }
                    }
                }
            }
            Ok(JsValue::undefined())
        }),
        js_string!("appendChild"),
        1,
    );
    obj.function(
        NativeFunction::from_copy_closure(|_: &JsValue, _: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
            Ok(JsValue::undefined())
        }),
        js_string!("removeChild"),
        1,
    );
    obj.function(
        NativeFunction::from_copy_closure(|this: &JsValue, _: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
            let eid = match get_this_node_id(this) {
                Ok(id) => id,
                Err(_) => return Ok(JsValue::undefined()),
            };
            if let Some(elem) = get_handle(eid) {
                let parent_weak = elem.parent.take();
                elem.parent.set(parent_weak.clone());
                if let Some(parent_weak) = parent_weak {
                    if let Some(parent) = parent_weak.upgrade() {
                        parent.children.borrow_mut().retain(|child| !Rc::ptr_eq(child, &elem));
                    }
                }
            }
            Ok(JsValue::undefined())
        }),
        js_string!("remove"),
        0,
    );
    obj.function(
        NativeFunction::from_copy_closure(|this: &JsValue, args: &[JsValue], context: &mut Context| -> JsResult<JsValue> {
            let selector = args.first().and_then(|v| v.as_string()).and_then(|s| s.to_std_string().ok()).unwrap_or_default();
            if let Some(elem) = get_handle(get_this_node_id(this)?) {
                if let Some(found) = query_selector_recursive(&elem, &selector) {
                    return build_element_object(context, found);
                }
            }
            Ok(JsValue::null())
        }),
        js_string!("querySelector"),
        1,
    );
    obj.function(
        NativeFunction::from_copy_closure(|_: &JsValue, _: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
            Ok(JsValue::undefined())
        }),
        js_string!("addEventListener"),
        2,
    );
    obj.function(
        NativeFunction::from_copy_closure(|_: &JsValue, _: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
            Ok(JsValue::undefined())
        }),
        js_string!("click"),
        0,
    );
    obj.function(
        NativeFunction::from_copy_closure(|_: &JsValue, _: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
            Ok(JsValue::undefined())
        }),
        js_string!("focus"),
        0,
    );
    obj.function(
        NativeFunction::from_copy_closure(|_: &JsValue, _: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
            Ok(JsValue::undefined())
        }),
        js_string!("blur"),
        0,
    );

    obj.function(
        NativeFunction::from_copy_closure(|_: &JsValue, _: &[JsValue], context: &mut Context| -> JsResult<JsValue> {
            let rect = ObjectInitializer::new(context)
                .property(js_string!("top"), 0, Attribute::all())
                .property(js_string!("left"), 0, Attribute::all())
                .property(js_string!("right"), 0, Attribute::all())
                .property(js_string!("bottom"), 0, Attribute::all())
                .property(js_string!("width"), 0, Attribute::all())
                .property(js_string!("height"), 0, Attribute::all())
                .property(js_string!("x"), 0, Attribute::all())
                .property(js_string!("y"), 0, Attribute::all())
                .build();
            Ok(JsValue::from(rect))
        }),
        js_string!("getBoundingClientRect"),
        0,
    );
    obj.function(
        NativeFunction::from_copy_closure(|_: &JsValue, _: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
            Ok(JsValue::undefined())
        }),
        js_string!("scrollIntoView"),
        0,
    );

    Ok(JsValue::from(obj.build()))
}

fn collect_text(handle: &Handle, out: &mut String) {
    if let NodeData::Text { contents } = &handle.data {
        out.push_str(&contents.borrow());
    }
    for child in handle.children.borrow().iter() {
        collect_text(child, out);
    }
}

pub fn setup_document(context: &mut Context, document_handle: Handle) -> JsResult<()> {
    let doc_id = handle_to_id(&document_handle);

    // Build getters/setters before borrowing context via ObjectInitializer
    let title_get = mk_getter(context, |_: &JsValue, _: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
        if let Some(doc_handle) = get_document_root() {
            if let Some(t) = find_title(&doc_handle) {
                return Ok(JsValue::from(js_string!(serialize_node(&t).as_str())));
            }
        }
        Ok(JsValue::from(js_string!("")))
    });
    let title_set = mk_setter(context, |_: &JsValue, _: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
        Ok(JsValue::undefined())
    });

    // cookie getter/setter — build before ObjectInitializer
    let cookie_get_fn = FunctionObjectBuilder::new(context.realm(),
        NativeFunction::from_copy_closure(|_, _, _| Ok(JsValue::from(js_string!("")))))
        .name("get cookie").length(0).constructor(false).build();
    let cookie_set_fn = FunctionObjectBuilder::new(context.realm(),
        NativeFunction::from_copy_closure(|_, _, _| Ok(JsValue::undefined())))
        .name("set cookie").length(1).constructor(false).build();

    let mut doc = ObjectInitializer::new(context);
    doc.property(js_string!("__node_id"), doc_id as i64, Attribute::all());
    doc.property(js_string!("nodeType"), 9, Attribute::all());
    doc.accessor(js_string!("title"), Some(title_get), Some(title_set), Attribute::all());

    // Build body/html/head after creating the ObjectInitializer, detaching context temporarily
    let body_handle = find_body(&document_handle);
    let html_handle = find_html(&document_handle);
    let head_handle = find_head(&document_handle);

    if let Some(h) = body_handle {
        let ctx = doc.context();
        let v = build_element_object(ctx, h).unwrap_or(JsValue::null());
        let _ = ctx;
        doc.property(js_string!("body"), v, Attribute::all());
    } else {
        doc.property(js_string!("body"), JsValue::null(), Attribute::all());
    }
    if let Some(h) = html_handle {
        let ctx = doc.context();
        let v = build_element_object(ctx, h).unwrap_or(JsValue::null());
        let _ = ctx;
        doc.property(js_string!("documentElement"), v, Attribute::all());
    } else {
        doc.property(js_string!("documentElement"), JsValue::null(), Attribute::all());
    }
    if let Some(h) = head_handle {
        let ctx = doc.context();
        let v = build_element_object(ctx, h).unwrap_or(JsValue::null());
        let _ = ctx;
        doc.property(js_string!("head"), v, Attribute::all());
    } else {
        doc.property(js_string!("head"), JsValue::null(), Attribute::all());
    }

    doc.function(
        NativeFunction::from_copy_closure(|_: &JsValue, args: &[JsValue], context: &mut Context| -> JsResult<JsValue> {
            let sel = args.first().and_then(|v| v.as_string()).and_then(|s| s.to_std_string().ok()).unwrap_or_default();
            if let Some(doc_handle) = get_document_root() {
                if let Some(found) = query_selector_recursive(&doc_handle, &sel) {
                    return build_element_object(context, found);
                }
            }
            Ok(JsValue::null())
        }),
        js_string!("querySelector"),
        1,
    );
    doc.function(
        NativeFunction::from_copy_closure(|_: &JsValue, args: &[JsValue], context: &mut Context| -> JsResult<JsValue> {
            let sel = args.first().and_then(|v| v.as_string()).and_then(|s| s.to_std_string().ok()).unwrap_or_default();
            let mut results = Vec::new();
            if let Some(doc_handle) = get_document_root() {
                query_selector_all_recursive(&doc_handle, &sel, &mut results);
            }
            let mut elements = Vec::new();
            for h in &results {
                if let Ok(el) = build_element_object(context, h.clone()) {
                    elements.push(el);
                }
            }
            let mut arr = ObjectInitializer::new(context);
            arr.property(js_string!("length"), elements.len() as i64, Attribute::all());
            for (i, el) in elements.iter().enumerate() {
                arr.property(js_string!(i.to_string().as_str()), el.clone(), Attribute::all());
            }
            Ok(JsValue::from(arr.build()))
        }),
        js_string!("querySelectorAll"),
        1,
    );
    doc.function(
        NativeFunction::from_copy_closure(|_: &JsValue, args: &[JsValue], context: &mut Context| -> JsResult<JsValue> {
            let id = args.first().and_then(|v| v.as_string()).and_then(|s| s.to_std_string().ok()).unwrap_or_default();
            if let Some(doc_handle) = get_document_root() {
                if let Some(found) = find_by_id(&doc_handle, &id) {
                    return build_element_object(context, found);
                }
            }
            Ok(JsValue::null())
        }),
        js_string!("getElementById"),
        1,
    );
    doc.function(
        NativeFunction::from_copy_closure(|_: &JsValue, args: &[JsValue], context: &mut Context| -> JsResult<JsValue> {
            let tag = args.first().and_then(|v| v.as_string()).and_then(|s| s.to_std_string().ok()).unwrap_or_default();
            let handle = Rc::new(markup5ever_rcdom::Node {
                parent: std::cell::Cell::new(None),
                children: RefCell::new(Vec::new()),
                data: NodeData::Element {
                    name: QualName::new(None, html5ever::ns!(html), tag.into()),
                    attrs: RefCell::new(Vec::new()),
                    template_contents: RefCell::new(None),
                    mathml_annotation_xml_integration_point: false,
                },
            });
            build_element_object(context, handle)
        }),
        js_string!("createElement"),
        1,
    );
    doc.function(
        NativeFunction::from_copy_closure(|_: &JsValue, args: &[JsValue], context: &mut Context| -> JsResult<JsValue> {
            let text = args.first().and_then(|v| v.as_string()).and_then(|s| s.to_std_string().ok()).unwrap_or_default();
            let handle = Rc::new(markup5ever_rcdom::Node {
                parent: std::cell::Cell::new(None),
                children: RefCell::new(Vec::new()),
                data: NodeData::Text { contents: RefCell::new(text.as_str().into()) },
            });
            build_element_object(context, handle)
        }),
        js_string!("createTextNode"),
        1,
    );
    doc.function(
        NativeFunction::from_copy_closure(|_: &JsValue, _args: &[JsValue], context: &mut Context| -> JsResult<JsValue> {
            let handle = Rc::new(markup5ever_rcdom::Node {
                parent: std::cell::Cell::new(None),
                children: RefCell::new(Vec::new()),
                data: NodeData::Element {
                    name: QualName::new(None, html5ever::ns!(html), local_name!("div")),
                    attrs: RefCell::new(Vec::new()),
                    template_contents: RefCell::new(None),
                    mathml_annotation_xml_integration_point: false,
                },
            });
            build_element_object(context, handle)
        }),
        js_string!("createDocumentFragment"),
        0,
    );

    // getElementsByTagName
    doc.function(
        NativeFunction::from_copy_closure(|_: &JsValue, args: &[JsValue], context: &mut Context| -> JsResult<JsValue> {
            let tag = args.first().and_then(|v| v.as_string()).and_then(|s| s.to_std_string().ok()).unwrap_or_default().to_uppercase();
            let mut results = Vec::new();
            if let Some(doc_handle) = get_document_root() {
                find_by_tag_name(&doc_handle, &tag, &mut results);
            }
            let mut elements = Vec::new();
            for h in &results {
                if let Ok(el) = build_element_object(context, h.clone()) {
                    elements.push(el);
                }
            }
            let mut arr = ObjectInitializer::new(context);
            arr.property(js_string!("length"), elements.len() as i64, Attribute::all());
            for (i, el) in elements.iter().enumerate() {
                arr.property(js_string!(i.to_string().as_str()), el.clone(), Attribute::all());
            }
            Ok(JsValue::from(arr.build()))
        }),
        js_string!("getElementsByTagName"),
        1,
    );

    // readyState
    doc.property(js_string!("readyState"), js_string!("loading"), Attribute::all());

    // document.addEventListener
    doc.function(
        NativeFunction::from_copy_closure(|_, _, _| Ok(JsValue::undefined())),
        js_string!("addEventListener"),
        2,
    );

    doc.accessor(js_string!("cookie"), Some(cookie_get_fn), Some(cookie_set_fn), Attribute::all());

    let doc_obj = doc.build();

    context.register_global_property(js_string!("document"), doc_obj, Attribute::all())
        .map_err(|e| JsError::from_native(JsNativeError::typ().with_message(e.to_string())))?;

    Ok(())
}

fn get_document_root() -> Option<Handle> {
    DOM_NODES.with(|nodes| {
        for (_, h) in nodes.borrow().iter() {
            if matches!(h.data, NodeData::Document) {
                return Some(h.clone());
            }
        }
        None
    })
}

fn find_body(handle: &Handle) -> Option<Handle> {
    if let NodeData::Element { name, .. } = &handle.data {
        if name.local == local_name!("body") {
            return Some(handle.clone());
        }
    }
    for child in handle.children.borrow().iter() {
        if let Some(found) = find_body(child) {
            return Some(found);
        }
    }
    None
}

fn find_html(handle: &Handle) -> Option<Handle> {
    if let NodeData::Element { name, .. } = &handle.data {
        if name.local == local_name!("html") {
            return Some(handle.clone());
        }
    }
    for child in handle.children.borrow().iter() {
        if let Some(found) = find_html(child) {
            return Some(found);
        }
    }
    None
}

fn find_head(handle: &Handle) -> Option<Handle> {
    if let NodeData::Element { name, .. } = &handle.data {
        if name.local == local_name!("head") {
            return Some(handle.clone());
        }
    }
    for child in handle.children.borrow().iter() {
        if let Some(found) = find_head(child) {
            return Some(found);
        }
    }
    None
}

fn find_title(handle: &Handle) -> Option<Handle> {
    if let NodeData::Element { name, .. } = &handle.data {
        if name.local == local_name!("title") {
            return Some(handle.clone());
        }
    }
    for child in handle.children.borrow().iter() {
        if let Some(found) = find_title(child) {
            return Some(found);
        }
    }
    None
}

fn find_by_id(handle: &Handle, id: &str) -> Option<Handle> {
    if let NodeData::Element { attrs, .. } = &handle.data {
        if get_attr_raw(attrs, "id").as_deref() == Some(id) {
            return Some(handle.clone());
        }
    }
    for child in handle.children.borrow().iter() {
        if let Some(found) = find_by_id(child, id) {
            return Some(found);
        }
    }
    None
}

fn find_by_tag_name(handle: &Handle, tag: &str, out: &mut Vec<Handle>) {
    if let NodeData::Element { name, .. } = &handle.data {
        if name.local.to_string().to_ascii_uppercase() == tag {
            out.push(handle.clone());
        }
    }
    for child in handle.children.borrow().iter() {
        find_by_tag_name(child, tag, out);
    }
}
