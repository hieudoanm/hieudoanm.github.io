#![allow(non_snake_case)]
use crate::browser::dom::setup_document;
use boa_engine::builtins::promise::ResolvingFunctions;
use boa_engine::object::builtins::JsPromise;
use boa_engine::object::{FunctionObjectBuilder, ObjectInitializer};
use boa_engine::property::Attribute;
use boa_engine::{js_string, Context, JsArgs, JsResult, JsValue, NativeFunction, Source};
use markup5ever_rcdom::Handle;
use std::cell::RefCell;
use std::collections::HashMap;
use std::path::Path;
use std::sync::atomic::{AtomicU32, Ordering};
use std::sync::mpsc::{self, Receiver, Sender};
use std::sync::{Mutex, OnceLock};
use std::time::Duration;

// ---------------------------------------------------------------------------
// Event channel
// ---------------------------------------------------------------------------

enum JsEvent {
    TimerFired(u32),
    FetchComplete(u32, Result<String, String>),
}

fn event_channel() -> &'static (Sender<JsEvent>, Mutex<Receiver<JsEvent>>) {
    static CH: OnceLock<(Sender<JsEvent>, Mutex<Receiver<JsEvent>>)> = OnceLock::new();
    CH.get_or_init(|| {
        let (tx, rx) = mpsc::channel();
        (tx, Mutex::new(rx))
    })
}

thread_local! {
    static TIMER_CALLBACKS: RefCell<HashMap<u32, JsValue>> = RefCell::new(HashMap::new());
    static FETCH_RESOLVERS: RefCell<HashMap<u32, JsValue>> = RefCell::new(HashMap::new());
    static FETCH_REJECTORS: RefCell<HashMap<u32, JsValue>> = RefCell::new(HashMap::new());
}

static NEXT_TIMER_ID: AtomicU32 = AtomicU32::new(1);
static NEXT_FETCH_ID: AtomicU32 = AtomicU32::new(1);
static ACTIVE_TIMEOUTS: AtomicU32 = AtomicU32::new(0);
static ACTIVE_FETCHES: AtomicU32 = AtomicU32::new(0);

// ---------------------------------------------------------------------------
// Helper to extract a String from a JsValue argument
// ---------------------------------------------------------------------------

fn js_to_string(val: &JsValue, context: &mut Context) -> String {
    val.to_string(context)
        .map(|s| s.to_std_string().unwrap_or_default())
        .unwrap_or_default()
}

fn js_to_string_opt(val: &JsValue, context: &mut Context) -> Option<String> {
    val.to_string(context)
        .ok()
        .and_then(|s| s.to_std_string().ok())
}

fn jsval_from_string(s: &str) -> JsValue {
    JsValue::from(js_string!(s))
}

// ---------------------------------------------------------------------------
// Native function implementations
// ---------------------------------------------------------------------------

fn console_log(_this: &JsValue, args: &[JsValue], context: &mut Context) -> JsResult<JsValue> {
    for arg in args {
        let s = js_to_string(arg, context);
        eprintln!("  💬 {}", s);
    }
    Ok(JsValue::undefined())
}

fn setTimeout_impl(_this: &JsValue, args: &[JsValue], _context: &mut Context) -> JsResult<JsValue> {
    let func = args.get_or_undefined(0).clone();
    let delay = args.get(1).and_then(|v| v.as_number()).unwrap_or(0.0) as u64;
    let id = NEXT_TIMER_ID.fetch_add(1, Ordering::Relaxed);
    ACTIVE_TIMEOUTS.fetch_add(1, Ordering::Relaxed);
    TIMER_CALLBACKS.with(|cbs| cbs.borrow_mut().insert(id, func));
    let tx = event_channel().0.clone();
    tokio::spawn(async move {
        tokio::time::sleep(Duration::from_millis(delay)).await;
        let _ = tx.send(JsEvent::TimerFired(id));
    });
    Ok(JsValue::new(id))
}

fn clearTimeout_impl(_this: &JsValue, args: &[JsValue], _context: &mut Context) -> JsResult<JsValue> {
    if let Some(id) = args.get(0).and_then(|v| v.as_number()).map(|n| n as u32) {
        TIMER_CALLBACKS.with(|cbs| {
            if cbs.borrow_mut().remove(&id).is_some() {
                ACTIVE_TIMEOUTS.fetch_sub(1, Ordering::Relaxed);
            }
        });
    }
    Ok(JsValue::undefined())
}

