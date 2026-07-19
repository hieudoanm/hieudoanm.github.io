//! Material-design slint key/value manager (the `gui` feature).
//! Mirrors the Go fyne GUI: key/search input, value input, Set/Refresh/
//! Delete All controls, a No|Key|Value|Edit|Copy|Delete table and a status
//! bar. The slint UI is compiled by build.rs from `src/gui/ui.slint`.

use crate::db::DB;
use slint::{ComponentHandle, SharedString, VecModel};
use std::cell::RefCell;
use std::rc::Rc;
use std::sync::{Arc, Mutex};

slint::include_modules!();

const MAX_VALUE_RUNES: usize = 80;

struct App {
    kv: Arc<DB>,
    ui: slint::Weak<MainWindow>,
    keys: RefCell<Vec<String>>,
    rows: Rc<VecModel<RowData>>,
}

#[allow(clippy::arc_with_non_send_sync)]
pub fn run(kv: Arc<DB>) -> anyhow::Result<()> {
    let ui = MainWindow::new().map_err(|e| anyhow::anyhow!("{e}"))?;
    let rows = Rc::new(VecModel::<RowData>::default());
    ui.set_rows(rows.clone().into());
    let app = Arc::new(Mutex::new(App {
        kv,
        ui: ui.as_weak(),
        keys: RefCell::new(Vec::new()),
        rows,
    }));
    app.lock().unwrap().refresh_rows();
    wire(&ui, &app);
    ui.run().map_err(|e| anyhow::anyhow!("{e}"))
}

impl App {
    fn refresh_rows(&self) {
        let query = self.ui_key_text().to_lowercase().trim().to_string();
        let all = self.kv.keys();
        let mut rows: Vec<RowData> = Vec::new();
        let mut keys: Vec<String> = Vec::new();
        for (no, key) in all.iter().enumerate() {
            let value = self.kv.get(key).unwrap_or_default();
            let keep = query.is_empty()
                || key.to_lowercase().contains(&query)
                || value.to_lowercase().contains(&query);
            if !keep {
                continue;
            }
            keys.push(key.clone());
            rows.push(RowData {
                index: no as i32,
                no: (no + 1).to_string().into(),
                key: key.clone().into(),
                value: truncate(&value, MAX_VALUE_RUNES).into(),
            });
        }
        *self.keys.borrow_mut() = keys;

        self.rows.clear();
        self.rows.extend(rows);
        self.ui_upgrade()
            .set_count_text(format!("count: {}", self.kv.len()).into());
    }

    fn do_set(&mut self) {
        let ui = self.ui_upgrade();
        let key = ui.get_key_text().to_string();
        if key.trim().is_empty() {
            ui.set_status_text("enter a key first".into());
            return;
        }
        let value = ui.get_value_text().to_string();
        let existed = self.kv.get(&key).is_some();
        self.kv.set(&key, &value);
        self.status(&format!(
            "{} {key}",
            if existed { "updated" } else { "set" }
        ));
        self.refresh_rows();
    }

    fn do_refresh(&mut self) {
        let ui = self.ui_upgrade();
        ui.set_key_text("".into());
        ui.set_value_text("".into());
        ui.set_status_text("refreshed".into());
        self.refresh_rows();
    }

    fn do_delete_all(&mut self) {
        let n = self.kv.flush();
        self.status(&format!("deleted {n} keys"));
        self.refresh_rows();
    }

    fn on_search(&mut self, text: SharedString) {
        self.ui_upgrade().set_key_text(text);
        self.refresh_rows();
    }

    fn row_edit(&mut self, index: i32) {
        let Some(key) = self.key_at(index) else {
            return;
        };
        match self.kv.get(&key) {
            Some(value) => {
                let ui = self.ui_upgrade();
                ui.set_key_text(key.clone().into());
                ui.set_value_text(value.into());
                self.status(&format!("loaded {key}"));
            }
            None => self.status(&format!("key not found: {key}")),
        }
    }

    fn row_copy(&mut self, index: i32) {
        let Some(key) = self.key_at(index) else {
            return;
        };
        match self.kv.get(&key) {
            Some(value) => {
                let result =
                    arboard::Clipboard::new().and_then(|mut cb| cb.set_text(value.clone()));
                match result {
                    Ok(()) => self.status(&format!("value copied for {key}")),
                    Err(_) => self.status(&format!("could not copy value for {key}")),
                }
            }
            None => self.status("key not found"),
        }
    }

    fn row_delete(&mut self, index: i32) {
        let Some(key) = self.key_at(index) else {
            return;
        };
        if self.kv.del(&key) {
            self.status(&format!("deleted {key}"));
            self.refresh_rows();
        } else {
            self.status(&format!("key not found: {key}"));
        }
    }

    fn key_at(&self, index: i32) -> Option<String> {
        self.keys.borrow().get(index as usize).cloned()
    }

    fn status(&self, msg: &str) {
        self.ui_upgrade().set_status_text(msg.into());
    }

    fn ui_key_text(&self) -> String {
        self.ui_upgrade().get_key_text().to_string()
    }

    fn ui_upgrade(&self) -> MainWindow {
        self.ui.upgrade().expect("window alive")
    }
}

fn wire(ui: &MainWindow, app: &Arc<Mutex<App>>) {
    let a = app.clone();
    ui.on_set_clicked(move || a.lock().unwrap().do_set());
    let a = app.clone();
    ui.on_refresh_clicked(move || a.lock().unwrap().do_refresh());
    let a = app.clone();
    ui.on_delete_all_clicked(move || a.lock().unwrap().do_delete_all());
    let a = app.clone();
    ui.on_search_changed(move |text: SharedString| a.lock().unwrap().on_search(text));
    let a = app.clone();
    ui.on_edit(move |index: i32| a.lock().unwrap().row_edit(index));
    let a = app.clone();
    ui.on_copy(move |index: i32| a.lock().unwrap().row_copy(index));
    let a = app.clone();
    ui.on_delete(move |index: i32| a.lock().unwrap().row_delete(index));
}

fn truncate(s: &str, max: usize) -> String {
    let runes: Vec<char> = s.chars().collect();
    if runes.len() <= max {
        return s.to_string();
    }
    format!("{}…", runes[..max].iter().collect::<String>())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn truncate_keeps_short_and_trims_long() {
        assert_eq!(truncate("hi", 80), "hi");
        assert_eq!(truncate("1234567890", 3), "123…");
    }

    #[test]
    fn truncate_counts_runes() {
        assert_eq!(truncate("héllo wörld", 6), "héllo …");
    }
}
