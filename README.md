# MCP Clients Registry

[![npm version](https://img.shields.io/npm/v/mcp-client-registry.svg)](https://www.npmjs.com/package/mcp-client-registry)

A community-maintained map of MCP `clientinfo.name` values to official client names and metadata. Use it to identify clients behind unfamiliar names and improve reporting and insights.


## Known clients

<!-- BEGIN CLIENTS TABLE -->

This registry contains **3** MCP clients.

| clientinfo.name | official_name | owner | url |
| --- | --- | --- | --- |
| client-a | Client A |  |  |
| client-b | Client B |  |  |
| client-c | Client C |  |  |

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
      "url": "https://www.cursor.com",
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
- `url` (string URL, optional)
- `description` (string, optional)
- `aliases` (array of strings, optional)
- `tags` (array of strings, optional)

The key under `clients` must equal the MCP `clientinfo.name`. If a client has other known names, list them in `aliases`.

## Contributing

1. Add or update an entry in `clients.json`.
2. Keep entries in alphabetical order by key.
3. Prefer official sources for `url`.
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