fn setInterval_impl(_this: &JsValue, args: &[JsValue], _context: &mut Context) -> JsResult<JsValue> {
    let func = args.get_or_undefined(0).clone();
    let interval = args.get(1).and_then(|v| v.as_number()).unwrap_or(0.0) as u64;
    let id = NEXT_TIMER_ID.fetch_add(1, Ordering::Relaxed);
    ACTIVE_TIMEOUTS.fetch_add(1, Ordering::Relaxed);
    TIMER_CALLBACKS.with(|cbs| cbs.borrow_mut().insert(id, func));
    let tx = event_channel().0.clone();
    tokio::spawn(async move {
        loop {
            tokio::time::sleep(Duration::from_millis(interval)).await;
            if tx.send(JsEvent::TimerFired(id)).is_err() {
                break;
            }
        }
    });
    Ok(JsValue::new(id))
}

fn clearInterval_impl(this: &JsValue, args: &[JsValue], context: &mut Context) -> JsResult<JsValue> {
    clearTimeout_impl(this, args, context)
}

fn requestAnimationFrame_impl(_this: &JsValue, args: &[JsValue], _context: &mut Context) -> JsResult<JsValue> {
    let func = args.get_or_undefined(0).clone();
    let id = NEXT_TIMER_ID.fetch_add(1, Ordering::Relaxed);
    ACTIVE_TIMEOUTS.fetch_add(1, Ordering::Relaxed);
    TIMER_CALLBACKS.with(|cbs| cbs.borrow_mut().insert(id, func));
    let tx = event_channel().0.clone();
    tokio::spawn(async move {
        tokio::time::sleep(Duration::from_millis(1)).await;
        let _ = tx.send(JsEvent::TimerFired(id));
    });
    Ok(JsValue::new(id))
}

fn cancelAnimationFrame_impl(this: &JsValue, args: &[JsValue], context: &mut Context) -> JsResult<JsValue> {
    clearTimeout_impl(this, args, context)
}

fn getComputedStyle_impl(_this: &JsValue, _args: &[JsValue], context: &mut Context) -> JsResult<JsValue> {
    let style = ObjectInitializer::new(context).build();
    Ok(JsValue::from(style))
}

fn matchMedia_impl(_this: &JsValue, args: &[JsValue], context: &mut Context) -> JsResult<JsValue> {
    let query = js_to_string(args.get_or_undefined(0), context);
    let noop = NativeFunction::from_fn_ptr(|_, _, _| Ok(JsValue::undefined()));
    let mm = ObjectInitializer::new(context)
        .property(js_string!("matches"), false, Attribute::all())
        .property(js_string!("media"), jsval_from_string(&query), Attribute::all())
        .function(noop.clone(), js_string!("addListener"), 1)
        .function(noop.clone(), js_string!("removeListener"), 1)
        .function(noop.clone(), js_string!("addEventListener"), 2)
        .function(noop, js_string!("removeEventListener"), 2)
        .build();
    Ok(JsValue::from(mm))
}

