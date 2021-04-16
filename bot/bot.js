const Discord = require('discord.js');
const { getProjectIdeas } = require('../API/project-api/queries');

const client = new Discord.Client();

client.on('ready', () => console.log(`Logged in as ${client.user.tag}`));

// Project-Ideas Bot
// commands:
// get project ideas => $project-mini or $project-major
//  ?selects randomly
client.on('message', (msg) => {
  if (msg.author.bot) return;

  const msgInLowerCase = msg.content.toLowerCase();
  if (msg.channel.name === 'project-ideas') {
    if (
      msgInLowerCase === '$project-mini' ||
      msgInLowerCase === '$project-major'
    ) {
      const type = msgInLowerCase.split('-')[1];
      console.log(type);
      getProjectIdeas(type)
        .then((resolvedArray) => {
          console.log(resolvedArray);
          const project =
            resolvedArray[Math.floor(Math.random() * resolvedArray.length)];
          msg.reply(project.project);
        })
        .catch((err) => {
          msg.reply('There has been a server error.');
        });
    }
  }
});

// Moderator Bot

function startBot() {
  client.login(process.env.DISCORD_TOKEN);
}

module.exports = startBot;
