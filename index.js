const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Project is running!');
});

app.get("/", (req, res) => {
  res.send('Hello world!');
});

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ➡️ NEW: Set bot status when ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setPresence({
    activities: [{ name: 'Genshin Helper', type:0 }], // 0 = playing
    status: 'online',
  });
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return; // 🛡️ Important: Don't reply to bots

  // Map messages to image URLs for a cleaner structure
  const replyMap = {
    "Talent domain mo": "https://cdn.discordapp.com/attachments/1365756897101217846/1366485408023711796/image.png?ex=68111e35&is=680fccb5&hm=e3568830ac03229996700021a26aeae2acaaafe1335ffdab5074ce65acd338a1&",
    "Talent domain tu": "https://cdn.discordapp.com/attachments/1365756897101217846/1366486096816640143/image.png?ex=68111ed9&is=680fcd59&hm=a792a776320376ed4ee44332ffc35faada1a3517cd32d50d6891cc2c83f08eaf&",
    "Talent domain we": "https://cdn.discordapp.com/attachments/1365756897101217846/1366486351700164718/image.png?ex=68111f16&is=680fcd96&hm=da8558450423fe61d8231a8749b77516dab915a9f0dd7eff07c553e50963835d&",
    "Talent domain th": "https://cdn.discordapp.com/attachments/1365756897101217846/1366485408023711796/image.png?ex=68111e35&is=680fccb5&hm=e3568830ac03229996700021a26aeae2acaaafe1335ffdab5074ce65acd338a1&",
    "Talent domain fr": "https://cdn.discordapp.com/attachments/1365756897101217846/1366486096816640143/image.png?ex=68111ed9&is=680fcd59&hm=a792a776320376ed4ee44332ffc35faada1a3517cd32d50d6891cc2c83f08eaf&",
    "Talent domain sa": "https://cdn.discordapp.com/attachments/1365756897101217846/1366486351700164718/image.png?ex=68111f16&is=680fcd96&hm=da8558450423fe61d8231a8749b77516dab915a9f0dd7eff07c553e50963835d&",
    "Talent domain su": "All the domains are available today",
    "Furina": "HP% / HP% / HP% (Golden Troupe)",
    "Layla": "HP% / HP% / HP% (tenacity of the Millelith)",
    "Neuvi": "HP% / Hydro Damage Bonus / (Crit Damage/Crit rate) (marechaussee Hunter)",
    "Mavuika": "Atk% / Pyro Damage Bonus / (Crit Damage/Crit rate) (Obsidian Codex)",
    "Gaming": "Atk% / Pyro Damage Bonus / (Crit Damage/Crit rate) (marechaussee Hunter)",
    "Xilo": "Def% / Def% / Def% (Scroll of the Hero of Cinder City)",
    "Bennett": "ER% / (Pyro Damage Bonus/HP%) / (Crit Damage/Crit rate) (Noblesse oblige)",
    "Sucrose": "EM / EM / EM (Viridescent Venerer)",
    "Faruzan": "(ER% / ATK%) / Anemo Damage Bonus / (Crit Damage/Crit rate) (Viridescent Venerer) Recommended ER: 200-250",
    "Nahida": "EM / EM / EM (Deepwood Memories) Recommended EM: 1k",
    "Kazuha": "EM / EM / EM (Viridescent Venerer) Recommended EM: 1k",
  };

  // If the message matches any key in the replyMap, send the corresponding reply
  if (replyMap[message.content]) {
    message.channel.send(replyMap[message.content]);
  }
});

// ➡️ Login at the end
client.login('MTM2NjQ3NzQwMjQzOTQxNzg5OA.Gdz9sB.Bxl5nI5r9p4_jSMx73CLvyYPAh1mqPhQw5U_Ec'); // replace with your bot token
