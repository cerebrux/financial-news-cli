# 📈 Financial News CLI

A clean, fast command-line tool to fetch and read real-time **Stocks** and **Cryptocurrency** news from Google News directly in your terminal. **Zero API keys required.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

---

## ✨ Features
- **Zero API Keys**: Connects directly to Google News RSS feeds.
- **Stocks & Crypto Feeds**: Instant access to global market and crypto headlines.
- **Custom Search**: Lookup specific tickers, companies, or events (e.g. `NVDA`, `Bitcoin`, `Fed Rates`).
- **Interactive Terminal UI**: Select categories or search topics with arrow keys.
- **Browser Integration**: Select any headline to open the full article directly in your default browser.
- **Cross-Platform**: Works smoothly on **macOS**, **Linux**, and **Windows**.

---

## 📋 Prerequisites
Make sure you have **Node.js** (version 18 or newer) and **npm** installed on your system.

To check if Node.js is installed:
```bash
node -v
npm -v
```
*(If you need to install Node.js, download it from [nodejs.org](https://nodejs.org/)).*

---

## 🚀 Installation & Setup

### Option 1: macOS & Linux

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cerebrux/financial-news-cli.git
   cd financial-news-cli
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **(Optional) Install globally on your system:**
   ```bash
   npm link
   ```
   Now you can run `financial-news` from anywhere in your terminal!

---

### Option 2: Windows (PowerShell or Command Prompt)

1. **Clone the repository:**
   ```powershell
   git clone https://github.com/cerebrux/financial-news-cli.git
   cd financial-news-cli
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **(Optional) Install globally on your system:**
   ```powershell
   npm link
   ```
   *(If prompted by PowerShell security policies when running global scripts, you can run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` or simply use `node .\bin\index.js`).*

---

## 💻 Usage

### 1. Interactive Menu (Recommended)
Run the tool without arguments to open an interactive selection menu:

```bash
# If globally linked:
financial-news

# Or directly from the project directory:
node ./bin/index.js
```

Use your arrow keys `↑` `↓` to choose a category, search for a ticker, and choose an article to open in your browser.

---

### 2. Direct Command-Line Flags

You can bypass the menu by passing CLI options:

- **📈 Latest Stock Market News:**
  ```bash
  financial-news --stocks
  # or: node ./bin/index.js --stocks
  ```

- **🪙 Latest Crypto News:**
  ```bash
  financial-news --crypto
  # or: node ./bin/index.js --crypto
  ```

- **🔍 Search for a specific ticker or topic:**
  ```bash
  financial-news --search "NVDA"
  financial-news --search "Bitcoin ETF"
  financial-news --search "Interest Rates"
  ```

- **🔢 Limit the number of articles (default: 8):**
  ```bash
  financial-news --stocks --limit 5
  ```

- **🌐 Interactively open an article in your browser:**
  ```bash
  financial-news --crypto --open
  ```

---

## 🛠️ CLI Options Reference

| Flag | Description |
| :--- | :--- |
| `-s, --stocks` | Fetch top stock market headlines |
| `-c, --crypto` | Fetch top cryptocurrency headlines |
| `-q, --search <query>` | Search for a specific ticker, company, or topic |
| `-l, --limit <number>` | Number of headlines to display (default: `8`) |
| `-o, --open` | Prompt to select and open an article in your browser |
| `-h, --help` | Display command help and options |
| `-V, --version` | Output the current version number |

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
