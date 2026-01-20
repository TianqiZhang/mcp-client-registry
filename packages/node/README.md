# MCP Client Registry (Node.js)

This package provides a small lookup helper for MCP `clientinfo.name` values.

## Usage

```js
const { getMCPClient, mcpClients } = require("mcp-client-registry");

const client = getMCPClient("cursor-vscode");
if (client) {
  console.log(client.official_name);
}

console.log(Object.keys(mcpClients).length);
```

`getMCPClient(name)` matches both canonical keys and known aliases.

## Development note

`clients.json` is synced from the repo root via the `prepare` script.
