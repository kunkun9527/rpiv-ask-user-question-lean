# rpiv-ask-user-question-lean

[中文](#中文) · [English](#english)

## 中文

`rpiv-ask-user-question-lean` 是 [`@juicesharp/rpiv-ask-user-question`](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question) 的轻量 Pi 包装层。它保留问卷 UI、RPC fallback、验证、事件和生命周期行为，只精简模型可见的工具描述、schema 描述和提示规则。

### 模型可见工具

- `ask_user_question`

### 安装

```bash
pi install git:github.com/kunkun9527/rpiv-ask-user-question-lean
```

不要和原版 `rpiv-ask-user-question` wrapper 同时加载，以免重复注册工具。

### 开发

```bash
npm ci
npm run check
```

上游依赖固定为 `@juicesharp/rpiv-ask-user-question@2.4.0`；本地测试不需要启动真实问卷 UI。

## English

`rpiv-ask-user-question-lean` is a small Pi wrapper around [`@juicesharp/rpiv-ask-user-question`](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question). It preserves the questionnaire UI, RPC fallback, validation, events, and lifecycle behavior while trimming model-facing tool text, schema descriptions, and prompt guidance.

It exposes one model-facing tool, `ask_user_question`.

Install:

```bash
pi install git:github.com/kunkun9527/rpiv-ask-user-question-lean
```

Do not load it together with another `rpiv-ask-user-question` wrapper, or the tool may be registered twice.

Validate locally with `npm ci && npm run check`.

## License

MIT. This project is a wrapper around the MIT-licensed `@juicesharp/rpiv-ask-user-question` project.
