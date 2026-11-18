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
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
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
  PanelIcon: () => PanelIcon,
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var import_react5 = __toESM(require("react"), 1);

// src/client/ComposerBar.jsx
var import_react = __toESM(require("react"), 1);

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
  failed: "\u5931\u8D25",
  emptyTitle: "\u591A\u4E00\u53CC\u773C\u775B\uFF0C\u591A\u4E00\u4E2A\u89D2\u5EA6",
  emptyBody: "\u5355\u4E2A\u6A21\u578B\u5BB9\u6613\u5728\u7EC6\u8282\u4E0A\u60F3\u5F53\u7136\uFF1B\u8BA9\u5B83\u4EEC\u4E92\u76F8\u6311\u9519\uFF0C\u6700\u7EC8\u7ED3\u8BBA\u901A\u5E38\u66F4\u7A33\u3002",
  empty1: "\u5404\u81EA\u72EC\u7ACB\u4F5C\u7B54\uFF0C\u4E92\u4E0D\u5F71\u54CD",
  empty2: "\u533F\u540D\u4E92\u8BC4\uFF0C\u6307\u51FA\u9519\u8BEF\u4E0E\u9057\u6F0F",
  empty3: "\u4E3B\u6301\u4EBA\u5408\u5E76\u5206\u6B67\uFF0C\u4EA7\u51FA\u6700\u7EC8\u65B9\u6848",
  settingsTag: "\u914D\u7F6E",
  settingsSubtitle: "\u8FD9\u91CC\u53EA\u505A\u914D\u7F6E\uFF1A\u9009\u597D\u6A21\u578B\u4E0E\u8F6E\u6B21\uFF0C\u7136\u540E\u5728\u5BF9\u8BDD\u8F93\u5165\u6846\u4E0B\u65B9\u5F00\u59CB\u8BA8\u8BBA",
  howToTitle: "\u600E\u4E48\u7528",
  howTo1: "\u5728\u4E0B\u9762\u7684\u6A21\u578B\u5217\u8868\u91CC\u52FE\u9009 2\u20134 \u4E2A\u53C2\u4E0E\u8BA8\u8BBA\u7684\u6A21\u578B",
  howTo2: "\u56DE\u5230\u4EFB\u610F\u4F1A\u8BDD\uFF0C\u5728\u8F93\u5165\u6846\u91CC\u5199\u4E0B\u8BDD\u9898\u6216\u76EE\u6807",
  howTo3: "\u70B9\u8F93\u5165\u6846\u4E0B\u65B9\u7684\u300C\u591A AI \u8BA8\u8BBA \u2192\u300D\uFF0C\u6210\u5458\u5404\u81EA\u7684\u601D\u8003\u4F1A\u5728\u5BF9\u8BDD\u533A\u91CC\u5206\u680F\u5B9E\u65F6\u8F93\u51FA",
  chairAuto: "\u81EA\u52A8\uFF08\u9009\u7B2C\u4E00\u9879\uFF09",
  "dock.title": "\u591A AI \u8BA8\u8BBA",
  "dock.needTopic": "\u5148\u5728\u8F93\u5165\u6846\u91CC\u5199\u4E0B\u8981\u8BA8\u8BBA\u7684\u8BDD\u9898\u6216\u76EE\u6807",
  "dock.needTwo": "\u81F3\u5C11\u9009 2 \u4E2A\u6A21\u578B\uFF08\u70B9\u5DE6\u4FA7\u6253\u5F00\u8BBE\u7F6E\uFF09",
  "dock.full": "\u6700\u591A\u540C\u65F6\u53C2\u4E0E {max} \u4E2A\u6A21\u578B",
  "dock.settingsHint": "\u66F4\u591A\u8BBE\u7F6E\u89C1\u4FA7\u680F\u300C\u591A AI \u8BA8\u8BBA\u300D",
  "dock.start": "\u5F00\u59CB\u8BA8\u8BBA",
  "dock.startHint": "\u7528\u8F93\u5165\u6846\u91CC\u7684\u8BDD\u9898\u5F00\u59CB",
  "dock.close": "\u5173\u95ED\u7ED3\u679C",
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
  failed: "Failed",
  emptyTitle: "One more pair of eyes",
  emptyBody: "A single model trusts its own assumptions; models that challenge each other are usually more accurate.",
  empty1: "Independent answers, no cross-talk",
  empty2: "Anonymous critique of errors and gaps",
  empty3: "A chair merges the disagreements",
  settingsTag: "settings",
  settingsSubtitle: "Configuration only: pick models and rounds, then start from below the composer",
  howToTitle: "How to use",
  howTo1: "Pick 2\u20134 models below to take part",
  howTo2: "In any conversation, type the topic or goal in the composer",
  howTo3: 'Click "Multi-AI discussion \u2192" below the composer; members stream into columns here',
  chairAuto: "Automatic (first entry)",
  "dock.title": "Multi-AI discussion",
  "dock.needTopic": "Type the topic or goal in the composer first",
  "dock.needTwo": "Pick at least 2 models (open settings on the left)",
  "dock.full": "At most {max} models at once",
  "dock.settingsHint": "More settings under Multi-AI discussion in the sidebar",
  "dock.start": "Discuss",
  "dock.startHint": "Start with the composer text",
  "dock.close": "Close result",
  errorPrefix: "Request failed: ",
  noSelection: "No model selected"
};

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

