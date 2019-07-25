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
  //["ping","Ping pong!"],
  ["pingtime","returns time to ping"],
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

  
  /*
  if (input.startsWith(prefix + "ping")) {
      message.channel.send("pong!");
      return;
  }
  */

  if (input.startsWith(prefix + "foo")) {
      message.channel.send("bar!");
      return;
  } // end foo

  // console
  if (input.startsWith(prefix + "console")) {
      console.log(message.content);
      return;
  } // end console
  
  // test
  if (input.startsWith(prefix + "test")) {
    message.channel.send(commands);
    message.channel.send(commands.length);
    message.channel.send("Test done.");
    return;
  } // end test

  // help
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
  } // end help

    //clearchat
    if (input.startsWith(prefix + "clearchat")) {
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


    // pingtime
    if(input.startsWith(prefix + "pingtime")){ 
			message.channel.send("Pinging ...") // Placeholder for pinging ... 
			.then((msg) => { // Resolve promise
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp)) // Edits message with current timestamp minus timestamp of message
      });
      return;
		} // end pingtime

    // listmembers
    if (input.startsWith(prefix + "listmembers")) {
      message.channel.send("inside .listmembers");
      const list = client.guilds.get("116902168698683398"); // jcrAggie Discord server ID
      list.members.forEach(member => console.log(member.user.username + " is named " + member.nickname)); 
      return;
    } // end of listmembers
    
    // END OF SPECIFIC COMMANDS 
    message.channel.send("invalid command.");
  }
	 
  



//END OF COMMANDS  
);



