mod commands;

use commands::LaunchProject;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_notification::init())
    .plugin(tauri_plugin_updater::Builder::new().build())
    .setup(|app| {
      let launch_path = std::env::args()
        .nth(1)
        .filter(|arg| arg.ends_with(".brainbow"));
      app.manage(LaunchProject(launch_path));
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![
      commands::pick_project_file,
      commands::pick_image_files,
      commands::save_project_file,
      commands::read_launch_project
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
