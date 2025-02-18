# CMake

CMake 是一个强大的跨平台构建系统，可为各种平台和编译器生成构建文件、Makefiles 或工作空间。与其他构建系统不同，CMake 实际上并不构建项目，它只生成构建工具所需的文件。CMake 因其易用性和灵活性而被广泛使用，尤其是在 C++ 项目中。

## CMakeLists.txt

CMake 使用一个名为 `CMakeLists.txt` 的文件来定义设置、源文件、库和其他配置。一个简单项目的典型 `CMakeLists.txt` 文件如下所示：

```cmake
cmake_minimum_required(VERSION 3.0)

project(MyProject)

set(SRC_DIR "${CMAKE_CURRENT_LIST_DIR}/src")
set(SOURCES "${SRC_DIR}/main.cpp" "${SRC_DIR}/file1.cpp" "${SRC_DIR}/file2.cpp")

add_executable(${PROJECT_NAME} ${SOURCES})

target_include_directories(${PROJECT_NAME} PRIVATE "${CMAKE_CURRENT_LIST_DIR}/include")

set_target_properties(${PROJECT_NAME} PROPERTIES
    CXX_STANDARD 14
    CXX_STANDARD_REQUIRED ON
    CXX_EXTENSIONS OFF
)
```

## 使用 CMake 构建项目

以下是一个使用 CMake 的简单构建过程的示例：

- 为构建项目创建一个新目录。

```bash
mkdir build
cd build
```

- 使用 CMake 生成构建文件。

```bash
cmake ..
```

在这个例子中，`..` 表示 `CMakeLists.txt` 所在的父目录。构建文件将在 `build` 目录下生成。

- 使用生成的构建文件构建项目。

```bash
make
```

或者，在带有 Visual Studio 的 Windows 上，你可以使用：

```bash
msbuild MyProject.sln
```

CMake 可以轻松管理大型项目，定义自定义构建配置，并适用于许多不同的编译器和操作系统。这使得它成为管理 C++ 项目构建系统的广泛选择工具。

:::info[访问以下资源以了解更多信息]

- [CMake 官方教程](https://cmake.org/cmake/help/latest/guide/tutorial/index.html)
- [现代 CMake 入门](https://cliutils.gitlab.io/modern-cmake/)

:::
