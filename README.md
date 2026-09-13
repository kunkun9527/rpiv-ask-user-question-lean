# @ssk_dev/rpiv-ask-user-question-lean

> **Lean Pi ask-user-question extension with full features: 215 initial tokens (82.9% fewer than current upstream).**
> [See my full setup for Pi](https://github.com/kunkun9527/my-lean-pi-setup)

[简体中文](README.zh-CN.md)

A lightweight Pi wrapper for [`@juicesharp/rpiv-ask-user-question`](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question). It preserves interactive questionnaire prompts and structured validation while trimming repetitive prompt metadata.

## Core Features

* Interactive UI: Retains the full questionnaire interface, preview elements, and RPC fallback.
* Structured validation: Supports single-select and multi-select questions, recommendation ordering, and strict option validation.
* Compact prompt schema: Strips boilerplate descriptions from the tool definition, cutting prompt overhead without changing runtime behavior.

## Installation

```bash
pi install npm:@ssk_dev/rpiv-ask-user-question-lean
```

Do not load this alongside another `rpiv-ask-user-question` wrapper to avoid registering duplicate tools.

## Usage

The model interacts with a single tool:

```text
ask_user_question
```

Use this tool when user clarification or decision-making is required. Each call can ask 1 to 4 structured questions with 2 to 4 clear options per question.

## Context Footprint Benchmark

With only this extension enabled, its recurring initialization overhead in the model context is:

| Model-facing tool | Lean | Upstream `@juicesharp/rpiv-ask-user-question@2.10.1` |
| --- | ---: | ---: |
| `ask_user_question` | **215** | **1,258** |

This saves **1,043 tokens (82.9%)** compared to the current upstream package.
The benchmark was measured on Pi 0.85.1 with `measure-plugin-tokens-v3.mjs` in a fresh isolated session, excluding built-in tools, skills, context files, and unrelated extensions. Token estimates use `ceil(characters / 4)`. Pure runtime UI elements and slash commands are excluded as they are not sent to the model.

## Measured initialization footprint

With only this extension enabled, the lean `ask_user_question` tool contributes an estimated **215 tokens** of recurring model-facing initialization context. The current upstream `@juicesharp/rpiv-ask-user-question@2.10.1` tool contributes **1,258 tokens** under the same conditions. That is **1,043 fewer tokens (82.9%)**.

The measurement used Pi 0.85.1 and `measure-plugin-tokens-v3.mjs` in a fresh isolated session, excluding Pi built-in tools, skills, context files, messages, and unrelated extensions. Token estimates use `ceil(characters / 4)`, so these are reproducible context-footprint estimates rather than exact tokenizer counts. Runtime-only UI and slash commands are not included because they are not sent to the model.

## Versions

Upstream runtime is pinned to `@juicesharp/rpiv-ask-user-question@2.10.1`.

## Development

```bash
npm ci
npm run check
```

The test suite runs with a local harness and does not launch the actual interactive questionnaire UI.

## License

MIT. This project wraps the MIT-licensed [`@juicesharp/rpiv-ask-user-question`](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question).