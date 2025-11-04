require('dotenv').config();
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const express = require('express'); // for keep-alive ping
const fetch = require('node-fetch'); // to ping itself

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ],
  partials: [Partials.Channel]
});

// --- Discord bot events ---
client.once('ready', () => {
  console.log(`Gatekeeper Bot is online as ${client.user.tag}`);
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
  const roleName = 'Initiate';
  const role = member.guild.roles.cache.find(r => r.name === roleName);

  if (role) member.roles.add(role).catch(console.error);

  if (channel) {
    const messages = [
      `🌙 The veil parts… and a new soul joins the circle. 
      Welcome, Initiate ${member}, to our coven — where moonlight meets mystery.
      Take your place at the circle and let your magic unfold. ✨`,
      `🔮 The veil parts… and a new soul joins the circle. 
      Welcome, Initiate ${member}, your presence stirs the candles and whispers through the dark.
      You now walk among witches, dreamers, and seekers of the unseen.✨`,
      `🪄 The veil parts… and a new soul joins the circle. 
      Welcome, Initiate ${member}! The coven awaits your presence.
      Tread softly, speak wisely, and may the moonlight guide your path.✨`
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const embed = new EmbedBuilder()
      .setTitle('🌙 Welcome to the Coven!')
      .setDescription(randomMessage)
      .setColor('#9370DB')
      .setFooter({ text: 'Gatekeeper Bot' });

    channel.send({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);

// --- Keep-alive Express server ---
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Gatekeeper Bot is awake 🌙✨'));
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));

// --- Self-ping every 5 minutes to prevent sleep ---
setInterval(() => {
  fetch(`http://localhost:${PORT}`).catch(err => console.log('Self-ping failed:', err));
}, 5 * 60 * 1000);
