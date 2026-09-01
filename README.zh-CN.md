# rpiv-ask-user-question-lean

> **仅需约 215 个初始化 tokens（从约 1,258 tokens 降低）。**
> **整套配置：** [查看 Pi Lean Setup](https://github.com/kunkun9527/my-lean-pi-setup)

[English](README.md)

[`@juicesharp/rpiv-ask-user-question`](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question) 的 token 精简版 Pi 包装层。它保留结构化需求确认能力，同时减少模型可见元数据。

## 保留的能力

- 问卷 UI 和 RPC fallback。
- 输入验证、事件和生命周期行为。
- 单选、多选、推荐项排序和有用的预览。

## 为什么更精简

包装层保留上游 `ask_user_question` 运行时，但缩短工具描述和提示指引，并删除重复的 schema 描述。完整问卷行为仍由固定版本的上游包提供。

## 安装

```bash
pi install git:github.com/kunkun9527/rpiv-ask-user-question-lean
```

不要同时加载另一个 `rpiv-ask-user-question` 包装层，否则工具可能被重复注册。

## 使用

模型只看到一个工具：

```text
ask_user_question
```

当必要的用户决策不明确时使用它。每次调用可以询问 1–4 个结构化问题，每个问题提供 2–4 个明确选项。

## 实测初始化上下文占用

仅启用本扩展时，lean `ask_user_question` 工具会贡献约 **215 tokens** 的持续模型可见初始化上下文。相同条件下，固定版本的上游 `@juicesharp/rpiv-ask-user-question@2.4.0` 工具贡献 **1,258 tokens**，即减少 **1,043 tokens（82.9%）**。

测量使用 Pi 0.84.4 和 `pi-context-view@0.4.3`，在全新隔离会话中只启用目标扩展，并排除 Pi 内置工具、skills、context files、消息及无关扩展。Context View 按 `ceil(字符数 / 4)` 估算，因此这些是可复现的上下文占用估值，不是 GPT tokenizer 的精确计数。未计入不会发送给模型的纯运行时 UI 和 slash commands。

## 版本

上游运行时固定为 `@juicesharp/rpiv-ask-user-question@2.4.0`。

## 开发

```bash
npm ci
npm run check
```

测试套件使用本地 harness，不会打开真实问卷 UI。

## 许可证与上游

MIT。本项目包装了采用 MIT 许可证的 [`@juicesharp/rpiv-ask-user-question`](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question)。