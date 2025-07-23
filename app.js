
require('dotenv').config();

const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

// Use environment variables
const CHANNEL_ID = process.env.CHANNEL_ID;
const BOT_ID = process.env.BOT_ID;
const TOKEN = process.env.TOKEN;

// Helper for timestamped logs
const log = (msg) => console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);

async function sendDropCommand() {
  const channel = client.channels.cache.get(CHANNEL_ID);
  if (!channel) return log(`Channel not found: ${CHANNEL_ID}`);

  try {
    log(`Sending /drop command in ${channel.name}`);
    await channel.sendSlash(BOT_ID, 'drop');
    log(`/drop command sent successfully`);
  } catch (err) {
    log(`Error sending /drop command: ${err.message}`);
  }
}

client.on('ready', async () => {
  log(`${client.user.username} is ready!`);
  log('Attempting initial /drop command...');
  await sendDropCommand();
});

client.on('messageCreate', async (message) => {
  if (message.author.id === BOT_ID && message.mentions.users.has(client.user.id)) {
    log(`Bot mentioned me! Message: "${message.content}"`);
    // wait for a moment before sending the command
    await new Promise(resolve => setTimeout(resolve, 2000));
    await sendDropCommand();
  }
});

client.login(TOKEN);
