# Code Quest

A web-based Claude Code client.

[中文](README.md)

## Requirements

- curl (used to auto-download Node.js)
- Node.js and better-sqlite3 are downloaded automatically on first launch — no manual installation needed.

## Architecture

### Local Mode

```
┌─────────────────────────────────┐
│          Single Machine         │
│                                 │
│  Browser ──► Server ──► Claude  │
│                                 │
└─────────────────────────────────┘
```

### Remote Mode

```
┌──────────────────┐        ┌─────────────────────────┐
│   Server Machine │        │     Claude CLI Machine   │
│                  │        │                         │
│  Browser         │        │  Summoner ──► Claude    │
│    │             │        │     ▲                   │
│    ▼             │  WSS   │     │                   │
│  Server ◄────────┼────────┼─────┘                   │
│                  │        │                         │
└──────────────────┘        └─────────────────────────┘
```

## Quick Start

### Local Mode

The Server spawns Claude CLI directly on the same machine — no Summoner needed.

```bash
cd server
cp .env.example .env   # set SUMMONER_MODE=local
chmod +x server.sh
./server.sh
```

Windows:
```powershell
cd server
copy .env.example .env
.\server.bat
```

Open `http://localhost:3000` in your browser.

### Remote Mode

The Server and Claude CLI run on separate machines, bridged by the Summoner.

**Step 1 — Start the Server:**

```bash
cd server
cp .env.example .env   # set SUMMONER_MODE=remote
chmod +x server.sh
./server.sh
```

The token is printed in the startup banner, or set `SUMMONER_TOKEN` in `.env` to a fixed value.

**Step 2 — Start the Summoner on the machine with Claude CLI:**

```bash
cd summoner
cp .env.example .env   # fill in SUMMONER_SERVER and SUMMONER_TOKEN
chmod +x summoner.sh
./summoner.sh
```

Windows:
```powershell
cd summoner
copy .env.example .env
.\summoner.bat
```

## Configuration

### Server

```bash
cp server/.env.example server/.env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `SUMMONER_MODE` | `remote` | `local` (same machine) or `remote` (via Summoner) |
| `APP_PORT` | `3000` | Server port |
| `DATABASE_SQLITE_URL` | `file:./data/code-quest.db` | SQLite database path |
| `DATABASE_URL` | — | MySQL URL (optional) |
| `SUMMONER_TOKEN` | auto-generated | Auth token for summoner (`remote` mode) |
| `TRANSPORT` | `ws` | `ws`, `socketio`, or `both` |
| `CLI_THINKING_DISPLAY` | `summarized` | Claude thinking display mode |
| `HTTPS_MODE` | `false` | Set to `true` when Node terminates TLS directly (enables HSTS). Leave unset when a reverse proxy (Caddy/nginx) handles TLS. |

See `server/.env.example` for all available options.

### Summoner (remote mode only)

```bash
cp summoner/.env.example summoner/.env
```

| Variable | Description |
|----------|-------------|
| `SUMMONER_SERVER` | Server WebSocket URL, e.g. `ws://your-server:3000/summoner` |
| `SUMMONER_TOKEN` | Must match the server's `SUMMONER_TOKEN` |
| `EXPLORER_ROOTS` | Allowed root directories (comma-separated), defaults to home |

See `summoner/.env.example` for all available options.

## Directory Structure

```
release/
├── server/
│   ├── bin/server.js      # Main server entry point
│   ├── migrations/        # Database migrations (auto-applied)
│   ├── public/            # Web UI
│   ├── node_modules/      # Native dependencies (better-sqlite3)
│   ├── .env.example       # Environment variable reference
│   ├── server.sh          # Linux/macOS start script
│   └── server.bat         # Windows start script
└── summoner/
    ├── main.js            # Summoner entry point (remote mode only)
    ├── .env.example       # Environment variable reference
    ├── summoner.sh        # Linux/macOS start script
    └── summoner.bat       # Windows start script
```
