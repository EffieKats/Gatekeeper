const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ]
});

client.once('ready', () => {
  console.log(`💫 WelcomeBot logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.get('1433542554716078133'); // replace with your channel ID
  if (!channel) return;
  channel.send(`🌙 Welcome to the coven, ${member}! ✨🔮`);
});

client.login(process.env.BOT_TOKEN);