fn fetch_impl(_this: &JsValue, args: &[JsValue], context: &mut Context) -> JsResult<JsValue> {
    let url = js_to_string(args.get_or_undefined(0), context);

    let resolved = resolve_url(context, &url).unwrap_or(url);

    let (method, body) = if let Some(init) = args.get(1).and_then(|v| v.as_object()) {
        let m = init.get(js_string!("method"), context)
            .ok()
            .and_then(|v| js_to_string_opt(&v, context))
            .unwrap_or_else(|| "GET".to_string());
        let b = init.get(js_string!("body"), context)
            .ok()
            .and_then(|v| js_to_string_opt(&v, context));
        (m, b)
    } else {
        ("GET".to_string(), None)
    };

    let (promise, resolvers): (JsPromise, ResolvingFunctions) = JsPromise::new_pending(context);
    let id = NEXT_FETCH_ID.fetch_add(1, Ordering::Relaxed);
    ACTIVE_FETCHES.fetch_add(1, Ordering::Relaxed);

    FETCH_RESOLVERS.with(|r| r.borrow_mut().insert(id, JsValue::from(resolvers.resolve)));
    FETCH_REJECTORS.with(|r| r.borrow_mut().insert(id, JsValue::from(resolvers.reject)));

    let tx = event_channel().0.clone();
    tokio::spawn(async move {
        let client = reqwest::Client::builder()
            .user_agent("Browserverless/0.1.0")
            .cookie_store(true)
            .build();
        let client = match client {
            Ok(c) => c,
            Err(e) => {
                let _ = tx.send(JsEvent::FetchComplete(id, Err(e.to_string())));
                return;
            }
        };
        let req = match method.as_str() {
            "GET" => client.get(&resolved),
            "POST" => client.post(&resolved),
            "PUT" => client.put(&resolved),
            "DELETE" => client.delete(&resolved),
            "PATCH" => client.patch(&resolved),
            "HEAD" => client.head(&resolved),
            _ => client.get(&resolved),
        };
        let req = if let Some(b) = body { req.body(b) } else { req };

        match req.send().await {
            Ok(resp) => {
                let status = resp.status().as_u16();
                let body = resp.text().await.unwrap_or_default();
                let _ = tx.send(JsEvent::FetchComplete(id, Ok(format!("{}\n{}", status, body))));
            }
            Err(e) => {
                let _ = tx.send(JsEvent::FetchComplete(id, Err(e.to_string())));
            }
        }
    });

    Ok(JsValue::from(promise))
}

fn resolve_url(context: &Context, url: &str) -> Option<String> {
    let globals = context.global_object();
    let location = globals.get(js_string!("location"), &mut Context::default()).ok()?;
    let href = location.as_object()?.get(js_string!("href"), &mut Context::default()).ok()?;
    let base = href.as_string()?.to_std_string().ok()?;
    url::Url::parse(&base).ok()?.join(url).ok().map(|u| u.to_string())
}

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------

fn storage_alloc() -> &'static Mutex<HashMap<String, String>> {
    static STORE: OnceLock<Mutex<HashMap<String, String>>> = OnceLock::new();
    STORE.get_or_init(|| Mutex::new(HashMap::new()))
}

fn storage_session() -> &'static Mutex<HashMap<String, String>> {
    static STORE: OnceLock<Mutex<HashMap<String, String>>> = OnceLock::new();
    STORE.get_or_init(|| Mutex::new(HashMap::new()))
}

fn build_storage_object(context: &mut Context, store: fn() -> &'static Mutex<HashMap<String, String>>) -> boa_engine::JsObject {
    ObjectInitializer::new(context)
        .function(
            NativeFunction::from_copy_closure(move |_: &JsValue, args: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
                let key = args.get_or_undefined(0).as_string().and_then(|s| s.to_std_string().ok()).unwrap_or_default();
                Ok(store().lock().unwrap().get(&key).cloned().map(|s| jsval_from_string(&s)).unwrap_or(JsValue::null()))
            }),
            js_string!("getItem"),
            1,
        )
        .function(
            NativeFunction::from_copy_closure(move |_: &JsValue, args: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
                let key = args.get_or_undefined(0).as_string().and_then(|s| s.to_std_string().ok()).unwrap_or_default();
                let value = args.get(1).and_then(|v| v.as_string()).and_then(|s| s.to_std_string().ok()).unwrap_or_default();
                store().lock().unwrap().insert(key, value);
                Ok(JsValue::undefined())
            }),
            js_string!("setItem"),
            2,
        )
        .function(
            NativeFunction::from_copy_closure(move |_: &JsValue, args: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
                let key = args.get_or_undefined(0).as_string().and_then(|s| s.to_std_string().ok()).unwrap_or_default();
                store().lock().unwrap().remove(&key);
                Ok(JsValue::undefined())
            }),
            js_string!("removeItem"),
            1,
        )
        .function(
            NativeFunction::from_copy_closure(move |_: &JsValue, _: &[JsValue], _: &mut Context| -> JsResult<JsValue> {
                store().lock().unwrap().clear();
                Ok(JsValue::undefined())
            }),
            js_string!("clear"),
            0,
        )
        .property(js_string!("length"), 0, Attribute::all())
        .build()
}

// ---------------------------------------------------------------------------
// Location object
// ---------------------------------------------------------------------------

