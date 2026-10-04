mod commands;
pub mod domain;
mod error;
mod services;
mod state;

use state::AppState;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let app_dir = app.path().app_data_dir()?;
            std::fs::create_dir_all(&app_dir)?;
            app.manage(AppState::new(app_dir));
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
            commands::settings::get_settings,
            commands::settings::update_settings,
            commands::settings::pick_project_folder,
            commands::settings::check_setup,
            commands::overview::get_overview,
            commands::runs::list_runs,
            commands::runs::read_run,
            commands::runs::read_text_file,
            commands::runs::list_run_statuses,
            commands::launch::launch_run,
            commands::launch::cancel_run,
            commands::launch::launcher_status,
            commands::dataset::read_cohort,
            commands::dataset::read_rigour,
            commands::dataset::list_configs,
            commands::dataset::list_participant_assets
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
