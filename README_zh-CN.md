<div align="center">

# rpiv-ask-user-question-lean

**让 Pi 用结构化问题向你确认，工具说明短得多。**

[English](README.md) · 完整配置：[My Lean Pi Setup](https://github.com/kunkun9527/my-lean-pi-setup)

</div>

<!-- token-benchmark:summary:start -->
> **常驻上下文：Lean 220 tokens，上游 `@juicesharp/rpiv-ask-user-question@2.15.0` 1,258 tokens，少 82.5%。**
<!-- token-benchmark:summary:end -->

[`@juicesharp/rpiv-ask-user-question`](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question) 的精简版。运行时直接用上游 `2.15.0`，我只精简了模型每轮都要读的工具说明。

## 安装

```bash
pi install npm:@ssk_dev/rpiv-ask-user-question-lean
```

需要 Pi `>=0.84.1`、Node.js `>=22.19.0`。不要和上游或其他 `rpiv-ask-user-question` 包装同时安装，否则工具会注册两次。

## 和上游比

**保留**：

- 交互式问卷界面、选项预览和 RPC 回退。
- 单选、多选、推荐选项排序和严格的选项校验。

**精简**：工具说明里的套话；运行时行为不变。

**新增**：

- **RPC 宿主**：在 RPC 宿主（如经 codexhost 接入的 Codex）里，问题会变成原生选项卡片，支持返回上一题、提交前检查和多选勾选。这类宿主显示不了预览，所以 RPC 下的提示会让模型别传 preview。
- **参数容错**：校验前自动纠正几种写错的情况：单个问题平铺在顶层、`header`/`options` 漏在只有一项的 `questions` 外面、缺少 `header`（用问题文本生成）。有多个问题时不做猜测。

## 用法

模型只看到一个 `ask_user_question` 工具，需求不明确或需要你做选择时调用：每次问 1–4 个结构化问题，每个问题 2–4 个明确选项。

## Token 对比

<!-- token-benchmark:benchmark:start -->
只启用这一个扩展时，模型每轮都会读到的内容：

| 版本 | 构成 | 合计 |
| --- | --- | ---: |
| Lean `@ssk_dev/rpiv-ask-user-question-lean@2.15.0` | `ask_user_question` (220) | **220** |
| 上游 `@juicesharp/rpiv-ask-user-question@2.15.0` | `ask_user_question` (1,258) | **1,258** |

少 **1,038 tokens（82.5%）**。

<sub>测量方式：Pi 1.4.0，每个版本在独立的临时进程里测，工作目录和配置都是空的。不计内置工具、Skills、上下文文件、会话历史、用户消息、其他扩展、运行时 UI 和 Slash Commands；计入 `before_agent_start` 注入的内容。Token 按 `ceil(字符数 / 4)` 估算，不是实际计费值。</sub>
<!-- token-benchmark:benchmark:end -->

## 开发

```bash
npm ci
npm run check
```

测试用本地 harness 运行，不会弹出真实的问卷界面。

## 协议与致谢

MIT。运行时来自 [`@juicesharp/rpiv-ask-user-question`](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question)（MIT）。
