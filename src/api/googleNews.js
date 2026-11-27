import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'FinancialNewsCLI/1.0.1 (https://github.com/cerebrux/financial-news-cli)'
  }
});

const BASE_URL = 'https://news.google.com/rss/search';

export const CATEGORIES = {
  STOCKS: 'stocks market investing',
  CRYPTO: 'cryptocurrency bitcoin ethereum',
};

/**
 * Fetch latest news articles from Google News RSS feed.
 * @param {string} query Search terms (e.g., 'stocks', 'crypto', 'NVDA')
 * @param {number} limit Maximum number of articles to return
 * @returns {Promise<Array<{title: string, link: string, pubDate: string, source: string}>>}
 */
export async function fetchGoogleNews(query, limit = 10) {
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
  const feed = await parser.parseURL(url);

  if (!feed || !feed.items) {
    return [];
  }

  return feed.items.slice(0, limit).map((item) => {
    // Extract source name if included in title (e.g. "Title text - Publisher")
    let title = item.title || 'Untitled';
    let source = item.creator || item.source || '';

    const splitDash = title.lastIndexOf(' - ');
    if (splitDash !== -1 && !source) {
      source = title.substring(splitDash + 3).trim();
      title = title.substring(0, splitDash).trim();
    }

    return {
      title,
      link: item.link,
      pubDate: item.pubDate ? new Date(item.pubDate) : null,
      source: source || 'Google News',
    };
  });
}
