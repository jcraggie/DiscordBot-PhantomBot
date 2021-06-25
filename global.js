const botPrefix = 'pb.';
exports.botPrefix = botPrefix

var footer = 'PhantomBot made by jcrAggie for the PhantomAlliance. \nThis is the way.   Ver 3.2.0 ';
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



