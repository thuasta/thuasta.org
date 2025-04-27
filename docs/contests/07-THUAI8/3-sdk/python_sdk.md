# Python SDK 文档

欢迎使用我们为比赛编写的 Python SDK！本文档将详细介绍可供选手调用的接口和功能，包括参数、返回值类型以及用法示例，帮助您更好地理解如何使用该 SDK 来控制您的 Agent 参与比赛。

仓库链接：[agent-python](https://github.com/thuasta/thuai-8/releases/download/v0.1.0/thuai-8-agent-python.zip)

## 模版说明

版本要求：**Python 3.11**

首先请安装依赖项，需要在命令行中输入：

```bash
pip install -r requirements.txt
```

你可以在 `logic.py` 中编写你的代码，`main.py` 会调用 `setup()`和 `loop()`函数以运行你的代码。对于有经验的开发者，你也可以修改项目中的其他任何文件。

在在命令行中运行以下命令来启动 Agent：

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

### 获取信息

1. **获取自身令牌**

    ```python
    token = agent.token
    ```

    - 返回类型：`str`

    `token` 方法将返回玩家自身的令牌。

2. **获取所有玩家信息**

    ```python
    players_info = agent.all_player_info
    ```

    - 返回类型：`Optional[List[PlayerInfo]]`

    `all_player_info` 属性将返回一个包含所有玩家信息的列表（包括自己的和对手的）。每个玩家信息包括玩家的武器、护甲、技能、位置等。

    :::info

    - 武器 `weapon` 包括每种武器的拥有情况。
    - 护甲 `armor` 包括护甲和护甲类技能的基本情况。
    - 技能 `skill` 包括所拥有的技能类别、使用时间等等。
    - 位置 `position` 包括所在地的坐标和坦克朝向。

    :::

3. **获取环境信息**

    ```python
    environment_info = agent.environment_info
    ```

    - 返回类型：`Optional[EnvironmentInfo]`

    `environment_info` 属性将返回环境相关的信息，包括所有普通墙体的列表、特殊技能墙体的列表、现存子弹的列表、玩家位置列表。

    :::info

    - 普通墙体 `walls` 包括每一处墙体的坐标和朝向。
    - 特殊技能墙体 `fences` 包括每一处墙体的坐标、朝向以及当前生命值。
    - 子弹 `bullet` 包括当前场上每一个子弹的位置、前进方向、速度、伤害大小以及已经飞行的距离。

    :::

4. **获取游戏状态信息**

    ```python
    game_statistics = agent.game_statistics
    ```

    - 返回类型：`Optional[GameStatistics]`

    `game_statistics` 属性将返回游戏状态相关信息，包括游戏的当前阶段、游戏的倒计时、游戏当前的 ticks 和每位玩家的累计分数。

5. **获取奖励信息**

    ```python
    available_buffs = agent.available_buffs
    ```

    - 返回类型：`Optional[AvailableBuffs]`

    `available_buffs` 属性将返回一个包含所有可获取奖励的列表。

### 操作 Agent

1. **向前移动**

    ```python
    agent.move_forward(distance: float = 1.0)
    ```

    - 参数类型：
        - `distance: float`：需要移动的距离，默认为 1.0。
    - 返回类型：`None`

    使用 `move_forward` 方法让 Agent 向前移动指定的距离。

2. **向后移动**

    ```python
    agent.move_backward(distance: float = 1.0)
    ```

    - 参数类型：
        - `distance: float`：需要移动的距离，默认为 1.0。
    - 返回类型：`None`

    使用 `move_backward` 方法让 Agent 向后移动指定的距离。

3. **顺时针转动**

    ```python
    agent.turn_clockwise(angle: int = 45)
    ```

    - 参数类型：
        - `angle: int`：转动的角度，默认为 45 度。
    - 返回类型：`None`

    使用 `turn_clockwise` 方法让 Agent 顺时针转动指定的角度。

4. **逆时针转动**

    ```python
    agent.turn_counter_clockwise(angle: int = 45)
    ```

    - 参数类型：
        - `angle: int`：转动的角度，默认为 45 度。
    - 返回类型：`None`

    使用 `turn_counter_clockwise` 方法让 Agent 逆时针转动指定的角度。

5. **攻击**

    ```python
    agent.attack()
    ```

    - 参数类型：`None`
    - 返回类型：`None`

    使用 `attack` 方法让 Agent 发射子弹。

6. **使用技能**

    ```python
    agent.use_skill(skill: SkillName)
    ```

    - 参数类型：
        - `skill: SkillName`：技能的种类。
    - 返回类型：`None`

    使用 `use_skill` 方法让 Agent 使用某一技能。

7. **选择奖励**

    ```python
    agent.select_buff(buff: BuffName)
    ```

    - 参数类型：
        - `buff: BuffName`：奖励的种类。
    - 返回类型：`None`

    使用 `select_buff` 方法为 Agent 选择某一奖励。

### 状态查询

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
