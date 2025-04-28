// Import modules
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const path = require('path');

// Set up Express server
const app = express();
const PORT = process.env.PORT || 3000;

// Serve images statically
app.use('/images', express.static(path.join(__dirname, 'images')));

// Root route
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Web server started on port ${PORT}`);
});

// Set up Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// When bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setPresence({
    activities: [{ name: 'Genshin Helper', type: 0 }], // 0 = Playing
    status: 'online'
  });
});

// Message handler
client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignore bot messages

  // Image replies
  const imageReplyMap = {
    "Talent domain mo": "mo.png",
    "Talent domain tu": "tu.png",
    "Talent domain we": "we.png",
    "Talent domain th": "mo.png",
    "Talent domain fr": "tu.png",
    "Talent domain sa": "we.png",
  };

  // Text replies
  const textReplyMap = {
    "Furina": "HP% / HP% / HP% (Golden Troupe)",
    "Layla": "HP% / HP% / HP% (Tenacity of the Millelith)",
    "Neuvi": "HP% / Hydro Damage Bonus / (Crit Damage/Crit Rate) (Marechaussee Hunter)",
    "Mavuika": "ATK% / Pyro Damage Bonus / (Crit Damage/Crit Rate) (Obsidian Codex)",
    "Gaming": "ATK% / Pyro Damage Bonus / (Crit Damage/Crit Rate) (Marechaussee Hunter)",
    "Xilo": "DEF% / DEF% / DEF% (Scroll of the Hero of Cinder City)",
    "Bennett": "ER% / (Pyro Damage Bonus/HP%) / (Crit Damage/Crit Rate) (Noblesse Oblige)",
    "Sucrose": "EM / EM / EM (Viridescent Venerer)",
    "Faruzan": "(ER% / ATK%) / Anemo Damage Bonus / (Crit Damage/Crit Rate) (Viridescent Venerer) Recommended ER: 200-250",
    "Nahida": "EM / EM / EM (Deepwood Memories) Recommended EM: 1k",
    "Kazuha": "EM / EM / EM (Viridescent Venerer) Recommended EM: 1k",
  };

  const imageName = imageReplyMap[message.content];
  const textReply = textReplyMap[message.content];

  if (imageName) {
    const imageUrl = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co/images/${imageName}`;
    message.channel.send(imageUrl);
  } else if (textReply) {
    message.channel.send(textReply);
  }
});

// Log in the bot
client.login('YOUR_BOT_TOKEN_HERE'); // <--- Replace this with your bot token
