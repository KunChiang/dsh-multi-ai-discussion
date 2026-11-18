# 多 AI 讨论（dsh-multi-ai-discussion）

让多个大模型围绕**同一个需求或问题**一起干活：先各自独立作答，再匿名互相挑错、修订，
最后由你指定的「汇总者」把分歧合并成唯一一份更完整、更可靠的答案或方案。

这是 DeepSeek Harness 的常驻插件：装一次，侧栏多一个「多 AI 讨论」面板，所有会话都能用。

## 它解决什么问题

单个模型容易在细节上想当然，也更难自我否定。多模型讨论把三件事分开：

| 轮次 | 做法 | 收益 |
| --- | --- | --- |
| 第一轮 · 独立作答 | 并行问所有选中的模型，彼此不可见 | 拿到真正独立的多个思路，避免互相带偏 |
| 第二轮 · 交叉评审 | 每份答案匿名编号，各模型指错、吸收、重写自己的答案 | 错误和遗漏被第二双眼睛抓出来 |
| 最终 · 汇总 | 汇总者读到全部答案与互评，合并成分歧明确的一份结论 | 输出可直接使用的最终方案，而不是一堆并列观点 |

## 使用

1. 侧栏点「多 AI 讨论」（或输入框左侧的同名按钮）。
2. 写下需求或问题；有技术栈、时间、预算等前提就填在「补充前提」里，所有模型都会看到。
3. 在「参与讨论的模型」里勾选 2–4 个模型。列表就是你在这个 profile 里已经配置好的模型。
4. 选轮次：
   - **快速**：只做第一轮，适合对比不同思路；
   - **标准**：加一轮匿名互评，适合有对错的方案题；
   - **深度**：再加汇总，适合要一份能直接落地的方案（默认）。
5. 点「开始讨论」。每张卡片会实时流式输出，跑完可以一键复制最终结论。

## 安装

```bash
# 在 DSH 中安装本地目录（会链接这个 checkout，改动后重装即可生效）
dsh plugin --profile <profile> add /abs/path/to/dsh-multi-ai-discussion
```

或者在 Plugin Manager 里安装同目录下打包出的 `.tgz`。安装后 `cordis.patch.yml` 会插入一行：

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
src/host/index.js    Host 半：模型目录、讨论编排、SSE 推送（/api/multi-ai-discussion/*）
src/client/          浏览器半：面板、模型选择、流式渲染、Markdown
lib/                 构建产物（index.js / client.js），安装时使用这一份
```

- 讨论过程只存在于内存，连接断开即中止并释放，不写任何文件。
- 浏览器半走 `connection.fetch` 的 `/api` 通道，天然带同一套来源与凭据校验。
- 每次调用都带 240s 超时；用户在面板点「停止」会中断所有在途请求。

## 开发

```bash
node scripts/build.mjs   # esbuild 打包 client，并把 host 复制到 lib/
```

`react` 由浏览器模块表提供，不打进包里。

## License

MIT

## 更新与生效

本插件已安装在桌面版 profile（`desktop`）。修改源码后：

```bash
node scripts/build.mjs      # 重新打包 lib/
```

然后在 Plugin Manager 里卸载再安装同一个目录。**DSH 的浏览器模块图在启动时缓存**，
所以替换安装后需要重启 Harness（或让 client 构建产物流入新的模块代），
页面才会加载新的 `lib/client.js`；Host 半的路由则会随安装立即生效。
