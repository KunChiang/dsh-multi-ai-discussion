/** 多 AI 讨论 —— 面板样式。只使用 --dsw-alias-* 主题令牌，浅色/深色自动跟随。 */

export const STYLES = `
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

/* ---------- 设定区 ---------- */
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

/* ---------- 模型选择 ---------- */
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

/* ---------- 轮次 / 汇总者 ---------- */
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

/* ---------- 运行中的设定概要 ---------- */
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

/* ---------- 结果区 ---------- */
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

/* ---------- 空状态 ---------- */
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

/* ---------- 输入框下方控制条（会话 composer.dock） ---------- */
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

/* ---------- 对话界面里的分栏讨论面板（输入框正上方） ---------- */
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

/* ---------- 对话区的讨论视图 ---------- */
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

/* ---------- 设置页的用法说明 ---------- */
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

/* ---------- 输入框内的快捷入口（不在 .mad-root 内部） ---------- */
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
`
