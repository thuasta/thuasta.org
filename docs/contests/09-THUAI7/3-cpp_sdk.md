# C++ SDK 文档

欢迎使用 THUAI7 C++ SDK！本文档详细介绍了可供选手调用的接口和功能，包括参数、返回值类型以及用法示例，帮助您更好地理解如何使用该 SDK 来控制您的无人作战系统参与比赛。

仓库链接：[agent-template-cpp](https://github.com/thuasta/thuai-7-agent-template-cpp)

## 准备工作

:::tip

使用 Windows 操作系统的选手可参考如下[**视频教程**](https://cloud.tsinghua.edu.cn/f/9f18a58882614cbea368/)，了解如何配置 C++ SDK 开发环境。

:::

### 环境要求

- 要求 XMake >= 2.8.8，安装方法请参考 [XMake 官方文档](https://xmake.io/#/zh-cn/guide/installation)。若您没有开启代理，可以使用如下Windows 下载地址：[XMake 直链下载](https://hub.nuaa.cf/xmake-io/xmake/releases/download/v2.9.1/xmake-v2.9.1.win64.exe)

- 具备 C++20 支持的 C++ 编译器工具链。推荐使用 MSVC。可使用如下 VS Build Tools 下载地址：[Visual Studio Build Tools](https://aka.ms/vs/17/release/vs_BuildTools.exe)

  :::warning

  若您使用的是其他编译器，请确保其支持 C++20 标准。

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

### 编写代码

您可以在 `logic.cc` 文件中编写您的代码。对于有经验的开发者，您也可以修改项目中的其他任何文件。在 `logic.cc` 中，我们已经为您提供了一个示例寻路代码，您可以根据自己的需求进行修改。

### 运行

:::warning

如果您修改了 `main.cc` 中的代码，则此部分可能无效。

:::

运行以下命令启动 Agent：

```bash
./agent --server <server> --token <token>
```

- `<server>`：游戏服务器地址。（默认值：`ws://localhost:14514`）
- `<token>`：Agent 的令牌。（默认值：`1919810`）

例如：

```bash
./agent --server ws://localhost:14514 --token 1919810
```

:::warning

运行前，请确保您的服务器地址和令牌是正确的，以确保 Agent 能够成功连接到游戏服务器。

:::

## 接口介绍

### 获取游戏状态信息

1. **获取所有玩家信息**

   ```cpp
   auto players_info = agent.all_player_info();
   ```

   - 返回类型：`std::optional<std::reference_wrapper<std::vector<PlayerInfo> const>>`

   `all_player_info` 方法将返回一个包含所有玩家信息的列表。每个玩家信息包括玩家的 ID、生命值、护甲、速度、当前武器、位置和背包物品等。

2. **获取地图信息**

   ```cpp
   auto game_map = agent.map();
   ```

   - 返回类型：`std::optional<std::reference_wrapper<Map const>>`

   `map` 方法将返回地图信息，包括地图的长度和障碍物位置。

3. **获取资源信息**

   ```cpp
   auto supplies = agent.supplies();
   ```

   - 返回类型：`std::optional<std::reference_wrapper<std::vector<Supply> const>>`

   `supplies` 方法将返回一个包含所有资源信息的列表。每个资源信息包括资源的种类、位置和数量。

4. **获取安全区信息**

   ```cpp
   auto safe_zone = agent.safe_zone();
   ```

   - 返回类型：`std::optional<std::reference_wrapper<SafeZone const>>`

   `safe_zone` 方法将返回安全区信息，包括安全区的中心位置和半径。

5. **获取自身 ID**

   ```cpp
   auto self_id = agent.self_id();
   ```

   - 返回类型：`std::optional<int>`

   `self_id` 方法将返回自身玩家的 ID。

### 操作无人作战系统

1. **选择出生地**

   ```cpp
   agent.ChooseOrigin(Position<float> position);
   ```

   - 参数：
     - `position`：出生地位置。
   - 返回类型：无

   使用 `ChooseOrigin` 方法选择无人作战系统的出生地。

2. **移动**

   ```cpp
   agent.Move(Position<float> position);
   ```

   - 参数：
     - `position`：目标位置。
   - 返回类型：无

   使用 `Move` 方法使无人作战系统移动到指定位置。

3. **停止移动**

   ```cpp
   agent.Stop();
   ```

   - 返回类型：无

   使用 `Stop` 方法停止无人作战系统的移动。

4. **拾取资源**

   ```cpp
   agent.PickUp(SupplyKind target_supply, int count);
   ```

   - 参数：
     - `target_supply`：目标资源种类。
     - `count`：数量。
   - 返回类型：无

   使用 `PickUp` 方法使无人作战系统拾取当前脚下 1×1 方格上的资源。

5. **放弃资源**

   ```cpp
   agent.Abandon(SupplyKind target_supply, int count);
   ```

   - 参数：
     - `target_supply`：目标资源种类。
     - `count`：数量。
   - 返回类型：无

   使用 `Abandon` 方法使无人作战系统放弃背包中的指定数量的资源。

6. **切换武器**

   ```cpp
   agent.SwitchFirearm(FirearmKind target_firearm);
   ```

   - 参数：
     - `target_firearm`：目标武器的种类。
   - 返回类型：无

   使用 `SwitchFirearm` 方法切换无人作战系统的当前武器。

7. **使用药品**

   ```cpp
   agent.UseMedicine(MedicineKind target_medicine);
   ```

   - 参数：
     - `target_medicine`：药品种类。
   - 返回类型：无

   使用 `UseMedicine` 方法使用药品恢复无人作战系统的生命值。

8. **使用手榴弹**

   ```cpp
   agent.UseGrenade(Position<float> position);
   ```

   - 参数：
     - `position`：目标位置。
   - 返回类型：无

   使用 `UseGrenade` 方法投掷手榴弹攻击敌人或破坏墙体。

9. **攻击**

   ```cpp
   agent.Attack(Position<float> position);
   ```

   - 参数：
     - `position`：目标位置。
   - 返回类型：无

   使用 `Attack` 方法使无人作战系统攻击指定位置的敌人。

### 状态查询

1. **判断是否连接到服务器**

   ```cpp
   bool connected = agent.IsConnected();
   ```

   - 返回类型：`bool`

   `IsConnected` 方法指示 Agent 是否已连接到服务器。

2. **判断游戏是否准备就绪**

   ```cpp
   bool ready = agent.IsGameReady();
   ```

   - 返回类型：`bool`

   `IsGameReady` 方法指示游戏是否已准备就绪，即是否已获取到所有必要的游戏状态信息。
