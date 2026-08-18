use std::sync::Mutex;

use serde::Serialize;
use tauri::Manager;
use tauri_plugin_deep_link::DeepLinkExt;
use tauri_plugin_dialog::DialogExt;

#[derive(Serialize)]
struct SquadFile {
    name: String,
    content: String,
}

struct PendingDeepLinks(Mutex<Vec<String>>);

fn queue_deep_link(pending: &PendingDeepLinks, url: String) {
    let mut buffer = pending.0.lock().unwrap();
    if !buffer.contains(&url) {
        buffer.push(url);
    }
}

#[tauri::command]
fn open_squad_file(app: tauri::AppHandle) -> Result<Option<SquadFile>, String> {
    let picked = app
        .dialog()
        .file()
        .set_title("Open squad file")
        .add_filter("Squad file", &["json"])
        .blocking_pick_file();
    let Some(file) = picked else {
        return Ok(None);
    };
    let path = file.into_path().map_err(|err| err.to_string())?;
    let content = std::fs::read_to_string(&path).map_err(|err| err.to_string())?;
    let name = path
        .file_name()
        .map(|value| value.to_string_lossy().into_owned())
        .unwrap_or_else(|| "squad.squad.json".to_string());
    Ok(Some(SquadFile { name, content }))
}

#[tauri::command]
fn save_squad_file(
    app: tauri::AppHandle,
    default_name: String,
    content: String,
) -> Result<bool, String> {
    let picked = app
        .dialog()
        .file()
        .set_title("Save squad file")
        .set_file_name(&default_name)
        .add_filter("Squad file", &["json"])
        .blocking_save_file();
    let Some(file) = picked else {
        return Ok(false);
    };
    let path = file.into_path().map_err(|err| err.to_string())?;
    std::fs::write(&path, content)
        .map(|_| true)
        .map_err(|err| err.to_string())
}

#[tauri::command]
fn take_pending_deep_links(pending: tauri::State<PendingDeepLinks>) -> Vec<String> {
    std::mem::take(&mut *pending.0.lock().unwrap())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_deep_link::init())
        .manage(PendingDeepLinks(Mutex::new(Vec::new())))
        .setup(|app| {
            let pending = app.state::<PendingDeepLinks>();
            if let Ok(Some(urls)) = app.deep_link().get_current() {
                for url in urls {
                    queue_deep_link(&pending, url.to_string());
                }
            }

            let handle = app.handle().clone();
            app.deep_link().on_open_url(move |event| {
                let pending = handle.state::<PendingDeepLinks>();
                for url in event.urls() {
                    eprintln!("football: received deep link {url}");
                    queue_deep_link(&pending, url.to_string());
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            open_squad_file,
            save_squad_file,
            take_pending_deep_links
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
