CXX=c++
CXXFLAGS=-Wall -Wextra -pedantic -std=c++17
LDFLAGS=-lpthread
BUILD_DIR=bin
BINARY=kv

.PHONY: all build clean test format lint

all: format lint test build

build:
	mkdir -p $(BUILD_DIR)
	$(CXX) $(CXXFLAGS) -o $(BUILD_DIR)/$(BINARY) src/main.cpp $(LDFLAGS)

test:
	mkdir -p $(BUILD_DIR)
	$(CXX) $(CXXFLAGS) -o $(BUILD_DIR)/test src/test.cpp $(LDFLAGS)
	./$(BUILD_DIR)/test

clean:
	rm -rf $(BUILD_DIR)

format:
	clang-format -i src/main.cpp src/test.cpp 2>/dev/null || true

lint:
	clang-tidy src/main.cpp src/test.cpp -- $(CXXFLAGS) 2>/dev/null || true