fn create_location(context: &mut Context, url_str: &str) -> boa_engine::JsObject {
    let parsed = url::Url::parse(url_str).ok();
    let mut loc = ObjectInitializer::new(context);

    let href = parsed.as_ref().map(|u| u.as_str()).unwrap_or(url_str);
    loc.property(js_string!("href"), jsval_from_string(href), Attribute::all());
    loc.property(js_string!("origin"), jsval_from_string(&parsed.as_ref().map(|u| u.origin().ascii_serialization()).unwrap_or_default()), Attribute::all());
    loc.property(js_string!("protocol"), jsval_from_string(&parsed.as_ref().map(|u| format!("{}:", u.scheme())).unwrap_or_default()), Attribute::all());
    loc.property(js_string!("host"), jsval_from_string(parsed.as_ref().and_then(|u| u.host_str()).unwrap_or("")), Attribute::all());
    loc.property(js_string!("hostname"), jsval_from_string(parsed.as_ref().and_then(|u| u.host_str()).unwrap_or("")), Attribute::all());
    loc.property(js_string!("port"), jsval_from_string(&parsed.as_ref().and_then(|u| u.port().map(|p| p.to_string())).unwrap_or_default()), Attribute::all());
    loc.property(js_string!("pathname"), jsval_from_string(parsed.as_ref().map(|u| u.path()).unwrap_or("/")), Attribute::all());
    loc.property(js_string!("search"), jsval_from_string(&parsed.as_ref().and_then(|u| u.query().map(|q| format!("?{}", q))).unwrap_or_default()), Attribute::all());
    loc.property(js_string!("hash"), jsval_from_string(&parsed.as_ref().and_then(|u| u.fragment().map(|f| format!("#{}", f))).unwrap_or_default()), Attribute::all());

    loc.build()
}

// ---------------------------------------------------------------------------
// JsRuntime
// ---------------------------------------------------------------------------

pub struct JsRuntime {
    pub context: Context,
}

