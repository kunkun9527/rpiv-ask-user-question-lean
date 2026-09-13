# @ssk_dev/rpiv-ask-user-question-lean

<!-- token-benchmark:summary:start -->
> **Token benchmark: Lean 215, upstream `@juicesharp/rpiv-ask-user-question@2.10.1` 1,258 — 82.9% fewer.**
<!-- token-benchmark:summary:end -->
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

<!-- token-benchmark:benchmark:start -->
With only this extension enabled, its recurring model-facing initialization contribution is:

| Variant | Tool and prompt contribution | Total |
| --- | --- | ---: |
| Lean `@ssk_dev/rpiv-ask-user-question-lean@2.10.1` | `ask_user_question` (215) | **215** |
| Upstream `@juicesharp/rpiv-ask-user-question@2.10.1` | `ask_user_question` (1,258) | **1,258** |

This saves **1,043 tokens (82.9%)**.
Measured with Pi 0.85.1 in separate temporary processes with empty configuration. Built-in tools, skills, context files, messages, unrelated extensions, runtime UI, and slash commands are excluded. Tokens use `ceil(characters / 4)`.
<!-- token-benchmark:benchmark:end -->

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