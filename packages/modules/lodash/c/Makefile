CC = gcc
CFLAGS = -Wall -Wextra -std=c99 -I src -g -O2

SRC = $(wildcard src/*.c)
OBJ = $(SRC:.c=.o)

all: src/*.o
	@echo "C lodash built successfully"

src/%.o: src/%.c src/lodash.h
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f src/*.o

.PHONY: all clean
