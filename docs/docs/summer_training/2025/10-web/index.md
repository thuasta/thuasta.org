# 前端开发

前端开发是指创建用户可以直接在网页或应用程序上看到和互动的部分。简单来说，前端开发是“网站的面子工程”，它涉及设计和实现用户界面，使得网站或应用程序不仅美观，而且易于使用。

## 准备工具

1. 浏览器：推荐使用 Chrome/Edge。
2. 代码编辑器：推荐使用 VSCode。
3. VSCode 插件：
    - Live Server，用于实时预览网页；
    - ESLint，用于代码规范检查。
4. Node.js：一个基于 Chrome V8 引擎的 JavaScript 运行时，我们写好的 JavaScript 代码将使用 Node.js 执行；同时用于安装框架以及 npm scripts 和 webpack。

    :::info[相关链接]

    - [下载地址](https://nodejs.cn/download/)
    - [安装指南](https://blog.csdn.net/whf__/article/details/129362462)
    - [更多教程](https://www.runoob.com/nodejs/nodejs-tutorial.html)

    :::

5. Github 账户：用于部署页面。

## npm

安装完 Node.js 后，也一并安装完了 npm（Node Package Manager）—— Node.js 的包管理和分发工具。它允许开发者安装、分享和管理 JavaScript 代码包。通过 npm，你可以轻松地获取各种库和工具来加速开发。

### `package.json`

使用 npm 进行管理依赖于 `package.json` 文件，它描述了 Node.js 项目的基本信息，包括项目名称、版本、脚本、依赖包等。一个典型的 `package.json` 如下：

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "这是一个示例项目",
  "main": "index.js", // 入口文件
  "scripts": { // 脚本命令
    "start": "node index.js"
  },
  "dependencies": { // 生产环境依赖
    "express": "^4.17.1"
  },
  "devDependencies": { // 开发环境依赖
    "nodemon": "^2.0.7"
  },
  "engines": { // 运行环境
    "node": ">=14.0.0"
  },
}
```

其中有几种指定依赖的方式：

1. 精确版本：直接指定某个版本，例如 `"express": "4.17.1"`。
2. 版本范围：使用运算符指定版本范围，如：
    - `^4.17.1` 表示安装 4.x.x 的最新版本。
    - `~4.17.1` 表示安装 4.17.x 的最新版本。
    - `>=4.17.1` 表示安装大于 4.17.1 的最新版本。
3. 最新版本：使用 `"express": "latest"` 表示始终安装最新版本。

在 `package-lock.json` 中，则会写明具体的版本、使用的源的地址和依赖树，确保在不同环境中安装时的一致性。

### 常用命令

1. 初始化项目：
    - `npm init`：初始化一个新的 Node.js 项目，创建 `package.json` 文件。
2. 安装依赖：
    - `npm install`：安装 `package.json` 中列出的所有依赖。
    - `npm install <package>`：安装指定的包。
    - `npm install <package>@<version>`：安装指定版本的包。
    - `npm install <package> -g`：全局安装。
    - `npm install <package> --save`：安装包并将其添加到 `package.json` 的 `dependencies` 中。
    - `npm install <package> --save-dev`：安装包并将其添加到 `package.json` 的 `devDependencies` 中。
3. 管理依赖：
    - `npm list`：列出当前项目中安装的所有包。
    - `npm show <package>`：显示指定包的详细信息。
    - `npm outdated`：检查当前项目中已安装的包是否有更新。
    - `npm update`：更新所有包到最新版本。
    - `npm update <package>`：更新指定的包到最新版本。
    - `npm uninstall <package>`：卸载指定的包。
    - `npm prune`：删除未在 `package.json` 中列出的依赖包。
    - `npm dedupe`：去除重复的依赖包，优化依赖树。
4. 运行脚本：
    - `npm run <script>`：运行在 `package.json` 中 `scripts` 定义的脚本。
5. 配置和管理：
    - `npm config list`：列出所有 npm 配置项。
    - `npm config get <key>`：获取指定的配置项。
    - `npm config set <key> <value>`：设置配置项。
    - `npm config delete <key>`：删除配置项。
6. 其他：
    - `npm ci`：清理并安装项目依赖，适用于持续集成环境。

:::info

更多 npm 命令和用法可参考 [npm 官方文档](https://docs.npmjs.com/cli/v11/commands/npm)；或使用 `npm -h` 命令查看。

:::

<details>
<summary>了解 yarn</summary>

yarn 是另一个包管理工具，旨在提供更快、更可靠的依赖管理。它与 npm 类似，但有一些不同的特性。可通过 npm 安装：

```bash
npm install -g yarn
```

具体使用方法参考 [yarn 官方文档](https://www.yarnpkg.cn/cli/install)。

</details>
