---
name: create-new-page-for-umi-max
description: 基于 Umi Max 创建新的页面，并配置路由。在用户要求创建新页面、新增页面、新增页面路由、新增页面组件时使用。
---

# 创建新页面

在本 Umi Max 项目中按既定约定创建新页面并配置路由。按以下顺序执行：先完成**创建步骤**，再根据页面类型遵循**实现规范**。

**执行效率**：不要首先搜索外部文档；应参考本技能说明、项目现有代码与三方库源代码直接编写，仅在遇到不确定或报错时再查阅文档，以提高生成效率。

---

## 一、创建步骤

1. **新建页面目录**：在 `src/pages` 下创建页面目录，如 `src/pages/new-page`。
2. **新建页面入口**：在该目录下创建 `index.tsx`，作为页面组件入口。
3. **配置路由**：在 `config/routes.ts` 中新增一项，例如：

```ts
{
  path: '/new-page',
  name: '新页面',
  component: './new-page',
}
```

---

## 二、实现规范

### 2.1 表格类（CRUD）页面

- **列表**：优先使用 `ProTable`，参考 [ProTable 文档](https://procomponents.ant.design/components/table)。
- **操作栏**：屏蔽 ProTable 默认的操作栏（如默认工具、操作栏等），在列配置 `columns` 中自行定义操作列，仅保留业务需要的操作项。
- **列与类型**：列定义使用 `ProColumns`，在对应业务的 `services/**/model.ts` 中定义数据类型并引用。
- **编辑**：在 `ProTable` 中增加一列操作栏，点击后弹出 `Modal` + `ProForm` 编辑表单；编辑弹窗须拆成独立组件（见下方「弹窗组件拆分」）；保存或关闭弹窗时**清除表单状态**。
- **删除**：操作栏中删除按钮使用 `Popconfirm` 确认，确认后调用删除接口并**刷新表格**。

### 2.2 表单类页面

- **表单**：优先使用 `ProForm`，参考 [ProForm 文档](https://procomponents.ant.design/components/form)。
- **校验**：为 `ProForm` 配置校验规则；涉及正则等复杂校验时，优先使用 `zod`，参考 [zod 文档](https://zod.dev/)。

### 2.3 数据与接口

- **请求**：页面发起的接口请求优先使用 `useRequest`，参考 [useRequest 文档](https://ahooks.js.org/hooks/use-request/basic)。
- **Mock**：`services` 中新增的接口，在 `mock` 目录下补充对应 mock 数据，便于联调与调试。

### 2.4 交互与体验

- **弹窗组件拆分**：凡涉及弹窗（Modal）、抽屉（Drawer）等交互时，须将弹窗/抽屉内的内容拆成**独立页面组件**，放在当前页面的 `components/` 目录下，在页面入口 `index.tsx` 中引用；禁止将弹窗与表单逻辑全部写在页面入口同一文件中。
- **创建/编辑弹窗复用**：新建与编辑弹窗优先复用同一套弹窗组件与表单逻辑，通过 `mode`（如 `create` | `edit`）或是否传入初始数据区分；禁止为「创建」和「编辑」分别写两套表单项与校验逻辑，避免重复实现。
- **防抖**：按钮点击等易重复触发的操作需做防抖，避免重复请求。

### 2.5 数据定义与复用

- **复用数据集中定义**：可复用的数据类型、枚举、常量等须定义在对应业务的 `services/**/model.ts` 中，页面与组件从该文件引用；禁止在页面或组件内重复定义相同结构或含义的数据类型，避免重复定义、便于统一维护。

### 2.6 代码质量与校验

- **禁止使用已弃用 API**：不得使用已弃用的方法或属性；开发时以官方文档的当前推荐用法为准，避免使用标记为 deprecated 的 API。使用 Modal、Drawer 等 antd 组件时，优先查看项目内 `node_modules/antd/es/<组件名>/interface.d.ts`（如 `modal/interface.d.ts`）中的 `@deprecated` 说明，采用推荐的新属性（例如 Modal 使用 `destroyOnHidden` 而非 `destroyOnClose`）。
- **TypeScript 校验**：创建或修改页面、组件后，须校验 TypeScript 语法与类型错误（如执行 `pnpm run build` 或 IDE 类型检查），发现错误须修复后再交付，不得遗留类型错误或使用 `any` 规避。
- **三方库保护**：在项目中使用的三方库，不要修改其源代码。

---

## 三、参考文档速查

- **ProTable**：<https://procomponents.ant.design/components/table>
- **ProForm**：<https://procomponents.ant.design/components/form>
- **useRequest**：<https://ahooks.js.org/hooks/use-request/basic>
- **zod**：<https://zod.dev/>
