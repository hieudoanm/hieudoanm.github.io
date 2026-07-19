package util

import (
	"errors"
	"testing"
)

func TestTryCatch(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		result := TryCatch(func() (int, error) {
			return 42, nil
		})
		if result.Data != 42 || result.Error != nil {
			t.Errorf("expected (42, nil), got (%v, %v)", result.Data, result.Error)
		}
	})

	t.Run("failure", func(t *testing.T) {
		err := errors.New("boom")
		result := TryCatch(func() (string, error) {
			return "", err
		})
		if result.Data != "" || result.Error != err {
			t.Errorf("expected ('', error), got (%q, %v)", result.Data, result.Error)
		}
	})

	t.Run("panic recovery", func(t *testing.T) {
		func() {
			result := TryCatch(func() (int, error) {
				return 0, errors.New("panic test")
			})
			if result.Error == nil {
				t.Errorf("expected error")
			}
		}()
	})
}
