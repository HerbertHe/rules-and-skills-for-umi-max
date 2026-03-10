# rules-and-skills-for-umi-max

为 Umi Max 项目提供的 Cursor Agent 规则（Rules）与技能（Skills），用于在开发时保持项目结构、命名、依赖与代码风格一致，并支持项目初始化、新页面创建等常见操作。

---

## Rules（规则）

规则存放在 `rules/` 目录下，部分为全局生效，部分按文件匹配（`globs`）生效。

### 1.1 全局规则（alwaysApply: true）

| 文件 | 说明 |
| ------ | ------ |
| `rules/principle.mdc` | **项目开发原则**：项目结构约定、配置文档优先、TypeScript 类型声明、代码质量与校验（禁止弃用 API、TS 校验、不修改三方库源码） |
| `rules/dependencies.mdc` | **依赖与包管理器**：包管理器判断优先级（packageManager → npmClient → lock 文件）、依赖版本选用原则 |
| `rules/component-and-method-priority.mdc` | **组件与方法优先**：优先 pro-components → antd → 项目内 components；接口与 hooks 优先 useRequest、ahooks、项目内通用方法，再兜底实现 |

### 1.2 按文件匹配的规则（globs: src/**/*.ts, src/**/*.tsx 等）

| 文件 | 说明 |
| ------ | ------ |
| `rules/naming-specifications/typescript.mdc` | **TypeScript 命名**：常量 Pascal Case；interface 以 `I` 开头；type 以 `Type` 结尾；enum 以 `Enum` 结尾；API 函数 lowerCamelCase 且以请求方法开头、以 `Service` 结尾 |
| `rules/naming-specifications/react.mdc` | **React 命名**：组件 Pascal Case、与目录/文件名一致；页面目录 Kebab Case；页面组件以 `Page` 结尾；子页面 Kebab Case |
| `rules/code-specifications-and-styling.mdc` | **代码规范与风格**：import 顺序（第三方 → 全局类型/方法 → 页面级 → 样式 → 组件）；样式默认命名导入；优先 Prettier/ESLint/lint-staged 修复 |

---

## Skills（技能）

技能存放在 `skills/` 目录下，每个技能有独立的 `SKILL.md`，在对应场景下由 Agent 按说明执行。

### 2.1 初始化项目结构

- **路径**：`skills/initialize-project-structure-for-umi-max/SKILL.md`
- **适用场景**：项目初始化、脚手架搭建、首次搭建工程结构、Umi 项目结构搭建
- **主要内容**：
  - 判断包管理器（packageManager → npmClient → lock 文件 → 默认 npm）
  - 重整工程配置：创建 `config/`，迁移并拆分 `config.ts`、`routes.ts`、`proxy.ts`，安装 cross-env、配置多环境 start 脚本等
  - 重整接口与类型：`typings.d.ts`、`services/demo` 下的 model 与 API
  - 添加 ahooks 等必要依赖
  - 清空示例页、按模板创建 home 示例页并配置路由
  - 约定目录结构（与 principle 中一致）

### 2.2 创建新页面

- **路径**：`skills/initialize-project-structure-for-umi-max/create-new-page-for-umi-max/SKILL.md`
- **适用场景**：创建新页面、新增页面、新增页面路由、新增页面组件
- **主要内容**：
  - **创建步骤**：在 `src/pages` 下新建页面目录与 `index.tsx`，在 `config/routes.ts` 中新增路由
  - **实现规范**：表格类（ProTable、操作列、编辑弹窗、删除确认与刷新）；表单类（ProForm、zod 校验）；数据与接口（useRequest、mock）；弹窗/抽屉拆成独立组件、创建/编辑复用、防抖；数据类型集中在 `services/**/model.ts`；禁止弃用 API、通过 TypeScript 校验、不修改三方库

---

## 约定目录结构

与 `principle.mdc` 及初始化技能中约定保持一致：

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

---

## 使用说明

- **Rules**：将本仓库的 `rules/` 放到 Cursor 可识别的规则目录（如项目 `.cursor/rules/` 或全局规则目录），即可在编写/修改 `src` 下代码时自动应用对应规则。
- **Skills**：在 Cursor 中通过描述「初始化 Umi Max 项目结构」「创建新页面并配置路由」等触发对应技能，Agent 会按各 `SKILL.md` 的步骤与规范执行。

## 版权所有

MIT License &copy; 2026 Herbert He