// src/client/store.js
var SETTINGS_KEY = "dsh-multi-ai-discussion.settings.v1";
var DEFAULT_SETTINGS = {
  models: [],
  rounds: 3,
  chair: null,
  maxMembers: 6
};
function readSettings() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (raw === null) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return { ...DEFAULT_SETTINGS };
    return {
      models: Array.isArray(parsed.models) ? parsed.models.filter((item) => typeof item?.provider === "string" && typeof item?.model === "string") : [],
      rounds: [1, 2, 3].includes(parsed.rounds) ? parsed.rounds : 3,
      chair: typeof parsed.chair === "string" ? parsed.chair : null,
      maxMembers: Number.isInteger(parsed.maxMembers) ? Math.max(2, Math.min(10, parsed.maxMembers)) : 6
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}
var settings = readSettings();
var settingsListeners = /* @__PURE__ */ new Set();
function getSettings() {
  return settings;
}
function subscribeSettings(listener) {
  settingsListeners.add(listener);
  return () => settingsListeners.delete(listener);
}
function updateSettings(patch2) {
  settings = { ...settings, ...patch2 };
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
  }
  for (const listener of settingsListeners) listener();
}
function modelKey(provider, model) {
  return `${provider}::${model}`;
}
function reconcileSelection(catalog) {
  const available = /* @__PURE__ */ new Set();
  for (const provider of catalog?.providers ?? []) {
    for (const model of provider.models) available.add(modelKey(provider.id, model.id));
  }
  const kept = getSettings().models.filter((item) => available.has(modelKey(item.provider, item.model)));
  const next = kept.length > 0 ? kept : (catalog?.selection ?? []).filter((item) => available.has(modelKey(item.provider, item.model)));
  if (next.length > 0) {
    const changed = next.length !== getSettings().models.length || next.some((item, index) => modelKey(item.provider, item.model) !== modelKey(settings.models[index]?.provider, settings.models[index]?.model));
    if (changed) updateSettings({ models: next, chair: next.some((item) => modelKey(item.provider, item.model) === settings.chair) ? settings.chair : null });
  }
  return next;
}
var runs = /* @__PURE__ */ new Map();
var runListeners = /* @__PURE__ */ new Set();
function getRun(sessionId) {
  return runs.get(sessionId) ?? null;
}
function subscribeRuns(listener) {
  runListeners.add(listener);
  return () => runListeners.delete(listener);
}
function publish(sessionId, next) {
  if (next === null) runs.delete(sessionId);
  else runs.set(sessionId, next);
  for (const listener of runListeners) listener();
}
function patch(sessionId, update) {
  const current = runs.get(sessionId);
  if (current === void 0) return;
  publish(sessionId, update(current));
}
var controllers = /* @__PURE__ */ new Map();
function stopDiscussion(sessionId) {
  const controller = controllers.get(sessionId);
  if (controller === void 0) return;
  controller.abort();
  controllers.delete(sessionId);
  patch(sessionId, (run) => ({ ...run, status: "stopped", finished: true, elapsed: Date.now() - run.startedAt }));
}
function clearDiscussion(sessionId) {
  stopDiscussion(sessionId);
  publish(sessionId, null);
}
async function startDiscussion(sessionId, topic) {
  const text = String(topic ?? "").trim();
  if (text === "") return { ok: false, reason: "empty" };
  const chosen = getSettings().models;
  if (chosen.length < 2) return { ok: false, reason: "needTwo" };
  const existing = controllers.get(sessionId);
  if (existing !== void 0) existing.abort();
  const controller = new AbortController();
  controllers.set(sessionId, controller);
  const startedAt = Date.now();
  const chairKey = getSettings().chair;
  publish(sessionId, {
    topic: text,
    status: "running",
    members: chosen.map((item) => ({ provider: item.provider, model: item.model, label: item.model, providerName: item.provider })),
    rounds: getSettings().rounds,
    phaseNow: "answer",
    answers: chosen.map(() => ({ text: "", state: "idle", error: null, chars: 0 })),
    critiques: chosen.map(() => null),
    synthesis: { text: "", state: "idle", error: null, chairs: 0 },
    error: null,
    startedAt,
    elapsed: 0,
    finished: false
  });
  const tick = setInterval(() => {
    patch(sessionId, (run) => run.finished ? run : { ...run, elapsed: Date.now() - startedAt });
  }, 500);
  const memberPatch = (index, next) => patch(sessionId, (run) => ({
    ...run,
    answers: run.answers.map((item, i) => i === index ? { ...item, ...next } : item)
  }));
  try {
    await runDiscussion({
      question: text,
      models: chosen.map((item) => ({ provider: item.provider, model: item.model })),
      rounds: getSettings().rounds,
      chairIndex: Math.max(0, chosen.findIndex((item) => modelKey(item.provider, item.model) === chairKey))
    }, {
      signal: controller.signal,
      onEvent: (event) => {
        switch (event.t) {
          case "phase":
            patch(sessionId, (run) => ({ ...run, phaseNow: event.phase }));
            break;
          case "start":
            if (event.phase === "answer") memberPatch(event.index, { state: "running" });
            else if (event.phase === "critique") patch(sessionId, (run) => ({
              ...run,
              critiques: run.critiques.map((item, i) => i === event.index ? { state: "running", text: "", chars: 0, error: null } : item)
            }));
            else if (event.phase === "synthesis") patch(sessionId, (run) => ({ ...run, synthesis: { ...run.synthesis, state: "running" } }));
            break;
          case "delta":
            if (event.phase === "answer") patch(sessionId, (run) => ({
              ...run,
              answers: run.answers.map((item, i) => i === event.index ? { ...item, text: item.text + event.text, chars: item.text.length + event.text.length } : item)
            }));
            else if (event.phase === "critique") patch(sessionId, (run) => ({
              ...run,
              critiques: run.critiques.map((item, i) => i === event.index ? { ...item ?? { state: "running", chars: 0, text: "" }, text: (item?.text ?? "") + event.text, chars: (item?.text ?? "").length + event.text.length } : item)
            }));
            else if (event.phase === "synthesis") patch(sessionId, (run) => ({
              ...run,
              synthesis: { ...run.synthesis, text: run.synthesis.text + event.text }
            }));
            break;
          case "end":
            if (event.phase === "answer") memberPatch(event.index, { state: "done", chars: event.chars ?? 0 });
            else if (event.phase === "critique") patch(sessionId, (run) => ({
              ...run,
              critiques: run.critiques.map((item, i) => i === event.index ? { ...item ?? {}, state: "done", chars: event.chars ?? 0 } : item)
            }));
            else if (event.phase === "synthesis") patch(sessionId, (run) => ({ ...run, synthesis: { ...run.synthesis, state: "done" } }));
            break;
          case "fail":
            if (event.phase === "answer") memberPatch(event.index, { state: "failed", error: event.message ?? "failed" });
            else if (event.phase === "critique") patch(sessionId, (run) => ({
              ...run,
              critiques: run.critiques.map((item, i) => i === event.index ? { ...item ?? {}, state: "failed", error: event.message ?? "failed" } : item)
            }));
            else if (event.phase === "synthesis") patch(sessionId, (run) => ({ ...run, synthesis: { ...run.synthesis, state: "failed", error: event.message ?? "failed" } }));
            else patch(sessionId, (run) => ({ ...run, error: event.message ?? "failed" }));
            break;
          case "done":
            patch(sessionId, (run) => ({ ...run, status: "done", finished: true, elapsed: Date.now() - startedAt }));
            break;
          default:
            break;
        }
      }
    });
    patch(sessionId, (run) => ({ ...run, finished: true, status: run.status === "stopped" ? "stopped" : "done", elapsed: Date.now() - startedAt }));
    return { ok: true };
  } catch (error) {
    if (controller.signal.aborted) {
      patch(sessionId, (run) => ({ ...run, status: "stopped", finished: true }));
      return { ok: false, reason: "stopped" };
    }
    patch(sessionId, (run) => ({
      ...run,
      status: "error",
      finished: true,
      error: error instanceof Error ? error.message : String(error)
    }));
    return { ok: false, reason: "failed", error };
  } finally {
    clearInterval(tick);
    if (controllers.get(sessionId) === controller) controllers.delete(sessionId);
  }
}
var catalogState = { status: "idle", data: null, error: null };
var catalogListeners = /* @__PURE__ */ new Set();
function getCatalog() {
  return catalogState;
}
function subscribeCatalog(listener) {
  catalogListeners.add(listener);
  return () => catalogListeners.delete(listener);
}
function setCatalog(next) {
  catalogState = next;
  for (const listener of catalogListeners) listener();
}
var catalogInflight = null;
async function loadCatalog(force = false) {
  if (!force && catalogState.status === "ready") return catalogState.data;
  if (catalogInflight !== null) return catalogInflight;
  setCatalog({ status: "loading", data: catalogState.data, error: null });
  catalogInflight = (async () => {
    try {
      const data = await fetchCatalog(force);
      setCatalog({ status: "ready", data, error: null });
      reconcileSelection(data);
      return data;
    } catch (error) {
      setCatalog({ status: "error", data: null, error: error instanceof Error ? error.message : String(error) });
      return null;
    } finally {
      catalogInflight = null;
    }
  })();
  return catalogInflight;
}

