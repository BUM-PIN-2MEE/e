const express = require('express');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const PORT = process.env.PORT || 8080; // Use Railway port in production

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Optional: Homepage route to avoid "Not Found"
app.get('/', (req, res) => {
  res.send('Bot server is running. Use /images/[filename] to view images.');
});

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

// Discord bot setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Text responses
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

// Image responses
const imageReplyMap = {
  "Talent domain mo": "mo.png",
  "Talent domain tu": "tu.png",
  "Talent domain we": "we.png",
  "Talent domain th": "mo.png",
  "Talent domain fr": "tu.png",
  "Talent domain sa": "we.png",
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  client.user.setPresence({
    activities: [{ name: 'Genshin Helper', type: 0 }],
    status: 'online',
  });
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const textReply = textReplyMap[message.content];
  const imageName = imageReplyMap[message.content];

  if (imageName) {
    const imageUrl = `https://your-app-name.up.railway.app/images/${imageName}`; // <-- Replace this!
    message.channel.send(imageUrl);
  } else if (textReply) {
    message.channel.send(textReply);
  }
});

// 🔴 Replace this token with your actual secret token (do NOT share publicly!)
client.login('MTM2NjQ3NzQwMjQzOTQxNzg5OA.Gdz9sB.Bxl5nI5r9p4_jSMx73CLvyYPAh1mqPhQw5U_Ec');
