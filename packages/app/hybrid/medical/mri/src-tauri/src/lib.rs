pub mod analysis;
pub mod classifier;
pub mod commands;
pub mod commands_dicomweb;
pub mod commands_intel;
pub mod commands_models;
pub mod commands_workflow;
pub mod compare;
pub mod db;
pub mod dicomweb;
pub mod import_dicom;
pub mod import_nifti;
pub mod inference;
pub mod jobs;
pub mod models;
pub mod normalize;
pub mod pipeline;
pub mod process;
pub mod protocol;
pub mod provenance;
pub mod qc;
pub mod qc_stats;
pub mod registry;
pub mod state;
pub mod store;
pub mod viewer;
pub mod workspace;

use state::AppState;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_notification::init())
    .plugin(tauri_plugin_updater::Builder::new().build())
    .setup(|app| {
      let data_dir = app.path().app_data_dir()?;
      let workspace_root = data_dir.join("workspace");
      let store = store::Store::new(workspace_root.clone());
      store.ensure_root()?;
      let connection = db::open(&workspace_root.join("mri.db"))?;
      app.manage(AppState::new(connection, store));
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
      commands::pick_scan_files,
      commands::import_files,
      commands::list_datasets,
      commands::get_dataset_detail,
      commands::delete_dataset,
      commands::get_series_metadata,
      commands::get_provenance,
      commands::read_slice,
      commands_intel::get_study_analysis,
      commands_intel::list_protocols,
      commands_intel::create_protocol,
      commands_intel::delete_protocol,
      commands_intel::validate_dataset,
      commands_intel::run_qc,
      commands_intel::compare_compatibility,
      commands_workflow::create_pipeline,
      commands_workflow::list_pipelines,
      commands_workflow::delete_pipeline,
      commands_workflow::run_pipeline,
      commands_workflow::list_jobs,
      commands_workflow::get_job,
      commands_workflow::cancel_job,
      commands_workflow::retry_job,
      commands_models::register_model,
      commands_models::list_models,
      commands_models::delete_model,
      commands_models::is_runtime_available,
      commands_models::run_model,
      commands_dicomweb::add_dicomweb_server,
      commands_dicomweb::list_dicomweb_servers,
      commands_dicomweb::delete_dicomweb_server,
      commands_dicomweb::qido_studies,
      commands_dicomweb::qido_series,
      commands_dicomweb::wado_import_series,
      commands_dicomweb::stow_export_dataset
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
