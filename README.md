# MCP Clients Registry

A community-maintained map of MCP `clientinfo.name` values to official client names and metadata. Use it to identify clients behind unfamiliar names and improve reporting and insights.


## Known clients

<!-- BEGIN CLIENTS TABLE -->

| clientinfo.name | official_name | owner | website |
| --- | --- | --- | --- |
| @librechat/api-client | LibreChat |  |  |
| claude-ai | Claude Desktop | Anthropic |  |
| continue-client | Continue |  |  |
| cursor-vscode | Cursor | Anysphere | [https://www.cursor.com](https://www.cursor.com) |
| emacs | Emacs |  |  |
| example-client | Example Client |  |  |
| goose | Goose |  |  |
| helix | Helix |  |  |
| jetbrains-ai-assistant-client | JetBrains AI Assistant | JetBrains |  |
| JetBrains-IU/copilot-intellij | GitHub Copilot for IntelliJ |  |  |
| mcp | Python SDK default |  |  |
| mcp-cli-client | MCP CLI |  |  |
| mcs | Copilot Studio | Microsoft |  |
| mise | Mise |  |  |
| my-awesome-client | Go SDK example |  |  |
| spring-ai-mcp-client | Spring AI MCP Client |  |  |
| test-client | Smithery test client |  |  |
| Visual Studio Code | Visual Studio Code | Microsoft |  |
| warp | Warp |  |  |
| Windsurf | Windsurf | Codeium |  |
| Zed | Zed |  |  |

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
