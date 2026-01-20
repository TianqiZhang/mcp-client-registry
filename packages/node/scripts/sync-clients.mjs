import { readFile, writeFile, mkdir } from "node:fs/promises";

const SOURCE_PATH = new URL("../../../clients.json", import.meta.url);
const DEST_PATH = new URL("../clients.json", import.meta.url);

const raw = await readFile(SOURCE_PATH, "utf8");
await mkdir(new URL("../", import.meta.url), { recursive: true });
await writeFile(DEST_PATH, raw, "utf8");
console.log("Synced clients.json into packages/node.");
