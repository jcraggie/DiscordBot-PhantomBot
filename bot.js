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
  ["CREATEGUILD","creates a new guild section w/ channels."],
  ["DELETEGUILD","deletes a guild's channels"]
  
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
  else if (message.content.startsWith(prefix + "setMember")) input = message.content;
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

  // CONSOLE START
  if (input.startsWith(prefix + "CONSOLE")) {
      console.log(message.content);
      return;
  } // END CONSOLE

  // TEST START
  if (input.startsWith(prefix + "TEST")) {
    console.log(message.author.username+" ran TEST in channel: " + message.channel.name + " in server: " + message.channel.guild);
    message.channel.send(commands);
    message.channel.send(commands.length);
    message.channel.send("Test done.");
    return;
  } // END TEST

  // HELP START
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
  } // END HELP

    // CLEARCHAT START
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
    } // END CLEARCHAT


    // PING START
    if(input.startsWith(prefix + "PING")){ 
      console.log(message.author.username+" ran PING in channel: " + message.channel.name + " in server: " + message.channel.guild);
			message.channel.send("Pinging ...") // Placeholder for pinging ... 
			.then((msg) => { // Resolve promise
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp)) // Edits message with current timestamp minus timestamp of message
      });
      return;
		} // END PING

    // LISTMEMBERS START
    if (input.startsWith(prefix + "LISTMEMBERS")) {
      console.log(message.author.username+" ran LISTMEMBERS in channel: " + message.channel.name + " in server: " + message.channel.guild);
      message.channel.send("DEBUGGING inside .LISTMEMBERS routine.");
      const list = client.guilds.get("116902168698683398"); // jcrAggie Discord server ID
      list.members.forEach(member => console.log(member.user + " -> " + member.user.username + " is named " + member.nickname)); 
      return;
    } // END LISTMEMBERS

    // CREATEGUILD START
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
      var res = input.split(" "); // splits the input into an array of words
      res.shift(); // removes first element (the command) from the array
      var name = res.join(" "); // turns the rest of the args into a string. This is the name of the new guild/category to make.

      server.createChannel(name,"category");

      channelname.forEach(chName => {server.createChannel(chName,"text")
      .then(channel => {
        let category = server.channels.find(c => c.name == name && c.type == "category");
        if (!category) throw new Error ("Category channel does not exist");
        channel.setParent(category.id);
      }).catch(console.error);
    });


      return;

    } // END CREATEGUILD

    // DELETEGUILD START
    // must get parent/section ID manually. Command is .DELETEGUILD parentID
    //
    if (input.startsWith(prefix + "DELETEGUILD")) {
      if(!message.member.roles.some(r=>["admin"].includes(r.name))) {
        message.reply("Sorry, you don't have permissions to use this!");
        console.log(message.author.username+" attempted to run DELETEGUILD without permission in: " + message.channel.name + " in server: " + message.channel.guild);
        return;
      }

      console.log(message.author.username+" ran DELETEGUILD in channel: " + message.channel.name + " in server: " + message.channel.guild);
      var listedChannels = [];
      var res = input.split(" "); // splits the input into an array of words
      var categoryID = res[1]; // the ID of the parent category

      // begin deleting all channels having a parent ID of categoryID
      message.guild.channels.forEach(channel => {
        if(channel.parentID == categoryID) {
          //console.log("Category ID: " + categoryID + " found channnel");
          channel.delete();
        }
      }) // end forEach - done deleting all channels within a category

      message.guild.channels.get(categoryID).delete(); // deletes the guild's section/category


      return;

    } // END DELETEGUILD    

    // setMember BEGIN
    // format: .setMember,@jcrAggie,Jason Rogers,{Rebellion}
    // comma separated arguments
    if (input.startsWith(prefix + "setMember")) {
      if(!message.member.roles.some(r=>["admin"].includes(r.name))) {
        message.reply("Sorry, you don't have permissions to use this!");
        console.log(message.author.username+" attempted to run SETMEMBER without permission in: " + message.channel.name + " in server: " + message.channel.guild);
        return;
      }

      console.log(message.author.username+" ran SETMEMBER in channel: " + message.channel.name + " in server: " + message.channel.guild);
      var res = input.split(",");
      var memDiscName = res[1]; // the first arg is the member's discord name
      var memName = res[2]; // the second arg is the name portion of the nickname
      var memNick = res[3]; // the third arg is the nickname for the member
      const taggedUser = message.mentions.users.first();
      console.log(res);
      //message.channel.send(res);

      taggedUser.setNickname(memName + " " + memNick);

      //taggedUser.username = memName;
      //taggedUser.nickname = memNick;
      message.channel.send(taggedUser);
      /*
      const list = client.guilds.get("116902168698683398"); // jcrAggie Discord server ID
      list.members.forEach(member => console.log(member.user.username + " is named " + member.nickname)); 
      */

      return;
    } // END setMember
    
    // END OF SPECIFIC COMMANDS 
    console.log(message.author.username+" ran an INVALID COMMAND "+ input + " in " + message.channel.name + " in server: " + message.channel.guild);
    message.channel.send("INVALID COMMAND.");
  }
	 
  



//END OF COMMANDS  
);



