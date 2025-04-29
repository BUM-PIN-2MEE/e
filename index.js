const express = require('express');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const PORT = 3000;

// Serve the images folder statically
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});

// Discord bot setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Map for text replies
const textReplyMap = {
  "Talent domain mo": "https://raw.githubusercontent.com/BUM-PIN-2MEE/e/blob/main/Images/mo.png",
  "Talent domain tu": "https://raw.githubusercontent.com/BUM-PIN-2MEE/e/blob/main/Images/tu.png",
  "Talent domain we": "https://raw.githubusercontent.com/BUM-PIN-2MEE/e/blob/main/Images/we.png",
  "Talent domain th": "https://raw.githubusercontent.com/BUM-PIN-2MEE/e/blob/main/Images/mo.png",
  "Talent domain fr": "https://raw.githubusercontent.com/BUM-PIN-2MEE/e/blob/main/Images/tu.png",
  "Talent domain sa": "https://raw.githubusercontent.com/BUM-PIN-2MEE/e/blob/main/Images/we.png",
  "Talent domain su": "All the domains are available today",
  "Furina": "HP% / HP% / HP% (Golden Troupe)",
  "Layla": "HP% / HP% / HP% (Tenacity of the Millelith)",
  "Neuvi": "HP% / Hydro Damage Bonus / (Crit Damage/Crit rate) (Marechaussee Hunter)",
  "Mavuika": "Atk% / Pyro Damage Bonus / (Crit Damage/Crit rate) (Obsidian Codex)",
  "Gaming": "Atk% / Pyro Damage Bonus / (Crit Damage/Crit rate) (Marechaussee Hunter)",
  "Xilo": "Def% / Def% / Def% (Scroll of the Hero of Cinder City)",
  "Bennett": "ER% / (Pyro Damage Bonus/HP%) / (Crit Damage/Crit rate) (Noblesse Oblige)",
  "Sucrose": "EM / EM / EM (Viridescent Venerer)",
  "Faruzan": "(ER% / ATK%) / Anemo Damage Bonus / (Crit Damage/Crit rate) (Viridescent Venerer) Recommended ER: 200-250",
  "Nahida": "EM / EM / EM (Deepwood Memories) Recommended EM: 1k",
  "Kazuha": "EM / EM / EM (Viridescent Venerer) Recommended EM: 1k",
};

// Bot ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  client.user.setPresence({
    activities: [{ name: 'Genshin Helper', type: 0 }],
    status: 'online',
  });
});

// Handle messages
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const textReply = textReplyMap[message.content];

  if (textReply) {
    message.channel.send(textReply);
  } else {
    message.channel.send("No match found for your command!"); // Optional fallback message
  }
});

// Login your bot
client.login('MTM2NjQ3NzQwMjQzOTQxNzg5OA.Gdz9sB.Bxl5nI5r9p4_jSMx73CLvyYPAh1mqPhQw5U_Ec'); // 🔴 replace with your real token
