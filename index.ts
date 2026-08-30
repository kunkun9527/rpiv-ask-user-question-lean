import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import askUserQuestion from "@juicesharp/rpiv-ask-user-question";

const TOOL_DESCRIPTION =
	"Ask 1-4 structured questions when a required user decision is unclear.";

const PROMPT_SNIPPET = "";

const PROMPT_GUIDELINES = [
	"Each question needs 2-4 options. Put recommendations first with (Recommended); never add Other or Type something. Use multiSelect only for nonexclusive choices and preview only for useful single-select visual comparisons.",
];

function removeSchemaDescriptions(value: unknown, seen = new Set<object>()): void {
	if (value === null || typeof value !== "object" || seen.has(value)) return;
	seen.add(value);

	const record = value as Record<string, unknown>;
	delete record.description;
	for (const [key, child] of Object.entries(record)) {
		if (key === "properties" && child !== null && typeof child === "object") {
			for (const propertySchema of Object.values(child as Record<string, unknown>)) {
				removeSchemaDescriptions(propertySchema, seen);
			}
			continue;
		}
		removeSchemaDescriptions(child, seen);
	}
}

export default function (pi: ExtensionAPI): void {
	const leanPi = new Proxy(pi, {
		get(target, property) {
			if (property === "registerTool") {
				return (tool: Parameters<ExtensionAPI["registerTool"]>[0]) => {
					if (tool.name === "ask_user_question") {
						removeSchemaDescriptions(tool.parameters);
						return target.registerTool({
							...tool,
							description: TOOL_DESCRIPTION,
							promptSnippet: PROMPT_SNIPPET,
							promptGuidelines: PROMPT_GUIDELINES,
						});
					}
					return target.registerTool(tool);
				};
			}

			const member = Reflect.get(target, property, target);
			return typeof member === "function" ? member.bind(target) : member;
		},
	});

	askUserQuestion(leanPi);
}
