# 比赛规则

:::info 存档文档

本页规则由 [thuai-9 仓库的 `docs/rule.md`](https://github.com/thuasta/thuai-9/blob/main/docs/rule.md) 移植，仅作存档参考。本届比赛已于 2026 年春季学期结束，正式决赛所用的参数与新闻文案可能与下文不同，请以比赛当时的公告为准。

文中出现的 `server/`、`thuai-9-server/data/config.json`、`server/src/thuai/Utility/Config.cs` 等，均指 [thuai-9 仓库](https://github.com/thuasta/thuai-9)中的对应文件。

:::

> 本文以当前 `server/` 实现为准，并结合当前仓库内的部署配置 `thuai-9-server/data/config.json` 说明“现在跑起来时”的有效规则。
>
> 需要特别注意两件事：
>
> 1. 当前观战/广播里展示给玩家的 `MidPrice` 不是月末结算和研报结算真正使用的价格口径。
> 2. 当前代码里的新闻文案确实是从一组固定样例中随机选择；**正式决赛不会沿用这组现在公开的固定文案**，因此策略里不要把具体字符串写死，只能依赖消息到达时你自己做的方向判断逻辑。

## 1. 当前生效参数

### 1.1 当前仓库部署配置中的显式参数

以下参数直接来自 `thuai-9-server/data/config.json`：

- `ticksPerSecond = 10`
- `tradingDayCount = 3`
- `tradingDayTicks = 30`
- `infiniteMode = false`
- `strategySelectionTicks = 40`
- `minimumPlayerCount = 2`
- `playerWaitingTicks = 200`
- `disconnectedPlayerRetentionTicks = 0`
- `initialMora = 1_000_000`
- `initialGold = 1_000`
- `initialGoldPrice = 1_000`
- `defaultNetworkDelay = 1`
- `defaultFeeRate = 0.0002`
- `maxOrdersPerTick = 2`
- `maxImmediateOrdersPerDay = 1`
- `maxRestingOrdersPerDay = 1`
- `maxReportsPerTick = 1`
- `maxReportsPerNews = 1`
- `researchEnabled = true`
- `researchNewsScheduleTicks = [1, 11, 21]`
- `researchWindowTicks = 2`
- `researchSettlementDelay = 3`
- `baseResearchReward = 10_000`
- `npcOrdersPerTick = 3`

### 1.2 当前实现中新增但配置文件未显式写出的参数

这些参数在当前 `thuai-9-server/data/config.json` 里没有显式填写，因此会回退到 `server/src/thuai/Utility/Config.cs` 中的默认值：

- `newsSentimentDurationTicks = 3`
- `npcNewsReactionDelayTicks = 1`
- `settlementTwapWindowTicks = 5`
- `markPriceDepthLevels = 3`
- `markPriceMinLevelQuantity = 20`
- `markPriceMinOrderAgeTicks = 1`
- `markPriceMaxDeviationRatioFromLastPrice = 0.30`
- `safePriceMaxDailyMoveRatio = 0.15`
- `maxOrderPriceDeviationRatioFromSafePrice = 0.30`
- `researchMaxAbsRewardPerReport = 100_000`
- `researchPositiveRewardBudgetPerPlayerPerMonth = 200_000`
- `systemInitialMora = 100_000_000`
- `systemInitialGold = 100_000`
- `systemMaxNetBuyQuantityPerDay = 200`
- `systemMaxNetSellQuantityPerDay = 200`
- `systemMaxGrossTradeQuantityPerDay = 300`
- `circuitBreakerEnabled = true`
- `circuitBreakerTriggerRatio = 0.25`
- `circuitBreakerDurationTicks = 2`
- `initialLiquidityLevels = 8`
- `initialLiquidityBaseQuantity = 60`
- `initialLiquidityQuantityStep = 10`

### 1.3 当前实现里虽然存在但实际上未参与逻辑的参数

- `newsIntervalMin`
- `newsIntervalMax`

当前 `NewsSystem` 已经完全按 `researchNewsScheduleTicks` 固定日程发新闻；`newsIntervalMin/Max` 目前并不会影响新闻发布时间。

## 2. 名词与时间单位

当前实装里，“交易日”和“交易 tick”在一个月内是一一对应的：

- 每进入一次 `TradingDay.Tick()`，交易日数 `CurrentDayNumber` 增加 1。
- 当前配置 `ticksPerSecond = 10`，所以现实时间里大约每 `0.1s` 自动推进一天。
- 一个自然月共有 `30` 个交易日，对应 `1` 到 `30` 日。
- 月内还有一个初始化时刻 `tick 0`：它不会对玩家开放下单，但会先生成初始盘口，并记录一笔内部价格历史。这个 `tick 0` 会影响第 1 条新闻相关的 TWAP 计算。

## 3. 整局游戏的生命周期

### 3.1 Waiting 阶段

- 游戏启动后，初始阶段为 `Waiting`。
- 只要在线/在局玩家数 `>= minimumPlayerCount`，等待倒计时就会每个全局 tick 减 1。
- 当前配置要求至少 `2` 名玩家，并等待 `200` 个全局 tick。
- 如果中途玩家数重新掉到 `2` 以下，倒计时会暂停，但**不会重置**。
- 当倒计时归零后，阶段切换到 `PreparingGame`，随后立刻进入新月份的策略选择阶段。

### 3.2 StrategySelection 阶段

每个月开始前都会进入一次策略阶段：

- 月份号先自增。
- 所有玩家的资产重置为本月初始资产。
- 所有玩家本月计数器重置。
- 已经拥有的策略卡不会丢失，但“每月一次”类状态会重置。
- 系统从三类卡池中各随机抽出 1 张作为本月可选项。

当前阶段的退出条件是二选一：

- 所有在局玩家都已提交选择。
- 或者策略阶段经过 `strategySelectionTicks = 40` 个全局 tick 后超时。

如果超时前某位玩家没有选择，则该玩家这个月就不会新增策略卡。

### 3.3 TradingDay 阶段

- 策略阶段结束后进入 `TradingDay`。
- 这里**不存在“所有玩家都准备好才进入下一天”**的机制。
- 只要服务器时钟继续走，每个全局 tick 都会自动推进一天。
- 当前配置下，一整个月 `30` 天会在大约 `3` 秒内跑完。

### 3.4 Settlement 阶段

结算阶段会占用两个全局 tick：

- 第 1 个 tick：计算当月结算结果、更新累计净值、生成当月结算通知。
- 第 2 个 tick：如果还没到第 3 个月，则跳到下个月的策略阶段；如果已经到第 3 个月，则进入 `Finished`。

当前配置 `infiniteMode = false`，因此整局固定 3 个月结束。

### 3.5 当前实现中的断线行为

当前仓库部署配置里有：

- `disconnectedPlayerRetentionTicks = 0`

但在当前实现里，这个值的含义不是“立刻移除断线玩家”，而是：

- **关闭自动过期移除逻辑**

也就是说，在当前非 infinite 模式下：

- 玩家断线后不会因为超时而被自动踢出游戏
- 也不会因此自动撤单
- 除非外部管理逻辑手动移除该玩家

## 4. 每个交易日内部的处理顺序

对调试策略来说，最重要的是知道“一天内部到底先发生什么”：

1. `CurrentTick` 自增，进入新的一天。
2. 对每个玩家执行：
   - 重置当日动作计数器。
   - 解锁到期的锁仓黄金。
   - 执行策略卡的 `OnTick` 逻辑。
3. 如果今天在新闻日程表里，则发布真实新闻。
4. 检查是否有玩家应当在今天收到内幕消息预览。
5. NPC 按当前有效新闻情绪生成系统订单。
6. 处理所有“今天到达”的挂起订单（包括玩家旧订单和 NPC 刚生成的 0 延迟订单）。
7. 记录今天的内部价格历史（用于后续 TWAP）。
8. 结算今天到期的研报。
9. 如果今天已经是本月第 `30` 天，则本月交易结束。

这意味着：

- 新闻是在 NPC 当天下单之前发布的。
- NPC 的 0 延迟订单会在当天参与撮合。
- 玩家订单是否算“即时单”或“挂单”，是在**到达日**第 6 步里判定，不是在提交时判定。
- 若熔断已经处于激活状态，则当天会跳过第 5 步和第 6 步：NPC 不会发新单，所有到达订单也不会被处理，而是继续留到之后的非熔断日再处理。

## 5. 账户、订单与撮合规则

### 5.1 账户资产

每位玩家维护以下主要资产状态：

- `Mora`：可用摩拉
- `FrozenMora`：买单冻结的摩拉
- `Gold`：可用黄金
- `FrozenGold`：卖单冻结的黄金
- `LockedGold`：锁仓黄金，计入净值，但在解锁前不能卖出

每月开始时，玩家资产重置为：

- `1_000_000` 摩拉
- `1_000` 黄金

### 5.2 下单的提交条件

订单仅在 `TradingDay` 阶段接收，并且提交时必须满足：

- 当前不处于熔断状态
- 价格 `price > 0`
- 数量 `quantity > 0`
- 买单名义金额 `price * quantity` 不得溢出 `Int64`
- 订单价格必须落在当前 `SafePrice` 的动态价格带内
  - 当前默认参数下，允许区间是 `SafePrice * [0.7, 1.3]`
- 买单时，账户可用摩拉必须至少覆盖：
  - `price * quantity`
  - 加上预留手续费 `ceil(price * quantity * feeRate)`
- 卖单时，账户可用黄金必须至少覆盖卖出数量

提交成功后：

- 买单会冻结 `price * quantity + 预留手续费`
- 卖单会冻结对应数量的黄金

### 5.3 订单到达时间

订单的实际到达日为：

`arrivalDay = 当前日 + NetworkDelay + PendingNextOrderExtraDelayDays`

当前默认：

- `NetworkDelay = 1`
- 若被 `网络风暴` 命中，则玩家“下一张订单”会额外 `+1` 天延迟

当前实现中的几个关键结论：

- 默认情况下，今天提交的订单会在**下一天**到达。
- 如果订单的 `arrivalDay > 30`，订单会在提交时直接被拒绝。
- 因此在默认延迟 `1` 下，玩家最晚只能在第 `29` 天提交还能到达本月的订单。
- `网络风暴` 命中后，若你在第 `29` 天才提交默认延迟订单，则它会变成到达第 `31` 天，从而被直接拒绝。

### 5.4 订单优先级

当某天处理到达订单时，所有到达订单会按以下顺序排序：

1. `PriorityRank` 小者优先
2. `ArrivalTick` 小者优先
3. `SubmitSequence` 小者优先
4. `OrderId` 小者优先

当前正常玩家订单的 `PriorityRank` 默认是 `1`。

只有一种情况会变成 `0`：

- 玩家已使用“内幕消息”，并且该订单的**到达日**正好等于对应真实新闻发布日。

注意这里看的是**到达日**，不是提交日。

### 5.5 即时单与挂单的判定时机

订单到达时，系统才根据当时盘口决定它属于：

- `Immediate`：买价 `>= 卖一`，或卖价 `<= 买一`
- `Resting`：否则进入订单簿排队

这点非常重要，因为它直接决定该订单消耗哪个每日配额。

### 5.6 提交配额与到达配额是两套限制

当前实现里，玩家动作限制分成两层：

### 提交层限制

在“当前这一天里”，玩家总共最多提交 `maxOrdersPerTick = 2` 张订单。

也就是说：

- 一天内第 1、2 次下单可能成功提交
- 第 3 次下单会在提交入口直接失败

### 到达层限制

订单真正到达并被处理时，还要再检查：

- 每天最多 `1` 张即时单：`maxImmediateOrdersPerDay = 1`
- 每天最多 `1` 张挂单：`maxRestingOrdersPerDay = 1`

如果某张订单到达时发现会超出它所属类别的到达层限制，则：

- 该订单会被自动取消
- 冻结资金/黄金会退回
- 但它之前已经消耗过提交层名额

因此，**“提交成功”不代表“到达日一定会被接受”**。

一个典型例子：

- 你在第 5 天连续提交了两张买单，二者都在第 6 天到达。
- 到第 6 天时，这两张买单都满足 `price >= 卖一`，于是都被判定为即时单。
- 第一张会成交/尝试成交；第二张会因为超出“每天最多 1 张即时单”而被自动取消。

### 5.7 FlashTrading 对配额的实际影响

`闪电交易` 给的是 `BonusImmediateOrdersToday = 1`，因此只会把“即时单每日上限”从

- `1`

提高到

- `2`

但它**不会**提高 `maxOrdersPerTick`，所以默认配置下：

- 你在闪电交易生效日仍然最多只能提交 `2` 张订单
- 只是这 `2` 张都可以在到达时被接受为即时单

### 5.8 撮合规则

当某张到达订单被处理时：

- 若它是即时单，就持续吃对手方最优价，直到：
  - 自己完全成交，或
  - 盘口不再可成交
- 若它吃不完，剩余部分会被取消并退款，不会挂入订单簿
- 若它是挂单，就先尝试和对手盘成交；若仍有剩余，则剩余部分进入订单簿

成交价永远使用**被吃掉的订单（maker）的价格**。

### 5.9 撤单

撤单可以撤两类订单：

- 还在“未到达队列”中的挂起订单
- 已经在订单簿中的活动挂单

撤单限制：

- 只能撤自己的订单
- 已成交或已取消订单无法再撤
- 撤单不会占用每日下单配额

### 5.10 自成交（wash trade）

当前实现允许玩家自己的新订单与自己挂在簿上的旧订单成交。

其影响是：

- 会正常产生买卖成交
- 会正常支付双边手续费
- 但**不会增加 `MonthlyTradeCount`**

因此，当前实现下通过自成交不能提升月末“成交笔数平手时的胜负 tiebreaker”。

### 5.11 手续费结算细节

当前部署配置下手续费率为：

- `0.0002 = 0.02%`

实现细节：

- 买单提交时先按挂单价格预留手续费
- 若实际成交价更优，多冻结的价格差会退回
- 若最终实际手续费高于预留手续费，差额会从可用摩拉继续补扣
- 卖方在每次成交时直接收到 `成交额 - 手续费`

## 6. 公开盘口、内部价格与结算价格

### 6.1 月初初始盘口

每个月 `TradingDay.Initialize()` 时，系统会直接在订单簿中放入初始流动性：

- 买盘价位：`initialGoldPrice - 1` 到 `initialGoldPrice - 8`
- 卖盘价位：`initialGoldPrice + 1` 到 `initialGoldPrice + 8`
- 在当前配置 `initialGoldPrice = 1000` 下，即：
  - 买盘 `999, 998, ..., 992`
  - 卖盘 `1001, 1002, ..., 1008`
- 第 `offset` 档数量为：`initialLiquidityBaseQuantity + offset * initialLiquidityQuantityStep`
- 当前有效默认值下，即：
  - 第 1 档 `70`
  - 第 2 档 `80`
  - ...
  - 第 8 档 `140`

### 6.2 对外广播给玩家的价格口径：MidPrice

市场广播里的 `MidPrice` 计算方式是：

- 若买一和卖一都存在：`(bestBid + bestAsk) / 2`
- 若某一侧为空：退回 `LastPrice`

这个 `MidPrice` 还会被用于：

- 实时 `PLAYER_STATE` 中展示给玩家的 `Nav`
- 止损名刀激活时记录的参考价格
- 观战页面的盘面展示

### 6.3 内部价格链路：MarkPrice -> SafePrice -> SettlementPrice

月结和研报**不直接使用 MidPrice**。当前内部价格口径分成三层：

1. `MarkPrice`：根据盘口算出来的原始内部价格
2. `SafePrice`：对 `MarkPrice` 再做单日涨跌约束后的安全价格
3. `SettlementPrice`：最终真正用于月结和研报的价格

### 6.4 MarkPrice 的计算规则

系统每天会先尝试从订单簿中计算一个原始 `MarkPrice`。参与计算的挂单必须同时满足：

1. 挂单足够“老”：
   - `currentTick - arrivalTick >= markPriceMinOrderAgeTicks`
   - 当前有效默认值为 `1`
2. 单档聚合后的量达到阈值：
   - `levelQty >= markPriceMinLevelQuantity`
   - 当前有效默认值为 `20`
3. 挂单价格没有相对 `LastPrice` 离群：
   - 当前有效默认值 `markPriceMaxDeviationRatioFromLastPrice = 0.30`
   - 即只纳入位于 `LastPrice * [0.7, 1.3]` 区间内的挂单

之后：

1. 分别取买盘和卖盘前 `markPriceDepthLevels` 档
   - 当前有效默认值为 `3`
2. 分别求买盘和卖盘的加权平均价
3. `MarkPrice = ceil((weightedBid + weightedAsk) / 2)`

若当天无法算出合法 `MarkPrice`，则本次计算直接回退到“前一日 `SafePrice`”；在初始化时刻若连这个都没有，则使用 `initialGoldPrice`。

这意味着：

- 仅仅把盘口里挂出非常离谱的高价/低价单，并不保证它能污染 `MarkPrice`
- 即使该单真实存在于盘口里，只要它相对 `LastPrice` 偏离过大，也会被排除在内部价格计算之外

### 6.5 SafePrice 的计算规则

算出原始 `MarkPrice` 后，服务器还会再记录一条 `SafePrice` 历史：

- 若当前不在熔断中：
  - `SafePrice` 会把原始 `MarkPrice` 再限制在“前一日 `SafePrice`”附近
  - 当前有效默认值 `safePriceMaxDailyMoveRatio = 0.15`
  - 即每天最多只允许相对前一日 `SafePrice` 上下波动 `15%`
- 若当前已经处于熔断中：
  - 当天 `SafePrice` 会直接冻结为前一日 `SafePrice`

因此当前版本里，即便原始盘口和原始 `MarkPrice` 想剧烈跳变，真正进入内部价格历史的 `SafePrice` 仍然会被限速。

### 6.6 真正用于结算的价格口径：SettlementPrice

当前 `SettlementPriceAtTick(t)` 的优先级是：

1. 先看最近 `settlementTwapWindowTicks` 个记录点内是否有真实成交
2. 如果有成交，则优先使用这段窗口内的**成交价 TWAP**
3. 如果完全没有成交，再回退为这段窗口内的 **SafePrice TWAP**

当前有效默认值：

- `settlementTwapWindowTicks = 5`

也就是说：

- 月末结算时，优先使用最后 5 个交易日内的成交价 TWAP
- 研报在新闻发布日和结算日使用的，也都是各自那个时点向前看的同一套 `SettlementPriceAtTick`
- 只有在该窗口完全没有成交时，才会退回到 `SafePrice` 的短窗平均

如果窗口左端越过了 `tick 0`，就会截断到 `tick 0`。因此：

- 第 1 条新闻（第 1 天）的研报结算，仍可能把初始化时刻 `tick 0` 的内部价格纳入回退口径

### 6.7 熔断机制

当前版本带有交易熔断：

- `circuitBreakerEnabled = true`
- `circuitBreakerTriggerRatio = 0.25`
- `circuitBreakerDurationTicks = 2`

触发规则：

- 若某一天算出的原始 `MarkPrice` 相对“前一日 `SafePrice`”偏离至少 `25%`
- 则从后续开始进入熔断，持续 `2` 个交易日

熔断激活时：

- 玩家新的买卖单会在提交入口直接被拒绝
- NPC 不会发新单
- 当天不会处理任何到达订单
- `SafePrice` 会冻结不动
- 撤单接口仍然可用

### 6.8 一个非常重要的调试提醒

当前玩家能实时看到的是 `MidPrice`，但：

- 月末胜负
- 研报奖惩
- 真正的内部价格历史

都使用 `MarkPrice -> SafePrice -> SettlementPrice` 这一套内部口径。

因此，“把卖一/买一做出一个很夸张的瞬时中间价”不等于“你已经改掉了结算价”；当前版本里，离群盘口过滤、`SafePrice` 限速和成交优先的结算价都会继续削弱这种操纵。

## 7. NPC 下单逻辑

### 7.1 总体定位

当前 NPC 已经不是“追涨杀跌的方向交易者”，而是更接近“对称做市商”：

- 每天固定生成 `npcOrdersPerTick` 张系统订单
- 当前配置下为 `3` 张
- 它不会主动跨价成交
- 它的作用主要是补充盘口流动性，而不是直接做主动扫盘

### 7.2 NPC 什么时候下单

每天内部顺序里：

- 先出当天真实新闻
- 再检查内幕消息预览
- 再由 NPC 生成当天系统订单
- 然后统一处理今天到达的订单

因此 NPC 生成的 0 延迟订单会在当天进入处理队列。

### 7.3 NPC 读取什么新闻情绪

NPC 只读取：

- **真实新闻**
- 且要满足新闻已经过了 `npcNewsReactionDelayTicks`
- 且新闻年龄还没有超过 `newsSentimentDurationTicks`

当前有效默认值：

- `npcNewsReactionDelayTicks = 1`
- `newsSentimentDurationTicks = 3`

精确公式是：

- NPC 在第 `D` 天读取的是 `effectiveTick = D - 1` 时刻仍有效的最后一条真实新闻
- 一条真实新闻发布于第 `N` 天时，只有当 `effectiveTick - N <= 3` 时才算有效

因此在当前默认参数下，**第 `N` 天发布的真实新闻会影响 NPC 在第 `N+1` 到第 `N+4` 天的行为**。

### 7.4 假新闻是否影响 NPC

不会。

原因是：

- 真实新闻进入 `_realNews`
- 假新闻只进入 `_allNews`
- NPC 调用的是 `GetEffectiveSentiment(..., includeFakeNews: false)`

所以 `舆情打击` 只会影响信息面，不会直接驱动 NPC 的买卖方向。

### 7.5 NPC 的具体报价方式

当前 `npcOrdersPerTick = 3` 时，每天 NPC 会：

- 先生成 1 张买单
- 再生成 1 张卖单
- 因为总数是奇数，再额外生成 1 张单边补充单

这个“额外单边”的方向选择规则是：

- 如果买一聚合量小于卖一聚合量，则补买单
- 如果卖一聚合量小于买一聚合量，则补卖单
- 如果两边一样，则随机选买或卖

每张 NPC 单子的数量：

- 随机均匀取 `4` 到 `12`

价格逻辑：

- 若当前有效情绪为 `Bullish`，NPC 只会把“报价中心”上移 `1`
- 若为 `Bearish`，只会把“报价中心”下移 `1`
- 不会因此改成“多发买单少发卖单”
- 也不会主动穿越买一卖一去吃盘

更具体地说：

- 买单会尽量贴着当前买一附近，但被强制压在卖一以下
- 卖单会尽量贴着当前卖一附近，但被强制抬在买一以上

所以当前版本里，NPC 的主要作用是“厚盘口 + 轻微顺新闻平移重心”，不是“替玩家把价格继续推上去/砸下去”。

### 7.6 NPC 的资金与库存约束

当前版本中，`SYSTEM` 已经有真实资产约束和日内流量约束。

月初初始值默认是：

- `systemInitialMora = 100_000_000`
- `systemInitialGold = 100_000`

因此：

- `SYSTEM` 挂买单时，必须有足够摩拉可冻结
- `SYSTEM` 挂卖单时，必须有足够黄金可冻结
- 初始盘口本身也会真实消耗 `SYSTEM` 的冻结资产
- NPC 后续每天生成的系统订单，同样要受这些资产约束

此外，`SYSTEM` 与玩家成交时还有日内限制：

- `systemMaxNetBuyQuantityPerDay = 200`
- `systemMaxNetSellQuantityPerDay = 200`
- `systemMaxGrossTradeQuantityPerDay = 300`

这些限制的含义是：

- 当天 `SYSTEM` 向玩家净买入的总量最多 `200`
- 当天 `SYSTEM` 向玩家净卖出的总量最多 `200`
- 当天 `SYSTEM` 与玩家成交的总量最多 `300`

一旦某个限制被打满：

- 之后当天继续想和 `SYSTEM` 成交的订单，会因为可成交量为 `0` 而被挡住
- 若阻塞点正好是某张 `SYSTEM` 挂单，则那张系统挂单会被自动撤掉

## 8. 新闻系统

### 8.1 真实新闻发布时间

当前实现中，真实新闻只在：

- 第 `1` 天
- 第 `11` 天
- 第 `21` 天

发布。

也就是说，一个月固定 3 条真实新闻。

### 8.2 真实新闻生成方式

每次真实新闻发布时：

1. 先以 `50% / 50%` 随机决定方向：
   - `Bullish`
   - `Bearish`
2. 再从对应方向的固定文案数组中随机抽一条文本

### 重要特别说明：正式决赛不会使用当前公开文案

当前仓库里的新闻文本确实是从一组固定公开样例中抽取的，这方便本地联调和可复现测试。

但正式决赛中：

- **不会沿用现在这组公开固定文案**
- 因此选手不应把策略写成“匹配某几句固定文本就做多/做空”
- 更稳妥的方式是把新闻文本视为普通输入，自己做关键词/语义判断，或者直接把它作为一个黑盒输入特征

如果你的策略当前是硬编码匹配这几条字符串，那么它只适用于现阶段测试环境，不适用于正式决赛。

### 8.3 假新闻的生成方式

`舆情打击` 触发时会：

- 立即随机一个 `Bullish` / `Bearish`
- 再从当前代码内置的对应文案数组中随机抽一条
- 作为 `IsFake = true` 的新闻立即广播

因此假新闻和真新闻在“文本来源”上看起来都像从同一个样本文案池中抽出来的，只是 `IsFake` 标志不同。

## 9. 研报系统

### 9.1 提交条件

当前配置下：

- `researchEnabled = true`
- 每条新闻提交窗口 `researchWindowTicks = 2`
- 结算延迟 `researchSettlementDelay = 3`

一条新闻发布在第 `N` 天时，该新闻的研报允许在以下日期提交：

- 第 `N` 天
- 第 `N+1` 天
- 第 `N+2` 天

超过第 `N+2` 天后提交会被拒绝。

### 9.2 提交限制

当前玩家还必须同时满足：

- 每天最多提交 `1` 份研报：`maxReportsPerTick = 1`
- 每条新闻每个玩家最多提交 `1` 次：`maxReportsPerNews = 1`
- 同一玩家对同一新闻若已有待结算或已结算研报，也不能再次提交

### 9.3 可选方向

当前实现支持三种 `Prediction`：

- `Long`
- `Short`
- `Hold`

注意：`Hold` 在当前实现里几乎不会有正收益，原因见下文。

### 9.4 研报的结算价格与真实涨跌

对新闻 `newsId`：

- `priceAtPublish = SettlementPriceAtTick(news.PublishTick)`
- `priceAtSettlement = SettlementPriceAtTick(news.PublishTick + 3)`
- `actualChange = priceAtSettlement - priceAtPublish`

也就是说，研报结算用的是**两个内部结算价的差值**，而不是两天的瞬时 `MidPrice` 差值。

注意这里的 `SettlementPriceAtTick` 当前优先使用：

- 近窗成交价 TWAP
- 若窗口没有成交，再回退到 `SafePrice` TWAP

### 9.5 正确性判定

- `Long`：当且仅当 `actualChange > 0` 时正确
- `Short`：当且仅当 `actualChange < 0` 时正确
- `Hold`：当且仅当 `actualChange == 0` 时正确

但当前奖励代码里还有一个额外效果：

- 若 `abs(actualChange) == 0`，所有人奖励都直接记为 `0`

所以：

- `Hold` 即使“判定正确”，也只能得到 `0`
- `Hold` 只要价格不完全相等，就会被判错并吃罚分
- 因此当前版本中，`Hold` 不会产生正收益

### 9.6 提交排名与奖惩公式

同一条新闻下，所有到期研报会按：

1. `SubmitTick` 早者优先
2. 若同 tick，再按 `PlayerToken` 字典序

得到提交排名 `SubmissionRank`。

奖励绝对值公式：

`rewardMagnitude = floor(baseResearchReward * rankMultiplier * abs(actualChange) / max(1, priceAtPublish))`

其中：

- `baseResearchReward = 10_000`
- `rankMultiplier = max(1, 报告总数 - 当前排序位置)`
- 当前单份研报奖励绝对值上限：`researchMaxAbsRewardPerReport = 100_000`
- 当前每位玩家每月“正向研报收益预算”上限：`researchPositiveRewardBudgetPerPlayerPerMonth = 200_000`

举例：

- 同一新闻若有 2 份报告
- 第 1 名的 `rankMultiplier = 2`
- 第 2 名的 `rankMultiplier = 1`

最终：

- 预测正确：先算出 `rewardMagnitude`，再受“单玩家单月正收益预算”约束
- 预测错误：`-rewardMagnitude`

这意味着：

- 当前版本中的研报奖励已经不再随绝对价差线性爆炸
- 即使结算价涨很多，研报奖励也会先除以 `priceAtPublish`
- 单份研报和单月累计正收益都还有额外上限

若玩家摩拉不够支付负奖励，则实际只会扣到 `0` 为止，不会出现负摩拉。

### 9.7 假新闻与研报

如果新闻本身是假的：

- 假新闻的发布者，仍按真实 `actualChange` 正常判定对错
- 其他玩家对该假新闻提交的研报会被**强制判错**

因此：

- 被 `舆情打击` 骗到的普通玩家，即使方向刚好猜中真实市场，也照样记错

## 10. 策略卡系统

### 10.1 抽卡与持有规则

当前有三类卡池：

- Infrastructure：`内幕消息`、`闪电交易`
- RiskControl：`止损名刀`、`定向增发`
- FinTech：`网络风暴`、`舆情打击`

每个月策略阶段：

- 系统从每个类别里随机抽 1 张作为当月选项
- 两位玩家可以选择同一张卡
- 但同一个玩家不能重复选择自己已经拥有的同名卡
- 玩家拿到的卡会一直保留到整局结束
- 只有“每月一次”的内部状态会在新月重置

一个重要后果是：

- 某个类别的“当月选项”可以跨月重复
- 但如果你已经拥有这张卡，再选就会失败
- 因此越往后月份，可选空间会越来越受自己历史持卡情况影响

### 10.2 内幕消息

当前实现：

- 名称：`内幕消息`
- 获取后可每月使用 1 次
- 只有当“下一条真实新闻距离今天超过 3 天”时才允许激活

两种模式：

- 正常模式：花费 `10_000`
- 低价模式：传 `variant = cheap`，花费 `500`

效果：

- 你会在对应真实新闻发布前 `3` 天收到预览
- 同时，你对那条真实新闻发布日到达的订单会获得更高优先级 `PriorityRank = 0`

低价模式的真假规则：

- 默认有 `50%` 概率拿到假预览
- 如果你此前被别人的 `舆情打击` 污染过“次等内幕消息”，那么你的下一次低价内幕消息会**必定为假**

注意：

- 优先级优势看的是**订单到达日**是否等于新闻日
- 不是看你在哪一天提交了订单

### 10.3 闪电交易

当前实现：

- 名称：`闪电交易`
- 获取后可每月使用 1 次
- 花费 `1_000`

效果：

- 激活当日不生效
- 从下一天开始连续 `3` 天，玩家每天多 `1` 次即时单额度

在当前默认配额下，这意味着：

- 即时单日上限从 `1` 变成 `2`
- 但总提交上限 `maxOrdersPerTick = 2` 不变

### 10.4 止损名刀

当前实现：

- 名称：`止损名刀`
- 获取后可每月使用 1 次
- 花费 `10_000`

激活时会立即：

- 撤销你当前所有未完成订单（包括未到达订单和簿上挂单）
- 记录激活瞬间的**公开 MidPrice** 作为参考价
- 打开保护状态

保护持续时间：

- 激活当天
- 之后 2 天
- 总计覆盖 3 个交易日

保护机制不是改资产，而是改 `NAV` 计算：

- 若之后用于算净值的价格低于参考价
- 则下跌幅度只按原本的 `20%` 计入净值
- 若价格不跌，或者上涨，则不做额外增强

注意：

- 止损名刀影响的是净值口径，不会阻止真实成交
- 它会影响月末结算时的 `CalculateNAV`
- 它的参考价来自**公开 MidPrice**，不是内部 `MarkPrice`

### 10.5 定向增发

当前实现：

- 名称：`定向增发`
- 获取后可每月使用 1 次
- 没有额外技能手续费

激活价格：

- 若有买一：`floor(bestBid * 0.98)`
- 若没有买一：`floor(midPrice * 0.98)`
- 最低不低于 `1`

效果：

- 立即花费 `discountPrice * 100`
- 直接获得 `100` 单位锁仓黄金
- 锁仓到 `当前日 + 10`

锁仓黄金在锁定期间：

- 计入净值
- 不能卖出
- 到期后会自动转回可用黄金

### 10.6 网络风暴

当前实现：

- 名称：`网络风暴`
- 整局每张卡最多使用 `3` 次
- 第 `1/2/3` 次使用成本分别为：`1000 / 2000 / 3000`

效果：

- 指定一个玩家（当前实现不禁止指定自己）
- 使其“下一张订单”额外 `+1` 天到达延迟

注意：

- 它只影响**下一张订单**，不影响研报，不影响其他技能
- 如果目标玩家直到月底都没有再下单，这个额外延迟会随着新月重置而消失

### 10.7 舆情打击

当前实现：

- 名称：`舆情打击`
- 整局每张卡最多使用 `1` 次
- 花费 `20_000`

激活后会发生三件事：

1. 立即广播一条假的市场新闻
2. 给所有其他玩家打上“下一条真实新闻广播会被污染”的标记
3. 给所有其他玩家打上“下一次低价内幕消息必假”的标记

当前版本里，`舆情打击` **不会**：

- 改变 NPC 情绪源
- 改变真实新闻排期
- 直接影响月末结算价格

它影响的是玩家信息流，而不是系统盘本身。

## 11. 真实新闻广播污染规则

这一节是当前实现里非常容易忽视的细节。

当某玩家被 `舆情打击` 污染后：

- 这个标记只会在其“下一条真实新闻广播”到来时消耗
- 被污染的是玩家本人收到的广播内容，不是服务器内部的真实新闻对象
- 不同玩家收到的污染文案彼此独立随机
- 观察者/管理员仍会看到真实新闻

因此当前实现里可能出现：

- 玩家 A 看到的下一条真实新闻是假的
- 玩家 B 看到的却是真的
- 观战台/管理员看到的仍是真新闻

此外：

- `舆情打击` 当天自己广播出来的那条假新闻，所有人都会直接收到这条假新闻
- 之后的“下一条真实新闻污染”是额外效果，不是同一件事

## 12. 成交笔数、月胜者与最终排名

### 12.1 MonthlyTradeCount 的定义

`MonthlyTradeCount` 按**成交事件数**累计，而不是按成交量累计。

当前实现中：

- 玩家和 `SYSTEM` 成交一次，玩家计数 `+1`
- 两个不同玩家彼此成交一次，双方都 `+1`
- 自成交（自己买自己的单）不计入 `MonthlyTradeCount`

### 12.2 月末 NAV 结算

月末结算时，每个玩家的净值为：

`NAV = Mora + FrozenMora + (Gold + FrozenGold + LockedGold) * settlementPrice`

其中 `settlementPrice` 不是公开 `MidPrice`，而是第 30 天对应的 `SettlementPriceAtTick(30)`。当前实现下：

- 若结算窗口内有成交，则优先使用成交价 TWAP
- 若窗口内没有成交，则回退到 `SafePrice` TWAP

若玩家在止损名刀保护中，则上述价格会先经过保护折算再用于 `CalculateNAV`。

### 12.3 当月胜者判定

当月广播里的 `winner` 按以下顺序决定：

1. 比较当月 `NAV`
2. 若 `NAV` 相等，比较 `MonthlyTradeCount`
3. 若仍相等，则记为 `tie`

因此：

- 月胜者只是结算广播信息
- 它不会再额外给积分

### 12.4 最终结果文件中的分数

当前结果文件里的 `Scoreboard` 代表的是：

`累计净收入 = 累计月末净值之和 - 月初基线净值 * 实际参赛月数`

其中月初基线净值为：

`initialMora + initialGold * initialGoldPrice`

在当前配置下：

- 基线净值 = `1_000_000 + 1_000 * 1_000 = 2_000_000`

这意味着：

- 最终排名看的是累计净收入
- 不再是“每月第一名 +1”这种老积分制
- 所谓“最终 bonus winner”当前只用于显示，不再额外加分

## 13. 对调试最有用的几个实现级提醒

如果你正在写策略或排查现象，下面这些是最容易踩坑的点：

- 一天会自动推进，不会等你。默认一整个月只有大约 `3` 秒。
- 今天提交的默认延迟订单，明天才到达。
- 是否算即时单，是到达时看盘口，不是提交时看盘口。
- 提交上限和到达上限是两套不同限制。
- 玩家下单价格还要落在当前 `SafePrice` 的动态价格带内，离谱价格会在提交入口直接失败。
- `FlashTrading` 增加的是“即时单到达额度”，不是“总提交次数”。
- `MidPrice` 只是公开展示口径；真正决定研报和月结的是内部 `MarkPrice -> SafePrice -> SettlementPrice`。
- `SettlementPrice` 当前优先使用成交价 TWAP；只有没有成交时才回退到 `SafePrice` TWAP。
- 离群盘口即使能进入公开盘口显示，也不一定能进入 `MarkPrice`。
- 熔断激活时，当天会直接冻结撮合流程；不是只有“禁止新单”，连到达订单也会延期处理。
- 当前 `newsIntervalMin/Max` 根本不生效，新闻只看固定日程 `[1, 11, 21]`。
- `舆情打击` 不会推 NPC，只会骗人。
- `Hold` 研报当前不能拿正收益。
- 研报奖励现在按收益率口径计算，并且受单份上限和单月正收益预算上限控制。
- 正式决赛不会沿用当前这组公开新闻文案，不能把策略写死在固定句子匹配上。