// src/client/ComposerBar.jsx
var h = import_react.default.createElement;
function useStoreValue(subscribe, read) {
  return import_react.default.useSyncExternalStore(subscribe, read, read);
}
function ComposerBar(props) {
  const { ctx, sessionId, useInput, inputActions } = props;
  const t = ctx.locale.bind(NS);
  const catalog = useStoreValue(subscribeCatalog, getCatalog);
  const settings2 = useStoreValue(subscribeSettings, getSettings);
  const run = useStoreValue(subscribeRuns, () => getRun(sessionId));
  const draft = useInput((state) => state.draft);
  const [open, setOpen] = import_react.default.useState(false);
  const [hint, setHint] = import_react.default.useState(null);
  const rowRef = import_react.default.useRef(null);
  import_react.default.useEffect(() => {
    loadCatalog(false);
  }, []);
  import_react.default.useEffect(() => {
    if (!open) return void 0;
    const onPointerDown = (event) => {
      if (rowRef.current !== null && !rowRef.current.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
  import_react.default.useEffect(() => {
    if (hint === null) return void 0;
    const timer = setTimeout(() => setHint(null), 3200);
    return () => clearTimeout(timer);
  }, [hint]);
  const providers = catalog.data?.providers ?? [];
  const chosenKeys = new Set(settings2.models.map((item) => modelKey(item.provider, item.model)));
  const running = run !== null && run.status === "running";
  const topic = draft.trim();
  const toggleModel = (provider, model) => {
    const id = modelKey(provider, model);
    const current = settings2.models;
    const exists = current.some((item) => modelKey(item.provider, item.model) === id);
    let next;
    if (exists) {
      if (current.length <= 1) return;
      next = current.filter((item) => modelKey(item.provider, item.model) !== id);
    } else {
      if (current.length >= settings2.maxMembers) {
        setHint(t("dock.full", { max: settings2.maxMembers }));
        return;
      }
      next = [...current, { provider, model }];
    }
    const keepChair = next.some((item) => modelKey(item.provider, item.model) === settings2.chair);
    updateSettings({ models: next, chair: keepChair ? settings2.chair : null });
  };
  const begin = async () => {
    if (running) return;
    if (topic === "") {
      setHint(t("dock.needTopic"));
      return;
    }
    if (settings2.models.length < 2) {
      setHint(t("dock.needTwo"));
      return;
    }
    inputActions.setDraft("");
    const result = await startDiscussion(sessionId, topic);
    if (result.ok !== true) {
      if (result.reason === "needTwo") setHint(t("dock.needTwo"));
      else if (result.reason === "empty") setHint(t("dock.needTopic"));
    }
  };
  return h(
    "div",
    { className: "mad-dock", ref: rowRef },
    h(
      "div",
      { className: "mad-dockRow" },
      h(
        "button",
        {
          type: "button",
          className: `mad-dockToggle${running ? " running" : ""}`,
          onClick: () => setOpen((value) => !value),
          title: t("dock.title"),
          "aria-expanded": open
        },
        h("span", { className: "mad-dockDot" }),
        h("span", null, t("nav")),
        h("span", { className: "mad-dockCount" }, `${settings2.models.length}`),
        h("span", { className: "mad-dockCaret" }, open ? "\u25BE" : "\u25B8")
      ),
      running ? h("button", { type: "button", className: "mad-dockAction stop", onClick: () => stopDiscussion(sessionId) }, `\u25A0 ${t("stop")}`) : h("button", {
        type: "button",
        className: "mad-dockAction",
        onClick: begin,
        disabled: topic === "",
        title: topic === "" ? t("dock.needTopic") : t("dock.startHint")
      }, `${t("dock.start")} \u2192`),
      hint !== null ? h("span", { className: "mad-dockHint" }, hint) : null
    ),
    open ? h(
      "div",
      { className: "mad-dockPanel" },
      h(
        "div",
        { className: "mad-dockPanelHead" },
        h("span", { className: "mad-hint" }, t("modelsHint")),
        h("button", { type: "button", className: "mad-btn tiny ghost", onClick: () => loadCatalog(true) }, t("modelsRetry"))
      ),
      catalog.status === "error" ? h("div", { className: "mad-error" }, `${t("modelsFailed")}\uFF1A${catalog.error}`) : catalog.status === "loading" && providers.length === 0 ? h("div", { className: "mad-hint" }, t("modelsLoading")) : providers.length === 0 ? h("div", { className: "mad-emptyNote" }, t("modelsEmpty")) : h(
        "div",
        { className: "mad-dockGroups" },
        providers.map((provider) => h(
          "div",
          { key: provider.id, className: "mad-group" },
          h("div", { className: "mad-groupName" }, provider.name),
          h(
            "div",
            { className: "mad-chips" },
            provider.models.map((model) => h(
              "label",
              {
                key: model.id,
                className: `mad-chip${chosenKeys.has(modelKey(provider.id, model.id)) ? " on" : ""}`,
                title: `${provider.name} / ${model.name}`
              },
              h("input", {
                type: "checkbox",
                checked: chosenKeys.has(modelKey(provider.id, model.id)),
                onChange: () => toggleModel(provider.id, model.id),
                disabled: running
              }),
              h("span", { className: "mad-dot" }),
              h("span", { className: "mad-chipName" }, model.name)
            ))
          )
        )),
        h(
          "div",
          { className: "mad-dockPanelFoot" },
          h("span", { className: "mad-hint" }, t("roundsLabel")),
          h(
            "div",
            { className: "mad-seg small" },
            [1, 2, 3].map((value) => h("button", {
              key: value,
              type: "button",
              "aria-pressed": settings2.rounds === value,
              disabled: running,
              onClick: () => updateSettings({ rounds: value })
            }, t(`rounds${value}`)))
          ),
          h("span", { className: "mad-spacer" }),
          h("span", { className: "mad-hint" }, t("dock.settingsHint"))
        )
      )
    ) : null
  );
}

// src/client/DiscussionDock.jsx
var import_react3 = __toESM(require("react"), 1);

// src/client/Markdown.jsx
var import_react2 = __toESM(require("react"), 1);
var h2 = import_react2.default.createElement;
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
    const key = `${keyPrefix}-i${index++}`;
    if (token.startsWith("`")) {
      nodes.push(h2("code", { key, className: "mad-code" }, token.slice(1, -1)));
    } else if (token.startsWith("**")) {
      nodes.push(h2("strong", { key }, token.slice(2, -2)));
    } else if (token.startsWith("[")) {
      const split = token.indexOf("](");
      const label = token.slice(1, split);
      const href = token.slice(split + 2, -1);
      const safe = /^https?:\/\//i.test(href) ? href : void 0;
      nodes.push(safe === void 0 ? h2("span", { key }, label) : h2("a", { key, href: safe, target: "_blank", rel: "noreferrer noopener" }, label));
    } else {
      nodes.push(h2("em", { key }, token.slice(1, -1)));
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
  let key = 0;
  const flush = () => {
    if (paragraph.length === 0) return;
    const content = paragraph.join(" ");
    blocks.push(h2("p", { key: `p${key++}` }, inline(content, `p${key}`)));
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
      blocks.push(h2(
        "pre",
        { key: `c${key++}`, className: "mad-pre" },
        h2("code", { className: "mad-code" }, body.join("\n"))
      ));
      if (language !== "") blocks[blocks.length - 1] = h2(
        "div",
        { key: `cw${key++}`, className: "mad-codeWrap" },
        h2("div", { className: "mad-codeLang" }, language),
        blocks[blocks.length - 1]
      );
      continue;
    }
    const heading = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (heading !== null) {
      flush();
      const level = heading[1].length;
      blocks.push(h2(`h${level + 2}`, { key: `h${key++}`, className: `mad-h mad-h${level}` }, inline(heading[2], `h${key}`)));
      continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      flush();
      blocks.push(h2("hr", { key: `hr${key++}`, className: "mad-hr" }));
      continue;
    }
    if (trimmed.startsWith(">")) {
      flush();
      const quote = [trimmed.replace(/^>\s?/, "")];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith(">")) {
        i += 1;
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
      }
      blocks.push(h2("blockquote", { key: `q${key++}`, className: "mad-quote" }, inline(quote.join(" "), `q${key}`)));
      continue;
    }
    if (/^[-*+]\s+/.test(trimmed)) {
      flush();
      const items = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(h2("li", { key: `li${key++}` }, inline(lines[i].trim().replace(/^[-*+]\s+/, ""), `li${key}`)));
        i += 1;
      }
      i -= 1;
      blocks.push(h2("ul", { key: `ul${key++}`, className: "mad-list" }, items));
      continue;
    }
    if (/^\d+[.)]\s+/.test(trimmed)) {
      flush();
      const items = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(h2("li", { key: `li${key++}` }, inline(lines[i].trim().replace(/^\d+[.)]\s+/, ""), `li${key}`)));
        i += 1;
      }
      i -= 1;
      blocks.push(h2("ol", { key: `ol${key++}`, className: "mad-list" }, items));
      continue;
    }
    paragraph.push(trimmed);
  }
  flush();
  return blocks;
}
function Markdown({ text, className }) {
  const blocks = import_react2.default.useMemo(() => renderBlocks(text), [text]);
  return h2("div", { className: className ?? "mad-md" }, blocks);
}

