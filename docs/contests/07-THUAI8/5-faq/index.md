# FAQ

## Q: 远程计算机拒绝网络连接...?

A: 这种情况一般出现在本地测试中; 解决方法是在运行SDK的同时还要运行server.

THUAI比赛的评测采用C/S模式, 即Client和Server间服务和被服务的关系. 这里Server就是server,而Client是我们的SDK(注意和提供回放服务的client区分). 默认情况下SDK会尝试向server发起TCP连接, 默认连接的地址为`ws://127.0.0.1:14514`, 即本机的14514端口. 如果不启动server,则没有程序监听14514端口, 当然会出现拒绝连接. 由于所有程序都在本机运行, 因此本地评测**并没有对网络的要求**.

## Q: 运行server时出现如下错误信息:

```
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

A: 解决方法是修改`config/config.json`文件, 将其中`token`字段下的`loadTokenFromEnv`的值改为`false`. 记住同字段下的`tokenLocation`的值(默认是`TOKENS`), 在server可执行文件的同级建立和`tokenLocation`值同名的文件, 里面写你需要评测的SDK使用的`token`, 用`config.json`指定的分隔符分割.

比如`tokenLocation`值为`"TOKENS"`, `tokenDelimiter`值为`","`, 则应当在server同级创建`TOKENS`文件, 内容写`114514,1919810`(注意逗号后无空格), 之后启动SDK时只能指定114514或1919810作为token.

这一错误的出现是因为我们没有告诉server有哪些token会加入对局. 有两种方法去指定: 环境变量和token文件. 设定环境变量是评测机评测使用的方式, 但是对于本地评测来说环境变量有些小题大做, 因此我们采用后者.

## Q: Saiblo手机号无法注册

A: 请使用邮箱注册.

## Q: 回放文件中玩家没有动作

A: 可能是SDK未能连接到server中. 

在server中, 就算没有建立连接也会为所有token创建对应的Player, 一段时间后会自动开始游戏. 但是由于SDK未连接, 此时的Player会加入战场但没有任何动作, 只有当server收到了SDK发来的包说我要做什么动作, server才会进行相应的操作.

server创建角色会显示如下消息:

```
[12:49:47.269 INF] Game                 Player 114514 joined with id 0.
[12:49:47.269 INF] Game                 Player 1919810 joined with id 1.
```

而连接建立会显示:

```
[12:49:57.828 INF] AgentServer          Connection from 127.0.0.1: 3272 opened.
```

请注意区分. 这里的端口号3272是随机指定的, 未必相同.
