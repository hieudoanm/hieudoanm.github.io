CC = gcc
CFLAGS = -Wall -Wextra -std=c99 -I src -g -O2

OUT_DIR = out
SRC = $(wildcard src/*.c)
OBJ = $(patsubst src/%.c, $(OUT_DIR)/%.o, $(SRC))

all: $(OBJ)
	@echo "C lodash built successfully"

$(OUT_DIR)/%.o: src/%.c src/lodash.h
	@mkdir -p $(OUT_DIR)
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -rf $(OUT_DIR)

.PHONY: all clean
