# CLion: 2. CMake Project Model

## Source guidance

This example applies the **2. CMake Project Model** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **CLion reads your CMakeLists.txt — it does not own the build.** Every "Run/Debug Configuration" is a generated target, and renaming a target in the IDE is not possible because the IDE is not the source.
- **Never edit the generated `.idea/` build files to change the build.** They are regenerated on reload; a change is silently lost. Change `CMakeLists.txt` and reload the project.
- **`.idea/` holds IDE state, not build state — keep it out of version control** except the small shareable subset (`codeStyles/`, `inspectionProfiles/`, and the `.run/` run configurations). `cmakeLists/` inside `.idea/` is generated.

## Example

This excerpt is from the cited **2. CMake Project Model** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for clion-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
