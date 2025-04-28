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

// Map for image replies
const imageReplyMap = {
  "Talent domain mo": "talent_mo.png",
  "Talent domain tu": "talent_tu.png",
  "Talent domain we": "talent_we.png",
  "Talent domain th": "talent_th.png",
  "Talent domain fr": "talent_fr.png",
  "Talent domain sa": "talent_sa.png",
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
  const imageName = imageReplyMap[message.content];

  if (imageName) {
    const imageUrl = `http://localhost:${PORT}/images/${imageName}`;
    message.channel.send(imageUrl);
  } else if (textReply) {
    message.channel.send(textReply);
  }
});

// Login your bot
client.login('MTM2NjQ3NzQwMjQzOTQxNzg5OA.Gdz9sB.Bxl5nI5r9p4_jSMx73CLvyYPAh1mqPhQw5U_Ec'); // 🔴 replace with your real token