impl JsRuntime {
    pub fn new(document_handle: Handle, page_url: &str) -> Result<Self, anyhow::Error> {
        let mut context = Context::default();

        setup_document(&mut context, document_handle)
            .map_err(|e| anyhow::anyhow!("{}", e))?;

        // console
        let console = ObjectInitializer::new(&mut context)
            .function(NativeFunction::from_fn_ptr(console_log), js_string!("log"), 1)
            .build();
        context.register_global_property(js_string!("console"), console, Attribute::all())
            .map_err(|e| anyhow::anyhow!("{}", e))?;

        // location
        let location = create_location(&mut context, page_url);
        context.register_global_property(js_string!("location"), location.clone(), Attribute::all())
            .map_err(|e| anyhow::anyhow!("{}", e))?;

        // window — alias to globalThis
        let window = context.global_object().clone();
        context.register_global_property(js_string!("window"), window.clone(), Attribute::all())
            .map_err(|e| anyhow::anyhow!("{}", e))?;
        let _ = window.set(js_string!("location"), location, false, &mut context);
        let _ = window.set(js_string!("innerWidth"), 1024, false, &mut context);
        let _ = window.set(js_string!("innerHeight"), 768, false, &mut context);
        let _ = window.set(js_string!("scrollX"), 0, false, &mut context);
        let _ = window.set(js_string!("scrollY"), 0, false, &mut context);
        let _ = window.set(js_string!("pageXOffset"), 0, false, &mut context);
        let _ = window.set(js_string!("pageYOffset"), 0, false, &mut context);

        let noop = NativeFunction::from_fn_ptr(|_, _, _| Ok(JsValue::undefined()));
        let _ = window.set(js_string!("scrollTo"),
            FunctionObjectBuilder::new(context.realm(), noop.clone()).name("scrollTo").length(0).constructor(false).build(),
            false, &mut context);
        let _ = window.set(js_string!("scrollBy"),
            FunctionObjectBuilder::new(context.realm(), noop).name("scrollBy").length(0).constructor(false).build(),
            false, &mut context);

        // getComputedStyle
        context.register_global_property(
            js_string!("getComputedStyle"),
            FunctionObjectBuilder::new(context.realm(), NativeFunction::from_fn_ptr(getComputedStyle_impl))
                .name("getComputedStyle").length(2).constructor(false).build(),
            Attribute::all(),
        ).map_err(|e| anyhow::anyhow!("{}", e))?;

        // matchMedia
        context.register_global_property(
            js_string!("matchMedia"),
            FunctionObjectBuilder::new(context.realm(), NativeFunction::from_fn_ptr(matchMedia_impl))
                .name("matchMedia").length(1).constructor(false).build(),
            Attribute::all(),
        ).map_err(|e| anyhow::anyhow!("{}", e))?;

        // Timers
        context.register_global_property(
            js_string!("setTimeout"),
            FunctionObjectBuilder::new(context.realm(), NativeFunction::from_fn_ptr(setTimeout_impl))
                .name("setTimeout").length(2).constructor(false).build(),
            Attribute::all(),
        ).map_err(|e| anyhow::anyhow!("{}", e))?;
        context.register_global_property(
            js_string!("clearTimeout"),
            FunctionObjectBuilder::new(context.realm(), NativeFunction::from_fn_ptr(clearTimeout_impl))
                .name("clearTimeout").length(1).constructor(false).build(),
            Attribute::all(),
        ).map_err(|e| anyhow::anyhow!("{}", e))?;
        context.register_global_property(
            js_string!("setInterval"),
            FunctionObjectBuilder::new(context.realm(), NativeFunction::from_fn_ptr(setInterval_impl))
                .name("setInterval").length(2).constructor(false).build(),
            Attribute::all(),
        ).map_err(|e| anyhow::anyhow!("{}", e))?;
        context.register_global_property(
            js_string!("clearInterval"),
            FunctionObjectBuilder::new(context.realm(), NativeFunction::from_fn_ptr(clearInterval_impl))
                .name("clearInterval").length(1).constructor(false).build(),
            Attribute::all(),
        ).map_err(|e| anyhow::anyhow!("{}", e))?;

        // requestAnimationFrame
        context.register_global_property(
            js_string!("requestAnimationFrame"),
            FunctionObjectBuilder::new(context.realm(), NativeFunction::from_fn_ptr(requestAnimationFrame_impl))
                .name("requestAnimationFrame").length(1).constructor(false).build(),
            Attribute::all(),
        ).map_err(|e| anyhow::anyhow!("{}", e))?;

        // cancelAnimationFrame
        context.register_global_property(
            js_string!("cancelAnimationFrame"),
            FunctionObjectBuilder::new(context.realm(), NativeFunction::from_fn_ptr(cancelAnimationFrame_impl))
                .name("cancelAnimationFrame").length(1).constructor(false).build(),
            Attribute::all(),
        ).map_err(|e| anyhow::anyhow!("{}", e))?;

        // localStorage / sessionStorage
        let ls = build_storage_object(&mut context, storage_alloc);
        context.register_global_property(js_string!("localStorage"), ls, Attribute::all())
            .map_err(|e| anyhow::anyhow!("{}", e))?;
        let ss = build_storage_object(&mut context, storage_session);
        context.register_global_property(js_string!("sessionStorage"), ss, Attribute::all())
            .map_err(|e| anyhow::anyhow!("{}", e))?;

        // fetch
        context.register_global_property(
            js_string!("fetch"),
            FunctionObjectBuilder::new(context.realm(), NativeFunction::from_fn_ptr(fetch_impl))
                .name("fetch").length(1).constructor(false).build(),
            Attribute::all(),
        ).map_err(|e| anyhow::anyhow!("{}", e))?;

        // navigator
        let navigator = ObjectInitializer::new(&mut context)
            .property(js_string!("userAgent"), js_string!("Browserverless/1.0"), Attribute::all())
            .property(js_string!("platform"), js_string!(""), Attribute::all())
            .property(js_string!("language"), js_string!("en-US"), Attribute::all())
            .property(js_string!("cookieEnabled"), true, Attribute::all())
            .build();
        context.register_global_property(js_string!("navigator"), navigator, Attribute::all())
            .map_err(|e| anyhow::anyhow!("{}", e))?;

        // MutationObserver
        let mutation_observer_impl = NativeFunction::from_fn_ptr(|_this: &JsValue, _args: &[JsValue], context: &mut Context| -> JsResult<JsValue> {
            let obj = ObjectInitializer::new(context)
                .function(
                    NativeFunction::from_fn_ptr(|_, _, _| Ok(JsValue::undefined())),
                    js_string!("observe"), 2,
                )
                .function(
                    NativeFunction::from_fn_ptr(|_, _, _| Ok(JsValue::undefined())),
                    js_string!("disconnect"), 0,
                )
                .function(
                    NativeFunction::from_fn_ptr(|_, _, _| Ok(JsValue::undefined())),
                    js_string!("takeRecords"), 0,
                )
                .build();
            Ok(JsValue::from(obj))
        });
        context.register_global_property(
            js_string!("MutationObserver"),
            FunctionObjectBuilder::new(context.realm(), mutation_observer_impl)
                .name("MutationObserver").length(1).constructor(true).build(),
            Attribute::all(),
        ).map_err(|e| anyhow::anyhow!("{}", e))?;

        // Polyfills
        inject_polyfills(&mut context);

        Ok(Self { context })
    }

