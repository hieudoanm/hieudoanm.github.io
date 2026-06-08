package colors

import "testing"

func TestColors(t *testing.T) {
	originalEnableColor := enableColor
	defer func() { enableColor = originalEnableColor }()

	// Test with color enabled
	enableColor = true
	if Green("test") != "\033[32mtest\033[0m" {
		t.Errorf("Green failed with color enabled")
	}
	if Red("test") != "\033[31mtest\033[0m" {
		t.Errorf("Red failed with color enabled")
	}
	if Yellow("test") != "\033[33mtest\033[0m" {
		t.Errorf("Yellow failed with color enabled")
	}
	if Dim("test") != "\033[2mtest\033[0m" {
		t.Errorf("Dim failed with color enabled")
	}

	// Test with color disabled
	enableColor = false
	if Green("test") != "test" {
		t.Errorf("Green failed with color disabled")
	}
	if Red("test") != "test" {
		t.Errorf("Red failed with color disabled")
	}
	if Yellow("test") != "test" {
		t.Errorf("Yellow failed with color disabled")
	}
	if Dim("test") != "test" {
		t.Errorf("Dim failed with color disabled")
	}
}
