/**
 * Metadata for an MCP (Model Context Protocol) client entry in the registry.
 */
export type MCPClientEntry = {
  /** The official display name of the MCP client */
  official_name: string;
  /** The owner or organization behind the client */
  owner?: string;
  /** URL for the client's website or homepage */
  url?: string;
  /** Brief description of the client's purpose or features */
  description?: string;
  /** Alternative names or identifiers that can be used to look up this client */
  aliases?: string[];
  /** Categorization tags for the client */
  tags?: string[];
};

/**
 * An MCP client entry with its canonical registry key.
 */
export type MCPClientMatch = MCPClientEntry & {
  /** The canonical key used to identify this client in the registry */
  key: string;
};

/**
 * Registry of all known MCP clients, mapped by their canonical keys.
 * 
 * @example
 * ```js
 * const { mcpClients } = require("mcp-client-registry");
 * console.log(Object.keys(mcpClients)); // All registered client keys
 * ```
 */
export const mcpClients: Record<string, MCPClientEntry>;

/**
 * Look up an MCP client by name or alias.
 * 
 * This function searches for a client using either its canonical key or any of its registered aliases.
 * The search is case-sensitive and requires exact matches.
 * 
 * @param name - The client name or alias to search for
 * @returns The matching client entry with its canonical key, or null if not found
 * 
 * @example
 * ```js
 * const { getMCPClient } = require("mcp-client-registry");
 * 
 * const client = getMCPClient("cursor-vscode");
 * if (client) {
 *   console.log(client.official_name); // "Cursor (VS Code)"
 *   console.log(client.key); // "cursor-vscode"
 * }
 * ```
 */
export function getMCPClient(name: string): MCPClientMatch | null;