    pub fn execute(&mut self, script: &str) -> Result<(), anyhow::Error> {
        let script = script.trim();
        if script.is_empty() {
            return Ok(());
        }

        let source = Source::from_bytes(script.as_bytes()).with_path(Path::new("inline"));
        let result = self.context.eval(source);
        match result {
            Ok(_) => Ok(()),
            Err(e) => {
                let wrapped = format!("({})", script);
                let wrapped_source = Source::from_bytes(wrapped.as_bytes()).with_path(Path::new("inline"));
                if self.context.eval(wrapped_source).is_ok() {
                    return Ok(());
                }
                let preview: String = script.chars().take(200).collect();
                let ellipsis = if script.len() > 200 { "..." } else { "" };
                eprintln!("Script error: {}", e);
                eprintln!("  Script preview (first 200 chars): {}{}", preview, ellipsis);
                eprintln!("  Script length: {} bytes", script.len());
                Ok(())
            }
        }
    }

    pub fn idle(&mut self, wait_ms: u64) -> Result<(), anyhow::Error> {
        let deadline = std::time::Instant::now() + Duration::from_secs(60);
        let mut last_activity = std::time::Instant::now();
        let mut idle_cycles = 0;

        loop {
            let prev_timeouts = ACTIVE_TIMEOUTS.load(Ordering::Relaxed);
            let prev_fetches = ACTIVE_FETCHES.load(Ordering::Relaxed);

            self.process_events();
            let _ = self.context.run_jobs();

            let timeouts = ACTIVE_TIMEOUTS.load(Ordering::Relaxed);
            let fetches = ACTIVE_FETCHES.load(Ordering::Relaxed);

            if timeouts != prev_timeouts || fetches != prev_fetches {
                last_activity = std::time::Instant::now();
            }

            if timeouts == 0 && fetches == 0 {
                if last_activity.elapsed() >= Duration::from_millis(5000) {
                    eprint!("\r  ✅ Idle ({:.1}s)                               ", last_activity.elapsed().as_secs_f32());
                    break;
                }
                idle_cycles += 1;
                let dots = (idle_cycles / 10) % 4;
                eprint!("\r  🌀 Idle waiting{}{} timeouts={} fetches={}", ".".repeat(dots), " ".repeat(3 - dots), timeouts, fetches);
            } else {
                idle_cycles = 0;
                eprint!("\r  ⏳ Busy... timeouts={} fetches={}", timeouts, fetches);
            }

            if std::time::Instant::now() >= deadline {
                eprintln!("\n  ⏰ Idle deadline reached (60s)");
                break;
            }

            std::thread::sleep(Duration::from_millis(50));
        }
        eprintln!();

        if wait_ms > 0 {
            eprintln!("  ⏰ Waiting extra {}ms for lazy content...", wait_ms);
            std::thread::sleep(Duration::from_millis(wait_ms));
        }

        Ok(())
    }

