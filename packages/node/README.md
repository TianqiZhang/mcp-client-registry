# MCP Client Registry

[![npm version](https://img.shields.io/npm/v/mcp-client-registry.svg)](https://www.npmjs.com/package/mcp-client-registry)
[![license](https://img.shields.io/npm/l/mcp-client-registry.svg)](https://github.com/anthropics/mcp-client-registry/blob/main/LICENSE)

**Turn cryptic `clientInfo.name` values into actionable insights.**

If you run an MCP server, you've probably seen connection logs full of mysterious identifiers like `mcs`, `com.raycast.macos`, or `Jan-Streamable-Client`. Good luck figuring out which products those actually are.

This registry solves that problem. It maps raw `clientInfo.name` values to official product names, owners, and metadata—so you can finally understand **who** is connecting to your server and make informed business decisions.

## Installation

```bash
npm install mcp-client-registry
```

## Usage

```js
const { getMCPClient, mcpClients } = require("mcp-client-registry");

// Look up a client by its clientInfo.name
const client = getMCPClient("cursor-vscode");
if (client) {
  console.log(client.official_name); // "Cursor"
  console.log(client.owner);         // "Anysphere"
}

// Access the full registry
console.log(Object.keys(mcpClients).length); // 60+ clients and growing
```

`getMCPClient(name)` matches both canonical keys and known aliases, so you'll get a match even if a client reports itself under a variant name.

## TypeScript Support

Full type definitions are included out of the box:

```ts
import { getMCPClient, mcpClients, MCPClientEntry } from "mcp-client-registry";

const client = getMCPClient("claude-ai");
// client is MCPClientMatch | null
```

## API

### `getMCPClient(name: string): MCPClientMatch | null`

Look up a client by its `clientInfo.name` or any known alias. Returns the client entry with its canonical `key`, or `null` if not found.

### `mcpClients: Record<string, MCPClientEntry>`

The full registry object mapping canonical keys to client metadata.

### `MCPClientEntry`

```ts
type MCPClientEntry = {
  official_name: string;  // Display name (e.g., "Cursor", "Claude Desktop")
  owner?: string;         // Company or organization
  url?: string;           // Official website
  description?: string;   // Brief description
  aliases?: string[];     // Alternative clientInfo.name values
  tags?: string[];        // Categorization tags
};
```

## Contributing

Missing a client? Found incorrect metadata? Contributions are welcome!

See the [full registry and contribution guide](https://github.com/anthropics/mcp-client-registry) on GitHub.

## License

MIT
