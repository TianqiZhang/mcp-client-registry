import { readFile, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";

const CLIENTS_PATH = new URL("clients.json", import.meta.url);
const README_PATH = new URL("README.md", import.meta.url);
const REQUIRED_FIELDS = ["official_name"];
const KNOWN_FIELDS = new Set([
  "official_name",
  "owner",
  "url",
  "description",
  "tags",
  "aliases",
]);

function fail(message) {
  console.error(message);
  process.exit(1);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validateClientEntry(key, entry) {
  if (!isPlainObject(entry)) {
    fail(`Client "${key}" must be an object.`);
  }

  for (const field of REQUIRED_FIELDS) {
    if (typeof entry[field] !== "string" || entry[field].trim() === "") {
      fail(`Client "${key}" is missing required field "${field}".`);
    }
  }

  if ("owner" in entry && (typeof entry.owner !== "string" || entry.owner.trim() === "")) {
    fail(`Client "${key}" has invalid "owner".`);
  }

  if ("url" in entry && (typeof entry.url !== "string" || entry.url.trim() === "")) {
    fail(`Client "${key}" has invalid "url".`);
  }

  if (
    "description" in entry &&
    (typeof entry.description !== "string" || entry.description.trim() === "")
  ) {
    fail(`Client "${key}" has invalid "description".`);
  }

  if ("tags" in entry) {
    if (!Array.isArray(entry.tags) || entry.tags.some((tag) => typeof tag !== "string" || tag.trim() === "")) {
      fail(`Client "${key}" has invalid "tags".`);
    }
  }

  if ("aliases" in entry) {
    if (
      !Array.isArray(entry.aliases) ||
      entry.aliases.some((alias) => typeof alias !== "string" || alias.trim() === "")
    ) {
      fail(`Client "${key}" has invalid "aliases".`);
    }
  }

  for (const field of Object.keys(entry)) {
    if (!KNOWN_FIELDS.has(field)) {
      console.warn(`Warning: client "${key}" has unknown field "${field}".`);
    }
  }
}

/**
 * Validates that aliases are unique and don't conflict with client keys.
 * Exits the process with an error message if validation fails.
 * @param {Object} clients - The clients object from clients.json
 */
function validateAliases(clients) {
  const keys = new Set(Object.keys(clients));
  const aliasToClient = new Map();

  for (const [key, entry] of Object.entries(clients)) {
    if (!entry.aliases || !Array.isArray(entry.aliases)) {
      continue;
    }

    for (const alias of entry.aliases) {
      // Skip invalid aliases (should already be caught by validateClientEntry)
      if (typeof alias !== "string" || alias.trim() === "") {
        continue;
      }

      // Check if alias is also a key in clients
      if (keys.has(alias)) {
        fail(`Alias "${alias}" of client "${key}" is also a key in clients.json.`);
      }

      // Check if alias is used by another client
      if (aliasToClient.has(alias)) {
        fail(`Alias "${alias}" is used by multiple clients: "${aliasToClient.get(alias)}" and "${key}".`);
      }

      aliasToClient.set(alias, key);
    }
  }
}

function sortClients(clients) {
  const sortedKeys = Object.keys(clients).sort((a, b) => a.localeCompare(b));
  const sorted = {};
  for (const key of sortedKeys) {
    sorted[key] = clients[key];
  }
  return sorted;
}

function escapeTableValue(value) {
  return value.replace(/\|/g, "\\|");
}

function buildClientsTable(clients) {
  const lines = [];
  const clientCount = Object.keys(clients).length;
  lines.push(`This registry contains **${clientCount}** MCP client${clientCount === 1 ? "" : "s"}.`);
  lines.push("");
  lines.push("| clientinfo.name | official_name | owner | url |");
  lines.push("| --- | --- | --- | --- |");

  for (const key of Object.keys(clients).sort((a, b) => a.localeCompare(b))) {
    const entry = clients[key];
    const officialName = entry.official_name ?? "";
    const owner = entry.owner ?? "";
    const url = entry.url ? `[${entry.url}](${entry.url})` : "";

    lines.push(
      `| ${escapeTableValue(key)} | ${escapeTableValue(officialName)} | ${escapeTableValue(owner)} | ${escapeTableValue(url)} |`
    );
  }

  return lines.join("\n");
}

async function updateReadme(clients) {
  let readme;
  try {
    readme = await readFile(README_PATH, "utf8");
  } catch {
    return;
  }

  readme = readme.replace(/^\uFEFF/, "");
  const startMarker = "<!-- BEGIN CLIENTS TABLE -->";
  const endMarker = "<!-- END CLIENTS TABLE -->";
  const startIndex = readme.indexOf(startMarker);
  const endIndex = readme.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    return;
  }

  const table = buildClientsTable(clients);
  const before = readme.slice(0, startIndex + startMarker.length);
  const after = readme.slice(endIndex);
  const updated = `${before}\n\n${table}\n\n${after}`;

  if (updated !== readme) {
    await writeFile(README_PATH, updated, "utf8");
  }
}

async function loadClients() {
  let raw = await readFile(CLIENTS_PATH, "utf8");
  raw = raw.replace(/^\uFEFF/, "");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    fail(`clients.json is not valid JSON: ${error.message}`);
  }

  if (!isPlainObject(data)) {
    fail("clients.json must contain a JSON object.");
  }

  if (!("clients" in data) || !isPlainObject(data.clients)) {
    fail('clients.json must contain a "clients" object.');
  }

  for (const [key, entry] of Object.entries(data.clients)) {
    if (typeof key !== "string" || key.trim() === "") {
      fail("Client keys must be non-empty strings.");
    }
    validateClientEntry(key, entry);
  }

  return { data, raw };
}

