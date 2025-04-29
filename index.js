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
  "Talent domain mo": "mo.png",
  "Talent domain tu": "tu.png",
  "Talent domain we": "we.png",
  "Talent domain th": "th.png",
  "Talent domain fr": "fr.png",
  "Talent domain sa": "sa.png",
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

  console.log(`Message received: ${message.content}`);  // Log the message to check if it matches

  if (imageName) {
    console.log(`Image found: ${imageName}`);  // Log the image name
    const imageUrl = `https://e-production-b06a.up.railway.app/images/${imageName}`;

    // Send the image as an embed
    message.channel.send({
      embeds: [{
        image: {
          url: imageUrl
        }
      }]
    });
  } else if (textReply) {
    console.log(`Text reply found: ${textReply}`);  // Log the text reply
    message.channel.send(textReply);
  } else {
    console.log("No match found for the message.");
    message.channel.send("No match found for your command!"); // Optionally, send a fallback message
  }
});

// Login your bot
client.login('YOUR_BOT_TOKEN'); // 🔴 replace with your real token
