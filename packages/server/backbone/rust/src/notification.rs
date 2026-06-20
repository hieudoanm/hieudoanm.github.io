use std::collections::HashMap;
use std::convert::Infallible;
use std::sync::Arc;
use std::time::Duration;

use axum::extract::State;
use axum::response::IntoResponse;
use axum::response::sse::{Event, Sse};
use tokio::sync::RwLock;
use tokio_stream::StreamExt;
use tokio_stream::wrappers::UnboundedReceiverStream;
use uuid::Uuid;

use crate::handlers::AppState;
use crate::models::Notification;

pub struct SSEClient {
    pub sender: tokio::sync::mpsc::UnboundedSender<String>,
}

pub struct SSEHub {
    pub clients: HashMap<String, SSEClient>,
}

pub fn new_sse_hub() -> Arc<RwLock<SSEHub>> {
    Arc::new(RwLock::new(SSEHub {
        clients: HashMap::new(),
    }))
}

pub fn validate_notification_type(ntype: &str) -> bool {
    matches!(ntype, "info" | "success" | "warning" | "error")
}

pub async fn broadcast_notification(state: &Arc<AppState>, notification: &Notification) {
    let json = serde_json::to_string(notification).unwrap_or_default();
    let msg = format!("data: {json}\n\n");
    let hub = state.sse_hub.read().await;
    for client in hub.clients.values() {
        let _ = client.sender.send(msg.clone());
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn new_sse_hub_creates_non_null_hub() {
        let hub = new_sse_hub();
        assert!(hub.try_read().is_ok());
    }

    #[test]
    fn validate_notification_type_info() {
        assert!(validate_notification_type("info"));
    }

    #[test]
    fn validate_notification_type_success() {
        assert!(validate_notification_type("success"));
    }

    #[test]
    fn validate_notification_type_warning() {
        assert!(validate_notification_type("warning"));
    }

    #[test]
    fn validate_notification_type_error() {
        assert!(validate_notification_type("error"));
    }

    #[test]
    fn validate_notification_type_rejects_uppercase() {
        assert!(!validate_notification_type("ERROR"));
    }

    #[test]
    fn validate_notification_type_rejects_empty() {
        assert!(!validate_notification_type(""));
    }

    #[test]
    fn validate_notification_type_rejects_invalid() {
        assert!(!validate_notification_type("invalid"));
    }
}

pub async fn handle_notification_stream(State(state): State<Arc<AppState>>) -> impl IntoResponse {
    let (tx, rx) = tokio::sync::mpsc::unbounded_channel::<String>();
    let id = Uuid::new_v4().to_string().replace('-', "");

    state
        .sse_hub
        .write()
        .await
        .clients
        .insert(id.clone(), SSEClient { sender: tx });

    let hub = state.sse_hub.clone();
    tokio::spawn(async move {
        tokio::time::sleep(Duration::from_secs(3600)).await;
        hub.write().await.clients.remove(&id);
    });

    let stream = UnboundedReceiverStream::new(rx)
        .map(|msg| Ok::<Event, Infallible>(Event::default().data(msg)));

    Sse::new(stream).keep_alive(
        axum::response::sse::KeepAlive::new()
            .interval(Duration::from_secs(30))
            .text("keep-alive"),
    )
}
