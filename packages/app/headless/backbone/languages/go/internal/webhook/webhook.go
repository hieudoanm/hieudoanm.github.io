// Package webhook provides webhook event payload and validation helpers.
package webhook

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/backbone/internal/events"
)

// EventPayload is the envelope body sent to webhook endpoints.
type EventPayload struct {
	Event     string `json:"event"`
	CreatedAt string `json:"created_at"`
	Data      any    `json:"data"`
}

// EventInList reports whether event is present in events.
func EventInList(event string, events []string) bool {
	for _, e := range events {
		if e == event {
			return true
		}
	}
	return false
}

// WriteEventsJSON serialises the event list for storage.
func WriteEventsJSON(events []string) string {
	if events == nil {
		return "[]"
	}
	b, err := json.Marshal(events)
	if err != nil {
		return "[]"
	}
	return string(b)
}

// ValidateEvents filters events to the known set, rejecting unknowns.
func ValidateEvents(in any) ([]string, error) {
	raw, ok := in.([]any)
	if !ok {
		return nil, fmt.Errorf("events must be an array")
	}
	var result []string
	for _, e := range raw {
		s, ok := e.(string)
		if !ok {
			return nil, fmt.Errorf("each event must be a string")
		}
		switch s {
		case events.EventRecordCreate, events.EventRecordUpdate, events.EventRecordDelete,
			events.EventCollectionCreate, events.EventCollectionDelete,
			events.EventBucketCreate, events.EventBucketDelete,
			events.EventSecretCreate, events.EventSecretUpdate, events.EventSecretDelete,
			events.EventCronjobCreate, events.EventCronjobUpdate, events.EventCronjobDelete,
			events.EventNotificationCreate,
			events.EventLogCreate,
			events.EventPubSubTopicCreate, events.EventPubSubTopicDelete, events.EventPubSubMessageCreate:
			result = append(result, s)
		default:
			return nil, fmt.Errorf("unknown event: %s", s)
		}
	}
	return result, nil
}
