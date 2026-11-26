# Financial News CLI (Stocks & Crypto)

A Node.js command-line application to fetch and read real-time Stocks and Cryptocurrency news headlines from Google News.

## Features
- **Zero API Keys Required**: Fetches directly from Google News real-time feeds.
- **Stocks & Crypto Modes**: Quickly view market headlines or crypto updates.
- **Custom Search**: Query specific tickers or keywords (e.g. `NVDA`, `Solana`, `Fed Interest Rates`).
- **Interactive Menu**: Run without arguments to launch an interactive selection prompt.
- **Browser Integration**: Select any article to open it immediately in your default web browser (`-o` or via interactive menu).

---

## Installation & Setup

1. Navigate to the project directory:
   ```bash
   cd news-cli
   ```
2. (Optional) Link globally to run anywhere:
   ```bash
   npm link
   ```
   Now you can use `financial-news` from any terminal directory.

---

## Usage

### 1. Interactive Mode
Run the command without flags:
```bash
node ./bin/index.js
# Or if linked:
financial-news
```

### 2. Flag-Driven Commands

- **Stocks News**:
  ```bash
  node ./bin/index.js --stocks
  ```

- **Crypto News**:
  ```bash
  node ./bin/index.js --crypto
  ```

- **Custom Search**:
  ```bash
  node ./bin/index.js --search "Apple"
  node ./bin/index.js --search "Ethereum ETF"
  ```

- **Set Result Limit**:
  ```bash
  node ./bin/index.js --stocks --limit 5
  ```

- **Open Article in Browser**:
  ```bash
  node ./bin/index.js --crypto --open
  ```