async function writeClients(data, previousRaw) {
  const output = `${JSON.stringify(data, null, 2)}\n`;
  if (output !== previousRaw) {
    await writeFile(CLIENTS_PATH, output, "utf8");
  }

}

async function promptForEntry(existingKeys) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log("Enter a new MCP client entry.");
    const key = (await rl.question("clientinfo.name (key): ")).trim();
    if (!key) {
      fail("clientinfo.name cannot be empty.");
    }

    if (existingKeys.has(key)) {
      const overwrite = (await rl.question(`"${key}" exists. Overwrite? (y/N): `)).trim().toLowerCase();
      if (overwrite !== "y" && overwrite !== "yes") {
        fail("Aborted.");
      }
    }

    console.log('official_name: The official product or client name (required).');
    const officialName = (await rl.question("official_name: ")).trim();
    if (!officialName) {
      fail("official_name is required.");
    }

    console.log('owner: The company or organization behind the client (optional).');
    const owner = (await rl.question("owner (optional): ")).trim();

    console.log('url: Official URL (optional).');
    const url = (await rl.question("url (optional): ")).trim();

    console.log('description: Short description of the client (optional).');
    const description = (await rl.question("description (optional): ")).trim();

    console.log('tags: Comma-separated tags (optional).');
    const tagsRaw = (await rl.question("tags (comma-separated, optional): ")).trim();
    const tags = tagsRaw
      ? tagsRaw.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

    console.log('aliases: Other known clientinfo.name values for the same client (optional).');
    const aliasesRaw = (await rl.question("aliases (comma-separated, optional): ")).trim();
    const aliases = aliasesRaw
      ? aliasesRaw.split(",").map((alias) => alias.trim()).filter(Boolean)
      : [];

    const entry = {
      official_name: officialName,
      ...(owner ? { owner } : {}),
      ...(url ? { url } : {}),
      ...(description ? { description } : {}),
      ...(tags.length ? { tags } : {}),
      ...(aliases.length ? { aliases } : {}),
    };

    return { key, entry };
  } finally {
    rl.close();
  }
}

const args = process.argv.slice(2);
const addMode = args.includes("--add");
const helpMode = args.includes("--help") || args.includes("-h");

if (helpMode) {
  console.log("Usage: node clients.mjs [--add]");
  process.exit(0);
}

if (args.length && !addMode) {
  fail(`Unknown arguments: ${args.join(" ")}`);
}

const { data, raw } = await loadClients();

if (addMode) {
  const { key, entry } = await promptForEntry(new Set(Object.keys(data.clients)));
  data.clients[key] = entry;
}

data.clients = sortClients(data.clients);
for (const [key, entry] of Object.entries(data.clients)) {
  validateClientEntry(key, entry);
}
validateAliases(data.clients);

await writeClients(data, raw);
await updateReadme(data.clients);
console.log("clients.json is valid and sorted.");
