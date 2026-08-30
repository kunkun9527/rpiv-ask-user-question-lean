# rpiv-ask-user-question-lean

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