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
    rquickjs::Promise::wrap_future(&ctx, do_fetch(url))
}

pub struct JsRuntime {
    pub runtime: AsyncRuntime,
    pub context: AsyncContext,
}

impl JsRuntime {
    pub async fn new(document_handle: Handle) -> Result<Self> {
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

            // setTimeout — drives callback after delay via spawned future
            globals.set("setTimeout", Func::from(setTimeout_impl))?;

            // clearTimeout — aborts the spawned timer task
            globals.set("clearTimeout", Func::from(clearTimeout_impl))?;

            // fetch — returns a Promise that resolves with the response text
            globals.set("fetch", Func::from(fetch_impl))?;

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
