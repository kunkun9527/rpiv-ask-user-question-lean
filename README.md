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