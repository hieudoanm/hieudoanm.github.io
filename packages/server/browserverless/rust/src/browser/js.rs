use anyhow::Result;
use crate::browser::dom::JsDocument;
use markup5ever_rcdom::Handle;
use rquickjs::{AsyncContext, AsyncRuntime, Ctx, Function, Object, Promise};
use rquickjs::prelude::Func;
use std::collections::HashMap;
use std::sync::atomic::{AtomicBool, AtomicU32, Ordering};
use std::sync::{Arc, Mutex};
use std::time::Duration;

static NEXT_TIMER_ID: AtomicU32 = AtomicU32::new(1);

fn timers() -> &'static Mutex<HashMap<u32, Arc<AtomicBool>>> {
    static TIMERS: std::sync::OnceLock<Mutex<HashMap<u32, Arc<AtomicBool>>>> = std::sync::OnceLock::new();
    TIMERS.get_or_init(|| Mutex::new(HashMap::new()))
}

#[allow(non_snake_case)]
fn setTimeout_impl<'js>(ctx: Ctx<'js>, f: Function<'js>, delay: u64) -> u32 {
    let id = NEXT_TIMER_ID.fetch_add(1, Ordering::Relaxed);
    let cancelled = Arc::new(AtomicBool::new(false));
    let guard = cancelled.clone();

    ctx.spawn(async move {
        tokio::time::sleep(Duration::from_millis(delay)).await;
        if !guard.load(Ordering::Relaxed) {
            let _ = f.call::<_, ()>(());
        }
    });

    timers().lock().unwrap().insert(id, cancelled);
    id
}

#[allow(non_snake_case)]
fn clearTimeout_impl(id: u32) {
    if let Some(cancelled) = timers().lock().unwrap().remove(&id) {
        cancelled.store(true, Ordering::Relaxed);
    }
}

fn fetch_impl<'js>(ctx: Ctx<'js>, url: String) -> rquickjs::Result<Promise<'js>> {
    async fn do_fetch(url: String) -> String {
        match reqwest::get(&url).await {
            Ok(resp) => resp.text().await.unwrap_or_default(),
            Err(e) => {
                eprintln!("fetch({}) failed: {}", url, e);
                String::new()
            }
        }
    }

    // Resolve relative URLs against document base URL
    let resolved = globals_location_href(&ctx)
        .and_then(|base| url::Url::parse(&base).ok())
        .and_then(|base| base.join(&url).ok())
        .map(|u| u.to_string())
        .unwrap_or(url);

    rquickjs::Promise::wrap_future(&ctx, do_fetch(resolved))
}

fn globals_location_href(ctx: &Ctx<'_>) -> Option<String> {
    let globals = ctx.globals();
    let location: Object = globals.get("location").ok()?;
    location.get("href").ok()
}

fn local_storage() -> &'static Mutex<HashMap<String, String>> {
    static STORE: std::sync::OnceLock<Mutex<HashMap<String, String>>> = std::sync::OnceLock::new();
    STORE.get_or_init(|| Mutex::new(HashMap::new()))
}

fn session_storage() -> &'static Mutex<HashMap<String, String>> {
    static STORE: std::sync::OnceLock<Mutex<HashMap<String, String>>> = std::sync::OnceLock::new();
    STORE.get_or_init(|| Mutex::new(HashMap::new()))
}

fn create_storage<'js>(ctx: &Ctx<'js>, store: fn() -> &'static Mutex<HashMap<String, String>>) -> rquickjs::Result<Object<'js>> {
    let storage = Object::new(ctx.clone())?;

    let _ = storage.set("getItem", Func::from(move |key: String| -> Option<String> {
        store().lock().unwrap().get(&key).cloned()
    }));

    let _ = storage.set("setItem", Func::from(move |key: String, value: String| {
        store().lock().unwrap().insert(key, value);
    }));

    let _ = storage.set("removeItem", Func::from(move |key: String| {
        store().lock().unwrap().remove(&key);
    }));

    let _ = storage.set("clear", Func::from(move || {
        store().lock().unwrap().clear();
    }));

    let _ = storage.set("length", 0);

    Ok(storage)
}

fn create_location<'js>(ctx: &Ctx<'js>, url: &str) -> rquickjs::Result<Object<'js>> {
    let parsed = url::Url::parse(url).ok();
    let loc = Object::new(ctx.clone())?;

    let href = parsed.as_ref().map(|u| u.as_str()).unwrap_or(url);
    loc.set("href", href)?;
    loc.set("origin", parsed.as_ref().map(|u| u.origin().ascii_serialization()).unwrap_or_default())?;
    loc.set("protocol", parsed.as_ref().map(|u| u.scheme()).unwrap_or("").to_string() + ":")?;
    loc.set("host", parsed.as_ref().map(|u| u.host_str().unwrap_or("")).unwrap_or(""))?;
    loc.set("hostname", parsed.as_ref().map(|u| u.host_str().unwrap_or("")).unwrap_or(""))?;
    loc.set("port", parsed.as_ref().and_then(|u| u.port().map(|p| p.to_string())).unwrap_or_default())?;
    loc.set("pathname", parsed.as_ref().map(|u| u.path()).unwrap_or("/"))?;
    loc.set("search", parsed.as_ref().map(|u| u.query().map(|q| format!("?{}", q)).unwrap_or_default()).unwrap_or_default())?;
    loc.set("hash", parsed.as_ref().map(|u| u.fragment().map(|f| format!("#{}", f)).unwrap_or_default()).unwrap_or_default())?;

    Ok(loc)
}

