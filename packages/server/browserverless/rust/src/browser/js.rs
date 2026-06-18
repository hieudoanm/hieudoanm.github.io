use anyhow::Result;
use crate::browser::dom::JsDocument;
use markup5ever_rcdom::Handle;
use reqwest::Client;
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

#[allow(non_snake_case)]
fn setInterval_impl<'js>(ctx: Ctx<'js>, f: Function<'js>, interval: u64) -> u32 {
    let id = NEXT_TIMER_ID.fetch_add(1, Ordering::Relaxed);
    let cancelled = Arc::new(AtomicBool::new(false));
    let guard = cancelled.clone();

    ctx.spawn(async move {
        loop {
            tokio::time::sleep(Duration::from_millis(interval)).await;
            if guard.load(Ordering::Relaxed) {
                break;
            }
            let _ = f.call::<_, ()>(());
        }
    });

    timers().lock().unwrap().insert(id, cancelled);
    id
}

#[allow(non_snake_case)]
fn clearInterval_impl(id: u32) {
    clearTimeout_impl(id);
}

#[allow(non_snake_case)]
fn requestAnimationFrame_impl<'js>(ctx: Ctx<'js>, f: Function<'js>) -> u32 {
    let id = NEXT_TIMER_ID.fetch_add(1, Ordering::Relaxed);
    let cancelled = Arc::new(AtomicBool::new(false));
    let guard = cancelled.clone();

    ctx.spawn(async move {
        tokio::time::sleep(Duration::from_millis(1)).await;
        if !guard.load(Ordering::Relaxed) {
            let _ = f.call::<_, ()>(());
        }
    });

    timers().lock().unwrap().insert(id, cancelled);
    id
}

#[allow(non_snake_case)]
fn cancelAnimationFrame_impl(id: u32) {
    clearTimeout_impl(id);
}

#[allow(non_snake_case)]
fn getComputedStyle_impl<'js>(ctx: Ctx<'js>, _el: rquickjs::Value<'js>, _pseudo: Option<String>) -> rquickjs::Result<Object<'js>> {
    let style = Object::new(ctx)?;
    Ok(style)
}

#[allow(non_snake_case)]
fn matchMedia_impl<'js>(ctx: Ctx<'js>, _query: String) -> rquickjs::Result<Object<'js>> {
    let mm = Object::new(ctx)?;
    mm.set("matches", false)?;
    mm.set("media", _query)?;
    mm.set("addListener", Func::from(|_f: rquickjs::Function<'_>| {}))?;
    mm.set("removeListener", Func::from(|_f: rquickjs::Function<'_>| {}))?;
    mm.set("addEventListener", Func::from(|_event: String, _f: rquickjs::Function<'_>| {}))?;
    mm.set("removeEventListener", Func::from(|_event: String, _f: rquickjs::Function<'_>| {}))?;
    Ok(mm)
}

fn fetch_impl<'js>(ctx: Ctx<'js>, url: String, init: Option<Object<'js>>) -> rquickjs::Result<Promise<'js>> {
    let method = init.as_ref()
        .and_then(|o| o.get::<_, String>("method").ok())
        .unwrap_or_else(|| "GET".to_string());
    let req_body = init.as_ref()
        .and_then(|o| o.get::<_, String>("body").ok());

    // Resolve relative URLs against document base URL
    let resolved = globals_location_href(&ctx)
        .and_then(|base| url::Url::parse(&base).ok())
        .and_then(|base| base.join(&url).ok())
        .map(|u| u.to_string())
        .unwrap_or(url);

    rquickjs::Promise::wrap_future(&ctx, async move {
        let client = reqwest::Client::new();
        let req = match method.as_str() {
            "GET" => client.get(&resolved),
            "POST" => client.post(&resolved),
            "PUT" => client.put(&resolved),
            "DELETE" => client.delete(&resolved),
            "PATCH" => client.patch(&resolved),
            "HEAD" => client.head(&resolved),
            _ => client.get(&resolved),
        };
        let req = if let Some(b) = req_body { req.body(b) } else { req };

        match req.send().await {
            Ok(resp) => {
                let status = resp.status().as_u16();
                let body = resp.text().await.unwrap_or_default();
                format!("{}\n{}", status, body)
            }
            Err(e) => {
                eprintln!("fetch({}) failed: {}", resolved, e);
                format!("0\n")
            }
        }
    })
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
                let _ = window.set("innerWidth", 1024);
                let _ = window.set("innerHeight", 768);
                let _ = window.set("scrollX", 0);
                let _ = window.set("scrollY", 0);
                let _ = window.set("pageXOffset", 0);
                let _ = window.set("pageYOffset", 0);
                let _ = window.set("scrollTo", Func::from(|| {}));
                let _ = window.set("scrollBy", Func::from(|| {}));
            }

            // getComputedStyle
            globals.set("getComputedStyle", Func::from(getComputedStyle_impl))?;

            // matchMedia
            globals.set("matchMedia", Func::from(matchMedia_impl))?;

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

            // setInterval
            globals.set("setInterval", Func::from(setInterval_impl))?;

            // clearInterval
            globals.set("clearInterval", Func::from(clearInterval_impl))?;

            // requestAnimationFrame
            globals.set("requestAnimationFrame", Func::from(requestAnimationFrame_impl))?;

            // cancelAnimationFrame
            globals.set("cancelAnimationFrame", Func::from(cancelAnimationFrame_impl))?;

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

            // Inject Image constructor, alert/confirm/prompt/open, fetch Response wrapper, Event, AbortController
            let browser_polyfill = r#"
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
"#;
            let _ = ctx.eval::<rquickjs::Value, _>(browser_polyfill);

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
            let err_msg = format!("{}", res.unwrap_err());

            let wrapped_script = format!("({})", script);
            if ctx.eval::<rquickjs::Value, _>(wrapped_script).is_ok() {
                return Ok(());
            }

            eprintln!("Script error: {}", err_msg);
            Ok(())
        }).await
    }

    pub async fn idle(&self) -> Result<()> {
        tokio::time::timeout(Duration::from_secs(30), self.runtime.idle())
            .await
            .map_err(|_| anyhow::anyhow!("Timeout waiting for page to become idle"))?;

        // Debounce: wait up to 500ms for DOM mutations from settling callbacks
        let start = tokio::time::Instant::now();
        while start.elapsed() < Duration::from_millis(500) {
            tokio::time::sleep(Duration::from_millis(50)).await;
            let _ = tokio::time::timeout(Duration::from_millis(10), self.runtime.idle()).await;
        }
        Ok(())
    }
}
