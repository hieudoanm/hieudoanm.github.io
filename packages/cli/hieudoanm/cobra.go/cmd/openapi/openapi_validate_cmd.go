package openapi

import (
	"fmt"
	"os"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

var validMethods = []string{"get", "put", "post", "delete", "options", "head", "patch", "trace"}

func newValidateCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "validate <file>",
		Short: "Validate an OpenAPI specification",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			data, err := os.ReadFile(args[0])
			if err != nil {
				return err
			}

			spec, err := parseOpenAPI(data)
			if err != nil {
				return fmt.Errorf("parse error: %w", err)
			}

			issues := validateSpec(spec)
			if len(issues) == 0 {
				fmt.Println("valid openapi spec")
				return nil
			}

			for _, issue := range issues {
				fmt.Fprintln(os.Stderr, issue)
			}
			return fmt.Errorf("%d validation issue(s) found", len(issues))
		},
	}
}

func validateSpec(spec JSON) []string {
	var issues []string

	openapiVer := getString(spec["openapi"])
	if openapiVer == "" {
		issues = append(issues, "missing required field: openapi")
	} else if !regexp.MustCompile(`^\d+\.\d+\.\d+$`).MatchString(openapiVer) {
		issues = append(issues, fmt.Sprintf("invalid openapi version: %q (expected semver)", openapiVer))
	}

	info := getMap(spec["info"])
	if info == nil {
		issues = append(issues, "missing required object: info")
	} else {
		if getString(info["title"]) == "" {
			issues = append(issues, "info.title is required")
		}
		if getString(info["version"]) == "" {
			issues = append(issues, "info.version is required")
		}
	}

	paths := getMap(spec["paths"])
	if paths == nil {
		issues = append(issues, "missing required object: paths")
	} else {
		issues = append(issues, validatePaths(paths)...)
	}

	return issues
}

func validatePaths(paths JSON) []string {
	var issues []string
	validMethodsSet := make(map[string]bool, len(validMethods))
	for _, m := range validMethods {
		validMethodsSet[m] = true
	}

	seenOpIDs := map[string]string{}

	for path, methodsRaw := range paths {
		if strings.HasPrefix(path, "x-") {
			continue
		}
		if !strings.HasPrefix(path, "/") {
			issues = append(issues, fmt.Sprintf("path %q should start with /", path))
		}

		methods := getMap(methodsRaw)
		if methods == nil {
			continue
		}

		for method, opRaw := range methods {
			if strings.HasPrefix(method, "x-") {
				continue
			}
			if !validMethodsSet[strings.ToLower(method)] {
				issues = append(issues, fmt.Sprintf("path %q: invalid method %q", path, method))
				continue
			}

			op := getMap(opRaw)
			if op == nil {
				issues = append(issues, fmt.Sprintf("%s %s: operation must be an object", strings.ToUpper(method), path))
				continue
			}

			responses := getMap(op["responses"])
			if responses == nil || len(responses) == 0 {
				issues = append(issues, fmt.Sprintf("%s %s: missing responses", strings.ToUpper(method), path))
			}

			if opID := getString(op["operationId"]); opID != "" {
				if existingPath, ok := seenOpIDs[opID]; ok {
					issues = append(issues, fmt.Sprintf("duplicate operationId %q (%s %s and %s)", opID, existingPath, path, method))
				} else {
					seenOpIDs[opID] = strings.ToUpper(method) + " " + path
				}
			}
		}
	}

	return issues
}
