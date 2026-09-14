// Package events centralizes the webhook event names used across the app.
package events

const (
	EventRecordCreate        = "record.create"
	EventRecordUpdate        = "record.update"
	EventRecordDelete        = "record.delete"
	EventCollectionCreate    = "collection.create"
	EventCollectionDelete    = "collection.delete"
	EventBucketCreate        = "bucket.create"
	EventBucketDelete        = "bucket.delete"
	EventSecretCreate        = "secret.create"
	EventSecretUpdate        = "secret.update"
	EventSecretDelete        = "secret.delete"
	EventCronjobCreate       = "cronjob.create"
	EventCronjobUpdate       = "cronjob.update"
	EventCronjobDelete       = "cronjob.delete"
	EventNotificationCreate  = "notification.create"
	EventLogCreate           = "log.create"
	EventPubSubTopicCreate   = "pubsub.topic.create"
	EventPubSubTopicDelete   = "pubsub.topic.delete"
	EventPubSubMessageCreate = "pubsub.message.create"
)
