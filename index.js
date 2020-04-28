require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const Web3 = require('web3');
const RNS = require('@rsksmart/rns');

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, {polling: true});

const web3 = new Web3('https://public-node.rsk.co');
const rns = new RNS(web3);

bot.onText(/\/addr/, (msg, { input }) => {
  const [_, domain] = input.split(' ');

  rns.addr(domain)
    .then(addr => bot.sendMessage(msg.chat.id, addr))
    .catch(error => bot.sendMessage(msg.chat.id, `Error: ${error.message} - More info: ${error.ref}`))
});
