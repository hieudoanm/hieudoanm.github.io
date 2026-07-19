# CLion: Basic Usage

Best practices for working in CLion — CMake project models, compile_commands.json as the source of truth, the bundled LLVM toolchain, debugging and profiling workflows, and JetBrains shared conventions. Use when setting up, debugging, or profiling a C/C++ project in CLion.

## Scenario

Use this example as a starting point when applying **clion-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. CMake Project Model** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```cmake
cmake_minimum_required(VERSION 3.24)
project(app LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

option(APP_WERROR "Treat warnings as errors" OFF)
if(APP_WERROR)
  add_compile_options(-Wall -Wextra -Wpedantic -Werror)
endif()

add_executable(app src/main.cpp)
target_link_libraries(app PRIVATE fmt::fmt)

include(CTest)
add_test(NAME smoke COMMAND app --self-test)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
