window.__ModuleLoader__.load({
  id: "dsh-multi-ai-discussion",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.jsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var import_react3 = __toESM(require("react"), 1);

// src/client/Panel.jsx
var import_react2 = __toESM(require("react"), 1);

// src/client/api.js
var BASE = "api/multi-ai-discussion";
async function fetchCatalog(force = false) {
  const response = await fetch(`${BASE}/models?refresh=${force ? "1" : "0"}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}"
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || data?.ok !== true) {
    throw new Error(data?.error?.message ?? `\u6A21\u578B\u5217\u8868\u8BF7\u6C42\u5931\u8D25\uFF08HTTP ${response.status}\uFF09`);
  }
  return data;
}
async function runDiscussion(payload, { signal, onEvent }) {
  const response = await fetch(`${BASE}/discuss`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "text/event-stream" },
    body: JSON.stringify(payload),
    signal
  });
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error?.message ?? `\u8BA8\u8BBA\u8BF7\u6C42\u5931\u8D25\uFF08HTTP ${response.status}\uFF09`);
  }
  if (response.body === null) throw new Error("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u6D41\u5F0F\u54CD\u5E94\u3002");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finished = false;
  while (!finished) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let separator = buffer.indexOf("\n\n");
    while (separator >= 0) {
      const block = buffer.slice(0, separator);
      buffer = buffer.slice(separator + 2);
      for (const line of block.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const raw = line.slice(5).trim();
        if (raw === "" || raw === "[DONE]") continue;
        let event;
        try {
          event = JSON.parse(raw);
        } catch {
          continue;
        }
        onEvent(event);
        if (event?.t === "done") finished = true;
      }
      separator = buffer.indexOf("\n\n");
    }
  }
  try {
    await reader.cancel();
  } catch {
  }
}

// src/client/Markdown.jsx
var import_react = __toESM(require("react"), 1);
var h = import_react.default.createElement;
var INLINE = /(`[^`\n]+`|\*\*[^*\n]+\*\*|\*[^*\n]+\*|\[[^\]\n]+\]\([^)\n]+\))/g;
function inline(text, keyPrefix) {
  const nodes = [];
  let last = 0;
  let match;
  let index = 0;
  INLINE.lastIndex = 0;
  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const key2 = `${keyPrefix}-i${index++}`;
    if (token.startsWith("`")) {
      nodes.push(h("code", { key: key2, className: "mad-code" }, token.slice(1, -1)));
    } else if (token.startsWith("**")) {
      nodes.push(h("strong", { key: key2 }, token.slice(2, -2)));
    } else if (token.startsWith("[")) {
      const split = token.indexOf("](");
      const label = token.slice(1, split);
      const href = token.slice(split + 2, -1);
      const safe = /^https?:\/\//i.test(href) ? href : void 0;
      nodes.push(safe === void 0 ? h("span", { key: key2 }, label) : h("a", { key: key2, href: safe, target: "_blank", rel: "noreferrer noopener" }, label));
    } else {
      nodes.push(h("em", { key: key2 }, token.slice(1, -1)));
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
function renderBlocks(text) {
  const lines = String(text).replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let key2 = 0;
  const flush = () => {
    if (paragraph.length === 0) return;
    const content = paragraph.join(" ");
    blocks.push(h("p", { key: `p${key2++}` }, inline(content, `p${key2}`)));
    paragraph = [];
  };
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed === "") {
      flush();
      continue;
    }
    if (trimmed.startsWith("```")) {
      flush();
      const language = trimmed.slice(3).trim();
      const body = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        body.push(lines[i]);
        i += 1;
      }
      blocks.push(h(
        "pre",
        { key: `c${key2++}`, className: "mad-pre" },
        h("code", { className: "mad-code" }, body.join("\n"))
      ));
      if (language !== "") blocks[blocks.length - 1] = h(
        "div",
        { key: `cw${key2++}`, className: "mad-codeWrap" },
        h("div", { className: "mad-codeLang" }, language),
        blocks[blocks.length - 1]
      );
      continue;
    }
    const heading = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (heading !== null) {
      flush();
      const level = heading[1].length;
      blocks.push(h(`h${level + 2}`, { key: `h${key2++}`, className: `mad-h mad-h${level}` }, inline(heading[2], `h${key2}`)));
      continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      flush();
      blocks.push(h("hr", { key: `hr${key2++}`, className: "mad-hr" }));
      continue;
    }
    if (trimmed.startsWith(">")) {
      flush();
      const quote = [trimmed.replace(/^>\s?/, "")];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith(">")) {
        i += 1;
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
      }
      blocks.push(h("blockquote", { key: `q${key2++}`, className: "mad-quote" }, inline(quote.join(" "), `q${key2}`)));
      continue;
    }
    if (/^[-*+]\s+/.test(trimmed)) {
      flush();
      const items = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(h("li", { key: `li${key2++}` }, inline(lines[i].trim().replace(/^[-*+]\s+/, ""), `li${key2}`)));
        i += 1;
      }
      i -= 1;
      blocks.push(h("ul", { key: `ul${key2++}`, className: "mad-list" }, items));
      continue;
    }
    if (/^\d+[.)]\s+/.test(trimmed)) {
      flush();
      const items = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(h("li", { key: `li${key2++}` }, inline(lines[i].trim().replace(/^\d+[.)]\s+/, ""), `li${key2}`)));
        i += 1;
      }
      i -= 1;
      blocks.push(h("ol", { key: `ol${key2++}`, className: "mad-list" }, items));
      continue;
    }
    paragraph.push(trimmed);
  }
  flush();
  return blocks;
}
function Markdown({ text, className }) {
  const blocks = import_react.default.useMemo(() => renderBlocks(text), [text]);
  return h("div", { className: className ?? "mad-md" }, blocks);
}

