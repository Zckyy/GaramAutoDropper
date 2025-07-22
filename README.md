# Discord Self Bot - Auto Drop

A Discord self-bot that automatically responds to mentions from a specific bot by sending slash commands.

## Features

- 🚀 **Initial Drop**: Attempts a `/drop` command immediately on startup
- 👁️ **Mention Detection**: Monitors for mentions from the [Garam bot](https://top.gg/bot/1061825343285112842)
- ⚡ **Auto Response**: Automatically sends `/drop` commands when mentioned
- 🛡️ **Error Handling**: Robust error handling with timestamped logs

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd DiscordSelfBot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and fill in your values:
   - `CHANNEL_ID`: The Discord channel ID where commands will be sent
   - `BOT_ID`: The ID of the bot you want to interact with
   - `TOKEN`: Your Discord user token

4. **Run the bot**
   ```bash
   node app.js
   ```

## How It Works

1. The bot connects to Discord using your user token
2. Immediately attempts a `/drop` command on startup
3. Listens for any mentions from the specified bot ID
4. When mentioned, automatically sends another `/drop` command

## Dependencies

- `discord.js-selfbot-v13`: Discord self-bot library
- `libsodium-wrappers`: Encryption library for voice functionality
- `tweetnacl`: Alternative encryption library
- `dotenv`: Environment variable management

## ⚠️ Important Notes

- This is a self-bot, which goes against Discord's Terms of Service
- Use at your own risk
- Self-bots can result in account termination
- This is for educational purposes only

## Configuration

The bot monitors for mentions from a specific bot and responds with slash commands. Make sure to:

- Set the correct `CHANNEL_ID` where the bot should operate
- Set the correct `BOT_ID` for the bot you want to interact with
- Keep your `TOKEN` secure and never share it

## License

This project is for educational purposes only.
