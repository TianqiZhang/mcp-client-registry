# MCP Clients Registry

This repo maps MCP `clientinfo.name` values to official client names and metadata.

## Data file

`clients.json` contains a single JSON object with one field:

- `clients`: Map of `clientinfo.name` -> metadata object

### Client object fields

- `official_name` (string)
- `owner` (string)
- `website` (string URL)
- `description` (string)
- `aliases` (array of strings)
- `tags` (array of strings)

All fields except `official_name` are optional. New entries should keep the key in `clients` equal to the MCP `clientinfo.name`.

## Contributing

1. Add or update an entry in `clients.json`.
2. Keep entries in alphabetical order by key.
3. Prefer official sources for `website`.

## Maintenance script

Run `node clients.mjs` to validate `clients.json` and sort entries.
Run `node clients.mjs --add` to add a new client entry interactively.