// src/client/i18n.js
var NS = "multi-ai-discussion";
var zh = {
  nav: "\u591A AI \u8BA8\u8BBA",
  title: "\u591A AI \u8BA8\u8BBA",
  titleTag: "\u4E00\u8D77\u60F3\uFF0C\u66F4\u9760\u8C31",
  subtitle: "\u9009\u51E0\u4E2A\u6A21\u578B\u5404\u81EA\u4F5C\u7B54\u3001\u533F\u540D\u4E92\u8BC4\uFF0C\u518D\u7531\u4E3B\u6301\u4EBA\u6C47\u603B\u6210\u4E00\u4EFD\u6700\u7EC8\u7B54\u6848",
  back: "\u8FD4\u56DE",
  backHint: "\u56DE\u5230\u4F1A\u8BDD\uFF08Esc\uFF09",
  questionLabel: "\u8981\u8BA8\u8BBA\u7684\u9700\u6C42\u6216\u95EE\u9898",
  questionPlaceholder: "\u4F8B\u5982\uFF1A\u4E3A\u4E00\u4E2A\u5185\u90E8\u7BA1\u7406\u5DE5\u5177\u8BBE\u8BA1\u6743\u9650\u6A21\u578B\uFF0C\u8981\u652F\u6301\u6309\u9879\u76EE\u548C\u89D2\u8272\u6388\u6743\uFF0C\u5E76\u8BF4\u660E\u8FC1\u79FB\u65B9\u6848\u3002",
  extraLabel: "\u8865\u5145\u524D\u63D0\uFF08\u53EF\u9009\uFF09",
  extraHint: "\u4F1A\u4F5C\u4E3A\u540C\u4E00\u4EFD\u80CC\u666F\u4EA4\u7ED9\u6240\u6709\u6A21\u578B",
  extraPlaceholder: "\u6280\u672F\u6808\u3001\u56E2\u961F\u89C4\u6A21\u3001\u65F6\u95F4\u6216\u6210\u672C\u7EA6\u675F\u2026\u2026",
  modelsLabel: "\u53C2\u4E0E\u8BA8\u8BBA\u7684\u6A21\u578B",
  modelsHint: "\u5217\u8868\u6765\u81EA\u4F60\u5DF2\u914D\u7F6E\u7684\u6A21\u578B\uFF1B\u5EFA\u8BAE 2\u20134 \u4E2A\uFF0C\u6240\u6709\u6A21\u578B\u4F1A\u5E76\u53D1\u8BF7\u6C42",
  modelsLoading: "\u6B63\u5728\u8BFB\u53D6\u6A21\u578B\u5217\u8868\u2026",
  modelsRetry: "\u91CD\u65B0\u8BFB\u53D6",
  modelsClear: "\u6E05\u7A7A",
  modelsSelected: "\u5DF2\u9009",
  modelsEmpty: "\u8FD8\u6CA1\u6709\u53EF\u7528\u7684\u5BF9\u8BDD\u6A21\u578B\u3002\u8BF7\u5148\u5728\u300C\u8BBE\u7F6E \u2192 \u6A21\u578B\u300D\u91CC\u914D\u7F6E\u4E00\u4E2A provider\uFF0C\u518D\u56DE\u6765\u8BA8\u8BBA\u3002",
  modelsFailed: "\u6A21\u578B\u5217\u8868\u8BFB\u53D6\u5931\u8D25",
  roundsLabel: "\u8BA8\u8BBA\u8F6E\u6B21",
  rounds1: "\u5FEB\u901F \xB7 \u5404\u81EA\u4F5C\u7B54",
  rounds2: "\u6807\u51C6 \xB7 \u4F5C\u7B54 + \u4E92\u8BC4",
  rounds3: "\u6DF1\u5EA6 \xB7 \u4F5C\u7B54 + \u4E92\u8BC4 + \u6C47\u603B",
  roundsHint1: "\u6BCF\u4E2A\u6A21\u578B\u72EC\u7ACB\u56DE\u7B54\uFF0C\u76F4\u63A5\u5BF9\u6BD4\u4E0D\u540C\u601D\u8DEF\u3002",
  roundsHint2: "\u7B2C\u4E8C\u8F6E\u6A21\u578B\u4F1A\u770B\u5230\u5F7C\u6B64\u7684\u7B54\u6848\uFF0C\u6307\u51FA\u9519\u8BEF\u4E0E\u9057\u6F0F\u540E\u4FEE\u8BA2\u81EA\u5DF1\u7684\u56DE\u7B54\u3002",
  roundsHint3: "\u5728\u4E92\u8BC4\u4E4B\u540E\uFF0C\u7531\u4F60\u6307\u5B9A\u7684\u6C47\u603B\u8005\u5408\u5E76\u5206\u6B67\uFF0C\u8F93\u51FA\u552F\u4E00\u4E00\u4EFD\u6700\u7EC8\u7B54\u6848\u3002",
  chairLabel: "\u6C47\u603B\u8005",
  chairHint: "\u5B83\u8D1F\u8D23\u628A\u591A\u4EFD\u7B54\u6848\u5408\u5E76\u6210\u6700\u7EC8\u7ED3\u8BBA\uFF0C\u901A\u5E38\u9009\u6700\u7A33\u7684\u90A3\u4E2A",
  expert: "\u4E13\u5BB6",
  you: "\u81EA\u9009",
  start: "\u5F00\u59CB\u8BA8\u8BBA",
  stop: "\u505C\u6B62",
  restart: "\u518D\u8BA8\u8BBA\u4E00\u6B21",
  copy: "\u590D\u5236\u7ED3\u8BBA",
  copied: "\u5DF2\u590D\u5236",
  editSetup: "\u4FEE\u6539\u8BBE\u5B9A",
  collapseSetup: "\u6536\u8D77\u8BBE\u5B9A",
  needTwo: "\u81F3\u5C11\u9009\u62E9 2 \u4E2A\u6A21\u578B\uFF0C\u8BA8\u8BBA\u624D\u6210\u7ACB",
  needQuestion: "\u5148\u5199\u4E0B\u8981\u8BA8\u8BBA\u7684\u95EE\u9898",
  phaseAnswer: "\u7B2C\u4E00\u8F6E \xB7 \u72EC\u7ACB\u4F5C\u7B54",
  phaseCritique: "\u7B2C\u4E8C\u8F6E \xB7 \u4EA4\u53C9\u8BC4\u5BA1",
  phaseSynthesis: "\u6700\u7EC8 \xB7 \u6C47\u603B\u7ED3\u8BBA",
  phaseAnswerHint: "\u5404\u6A21\u578B\u4E92\u4E0D\u53EF\u89C1\uFF0C\u907F\u514D\u4E92\u76F8\u5E26\u504F",
  phaseCritiqueHint: "\u533F\u540D\u4E92\u8BC4\uFF1A\u6307\u51FA\u522B\u4EBA\u7684\u9519\u8BEF\uFF0C\u518D\u4FEE\u8BA2\u81EA\u5DF1",
  phaseSynthesisHint: "\u5408\u5E76\u5206\u6B67\uFF0C\u7ED9\u51FA\u552F\u4E00\u4E00\u4EFD\u53EF\u6267\u884C\u7684\u7ED3\u8BBA",
  statusRunning: "\u8BA8\u8BBA\u4E2D",
  statusDone: "\u5DF2\u5B8C\u6210",
  statusStopped: "\u5DF2\u505C\u6B62",
  statusError: "\u51FA\u9519",
  statusIdle: "\u5F85\u5F00\u59CB",
  thinking: "\u601D\u8003\u4E2D\u2026",
  failed: "\u5931\u8D25",
  chars: "\u5B57",
  tokens: "tokens",
  emptyTitle: "\u591A\u4E00\u53CC\u773C\u775B\uFF0C\u591A\u4E00\u4E2A\u89D2\u5EA6",
  emptyBody: "\u5355\u4E2A\u6A21\u578B\u5BB9\u6613\u5728\u7EC6\u8282\u4E0A\u60F3\u5F53\u7136\uFF1B\u8BA9\u5B83\u4EEC\u4E92\u76F8\u6311\u9519\uFF0C\u6700\u7EC8\u7ED3\u8BBA\u901A\u5E38\u66F4\u7A33\u3002",
  empty1: "\u5404\u81EA\u72EC\u7ACB\u4F5C\u7B54\uFF0C\u4E92\u4E0D\u5F71\u54CD",
  empty2: "\u533F\u540D\u4E92\u8BC4\uFF0C\u6307\u51FA\u9519\u8BEF\u4E0E\u9057\u6F0F",
  empty3: "\u4E3B\u6301\u4EBA\u5408\u5E76\u5206\u6B67\uFF0C\u4EA7\u51FA\u6700\u7EC8\u65B9\u6848",
  errorPrefix: "\u8BF7\u6C42\u5931\u8D25\uFF1A",
  noSelection: "\u8FD8\u6CA1\u6709\u9009\u62E9\u6A21\u578B"
};
var en = {
  nav: "Multi-AI discussion",
  title: "Multi-AI discussion",
  titleTag: "think together",
  subtitle: "Several models answer on their own, critique each other anonymously, then one merges the result",
  back: "Back",
  backHint: "Back to the conversation (Esc)",
  questionLabel: "Requirement or question",
  questionPlaceholder: "For example: design a permission model for an internal admin tool that supports project and role based access, and describe the migration.",
  extraLabel: "Constraints (optional)",
  extraHint: "Shared as background with every model",
  extraPlaceholder: "Stack, team size, timeline or cost limits\u2026",
  modelsLabel: "Models in this discussion",
  modelsHint: "Taken from the models you configured; 2\u20134 works best, they are called concurrently",
  modelsLoading: "Reading the model catalog\u2026",
  modelsRetry: "Reload",
  modelsClear: "Clear",
  modelsSelected: "Selected",
  modelsEmpty: "No chat model is available yet. Configure a provider under Settings \u2192 Models first.",
  modelsFailed: "Could not read the model catalog",
  roundsLabel: "Rounds",
  rounds1: "Quick \xB7 answers only",
  rounds2: "Standard \xB7 answers + critique",
  rounds3: "Deep \xB7 answers + critique + synthesis",
  roundsHint1: "Each model answers independently so the approaches can be compared.",
  roundsHint2: "In round two each model sees the others, points out errors, then revises its own answer.",
  roundsHint3: "After the critique, your chosen chair merges the disagreements into one final answer.",
  chairLabel: "Chair",
  chairHint: "Merges the answers into the final conclusion",
  expert: "Expert",
  you: "Custom",
  start: "Start discussion",
  stop: "Stop",
  restart: "Discuss again",
  copy: "Copy conclusion",
  copied: "Copied",
  editSetup: "Edit setup",
  collapseSetup: "Hide setup",
  needTwo: "Pick at least two models",
  needQuestion: "Write the question first",
  phaseAnswer: "Round 1 \xB7 Independent answers",
  phaseCritique: "Round 2 \xB7 Cross critique",
  phaseSynthesis: "Final \xB7 Synthesis",
  phaseAnswerHint: "Models cannot see each other, so they stay independent",
  phaseCritiqueHint: "Anonymous peer review, then each model revises itself",
  phaseSynthesisHint: "Disagreements merged into one actionable conclusion",
  statusRunning: "Running",
  statusDone: "Finished",
  statusStopped: "Stopped",
  statusError: "Failed",
  statusIdle: "Not started",
  thinking: "Thinking\u2026",
  failed: "Failed",
  chars: "chars",
  tokens: "tokens",
  emptyTitle: "One more pair of eyes",
  emptyBody: "A single model trusts its own assumptions; models that challenge each other are usually more accurate.",
  empty1: "Independent answers, no cross-talk",
  empty2: "Anonymous critique of errors and gaps",
  empty3: "A chair merges the disagreements",
  errorPrefix: "Request failed: ",
  noSelection: "No model selected"
};

