package data

import (
	"encoding/json"
	"fmt"
	"os"
)

func jsonMerge(baseFile, patchFile string) error {
	base, err := os.ReadFile(baseFile)
	if err != nil {
		return fmt.Errorf("read base: %w", err)
	}
	patch, err := os.ReadFile(patchFile)
	if err != nil {
		return fmt.Errorf("read patch: %w", err)
	}

	var baseMap, patchMap map[string]interface{}
	if err := json.Unmarshal(base, &baseMap); err != nil {
		return fmt.Errorf("parse base: %w", err)
	}
	if err := json.Unmarshal(patch, &patchMap); err != nil {
		return fmt.Errorf("parse patch: %w", err)
	}

	for k, v := range patchMap {
		baseMap[k] = v
	}

	out, _ := json.MarshalIndent(baseMap, "", "  ")
	fmt.Println(string(out))
	return nil
}
