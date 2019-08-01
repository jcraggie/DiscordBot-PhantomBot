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
  ["DELETEGUILD","deletes a guild's channels"],
  ["SETMEMBER","sets a new member's nickname and guild"],
  ["INVITE","create invite. use with days users"],
  ["RECRUIT","link to recruiting server"]
  
];

// serverRoles is GuildName, GuildMemberRoleID, GuildOfficerRoleID,serverID
var serverRoles = [
  ["member","418011699698991105","605084960130334772","116902168698683398"], // jcrAggie server
  ["tester","595663414756376600","605085107673366538","116902168698683398"], // jcrAggie server
  ["Royal Guards","485783034961068042","485783034961068042","484508095469584384"], // Recruiting server
  ["Rebellion","483620584861859850","483620171190239280","483433483109138433"], // rebellion
  ["Empire","485169730097774612","485171060132544534","483433483109138433"],
  ["Havoc","586291147169857556","586361048202870804","483433483109138433"],
  ["Rogue","581166616872747018","581167458979807262","483433483109138433"],
  ["Order","602674687771934742","602751440213245972","483433483109138433"],
  ["Uprising","603261421857538049","603265635207872522","483433483109138433"]


]

const masterUserID = 116901947428044809; //jcrAggie
const masterUserID2 = 234346145806155776; // Vorwerk

const recruitingServerID = 484508095469584384;
const phantomAllianceServerID = 483433483109138433;
const jcrAggieServerID = 116902168698683398;




client.on('ready', () => {
    console.log('I am ready!');
    client.channels.get("605087450573963362").send("Online...");
});

// Set the prefix
const prefix = "pb.";


client.on("message", (message) => {
  var input = '';

  //message.channel.send("Author ID: " + message.author.id);
  //return;




  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  //message.channel.send("Author ID: " + message.author.id);

  // TEMP REQUIREMENT - ONLY PERMIT MASTER USER TO EXECUTE COMMANDS
  
  if(message.author.id != masterUserID && message.author.id != masterUserID2) {
    message.reply("Sorry, you are not my master!");
    console.log(message.author.username+" attempted to run CLEARCHAT without permission in: " + message.channel.name + " in server: " + message.channel.guild);
    return;
  }


  // testing input methods
  const oldargs = message.content.slice(prefix.length).trim().split(/ +/g);
  const oldcommand = oldargs.shift().toUpperCase();
  //message.channel.send("Command is: " + oldcommand);
  //message.channel.send("Arguments are: " + oldargs);
  //message.channel.send(" ------------");


  //---------------------------------------------------------------------------------------------
  /*
  splitCommandLine(message.content) ;

log( 'argv', process.argv.slice(2) ) ;

function log( n, v ) {
    console.log( n ) ;
    console.dir( v ) ;
    console.log() ;
}
*/
function splitCommandLine( commandLine ) {

    log( 'commandLine', commandLine ) ;

    //  Find a unique marker for the space character.
    //  Start with '<SP>' and repeatedly append '@' if necessary to make it unique.
    var spaceMarker = '<SP>' ;
    while( commandLine.indexOf( spaceMarker ) > -1 ) spaceMarker += '@' ;

    //  Protect double-quoted strings.
    //   o  Find strings of non-double-quotes, wrapped in double-quotes.
    //   o  The final double-quote is optional to allow for an unterminated string.
    //   o  Replace each double-quoted-string with what's inside the qouble-quotes,
    //      after each space character has been replaced with the space-marker above.
    //   o  The outer double-quotes will not be present.
    var noSpacesInQuotes = commandLine.replace( /"([^"]*)"?/g, ( fullMatch, capture ) => {
        return capture.replace( / /g, spaceMarker ) ;
    }) ;

    log( 'noSpacesInQuotes', noSpacesInQuotes ) ;

    //  Now that it is safe to do so, split the command-line at one-or-more spaces.
    var mangledParamArray = noSpacesInQuotes.split( / +/ ) ;

    log( 'mangledParamArray', mangledParamArray ) ;

    //  Create a new array by restoring spaces from any space-markers.
    var paramArray = mangledParamArray.map( ( mangledParam ) => {
        return mangledParam.replace( RegExp( spaceMarker, 'g' ), ' ' ) ;
    });

    log( 'paramArray', paramArray ) ;

    return paramArray ;
}
//--------------------------------------------------------------------------------------------------------------


  const args = splitCommandLine(message.content.slice(prefix.length));

  log( 'argv', process.argv.slice(2) ) ;