// src/client/Panel.jsx
var h2 = import_react2.default.createElement;
var defaultIcon = (size = 20) => h2(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  },
  h2("circle", { cx: 7.2, cy: 8.6, r: 2.7, stroke: "currentColor", strokeWidth: 1.6 }),
  h2("circle", { cx: 16.8, cy: 8.6, r: 2.7, stroke: "currentColor", strokeWidth: 1.6 }),
  h2("path", { d: "M3.4 18.6c.7-2.9 3-4.6 5.7-4.6s5 1.7 5.7 4.6", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" }),
  h2("path", { d: "M15.2 14.4c2.2.2 4 1.8 4.6 4.2", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", opacity: ".55" })
);
function PanelIcon({ size = 18 }) {
  return defaultIcon(size);
}
function key(provider, model) {
  return `${provider}::${model}`;
}
var ROUNDS = [1, 2, 3];
function StreamingText({ text, streaming }) {
  return h2(
    import_react2.default.Fragment,
    null,
    h2(Markdown, { text }),
    streaming ? h2("span", { className: "mad-caret" }) : null
  );
}
function Thinking() {
  return h2(
    "span",
    { className: "mad-thinking" },
    "\u2026",
    h2("i"),
    h2("i"),
    h2("i")
  );
}
function Card({ title, provider, state, chars, children, error }) {
  const meta = state === "running" ? "\xB7\xB7\xB7" : state === "failed" ? "" : chars > 0 ? `${chars}` : "";
  return h2(
    "div",
    { className: `mad-card ${state}` },
    h2(
      "div",
      { className: "mad-cardHead" },
      h2("span", { className: `mad-dotS ${state}` }),
      h2("span", { className: "mad-cardName" }, title),
      provider ? h2("span", { className: "mad-cardProvider" }, provider) : null,
      h2("span", { className: "mad-cardMeta" }, meta)
    ),
    h2(
      "div",
      { className: "mad-cardBody" },
      error ? h2("div", { className: "mad-cardError" }, error) : children
    )
  );
}
function MultiAiPanel({ ctx, initialQuestion }) {
  const [, bumpLocale] = import_react2.default.useState(0);
  const t = ctx.locale.bind(NS);
  import_react2.default.useEffect(() => ctx.locale.subscribe(() => bumpLocale((value) => value + 1)), [ctx]);
  const [catalog, setCatalog] = import_react2.default.useState(null);
  const [catalogError, setCatalogError] = import_react2.default.useState(null);
  const [loadingCatalog, setLoadingCatalog] = import_react2.default.useState(true);
  const [selected, setSelected] = import_react2.default.useState([]);
  const [question, setQuestion] = import_react2.default.useState(typeof initialQuestion === "string" ? initialQuestion : "");
  const [extra, setExtra] = import_react2.default.useState("");
  const [rounds, setRounds] = import_react2.default.useState(3);
  const [chairKey, setChairKey] = import_react2.default.useState(null);
  const [setupOpen, setSetupOpen] = import_react2.default.useState(true);
  const [phase, setPhase] = import_react2.default.useState("idle");
  const [runs, setRuns] = import_react2.default.useState(null);
  const [error, setError] = import_react2.default.useState(null);
  const [copied, setCopied] = import_react2.default.useState(false);
  const abortRef = import_react2.default.useRef(null);
  const scrollRef = import_react2.default.useRef(null);
  const liveRef = import_react2.default.useRef(null);
  const loadCatalog = import_react2.default.useCallback(async (force = false) => {
    setLoadingCatalog(true);
    setCatalogError(null);
    try {
      const data = await fetchCatalog(force);
      setCatalog(data);
      const preferred = data?.limits?.defaultRounds;
      if (Number.isInteger(preferred) && preferred >= 1 && preferred <= 3) {
        setRounds((current) => current === 3 ? preferred : current);
      }
      const preset = Array.isArray(data.selection) ? data.selection : [];
      setSelected((current) => {
        const allowed = /* @__PURE__ */ new Set();
        for (const provider of data.providers ?? []) {
          for (const model of provider.models) allowed.add(key(provider.id, model.id));
        }
        const kept = current.filter((item) => allowed.has(key(item.provider, item.model)));
        if (kept.length > 0) return kept;
        return preset.filter((item) => allowed.has(key(item.provider, item.model)));
      });
    } catch (loadError) {
      setCatalogError(loadError instanceof Error ? loadError.message : String(loadError));
      setCatalog(null);
    } finally {
      setLoadingCatalog(false);
    }
  }, []);
  import_react2.default.useEffect(() => {
    loadCatalog(false);
  }, [loadCatalog]);
  import_react2.default.useEffect(() => {
    if (selected.length === 0) {
      setChairKey(null);
      return;
    }
    const keys = new Set(selected.map((item) => key(item.provider, item.model)));
    setChairKey((current) => current !== null && keys.has(current) ? current : keys.values().next().value);
  }, [selected]);
  const modelName = import_react2.default.useCallback((providerId, modelId, fallbackLabel) => {
    if (typeof fallbackLabel === "string" && fallbackLabel !== "") return fallbackLabel;
    const provider = catalog?.providers?.find((item) => item.id === providerId);
    const model = provider?.models?.find((item) => item.id === modelId);
    return model?.name ?? modelId;
  }, [catalog]);
  const providerName = import_react2.default.useCallback((providerId) => catalog?.providers?.find((item) => item.id === providerId)?.name ?? providerId, [catalog]);
  const toggleModel = import_react2.default.useCallback((providerId, modelId) => {
    if (phase === "running") return;
    const id = key(providerId, modelId);
    setSelected((current) => {
      const exists = current.some((item) => key(item.provider, item.model) === id);
      if (exists) return current.filter((item) => key(item.provider, item.model) !== id);
      const max = catalog?.limits?.maxMembers ?? 6;
      if (current.length >= max) return current;
      return [...current, { provider: providerId, model: modelId }];
    });
  }, [phase, catalog]);
  const providerGroups = catalog?.providers ?? [];
  const start = import_react2.default.useCallback(async () => {
    const text = question.trim();
    if (text === "") {
      setError(t("needQuestion"));
      return;
    }
    if (selected.length < 2) {
      setError(t("needTwo"));
      return;
    }
    setError(null);
    setCopied(false);
    setPhase("running");
    const members = selected.map((item) => ({
      provider: item.provider,
      model: item.model,
      label: modelName(item.provider, item.model),
      providerName: providerName(item.provider)
    }));
    const initial = {
      question: text,
      members,
      chairIndex: Math.max(0, members.findIndex((item) => key(item.provider, item.model) === chairKey)),
      rounds,
      answer: members.map(() => ({ text: "", state: "idle", error: null, chars: 0 })),
      critique: Array(members.length).fill(null),
      synthesis: { text: "", state: "idle", error: null, chairIndex: Math.max(0, members.findIndex((item) => key(item.provider, item.model) === chairKey)) },
      phaseNow: "answer",
      finished: false,
      startedAt: Date.now(),
      elapsed: 0
    };
    setRuns(initial);
    setSetupOpen(false);
    if (scrollRef.current !== null) scrollRef.current.scrollTop = 0;
    const controller = new AbortController();
    abortRef.current = controller;
    const startedAt = Date.now();
    const tick = setInterval(() => {
      setRuns((current) => current === null || current.finished ? current : { ...current, elapsed: Date.now() - startedAt });
    }, 500);
    const patchMember = (index, patch) => setRuns((current) => {
      if (current === null) return current;
      const membersList = current.answer.map((item, i) => i === index ? { ...item, ...patch } : item);
      return { ...current, answer: membersList };
    });
    try {
      await runDiscussion({
        question: text,
        extra: extra.trim() === "" ? void 0 : extra.trim(),
        models: selected.map((item) => ({ provider: item.provider, model: item.model })),
        rounds,
        chairIndex: Math.max(0, members.findIndex((item) => key(item.provider, item.model) === chairKey))
      }, {
        signal: controller.signal,
        onEvent: (event) => {
          switch (event.t) {
            case "ready":
              break;
            case "phase":
              setRuns((current) => current === null ? current : { ...current, phaseNow: event.phase });
              break;
            case "start":
              if (event.phase === "answer") patchMember(event.index, { state: "running" });
              else if (event.phase === "critique") setRuns((current) => current === null ? current : {
                ...current,
                critique: current.critique.map((item, i) => i === event.index ? { state: "running", text: "", chars: 0, error: null } : item)
              });
              else if (event.phase === "synthesis") setRuns((current) => current === null ? current : {
                ...current,
                synthesis: { ...current.synthesis, state: "running" }
              });
              break;
            case "delta":
              if (event.phase === "answer") setRuns((current) => current === null ? current : {
                ...current,
                answer: current.answer.map((item, i) => i === event.index ? { ...item, text: item.text + event.text, chars: item.text.length + event.text.length } : item)
              });
              else if (event.phase === "critique") setRuns((current) => current === null ? current : {
                ...current,
                critique: current.critique.map((item, i) => i === event.index ? { ...item ?? { state: "running", chars: 0 }, text: (item?.text ?? "") + event.text, chars: (item?.text ?? "").length + event.text.length } : item)
              });
              else if (event.phase === "synthesis") setRuns((current) => current === null ? current : {
                ...current,
                synthesis: { ...current.synthesis, text: current.synthesis.text + event.text }
              });
              break;
            case "end":
              if (event.phase === "answer") patchMember(event.index, { state: "done", chars: event.chars ?? 0, usage: event.usage ?? null });
              else if (event.phase === "critique") setRuns((current) => current === null ? current : {
                ...current,
                critique: current.critique.map((item, i) => i === event.index ? { ...item ?? {}, state: "done", chars: event.chars ?? 0 } : item)
              });
              else if (event.phase === "synthesis") setRuns((current) => current === null ? current : {
                ...current,
                synthesis: { ...current.synthesis, state: "done", chars: event.chars ?? 0 }
              });
              break;
            case "fail":
              if (event.phase === "answer") patchMember(event.index, { state: "failed", error: event.message ?? "failed" });
              else if (event.phase === "critique") setRuns((current) => current === null ? current : {
                ...current,
                critique: current.critique.map((item, i) => i === event.index ? { ...item ?? {}, state: "failed", error: event.message ?? "failed" } : item)
              });
              else if (event.phase === "synthesis") setRuns((current) => current === null ? current : {
                ...current,
                synthesis: { ...current.synthesis, state: "failed", error: event.message ?? "failed" }
              });
              else setError(event.message ?? "failed");
              break;
            case "done":
              setRuns((current) => current === null ? current : { ...current, finished: true, elapsed: Date.now() - startedAt });
              setPhase("done");
              break;
            default:
              break;
          }
        }
      });
      setRuns((current) => current === null ? current : { ...current, finished: true });
      setPhase((current) => current === "running" ? "done" : current);
    } catch (runError) {
      if (controller.signal.aborted) {
        setPhase("stopped");
      } else {
        setError(runError instanceof Error ? runError.message : String(runError));
        setPhase("error");
      }
      setRuns((current) => current === null ? current : { ...current, finished: true });
    } finally {
      clearInterval(tick);
      abortRef.current = null;
    }
  }, [question, extra, selected, rounds, chairKey, t, modelName, providerName]);
  const stop = import_react2.default.useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setPhase("stopped");
    setRuns((current) => current === null ? current : { ...current, finished: true, elapsed: Date.now() - (current.startedAt ?? Date.now()) });
  }, []);
  import_react2.default.useEffect(() => {
    if (phase !== "running" || scrollRef.current === null) return;
    const el = scrollRef.current;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 140;
    if (nearBottom) el.scrollTop = el.scrollHeight;
  }, [runs, phase]);
  const copyFinal = import_react2.default.useCallback(async () => {
    const text = runs?.synthesis?.text?.trim() || "";
    if (text === "") return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }, [runs]);
  const goBack = import_react2.default.useCallback(() => {
    abortRef.current?.abort();
    try {
      ctx.get("layout")?.selectPanel(null);
    } catch (backError) {
      console.warn("[multi-ai-discussion] \u65E0\u6CD5\u8FD4\u56DE\u4F1A\u8BDD", backError);
    }
  }, [ctx]);
  import_react2.default.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key !== "Escape") return;
      const target = event.target;
      const typing = target !== null && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable === true);
      if (typing) return;
      event.preventDefault();
      goBack();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goBack]);
  const running = phase === "running";
  const hasResult = runs !== null;
  const memberCount = selected.length;
  const maxMembers = catalog?.limits?.maxMembers ?? 6;
  const chair = selected.find((item) => key(item.provider, item.model) === chairKey);
  const statusText = running ? t("statusRunning") : phase === "done" ? t("statusDone") : phase === "stopped" ? t("statusStopped") : phase === "error" ? t("statusError") : t("statusIdle");
  return h2(
    "div",
    { className: "mad-root" },
    h2(
      "header",
      { className: "mad-header" },
      h2("div", { className: "mad-mark" }, defaultIcon(19)),
      h2(
        "div",
        { className: "mad-headCopy" },
        h2("h1", { className: "mad-title" }, t("title"), h2("small", null, t("titleTag"))),
        h2("p", { className: "mad-sub" }, t("subtitle"))
      ),
      h2("span", { className: "mad-spacer" }),
      h2("button", { type: "button", className: "mad-btn ghost", onClick: goBack, title: t("backHint") }, `\u2190 ${t("back")}`)
    ),
    h2(
      "div",
      { className: "mad-scroll", ref: scrollRef },
      // ---------- 设定（运行中可收起） ----------
      h2(
        "section",
        {
          className: "mad-setup",
          style: setupOpen || runs === null ? void 0 : { display: "none" }
        },
        h2(
          "div",
          { className: "mad-field" },
          h2(
            "div",
            { className: "mad-labelRow" },
            h2("span", { className: "mad-label" }, t("questionLabel")),
            h2("span", { className: "mad-count" }, `${question.length} / 20000`)
          ),
          h2("textarea", {
            className: "mad-input",
            value: question,
            placeholder: t("questionPlaceholder"),
            rows: 4,
            disabled: running,
            maxLength: 2e4,
            onChange: (event) => setQuestion(event.target.value)
          })
        ),
        h2(
          "div",
          { className: "mad-field" },
          h2(
            "div",
            { className: "mad-labelRow" },
            h2("span", { className: "mad-label" }, t("extraLabel")),
            h2("span", { className: "mad-hint" }, t("extraHint"))
          ),
          h2("input", {
            className: "mad-input small",
            value: extra,
            placeholder: t("extraPlaceholder"),
            disabled: running,
            maxLength: 4e3,
            onChange: (event) => setExtra(event.target.value)
          })
        ),
        h2(
          "div",
          { className: "mad-field" },
          h2(
            "div",
            { className: "mad-labelRow" },
            h2("span", { className: "mad-label" }, t("modelsLabel")),
            h2("span", { className: "mad-hint" }, t("modelsHint")),
            h2("span", { className: "mad-count" }, `${memberCount} / ${maxMembers}`)
          ),
          loadingCatalog ? h2("div", { className: "mad-hint" }, t("modelsLoading")) : catalogError !== null ? h2(
            "div",
            { className: "mad-error" },
            h2("span", { style: { flex: "1 1 auto" } }, `${t("modelsFailed")}\uFF1A${catalogError}`),
            h2("button", { type: "button", className: "mad-btn tiny", onClick: () => loadCatalog(true) }, t("modelsRetry"))
          ) : providerGroups.length === 0 ? h2("div", { className: "mad-emptyNote" }, t("modelsEmpty")) : h2(
            "div",
            { className: "mad-models" },
            providerGroups.map((provider) => h2(
              "div",
              { className: "mad-group", key: provider.id },
              h2("div", { className: "mad-groupName" }, provider.name),
              h2(
                "div",
                { className: "mad-chips" },
                provider.models.map((model) => {
                  const on = selected.some((item) => key(item.provider, item.model) === key(provider.id, model.id));
                  return h2(
                    "label",
                    {
                      key: model.id,
                      className: `mad-chip${on ? " on" : ""}`,
                      title: `${provider.name} / ${model.name}`
                    },
                    h2("input", {
                      type: "checkbox",
                      checked: on,
                      disabled: running || !on && memberCount >= maxMembers,
                      onChange: () => toggleModel(provider.id, model.id)
                    }),
                    h2("span", { className: "mad-dot" }),
                    h2("span", { className: "mad-chipName" }, model.name)
                  );
                })
              )
            )),
            memberCount > 0 ? h2(
              "div",
              { className: "mad-modelsFoot" },
              h2("span", { className: "mad-hint" }, `${t("modelsSelected")} ${memberCount}`),
              h2("span", { className: "mad-spacer" }),
              h2("button", { type: "button", className: "mad-btn tiny ghost", disabled: running, onClick: () => setSelected([]) }, t("modelsClear"))
            ) : null
          ),
          h2(
            "div",
            { className: "mad-controls" },
            h2(
              "div",
              { className: "mad-field" },
              h2("div", { className: "mad-labelRow" }, h2("span", { className: "mad-label" }, t("roundsLabel"))),
              h2(
                "div",
                { className: "mad-seg" },
                ROUNDS.map((value) => h2("button", {
                  key: value,
                  type: "button",
                  "aria-pressed": rounds === value,
                  disabled: running,
                  onClick: () => setRounds(value)
                }, t(`rounds${value}`)))
              ),
              h2(
                "div",
                { className: "mad-hint" },
                `${t(`roundsHint${rounds}`)}${rounds >= 3 && selected.length < 2 ? ` ${t("needTwo")}` : ""}`
              )
            ),
            rounds >= 3 ? h2(
              "div",
              { className: "mad-field" },
              h2(
                "div",
                { className: "mad-labelRow" },
                h2("span", { className: "mad-label" }, t("chairLabel")),
                h2("span", { className: "mad-hint" }, t("chairHint"))
              ),
              selected.length === 0 ? h2("div", { className: "mad-hint" }, t("noSelection")) : h2("select", {
                className: "mad-select",
                value: chairKey ?? "",
                disabled: running,
                onChange: (event) => setChairKey(event.target.value)
              }, selected.map((item) => {
                const id = key(item.provider, item.model);
                return h2("option", { key: id, value: id }, `${modelName(item.provider, item.model)} \xB7 ${providerName(item.provider)}`);
              }))
            ) : null
          ),
          h2(
            "div",
            { className: "mad-submitRow" },
            running ? h2("button", { type: "button", className: "mad-btn danger", onClick: stop }, `\u25A0 ${t("stop")}`) : h2("button", {
              type: "button",
              className: "mad-btn primary",
              disabled: loadingCatalog || question.trim() === "" || memberCount < 2,
              onClick: start
            }, `${hasResult ? t("restart") : t("start")} \u2192`),
            hasResult && !running && setupOpen ? h2("button", { type: "button", className: "mad-btn ghost", onClick: () => setSetupOpen(false) }, t("collapseSetup")) : null,
            hasResult && !running && runs?.synthesis?.state === "done" ? h2("button", { type: "button", className: "mad-btn", onClick: copyFinal }, copied ? `\u2713 ${t("copied")}` : t("copy")) : null,
            h2("span", { className: "mad-spacer" }),
            memberCount > 0 && !running ? h2("span", { className: "mad-hint" }, chair === void 0 ? "" : `${t("chairLabel")}\uFF1A${modelName(chair.provider, chair.model)}`) : null
          ),
          error !== null ? h2("div", { className: "mad-error" }, h2("span", null, `${t("errorPrefix")}${error}`)) : null
        ),
        runs !== null && !setupOpen ? h2(
          "section",
          { className: "mad-summary" },
          h2("span", { className: "mad-summaryLabel" }, t("questionLabel")),
          h2("span", { className: "mad-summaryText" }, question),
          h2("span", { className: "mad-summaryMeta" }, runs.members.map((member) => member.label).join(" \xB7 ")),
          h2("button", { type: "button", className: "mad-btn tiny", onClick: () => setSetupOpen(true) }, t("editSetup"))
        ) : null,
        // ---------- 进行中 / 结果 ----------
        runs === null ? h2(
          "div",
          { className: "mad-empty" },
          h2("div", { className: "mad-emptyArt" }, defaultIcon(30)),
          h2("div", { className: "mad-emptyTitle" }, t("emptyTitle")),
          h2("div", { className: "mad-emptyBody" }, t("emptyBody")),
          h2(
            "div",
            { className: "mad-steps" },
            h2("span", { className: "mad-step" }, h2("b", null, "1"), t("empty1")),
            h2("span", { className: "mad-step" }, h2("b", null, "2"), t("empty2")),
            h2("span", { className: "mad-step" }, h2("b", null, "3"), t("empty3"))
          )
        ) : h2(
          "div",
          { className: "mad-results" },
          h2(
            "div",
            { className: "mad-statusBar" },
            h2("strong", null, statusText),
            h2("span", null, "\xB7"),
            h2("span", null, `${runs.members.length} ${t("expert")}`),
            h2("span", null, "\xB7"),
            h2("span", null, `${Math.max(0, Math.round((runs.elapsed ?? 0) / 1e3))}s`),
            h2("span", { className: "mad-spacer" }),
            h2("span", null, rounds >= 3 ? t("phaseSynthesis") : rounds >= 2 ? t("phaseCritique") : t("phaseAnswer"))
          ),
          h2(
            "section",
            { className: "mad-phase" },
            h2(
              "div",
              { className: "mad-phaseHead" },
              h2("h2", { className: "mad-phaseTitle" }, t("phaseAnswer")),
              h2("span", { className: "mad-phaseHint" }, t("phaseAnswerHint"))
            ),
            h2(
              "div",
              { className: "mad-grid" },
              runs.answer.map((item, index) => {
                const member = runs.members[index];
                return h2(Card, {
                  key: `${member.provider}/${member.model}`,
                  title: member.label,
                  provider: member.providerName,
                  state: item.state,
                  chars: item.chars,
                  error: item.error
                }, item.text === "" ? item.state === "running" ? h2(Thinking) : h2("span", { className: "mad-hint" }, "\u2014") : h2(StreamingText, { text: item.text, streaming: item.state === "running" }));
              })
            )
          ),
          rounds >= 2 ? h2(
            "section",
            { className: "mad-phase" },
            h2(
              "div",
              { className: "mad-phaseHead" },
              h2("h2", { className: "mad-phaseTitle" }, t("phaseCritique")),
              h2("span", { className: "mad-phaseHint" }, t("phaseCritiqueHint"))
            ),
            h2(
              "div",
              { className: "mad-grid" },
              runs.answer.map((item, index) => {
                const member = runs.members[index];
                const critique = runs.critique[index];
                const state = critique?.state ?? (item.state === "failed" ? "failed" : "idle");
                return h2(Card, {
                  key: `${member.provider}/${member.model}`,
                  title: member.label,
                  provider: member.providerName,
                  state,
                  chars: critique?.chars ?? 0,
                  error: critique?.error ?? null
                }, (critique?.text ?? "") === "" ? state === "running" ? h2(Thinking) : h2("span", { className: "mad-hint" }, "\u2014") : h2(StreamingText, { text: critique.text, streaming: state === "running" }));
              })
            )
          ) : null,
          rounds >= 3 ? h2(
            "section",
            { className: "mad-final" },
            h2(
              "div",
              { className: "mad-finalHead" },
              h2("span", { className: `mad-dotS ${runs.synthesis.state}` }),
              h2("span", { className: "mad-finalTitle" }, t("phaseSynthesis")),
              h2("span", { className: "mad-hint" }, t("phaseSynthesisHint")),
              h2("span", { className: "mad-spacer" }),
              h2(
                "span",
                { className: "mad-hint" },
                (() => {
                  const chairMember = runs.members[runs.synthesis.chairIndex];
                  return chairMember === void 0 ? "" : `${t("chairLabel")}\uFF1A${chairMember.label}`;
                })()
              )
            ),
            h2(
              "div",
              { className: "mad-finalBody" },
              runs.synthesis.state === "failed" ? h2("div", { className: "mad-cardError" }, runs.synthesis.error ?? t("failed")) : runs.synthesis.text === "" ? runs.synthesis.state === "running" ? h2(Thinking) : h2("span", { className: "mad-hint" }, "\u2014") : h2(StreamingText, { text: runs.synthesis.text, streaming: runs.synthesis.state === "running" })
            )
          ) : null
        )
      )
    )
  );
}

