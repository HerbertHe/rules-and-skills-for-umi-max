---
name: initialize-project-structure-for-umi-max
description: 在用户最初要求进行项目初始化结构的时候，基于 Umi Max 的原有项目结构进行调整，以符合多人协同开发的需求。
---

# 初始化项目结构

本技能用于在本 Umi Max 项目中按既定约定创建、修改、删除或扩展目录与文件，保证结构一致。

## 修改初始化文件与项目结构

### 判断用户的 `node` 包管理器

按下面的优先级判断用户的 `node` 包管理器，并在执行后续操作时使用对应的包管理器命令：

1. 通过读取 `package.json` 文件中的 `packageManager` 字段，判断用户的 `node` 包管理器；
2. 通过读取 `.umirc.ts` 文件或者 `config/config.ts` 文件中的 `npmClient` 字段，判断用户的 `node` 包管理器；
3. 通过依赖的 lock 文件的类型，判断用户的 `node` 包管理器；
4. 如果以上方式都无法判断，则默认使用 `npm` 命令。

本技能所有涉及到包管理器的命令默认使用 `pnpm` 命令，请注意根据实际情况使用对应的包管理器命令。

### 重整必要的全局配置文件结构

#### 重整工程配置

1. 在 `src` 同级目录下创建 `config` 目录。
2. 将 `.umirc.ts` 文件移动到 `config` 目录下，并重命名为 `config.ts`。
3. 为 `config.ts` 文件添加 `esbuildMinifyIIFE: true` 配置字段。
4. 在 `config` 目录下创建 `routes.ts` 文件，用于配置页面路由。
5. 将 `config.ts` 中的 `routes` 配置移动到 `routes.ts` 文件中，并且在 `config.ts` 文件中导入 `routes.ts` 文件，以更新配置文件。
6. 在 `config` 目录下创建 `proxy.ts` 文件，用于配置本地转发代理解决不同环境的跨域问题，参考本技能示例文件 `example/proxy.ts` 的内容。
7. 提醒用户记得修改 `config/proxy.ts` 文件中的代理目标地址，以符合实际需求。
8. 执行 `pnpm add cross-env -D` 安装 `cross-env` 开发依赖，用于设置环境变量。
9. 为 `package.json` 文件中的 `scripts` 字段添加 `start:xxx` 脚本，用于启动项目，其中 `xxx` 为对应的环境名称，如 `dev`、`test`、`prd`。参考本技能示例文件 `example/package-scripts.json` 的内容。
10. 在 `config/config.ts` 文件中导入 `config/proxy.ts` 文件，插入代码 `const REACT_APP_ENV = process.env.REACT_APP_ENV || "test";`，并更新 `proxy` 的配置为 `proxy[REACT_APP_ENV as keyof typeof proxy]`，以获取对应环境的代理配置。
11. 将 `src/app.ts` 文件重命名为 `src/app.tsx` 文件，用于拓展运行时配置。
12. 在当前工程下执行 `git config core.ignorecase false` 命令，以禁用 Git 的文件名大小写不敏感性。
13. 清空 `src/pages` 目录下的所有的示例页面。
14. 参考本技能示例文件 `example/pages` 目录下的内容，创建新的 `home` 示例页面，并配置路由。
15. 清除 13 和 14 中所有相关的没有被引用的页面目录和路由配置。

#### 重整项目接口类型声明和定义

1. 在 `src` 目录下创建 `typings.d.ts` 文件，用于定义全局类型。参考本技能示例文件 `example/typings.d.ts` 的内容。
2. 清除 `src/services/demo` 目录下的文件。
3. 在 `src/services/demo` 目录下创建 `model.ts` 文件，用于声明并导出 `demo` 模块的所有相关接口的类型。参考本技能示例文件 `example/service/model.ts` 的内容。
4. 在 `src/services/demo` 目录下创建 `index.ts` 文件，用于声明并导出 `demo` 模块的所有相关 API 接口。参考本技能示例文件 `example/service/index.ts` 的内容。

#### 添加必要依赖

1. 执行 `pnpm add ahooks` 安装 `ahooks` 依赖。

## 约定目录结构

```txt
src/
├── app.tsx             # 运行时配置、getInitialState、layout
├── access.ts           # 权限定义
├── constants/          # 全局常量
├── utils/              # 工具函数
├── services/           # 按业务拆分的 API（如 services/demo/）
├── models/             # 全局 model（如 global.ts）
├── components/         # 全局/通用组件
├── pages/              # 页面，与路由一一对应
│   └── page-name/
│       ├── index.tsx
│       ├── index.less   # 可选
│       └── components/  # 页面内组件，可选
├── typings.d.ts        # 全局类型声明
│
├── mock/               # 根目录 mock，与 src 平级
└── config/             # 根目录 config，与 src 平级
    ├── config.ts       # 工程配置
    ├── routes.ts       # 路由配置
    └── proxy.ts        # 代理配置
```