pub struct JsRuntime {
    pub runtime: AsyncRuntime,
    pub context: AsyncContext,
}

impl JsRuntime {
    pub async fn new(document_handle: Handle, page_url: &str) -> Result<Self> {
        let runtime = AsyncRuntime::new()?;
        let context = AsyncContext::full(&runtime).await?;

        let _ = context.with(|ctx| {
            let globals = ctx.globals();

            // console.log
            let console = Object::new(ctx.clone())?;
            console.set("log", Function::new(ctx.clone(), |s: String| {
                println!("{}", s);
            })?)?;
            globals.set("console", console)?;

            // document
            let doc = JsDocument { handle: document_handle };
            globals.set("document", rquickjs::Class::instance(ctx.clone(), doc)?)?;

            // window — alias to globalThis
            let window_ref = globals.clone();
            globals.set("window", window_ref)?;

            // window.location
            let location = create_location(&ctx, page_url)?;
            globals.set("location", location.clone())?;
            if let Ok(window) = globals.get::<_, Object>("window") {
                let _ = window.set("location", location);
            }

            // localStorage
            if let Ok(storage) = create_storage(&ctx, local_storage) {
                globals.set("localStorage", storage)?;
            }

            // sessionStorage
            if let Ok(storage) = create_storage(&ctx, session_storage) {
                globals.set("sessionStorage", storage)?;
            }

            // setTimeout
            globals.set("setTimeout", Func::from(setTimeout_impl))?;

            // clearTimeout
            globals.set("clearTimeout", Func::from(clearTimeout_impl))?;

            // fetch
            globals.set("fetch", Func::from(fetch_impl))?;

            // Inject polyfills for Facebook module system
            let polyfill = r#"
if (typeof globalThis.requireLazy === 'undefined') {
    var __rlModules = {};
    function __processServerJS() {
        var scripts = document.querySelectorAll('script[type="application/json"][data-sjs]');
        for (var i = 0; i < scripts.length; i++) {
            try {
                var data = JSON.parse(scripts[i].textContent);
                if (data && data.require && Array.isArray(data.require)) {
                    for (var j = 0; j < data.require.length; j++) {
                        var entry = data.require[j];
                        if (Array.isArray(entry) && entry.length >= 2) {
                            var modName = entry[0];
                            var method = entry[1];
                            var context = entry[2];
                            var args = entry[3] || [];
                            var mod = globalThis[modName];
                            try {
                                if (mod && typeof mod[method] === 'function') {
                                    mod[method].apply(context, args);
                                }
                            } catch(e) {}
                        }
                    }
                }
            } catch(e) {}
        }
    }
    globalThis.requireLazy = function(modules, callback) {
        var resolved = modules.map(function(name) {
            if (typeof globalThis[name] !== 'undefined') return globalThis[name];
            if (!__rlModules[name]) {
                if (name === 'ServerJSProcessingListener') {
                    __rlModules[name] = { process: __processServerJS };
                } else {
                    __rlModules[name] = {};
                }
                globalThis[name] = __rlModules[name];
            }
            return __rlModules[name];
        });
        if (callback) {
            try { callback.apply(null, resolved); } catch(e) { console.log('requireLazy error:', e); }
        }
    };
    globalThis.define = function(name, deps, factory) {
        if (!factory) { factory = deps; deps = []; }
        var exports = {};
        var resolved = (deps || []).map(function(dep) { return globalThis[dep] || {}; });
        var result = factory.apply(null, resolved);
        var mod = result || exports;
        if (typeof name === 'string') { globalThis[name] = mod; }
        return mod;
    };
}
"#;
            let _ = ctx.eval::<rquickjs::Value, _>(polyfill);

            Ok::<(), anyhow::Error>(())
        }).await;

        Ok(Self { runtime, context })
    }

    pub async fn execute(&self, script: &str) -> Result<()> {
        let script = script.trim();
        if script.is_empty() {
            return Ok(());
        }

        self.context.with(|ctx| {
            let res = ctx.eval::<rquickjs::Value, _>(script);
            if res.is_ok() {
                return Ok(());
            }

            let wrapped_script = format!("({})", script);
            if ctx.eval::<rquickjs::Value, _>(wrapped_script).is_ok() {
                return Ok(());
            }

            eprintln!("Ignoring script: {}", &script[..script.len().min(20)]);
            Ok(())
        }).await
    }

    pub async fn idle(&self) -> Result<()> {
        tokio::time::timeout(Duration::from_secs(30), self.runtime.idle())
            .await
            .map_err(|_| anyhow::anyhow!("Timeout waiting for page to become idle"))?;
        Ok(())
    }
}
