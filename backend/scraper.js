// backend/scraper.js

const axios = require('axios');
const cheerio = require('cheerio');

// Pull latest posts from a Nitter instance
async function fetchTweets(username) {
  const url = `https://nitter.net/${username}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let posts = [];
    $('div.timeline-item').each((i, el) => {
      const content = $(el).find('.tweet-content').text().trim();
      const link = 'https://nitter.net' + $(el).find('a.tweet-link').attr('href');
      const time = $(el).find('span.tweet-date > a').attr('title');

      posts.push({ content, link, time });
    });

    return posts.slice(0, 3); // return last 3 posts
  } catch (err) {
    console.error(`[scraper] Error fetching for ${username}:`, err.message);
    return [];
  }
}

module.exports = { fetchTweets };