// src/client/styles.js
var STYLES = `
.mad-root {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  container-type: inline-size;
  container-name: mad;
}
.mad-root *, .mad-root *::before, .mad-root *::after { box-sizing: border-box; }

.mad-header {
  flex: none;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 20px;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base);
}
.mad-mark {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  flex: none;
  border-radius: 10px;
  color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);
}
.mad-headCopy { min-width: 0; }
.mad-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: .01em;
}
.mad-title small {
  font-size: 11px;
  font-weight: 500;
  color: var(--dsw-alias-label-secondary);
  letter-spacing: .04em;
}
.mad-sub {
  margin: 2px 0 0;
  font-size: 12px;
  line-height: 1.4;
  color: var(--dsw-alias-label-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mad-spacer { flex: 1 1 auto; }

.mad-btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 8px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  transition: background .15s ease, border-color .15s ease, opacity .15s ease;
}
.mad-btn:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-2); }
.mad-btn:disabled { opacity: .5; cursor: not-allowed; }
.mad-btn.primary {
  border-color: transparent;
  background: var(--dsw-alias-brand-primary);
  color: #fff;
}
.mad-btn.primary:hover:not(:disabled) { filter: brightness(1.06); background: var(--dsw-alias-brand-primary); }
.mad-btn.danger {
  border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 40%, transparent);
  color: var(--dsw-alias-state-error-primary);
  background: transparent;
}
.mad-btn.tiny { height: 24px; padding: 0 8px; font-size: 11.5px; }
.mad-btn.ghost { border-color: transparent; background: transparent; color: var(--dsw-alias-label-secondary); }
.mad-btn.ghost:hover:not(:disabled) { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }

.mad-scroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 18px 20px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.mad-scroll::-webkit-scrollbar { width: 10px; }
.mad-scroll::-webkit-scrollbar-thumb {
  border: 3px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;
  background-color: var(--dsw-alias-border-l1);
}

/* ---------- \u8BBE\u5B9A\u533A ---------- */
.mad-setup {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 14px;
  background: var(--dsw-alias-bg-layer-1);
}
.mad-field { display: flex; flex-direction: column; gap: 7px; }
.mad-labelRow { display: flex; align-items: baseline; gap: 8px; }
.mad-label {
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: .01em;
}
.mad-hint {
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--dsw-alias-label-secondary);
}
.mad-count {
  margin-left: auto;
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
  color: var(--dsw-alias-label-secondary);
}
.mad-input {
  width: 100%;
  resize: vertical;
  min-height: 96px;
  padding: 10px 12px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 10px;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  line-height: 1.6;
  outline: none;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.mad-input.small { min-height: 40px; height: 40px; resize: none; }
.mad-input:focus {
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, var(--dsw-alias-border-l1));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);
}
.mad-input::placeholder { color: var(--dsw-alias-state-idle-primary); }
.mad-input:disabled { opacity: .6; }

/* ---------- \u6A21\u578B\u9009\u62E9 ---------- */
.mad-models {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 260px;
  overflow: auto;
  padding: 2px;
}
.mad-group { display: flex; flex-direction: column; gap: 6px; }
.mad-groupName {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--dsw-alias-label-secondary);
}
.mad-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.mad-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  padding: 5px 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 999px;
  background: var(--dsw-alias-bg-base);
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;
  user-select: none;
  transition: background .15s ease, border-color .15s ease, color .15s ease;
}
.mad-chip:hover { border-color: var(--dsw-alias-border-l2); }
.mad-chip input { position: absolute; opacity: 0; pointer-events: none; }
.mad-chip .mad-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dsw-alias-state-idle-primary);
  flex: none;
  transition: background .15s ease;
}
.mad-chip.on {
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, transparent);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, var(--dsw-alias-bg-base));
  color: var(--dsw-alias-label-primary);
  font-weight: 500;
}
.mad-chip.on .mad-dot { background: var(--dsw-alias-brand-primary); }
.mad-chip .mad-chipName {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 190px;
}
.mad-chip .mad-chipSub {
  font-size: 10.5px;
  color: var(--dsw-alias-label-secondary);
  font-weight: 400;
}
.mad-modelsFoot { display: flex; align-items: center; gap: 8px; }
.mad-emptyNote {
  padding: 10px 12px;
  border: 1px dashed var(--dsw-alias-border-l2);
  border-radius: 10px;
  font-size: 12px;
  line-height: 1.55;
  color: var(--dsw-alias-label-secondary);
}

/* ---------- \u8F6E\u6B21 / \u6C47\u603B\u8005 ---------- */
.mad-controls {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  padding-top: 2px;
  border-top: 1px solid var(--dsw-alias-border-l1);
}
.mad-seg {
  display: flex;
  gap: 4px;
  padding: 3px;
  border-radius: 10px;
  background: var(--dsw-alias-bg-layer-2);
}
.mad-seg button {
  flex: 1 1 0;
  min-width: 0;
  height: 30px;
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background .15s ease, color .15s ease;
}
.mad-seg button:hover:not(:disabled) { color: var(--dsw-alias-label-primary); }
.mad-seg button[aria-pressed="true"] {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, .08);
}
.mad-seg button:disabled { cursor: not-allowed; opacity: .6; }

.mad-select {
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 8px;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12.5px;
  outline: none;
  max-width: 100%;
}
.mad-select:focus { border-color: var(--dsw-alias-brand-primary); }

.mad-submitRow {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.mad-error {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 9px 12px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 35%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent);
  color: var(--dsw-alias-state-error-primary);
  font-size: 12px;
  line-height: 1.5;
}

/* ---------- \u8FD0\u884C\u4E2D\u7684\u8BBE\u5B9A\u6982\u8981 ---------- */
.mad-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1);
  min-width: 0;
}
.mad-summaryLabel {
  flex: none;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--dsw-alias-label-secondary);
}
.mad-summaryText {
  flex: 1 1 auto;
  min-width: 0;
  font-size: 12.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mad-summaryMeta {
  flex: 0 1 auto;
  max-width: 46%;
  font-size: 11.5px;
  color: var(--dsw-alias-label-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ---------- \u7ED3\u679C\u533A ---------- */
.mad-results { display: flex; flex-direction: column; gap: 14px; }
.mad-phase { display: flex; flex-direction: column; gap: 10px; }
.mad-phaseHead {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.mad-phaseTitle {
  margin: 0;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: .01em;
}
.mad-phaseHint { font-size: 11.5px; color: var(--dsw-alias-label-secondary); }
.mad-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(268px, 1fr));
  gap: 10px;
}
.mad-card {
  display: flex;
  flex-direction: column;
  min-height: 120px;
  max-height: 380px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1);
  overflow: hidden;
}
.mad-card.running { border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 45%, var(--dsw-alias-border-l1)); }
.mad-card.failed { border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 40%, transparent); }
.mad-cardHead {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 11px;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-2);
}
.mad-cardName {
  font-size: 12px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mad-cardProvider {
  font-size: 10.5px;
  color: var(--dsw-alias-label-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 40%;
}
.mad-cardMeta {
  margin-left: auto;
  font-size: 10.5px;
  font-variant-numeric: tabular-nums;
  color: var(--dsw-alias-label-secondary);
  white-space: nowrap;
}
.mad-dotS {
  width: 6px;
  height: 6px;
  flex: none;
  border-radius: 50%;
  background: var(--dsw-alias-state-idle-primary);
}
.mad-dotS.running { background: var(--dsw-alias-brand-primary); animation: mad-pulse 1.1s ease-in-out infinite; }
.mad-dotS.done { background: var(--dsw-alias-state-success-primary); }
.mad-dotS.failed { background: var(--dsw-alias-state-error-primary); }
@keyframes mad-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: .35; transform: scale(.82); }
}
.mad-cardBody {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 11px 12px 13px;
  font-size: 12.5px;
  line-height: 1.66;
}
.mad-cardBody::-webkit-scrollbar { width: 8px; }
.mad-cardBody::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 6px;
  background-clip: padding-box;
  background-color: var(--dsw-alias-border-l1);
}
.mad-cardError {
  color: var(--dsw-alias-state-error-primary);
  font-size: 12px;
  line-height: 1.55;
  word-break: break-word;
}
.mad-thinking {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}
.mad-thinking i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  animation: mad-bounce 1s ease-in-out infinite;
}
.mad-thinking i:nth-child(2) { animation-delay: .15s; }
.mad-thinking i:nth-child(3) { animation-delay: .3s; }
@keyframes mad-bounce {
  0%, 100% { opacity: .25; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-3px); }
}
.mad-caret {
  display: inline-block;
  width: 6px;
  height: 13px;
  margin-left: 2px;
  vertical-align: -2px;
  border-radius: 1px;
  background: var(--dsw-alias-brand-primary);
  animation: mad-caret 1s steps(2, start) infinite;
}
@keyframes mad-caret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

.mad-final {
  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 35%, var(--dsw-alias-border-l1));
  border-radius: 14px;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--dsw-alias-brand-primary) 6%, var(--dsw-alias-bg-layer-1)), var(--dsw-alias-bg-layer-1));
  overflow: hidden;
}
.mad-finalHead {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 14px;
  border-bottom: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, var(--dsw-alias-border-l1));
}
.mad-finalTitle { font-size: 12.5px; font-weight: 600; }
.mad-finalBody {
  padding: 14px 16px 18px;
  font-size: 13px;
  line-height: 1.72;
  max-height: 620px;
  overflow: auto;
}
.mad-finalBody::-webkit-scrollbar { width: 8px; }
.mad-finalBody::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 6px;
  background-clip: padding-box;
  background-color: var(--dsw-alias-border-l1);
}

/* ---------- Markdown ---------- */
.mad-md > *:first-child { margin-top: 0; }
.mad-md > *:last-child { margin-bottom: 0; }
.mad-md p { margin: 0 0 .68em; }
.mad-md .mad-h {
  margin: 1.1em 0 .5em;
  font-weight: 600;
  line-height: 1.35;
}
.mad-md .mad-h1 { font-size: 15px; }
.mad-md .mad-h2 { font-size: 14px; }
.mad-md .mad-h3 { font-size: 13px; }
.mad-md .mad-h4 { font-size: 12.5px; color: var(--dsw-alias-label-secondary); }
.mad-md .mad-list { margin: 0 0 .7em; padding-left: 1.25em; }
.mad-md .mad-list li { margin: .2em 0; }
.mad-md .mad-quote {
  margin: 0 0 .7em;
  padding: 2px 0 2px 11px;
  border-left: 2px solid var(--dsw-alias-border-l2);
  color: var(--dsw-alias-label-secondary);
}
.mad-md .mad-hr {
  margin: 1em 0;
  border: 0;
  border-top: 1px solid var(--dsw-alias-border-l1);
}
.mad-md .mad-code {
  padding: 1px 5px;
  border-radius: 5px;
  background: var(--dsw-alias-bg-layer-2);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: .92em;
}
.mad-md .mad-pre {
  margin: 0 0 .8em;
  padding: 10px 12px;
  overflow: auto;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 9px;
  background: var(--dsw-alias-bg-base);
}
.mad-md .mad-pre .mad-code {
  padding: 0;
  background: transparent;
  font-size: 11.8px;
  line-height: 1.6;
  white-space: pre;
}
.mad-md .mad-codeWrap { margin: 0 0 .8em; }
.mad-md .mad-codeWrap .mad-pre { margin: 0; border-top-left-radius: 0; border-top-right-radius: 0; }
.mad-md .mad-codeLang {
  padding: 4px 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-bottom: 0;
  border-radius: 9px 9px 0 0;
  background: var(--dsw-alias-bg-layer-2);
  font-size: 10.5px;
  letter-spacing: .04em;
  text-transform: uppercase;
  color: var(--dsw-alias-label-secondary);
}
.mad-md a { color: var(--dsw-alias-brand-primary); text-decoration: none; }
.mad-md a:hover { text-decoration: underline; }

/* ---------- \u7A7A\u72B6\u6001 ---------- */
.mad-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 38px 20px 44px;
  text-align: center;
}
.mad-emptyArt {
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  margin-bottom: 4px;
  border-radius: 18px;
  color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent);
}
.mad-emptyTitle { font-size: 14px; font-weight: 600; }
.mad-emptyBody {
  max-width: 460px;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--dsw-alias-label-secondary);
}
.mad-steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 6px;
}
.mad-step {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 11px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 999px;
  background: var(--dsw-alias-bg-layer-1);
  font-size: 11.5px;
  color: var(--dsw-alias-label-secondary);
}
.mad-step b {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent);
  color: var(--dsw-alias-brand-primary);
  font-size: 10px;
  font-weight: 700;
}

.mad-statusBar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 9px 12px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 10px;
  background: var(--dsw-alias-bg-layer-1);
  font-size: 12px;
  color: var(--dsw-alias-label-secondary);
}
.mad-statusBar strong { color: var(--dsw-alias-label-primary); font-weight: 600; }

@container mad (max-width: 720px) {
  .mad-scroll { padding: 14px 14px 24px; }
  .mad-header { padding: 11px 14px; }
  .mad-grid { grid-template-columns: 1fr; }
  .mad-title small { display: none; }
}
/* ---------- \u8F93\u5165\u6846\u5185\u7684\u5FEB\u6377\u5165\u53E3\uFF08\u4E0D\u5728 .mad-root \u5185\u90E8\uFF09 ---------- */
.mad-composerBtn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 24px;
  padding: 0 9px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 999px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 11.5px;
  cursor: pointer;
  transition: color .15s ease, border-color .15s ease, background-color .15s ease;
}
.mad-composerBtn:hover {
  color: var(--dsw-alias-label-primary);
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 38%, var(--dsw-alias-border-l1));
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 7%, var(--dsw-alias-bg-layer-2));
}
.mad-composerBtn svg { flex: none; }
`;

