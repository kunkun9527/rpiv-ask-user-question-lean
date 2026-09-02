# @ssk_dev/rpiv-ask-user-question-lean

> **Pi 用户提问交互扩展精简版，保留全部功能，仅需 215 初始化 Token，相比原版减少 83%。**
> **完整配置参考：** [查看 Pi Lean Setup](https://github.com/kunkun9527/my-lean-pi-setup)

[English](README.md)

基于 [`@juicesharp/rpiv-ask-user-question`](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question) 的精简封装。在完整保留交互式问卷界面与选项校验的同时，精简工具描述与提示词，大幅减少初始化上下文开销。

## 核心特性

* 完整交互体验：保留原版问卷交互界面、选项预览以及 RPC 回退机制。
* 结构化输入验证：支持单选、多选、推荐选项排序与严格的输入校验。
* 精简 Prompt 描述：精简工具说明中的冗余文本，让模型更轻快地发起澄清提问。

## 安装

```bash
pi install npm:@ssk_dev/rpiv-ask-user-question-lean
```

请勿与其它 `rpiv-ask-user-question` 包装扩展同时加载，以防重复注册工具。

## 使用方法

模型仅会看到一个工具：

```text
ask_user_question
```

当遇到不明确的需求或需要用户做选择时使用。每次调用可提出 1 到 4 个结构化问题，每个问题提供 2 到 4 个明确选项。

## 初始化上下文占用对比

单独启用本扩展时，注入到模型初始上下文中的 Token 占用实测如下：

| 模型可见工具 | Lean 精简版 | 原版 `@juicesharp/rpiv-ask-user-question@2.4.0` |
| --- | ---: | ---: |
| `ask_user_question` | **215** | **1,258** |

相比固定版本的上游扩展，初始开销减少了 **1,043 tokens（82.9%）**。

测试环境为 Pi 0.84.4 与 `pi-context-view@0.4.3` 独立会话，排除了 Pi 内置工具、Skills、上下文文件与无关扩展。Context View 按 `ceil(字符数 / 4)` 估算。未计入不会发送给模型的纯运行时 UI 与 Slash 命令。

## 版本说明

上游运行时锁定为 `@juicesharp/rpiv-ask-user-question@2.4.0`。

## 本地开发

```bash
npm ci
npm run check
```

测试套件使用本地 Harness 运行，不会弹出实际的交互问卷 UI。

## 开源协议与致谢

MIT 协议。本项目封装自采用 MIT 协议的 [`@juicesharp/rpiv-ask-user-question`](https://github.com/juicesharp/rpiv-mono/tree/main/packages/rpiv-ask-user-question)。