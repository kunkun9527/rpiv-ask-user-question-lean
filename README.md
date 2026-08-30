# rpiv-ask-user-question-lean

[简体中文](README.zh-CN.md)

A token-lean Pi wrapper around [`@juicesharp/rpiv-ask-user-question`](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question). It preserves structured clarification while reducing model-facing metadata.

## What it keeps

- The questionnaire UI and RPC fallback.
- Input validation, events, and lifecycle behavior.
- Single-select and multi-select questions, recommendation ordering, and useful previews.

## Why it is lean

The wrapper keeps the upstream `ask_user_question` runtime but shortens its tool description and prompt guidance and removes repeated schema descriptions. The complete questionnaire behavior still comes from the pinned upstream package.

## Install

```bash
pi install git:github.com/kunkun9527/rpiv-ask-user-question-lean
```

Do not load it together with another `rpiv-ask-user-question` wrapper, or the tool may be registered twice.

## Use

The model sees one tool:

```text
ask_user_question
```

Use it when a required user decision is unclear. Each call can ask 1–4 structured questions with 2–4 explicit options per question.

## Measured initialization footprint

With only this extension enabled, the lean `ask_user_question` tool contributes an estimated **215 tokens** of recurring model-facing initialization context. The pinned upstream `@juicesharp/rpiv-ask-user-question@2.4.0` tool contributes **1,258 tokens** under the same conditions. That is **1,043 fewer tokens (82.9%)**.

The measurement used Pi 0.84.4 and `pi-context-view@0.4.3` in a fresh isolated session, excluding Pi built-in tools, skills, context files, messages, and unrelated extensions. Context View estimates text as `ceil(characters / 4)`, so these are reproducible context-footprint estimates rather than exact GPT tokenizer counts. Runtime-only UI and slash commands are not included because they are not sent to the model.

## Versions

The upstream runtime is pinned to `@juicesharp/rpiv-ask-user-question@2.4.0`.

## Development

```bash
npm ci
npm run check
```

The test suite uses a local harness and does not open the real questionnaire UI.

## License and upstream

MIT. This project wraps the MIT-licensed [`@juicesharp/rpiv-ask-user-question`](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question).