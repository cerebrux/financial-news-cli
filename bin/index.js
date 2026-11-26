#!/usr/bin/env node

import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import open from 'open';
import { select, input } from '@inquirer/prompts';

import { fetchGoogleNews, CATEGORIES } from '../src/api/googleNews.js';
import { displayNews } from '../src/ui/display.js';

const program = new Command();

program
  .name('financial-news')
  .description('CLI tool to fetch the latest Stocks and Crypto news from Google News')
  .version('1.0.0')
  .option('-s, --stocks', 'Fetch latest stock market news')
  .option('-c, --crypto', 'Fetch latest cryptocurrency news')
  .option('-q, --search <query>', 'Search for news on a specific ticker or topic')
  .option('-l, --limit <number>', 'Number of news items to fetch (default: 8)', '8')
  .option('-o, --open', 'Select and open an article in your browser');

program.parse(process.argv);

const options = program.opts();
const limit = parseInt(options.limit, 10) || 8;

async function runInteractiveMenu() {
  console.log(chalk.bold.cyan('\n📊 Welcome to Financial News CLI 🚀'));

  const choice = await select({
    message: 'What news would you like to see?',
    choices: [
      { name: '📈 Stocks & Market News', value: 'stocks' },
      { name: '🪙 Crypto & Bitcoin News', value: 'crypto' },
      { name: '🔍 Search Specific Ticker / Topic', value: 'search' },
      { name: '❌ Exit', value: 'exit' },
    ],
  });

  if (choice === 'exit') {
    process.exit(0);
  }

  let query = '';
  let title = '';

  if (choice === 'stocks') {
    query = CATEGORIES.STOCKS;
    title = '📈 Latest Stocks & Markets News';
  } else if (choice === 'crypto') {
    query = CATEGORIES.CRYPTO;
    title = '🪙 Latest Crypto & Web3 News';
  } else if (choice === 'search') {
    query = await input({
      message: 'Enter ticker or keyword (e.g. NVDA, Bitcoin, Fed):',
      validate: (val) => (val.trim() ? true : 'Please enter a valid search term'),
    });
    title = `🔍 Search Results: "${query}"`;
  }

  await loadAndHandleNews(query, title, true);
}

async function loadAndHandleNews(query, title, allowOpenChoice) {
  const spinner = ora(chalk.dim(`Fetching news from Google...`)).start();

  try {
    const articles = await fetchGoogleNews(query, limit);
    spinner.stop();

    displayNews(articles, title);

    if (articles.length > 0 && (options.open || allowOpenChoice)) {
      const shouldOpen = await select({
        message: 'Would you like to open any article in your browser?',
        choices: [
          ...articles.map((item, idx) => ({
            name: `${idx + 1}. [${item.source}] ${item.title.substring(0, 60)}...`,
            value: item.link,
          })),
          { name: 'None / Exit', value: null },
        ],
      });

      if (shouldOpen) {
        console.log(chalk.green(`Opening article in browser...`));
        await open(shouldOpen);
      }
    }
  } catch (error) {
    spinner.fail(chalk.red('Failed to fetch news from Google News.'));
    console.error(chalk.dim(error.message));
  }
}

async function main() {
  if (options.stocks) {
    await loadAndHandleNews(CATEGORIES.STOCKS, '📈 Latest Stocks & Markets News', options.open);
  } else if (options.crypto) {
    await loadAndHandleNews(CATEGORIES.CRYPTO, '🪙 Latest Crypto & Web3 News', options.open);
  } else if (options.search) {
    await loadAndHandleNews(options.search, `🔍 Search: "${options.search}"`, options.open);
  } else {
    // No flag passed -> interactive mode
    await runInteractiveMenu();
  }
}

main().catch((err) => {
  if (err.name === 'ExitPromptError') {
    console.log('\nGoodbye!');
  } else {
    console.error(err);
  }
});
