CC=cc
CFLAGS=-Wall -Wextra -pedantic -std=c11
LDFLAGS=-lpthread
BUILD_DIR=bin
BINARY=kv

.PHONY: all build clean test format lint

all: format lint test build

build:
	mkdir -p $(BUILD_DIR)
	$(CC) $(CFLAGS) -o $(BUILD_DIR)/$(BINARY) src/main.c $(LDFLAGS)

test:
	mkdir -p $(BUILD_DIR)
	$(CC) $(CFLAGS) -o $(BUILD_DIR)/test src/test.c $(LDFLAGS)
	./$(BUILD_DIR)/test

clean:
	rm -rf $(BUILD_DIR)

format:
	clang-format -i src/main.c src/test.c 2>/dev/null || true

lint:
	clang-tidy src/main.c src/test.c -- $(CFLAGS) 2>/dev/null || true
