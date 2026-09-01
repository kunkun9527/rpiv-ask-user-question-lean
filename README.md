# @ssk_dev/rpiv-ask-user-question-lean

> **Lean Pi ask-user-question extension with identical features: 215 initialization tokens, 83% lighter than original.**
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

| Model-facing tool | Lean | Upstream `@juicesharp/rpiv-ask-user-question@2.4.0` |
| --- | ---: | ---: |
| `ask_user_question` | **215** | **1,258** |

This saves **1,043 tokens (82.9%)** compared to the pinned upstream package.

The benchmark was measured on Pi 0.84.4 with `pi-context-view@0.4.3` in a fresh isolated session, excluding built-in tools, skills, context files, and unrelated extensions. Context View estimates tokens as `ceil(characters / 4)`. Pure runtime UI elements and slash commands are excluded as they are not sent to the model.

## Versions

Upstream runtime is pinned to `@juicesharp/rpiv-ask-user-question@2.4.0`.

## Development

```bash
npm ci
npm run check
```

The test suite runs with a local harness and does not launch the actual interactive questionnaire UI.

## License

MIT. This project wraps the MIT-licensed [`@juicesharp/rpiv-ask-user-question`](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question).