// backend/bot.js

const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: false });

function sendAlert(chatId, message) {
  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}

module.exports = { sendAlert };