// src/client/DiscussionDock.jsx
var h3 = import_react3.default.createElement;
function useRun(sessionId) {
  return import_react3.default.useSyncExternalStore(
    subscribeRuns,
    () => getRun(sessionId),
    () => null
  );
}
function Thinking() {
  return h3("span", { className: "mad-thinking" }, "\xB7\xB7\xB7", h3("i"), h3("i"), h3("i"));
}
function Caret({ on }) {
  return on ? h3("span", { className: "mad-caret" }) : null;
}
function MemberCard({ member, entry, streaming }) {
  const state = entry?.state ?? "idle";
  const text = entry?.text ?? "";
  return h3(
    "article",
    { className: `mad-discCard ${state}` },
    h3(
      "header",
      { className: "mad-discCardHead" },
      h3("span", { className: `mad-dotS ${state}` }),
      h3("span", { className: "mad-discCardName" }, member.label),
      h3("span", { className: "mad-discCardProvider" }, member.providerName),
      h3("span", { className: "mad-discCardMeta" }, state === "running" ? "" : entry?.chars > 0 ? `${entry.chars}` : "")
    ),
    h3(
      "div",
      { className: "mad-discCardBody" },
      entry?.error ? h3("div", { className: "mad-discCardError" }, entry.error) : text === "" ? state === "running" ? h3(Thinking) : h3("span", { className: "mad-hint" }, "\u2014") : h3(
        import_react3.default.Fragment,
        null,
        h3(Markdown, { text }),
        h3(Caret, { on: streaming && state === "running" })
      )
    )
  );
}
function DiscussionDock({ ctx, sessionId }) {
  const t = ctx.locale.bind(NS);
  const run = useRun(sessionId);
  const [collapsed, setCollapsed] = import_react3.default.useState(false);
  const scroller = import_react3.default.useRef(null);
  import_react3.default.useEffect(() => {
    if (run !== null && run.status === "running") setCollapsed(false);
  }, [run?.startedAt]);
  import_react3.default.useEffect(() => {
    if (run === null || run.status !== "running" || collapsed || scroller.current === null) return;
    const element = scroller.current;
    if (element.scrollHeight - element.scrollTop - element.clientHeight < 160) element.scrollTop = element.scrollHeight;
  }, [run, collapsed]);
  if (run === null) return null;
  const rounds = run.rounds ?? 3;
  const running = run.status === "running";
  return h3(
    "div",
    { className: `mad-inline${collapsed ? " collapsed" : ""}` },
    h3(
      "header",
      { className: "mad-inlineHead" },
      h3("span", { className: `mad-dotS ${running ? "running" : run.status === "error" ? "failed" : "done"}` }),
      h3("span", { className: "mad-inlineTitle" }, t("title")),
      h3("span", { className: "mad-inlineTopic" }, run.topic),
      h3("span", { className: "mad-spacer" }),
      h3(
        "span",
        { className: "mad-inlineMeta" },
        `${run.members.length} ${t("expert")} \xB7 ${Math.max(0, Math.round((run.elapsed ?? 0) / 1e3))}s`
      ),
      running ? h3("button", { type: "button", className: "mad-btn tiny danger", onClick: () => stopDiscussion(sessionId) }, `\u25A0 ${t("stop")}`) : h3("button", {
        type: "button",
        className: "mad-btn tiny ghost",
        onClick: () => {
          clearDiscussion(sessionId);
          startDiscussion(sessionId, run.topic);
        }
      }, `\u21BB ${t("restart")}`),
      h3("button", {
        type: "button",
        className: "mad-btn tiny ghost",
        onClick: () => setCollapsed((value) => !value),
        "aria-expanded": !collapsed
      }, collapsed ? "\u25B8" : "\u25BE"),
      h3("button", {
        type: "button",
        className: "mad-btn tiny ghost",
        onClick: () => clearDiscussion(sessionId),
        title: t("dock.close")
      }, "\u2715")
    ),
    collapsed ? null : h3(
      "div",
      { className: "mad-inlineScroll", ref: scroller },
      h3(
        "div",
        { className: "mad-inlinePhase" },
        h3("span", { className: "mad-inlinePhaseLabel" }, t("phaseAnswer")),
        h3(
          "div",
          { className: "mad-discGrid" },
          run.members.map((member, index) => h3(MemberCard, {
            key: `${member.provider}/${member.model}`,
            member,
            entry: run.answers[index],
            streaming: running
          }))
        )
      ),
      rounds >= 2 ? h3(
        "div",
        { className: "mad-inlinePhase" },
        h3("span", { className: "mad-inlinePhaseLabel" }, t("phaseCritique")),
        h3(
          "div",
          { className: "mad-discGrid" },
          run.members.map((member, index) => h3(MemberCard, {
            key: `${member.provider}/${member.model}`,
            member,
            entry: run.critiques[index] ?? { state: run.answers[index]?.state === "failed" ? "failed" : "idle", text: "", chars: 0 },
            streaming: running
          }))
        )
      ) : null,
      rounds >= 3 ? h3(
        "div",
        { className: "mad-inlinePhase" },
        h3("span", { className: "mad-inlinePhaseLabel" }, t("phaseSynthesis")),
        h3(
          "div",
          { className: "mad-inlineFinal" },
          run.synthesis.error ? h3("div", { className: "mad-discCardError" }, run.synthesis.error) : run.synthesis.text === "" ? run.synthesis.state === "running" ? h3(Thinking) : h3("span", { className: "mad-hint" }, "\u2014") : h3(
            import_react3.default.Fragment,
            null,
            h3(Markdown, { text: run.synthesis.text }),
            h3(Caret, { on: running && run.synthesis.state === "running" })
          )
        )
      ) : null,
      run.error !== null ? h3("div", { className: "mad-error" }, `${t("errorPrefix")}${run.error}`) : null
    )
  );
}