// src/client/index.jsx
var import_jsx_runtime = require("react/jsx-runtime");
var PLUGIN_ID = "dsh-multi-ai-discussion";
var PANEL_ID = "multi-ai-discussion";
var STYLE_ID = `${PLUGIN_ID}/styles`;
var stylesInstalled = false;
function installStyles() {
  if (stylesInstalled || typeof document === "undefined") return;
  const existing = document.querySelector(`style[data-plugin-css="${STYLE_ID}"]`);
  if (existing !== null) {
    stylesInstalled = true;
    return;
  }
  const tag = document.createElement("style");
  tag.dataset.plugin = PLUGIN_ID;
  tag.dataset.pluginCss = STYLE_ID;
  tag.textContent = STYLES;
  document.head.appendChild(tag);
  stylesInstalled = true;
}
var appCtx = null;
function openPanel() {
  try {
    appCtx?.get("layout")?.selectPanel(PANEL_ID);
  } catch (error) {
    console.warn("[multi-ai-discussion] \u65E0\u6CD5\u6253\u5F00\u9762\u677F", error);
  }
}
function ComposerButton({ t }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      type: "button",
      className: "mad-composerBtn",
      title: t("subtitle"),
      onClick: openPanel,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelIcon, { size: 13 }),
        t("nav")
      ]
    }
  );
}
var name = "multi-ai-discussion";
var inject = ["slots", "locale"];
function apply(ctx) {
  appCtx = ctx;
  installStyles();
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "multi-ai-discussion: dictionaries");
  ctx.slots.inject("main", () => ctx.slots.register({
    name: "main",
    key: PANEL_ID,
    locale: NS
  }, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiAiPanel, { ctx, initialQuestion: props?.question })));
  ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
    name: "sidebar.panellist",
    id: PANEL_ID,
    order: 68,
    label: () => ctx.locale.bind(NS)("nav"),
    locale: NS
  }, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelIcon, { size: props.size ?? 18, active: props.active === true })));
  ctx.slots.inject("conversation.input.left", () => ctx.slots.register({
    name: "conversation.input.left",
    id: PANEL_ID,
    order: 44,
    label: () => ctx.locale.bind(NS)("nav"),
    locale: NS
  }, ComposerButton));
}

    return module.exports;
  },
});
