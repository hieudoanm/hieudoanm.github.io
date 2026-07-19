use crate::jobs::JobManager;
use crate::store::Store;
use rusqlite::Connection;
use std::sync::{Arc, Mutex, MutexGuard};

pub struct AppState {
  pub db: Arc<Mutex<Connection>>,
  pub store: Store,
  pub jobs: JobManager,
}

impl AppState {
  pub fn new(connection: Connection, store: Store) -> Self {
    let db = Arc::new(Mutex::new(connection));
    let jobs = JobManager::new(Arc::clone(&db));
    Self { db, store, jobs }
  }

  pub fn lock(&self) -> MutexGuard<'_, Connection> {
    self
      .db
      .lock()
      .unwrap_or_else(|poisoned| poisoned.into_inner())
  }
}
