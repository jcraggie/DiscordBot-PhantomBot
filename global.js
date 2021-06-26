const botPrefix = 'pb.';
exports.botPrefix = botPrefix;

const discordChannels = {
        "log": '605087450573963362' //jcrAggie phantombot channel
}
exports.discordChannels = discordChannels


var footer = 'PhantomBot made by jcrAggie for the PhantomAlliance. \nThis is the way.   Ver 3.1 beta';
exports.footer = footer

const discord_jcrAggie = "116901947428044809";
exports.discord_jcrAggie = discord_jcrAggie

const discord_jcraggie93 = "419494570213244939";
exports.discord_jcraggie93 = discord_jcraggie93

const not_jcr_msg = "Sorry. You are not jcrAggie or NOTjcraggie.\n**I have spoken.**"
exports.not_jcr_msg = not_jcr_msg

const not_auth_msg = "You are not authorized to use this command.\n**I have spoken.**"
exports.not_auth_msg = not_auth_msg

const cmd_being_tested = "Sorry. This command is being tested by jcrAggie.\n**I have spoken.**"
exports.cmd_being_tested = cmd_being_tested

const rebellionInfo = {
        "allyCode": 135718294,
        "guildID": "G1743793275",
        "guildJSON": "g_01_rebellion.json",
        "leader": "jwnpanthers"
};
exports.rebellionInfo = rebellionInfo

const empireInfo = {
        "allyCode": 418877148,
        "guildID": "G215542000",
        "guildJSON": "g_02_empire.json",
        "leader": "Catastrophik"
};
exports.empireInfo = empireInfo

const havocInfo = {
        "allyCode": 924484782,
        "guildID": "G1544326544",
        "guildJSON": "g_03_havoc.json",
        "leader": "Andosan"
};
exports.havocInfo = havocInfo

const rogueInfo = {
        "allyCode": 618277879,
        "guildID": "G4160520842",
        "guildJSON": "g_04_rogue.json",
        "leader": "Walon/Kal Skirata"
};
exports.rogueInfo = rogueInfo

const orderInfo = {
        "allyCode": 993689571,
        "guildID": "G1222943911",
        "guildJSON": "g_05_order.json",
        "leader": "chewbaccababe"
};
exports.orderInfo = orderInfo

const uprisingInfo = {
        "allyCode": 582412773,
        "guildID": "G295240225",
        "guildJSON": "g_06_uprising.json",
        "leader": "vRex"
};
exports.uprisingInfo = uprisingInfo

const lotusInfo = {
        "allyCode": 315585918,
        "guildID": "G1625657735",
        "guildJSON": "g_07_lotus.json",
        "leader": "General Allison Organa"
};
exports.lotusInfo = lotusInfo

const phoundlingsInfo = {
        "allyCode": 681711581,
        "guildID": "G1428524841",
        "guildJSON": "g_08_phoundlings.json",
        "leader": "jingle"
};
exports.phoundlingsInfo = phoundlingsInfo

const hopeInfo = {
        "allyCode": 166494741,
        "guildID": "G3204162424",
        "guildJSON": "g_09_hope.json",
        "leader": "Whitefly425"
};
exports.hopeInfo = hopeInfo



let Discord = require('discord.js');
const phantomBotHelp = new Discord.MessageEmbed()
        .setTitle("PhantomBot Help")
        .setColor(0x580202)
        .setTimestamp()
        .setFooter(footer);
        
        phantomBotHelp.fields = [];

exports.phantomBotHelp = phantomBotHelp

// need to create a new template for the embed with an image since images cannot be removed from embeds
const ticketEmbedTemp01 = new Discord.MessageEmbed()
        .setTitle("PhantomBot Help")
        .setColor(0x580202)
        .setTimestamp()
        .setFooter(footer);

exports.ticketEmbedTemp01 = ticketEmbedTemp01

// need to create separate emplate for fancyPitImageImbed
const fancyPitImageEmbed = new Discord.MessageEmbed()
        .setTitle("REBELLION FANCY PIT")
        .setColor(0x580202)
        .setTimestamp()
        .setFooter(footer);



exports.fancyPitImageEmbed = fancyPitImageEmbed



