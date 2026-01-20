const registry = require("./clients.json");

const mcpClients = registry.clients || {};

const aliasMap = new Map();
for (const [key, entry] of Object.entries(mcpClients)) {
  if (!entry || !Array.isArray(entry.aliases)) {
    continue;
  }
  for (const alias of entry.aliases) {
    if (typeof alias === "string" && alias.trim() !== "" && !aliasMap.has(alias)) {
      aliasMap.set(alias, key);
    }
  }
}

function getMCPClient(name) {
  if (typeof name !== "string" || name.trim() === "") {
    return null;
  }

  if (Object.prototype.hasOwnProperty.call(mcpClients, name)) {
    return { key: name, ...mcpClients[name] };
  }

  const aliasKey = aliasMap.get(name);
  if (aliasKey && Object.prototype.hasOwnProperty.call(mcpClients, aliasKey)) {
    return { key: aliasKey, ...mcpClients[aliasKey] };
  }

  return null;
}

module.exports = {
  mcpClients,
  getMCPClient,
};
