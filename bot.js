const Discord = require('discord.js');
const client = new Discord.Client();
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN); //BOT_TOKEN is the Client Secret


const ApiSwgohHelp = require('api-swgoh-help');
const swapi = new ApiSwgohHelp({
  "username":process.env.SWGOH_HELP_USERNAME,
  "password":process.env.SWGOH_HELP_PASSWORD
});



(async() =>{
      var acquiredToken = await swapi.connect();
    }
)();





var commands = [
  ["help","This is it!"],
  ["ping","Ping pong!"],
  ["console","send the text to the console."],
  ["clearchat","clear chat from current channel."]
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
    message.channel.send(commands);
    message.channel.send(commands.length);
    message.channel.send("Test done.");
    return;
  }
  if (input.startsWith(prefix + "help")) {
    const embed = new Discord.RichEmbed()
    .setTitle("Command List:")
    .setAuthor(client.user.username,client.user.avatarURL)
    .setColor(0xac30f1)
    .setDescription("All commands are preceded by " + prefix)
    .setFooter("Made by jcrAggie")
    .setThumbnail (message.author.avatarURL)
    .setTimestamp()
    for (var x = 0; x < commands.length; x++) {
      embed.addField(commands[x][0],commands[x][1])
    }
    message.channel.send({embed});
    return;
  }

    //clearchat
    if (input.startsWith(prefix+"clearchat")) {
      if(!message.member.roles.some(r=>["admin"].includes(r.name))) {
        message.reply("Sorry, you don't have permissions to use this!");
        return;
      }
      else {
        var res = input.split(" ");
      
        var num = res[1];
        if (num == undefined)
          num = 100;
        //message.channel.send('Num to delete is ' + num);

        console.log(message.author.username+" is clearing messages in: "+message.channel.guild)
        message.channel.bulkDelete(num)
        .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        .catch(console.error);
        return;
      }
    } // end of clearchat

    if (input.startsWith(prefix+"listMembers")) {
      message.channel.send("inside .listMembers");
      const list = client.guilds.get("Guild ID"); 
      list.members.forEach(member => console.log(member.user.nickname)); 
      return;
    } // end of listMembers
    
    // END OF SPECIFIC COMMANDS 
    message.channel.send("invalid command.");
  }
	 
  



//END OF COMMANDS  
);



