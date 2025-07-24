
require('dotenv').config();

const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

// Use environment variables
const CHANNEL_ID = process.env.CHANNEL_ID;
const BOT_ID = process.env.BOT_ID;
const TOKEN = process.env.TOKEN;

// Anti-detection settings
const MIN_DELAY = 30; // 30 seconds minimum
const MAX_DELAY = 1800; // 30 minutes maximum
const OVERNIGHT_MULTIPLIER = 2.0; // 2x longer delays during overnight hours
const OVERNIGHT_HOURS = { start: 23, end: 7 }; // 11 PM to 7 AM
const TYPING_DELAY = { min: 1000, max: 3000 };
const TYPO_CHANCE = 0.11; // 11% chance to make a typo

// Common typos for /drop command
const TYPOS = ['dorp', 'drop\'', 'dtop', 'drpo', 'dro['];

// Helper for timestamped logs
const log = (msg) => console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);

// Check if current time is overnight
function isOvernightHours() {
  const hour = new Date().getHours();
  return hour >= OVERNIGHT_HOURS.start || hour < OVERNIGHT_HOURS.end;
}

// Human-like delay generator
function getHumanDelay() {
  // Use a more natural distribution (weighted towards longer delays)
  const random = Math.random();
  let delay;
  
  if (random < 0.6) {
    // 60% chance: 4 to 30 minutes
    delay = 240 + Math.random() * (MAX_DELAY - 240);
  } else if (random < 0.9) {
    // 30% chance: 2 to 4 minutes
    delay = 120 + Math.random() * (240 - 120);
  } else {
    // 10% chance: 30 seconds to 2 minutes
    delay = MIN_DELAY + Math.random() * (120 - MIN_DELAY);
  }
  
  // Apply overnight multiplier if it's nighttime
  if (isOvernightHours()) {
    delay *= OVERNIGHT_MULTIPLIER;
    const maxOvernightDelay = MAX_DELAY * OVERNIGHT_MULTIPLIER;
    if (delay > maxOvernightDelay) delay = maxOvernightDelay;
    log(`Overnight hours detected - applying ${OVERNIGHT_MULTIPLIER}x delay multiplier`);
  }
  
  return Math.floor(delay * 1000); // Convert to milliseconds
}

// Simulate human typing behavior
async function simulateTyping(channel) {
  const typingDuration = TYPING_DELAY.min + Math.random() * (TYPING_DELAY.max - TYPING_DELAY.min);
  
  channel.sendTyping();
  log(`Simulating typing for ${(typingDuration / 1000).toFixed(1)} seconds...`);
  await new Promise(resolve => setTimeout(resolve, typingDuration));
}

async function sendDropCommand() {
  const channel = client.channels.cache.get(CHANNEL_ID);
  if (!channel) return log(`Channel not found: ${CHANNEL_ID}`);

  try {
    // Simulate typing before sending command (like a human would)
    await simulateTyping(channel);
    
    // 11% chance to make a typo first
    if (Math.random() < TYPO_CHANCE) {
      const typo = TYPOS[Math.floor(Math.random() * TYPOS.length)];
      log(`Making a typo first: /${typo}`);
      
      try {
        await channel.sendSlash(BOT_ID, typo);
        log(`Typo command sent: /${typo}`);
        
        // Wait a bit (like realizing the mistake)
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
        
        // Show typing again for the correction
        await simulateTyping(channel);
        log(`Correcting typo, sending /drop`);
      } catch (err) {
        log(`Typo command failed (expected): ${err.message}`);
        // Continue to send the correct command
      }
    }
    
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

    // Use more natural delay distribution
    const delay = getHumanDelay();
    log(`Delaying /drop command for ${(delay / 1000).toFixed(1)} seconds...`);
    
    await new Promise(resolve => setTimeout(resolve, delay));
    await sendDropCommand();
  }
});

client.login(TOKEN);