// src/client/SettingsPanel.jsx
var import_react4 = __toESM(require("react"), 1);
var h4 = import_react4.default.createElement;
function useStoreValue2(subscribe, read) {
  return import_react4.default.useSyncExternalStore(subscribe, read, read);
}
var ROUNDS = [1, 2, 3];
function SettingsPanel({ ctx }) {
  const t = ctx.locale.bind(NS);
  const catalog = useStoreValue2(subscribeCatalog, getCatalog);
  const settings2 = useStoreValue2(subscribeSettings, getSettings);
  const [, bumpLocale] = import_react4.default.useState(0);
  import_react4.default.useEffect(() => {
    loadCatalog(false);
  }, []);
  import_react4.default.useEffect(() => ctx.locale.subscribe(() => bumpLocale((value) => value + 1)), [ctx]);
  const goBack = import_react4.default.useCallback(() => {
    try {
      ctx.get("layout")?.selectPanel(null);
    } catch (error) {
      console.warn("[multi-ai-discussion] \u65E0\u6CD5\u8FD4\u56DE\u4F1A\u8BDD", error);
    }
  }, [ctx]);
  import_react4.default.useEffect(() => {
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
  const providers = catalog.data?.providers ?? [];
  const chosenKeys = new Set(settings2.models.map((item) => modelKey(item.provider, item.model)));
  const toggleModel = (provider, model) => {
    const id = modelKey(provider, model);
    const current = settings2.models;
    if (chosenKeys.has(id)) {
      if (current.length <= 1) return;
      const next = current.filter((item) => modelKey(item.provider, item.model) !== id);
      const keepChair = next.some((item) => modelKey(item.provider, item.model) === settings2.chair);
      updateSettings({ models: next, chair: keepChair ? settings2.chair : null });
      return;
    }
    if (current.length >= settings2.maxMembers) return;
    updateSettings({ models: [...current, { provider, model }] });
  };
  return h4(
    "div",
    { className: "mad-root" },
    h4(
      "header",
      { className: "mad-header" },
      h4("div", { className: "mad-mark" }, h4(
        "svg",
        { width: 19, height: 19, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
        h4("circle", { cx: 7.2, cy: 8.6, r: 2.7, stroke: "currentColor", strokeWidth: 1.6 }),
        h4("circle", { cx: 16.8, cy: 8.6, r: 2.7, stroke: "currentColor", strokeWidth: 1.6 }),
        h4("path", { d: "M3.4 18.6c.7-2.9 3-4.6 5.7-4.6s5 1.7 5.7 4.6", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" })
      )),
      h4(
        "div",
        { className: "mad-headCopy" },
        h4("h1", { className: "mad-title" }, t("title"), h4("small", null, t("settingsTag"))),
        h4("p", { className: "mad-sub" }, t("settingsSubtitle"))
      ),
      h4("span", { className: "mad-spacer" }),
      h4("button", { type: "button", className: "mad-btn ghost", onClick: goBack, title: t("backHint") }, `\u2190 ${t("back")}`)
    ),
    h4(
      "div",
      { className: "mad-scroll" },
      h4(
        "div",
        { className: "mad-setup" },
        h4(
          "div",
          { className: "mad-field" },
          h4(
            "div",
            { className: "mad-labelRow" },
            h4("span", { className: "mad-label" }, t("modelsLabel")),
            h4("span", { className: "mad-hint" }, t("modelsHint")),
            h4("span", { className: "mad-count" }, `${settings2.models.length} / ${settings2.maxMembers}`)
          ),
          catalog.status === "error" ? h4(
            "div",
            { className: "mad-error" },
            h4("span", { style: { flex: "1 1 auto" } }, `${t("modelsFailed")}\uFF1A${catalog.error}`),
            h4("button", { type: "button", className: "mad-btn tiny", onClick: () => loadCatalog(true) }, t("modelsRetry"))
          ) : catalog.status === "loading" && providers.length === 0 ? h4("div", { className: "mad-hint" }, t("modelsLoading")) : providers.length === 0 ? h4("div", { className: "mad-emptyNote" }, t("modelsEmpty")) : h4(
            "div",
            { className: "mad-models" },
            providers.map((provider) => h4(
              "div",
              { key: provider.id, className: "mad-group" },
              h4("div", { className: "mad-groupName" }, provider.name),
              h4(
                "div",
                { className: "mad-chips" },
                provider.models.map((model) => {
                  const on = chosenKeys.has(modelKey(provider.id, model.id));
                  return h4(
                    "label",
                    {
                      key: model.id,
                      className: `mad-chip${on ? " on" : ""}`,
                      title: `${provider.name} / ${model.name}`
                    },
                    h4("input", { type: "checkbox", checked: on, onChange: () => toggleModel(provider.id, model.id) }),
                    h4("span", { className: "mad-dot" }),
                    h4("span", { className: "mad-chipName" }, model.name)
                  );
                })
              )
            ))
          )
        ),
        h4(
          "div",
          { className: "mad-controls" },
          h4(
            "div",
            { className: "mad-field" },
            h4("div", { className: "mad-labelRow" }, h4("span", { className: "mad-label" }, t("roundsLabel"))),
            h4(
              "div",
              { className: "mad-seg" },
              ROUNDS.map((value) => h4("button", {
                key: value,
                type: "button",
                "aria-pressed": settings2.rounds === value,
                onClick: () => updateSettings({ rounds: value })
              }, t(`rounds${value}`)))
            ),
            h4("div", { className: "mad-hint" }, t(`roundsHint${settings2.rounds}`))
          ),
          settings2.rounds >= 3 ? h4(
            "div",
            { className: "mad-field" },
            h4(
              "div",
              { className: "mad-labelRow" },
              h4("span", { className: "mad-label" }, t("chairLabel")),
              h4("span", { className: "mad-hint" }, t("chairHint"))
            ),
            settings2.models.length === 0 ? h4("div", { className: "mad-hint" }, t("noSelection")) : h4(
              "select",
              {
                className: "mad-select",
                value: settings2.chair ?? "",
                onChange: (event) => updateSettings({ chair: event.target.value === "" ? null : event.target.value })
              },
              h4("option", { value: "" }, t("chairAuto")),
              settings2.models.map((item) => h4("option", {
                key: modelKey(item.provider, item.model),
                value: modelKey(item.provider, item.model)
              }, `${item.model} \xB7 ${item.provider}`))
            )
          ) : null
        )
      ),
      h4(
        "div",
        { className: "mad-howTo" },
        h4("div", { className: "mad-howToTitle" }, t("howToTitle")),
        h4(
          "ol",
          { className: "mad-howToList" },
          h4("li", null, t("howTo1")),
          h4("li", null, t("howTo2")),
          h4("li", null, t("howTo3"))
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

/* ---------- \u8F93\u5165\u6846\u4E0B\u65B9\u63A7\u5236\u6761\uFF08\u4F1A\u8BDD composer.dock\uFF09 ---------- */
.mad-dock {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 6px;
  font-size: 12px;
  color: var(--dsw-alias-label-secondary);
}
.mad-dockRow {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.mad-dockToggle {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 999px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 11.5px;
  cursor: pointer;
  transition: color .15s ease, border-color .15s ease, background-color .15s ease;
}
.mad-dockToggle:hover { color: var(--dsw-alias-label-primary); border-color: var(--dsw-alias-border-l2); }
.mad-dockToggle.running {
  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 45%, transparent);
  color: var(--dsw-alias-label-primary);
}
.mad-dockDot {
  width: 6px;
  height: 6px;
  flex: none;
  border-radius: 50%;
  background: var(--dsw-alias-state-idle-primary);
}
.mad-dockToggle.running .mad-dockDot {
  background: var(--dsw-alias-brand-primary);
  animation: mad-pulse 1.1s ease-in-out infinite;
}
.mad-dockCount {
  min-width: 14px;
  padding: 0 4px;
  border-radius: 5px;
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);
  color: var(--dsw-alias-brand-primary);
  font-size: 10.5px;
  font-variant-numeric: tabular-nums;
  text-align: center;
}
.mad-dockToggle.running .mad-dockCount {
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent);
}
.mad-dockCaret { font-size: 9px; opacity: .7; }
.mad-dockAction {
  appearance: none;
  height: 26px;
  padding: 0 11px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 40%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent);
  color: var(--dsw-alias-brand-primary);
  font: inherit;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .15s ease, opacity .15s ease;
}
.mad-dockAction:hover:not(:disabled) { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 16%, transparent); }
.mad-dockAction:disabled { opacity: .45; cursor: not-allowed; }
.mad-dockAction.stop {
  border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 40%, transparent);
  background: transparent;
  color: var(--dsw-alias-state-error-primary);
}
.mad-dockHint {
  font-size: 11px;
  color: var(--dsw-alias-state-warn-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mad-dockPanel {
  margin-top: 8px;
  padding: 12px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, .12);
  max-height: 320px;
  overflow: auto;
}
.mad-dockPanelHead {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.mad-dockGroups { display: flex; flex-direction: column; gap: 10px; }
.mad-dockPanelFoot {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--dsw-alias-border-l1);
}
.mad-seg.small { padding: 2px; }
.mad-seg.small button { height: 24px; font-size: 11px; padding: 0 9px; flex: 0 0 auto; }

/* ---------- \u5BF9\u8BDD\u754C\u9762\u91CC\u7684\u5206\u680F\u8BA8\u8BBA\u9762\u677F\uFF08\u8F93\u5165\u6846\u6B63\u4E0A\u65B9\uFF09 ---------- */
.mad-inline {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1);
  overflow: hidden;
}
.mad-inlineHead {
  flex: none;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  min-width: 0;
  background: var(--dsw-alias-bg-layer-2);
}
.mad-inlineTitle {
  flex: none;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--dsw-alias-label-primary);
}
.mad-inlineTopic {
  min-width: 0;
  font-size: 11.5px;
  color: var(--dsw-alias-label-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mad-inlineMeta {
  flex: none;
  font-size: 10.5px;
  font-variant-numeric: tabular-nums;
  color: var(--dsw-alias-label-secondary);
}
.mad-inlineScroll {
  max-height: min(46vh, 440px);
  overflow: auto;
  padding: 10px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.mad-inlineScroll::-webkit-scrollbar { width: 9px; }
.mad-inlineScroll::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;
  background-color: var(--dsw-alias-border-l1);
}
.mad-inlinePhase { display: flex; flex-direction: column; gap: 7px; }
.mad-inlinePhaseLabel {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: .05em;
  text-transform: uppercase;
  color: var(--dsw-alias-label-secondary);
}
.mad-inlineFinal {
  padding: 10px 12px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 32%, var(--dsw-alias-border-l1));
  border-radius: 10px;
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 5%, var(--dsw-alias-bg-base));
  font-size: 12.5px;
  line-height: 1.68;
}

/* ---------- \u5BF9\u8BDD\u533A\u7684\u8BA8\u8BBA\u89C6\u56FE ---------- */
.mad-discRoot {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-base);
}
.mad-discHead {
  flex: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
}
.mad-discMark {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  flex: none;
  border-radius: 9px;
  color: var(--dsw-alias-brand-primary);
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);
}
.mad-discCopy { min-width: 0; }
.mad-discTitleRow { display: flex; align-items: center; gap: 7px; }
.mad-discTitle {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .01em;
}
.mad-discBadge {
  padding: 0 5px;
  border-radius: 5px;
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);
  color: var(--dsw-alias-brand-primary);
  font-size: 10.5px;
  font-variant-numeric: tabular-nums;
}
.mad-discTopic {
  margin: 2px 0 0;
  max-width: 620px;
  font-size: 11.5px;
  line-height: 1.45;
  color: var(--dsw-alias-label-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mad-discTimer {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  color: var(--dsw-alias-label-secondary);
}
.mad-discActions { display: inline-flex; gap: 6px; }
.mad-discScroll {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 16px 20px 26px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.mad-discScroll::-webkit-scrollbar { width: 10px; }
.mad-discScroll::-webkit-scrollbar-thumb {
  border: 3px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;
  background-color: var(--dsw-alias-border-l1);
}
.mad-discEmpty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 48px 20px;
  text-align: center;
}
.mad-discPhase { display: flex; flex-direction: column; gap: 9px; }
.mad-discPhaseHead { display: flex; align-items: baseline; gap: 9px; flex-wrap: wrap; }
.mad-discPhaseTitle { font-size: 12px; font-weight: 600; letter-spacing: .01em; }
.mad-discGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 9px;
  align-items: start;
}
.mad-discCard {
  display: flex;
  flex-direction: column;
  min-height: 96px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1);
  overflow: hidden;
}
.mad-discCard.running { border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 45%, var(--dsw-alias-border-l1)); }
.mad-discCard.failed { border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 40%, transparent); }
.mad-discCardHead {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 11px;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-2);
}
.mad-discCardName {
  font-size: 12px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mad-discCardProvider {
  font-size: 10.5px;
  color: var(--dsw-alias-label-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 38%;
}
.mad-discCardMeta {
  margin-left: auto;
  font-size: 10.5px;
  font-variant-numeric: tabular-nums;
  color: var(--dsw-alias-label-secondary);
}
.mad-discCardBody {
  flex: 1 1 auto;
  padding: 11px 12px 13px;
  font-size: 12.5px;
  line-height: 1.66;
  max-height: 260px;
  overflow: auto;
}
.mad-discCardBody::-webkit-scrollbar { width: 8px; }
.mad-discCardBody::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 6px;
  background-clip: padding-box;
  background-color: var(--dsw-alias-border-l1);
}
.mad-discCardError { color: var(--dsw-alias-state-error-primary); font-size: 12px; line-height: 1.55; word-break: break-word; }
.mad-discFinal {
  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 35%, var(--dsw-alias-border-l1));
  border-radius: 14px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--dsw-alias-brand-primary) 6%, var(--dsw-alias-bg-layer-1)), var(--dsw-alias-bg-layer-1));
  overflow: hidden;
}
.mad-discFinalHead {
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;
  padding: 11px 14px;
  border-bottom: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, var(--dsw-alias-border-l1));
}
.mad-discFinalBody {
  padding: 14px 16px 18px;
  font-size: 13px;
  line-height: 1.72;
  max-height: 520px;
  overflow: auto;
}
.mad-discFinalBody::-webkit-scrollbar { width: 8px; }
.mad-discFinalBody::-webkit-scrollbar-thumb {
  border: 2px solid transparent;
  border-radius: 6px;
  background-clip: padding-box;
  background-color: var(--dsw-alias-border-l1);
}

