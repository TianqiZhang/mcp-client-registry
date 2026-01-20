# MCP Clients Registry

A community-maintained map of MCP `clientinfo.name` values to official client names and metadata. Use it to identify clients behind unfamiliar names and improve reporting and insights.


## Known clients

<!-- BEGIN CLIENTS TABLE -->

| clientinfo.name | official_name | owner | website |
| --- | --- | --- | --- |
| @librechat/api-client | LibreChat |  | [https://www.librechat.ai](https://www.librechat.ai) |
| @n8n/n8n-nodes-langchain.mcpClientTool | N8N MCP Client |  | [https://n8n.io](https://n8n.io) |
| Alpic | Alpic |  | [https://alpic.ai](https://alpic.ai) |
| amp-mcp-client | AmpCode |  | [https://ampcode.com](https://ampcode.com) |
| antigravity-client | Google Antigravity |  | [https://antigravity.google](https://antigravity.google) |
| apify-mcp-client | Apify MCP Client |  | [https://apify.com/jiri.spilka/tester-mcp-client](https://apify.com/jiri.spilka/tester-mcp-client) |
| arcade | Arcade |  | [https://arcade.dev](https://arcade.dev) |
| ChatGPT | ChatGPT |  | [https://chatgpt.com](https://chatgpt.com) |
| Cherry Studio | Cherry Studio |  | [https://www.cherry-ai.com](https://www.cherry-ai.com) |
| claude-ai | Claude Desktop | Anthropic | [https://claude.ai](https://claude.ai) |
| claude-code | Claude Code | Anthropic | [https://claude.com/product/claude-code](https://claude.com/product/claude-code) |
| Cline | Cline |  | [https://cline.bot/](https://cline.bot/) |
| Codex | OpenAI Codex |  | [https://openai.com/codex](https://openai.com/codex) |
| com.raycast.macos | Raycast |  | [https://www.raycast.com](https://www.raycast.com) |
| continue-cli-client | Continue CLI Client |  | [https://www.continue.dev/](https://www.continue.dev/) |
| continue-client | Continue |  |  |
| crush | Crush |  | [https://github.com/charmbracelet/crush](https://github.com/charmbracelet/crush) |
| cursor-vscode | Cursor | Anysphere | [https://www.cursor.com](https://www.cursor.com) |
| dust-mcp-client | Dust |  | [https://dust.tt](https://dust.tt) |
| emacs | Emacs |  |  |
| example-client | Example Client |  |  |
| factory-cli | Factory CLI |  | [https://github.com/factory-ai/factory-cli](https://github.com/factory-ai/factory-cli) |
| gemini-cli | Gemini CLI | Google | [https://geminicli.com/](https://geminicli.com/) |
| gitguardian | GitGuardian |  | [https://www.gitguardian.com](https://www.gitguardian.com) |
| github-copilot-developer | GitHub Copilot CLI |  | [https://github.com/features/copilot/cli](https://github.com/features/copilot/cli) |
| goose | Goose |  | [https://block.github.io/goose](https://block.github.io/goose) |
| helix | Helix |  |  |
| Jan-Streamable-Client | Jan AI |  | [https://jan.ai](https://jan.ai) |
| jetbrains-ai-assistant-client | JetBrains AI Assistant | JetBrains |  |
| JetBrains-IU-copilot-intellij | JetBrains AI Assistant |  | [https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant](https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant) |
| JetBrains-IU/copilot-intellij | GitHub Copilot for IntelliJ |  |  |
| JetBrains-JBC-copilot-intellij | JetBrains AI Assistant with GitHub Copilot |  | [https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant](https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant) |
| Kilo-Code | Kilo Code |  | [https://github.com/Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode) |
| lobehub-mcp-client | LobeHub |  | [https://lobehub.com](https://lobehub.com) |
| make-app-mcp-client | Make MCP Client |  | [https://www.make.com](https://www.make.com) |
| mcp | Python SDK default |  |  |
| mcp-cli | MCP CLI |  |  |
| mcs | Copilot Studio | Microsoft |  |
| mise | Mise |  |  |
| Mistral | Mistral AI: Le Chat |  | [https://chat.mistral.ai](https://chat.mistral.ai) |
| my-awesome-client | Go SDK example |  |  |
| opencode | Opencode |  | [https://opencode.ai](https://opencode.ai) |
| Postman-Client | Postman |  | [https://postman.com/downloads](https://postman.com/downloads) |
| q-cli | Amazon Q CLI | Amazon | [https://github.com/aws/amazon-q-developer-cli](https://github.com/aws/amazon-q-developer-cli) |
| Roo Code | Roo Code |  |  |
| spring-ai-mcp-client | Spring AI MCP Client |  |  |
| test-client | Smithery test client |  |  |
| Visual Studio Code | Visual Studio Code | Microsoft | [https://code.visualstudio.com](https://code.visualstudio.com) |
| warp | Warp |  |  |
| Windsurf | Windsurf | Codeium | [https://codeium.com/windsurf](https://codeium.com/windsurf) |
| windsurf-client | Windsurf Editor |  | [https://codeium.com/windsurf](https://codeium.com/windsurf) |
| Xcode-copilot-xcode | GitHub Copilot for Xcode |  | [https://github.com/github/CopilotForXcode](https://github.com/github/CopilotForXcode) |
| Zed | Zed |  | [https://zed.dev](https://zed.dev) |

<!-- END CLIENTS TABLE -->
## Data format

All data lives in `clients.json`. The top-level object contains a single field:

- `clients`: Map of `clientinfo.name` -> metadata object

Example:

```json
{
  "clients": {
    "cursor-vscode": {
      "official_name": "Cursor",
      "owner": "Anysphere",
      "website": "https://www.cursor.com",
      "description": "AI-powered coding IDE based on VS Code.",
      "tags": ["coding-agent", "ide", "vscode-fork"],
      "aliases": ["cursor", "Cursor"]
    }
  }
}
```

### Client object fields

- `official_name` (string, required)
- `owner` (string, optional)
- `website` (string URL, optional)
- `description` (string, optional)
- `aliases` (array of strings, optional)
- `tags` (array of strings, optional)

The key under `clients` must equal the MCP `clientinfo.name`. If a client has other known names, list them in `aliases`.

## Contributing

1. Add or update an entry in `clients.json`.
2. Keep entries in alphabetical order by key.
3. Prefer official sources for `website`.
4. Only add aliases that are known to appear in the wild.

## Maintenance script

- Validate and sort: `node clients.mjs`
- Add a new entry interactively: `node clients.mjs --add`

## npm package

```js
const { getMCPClient, mcpClients } = require("mcp-client-registry");

const client = getMCPClient("cursor-vscode");
if (client) {
  console.log(client.official_name);
}

console.log(Object.keys(mcpClients).length);
```

`getMCPClient(name)` matches both canonical keys and known aliases.

Package source lives in `packages/node`.
`clients.json` for the npm package is generated via `packages/node/scripts/sync-clients.mjs`.
