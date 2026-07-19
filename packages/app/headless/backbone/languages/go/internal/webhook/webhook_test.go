package webhook

import "testing"

func TestEventInList_Found(t *testing.T) {
	if !EventInList("record.create", []string{"record.create", "record.delete"}) {
		t.Fatal("expected true")
	}
}

func TestEventInList_NotFound(t *testing.T) {
	if EventInList("record.update", []string{"record.create", "record.delete"}) {
		t.Fatal("expected false")
	}
}

func TestEventInList_Empty(t *testing.T) {
	if EventInList("record.create", []string{}) {
		t.Fatal("expected false for empty list")
	}
}

func TestWriteEventsJSON_Nil(t *testing.T) {
	result := WriteEventsJSON(nil)
	if result != "[]" {
		t.Fatalf("expected '[]', got %q", result)
	}
}

func TestWriteEventsJSON_Empty(t *testing.T) {
	result := WriteEventsJSON([]string{})
	if result != "[]" {
		t.Fatalf("expected '[]', got %q", result)
	}
}

func TestWriteEventsJSON_Values(t *testing.T) {
	result := WriteEventsJSON([]string{"record.create", "record.delete"})
	if result != `["record.create","record.delete"]` {
		t.Fatalf("unexpected result: %q", result)
	}
}

func TestValidateEvents_Valid(t *testing.T) {
	events := []any{"record.create", "record.delete", "bucket.create", "secret.create", "cronjob.create", "notification.create", "log.create", "pubsub.topic.create", "pubsub.message.create"}
	result, err := ValidateEvents(events)
	if err != nil {
		t.Fatal(err)
	}
	if len(result) != len(events) {
		t.Fatalf("expected %d events, got %d", len(events), len(result))
	}
}

func TestValidateEvents_NotArray(t *testing.T) {
	_, err := ValidateEvents("not an array")
	if err == nil {
		t.Fatal("expected error for non-array input")
	}
}

func TestValidateEvents_NonStringElement(t *testing.T) {
	_, err := ValidateEvents([]any{42})
	if err == nil {
		t.Fatal("expected error for non-string element")
	}
}

func TestValidateEvents_UnknownEvent(t *testing.T) {
	_, err := ValidateEvents([]any{"unknown.event"})
	if err == nil {
		t.Fatal("expected error for unknown event")
	}
}

func TestValidateEvents_Empty(t *testing.T) {
	result, err := ValidateEvents([]any{})
	if err != nil {
		t.Fatal(err)
	}
	if len(result) != 0 {
		t.Fatalf("expected 0, got %d", len(result))
	}
}
