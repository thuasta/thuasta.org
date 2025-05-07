# FAQ

**Q：远程计算机拒绝网络连接...？**

A: 这种情况一般出现在本地测试中；解决方法是在运行 SDK 的同时还要运行 server。

THUAI 比赛的评测采用 C/S 模式，即 Client 和 Server 间服务和被服务的关系。这里 Server 就是 server，而 Client 是我们的 SDK（注意和提供回放服务的 client 区分）。默认情况下 SDK 会尝试向 server 发起 TCP 连接，默认连接的地址为 `ws://127.0.0.1:14514`，即本机的 14514 端口。如果不启动 server，则没有程序监听 14514 端口，当然会出现拒绝连接。由于所有程序都在本机运行，因此本地评测**并没有对网络的要求**。

---

**Q：运行 server 时出现如下错误信息：**

```bash
[11:53:45.826 INF] Program              --------------------------------
[11:53:45.873 INF] Program              THUAI8 Server v0.1.0.0
[11:53:45.873 INF] Program              Copyright (c) 2024-2025 THUASTA
[11:53:45.873 INF] Program              --------------------------------
[11:53:45.901 ERR] Program              Failed to load tokens. Please check your config file or token list.
[11:53:45.905 ERR] Program              Hint: If you are running this program for the first time,
[11:53:45.905 ERR] Program                    you may need to create a token file or set up environment variables.
[11:53:45.905 ERR] Program              You can change the token settings in the config file.
[11:53:45.905 ERR] Program              Press Ctrl+C to exit.
```

A：解决方法是修改 `config/config.json` 文件，将其中 `token` 字段下的 `loadTokenFromEnv` 的值改为 `false`。记住同字段下的 `tokenLocation` 的值（默认是 `TOKENS`），在 server 可执行文件的同级建立和 `tokenLocation` 值同名的文件，里面写你需要评测的 SDK 使用的 `token`，用 `config.json` 指定的分隔符分割。

比如 `tokenLocation` 值为 `"TOKENS"`，`tokenDelimiter` 值为 `","`，则应当在 server 同级创建 `TOKENS` 文件，内容写 `114514,1919810`（注意逗号后无空格），之后启动 SDK 时只能指定 114514 或 1919810 作为 token。

这一错误的出现是因为我们没有告诉 server 有哪些 token 会加入对局。有两种方法去指定：环境变量和 token 文件。设定环境变量是评测机评测使用的方式，但是对于本地评测来说环境变量有些小题大做，因此我们采用后者。

---

**Q：saiblo 手机号无法注册？**

A：请使用邮箱注册。

---

**Q：回放文件中玩家没有动作？**

A：可能是 SDK 未能连接到 server 中。

在 server 中，就算没有建立连接也会为所有 token 创建对应的 Player，一段时间后会自动开始游戏。但是由于 SDK 未连接，此时的 Player 会加入战场但没有任何动作，只有当 server 收到了 SDK 发来的包说我要做什么动作，server 才会进行相应的操作。

server 创建角色会显示如下消息：

```bash
[12:49:47.269 INF] Game                 Player 114514 joined with id 0.
[12:49:47.269 INF] Game                 Player 1919810 joined with id 1.
```

而连接建立会显示：

```bash
[12:49:57.828 INF] AgentServer          Connection from 127.0.0.1: 3272 opened.
```

请注意区分。这里的端口号 3272 是随机指定的，未必相同。
