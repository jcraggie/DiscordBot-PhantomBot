const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

// Set the prefix
const prefix = ".";


client.on("message", (message) => {
  var input = '';
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;
  else input = message.content.toLowerCase()

  if (input.startsWith(prefix + "ping")) {
      message.channel.send("pong!");
      message.reply('Pong...');
  }
  if (input.startsWith(prefix + "foo")) {
      message.channel.send("bar!");
  }
  if (input.startsWith(prefix + "console")) {
      console.log(message.content);
  } else 
	  message.channel.send("invalid command.");
  }
);


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN); //BOT_TOKEN is the Client Secret
