import assert from "node:assert/strict";
import test from "node:test";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url, { moduleCache: false });
const extension = (await jiti.import("../index.ts")).default;

function createPi() {
  const tools = [];
  const handlers = new Map();
  const noOp = () => undefined;
  return new Proxy(
    {
      tools,
      handlers,
      registerTool(tool) {
        tools.push(tool);
      },
      on(event, handler) {
        const listeners = handlers.get(event) ?? [];
        listeners.push(handler);
        handlers.set(event, listeners);
      },
      getActiveTools: () => [],
      setActiveTools: noOp,
      events: { on: noOp, emit: noOp },
    },
    {
      get(target, property) {
        return property in target ? target[property] : noOp;
      },
    },
  );
}

function findDescriptions(value, path = "$", isPropertiesMap = false) {
  if (value === null || typeof value !== "object") return [];
  const found = !isPropertiesMap && Object.hasOwn(value, "description") ? [`${path}.description`] : [];
  for (const [key, child] of Object.entries(value)) {
    found.push(...findDescriptions(child, `${path}.${key}`, key === "properties"));
  }
  return found;
}

test("registers a compact ask_user_question tool while preserving the safety guidance", () => {
  const pi = createPi();
  extension(pi);

  assert.deepEqual(pi.tools.map((tool) => tool.name), ["ask_user_question"]);
  const tool = pi.tools[0];
  assert.equal(tool.description, "Ask 1-4 structured questions when a required user decision is unclear.");
  assert.equal(tool.promptSnippet, "");
  assert.equal(tool.promptGuidelines.length, 1);
  assert.deepEqual(findDescriptions(tool.parameters), []);
  assert.deepEqual(tool.parameters.required, ["questions"]);
  assert.equal(pi.handlers.has("before_agent_start"), true);
});

test("keeps the provider-facing metadata within a compact budget", () => {
  const pi = createPi();
  extension(pi);
  const tool = pi.tools[0];
  const metadata = JSON.stringify({
    name: tool.name,
    description: tool.description,
    parameters: tool.parameters,
    promptSnippet: tool.promptSnippet,
    promptGuidelines: tool.promptGuidelines,
  });

  assert.ok(metadata.length <= 1600, `metadata is ${metadata.length} chars`);
});