    fn process_events(&mut self) {
        let rx = event_channel().1.lock().unwrap();
        while let Ok(event) = rx.try_recv() {
            match event {
                JsEvent::TimerFired(id) => {
                    let func = TIMER_CALLBACKS.with(|cbs| cbs.borrow_mut().remove(&id));
                    if let Some(func) = func {
                        ACTIVE_TIMEOUTS.fetch_sub(1, Ordering::Relaxed);
                        if let Some(obj) = func.as_object() {
                            let _ = obj.clone().call(&JsValue::undefined(), &[], &mut self.context);
                        }
                    }
                }
                JsEvent::FetchComplete(id, result) => {
                    let resolve = FETCH_RESOLVERS.with(|r| r.borrow_mut().remove(&id));
                    let reject = FETCH_REJECTORS.with(|r| r.borrow_mut().remove(&id));
                    if resolve.is_some() {
                        ACTIVE_FETCHES.fetch_sub(1, Ordering::Relaxed);
                        match &result {
                            Ok(response) => {
                                if let Some(resolve) = resolve {
                                    if let Some(obj) = resolve.as_object() {
                                        let _ = obj.clone().call(&JsValue::undefined(), &[jsval_from_string(response)], &mut self.context);
                                    }
                                }
                            }
                            Err(err) => {
                                if let Some(reject) = reject {
                                    if let Some(obj) = reject.as_object() {
                                        let _ = obj.clone().call(&JsValue::undefined(), &[jsval_from_string(err)], &mut self.context);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// ---------------------------------------------------------------------------
// Polyfills
// ---------------------------------------------------------------------------

fn inject_polyfills(context: &mut Context) {
    eprintln!("  🔧 Injecting polyfills...");
    let polyfill = r#"
if (typeof globalThis.self === 'undefined') {
    globalThis.self = globalThis;
}
if (typeof globalThis.Image === 'undefined') {
    globalThis.Image = function(width, height) {
        var img = document.createElement('img');
        if (width !== undefined) img.setAttribute('width', width);
        if (height !== undefined) img.setAttribute('height', height);
        return img;
    };
}
if (typeof globalThis.alert === 'undefined') {
    globalThis.alert = function(msg) { console.log(String(msg)); };
    globalThis.confirm = function() { return true; };
    globalThis.prompt = function(msg, def) { return def || null; };
    globalThis.open = function() { return null; };
}
if (typeof globalThis.Event === 'undefined') {
    globalThis.Event = function(type, opts) {
        opts = opts || {};
        return { type: type, bubbles: opts.bubbles || false, cancelable: opts.cancelable || false, defaultPrevented: false, target: null, currentTarget: null, preventDefault: function() { this.defaultPrevented = true; }, stopPropagation: function() {} };
    };
    globalThis.CustomEvent = function(type, opts) {
        opts = opts || {};
        var ev = new globalThis.Event(type, opts);
        ev.detail = opts.detail || null;
        return ev;
    };
}
if (typeof globalThis.HTMLElement === 'undefined') {
    globalThis.HTMLElement = function() {};
}
// HTMLScriptElement needed by Instagram's ServerJSPayloadListener
if (typeof globalThis.HTMLScriptElement === 'undefined') {
    globalThis.HTMLScriptElement = function() {};
    globalThis.HTMLScriptElement.prototype = Object.create(globalThis.HTMLElement.prototype);
}
if (typeof Symbol !== 'undefined' && Symbol.hasInstance) {
    globalThis.HTMLScriptElement[Symbol.hasInstance] = function(instance) {
        return instance && instance.tagName === 'SCRIPT';
    };
}
// HTMLStyleElement needed by Comet
if (typeof globalThis.HTMLStyleElement === 'undefined') {
    globalThis.HTMLStyleElement = function() {};
    globalThis.HTMLStyleElement.prototype = Object.create(globalThis.HTMLElement.prototype);
}
if (typeof Symbol !== 'undefined' && Symbol.hasInstance) {
    globalThis.HTMLStyleElement[Symbol.hasInstance] = function(instance) {
        return instance && instance.tagName === 'STYLE';
    };
}
// HTMLLinkElement needed for preload detection
if (typeof globalThis.HTMLLinkElement === 'undefined') {
    globalThis.HTMLLinkElement = function() {};
    globalThis.HTMLLinkElement.prototype = Object.create(globalThis.HTMLElement.prototype);
}
if (typeof Symbol !== 'undefined' && Symbol.hasInstance) {
    globalThis.HTMLLinkElement[Symbol.hasInstance] = function(instance) {
        return instance && instance.tagName === 'LINK';
    };
}
if (typeof globalThis.AbortController === 'undefined') {
    globalThis.AbortController = function() {
        this.signal = { aborted: false, onabort: null, addEventListener: function() {}, removeEventListener: function() {}, dispatchEvent: function() { return true; } };
        this.abort = function() { this.signal.aborted = true; if (this.signal.onabort) this.signal.onabort(); };
    };
}
var _nativeFetch = globalThis.fetch;
if (_nativeFetch && !globalThis._fetchWrapped) {
    globalThis._fetchWrapped = true;
    globalThis.fetch = function(url, init) {
        return _nativeFetch(url, init).then(function(raw) {
            var status = 200;
            var body = raw;
            var newlineIdx = raw.indexOf('\n');
            if (newlineIdx > 0 && newlineIdx <= 4) {
                var n = parseInt(raw.substring(0, newlineIdx), 10);
                if (!isNaN(n)) { status = n; body = raw.substring(newlineIdx + 1); }
            }
            return {
                ok: status >= 200 && status < 300,
                status: status,
                statusText: status === 200 ? 'OK' : 'Error',
                url: typeof url === 'string' ? url : '',
                headers: {},
                redirected: false,
                type: 'basic',
                text: function() { return Promise.resolve(body); },
                json: function() { return Promise.resolve(JSON.parse(body)); }
            };
        });
    };
}
// Make querySelectorAll results iterable (for...of support) and fix prototype chain for instanceof checks
if (typeof document !== 'undefined' && document.querySelectorAll) {
    var _origQSA = document.querySelectorAll;
    document.querySelectorAll = function(sel) {
        var result = _origQSA.call(this, sel);
        if (result) {
            // Patch prototype chain for instanceof checks
            for (var pi = 0; pi < result.length; pi++) {
                var pel = result[pi];
                if (pel && pel.tagName) {
                    var ctor = globalThis['HTML' + pel.tagName.charAt(0) + pel.tagName.slice(1).toLowerCase() + 'Element'];
                    if (ctor && !(pel instanceof ctor)) {
                        try { pel.__proto__ = ctor.prototype; } catch(e) {}
                    }
                }
            }
            // Add Symbol.iterator if missing
            if (typeof result[Symbol.iterator] === 'undefined') {
                result[Symbol.iterator] = function() {
                    var items = this;
                    var idx = 0;
                    return {
                        next: function() {
                            if (idx < items.length) {
                                return { value: items[idx++], done: false };
                            }
                            return { value: undefined, done: true };
                        }
                    };
                };
            }
        }
        return result;
    };
}
"#;
    let _ = context.eval(Source::from_bytes(polyfill.as_bytes()));
}

/// Processes Instagram's module bootstrapping: creates ServerJSPayloadListener,
/// processes __rl_stub queue, and fires DOMContentLoaded.
pub fn process_instagram_modules(context: &mut Context) {
    let post_script = r#"
// Process data-sjs scripts using window.require (Bootloader module registry)
if (typeof window.require === 'function') {
    var scripts = document.querySelectorAll('script[type="application/json"][data-sjs]:not([data-processed])');
    for (var si = 0; si < scripts.length; si++) {
        var ms = scripts[si];
        try {
            var raw = ms.textContent || '';
            var data = JSON.parse(raw);
            if (data && data.require && Array.isArray(data.require)) {
                for (var rj = 0; rj < data.require.length; rj++) {
                    var entry = data.require[rj];
                    if (Array.isArray(entry) && entry.length >= 2) {
                        var modName = entry[0];
                        var method = entry[1];
                        var args = entry.slice(3);
                        var mod = null;
                        try { mod = window.require(modName); } catch(e) {}
                        if (mod && typeof method === 'string' && typeof mod[method] === 'function') {
                            mod[method].apply(mod, args);
                        } else if (mod && method === null && typeof mod === 'function') {
                            mod.apply(null, args.length > 0 ? args[0] : []);
                        }
                    }
                }
            }
            ms.setAttribute('data-processed', '');
        } catch(e) {}
    }
}
// Fire DOMContentLoaded
try {
    var event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
} catch(e) {}
// Reveal SSR content: remove content-visibility:hidden from mount divs
try {
    var allDivs = document.querySelectorAll('div');
    for (var di = 0; di < allDivs.length; di++) {
        var d = allDivs[di];
        var id = d.id || '';
        if (id.indexOf('mount_0') === 0 || id.indexOf('ssr') === 0) {
            var style = d.getAttribute('style') || '';
            if (style.indexOf('content-visibility:hidden') >= 0 || style.indexOf('visibility:hidden') >= 0) {
                d.setAttribute('style', style.replace(/content-visibility:\s*hidden\s*;?\s*/g, '').replace(/visibility:\s*hidden\s*;?\s*/g, ''));
            }
        }
    }
} catch(e) {}
"#;
    let result = context.eval(Source::from_bytes(post_script.as_bytes()));
    if let Err(e) = result {
        eprintln!("[process_instagram_modules] Error: {}", e);
    }
}
