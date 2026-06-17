use rquickjs::{Context, Runtime, Object, Function};
use anyhow::Result;
use markup5ever_rcdom::Handle;
use crate::browser::dom::JsDocument;

pub struct JsRuntime {
    pub runtime: Runtime,
    pub context: Context,
}

impl JsRuntime {
    pub fn new(document_handle: Handle) -> Result<Self> {
        let runtime = Runtime::new()?;
        let context = Context::full(&runtime)?;

        context.with(|ctx| {
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

            // setTimeout
            globals.set("setTimeout", Function::new(ctx.clone(), move |_f: Function, _delay: u64| {
                0
            })?)?;

            Ok::<(), anyhow::Error>(())
        })?;

        Ok(Self {
            runtime,
            context,
        })
    }

    pub fn execute(&self, script: &str) -> Result<()> {
        let script = script.trim();
        // Skip obvious data-only JSON scripts if they are not wrapped
        if script.starts_with('{') || script.starts_with('[') {
            return Ok(());
        }

        self.context.with(|ctx| {
            let res = ctx.eval::<rquickjs::Value, _>(script);
            if res.is_ok() {
                return Ok(());
            }

            // Try wrapping it
            let wrapped_script = format!("({})", script);
            if ctx.eval::<rquickjs::Value, _>(wrapped_script).is_ok() {
                return Ok(());
            }

            // Just log and ignore errors, as many scripts in SSR HTML are just data/require calls
            eprintln!("Ignoring script: {}", script.get(..20).unwrap_or(script));
            Ok(())
        })
    }
}
