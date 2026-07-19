//! Material-design slint studio (the `gui` feature). Mirrors the Go fyne
//! editor: an editable YAML pane, page-type and theme pickers, and Load /
//! Generate / Validate / Build / Save / Copy HTML actions driven from Rust.
//! The slint UI is compiled by build.rs from `src/gui/ui.slint`.

use crate::config::Config;
use crate::themes::{named_themes, theme_by_name, theme_names};
use crate::{placeholder, render};
use anyhow::{anyhow, Result};
use slint::{ComponentHandle, SharedString, VecModel};
use std::cell::RefCell;
use std::rc::Rc;
use std::sync::{Arc, Mutex};

slint::include_modules!();

struct App {
    path: String,
    ui: slint::Weak<MainWindow>,
    last_html: RefCell<Option<String>>,
}

#[allow(clippy::arc_with_non_send_sync)]
pub fn run(path: Option<&str>) -> Result<()> {
    let ui = MainWindow::new().map_err(|e| anyhow!("{e}"))?;
    let types: Vec<SharedString> = crate::validate::KNOWN_TYPES
        .iter()
        .map(|s| (*s).into())
        .collect();
    ui.set_page_types(Rc::new(VecModel::from(types)).into());
    let names: Vec<SharedString> = theme_names().into_iter().map(Into::into).collect();
    ui.set_theme_names(Rc::new(VecModel::from(names)).into());
    ui.set_path_text(path.unwrap_or("landify.yaml").into());
    let app = Arc::new(Mutex::new(App {
        path: path.unwrap_or("landify.yaml").to_string(),
        ui: ui.as_weak(),
        last_html: RefCell::new(None),
    }));
    wire(&ui, &app);
    ui.run().map_err(|e| anyhow!("{e}"))
}

impl App {
    fn ui(&self) -> MainWindow {
        self.ui.upgrade().expect("window alive")
    }

    fn status(&self, msg: &str) {
        self.ui().set_status_text(msg.into());
    }

    fn load(&self) {
        match std::fs::read_to_string(&self.path) {
            Ok(text) => {
                self.ui().set_yaml_text(text.clone().into());
                self.status(&format!("Loaded {} ({} bytes)", self.path, text.len()));
            }
            Err(_) => self.status(&format!("could not read {}", self.path)),
        }
    }

    fn generate(&self) {
        let index = self.ui().get_page_type_index() as usize;
        let typ = crate::validate::KNOWN_TYPES[index];
        match placeholder::example(typ) {
            Ok(yaml) => {
                self.ui().set_yaml_text(yaml.into());
                self.status(&format!("Generated {typ} scaffold"));
            }
            Err(err) => self.status(&err.to_string()),
        }
    }

    fn validate(&self) {
        let text = self.ui().get_yaml_text().to_string();
        match Config::load(text.as_bytes()) {
            Ok(cfg) => {
                let errs = crate::validate::errors(&cfg);
                if errs.is_empty() {
                    self.status("valid");
                } else {
                    self.status(&format!("invalid:\n  - {}", errs.join("\n  - ")));
                }
            }
            Err(err) => self.status(&err.to_string()),
        }
    }

    fn build(&self) {
        let text = self.ui().get_yaml_text().to_string();
        let mut cfg = match Config::load(text.as_bytes()) {
            Ok(cfg) => cfg,
            Err(err) => {
                self.status(&err.to_string());
                return;
            }
        };
        let errs = crate::validate::errors(&cfg);
        if !errs.is_empty() {
            self.status(&format!("invalid:\n  - {}", errs.join("\n  - ")));
            return;
        }
        if let Some(theme) = theme_by_name(self.ui().get_theme_label().as_ref()) {
            cfg.theme = theme;
        }
        match render::render(&cfg) {
            Ok(bytes) => {
                let html = String::from_utf8(bytes.clone()).unwrap_or_default();
                *self.last_html.borrow_mut() = Some(html);
                self.status(&format!("Built {} bytes", bytes.len()));
            }
            Err(err) => self.status(&err.to_string()),
        }
    }

    fn save(&self) {
        let text = self.ui().get_yaml_text().to_string();
        match std::fs::write(&self.path, text.as_bytes()) {
            Ok(()) => self.status(&format!("Saved {}", self.path)),
            Err(_) => self.status(&format!("could not write {}", self.path)),
        }
    }

    fn copy_html(&self) {
        let html = match &*self.last_html.borrow() {
            Some(html) => html.clone(),
            None => match std::fs::read_to_string("index.html") {
                Ok(html) => html,
                Err(_) => {
                    self.status("build first");
                    return;
                }
            },
        };
        match arboard::Clipboard::new().and_then(|mut cb| cb.set_text(html.clone())) {
            Ok(()) => self.status(&format!("Copied {} bytes", html.len())),
            Err(_) => self.status("could not copy to clipboard"),
        }
    }
}

fn wire(ui: &MainWindow, app: &Arc<Mutex<App>>) {
    let a = app.clone();
    ui.on_load_clicked(move || a.lock().unwrap().load());
    let a = app.clone();
    ui.on_generate_clicked(move || a.lock().unwrap().generate());
    let a = app.clone();
    ui.on_validate_clicked(move || a.lock().unwrap().validate());
    let a = app.clone();
    ui.on_build_clicked(move || a.lock().unwrap().build());
    let a = app.clone();
    ui.on_save_clicked(move || a.lock().unwrap().save());
    let a = app.clone();
    ui.on_copy_clicked(move || a.lock().unwrap().copy_html());
    let a = app.clone();
    ui.on_page_type_changed(move |index: i32| {
        if let Ok(mutex) = a.lock() {
            let typ = crate::validate::KNOWN_TYPES[index as usize];
            mutex.ui().set_page_type_label((*typ).into());
        }
    });
    let a = app.clone();
    ui.on_theme_changed(move |index: i32| {
        if let Ok(mutex) = a.lock() {
            let names = named_themes();
            let label = names
                .get(index as usize)
                .map(|t| t.name)
                .unwrap_or_default();
            mutex.ui().set_theme_label(label.into());
        }
    });
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn builds_product_yaml_into_html() {
        let cfg =
            Config::load(include_bytes!("../../assets/examples/example-product.yaml")).unwrap();
        let html = render::render(&cfg).unwrap();
        assert!(html.starts_with(b"<!doctype html>"));
        assert!(html.ends_with(b"</html>\n"));
    }
}
