import chalk from 'chalk';

/**
 * Format relative time (e.g., "15m ago", "2h ago")
 */
function getRelativeTime(date) {
  if (!date || isNaN(date.getTime())) return 'Recently';
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHr > 0) return `${diffHr}h ago`;
  if (diffMin > 0) return `${diffMin}m ago`;
  return 'Just now';
}

/**
 * Format and print news list nicely to stdout
 */
export function displayNews(articles, title = 'Latest Headlines') {
  if (!articles || articles.length === 0) {
    console.log(chalk.yellow('\nNo news found for this topic.\n'));
    return;
  }

  console.log('\n' + chalk.bold.bgBlueBright.black(`  ${title.toUpperCase()}  `) + '\n');

  articles.forEach((item, index) => {
    const num = chalk.cyan(`[${index + 1}]`);
    const headline = chalk.white.bold(item.title);
    const source = chalk.green(item.source);
    const time = chalk.dim(getRelativeTime(item.pubDate));
    const link = chalk.blueBright.underline(item.link);

    console.log(`${num} ${headline}`);
    console.log(`    ${source} • ${time}`);
    console.log(`    ${link}\n`);
  });
}
