CXX = g++
CXXFLAGS = -Wall -Wextra -std=c++17 -I src -g -O2

OUT_DIR = out
SRC = $(wildcard src/*.cpp)
OBJ = $(patsubst src/%.cpp, $(OUT_DIR)/%.o, $(SRC))

all: $(OBJ)
	@echo "C++ lodash built successfully"

$(OUT_DIR)/%.o: src/%.cpp src/lodash.hpp
	@mkdir -p $(OUT_DIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -rf $(OUT_DIR)

.PHONY: all clean
