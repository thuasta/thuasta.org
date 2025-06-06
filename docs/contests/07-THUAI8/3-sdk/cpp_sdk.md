# C++ SDK 文档

欢迎使用 THUAI8 C++ SDK！本文档详细介绍了可供选手调用的接口和功能，包括参数、返回值类型以及用法示例，帮助您更好地理解如何使用该 SDK 来控制您的 Agent 参与比赛。

仓库链接：[agent-cpp](https://github.com/thuasta/thuai-8/releases/download/v0.1.0.1/thuai-8-agent-cpp.zip)

## 准备工作

### 环境要求

- 要求 XMake >= 2.9.8，安装方法请参考 [XMake 官方文档](https://xmake.io/#/zh-cn/guide/installation)。若您没有开启代理，可使用如下 Windows 下载地址：[XMake 2.9.9](https://cloud.tsinghua.edu.cn/f/d2832c3066134cdc9977/?dl=1)

- 具备 C++23 支持的 C++ 编译器工具链。推荐使用 MSVC。可使用如下 VS Build Tools 下载地址：[Visual Studio Build Tools](https://aka.ms/vs/17/release/vs_BuildTools.exe)

  :::warning

  若您使用的是其他编译器，请确保其支持 C++23 标准。

  :::

- 合适的代码编辑器。推荐使用 Visual Studio Code。可使用如下 Windows 下载地址：[Visual Studio Code](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user)

### 构建项目

若您没有开启代理，则需要更改 xmake 的 proxy，在命令行中输入：

```bash
xmake g --proxy_pac=github_mirror.pac
```

运行以下命令以配置项目：

```bash
xmake f -m debug
```

或者在发布模式下：

```bash
xmake f -m release
```

然后构建项目：

```bash
xmake
```

:::tip

- 若您需要生成 `compile_commands.json` 文件，可以使用以下命令：

    ```bash
    xmake project -k compile_commands
    ```

- 若配置项目时报错找不到某个依赖，说明本地的 xmake repo 没有更新到最新版本。可以使用以下命令：

    ```bash
    xmake repo --update
    ```

:::

### 编写代码

您可以在 `logic.cpp` 文件中编写您的代码。对于有经验的开发者，您也可以修改项目中的其他任何文件。在 `logic.cpp` 中，我们已经为您提供了一个示例代码，您需要根据自己的策略进行修改。

### 运行

:::warning

如果您修改了 `main.cpp` 中与 `ParseOptions(int argc, char** argv)` 方法相关的代码，则此部分可能无效。

:::

运行以下命令启动 Agent：

```bash
./agent --server <server> --token <token>
```

- `<server>`：游戏服务器地址。（默认值：`ws://localhost:14514`）
- `<token>`：Agent 的令牌。（默认值：`1919810`）

在 debug 模式下，您还可以使用以下命令更改日志级别：

```bash
./agent --log <level>
```

- `<level>`：日志级别，可选值为 `trace`、`debug`、`info`、`warn` 和 `error`。（默认值：`trace`）

例如：

```bash
./agent --server ws://localhost:14514 --token 1919810 --log debug
```

:::warning

- 运行前，请确保您的服务器地址和令牌是正确的，以确保 Agent 能够成功连接到游戏服务器。
- 在 release 模式下，日志级别为 `info` 且无法更改。

:::

## 接口介绍

### 获取信息

1. **获取自身令牌**

    ```cpp
    auto token{agent.token()};
    ```

    - 返回类型：`std::string_view`

    `token` 方法将返回玩家自身的令牌。

2. **获取自身玩家信息**

    ```cpp
    const auto& self_info{agent.self_info()};
    ```

    - 返回类型：`const Player&`

    `self_info` 方法将返回自身玩家信息，包括玩家的位置、武器、护甲和技能库等。

    :::info

    - 位置 `position` 包括坦克的坐标和朝向。
    - 武器 `weapon` 包括武器和武器类技能的基本情况。
    - 护甲 `armor` 包括护甲和护甲类技能的基本情况。
    - 技能库 `skills` 包括所拥有的技能类别、技能的冷却时间、技能的剩余冷却时间等。

    :::

3. **获取对方玩家信息**

    ```cpp
    const auto& opponent_info{agent.opponent_info()};
    ```

    - 返回类型：`const Player&`

    `opponent_info` 方法将返回对方玩家信息。玩家信息同上。

4. **获取环境信息**

    ```cpp
    const auto& environment_info{agent.environment_info()};
    ```

    - 返回类型：`const EnvironmentInfo&`

    `environment_info` 方法将返回环境信息，包括普通墙体的列表、技能墙体的列表和当前子弹的列表。

    :::info

    - 普通墙体 `wall` 包括普通墙体的位置。
    - 技能墙体 `fence` 包括技能墙体的位置和当前生命值。
    - 子弹 `bullet` 包括子弹的位置、速度、伤害值和已经经过的距离。

    :::

5. **获取游戏状态信息**

    ```cpp
    const auto& game_statistics{agent.game_statistics()};
    ```

    - 返回类型：`const GameStatistics&`

    `game_statistics` 方法将返回游戏状态信息，包括游戏的当前阶段、游戏的倒计时、游戏当前的 ticks 和每位玩家的累计分数。

6. **获取奖励信息**

    ```cpp
    const auto& available_buffs{agent.available_buffs()};
    ```

    - 返回类型：`const AvailableBuffs& /*using AvailableBuffs = std::vector<BuffKind>*/`

    `agent.available_buffs` 方法将返回可选择的奖励列表。

### 操作 Agent

1. **向前移动**

    ```cpp
    agent.MoveForward(float distance = 1.0f);
    ```

    - 参数：
      - `distance`：移动距离，默认为 1.0f。
    - 返回类型：无

    使用 `MoveForward` 方法使 Agent 向前移动指定距离。

2. **向后移动**

    ```cpp
    agent.MoveBackward(float distance = 1.0f);
    ```

    - 参数：
      - `distance`：移动距离，默认为 1.0f。
    - 返回类型：无

    使用 `MoveBackward` 方法使 Agent 向后移动指定距离。

3. **顺时针旋转**

    ```cpp
    agent.TurnClockwise(int angle = 45);
    ```

    - 参数：
      - `angle`：旋转角度，默认为 45 度。
    - 返回类型：无

    使用 `TurnClockwise` 方法使 Agent 顺时针旋转指定角度。

4. **逆时针旋转**

    ```cpp
    agent.TurnCounterClockwise(int angle = 45);
    ```

    - 参数：
      - `angle`：旋转角度，默认为 45 度。
    - 返回类型：无

    使用 `TurnCounterClockwise` 方法使 Agent 逆时针旋转指定角度。

5. **攻击**

    ```cpp
    agent.Attack();
    ```

    - 返回类型：无

    使用 `Attack` 方法使 Agent 攻击。

6. **使用技能**

    ```cpp
    agent.UseSkill(SkillKind skill);
    ```

    - 参数：
      - `skill`：技能种类。
    - 返回类型：无

    使用 `UseSkill` 方法使用指定技能。

7. **选择奖励**

    ```cpp
    agent.SelectBuff(BuffKind buff);
    ```

    - 参数：
      - `buff`：奖励种类。
    - 返回类型：无

    使用 `SelectBuff` 方法选择指定的奖励。

### 状态查询

1. **判断是否连接到服务器**

    ```cpp
    bool connected{agent.IsConnected()};
    ```

    - 返回类型：`bool`

    `IsConnected` 方法指示 Agent 是否已连接到服务器。

2. **判断游戏是否准备就绪**

    ```cpp
    bool ready{agent.IsGameReady()};
    ```

    - 返回类型：`bool`

    `IsGameReady` 方法指示游戏是否已准备就绪，即是否已获取到所有必要的游戏状态信息。
