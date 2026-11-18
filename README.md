# 多 AI 讨论（dsh-multi-ai-discussion）

让多个大模型围绕**同一个需求或问题**一起干活：先各自独立作答，再匿名互相挑错、修订，
最后由你指定的「汇总者」把分歧合并成唯一一份更完整、更可靠的答案或方案。

这是 DeepSeek Harness 的常驻插件：装一次，所有会话都能用。

**讨论发生在对话界面里**：输入框下方选「多 AI 讨论」，把话题写进输入框，点开始——
每个成员的回答就在输入框正上方分栏实时流式输出。侧栏的「多 AI 讨论」只用来做配置。

## 它解决什么问题

单个模型容易在细节上想当然，也更难自我否定。多模型讨论把三件事分开：

| 轮次 | 做法 | 收益 |
| --- | --- | --- |
| 第一轮 · 独立作答 | 并行问所有选中的模型，彼此不可见 | 拿到真正独立的多个思路，避免互相带偏 |
| 第二轮 · 交叉评审 | 每份答案匿名编号，各模型指错、吸收、重写自己的答案 | 错误和遗漏被第二双眼睛抓出来 |
| 最终 · 汇总 | 汇总者读到全部答案与互评，合并成分歧明确的一份结论 | 输出可直接使用的最终方案，而不是一堆并列观点 |

## 使用

分两个地方：**配置在侧栏，讨论在对话里**。

### 第一次：先配置（侧栏）

点侧栏「多 AI 讨论」，那是一个纯设置页：

1. 勾选 2–4 个参与讨论的模型（列表来自你已配置的模型，按 provider 分组）；
2. 选默认轮次：**快速**（只作答）/ **标准**（+ 互评）/ **深度**（+ 汇总，默认）；
3. 需要固定汇总者就选一个，留「自动」则用第一个成员。

设置存在浏览器本地，按 profile 生效。

### 每次：在对话里讨论（输入框下方）

1. 在**输入框里写下话题或目标**——这就是讨论主题；
2. 点输入框下方的 **「多 AI 讨论」** 可以临时增减本次参与的模型、改轮次；
3. 点 **「开始讨论 →」**：输入框清空，讨论面板出现在输入框正上方；
4. 面板里每个成员一栏，第一轮各自作答、第二轮互评、最后由汇总者给出结论，全部实时流式；
5. 面板头部可收起（▾）、重跑（↻）或关闭（✕）；中途可以「停止」。

面板有高度上限，长回答只在各自栏内滚动，不会把输入框挤出屏幕。

> 「开始讨论」读的是当前输入框草稿，不会把消息发给当前会话的 Agent——
> 两者互不干扰，讨论不会污染会话历史。

## 安装

这个包没有发布到 npm，从 GitHub 直接安装。三种方式任选其一。

### 方式一：Plugin Manager（推荐）

打开 **Plugins → Add plugin**，在输入框里填 GitHub 地址：

```
github:KunChiang/dsh-multi-ai-discussion
```

点 **Install**。安装完成后侧栏出现「多 AI 讨论」。

### 方式二：`dsh` CLI

```bash
dsh plugin --profile <profile> add github:KunChiang/dsh-multi-ai-discussion
```

`--profile` 指定要装进哪个 profile：Web 版用 `web`，自定义 profile 用其名字。

> **Desktop 用户注意**：`desktop` 是 Desktop 应用保留的 profile，CLI 会拒绝直接操作它
> （报错提示先打开一次 Desktop 初始化 profile，并完全退出）。请改用方式一，
> 在 GUI 的 Plugin Manager 里安装。

### 方式三：本地目录（开发用）

```bash
git clone git@github.com:KunChiang/dsh-multi-ai-discussion.git
dsh plugin --profile <profile> add /abs/path/to/dsh-multi-ai-discussion
```

适合改代码的场景：改动后重新执行 `node scripts/build.mjs`，再卸载重装同一个目录即可。
`github:` / `git+ssh://` / `https://` 三种地址形式 pnpm 都能解析，最终都会记成
`github:KunChiang/dsh-multi-ai-discussion`。

安装后 profile 的 `cordis.patch.yml` 会插入一行：

```yaml
- insert:
    - id: multi-ai-discussion
      name: 'dsh-multi-ai-discussion'
```

## 配置

需要调参时，在同一行下加 `config`（插件没有声明 Schema，取值都会做范围收敛）：

```yaml
- insert:
    - id: multi-ai-discussion
      name: 'dsh-multi-ai-discussion'
      config:
        maxMembers: 4          # 最多同时参与的模型数，2–10，默认 6
        answerTokens: 2048     # 单个模型单轮输出上限，默认 2048
        synthesisTokens: 4096  # 汇总输出上限，默认 4096
        defaultRounds: 3       # 面板默认轮次，1–3
        excludeModels:         # 不想出现在列表里的模型
          - text-embedding-v4
```

模型列表来自 `ctx.llm`：插件会枚举当前 profile 已注册的 provider 及其 `listModels()`，
并过滤掉 embedding / rerank / TTS 这类非对话模型。

## 实现结构

```
src/host/index.js          Host 半：模型目录、讨论编排、SSE 推送（/api/multi-ai-discussion/*）
src/client/index.jsx       浏览器半入口：注册 4 个扩展点
src/client/ComposerBar.jsx 输入框下方控制条（选模型 + 开始讨论）
src/client/DiscussionDock.jsx 输入框上方的分栏讨论面板（流式）
src/client/SettingsPanel.jsx  侧栏设置页
src/client/store.js        按会话的讨论状态 + 偏好持久化 + 模型目录
lib/                       构建产物（index.js / client.js），安装时使用这一份
```

挂载的扩展点（都是 DSH 的一等插槽，不替换任何原生界面）：

| 位置 | 用途 |
| --- | --- |
| `conversation.composer.dock` | 输入框下方的「多 AI 讨论」控制条 |
| `conversation.input.dock` | 输入框上方的分栏讨论面板 |
| `main` + `sidebar.panellist` | 侧栏设置页与其入口 |

- 讨论过程只存在于内存，连接断开即中止并释放，不写任何文件。
- 浏览器半走 `connection.fetch` 的 `/api` 通道，天然带同一套来源与凭据校验。
- 每次调用都带 240s 超时；用户在面板点「停止」会中断所有在途请求。

## 开发

```bash
node scripts/build.mjs   # esbuild 打包 client，并把 host 复制到 lib/
```

`react` 由浏览器模块表提供，不打进包里。

## 更新与生效

`lib/` 是构建产物，随仓库提交，所以直接安装不用装依赖、不用构建。
改源码后的流程：

```bash
node scripts/build.mjs                          # 重新打包 lib/
dsh plugin --profile <profile> remove dsh-multi-ai-discussion
dsh plugin --profile <profile> add github:KunChiang/dsh-multi-ai-discussion
```

**注意**：DSH 的浏览器模块图在启动时缓存，替换同一个包之后需要重启 Harness，
页面才会加载新的 `lib/client.js`；Host 半的路由则会随安装立即生效。
只刷新页面不够。

## License

MIT
