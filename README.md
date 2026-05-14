# Code Quest

網頁版 Claude Code 客戶端。

[English](README.en.md)

## 系統需求

- curl（用於自動下載 Node.js）
- 首次啟動時會自動下載 Node.js 與 better-sqlite3，無需手動安裝。

## 架構

### Local 模式

```
┌─────────────────────────────────┐
│           同一台機器             │
│                                 │
│  Browser ──► Server ──► Claude  │
│                                 │
└─────────────────────────────────┘
```

### Remote 模式

```
┌──────────────────┐        ┌─────────────────────────┐
│    Server 機器    │        │      Claude CLI 機器     │
│                  │        │                         │
│  Browser         │        │  Summoner ──► Claude    │
│    │             │        │     ▲                   │
│    ▼             │  WSS   │     │                   │
│  Server ◄────────┼────────┼─────┘                   │
│                  │        │                         │
└──────────────────┘        └─────────────────────────┘
```

## 快速開始

### Local 模式

Server 直接在本機 spawn Claude CLI，不需要 Summoner。

```bash
cd server
cp .env.example .env   # 設定 SUMMONER_MODE=local
chmod +x server.sh
./server.sh
```

Windows：
```powershell
cd server
copy .env.example .env
.\server.bat
```

用瀏覽器開啟 `http://localhost:3000`。

### Remote 模式

Server 與 Claude CLI 分開在不同機器，透過 Summoner 橋接。

**Step 1 — 啟動 Server：**

```bash
cd server
cp .env.example .env   # 設定 SUMMONER_MODE=remote
chmod +x server.sh
./server.sh
```

Token 會在啟動訊息中顯示，或在 `.env` 設定 `SUMMONER_TOKEN` 為固定值。

**Step 2 — 在有 Claude CLI 的機器上啟動 Summoner：**

```bash
cd summoner
cp .env.example .env   # 填入 SUMMONER_SERVER 與 SUMMONER_TOKEN
chmod +x summoner.sh
./summoner.sh
```

Windows：
```powershell
cd summoner
copy .env.example .env
.\summoner.bat
```

## 設定

### Server

```bash
cp server/.env.example server/.env
```

| 變數 | 預設值 | 說明 |
|------|--------|------|
| `SUMMONER_MODE` | `remote` | `local`（本機）或 `remote`（透過 Summoner） |
| `APP_PORT` | `3000` | 伺服器埠號 |
| `DATABASE_SQLITE_URL` | `file:./data/code-quest.db` | SQLite 資料庫路徑 |
| `DATABASE_URL` | — | MySQL 連線 URL（選用） |
| `SUMMONER_TOKEN` | 自動產生 | Summoner 連線驗證 token（`remote` 模式） |
| `TRANSPORT` | `ws` | `ws`、`socketio` 或 `both` |
| `CLI_THINKING_DISPLAY` | `summarized` | Claude 思考顯示模式 |
| `HTTPS_MODE` | `false` | Node 直接終止 TLS 時設為 `true`，啟用 HSTS。透過 Caddy/nginx 反向代理處理 TLS 時保持預設。 |

完整設定項請參考 `server/.env.example`。

### Summoner（remote 模式才需要）

```bash
cp summoner/.env.example summoner/.env
```

| 變數 | 說明 |
|------|------|
| `SUMMONER_SERVER` | Server 的 WebSocket URL，例如 `ws://your-server:3000/summoner` |
| `SUMMONER_TOKEN` | 與 Server 的 `SUMMONER_TOKEN` 相同 |
| `EXPLORER_ROOTS` | 允許瀏覽的根目錄（逗號分隔），預設為 home |

完整設定項請參考 `summoner/.env.example`。

## 目錄結構

```
release/
├── server/
│   ├── bin/server.js      # 伺服器入口
│   ├── migrations/        # 資料庫 migration（自動執行）
│   ├── public/            # 網頁介面
│   ├── node_modules/      # Native 依賴（better-sqlite3）
│   ├── .env.example       # 環境變數範例
│   ├── server.sh          # Linux/macOS 啟動 script
│   └── server.bat         # Windows 啟動 script
└── summoner/
    ├── main.js            # Summoner 入口（remote 模式才需要）
    ├── .env.example       # 環境變數範例
    ├── summoner.sh        # Linux/macOS 啟動 script
    └── summoner.bat       # Windows 啟動 script
```
