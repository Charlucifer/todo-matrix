# 待办矩阵 · Todo Matrix

一个给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI 使用的四象限待办插件。它把「重要 / 紧急」作为两个轴，把任务放进四象限，并提供 DDL 日历和紧急事项优先提醒。

## 功能

- **四象限看板**：重要且紧急、重要不紧急、紧急不重要、不重要不紧急。
- **快速添加**：标题、DDL、重要 / 紧急标记，回车即可添加。
- **拖拽换象限**：把任务卡片拖到另一个象限，自动更新重要 / 紧急属性。
- **DDL 日历**：月视图、日期圆点、当天 DDL 筛选、跨月切换和「今天」跳转。
- **紧急优先提醒**：
  - 侧边栏入口显示紧急未完成数量；
  - 面板内「优先提醒」按截止时间排序；
  - 1 小时内到期或已逾期任务会弹出提醒条。
- **任务管理**：完成 / 取消完成、编辑、二次确认删除。
- **明亮玻璃风格**：半透明面板、渐变背景、自动适配 Harness 亮色 / 暗色主题。
- **本地持久化**：任务保存在浏览器 `localStorage`，不上传服务器。

## 安装

要求：DeepSeek Harness `0.2.x`（开发验证版本为 `0.2.2-rc.1`），并确保本机可以使用 Git。

在 DSH 的插件管理中使用 `install_bundle`，安装目标填写：

```text
github:Charlucifer/todo-matrix#v1.0.0
```

也可以使用完整地址：

```text
https://github.com/Charlucifer/todo-matrix.git#v1.0.0
```

安装完成后，侧边栏底部、设置按钮旁边会出现网格图标入口。展开侧栏时显示「待办矩阵」，收起时显示图标和紧急数量角标。

> 如果当前 profile 已经安装了同名的本地链接版，请先移除旧的 `@local/todo-matrix`，再安装 GitHub 版本，否则会返回 `already-installed`。

## 使用

1. 在顶部输入待办内容，按需设置 DDL、重要、紧急。
2. 点击「添加」，任务进入对应象限。
3. 拖动任务卡片到其他象限可以调整优先级。
4. 点击任务卡片打开编辑面板；点击左侧圆圈标记完成。
5. 在右侧日历点选日期，只查看当天 DDL。
6. 紧急任务会出现在「优先提醒」区域，并在临近截止时弹出提醒。

## 数据

任务保存在浏览器本地：

```text
dsh.todo-matrix.v1
```

清理浏览器站点数据会删除待办。插件不会把任务发送到网络。

## 目录结构

```text
.
├─ package.json
├─ cordis.patch.yml
├─ index.js
├─ client.js
├─ icon.svg
├─ locale/
│  ├─ en.json
│  └─ zh.json
├─ README.md
├─ CHANGELOG.md
└─ LICENSE
```

## 开发

这个插件是纯 JavaScript，Client 端直接由 Harness 的模块加载器加载，不需要构建步骤。

```powershell
# 在本地开发目录安装到当前 profile（示例）
# 让 Agent 调用 plugin_manager install_bundle，target 填写本目录的绝对路径
```

修改 `client.js` 后，重新安装或刷新页面以加载新代码。

## 许可证

[MIT](LICENSE)
