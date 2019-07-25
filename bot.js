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
  ["HELP","This is it!"],
  // ["ping","Ping pong!"],
  ["PING","returns time to ping"],
  ["CONSOLE","send the text to the console."],
  ["CLEARCHAT","clear chat from current channel."],
  ["CREATEGUILD","creates a new guild section w/ channels."]
  
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
  else input = message.content.toUpperCase(); // convert command to uppercase

  
  /*
  if (input.startsWith(prefix + "ping")) {
      message.channel.send("pong!");
      return;
  }
  */

  if (input.startsWith(prefix + "FOO")) {
    console.log(message.author.username+" ran FOO in channel: " + message.channel.name + " in server: " + message.channel.guild);
      message.channel.send("bar!");
      return;
  } // end foo

  // console
  if (input.startsWith(prefix + "CONSOLE")) {
      console.log(message.content);
      return;
  } // end console

  // test
  if (input.startsWith(prefix + "TEST")) {
    console.log(message.author.username+" ran TEST in channel: " + message.channel.name + " in server: " + message.channel.guild);
    message.channel.send(commands);
    message.channel.send(commands.length);
    message.channel.send("Test done.");
    return;
  } // end test

  // help
  if (input.startsWith(prefix + "HELP")) {
    console.log(message.author.username+" ran HELP in channel: " + message.channel.name + " in server: " + message.channel.guild)
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
    if (input.startsWith(prefix + "CLEARCHAT")) {
      if(!message.member.roles.some(r=>["admin"].includes(r.name))) {
        message.reply("Sorry, you don't have permissions to use this!");
        console.log(message.author.username+" attempted to run CLEARCHAT without permission in: " + message.channel.name + " in server: " + message.channel.guild);
        return;
      }
      else {
        var res = input.split(" ");
      
        var num = res[1];
        if (num == undefined)
          num = 100;
        //message.channel.send('Num to delete is ' + num);

        console.log(message.author.username+" ran CLEARCHAT in channel: " + message.channel.name + " in server: " + message.channel.guild);
        message.channel.bulkDelete(num)
        .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        .catch(console.error);
        return;
      }
    } // end of clearchat


    // ping
    if(input.startsWith(prefix + "PING")){ 
      console.log(message.author.username+" ran PING in channel: " + message.channel.name + " in server: " + message.channel.guild);
			message.channel.send("Pinging ...") // Placeholder for pinging ... 
			.then((msg) => { // Resolve promise
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp)) // Edits message with current timestamp minus timestamp of message
      });
      return;
		} // end ping

    // listmembers
    if (input.startsWith(prefix + "LISTMEMBERS")) {
      console.log(message.author.username+" ran LISTMEMBERS in channel: " + message.channel.name + " in server: " + message.channel.guild);
      message.channel.send("DEBUGGING inside .LISTMEMBERS routine.");
      const list = client.guilds.get("116902168698683398"); // jcrAggie Discord server ID
      list.members.forEach(member => console.log(member.user.username + " is named " + member.nickname)); 
      return;
    } // end of listmembers

    // create guild - TESTING
    if (input.startsWith(prefix + "CREATEGUILD")) {
      if(!message.member.roles.some(r=>["admin"].includes(r.name))) {
        message.reply("Sorry, you don't have permissions to use this!");
        console.log(message.author.username+" attempted to run CREATEGUILD without permission in: " + message.channel.name + " in server: " + message.channel.guild);
        return;
      }

      console.log(message.author.username+" ran CREATEGUILD in channel: " + message.channel.name + " in server: " + message.channel.guild);
      let channelname =[
        "lounge",
        "officers",
        "tb",
        "tw",
        "600-warnings",
        "leave-of-absense",
        "rules"
      ];

      var server = message.guild; // server
      var res = input.split(" ");
      var name = res[1]; // need to allow for spaces in names This is the name of the new guild/category to make

      server.createChannel(name,"category");

      channelname.forEach(chName => {server.createChannel(chName,"text")
      .then(channel => {
        let category = server.channels.find(c => c.name == name && c.type == "category");
        if (!category) throw new Error ("Category channel does not exist");
        channel.setParent(category.id);
      }).catch(console.error);
    });


      /*
      server.createChannel("lounge","text")
      .then(channel => {
        let category = server.channels.find(c => c.name == name && c.type == "category");
        if (!category) throw new Error ("Category channel does not exist");
        channel.setParent(category.id);
      }).catch(console.error);
      */
      

      
      

      //guild.createChannel("test-channel-from-bot","text");
      return;

    } // end CREATEGUILD
    
    // END OF SPECIFIC COMMANDS 
    console.log(message.author.username+" ran an INVALID COMMAND "+ input + " in " + message.channel.name + " in server: " + message.channel.guild);
    message.channel.send("INVALID COMMAND.");
  }
	 
  



//END OF COMMANDS  
);