/* ---------- \u8BBE\u7F6E\u9875\u7684\u7528\u6CD5\u8BF4\u660E ---------- */
.mad-howTo {
  padding: 13px 15px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1);
}
.mad-howToTitle { font-size: 12.5px; font-weight: 600; margin-bottom: 7px; }
.mad-howToList {
  margin: 0;
  padding-left: 1.35em;
  font-size: 12px;
  line-height: 1.75;
  color: var(--dsw-alias-label-secondary);
}

@container mad (max-width: 760px) {
  .mad-discGrid { grid-template-columns: 1fr; }
  .mad-discScroll { padding: 13px 14px 22px; }
  .mad-discHead { padding: 10px 14px; }
  .mad-discTopic { max-width: 100%; }
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
function PanelIcon({ size = 18 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "7.2", cy: "8.6", r: "2.7", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "16.8", cy: "8.6", r: "2.7", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3.4 18.6c.7-2.9 3-4.6 5.7-4.6s5 1.7 5.7 4.6", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15.2 14.4c2.2.2 4 1.8 4.6 4.2", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", opacity: ".55" })
  ] });
}
var name = "multi-ai-discussion";
var inject = ["slots", "locale"];
function apply(ctx) {
  installStyles();
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "multi-ai-discussion: dictionaries");
  ctx.slots.inject("main", () => ctx.slots.register({
    name: "main",
    key: PANEL_ID,
    locale: NS
  }, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, { ctx, sessionId: props?.sessionId })));
  ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
    name: "sidebar.panellist",
    id: PANEL_ID,
    order: 68,
    label: () => ctx.locale.bind(NS)("nav"),
    locale: NS
  }, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelIcon, { size: props.size ?? 18, active: props.active === true })));
  ctx.slots.inject("conversation.composer.dock", () => ctx.slots.register({
    name: "conversation.composer.dock",
    id: PANEL_ID,
    order: 30,
    label: () => ctx.locale.bind(NS)("dock.title"),
    locale: NS
  }, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComposerBar, { ctx, sessionId: props.sessionId, useInput: props.useInput, inputActions: props.inputActions })));
  ctx.slots.inject("conversation.input.dock", () => ctx.slots.register({
    name: "conversation.input.dock",
    id: PLUGIN_ID,
    order: 40,
    label: () => ctx.locale.bind(NS)("nav"),
    locale: NS
  }, (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscussionDock, { ctx, sessionId: props.sessionId })));
}

    return module.exports;
  },
});
