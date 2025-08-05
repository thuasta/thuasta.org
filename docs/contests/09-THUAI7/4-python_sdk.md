# Python SDK 文档

欢迎使用我们为比赛编写的 Python SDK！本文档将详细介绍可供选手调用的接口和功能，包括参数、返回值类型以及用法示例，帮助您更好地理解如何使用该 SDK 来控制您的无人作战系统参与比赛。

仓库链接：[agent-template-python](https://github.com/thuasta/thuai-7-agent-template-python)

## 模板说明

版本要求：**Python 3.12**

首先请安装依赖项，需要在命令行中输入：

```bash
pip install -r requirements.txt
```

你可以在 `logic.py` 中编写你的代码。对于有经验的开发者，你也可以修改项目中的其他任何文件。

在命令行中运行以下命令来启动 Agent：

```bash
python main.py --server <server> --token <token>
```

- `<server>`：游戏的服务器地址。（默认值：`ws://localhost:14514`）
- `<token>`：Agent 的令牌。（默认值：`1919810`）

例如：

```bash
python main.py --server ws://localhost:14514 --token 1919810
```

:::warning

- 运行此模板前，请确保你的环境满足 Python 版本要求，并已正确安装所有依赖项。
- 如果修改了模板内容，可能需要相应地调整运行命令或代码逻辑。
- 在运行前，请务必检查你的服务器地址和令牌是否正确，以确保 Agent 能够成功连接到游戏服务器。

:::

## 接口介绍

### 获取游戏状态信息

1. **获取所有玩家信息**

   ```python
   players_info = agent.all_player_info
   ```

   - 返回类型：`Optional[List[PlayerInfo]]`

   `all_player_info` 属性将返回一个包含所有玩家信息的列表。每个玩家信息包括玩家的 ID、生命值、护甲、当前护甲血量、速度、当前武器、武器池、位置和背包物品等。

2. **获取地图信息**

   ```python
   game_map = agent.map
   ```

   - 返回类型：`Optional[Map]`

   `map` 属性将返回地图信息，包括地图的长度和障碍物位置。

3. **获取资源信息**

   ```python
   supplies = agent.supplies
   ```

   - 返回类型：`Optional[List[Supply]]`

   `supplies` 属性将返回一个包含所有资源信息的列表。每个资源信息包括资源的种类、位置和数量。

4. **获取安全区信息**

   ```python
   safe_zone = agent.safe_zone
   ```

   - 返回类型：`Optional[SafeZone]`

   `safe_zone` 属性将返回安全区信息，包括安全区的中心位置和半径。

5. **获取自身 ID**

   ```python
   self_id = agent.self_id
   ```

   - 返回类型：`Optional[int]`

   `self_id` 属性将返回自身玩家的 ID。

6. **获取 ticks**

   ```python
   ticks = agent.ticks
   ```

   - 返回类型：`Optional[int]`

   `ticks` 属性将返回当前 ticks

### 操作无人作战系统

1. **选择出生地**

   ```python
   agent.choose_origin(position)
   ```

   - 参数：`position` (Position[float]) 代表出生地位置
   - 返回类型：`None`

   使用 `choose_origin` 方法选择无人作战系统的出生地。

2. **移动**

   ```python
   agent.move(position)
   ```

   - 参数：`position` (Position[float]) 代表目标位置
   - 返回类型：`None`

   使用 `move` 方法使无人作战系统移动到指定位置。

3. **停止移动**

   ```python
   agent.stop()
   ```

   - 返回类型：`None`

   使用 `stop` 方法停止无人作战系统的移动。

4. **拾取资源**

   ```python
   agent.pick_up(item_kind, count)
   ```

   - 参数：
     - `item_kind` (ItemKind) - 资源种类
     - `count` (int) - 数量
   - 返回类型：`None`

   使用 `pick_up` 方法使无人作战系统拾取当前脚下 1×1 方格上的资源。

5. **放弃资源**

   ```python
   agent.abandon(item_kind, count)
   ```

   - 参数：
     - `item_kind` (ItemKind) - 资源种类
     - `count` (int) - 数量
   - 返回类型：`None`

   使用 `abandon` 方法使无人作战系统放弃背包中的指定数量的资源。

6. **切换武器**

   ```python
   agent.switch_firearm(item_kind)
   ```

   - 参数：`item_kind` (FirearmKind) - 目标武器的种类
   - 返回类型：`None`

   使用 `switch_firearm` 方法切换无人作战系统的当前武器。

7. **使用药品**

   ```python
   agent.use_medicine(medicine_kind)
   ```

   - 参数：`medicine_kind` (MedicineKind) - 药品种类
   - 返回类型：`None`

   使用 `use_medicine` 方法使用药品恢复无人作战系统的生命值。

8. **使用手榴弹**

   ```python
   agent.use_grenade(position)
   ```

   - 参数：`position` (Position[float]) - 目标位置
   - 返回类型：`None`

   使用 `use_grenade` 方法投掷手榴弹攻击敌人或破坏墙体。

9. **攻击**

   ```python
   agent.attack(position)
   ```

   - 参数：`position` (Position[float]) - 目标位置
   - 返回类型：`None`

   使用 `attack` 方法使无人作战系统攻击指定位置的敌人。

### 其他

1. **判断是否连接到服务器**

   ```python
   connected = agent.is_connected()
   ```

   - 返回类型：`bool`

   `is_connected` 方法指示 Agent 是否已连接到服务器。

2. **判断游戏是否准备就绪**

   ```python
   ready = agent.is_game_ready()
   ```

   - 返回类型：`bool`

   `is_game_ready` 方法指示游戏是否已准备就绪，即是否已获取到所有必要的游戏状态信息。
