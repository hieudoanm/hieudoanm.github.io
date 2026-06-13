package data

import (
	"fmt"
	"strings"
)

func jsonQuery(data interface{}, query string) (interface{}, error) {
	parts := strings.Split(query, ".")
	current := data
	for _, part := range parts {
		if part == "" {
			continue
		}
		if strings.HasSuffix(part, "]") {
			idx := strings.Index(part, "[")
			if idx >= 0 {
				key := part[:idx]
				arrIdx := 0
				fmt.Sscanf(part[idx+1:len(part)-1], "%d", &arrIdx)

				if key != "" {
					m, ok := current.(map[string]interface{})
					if !ok {
						return nil, fmt.Errorf("expected object at %s", key)
					}
					current = m[key]
				}

				arr, ok := current.([]interface{})
				if !ok {
					return nil, fmt.Errorf("expected array at index %d", arrIdx)
				}
				if arrIdx >= len(arr) {
					return nil, fmt.Errorf("index %d out of bounds", arrIdx)
				}
				current = arr[arrIdx]
			}
		} else {
			m, ok := current.(map[string]interface{})
			if !ok {
				return nil, fmt.Errorf("expected object at %s", part)
			}
			var found bool
			current, found = m[part]
			if !found {
				return nil, fmt.Errorf("key %s not found", part)
			}
		}
	}
	return current, nil
}
