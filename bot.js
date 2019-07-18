const Discord = require('discord.js');
const client = new Discord.Client();

var commands = [
  ["help","This is it!"],
  ["ping","Ping pong!"],
  ["console","send the text to the console."]
];




client.on('ready', () => {
    console.log('I am ready!');
});

// Set the prefix
const prefix = ".";


client.on("message", (message) => {
  var input = '';
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;
  else input = message.content.toLowerCase();

  if (input.startsWith(prefix + "ping")) {
      message.channel.send("pong!");
      return;
  }
  if (input.startsWith(prefix + "foo")) {
      message.channel.send("bar!");
      return;
  }
  if (input.startsWith(prefix + "console")) {
      console.log(message.content);
      return;
  }
  if (input.startsWith(prefix + "test")) {
    console.log(commands);
    console.log(commands.length);
    message.channel.send("Test done.");
  }
	  message.channel.send("invalid command.");
  }
);


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN); //BOT_TOKEN is the Client Secret
