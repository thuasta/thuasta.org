# 编写 Agent

## 挑选一个 SDK

SDK (Software Development Kit) 在 THUAI 比赛中充当比赛选手的代码框架，它完成了运行比赛幕后的与后端通信、更新 Agent 状态等工作。选手只需要专注于比赛的策略和逻辑即可。

SDK 可从[此链接](https://github.com/thuasta/thuai-8/releases)获取。可以在 C++ 和 Python 两个语言中选择 ~~（当然手搓一个其他语言的 SDK 也不是不行）~~。

## 配置开发环境

### Python SDK

需要 Python 3.11 以上，可以参考网络上其他资源安装 Python。

Python 目录下的 `requirements.txt` 记载了运行 Python SDK 所需要的依赖，这一文件可以被 pip 所解析并让它自动帮你安装所有需要的依赖，只要在命令行中输入：

```bash
pip install -r requirements.txt
```

### C++ SDK

C++ 的编译和包管理等相对 Python 复杂很多 ~~（因为 Python 压根也不用编译）~~。这里介绍一下如何用 VSCode 打造一个适用于 THUAI 的较为舒适的开发环境。

:::tip

使用 Windows 操作系统的选手可参考往年[**视频教程**](https://cloud.tsinghua.edu.cn/f/9f18a58882614cbea368/) ，了解如何配置 C++ SDK 开发环境。

:::

#### 下载 Visual Studio 2022

我们并非要使用 VS2022 作为编辑器，而是要使用其附带的 MSVC 编译器，其对新版的 C++ 特性有比较好的支持（本次的 SDK 使用了很新的 C++23 标准）。如果你的电脑中还存留着程设课程留下的 VS2012，那么你以后大概率不会再有使用 VS2012 的需求，可以将其删除并以 VS2022 代之。

#### 安装 xmake & 配置 VSCode

为了辅助多文件编译和包管理，我们采用了 xmake 作为构建工具，可以参考[官方文档](https://xmake.io/#/zh-cn/guide/installation)进行安装。

<details>
<summary>投向命令行界面的怀抱！</summary>

在 THUAI 的比赛和之后的开发中，一个建议是抛弃 VSCode 右上角的运行键，转而投向[命令行](../.././../docs/learning_resources/os/terminal.md)界面的怀抱，原因有两点：

1. 图形界面总是具有极限，当我们需要图形界面所没有提供的操作，命令行可以帮我们完成。
2. 你可能很难搞清楚右上角的哪个运行键是由哪个插件提供的，尤其是当我们在 VSCode 上安装很多插件以后，出现问题将更加难以调试。

</details>

VSCode 的默认快捷键 `Ctrl+Shift+~` 可以在下方呼出一个命令行，输入 `xmake` 即可以完成编译。之所以 xmake 知道我们要做什么，是因为 SDK 目录下的 `xmake.lua` 告诉了 xmake 应该做什么。

第一次编译时会进行确认操作系统、VS2022 版本、安装依赖等等工作，静候其完成即可。之后在命令行输入 `xmake run agent` 即可运行，更多操作请参考 [C++ SDK 文档](cpp_sdk.md#构建项目)。

#### 配置 IntelliSense

如果此时你多打开一些 cpp 或 hpp 文件，可能会看到满屏的红波浪线：为什么我可以成功编译和运行，但它还是报了很多错误？这是因为提供语法检查的 C/C++ 插件和负责编译运行的 xmake 间没有沟通，IntelliSense 插件不知道你用了 MSVC 编译器、C++23 标准，也已经安装了需要的依赖。

在 THUAI 中不推荐采用 VSCode 推荐的 C/C++ 系列插件，而是选择 clangd 提供语法检查。可以禁用或卸载所有 C/C++ 相关插件并安装 clangd，它会根据 `compile_commands.json` 而提供语法检查服务，但我们需要先告诉它这一文件在哪。

1. 首先命令行输入 `xmake project -k compile_commands .vscode`，xmake 会在 `.vscode` 文件夹下生成一个 `compile_commands.json`。
2. 配置 clangd 的设置：`Ctrl+,` 打开 VSCode 的设置页面，搜索 clangd，在 `Clangd: Arguments` 添加一项：`--compile-commands-dir=.vscode`。这一命令指定了 `compile_commands.json` 文件的位置。
3. 重启 VSCode 界面。

:::warning

1. 如果之前安装了 VS2022，检查一下是否更新到 17.13.0 以上。
2. 如果之前安装了 clangd 插件，可以 `Ctrl+Shift+P` 搜索 clangd，有 `Check for language server update` 选项以更新到最新版本。
3. 如果使用 gcc 编译器，请使用 gcc 13。

:::

## 进行操作

我们需要编辑几个函数：

- **C++ SDK**：`src/logic.cpp` 内的
  - `void SelectBuff(const thuai8_agent::Agent& agent)`
  - `void Loop(const thuai8_agent::Agent& agent)`

- **Python SDK**：`src/logic.py` 内的
  - `selectBuff`
  - `loop`

其中前者会在战斗进入选择奖励阶段并且尚未选择奖励时调用一次；后者会每隔一小段时间调用一次，调用间隔在 `main` 文件中的 `kDefaultIntervalMs` 中定义。

每次调用 agent 操作（如攻击、移动等），agent 类就会向后端发送一个包，告诉后端我要进行某个操作；后端会一直提供最新的游戏状态信息。

具体的 agent 操作请参考 [C++ SDK 文档](cpp_sdk.md) / [Python SDK 文档](python_sdk.md)。但这里没有记载各种数据类型（`Player`、`Environment_Info`...）是如何定义的，需参考相应的 `.hpp` 或 `.py` 文件。

## 编写策略

THUAI8 的游戏类似坦克动荡，玩家发射子弹、子弹碰壁反弹、一段时间后消失、玩家发射的子弹数有上限、每小局结束后开始新一局...不同的点在于子弹并非秒杀，且第二小局开始玩家就可以选择 Buff 来辅助战斗，并且可以释放（强力？）主动技能。

虽然名字叫做 THUAI，但是用训练 AI 的方法解决这一比赛并不现实，更可行的做法还是构建有限状态机（FSM），或称 if-else 大法。这种思路写出一版有竞争力的 Agent 可能需要一些算法基础，如 BFS、A* 等寻路算法；还可能需要一些对于子弹轨迹的预测来防止受伤，以及如何利用技能来占据优势等。

## 友情提示

### 依赖管理

对于 C++ 和 Python SDK，如果需要利用第三方库不仅需要本地安装，还需要在 `xmake.lua` 或 `requirements.txt` 中记载。对于 C++ SDK，`xmake.lua` 的编写可参考[官方教程](https://xmake.io/#/zh-cn/package/remote_package)；对于 Python SDK，`requirements.txt` 的生成可以参考[此工具](https://pypi.org/project/pipreqs/)。

如果你不进行这几项操作，对于 C++ SDK，将直接编译失败；对于 Python SDK，危害则更加隐性一些：程序将编译通过，但在对局时尝试导入则导致 `ModuleNotFoundError` 直接 RE。这是因为在编译时评测机做的工作主要是下载 `requirements.txt` 中的依赖，并将这些依赖文件和你的代码打包（这一过程记载在要求大家打包的神秘文件——`Dockerfile` 中），并不包含语法检查。如果你对 [Docker](../../../docs/learning_resources/container/docker.md) 有一定了解，可以尝试把生成 `requirements.txt` 的过程写到 `Dockerfile` 中。

### 好长的调试信息……

对于 Python SDK，如果 RE 了想要看程序输出的信息——好长，看不懂！里面可能充斥着这样的信息：

```bash
[2025-05-07 14:58:19,771] [DEBUG] < TEXT '{"messageType":"ALL_PLAYER_INFO","players":[{"t...:0.9863405227661133}}]}' [1044 bytes]
[2025-05-07 14:58:19,819] [DEBUG] < TEXT '{"messageType":"GAME_STATISTICS","currentStage"...cks":11337,"scores":[]}' [97 bytes]
[2025-05-07 14:58:19,820] [DEBUG] < TEXT '{"messageType":"ENVIRONMENT_INFO","walls":[{"x"...llets":[],"mapSize":10}' [2187 bytes]
[2025-05-07 14:58:19,820] [DEBUG] < TEXT '{"messageType":"ALL_PLAYER_INFO","players":[{"t...:0.9863405227661133}}]}' [1044 bytes]
```

这些信息是关于你的 SDK 和 server 是如何通讯的。对于我们这些参赛选手，我们大可以把可供调用的函数看成黑盒，只要能拿到信息、进行操作就可以了，没必要知道到底是怎么通讯的~~并且这些通讯信息也被截断了看不到全貌~~。在 `main.py` 中有一个常量名为 `DEFAULT_LOGGING_LEVEL`，将其改为 `logging.INFO`，那么就只剩下有用的信息啦。如果你要打印信息，可以按照不同级别使用 `logging.info()`、`logging.warn()`、`logging.error()` 等函数。