function log( n, v ) {
    console.log( n ) ;
    console.dir( v ) ;
    console.log() ;
}
  const command = args.shift().toUpperCase();
  //message.channel.send("New Command is: " + command);
  //message.channel.send("New Arguments are: " + args);
  //message.channel.send(" ------------");

  //return;
  
 /*
 
  else if (message.content.startsWith(prefix + "setMember")) input = message.content;
  else input = message.content.toUpperCase(); // convert command to uppercase
*/
  
  /*
  if (input.startsWith(prefix + "ping")) {
      message.channel.send("pong!");
      return;
  }
  */

  if (command == "FOO") {
    console.log(message.author.username+" ran FOO in channel: " + message.channel.name + " in server: " + message.channel.guild);
      message.channel.send("bar!");
      return;
  } // end foo

  // CONSOLE START
  if (command == "CONSOLE") {
      console.log(message.content);
      return;
  } // END CONSOLE

  // TEST START
  if (command == "TEST") {
    console.log(message.author.username+" ran TEST in channel: " + message.channel.name + " in server: " + message.channel.guild);
    message.channel.send(commands);
    message.channel.send(commands.length);
    message.channel.send("Test done.");
    return;
  } // END TEST

  // HELP START
  if (command == "HELP") {
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
    if (command == "CLEARCHAT") {
      if(!message.member.roles.some(r=>["Royal Guards","Admin","admin"].includes(r.name)) ) {
        message.reply("Sorry, you don't have permissions to use this!");
        console.log(message.author.username+" attempted to run CLEARCHAT without permission in: " + message.channel.name + " in server: " + message.channel.guild);
        return;
      }
      else {
        //var res = input.split(" ");
      
        var num = args[0];
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
    if(command == "PING"){ 
      console.log(message.author.username+" ran PING in channel: " + message.channel.name + " in server: " + message.channel.guild);
			message.channel.send("Pinging ...") // Placeholder for pinging ... 
			.then((msg) => { // Resolve promise
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp)) // Edits message with current timestamp minus timestamp of message
      });
      return;
		} // END PING

    // LISTMEMBERS START
    if (command == "LISTMEMBERS") {
      console.log(message.author.username+" ran LISTMEMBERS in channel: " + message.channel.name + " in server: " + message.channel.guild);
      message.channel.send("DEBUGGING inside .LISTMEMBERS routine.");
      const list = client.guilds.get("116902168698683398"); // jcrAggie Discord server ID
      list.members.forEach(member => console.log(member.user + " -> " + member.user.username + " is named " + member.nickname)); 
      return;
    } // END LISTMEMBERS

    // CREATEGUILD START
    if (command == "CREATEGUILD") {
      if(!message.member.roles.some(r=>["admin"].includes(r.name))) {
        message.reply("Sorry, you don't have permissions to use this!");
        console.log(message.author.username+" attempted to run CREATEGUILD without permission in: " + message.channel.name + " in server: " + message.channel.guild);
        return;
      }

      console.log(message.author.username+" ran CREATEGUILD in channel: " + message.channel.name + " in server: " + message.channel.guild);
      let channelName =[
        "lounge",
        "officers",
        "tb",
        "tw",
        "600-warnings",
        "leave-of-absense",
        "rules"
      ];

      var server = message.guild; // server
      //var res = input.split(" "); // splits the input into an array of words
      //res.shift(); // removes first element (the command) from the array

      var name = args.join(" "); // turns the rest of the args into a string. This is the name of the new guild/category to make.

      server.createChannel(name,"category");

      channelName.forEach(chName => {server.createChannel(chName,"text")
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
    if (command == "DELETEGUILD") {
      if(!message.member.roles.some(r=>["admin"].includes(r.name))) {
        message.reply("Sorry, you don't have permissions to use this!");
        console.log(message.author.username+" attempted to run DELETEGUILD without permission in: " + message.channel.name + " in server: " + message.channel.guild);
        return;
      }

      console.log(message.author.username+" ran DELETEGUILD in channel: " + message.channel.name + " in server: " + message.channel.guild);
      var listedChannels = [];
      //var res = input.split(" "); // splits the input into an array of words
      var categoryID = args; // the ID of the parent category
      message.channel.send("Guild ID should be: " + categoryID);

      // begin deleting all channels having a parent ID of categoryID
      message.guild.channels.forEach(channel => {
        if(channel.parentID == categoryID) {
          //console.log("Category ID: " + categoryID + " found channnel");
          channel.delete();
        }
      }) // end forEach - done deleting all channels within a category

      //message.guild.channels.get(categoryID).delete(); // deletes the guild's section/category


      return;

    } // END DELETEGUILD    

    // BEGIN invite

    if (command == "INVITE") {
      console.log(message.author.username+" ran INVITE in channel: " + message.channel.name + " in server: " + message.channel.guild);

      var inviteAge = args[0] * 3600;
      var inviteUses = args[1];


      if (inviteAge == undefined || isNaN(inviteAge)) inviteAge = 3600;
      if (inviteUses == undefined) inviteUses = 1;
      console.log("inviteAge is: " + inviteAge);




      var options = {
        maxAge: inviteAge, // 3600 = 1 hr     86400 = 1 day
        maxUses: inviteUses,
        unique: true
      };
    
      
      var invite = client.channels.get("483433483109138435").createInvite(options).then(function(newInvite){
          message.channel.send("https://discord.gg/" + newInvite.code);
          message.channel.send("Duration: " + inviteAge/3600 + " hrs    Uses: " + inviteUses);
          });

      return;
      







    } // END OF invite

    if(command=="RECRUIT") {
      message.channel.send("https://discord.gg/rUUpTRC");
      return;
    }










    // setMember BEGIN
    // format: .setMember,@jcrAggie,Jason Rogers,Rebellion,officer (optional)
    // comma separated arguments
    if (command == "SETMEMBER") {
      if(!message.member.roles.some(r=>["Royal Guards","Admin","admin"].includes(r.name)) ) {
        message.reply("Sorry, you don't have permissions to use this!");
        console.log(message.author.username+" attempted to run SETMEMBER without permission in: " + message.channel.name + " in server: " + message.channel.guild);
        return;
      }

      console.log(message.author.username+" ran SETMEMBER in channel: " + message.channel.name + " in server: " + message.channel.guild);
      
      //var res = input.split(",");
      var memDiscName = args[0]; // the first arg is the member's discord name
      var memName = args[1]; // the second arg is the name portion of the nickname
      var memGuild = args[2]; // the third arg is the nickname for the member
      var memOfficer = args[3]; // optional "officer" if this member is an officer
      var memNewNick = memName + " {" + memGuild + "}"; // adds { } around the guild name
      const taggedUser = message.mentions.users.first(); // returns the user mentioned in the command.
      const botID = message.guild.members.get("594193472336953365");

      //message.channel.send("args[0]: " + args[0]);
      /*
      message.channel.send("args[0] Discord name: " + memDiscName);
      message.channel.send("args[1] memName: " + memName);
      message.channel.send("args[2] memGuild: " + memGuild);
      message.channel.send("args[3] memOfficer: " + memOfficer);
      //return;
      */

      memName.trim();
      memGuild.trim();
      if (memOfficer) memOfficer.trim();


      if (botID.hasPermission("MANAGE_NICKNAMES") && botID.hasPermission("CHANGE_NICKNAME")) {
        //message.channel.send("I have permission.... attempting now....");
        var roleFound = false; 
        for (var x = 0; x < serverRoles.length; x++) {
          if(memGuild == serverRoles[x][0]) {
            roleFound = true;
            var memRoleArray = [serverRoles[x][1]];

            if(memOfficer == "officer"){
              memRoleArray = [  serverRoles[x][1],serverRoles[x][2]  ];
            } 
            // using setRoles([array,of,roles]) as this clears existing roles and just assigns the ones in the array.
            
            message.guild.members.get(taggedUser.id).setRoles(memRoleArray); 

          }
        }
        if (roleFound == false) {
          message.channel.send("That role was not found.");
          return;
        } else {
          message.guild.members.get(taggedUser.id).setNickname(memNewNick);
          return;
        }
      } else {
          message.channel.send("I dont have the permissons to change my nickname in this server.");
        }

      return;
    } // END setMember
    
    // END OF SPECIFIC COMMANDS 
    console.log(message.author.username+" ran an INVALID COMMAND "+ input + " in " + message.channel.name + " in server: " + message.channel.guild);
    message.channel.send("INVALID COMMAND.");
  }
	 
  



//END OF COMMANDS  
);



