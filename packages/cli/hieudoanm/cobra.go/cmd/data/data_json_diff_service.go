package data

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

func jsonDiff(file1, file2 string) error {
	a, err := os.ReadFile(file1)
	if err != nil {
		return fmt.Errorf("read %s: %w", file1, err)
	}
	b, err := os.ReadFile(file2)
	if err != nil {
		return fmt.Errorf("read %s: %w", file2, err)
	}

	var va, vb interface{}
	json.Unmarshal(a, &va)
	json.Unmarshal(b, &vb)

	ba, _ := json.MarshalIndent(va, "", "  ")
	bb, _ := json.MarshalIndent(vb, "", "  ")

	linesA := strings.Split(string(ba), "\n")
	linesB := strings.Split(string(bb), "\n")

	max := len(linesA)
	if len(linesB) > max {
		max = len(linesB)
	}

	for i := 0; i < max; i++ {
		var la, lb string
		if i < len(linesA) {
			la = linesA[i]
		}
		if i < len(linesB) {
			lb = linesB[i]
		}
		if la != lb {
			if la != "" {
				fmt.Printf("- %s\n", la)
			}
			if lb != "" {
				fmt.Printf("+ %s\n", lb)
			}
		}
	}
	return nil
}
